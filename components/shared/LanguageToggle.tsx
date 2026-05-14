"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LanguageToggle() {
    const pathname = usePathname();
    const lang = pathname.split("/")[1] as "en" | "es";
    const pathnameWithoutLocale = pathname.replace(/^\/(en|es)/, "") || "/";

    return (
        <div className="flex items-center rounded-sm border border-slate-800 overflow-hidden text-xs">
            <Link
                href={`/en${pathnameWithoutLocale}`}
                className={cn(
                    "px-2.5 py-1 transition-colors",
                    lang === "en" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                )}
            >EN</Link>
            <Link
                href={`/es${pathnameWithoutLocale}`}
                className={cn(
                    "px-2.5 py-1 transition-colors",
                    lang === "es" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                )}
            >ES</Link>
        </div>
    );
}
