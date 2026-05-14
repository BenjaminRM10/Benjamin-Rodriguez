"use client";

import { motion } from "framer-motion";
import { ROIForm } from "@/components/forms/ROIForm";
import type { SolutionsTranslations } from "@/lib/i18n/types";

interface ROICalculatorProps {
    lang?: string;
    translations: SolutionsTranslations['roi'];
}

export function ROICalculator({ lang, translations }: ROICalculatorProps) {
    return (
        <section className="relative w-full py-24 px-4 overflow-hidden" id="roi-calculator">
            {/* Dynamic Background Pattern */}
            <div className="absolute inset-0 bg-[#0a0e27]">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-transparent to-[#0a0e27]" />
            </div>

            <div className="relative z-10 container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mb-4">
                            {translations.title} <span>{translations.titleHighlight}</span>
                        </h2>
                        <p className="text-xl text-slate-400">
                            {translations.subtitle}
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <ROIForm translations={translations} />
                </motion.div>
            </div>
        </section>
    );
}
