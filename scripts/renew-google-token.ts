
import { google } from 'googleapis';
import readline from 'readline';
import { getCachedEnvVar } from '../lib/config/env';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

async function main() {
    console.log('\n🔵 Google Calendar Token Renewer 🔵\n');

    // 1. Fetch Credentials
    console.log('Fetching Client Credentials from environment variables...');
    const clientId = await getCachedEnvVar('GOOGLE_CLIENT_ID');
    const clientSecret = await getCachedEnvVar('GOOGLE_CLIENT_SECRET');
    const redirectUri = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    if (!clientId || !clientSecret) {
        console.error('Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET.');
        process.exit(1);
    }

    // 2. Setup OAuth
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent' // Force refresh token generation
    });

    console.log('\n👉 1. Visit this URL to authorize:');
    console.log(`\n${authUrl}\n`);
    console.log(`NOTE: If redirect URL is localhost and fails, copy the 'code' parameter from the URL bar manually.`);

    // 3. User Input
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const code = await new Promise<string>(resolve => {
        rl.question('\n👉 2. Paste the authorization CODE here: ', resolve);
    });
    rl.close();

    // 4. Exchange Code
    console.log('\nExchanging code for tokens...');
    try {
        const { tokens } = await oauth2Client.getToken(code.trim());

        if (!tokens.refresh_token) {
            console.error('❌ No refresh token returned. Did you approve access? Try verifying permissions at myaccount.google.com/permissions');
            return;
        }

        console.log('✅ Refresh Token obtained!');
        console.log(`Token: ${tokens.refresh_token.substring(0, 15)}...`);

        console.log('Save this value as GOOGLE_REFRESH_TOKEN in .env.local and Vercel:');
        console.log(tokens.refresh_token);

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

main();
