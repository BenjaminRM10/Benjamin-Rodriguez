import { NextResponse } from 'next/server';
import { getCalendarClient } from '@/lib/google/calendar';
import { addDays, setHours, setMinutes, isBefore, startOfDay, endOfDay, format } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';

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
        const dateStr = dateParam.split('T')[0]; // Extract YYYY-MM-DD safely from ISO

        // We want to generate slots from WORK_START_HOUR to WORK_END_HOUR in Mexico City time
        // Construct the start time: "2024-01-24 09:00:00" (Mexico City)
        let currentSlot = fromZonedTime(`${dateStr} ${String(WORK_START_HOUR).padStart(2, '0')}:00:00`, TIMEZONE);

        // Construct the end time: "2024-01-24 18:00:00" (Mexico City)
        const endOfDayTime = fromZonedTime(`${dateStr} ${String(WORK_END_HOUR).padStart(2, '0')}:00:00`, TIMEZONE);

        console.log(`[Calendar Debug] Start generation (UTC): ${currentSlot.toISOString()}`);
        console.log(`[Calendar Debug] End generation (UTC): ${endOfDayTime.toISOString()}`);

        // Get current time to avoid booking in past
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

            // Check if slot is in the past
            const isPast = isBefore(currentSlot, now);

            if (!isBusy && !isPast) {
                // Determine format based on currentSlot timezone? 
                // We want to return a label like "09:00 AM".
                // Since currentSlot is a correct Date object (UTC), we can format it in the target timezone
                // Or simply rely on the fact that we constructed it iteratively from the start hour.
                // Re-calculating the label from the loop variables might be safer/simpler than formatting the Date object if we don't have a format-in-tz helper handy,
                // but formatting the Date object using toZonedTime + format is robust.

                const mexicoTime = toZonedTime(currentSlot, TIMEZONE);
                availableSlots.push(format(mexicoTime, 'hh:mm a'));
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
