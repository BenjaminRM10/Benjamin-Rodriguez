import { Contact } from '@/components/sections/Contact';
import { getTranslations } from "@/lib/i18n/server";
import type { ContactTranslations } from "@/lib/i18n/types";
import { Locale } from "@/lib/i18n/config";

export default async function ContactPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const validLang = (lang === 'es' || lang === 'en') ? lang as Locale : 'en';
    const contactTranslations = await getTranslations<ContactTranslations>(validLang, 'contact');

    return (
        <div className="min-h-screen">
            <Contact lang={validLang} translations={contactTranslations} />
        </div>
    );
}
