# Sistema de Gestión de Secretos y Encriptación

Este proyecto utiliza un sistema híbrido para manejar credenciales sensibles (como claves de API de Google), almacenándolas de forma encriptada en la base de datos Supabase, pero manteniendo la llave maestra en las variables de entorno locales.

## 1. Arquitectura General

*   **Almacén de Datos (Supabase)**: Tabla `app_config` con una columna `value` que contiene texto cifrado (hex string).
*   **Llave Maestra (Local)**: Variable de entorno `SUPABASE_ENCRYPTION_KEY` definida en `.env.local`.
*   **Mecanismo (RPC)**: Una función de base de datos Postgres (`get_decrypted_config`) que recibe la llave maestra y desencripta el valor "al vuelo".

## 2. Configuración Requerida

### `.env.local`
Este archivo debe contener la **Master Key**. Esta llave nunca se guarda en la base de datos.
```bash
SUPABASE_ENCRYPTION_KEY=tu_clave_hex_de_64_caracteres
```

### Tabla `app_config`
La tabla tiene la estructura:
*   `key`: Nombre del secreto (ej. `GOOGLE_CLIENT_ID`).
*   `value`: Valor encriptado (String hexadecimal).

## 3. Flujo de Desencriptación

1.  **Backend (Next.js)** llama a `getCachedEnvVar('CLAVE')` en `lib/config/env.ts`.
2.  **`lib/config/env.ts`** lee `process.env.SUPABASE_ENCRYPTION_KEY`.
3.  Se hace una llamada RPC a Supabase:
    ```sql
    select get_decrypted_config('GOOGLE_CLIENT_ID', 'mi_llave_maestra_del_env');
    ```
4.  **Postgres** usa su extensión `pgcrypto` para desencriptar el valor usando la llave proporcionada y retorna el texto plano.
5.  **Backend** usa el texto plano para autenticarse con Google.

> **Importante**: Si `SUPABASE_ENCRYPTION_KEY` es incorrecta o cambia, la desencriptación fallará en la base de datos y retornará valores nulos o error.

## 4. Cómo actualizar credenciales

Para actualizar una credencial (ej. si rotas tus llaves de Google), no puedes simplemente pegar el texto plano en la base de datos. Debes encriptarlo con la misma llave maestra.

### Opción A: Script de Utilidad (Recomendado)
Puedes crear un script temporal en `scripts/encrypt.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function updateSecret(key: string, plainText: string) {
  // Nota: Esto asume que tienes una función set_encrypted_config o lo haces vía SQL directo con pgcrypto
  // Si no tienes esa función, debes encriptar localmente en Node.js usando crypto (AES-256-CBC)
  console.log("Implementar lógica de encriptación aquí si es necesaria actualización manual");
}
```

### Opción B: Panel de Supabase (Si tienes la función setter)
Si tienes una función `set_encrypted_config` en Postgres, puedes llamarla desde el SQL Editor de Supabase:

```sql
SELECT set_encrypted_config(
  'GOOGLE_CLIENT_ID', 
  'tu_client_id_real_texto_plano', 
  'tu_clave_maestra_del_env'
);
```

## 5. Solución de Problemas Comunes

*   **Error `invalid_client` en Google**:
    *   Causa: El `CLIENT_ID` o `SECRET` desencriptados están mal (posiblemente basura por llave incorrecta) o expiraron en Google Console.
    *   Solución: Verificar `SUPABASE_ENCRYPTION_KEY` y re-ingresar los valores en `app_config`.

*   **Error "Google Calendar dates not verified"**:
    *   Causa: Falla en la conexión. El sistema ahora bloquea las fechas por seguridad ("Fail Closed").
    *   Solución: Revisar logs del servidor para ver si es error de autenticación.

## Archivos Clave
*   `lib/config/env.ts`: Manejador central de configuración.
*   `lib/google/calendar.ts`: Cliente de Google que consume la configuración.
*   `lib/google-calendar.ts`: Lógica de negocio específica para cursos (Corporate/Academy).
