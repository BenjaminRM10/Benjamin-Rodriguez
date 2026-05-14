export async function getEnvVar(key: string): Promise<string | null> {
    return process.env[key] || null;
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
