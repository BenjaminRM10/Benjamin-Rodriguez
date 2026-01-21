import { AICourseDetails } from "@/components/sections/AICourseDetails";
import { getTranslations } from "@/lib/i18n/server";
import type { AcademyTranslations } from "@/lib/i18n/types";
import { Locale } from "@/lib/i18n/config";




export default async function AcademyPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const validLang = (lang === 'es' || lang === 'en') ? lang as Locale : 'en';
    const academyTranslations = await getTranslations<AcademyTranslations>(validLang, 'academy');

    return (
        <div className="relative z-10 w-full animate-in fade-in duration-500">
            {/* Specialization Course Section */}
            <AICourseDetails lang={validLang} translations={academyTranslations} />
        </div>
    );
}
