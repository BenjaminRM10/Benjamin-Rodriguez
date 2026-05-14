"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface GlowCardProps {
    headline: string;
    description: string;
    icon?: LucideIcon;
    delay?: number;
}

export default function GlowCard({
    headline,
    description,
    icon: Icon,
    delay = 0,
}: GlowCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.05 }}
            className="relative group p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
        >
            {/* Gradient Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />

            <div className="flex flex-col items-center text-center space-y-2">
                {Icon && (
                    <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 mb-2 group-hover:bg-blue-500/20 transition-colors">
                        <Icon className="w-6 h-6" />
                    </div>
                )}

                <div className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                    {headline}
                </div>

                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                    {description}
                </h3>
            </div>
        </motion.div>
    );
}
