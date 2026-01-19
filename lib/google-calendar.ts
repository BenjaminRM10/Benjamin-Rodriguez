"use server";

import { getCalendarClient } from "@/lib/google/calendar";
import { fromZonedTime } from "date-fns-tz";

// Define registration type locally to avoid circular dependencies if needed
// or import from your types file if available
interface CourseRegistration {
    id: string;
    course_id: string;
    event_date: string; // ISO date string YYYY-MM-DD
    full_name: string;
    email: string;
    phone?: string;
    attendee_type: string;
    status: string;
}

// 1. Get Available Slots
export async function getAvailableSlots(startDateStr: string, endDateStr: string) {
    try {
        const calendar = await getCalendarClient();
        const TIMEZONE = 'America/Mexico_City';

        // Construct Start of First Day in Mexico City
        const timeMin = fromZonedTime(`${startDateStr} 00:00:00`, TIMEZONE);

        // Construct End of Last Day in Mexico City
        const timeMax = fromZonedTime(`${endDateStr} 23:59:59`, TIMEZONE);

        console.log(`[Academy Sync] Checking availability from ${timeMin.toISOString()} to ${timeMax.toISOString()}`);

        // Fetch busy intervals
        const response = await calendar.freebusy.query({
            requestBody: {
                timeMin: timeMin.toISOString(),
                timeMax: timeMax.toISOString(),
                timeZone: TIMEZONE,
                items: [{ id: 'primary' }],
            },
        });

        const busyIntervals = response.data.calendars?.primary?.busy || [];
        console.log(`[Academy Sync] Found ${busyIntervals.length} busy intervals.`);
        // console.log(JSON.stringify(busyIntervals, null, 2));

        // Logic to determine available 8-hour slots (08:00 - 16:00 CST)
        // This is a simplified logic. Real logic would check each day in range.
        const availableDates: string[] = [];
        const current = new Date(timeMin);

        while (current <= timeMax) {
            // Include all days (Mon-Sun)
            const dayStart = new Date(current);
            dayStart.setUTCHours(14, 0, 0, 0); // 08:00 CST is 14:00 UTC
            const dayEnd = new Date(current);
            dayEnd.setUTCHours(22, 0, 0, 0);  // 16:00 CST is 22:00 UTC

            // Check if any busy interval overlaps with 08:00-16:00 CST
            const isBusy = busyIntervals.some(interval => {
                if (!interval.start || !interval.end) return false;
                const busyStart = new Date(interval.start);
                const busyEnd = new Date(interval.end);

                const overlap = (busyStart < dayEnd && busyEnd > dayStart);
                if (overlap) {
                    console.log(`[Academy Sync] Conflict found on ${current.toISOString().split('T')[0]}: Meeting ${busyStart.toISOString()} - ${busyEnd.toISOString()} overlaps with Work Day ${dayStart.toISOString()} - ${dayEnd.toISOString()}`);
                }
                return overlap;
            });

            if (!isBusy) {
                availableDates.push(current.toISOString().split('T')[0]);
            }
            current.setDate(current.getDate() + 1);
        }

        return availableDates;
    } catch (error: any) {
        console.warn("Warning: Google Calendar check failed, using fallback.", error.message);

        // FALLBACK: If credentials missing or API error, allow dates (mock availability)
        // This ensures the app is usable without setting up Google Cloud fully.
        return [];
    }
}

// 2. Create Calendar Event
export async function createCalendarEvent(registration: CourseRegistration) {
    try {
        const calendar = await getCalendarClient();

        const eventDate = new Date(registration.event_date);

        // Start time 09:00 AM
        const startTime = new Date(eventDate);
        startTime.setHours(9, 0, 0);

        // End time 17:00 PM (5:00 PM) - 8 hours duration
        const endTime = new Date(eventDate);
        endTime.setHours(17, 0, 0);

        const event = {
            summary: `AI Engineering Course - ${registration.attendee_type.toUpperCase()} - ${registration.full_name}`,
            description: `
                Registration ID: ${registration.id}
                Attendee: ${registration.full_name} (${registration.email})
                Type: ${registration.attendee_type}
                Break: 13:00 - 14:00
            `,
            start: {
                dateTime: startTime.toISOString(),
                timeZone: 'America/Monterrey', // Or defaults
            },
            end: {
                dateTime: endTime.toISOString(),
                timeZone: 'America/Monterrey',
            },
            attendees: [
                { email: registration.email }
            ],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 },
                    { method: 'popup', minutes: 60 },
                ],
            },
        };

        const res = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
        });

        console.log('Event created: %s', res.data.htmlLink);
        return { success: true, link: res.data.htmlLink };
    } catch (error) {
        console.error('Error creating calendar event:', error);
        return { success: false, error };
    }
}

// 3. Check Date Availability
export async function checkDateAvailability(dateStr: string) {
    try {
        // Re-use logic or simplify
        // Check strictly for that single day
        const slots = await getAvailableSlots(dateStr, dateStr);
        return slots.length > 0;
    } catch (error) {
        console.error("Error checking availability:", error);
        return false;
    }
}

// 4. Get Busy Dates (for UI Blocking)
export async function getBusyDates(startDateStr: string, endDateStr: string) {
    try {
        const calendar = await getCalendarClient();
        const TIMEZONE = 'America/Mexico_City';

        const timeMin = fromZonedTime(`${startDateStr} 00:00:00`, TIMEZONE);
        const timeMax = fromZonedTime(`${endDateStr} 23:59:59`, TIMEZONE);

        console.log(`[Academy Sync] Fetching busy dates from ${timeMin.toISOString()} to ${timeMax.toISOString()}`);

        const response = await calendar.freebusy.query({
            requestBody: {
                timeMin: timeMin.toISOString(),
                timeMax: timeMax.toISOString(),
                timeZone: TIMEZONE,
                items: [{ id: 'primary' }],
            },
        });

        const busyIntervals = response.data.calendars?.primary?.busy || [];
        const busyDates: string[] = [];
        const current = new Date(timeMin);

        // Iterate through each day in range
        while (current <= timeMax) {
            const dayStart = new Date(current);
            dayStart.setUTCHours(14, 0, 0, 0); // 08:00 CST
            const dayEnd = new Date(current);
            dayEnd.setUTCHours(22, 0, 0, 0);  // 16:00 CST

            // Check overlap
            const isBusy = busyIntervals.some(interval => {
                if (!interval.start || !interval.end) return false;
                const busyStart = new Date(interval.start);
                const busyEnd = new Date(interval.end);
                return (busyStart < dayEnd && busyEnd > dayStart);
            });

            if (isBusy) {
                busyDates.push(current.toISOString().split('T')[0]);
            }
            current.setDate(current.getDate() + 1);
        }

        return busyDates;

    } catch (error: any) {
        console.error("Error fetching busy dates:", error);
        return [];
    }
}
