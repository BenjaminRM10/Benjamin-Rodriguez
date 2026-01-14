"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/lib/i18n/config";

export default function LanguageToggle() {
    const pathname = usePathname();
    const router = useRouter();

    const currentLang = pathname.split("/")[1];

    const toggleLanguage = () => {
        const newLang = currentLang === "en" ? "es" : "en";
        const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
        router.push(newPath);
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="font-mono text-sm uppercase tracking-wider relative overflow-hidden group"
        >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-cyan-400">
                {currentLang === "en" ? "ES" : "EN"}
            </span>
            <span className="absolute inset-0 bg-blue-500/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
        </Button>
    );
}
