
import { createClient } from '@supabase/supabase-js';
import { unstable_noStore as noStore } from 'next/cache';
import { getImageUrl } from '@/lib/storage/supabase-images';

// Initialize Supabase Client
// Note: In Next.js App Router we usually use @supabase/ssr, but for simple public read 
// we can use the standard client or the one configured in utils.
// Using standard client here for simplicity consistent with the plan.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getProjects() {
    noStore(); // Optional: Disable cache if we want fresh data always, or remove for static generation
    const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('sort_order', { ascending: true });

    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }

    return (data || []).map((p: any) => ({
        id: p.id,
        title: p.title_en,
        description: p.description_en,
        thumbnail: getImageUrl(p.image_path),
        tags: p.technologies || [],
        category: p.category || [],
        status: p.project_status || 'live',
        link: p.demo_url,
        type: p.project_type || 'external',
        gallery: (p.gallery || []).map((img: string) => getImageUrl(img)),
        features: p.features,
        downloadUrl: p.download_url
    }));
}

export async function getCertifications() {
    // noStore(); 
    const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('sort_order', { ascending: true });

    if (error) {
        console.error('Error fetching certifications:', error);
        return [];
    }

    return (data || []).map((c: any) => ({
        id: c.id,
        name: c.name,
        issuer: c.issuer,
        date: c.issue_date,
        category: c.category,
        credentialUrl: c.credential_url,
        logo: c.logo || c.image_path ? getImageUrl(c.logo || c.image_path) : undefined
    }));
}

export async function getSkills() {
    // noStore();
    const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('sort_order', { ascending: true });

    if (error) {
        console.error('Error fetching skills:', error);
        return [];
    }

    console.log(`[Server] Fetched ${data?.length} skills`);

    return (data || []).map((s: any) => ({
        name: s.name,
        icon: s.icon ? getImageUrl(s.icon) : null,
        certified: s.certified,
        description: s.description,
        categoryId: s.category_id,
        groupTitle: s.group_title
    }));
}
