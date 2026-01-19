import { createClient } from '@supabase/supabase-js';

// Initialize a client specifically for storage URL generation
// We don't need auth here as we are just constructing string URLs for public assets
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const BUCKET = 'portfolio-assets';

/**
 * Generates a public URL for an asset in the portfolio-assets bucket.
 * @param path - The path to the file within the bucket (e.g., 'profile/benjamin.webp')
 * @returns The full public URL
 */
export function getImageUrl(path: string): string {
    if (!path) return '';
    if (path.startsWith('http')) return path; // Already a full URL

    // Clean path to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${cleanPath}`;
}
