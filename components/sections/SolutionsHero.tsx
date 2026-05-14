"use client";

import { motion } from "framer-motion";
import { Briefcase, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SolutionsTranslations } from "@/lib/i18n/types";

interface SolutionsHeroProps {
    lang?: string;
    translations: SolutionsTranslations['hero'];
}

export function SolutionsHero({ lang = "en", translations }: SolutionsHeroProps) {
    return (
        <section className="relative pt-8 pb-20 overflow-hidden bg-[#0a0e27]">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] opacity-30" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] opacity-30" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="max-w-4xl mx-auto text-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6"
                    >
                        <Briefcase className="w-4 h-4" />
                        <span>{translations.badge}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
                    >
                        {translations.title} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            {translations.titleHighlight}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto"
                    >
                        {translations.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button
                            className="h-12 px-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold shadow-lg shadow-blue-500/20"
                            onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            {translations.ctaROI}
                        </Button>
                        <Button
                            variant="outline"
                            className="h-12 px-8 rounded-full border-white/10 hover:bg-white/5 text-slate-300"
                            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <Rocket className="w-4 h-4 mr-2" />
                            {translations.ctaServices}
                        </Button>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
