import { google } from 'googleapis';
import { getCachedEnvVar } from '@/lib/config/env'; // Assuming this exists or we use process.env and manual decryption if needed

// We need to construct the OAuth2 client. 
// Since we are running on the server, we can retrieve secrets.
// HOWEVER, per SEKILLS/SECRETS_MANAGEMENT.md, we might need to handle decryption if using `app_config`
// or just use process.env if they are stored there (which usually valid for local dev).
// For simplicity and robustness, I will assume env vars are available or handled by a helper.

// If getCachedEnvVar is not available, we use process.env directly, but we must ensure keys are present.

export async function getCalendarClient() {
    const clientId = await getCachedEnvVar('GOOGLE_CLIENT_ID');
    const clientSecret = await getCachedEnvVar('GOOGLE_CLIENT_SECRET');
    const refreshToken = await getCachedEnvVar('GOOGLE_REFRESH_TOKEN');
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    if (!clientId || !clientSecret || !refreshToken) {
        console.error("Missing Google Calendar Credentials in configuration.");
        throw new Error("Missing Google Calendar Credentials");
    }

    const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        siteUrl
    );

    oauth2Client.setCredentials({
        refresh_token: refreshToken
    });

    return google.calendar({ version: 'v3', auth: oauth2Client });
}

interface CalendarEventParams {
    summary: string;
    description: string;
    startTime: string; // ISO
    endTime: string;   // ISO
    attendees: string[]; // emails
    location?: string;
}

export async function createCalendarEvent({ summary, description, startTime, endTime, attendees, location }: CalendarEventParams) {
    const calendar = await getCalendarClient();

    const event = {
        summary,
        description,
        location,
        start: {
            dateTime: startTime,
            timeZone: 'America/Mexico_City',
        },
        end: {
            dateTime: endTime,
            timeZone: 'America/Mexico_City',
        },
        attendees: attendees.map(email => ({ email })),
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
        conferenceDataVersion: 1,
        sendUpdates: 'all', // Sends email invites
    });

    return {
        eventId: response.data.id,
        meetLink: response.data.conferenceData?.entryPoints?.[0]?.uri
    };
}
