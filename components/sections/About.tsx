"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import GlowCard from "@/components/shared/GlowCard";
import { Briefcase, GraduationCap, Globe, Rocket } from "lucide-react";
import type { ProfileTranslations } from "@/lib/i18n/types";

interface AboutProps {
    lang?: string;
    translations: ProfileTranslations['about'];
}

export default function About({ lang = "en", translations }: AboutProps) {
    // Stats Data with translations
    const stats = [
        { headline: translations.stats.recentGraduate.headline, description: translations.stats.recentGraduate.description, icon: GraduationCap },
        { headline: translations.stats.experience.headline, description: translations.stats.experience.description, icon: Briefcase },
        { headline: translations.stats.international.headline, description: translations.stats.international.description, icon: Globe },
        { headline: translations.stats.certifications.headline, description: translations.stats.certifications.description, icon: Rocket },
    ];

    return (
        <section id="about" className="py-20 bg-[#0a0e27] relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/10 blur-[120px] -z-10 pointer-events-none" />

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Bio */}
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

                            <blockquote className="border-l-4 border-cyan-500 pl-4 py-1 italic text-slate-400 bg-slate-800/30 rounded-r-lg">
                                "{translations.quote}"
                            </blockquote>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
                                {translations.whoIWorkWith}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {translations.badges.map((badge, index) => (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        className="bg-slate-800 text-cyan-400 hover:bg-slate-700 hover:text-cyan-300 transition-colors py-1.5 px-3 uppercase tracking-wide border border-slate-700"
                                    >
                                        {badge}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Stats Grid */}
                    <div className="grid grid-cols-2 gap-6">
                        {stats.map((stat, index) => (
                            <GlowCard
                                key={index}
                                headline={stat.headline}
                                description={stat.description}
                                icon={stat.icon}
                                delay={index * 0.1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
