"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/storage/supabase-images";
import { RoleTyper } from "@/components/shared/RoleTyper";
import type { ProfileTranslations } from "@/lib/i18n/types";

interface HeroProps {
    lang?: string;
    translations: ProfileTranslations['hero'];
}

export default function Hero({ lang = "en", translations }: HeroProps) {
    return (
        <section className="relative min-h-[calc(100vh-4rem)] flex items-start justify-center overflow-hidden pt-0 pb-0 px-4">
            {/* Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] -z-10 animate-pulse delay-1000" />

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-2 md:mt-4">
                {/* Left Column: Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 text-center lg:text-left z-10"
                >
                    <div className="inline-flex items-center space-x-2 bg-slate-800/50 rounded-full px-4 py-1.5 border border-slate-700/50 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium text-slate-300">
                            {translations.status}
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white whitespace-nowrap">
                        {translations.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{translations.lastName}</span>
                    </h1>

                    <RoleTyper roles={translations.roles} />

                    <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        {translations.tagline}
                    </p>
                </motion.div>

                {/* Right Column: Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex justify-center z-10"
                >
                    {/* Rotating Borders */}
                    <div className="relative w-72 h-72 lg:w-96 lg:h-96">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-cyan-500 to-purple-500 animate-spin-slow opacity-70 blur-md"></div>
                        <div className="absolute inset-1 rounded-full bg-[#0a0e27] z-10"></div>

                        {/* Image Container */}
                        <div className="absolute inset-2 rounded-full overflow-hidden z-20 border-4 border-slate-800/50 shadow-2xl">
                            <Image
                                src={getImageUrl("profile.webp")}
                                alt={translations.alt.profilePhoto}
                                unoptimized
                                fill
                                sizes="(max-width: 768px) 288px, (max-width: 1024px) 384px, 384px"
                                className="object-cover hover:scale-105 transition-transform duration-500"
                                priority={true}
                                quality={90}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
