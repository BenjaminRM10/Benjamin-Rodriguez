import { NextResponse } from 'next/server';
import { getCalendarClient } from '@/lib/google/calendar';
import { addDays, setHours, setMinutes, isBefore, startOfDay, endOfDay, format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const TIMEZONE = 'America/Mexico_City';
const WORK_START_HOUR = 9;
const WORK_END_HOUR = 18; // 6 PM
const SLOT_DURATION_MINUTES = 30;

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const dateParam = searchParams.get('date');

        if (!dateParam) {
            return NextResponse.json({ error: 'Date parameter required' }, { status: 400 });
        }

        const calendar = await getCalendarClient();

        // Parse requested date (in UTC) and set boundaries
        const start = new Date(dateParam);
        const timeMin = start.toISOString();
        const timeMax = endOfDay(start).toISOString();

        console.log(`[Calendar Debug] Checking slots for: ${dateParam}`);
        console.log(`[Calendar Debug] TimeMin: ${timeMin}, TimeMax: ${timeMax}`);

        // Fetch busy times
        const response = await calendar.freebusy.query({
            requestBody: {
                timeMin,
                timeMax,
                timeZone: TIMEZONE,
                items: [{ id: 'primary' }],
            },
        });

        const busySlots = response.data.calendars?.primary?.busy || [];
        console.log(`[Calendar Debug] Busy slots found: ${busySlots.length}`);
        console.log(JSON.stringify(busySlots, null, 2));

        // Generate all possible slots
        const availableSlots: string[] = [];
        let currentSlot = setHours(setMinutes(start, 0), WORK_START_HOUR);
        const endOfDayTime = setHours(setMinutes(start, 0), WORK_END_HOUR);

        console.log(`[Calendar Debug] Start generation from: ${currentSlot.toISOString()}`);

        // Get current time in correct timezone to avoid booking in past
        // Note: This is a simplification. For rigorous implementation we need 
        // to handle timezone conversion carefully.
        const now = new Date();

        while (isBefore(currentSlot, endOfDayTime)) {
            const slotEnd = setMinutes(currentSlot, currentSlot.getMinutes() + SLOT_DURATION_MINUTES);

            const isBusy = busySlots.some((busy) => {
                if (!busy.start || !busy.end) return false;
                const busyStart = new Date(busy.start);
                const busyEnd = new Date(busy.end);

                // Check if slot overlaps with busy time
                return (
                    (currentSlot >= busyStart && currentSlot < busyEnd) ||
                    (slotEnd > busyStart && slotEnd <= busyEnd) ||
                    (currentSlot <= busyStart && slotEnd >= busyEnd)
                );
            });

            // Also check if slot is in the past (only for today)
            const isPast = isBefore(currentSlot, now);

            if (!isBusy && !isPast) {
                availableSlots.push(format(currentSlot, 'hh:mm a'));
            }

            currentSlot = slotEnd;
        }

        return NextResponse.json({ slots: availableSlots });

    } catch (error) {
        console.error('Calendar API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch available slots', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
