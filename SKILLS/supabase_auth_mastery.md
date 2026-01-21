# Lecciones Aprendidas: Supabase Auth, Magic Links y PKCE

Este documento resume las soluciones críticas implementadas para resolver problemas de autenticación con Magic Links, errores `otp_expired` y redirecciones incorrectas (localhost vs producción).

## 1. El Problema: "OTP Expired" en Test Mode / Admin flows
**Síntoma:** Al generar un Magic Link desde el servidor (usando `admin.inviteUserByEmail` o `signInWithOtp` como admin) y hacer clic en el link, Supabase devuelve:
`error=access_denied&error_code=otp_expired`

**Causa Raíz:**
Supabase usa **PKCE** (Proof Key for Code Exchange) por defecto en los clientes modernos.
*   Cuando inicias sesión desde el **Cliente** (navegador), este guarda una cookie con un "code verifier".
*   Cuando el usuario hace clic en el link del correo, el navegador envía esa cookie para verificar que quien inició la sesión es quien la termina.
*   **El Error:** Si usas `supabaseAdmin` (Service Role) para iniciar el `signInWithOtp`, **no se guardan cookies en el navegador del usuario**. Por lo tanto, cuando el usuario hace clic, no hay "code verifier", y el intercambio falla.

**La Solución:**
Para flujos iniciados por el servidor donde el usuario debe verificar (como nuestro "Test Mode"), se debe usar el **Server Client** (`@supabase/ssr`) que tiene acceso a las cookies de la request.

```typescript
// ❌ INCORRECTO (para este caso): Usar Admin Client
// No setea cookies en el navegador, causando falla de PKCE
await supabaseAdmin.auth.signInWithOtp({ ... })

// ✅ CORRECTO: Usar Server Client
// Setea las cookies de PKCE en la respuesta para que el navegador las guarde
import { createClient } from '@/lib/supabase/server';
const supabase = await createClient();
await supabase.auth.signInWithOtp({ ... })
```

---

## 2. Redirecciones: Localhost vs Producción
**Síntoma:** Los correos llegan con links que apuntan a `http://localhost:3000` incluso en producción, o dan 404 al hacer clic.

**Solución 1: Detección Robusta de URL**
No confiar ciegamente en una sola variable. Usar una cascada de prioridades:

```typescript
const getBaseUrl = () => {
    // 1. Variable explícita (definida por nosotros)
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
    
    // 2. Vercel System Variable (solo existe en deploy, no tiene https://)
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    
    // 3. Fallback seguro (Localhost para desarrollo)
    return 'http://localhost:3000'; 
    // O hardcoded a producción si quieres evitar fugas: 'https://midominio.com'
};
```

**Solución 2: Whitelist en Supabase**
El código puede pedir redireccionar a `appcreatorbr.com`, pero si Supabase no lo tiene en su "Allow List", lo bloqueará y usará la URL por defecto (Site URL).
*   **Ir a:** Supabase Dash -> Auth -> URL Configuration.
*   **Redirect URLs:** Agregar `https://midominio.com/**` y `http://localhost:3000/**`.

---

## 3. Callback Handler Robusto (`route.ts`)
**Síntoma:** Fallas intermitentes dependiendo de si el link es viejo (Magic Link legacy) o nuevo (PKCE).

**Solución:**
El endpoint `/api/auth/callback` debe soportar ambos métodos de verificación:
1.  **Code (PKCE):** El estándar moderno. Intercambia un código temporal por una sesión.
2.  **Token Hash:** El método legacy o de invitación/recuperación.

```typescript
// app/api/auth/callback/route.ts
export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const token_hash = searchParams.get('token_hash');
    const type = searchParams.get('type') as EmailOtpType | null;

    // 1. Intento PKCE (Code Exchange)
    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) return NextResponse.redirect(`${origin}${next}`);
    }

    // 2. Fallback Token Hash (Magic Links / Recovery)
    if (token_hash && type) {
        const supabase = await createClient();
        const { error } = await supabase.auth.verifyOtp({ type, token_hash });
        if (!error) return NextResponse.redirect(`${origin}${next}`);
    }
}
```

---

## checklist de Verificación para el Futuro
1.  [ ] ¿El flujo inicia en el servidor? -> ¿Necesito PKCE (Cookies)? -> Usar `createClient` (SSR), no `supabaseAdmin`.
2.  [ ] ¿El link redirige a 404? -> Revisar prefijos de idioma (`/es/...`) en `next.config.ts` o Middleware.
3.  [ ] ¿El link redirige a localhost en prod? -> Revisar `NEXT_PUBLIC_SITE_URL` y la Whitelist de Supabase.
