"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ProfileTranslations } from "@/lib/i18n/types";

interface AboutProps {
    lang?: string;
    translations: ProfileTranslations['about'];
}

export default function About({ lang = "en", translations }: AboutProps) {
    const stats = [
        { value: translations.stats.experience.value, label: translations.stats.experience.label },
        { value: translations.stats.countries.value, label: translations.stats.countries.label },
        { value: translations.stats.certifications.value, label: translations.stats.certifications.label },
        { value: translations.stats.education.value, label: translations.stats.education.label },
    ];

    return (
        <section id="about" className="py-20 bg-[#0a0e27] relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/10 blur-[120px] -z-10 pointer-events-none" />

            <div className="container mx-auto px-4">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <h2 className="text-3xl lg:text-4xl font-bold text-white">
                                {translations.title} <span className="text-blue-500">{translations.titleHighlight}</span>
                            </h2>
                            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                        </div>

                        <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                            <p dangerouslySetInnerHTML={{ __html: translations.bio.paragraph1 }} />
                            <p dangerouslySetInnerHTML={{ __html: translations.bio.paragraph2 }} />
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 mt-12 border-t border-slate-800">
                        {stats.map((s, i) => (
                            <div
                                key={s.label}
                                className={cn(
                                    "py-6 px-4",
                                    i > 0 && "md:border-l border-slate-800"
                                )}
                            >
                                <div className="text-white text-3xl md:text-4xl font-semibold tracking-tight">{s.value}</div>
                                <div className="text-slate-400 text-xs uppercase tracking-wider mt-2">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
