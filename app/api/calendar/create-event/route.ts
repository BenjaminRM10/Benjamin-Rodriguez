import { NextResponse } from 'next/server';
import { getCalendarClient } from '@/lib/google/calendar';
import { z } from 'zod';

const bookingSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    date: z.string(), // ISO String
    time: z.string(), // "hh:mm a" format, e.g., "02:30 PM"
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, date, time } = bookingSchema.parse(body);

        const calendar = await getCalendarClient();

        // Parse date and time to construct exact Start/End ISO strings
        // We assume the date coming from frontend is just the date part (or ISO) and time is separate string
        // "2024-05-20T00:00.000Z" + "02:30 PM"

        const baseDate = new Date(date);

        // Parse time string "02:30 PM"
        const [timeStr, period] = time.split(' ');
        let [hours, minutes] = timeStr.split(':').map(Number);

        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;

        baseDate.setHours(hours, minutes, 0, 0);

        const startTime = baseDate.toISOString();
        const endTime = new Date(baseDate.getTime() + 30 * 60000).toISOString(); // +30 mins

        const event = {
            summary: `Discovery Call: ${name}`,
            description: `Meeting with ${name} (${email}). Booked via Portfolio.`,
            start: {
                dateTime: startTime,
                timeZone: 'America/Mexico_City',
            },
            end: {
                dateTime: endTime,
                timeZone: 'America/Mexico_City',
            },
            attendees: [
                { email: 'contacto@appcreatorbr.com' }, // Admin
                { email: email }, // User
            ],
            conferenceData: {
                createRequest: {
                    requestId: `meet-${Date.now()}`,
                    conferenceSolutionKey: { type: 'hangoutsMeet' },
                },
            },
        };

        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
            conferenceDataVersion: 1, // Required for Meet link generation
            sendUpdates: 'all', // Send emails
        });

        return NextResponse.json({
            success: true,
            eventId: response.data.id,
            meetLink: response.data.conferenceData?.entryPoints?.[0]?.uri
        });

    } catch (error) {
        console.error('Create Event Error:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
    }
}
