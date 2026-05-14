"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
    name: string;
    icon?: string; // URL for devicon or similar
    certified?: boolean;
    description?: string;
    className?: string;
}

export function SkillBadge({ name, icon, description, className }: SkillBadgeProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className={cn(
                "group relative flex flex-col justify-center px-4 py-3 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20 select-none cursor-default overflow-hidden min-h-[60px]",
                className
            )}
        >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:animate-shine" />

            <div className="flex items-center gap-3">
                {icon ? (
                    <div className="relative w-6 h-6 shrink-0">
                        <Image
                            src={icon}
                            alt={name}
                            fill
                            className="object-contain"
                        />
                    </div>
                ) : null}

                <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors truncate">
                            {name}
                        </span>
                    </div>
                    {description && (
                        <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors mt-0.5 line-clamp-2">
                            {description}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
