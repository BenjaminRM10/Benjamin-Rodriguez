import dynamic from "next/dynamic";
import { Brand } from "@/components/sections/Brand";
import { SolutionsHero } from "@/components/sections/SolutionsHero";
import { getTranslations } from "@/lib/i18n/server";
import type { SolutionsTranslations } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

const Services = dynamic(() => import("@/components/sections/Services").then(mod => mod.Services));
const ROICalculator = dynamic(() => import("@/components/sections/ROICalculator").then(mod => mod.ROICalculator));
const Portfolio = dynamic(() => import("@/components/sections/Portfolio"));

export default async function SolutionsPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const t = await getTranslations<SolutionsTranslations>(lang as Locale, 'solutions');

    return (
        <div className="relative z-10 w-full animate-in fade-in duration-500">
            <SolutionsHero lang={lang} translations={t.hero} />
            <Brand translations={t.brand} />
            <ROICalculator lang={lang} translations={t.roi} />
            <Services mode="business" lang={lang} translations={t.services} />
            <Portfolio lang={lang} translations={t.portfolio} />
        </div>
    );
}
