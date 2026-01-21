import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import { getTranslations } from "@/lib/i18n/server";
import type { ProfileTranslations } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

const Skills = dynamic(() => import("@/components/sections/Skills"));
const Certifications = dynamic(() => import("@/components/sections/Certifications"));
const BeyondCode = dynamic(() => import("@/components/sections/BeyondCode").then(mod => mod.BeyondCode));

export default async function ProfilePage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const t = await getTranslations<ProfileTranslations>(lang as Locale, 'profile');

    return (
        <div className="relative z-10 w-full animate-in fade-in duration-500">
            <Hero lang={lang} translations={t.hero} />
            <About lang={lang} translations={t.about} />
            <Skills lang={lang} translations={t.skills} />
            <Certifications lang={lang} translations={t.certifications} />
            <BeyondCode translations={t.beyondCode} />
            {/* Contact removed - replaced by Global Contact Page */}
        </div>
    );
}
