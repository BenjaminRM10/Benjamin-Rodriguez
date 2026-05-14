/**
 * Generates a local public asset URL.
 * Kept as a compatibility helper for components that previously used Supabase Storage paths.
 */
export function getImageUrl(path: string): string {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('/')) return path;

    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `/assets/${cleanPath}`;
}
