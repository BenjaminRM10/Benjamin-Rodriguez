const { google } = require('googleapis');
const readline = require('readline');

// CONFIGURATION
// You can paste your credentials here temporarily if they aren't loading from env
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'PASTE_YOUR_CLIENT_ID_HERE';
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'PASTE_YOUR_CLIENT_SECRET_HERE';
// This MUST match exactly what is in your Google Cloud Console "Authorized redirect URIs"
const REDIRECT_URI = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function getRefreshToken() {
    console.log('\n--- Tool Generador de Refresh Token de Google ---\n');

    let clientId = CLIENT_ID;
    let clientSecret = CLIENT_SECRET;

    if (clientId === 'PASTE_YOUR_CLIENT_ID_HERE') {
        clientId = await new Promise(resolve => rl.question('Introduce tu Google Client ID: ', resolve));
    }
    if (clientSecret === 'PASTE_YOUR_CLIENT_SECRET_HERE') {
        clientSecret = await new Promise(resolve => rl.question('Introduce tu Google Client Secret: ', resolve));
    }

    // FORCE configuration advice
    console.log('\n------------------------------------------------------------');
    console.log('⚠️  CAMBIO DE ESTRATEGIA: USANDO IP DIRECTA ⚠️');
    console.log('Tu Redirect URI AHORA es:');
    console.log(`\x1b[36mhttp://127.0.0.1:3000\x1b[0m`); // Cyan text
    console.log('\nPOR FAVOR, VE A GOOGLE CLOUD CONSOLE Y AGREGA ESTA URL TAMBIÉN:');
    console.log('Authorized redirect URIs > Add URI > http://127.0.0.1:3000');
    console.log('------------------------------------------------------------\n');

    const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        'http://127.0.0.1:3000'
    );

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline', // CRUCIAL para obtener el refresh_token
        scope: SCOPES,
        prompt: 'consent' // Fuerza a pedir consentimiento para asegurar que den el refresh token
    });

    console.log('\n1. Autoriza la aplicación visitando esta URL en tu navegador:');
    console.log('\n' + authUrl + '\n');
    console.log(`IMPORTANTE: Si te redirige a ${REDIRECT_URI}/?code=...`);
    console.log('Copia SOLO el valor del parámetro "code" (lo que está después de code= y antes de &)');

    const code = await new Promise(resolve => rl.question('\n2. Pega el código aquí: ', resolve));

    try {
        const { tokens } = await oauth2Client.getToken(code);

        console.log('\n✅ ¡ÉXITO! Aquí están tus credenciales para poner en app_config:\n');
        console.log('GOOGLE_REFRESH_TOKEN:');
        console.log('\x1b[32m%s\x1b[0m', tokens.refresh_token); // Green text

        if (!tokens.refresh_token) {
            console.log('\n⚠️  No se recibió refresh_token. Posiblemente ya autorizaste la app antes.');
            console.log('Ve a https://myaccount.google.com/permissions y elimina el acceso a tu app, luego intenta de nuevo.');
        }

    } catch (error) {
        console.error('\n❌ Error obteniendo el token:', error.message);
    } finally {
        rl.close();
    }
}

getRefreshToken();
