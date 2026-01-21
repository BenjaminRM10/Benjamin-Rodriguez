
import { getCalendarClient } from '../lib/google/calendar';

async function testConnection() {
    console.log('[Test] Initializing Google Calendar Client...');
    try {
        const calendar = await getCalendarClient();
        console.log('[Test] Client initialized successfully.');

        console.log('[Test] Attempting API Call (list events)...');
        const now = new Date();
        const res = await calendar.events.list({
            calendarId: 'primary',
            timeMin: now.toISOString(),
            maxResults: 1,
            singleEvents: true,
            orderBy: 'startTime',
        });

        console.log('[Test] API Call Successful!');
        console.log(`[Test] Found ${res.data.items?.length || 0} events.`);
        if (res.data.items?.length) {
            console.log('[Test] Next event:', res.data.items[0].summary);
        }

    } catch (error: any) {
        console.error('[Test] FAILED.');
        if (error.response) {
            console.error('[Test] API Error Response:', error.response.data);
        } else {
            console.error('[Test] Error Details:', error);
        }
    }
}

testConnection();
