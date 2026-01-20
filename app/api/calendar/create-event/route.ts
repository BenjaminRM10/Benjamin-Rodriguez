import { NextResponse } from 'next/server';
import { getCalendarClient } from '@/lib/google/calendar';
import { z } from 'zod';
import { fromZonedTime } from 'date-fns-tz';

const bookingSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    meetingType: z.enum(['google_meet', 'phone_call']).optional().default('google_meet'),
    date: z.string(), // ISO String
    time: z.string(), // "hh:mm a" format, e.g., "02:30 PM"
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, meetingType, date, time } = bookingSchema.parse(body);

        const calendar = await getCalendarClient();

        // Parse date and time to construct exact Start/End ISO strings
        // We assume the date coming from frontend is just the date part (or ISO) and time is separate string
        // "2024-05-20T00:00.000Z" + "02:30 PM"



        // Parse time string "02:30 PM"
        const [timeStr, period] = time.split(' ');
        let [hours, minutes] = timeStr.split(':').map(Number);

        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;

        // Construct a string that strictly represents the LOCAL time in Mexico City
        // We take the YYYY-MM-DD from the input date (assuming it's accurate to the day intended)
        const datePart = date.split('T')[0];
        const localDateTimeString = `${datePart} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;

        // Convert that "wall clock" time in Mexico City to the absolute UTC timestamp
        const zonedDate = fromZonedTime(localDateTimeString, 'America/Mexico_City');

        const startTime = zonedDate.toISOString();
        const endTime = new Date(zonedDate.getTime() + 30 * 60000).toISOString(); // +30 mins

        // Conditional Event Properties
        let conferenceData = undefined;
        let description = `Meeting with ${name} (${email}). Booked via Portfolio.`;
        let location = 'Google Meet';

        if (meetingType === 'google_meet') {
            conferenceData = {
                createRequest: {
                    requestId: `meet-${Date.now()}`,
                    conferenceSolutionKey: { type: 'hangoutsMeet' },
                },
            };
        } else if (meetingType === 'phone_call') {
            location = `Phone Call: ${phone}`;
            description += `\n\nPhone Number: ${phone}`;
        }

        const event = {
            summary: `Discovery Call: ${name}`,
            description: description,
            start: {
                dateTime: startTime,
                timeZone: 'America/Mexico_City',
            },
            end: {
                dateTime: endTime,
                timeZone: 'America/Mexico_City',
            },
            location: location,
            attendees: [
                { email: email }, // User only (Host 'benjaminrm...' is auto-included as owner)
            ],
            conferenceData: conferenceData,
        };

        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
            conferenceDataVersion: 1, // Required for Meet link generation
            sendUpdates: 'all', // Send emails
        });

        const meetLink = response.data.conferenceData?.entryPoints?.[0]?.uri;

        // Prepare Email Content Variables
        const locationDisplay = meetingType === 'google_meet'
            ? `<li><strong>Link:</strong> <a href="${meetLink}">${meetLink}</a></li>`
            : `<li><strong>Location:</strong> I will call you at: <strong>${phone}</strong></li>`;

        // --- Explicit Email Notification via Resend (Redundancy) ---
        try {
            // Lazy load env vars/resend only if needed to avoid overhead on failure
            const { Resend } = await import('resend');
            const { getCachedEnvVar } = await import('@/lib/config/env');

            const resendKey = await getCachedEnvVar('RESEND_API_KEY');
            if (resendKey) {
                const resend = new Resend(resendKey);
                const ADMIN_EMAIL = 'contacto@appcreatorbr.com'; // Verified sender
                const OWNER_EMAIL = 'benjaminrm14032018@gmail.com'; // Real Notification Destination

                // 1. Send Confirmation to Client (Branded)
                await resend.emails.send({
                    from: 'Benjamin Rodriguez <onboarding@resend.dev>', // Update to verified domain if available
                    to: email,
                    replyTo: ADMIN_EMAIL,
                    subject: 'Meeting Confirmed: Discovery Call',
                    html: `
                        <h2>Meeting Confirmed!</h2>
                        <p>Hi ${name},</p>
                        <p>Thanks for scheduling a call. Here are the details:</p>
                        <ul>
                            <li><strong>Date:</strong> ${date.split('T')[0]}</li>
                            <li><strong>Time:</strong> ${time} (Mexico City Time)</li>
                            ${locationDisplay}
                        </ul>
                        <p>A Google Calendar invite has also been sent to you.</p>
                        <p>Best,<br/>Benjamin</p>
                    `
                });

                // 2. Send Notification to Owner (Benjamin)
                await resend.emails.send({
                    from: 'Portfolio Booking <onboarding@resend.dev>',
                    to: OWNER_EMAIL,
                    subject: `New Booking: ${name}`,
                    html: `
                        <h2>New Discovery Call Scheduled</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Type:</strong> ${meetingType === 'google_meet' ? 'Google Meet' : 'Phone Call'}</p>
                        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                        <p><strong>Date:</strong> ${date.split('T')[0]}</p>
                        <p><strong>Time:</strong> ${time}</p>
                        <p><strong>Meet Link:</strong> ${meetLink || 'N/A'}</p>
                        <p>Event has been created on your primary calendar.</p>
                    `
                });
                console.log('Explicit email notifications sent.');
            } else {
                console.warn('RESEND_API_KEY missing, skipping explicit emails.');
            }
        } catch (emailError) {
            console.error('Failed to send explicit emails:', emailError);
            // Non-fatal, return success for the booking itself
        }

        return NextResponse.json({
            success: true,
            eventId: response.data.id,
            meetLink: meetLink
        });

    } catch (error) {
        console.error('Create Event Error:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
    }
}
