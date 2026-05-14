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
    const roles = translations.roles.slice(0, 2);

    return (
        <section className="relative min-h-[calc(100vh-4rem)] flex items-start justify-center overflow-hidden pt-0 pb-0 px-4">

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-2 md:mt-4">
                {/* Left Column: Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 text-center lg:text-left z-10"
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white whitespace-nowrap">
                        {translations.name} <span className="text-white">{translations.lastName}</span>
                    </h1>

                    <RoleTyper roles={roles} />

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
                    <div className="relative size-48 md:size-56">
                        <Image
                            src={getImageUrl("profile.webp")}
                            alt={translations.alt.profilePhoto}
                            fill
                            sizes="(min-width:768px) 14rem, 12rem"
                            className="rounded-full object-cover ring-1 ring-slate-700"
                            priority
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
