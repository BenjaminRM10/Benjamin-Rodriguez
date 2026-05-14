"use client";

import { motion } from "framer-motion";
import { MapPin, Mountain, BookOpen, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProfileTranslations } from "@/lib/i18n/types";

interface BeyondCardProps {
    title: string;
    description: string | React.ReactNode;
    badge: string[];
    icon: any;
    className?: string;
    gradient: string;
}

function BeyondCard({ title, description, badge, icon: Icon, className, gradient }: BeyondCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className={cn(
                "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10 flex flex-col justify-between",
                className
            )}
        >
            {/* Background Gradient/Image Placeholder */}
            <div className={cn("absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30", gradient)} />

            {/* Content */}
            <div className="relative z-10">
                <div className="mb-6 flex items-start justify-between">
                    <div className="rounded-full bg-white/10 p-3 backdrop-blur-md">
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex gap-2">
                        {badge.map((b, i) => (
                            <span key={i} className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-md border border-white/5">
                                {b}
                            </span>
                        ))}
                    </div>
                </div>

                <h3 className="mb-4 text-2xl font-bold text-white">{title}</h3>
                <div className="text-slate-300 leading-relaxed text-sm md:text-base space-y-4">
                    {description}
                </div>
            </div>
        </motion.div>
    );
}

interface BeyondCodeProps {
    translations: ProfileTranslations['beyondCode'];
}

export function BeyondCode({ translations }: BeyondCodeProps) {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container relative mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4"
                    >
                        {translations.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        {translations.subtitle}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {/* Card 1: Toronto */}
                    <BeyondCard
                        title={translations.cards.toronto.title}
                        icon={MapPin}
                        gradient="bg-gradient-to-br from-red-500 to-orange-500"
                        badge={translations.cards.toronto.badges}
                        className="min-h-[400px]"
                        description={
                            <>
                                {translations.cards.toronto.paragraphs.map((p, i) => (
                                    <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                                ))}
                            </>
                        }
                    />

                    {/* Card 2: Legendarios */}
                    <BeyondCard
                        title={translations.cards.legendarios.title}
                        icon={Mountain}
                        gradient="bg-gradient-to-br from-emerald-600 to-teal-600"
                        badge={translations.cards.legendarios.badges}
                        className="min-h-[400px]"
                        description={
                            <>
                                {translations.cards.legendarios.paragraphs.map((p, i) => (
                                    <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                                ))}
                            </>
                        }
                    />

                    {/* Card 3: Books */}
                    <BeyondCard
                        title={translations.cards.books.title}
                        icon={BookOpen}
                        gradient="bg-gradient-to-br from-blue-500 to-indigo-500"
                        badge={translations.cards.books.badges}
                        description={
                            <>
                                <p className="mb-4">
                                    {translations.cards.books.intro}
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-slate-400">
                                    {translations.cards.books.pillars.map((pillar, i) => (
                                        <li key={i}>{pillar}</li>
                                    ))}
                                </ul>
                            </>
                        }
                    />

                    {/* Card 4: Basketball */}
                    <BeyondCard
                        title={translations.cards.basketball.title}
                        icon={Trophy}
                        gradient="bg-gradient-to-br from-orange-500 to-amber-500"
                        badge={translations.cards.basketball.badges}
                        description={
                            <>
                                {translations.cards.basketball.paragraphs.map((p, i) => (
                                    <p key={i} className={i > 0 ? "mt-4" : ""}>{p}</p>
                                ))}
                            </>
                        }
                    />
                </div>

                <div className="mt-16 text-center">
                    <p className="text-xl md:text-2xl font-light text-slate-300 italic">
                        "{translations.quote}"
                    </p>
                </div>
            </div>
        </section>
    );
}
