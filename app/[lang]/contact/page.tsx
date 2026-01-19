import { Contact } from '@/components/sections/Contact';

export default async function ContactPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    return (
        <div className="min-h-screen">
            <Contact lang={lang} />
        </div>
    );
}
