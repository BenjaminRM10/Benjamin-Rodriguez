import { createAdminClient } from '@/lib/supabase/admin';

export async function getEnvVar(key: string): Promise<string | null> {
    const supabase = createAdminClient();
    const encryptionKey = process.env.SUPABASE_ENCRYPTION_KEY;

    if (!encryptionKey) {
        console.error('SUPABASE_ENCRYPTION_KEY is not defined');
        return null;
    }

    const { data, error } = await (supabase as any)
        .rpc('get_decrypted_config', {
            p_key: key,
            p_enc_key: encryptionKey
        });

    if (error) {
        console.warn(`[Config] Error fetching config for ${key} from DB:`, error.message);
        // Fallback to process.env
        return process.env[key] || null;
    }

    // If data is null/empty from DB, check process.env
    if (!data) {
        return process.env[key] || null;
    }

    return data as string;
}

// Memory cache for performance
const configCache = new Map<string, string>();

export async function getCachedEnvVar(key: string): Promise<string | null> {
    // Return cached value if available
    if (configCache.has(key)) {
        return configCache.get(key) || null;
    }

    // Fetch from DB
    const value = await getEnvVar(key);

    // Cache if found
    if (value) {
        configCache.set(key, value);
    }

    return value;
}
