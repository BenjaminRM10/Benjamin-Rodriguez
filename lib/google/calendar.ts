import { google } from 'googleapis';
import { getCachedEnvVar } from '@/lib/config/env';

export async function getCalendarClient() {
    const clientId = await getCachedEnvVar('GOOGLE_CLIENT_ID');
    const clientSecret = await getCachedEnvVar('GOOGLE_CLIENT_SECRET');
    const refreshToken = await getCachedEnvVar('GOOGLE_REFRESH_TOKEN');

    // DEBUG: Check what we are using (Masked)
    console.log('[Google Auth Debug] Client ID loaded:', clientId ? `${clientId.substring(0, 10)}...` : 'NULL');
    console.log('[Google Auth Debug] Client Secret loaded:', clientSecret ? `${clientSecret.substring(0, 6)}...` : 'NULL');
    console.log('[Google Auth Debug] Refresh Token loaded:', refreshToken ? `${refreshToken.substring(0, 10)}...` : 'NULL');

    if (!clientId || !clientSecret || !refreshToken) {
        const missing = [];
        if (!clientId) missing.push('GOOGLE_CLIENT_ID');
        if (!clientSecret) missing.push('GOOGLE_CLIENT_SECRET');
        if (!refreshToken) missing.push('GOOGLE_REFRESH_TOKEN');

        console.error(`[Google Auth Error] Missing credentials: ${missing.join(', ')}`);
        throw new Error(`Missing Google Credentials: ${missing.join(', ')}`);
    }

    const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        process.env.NEXT_PUBLIC_SITE_URL // Redirect URI (not used for server-to-server but required)
    );

    oauth2Client.setCredentials({
        refresh_token: refreshToken
    });

    return google.calendar({ version: 'v3', auth: oauth2Client });
}
