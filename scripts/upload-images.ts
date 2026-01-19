import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Simple .env.local parser since we can't rely on next's env loading here
const loadEnv = () => {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
            const envConfig = fs.readFileSync(envPath, 'utf8');
            envConfig.split('\n').forEach((line) => {
                const [key, value] = line.split('=');
                if (key && value) {
                    process.env[key.trim()] = value.trim();
                }
            });
        }
    } catch (e) {
        console.error('Error loading .env.local', e);
    }
};

loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BUCKET = 'portfolio-assets';

if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error('Missing env vars: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function uploadFile(filePath: string, destPath: string) {
    const fileContent = fs.readFileSync(filePath);
    const { data, error } = await supabase.storage
        .from(BUCKET)
        .upload(destPath, fileContent, {
            contentType: 'image/auto', // Auto-detect or default
            upsert: true
        });

    if (error) {
        console.error(`Failed to upload ${destPath}:`, error.message);
    } else {
        console.log(`Uploaded ${destPath} successfully.`);
    }
}

async function walkAndUpload(dir: string, baseDir: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await walkAndUpload(fullPath, baseDir);
        } else {
            // Calculate relative path for bucket storage
            // e.g., /path/to/public/images/profile.jpg -> profile.jpg
            // If we want to keep 'images/' prefix in bucket? 
            // The plan said: public/images/abc.jpg -> abc.jpg (root of bucket or folder structure?)
            // Plan example: 'profile/benjamin-photo.webp'. 
            // My current public/images structure is flat or has subdirs.
            // Let's mirror the structure relative to public/images/

            const relativePath = path.relative(baseDir, fullPath);
            // Ensure posix separators for Supabase storage paths
            const storagePath = relativePath.split(path.sep).join('/');

            await uploadFile(fullPath, storagePath);
        }
    }
}

async function main() {
    const imagesDir = path.resolve(process.cwd(), 'public/images');
    if (!fs.existsSync(imagesDir)) {
        console.error('public/images directory not found!');
        return;
    }

    console.log('Starting upload from public/images...');
    // We create the 'images' folder implicitly by the relative path if we wanted.
    // However, the helper assumes `getImageUrl('profile.jpg')`.
    // If we upload `public/images/profile.jpg` as `profile.jpg` in bucket:
    // getImageUrl('profile.jpg') works.

    await walkAndUpload(imagesDir, imagesDir);
    console.log('Upload complete!');
}

main().catch(console.error);
