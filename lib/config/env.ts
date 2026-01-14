import { createClient } from '@/lib/supabase/server';

export async function getEnvVar(key: string): Promise<string | null> {
    const supabase = await createClient();
    const encryptionKey = process.env.SUPABASE_ENCRYPTION_KEY;

    if (!encryptionKey) {
        console.error('SUPABASE_ENCRYPTION_KEY is not defined');
        return null;
    }

    const { data, error } = await supabase
        .rpc('get_decrypted_config', {
            p_key: key,
            p_enc_key: encryptionKey
        });

    if (error) {
        console.error(`Error fetching ${key}:`, error);
        return null;
    }

    return data as string | null;
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
