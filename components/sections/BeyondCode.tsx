"use client";

import { motion } from "framer-motion";
import { MapPin, Mountain, BookOpen, Trophy, LucideIcon } from "lucide-react";
import type { ProfileTranslations } from "@/lib/i18n/types";

function BeyondCard({ title, body, icon: Icon }: { title: string; body: string; icon: LucideIcon }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded border border-slate-800 hover:border-slate-700 transition-colors p-8"
        >
            <Icon className="size-5 text-slate-400 mb-4" />
            <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
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
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
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
                    <BeyondCard
                        title={translations.cards.toronto.title}
                        body={translations.cards.toronto.body}
                        icon={MapPin}
                    />
                    <BeyondCard
                        title={translations.cards.legendarios.title}
                        body={translations.cards.legendarios.body}
                        icon={Mountain}
                    />
                    <BeyondCard
                        title={translations.cards.books.title}
                        body={translations.cards.books.body}
                        icon={BookOpen}
                    />
                    <BeyondCard
                        title={translations.cards.basketball.title}
                        body={translations.cards.basketball.body}
                        icon={Trophy}
                    />
                </div>
            </div>
        </section>
    );
}
