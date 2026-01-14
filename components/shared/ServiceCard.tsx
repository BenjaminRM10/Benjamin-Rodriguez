"use client";

import { LucideIcon, ArrowRight, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TechBadge } from "./TechBadge";

export interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    gradient: string;
    techStack?: { icon: LucideIcon; name: string; color?: string }[];
    ctaText: string;
    onCtaClick?: () => void;
    ctaAction?: "modal" | "scroll" | "link" | "download";
    ctaValue?: string;

    // New props
    variant?: "default" | "course";
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    info?: string; // For course info e.g. "10 hours..."

    className?: string;
    delay?: number;
}

export function ServiceCard({
    title,
    description,
    icon: Icon,
    gradient,
    techStack,
    ctaText,
    onCtaClick,
    ctaAction,
    ctaValue,
    variant = "default",
    secondaryCtaText,
    secondaryCtaLink,
    info,
    className,
    delay = 0,
}: ServiceCardProps) {

    const handleCtaClick = () => {
        if (onCtaClick) {
            onCtaClick();
            return;
        }

        if (ctaAction === "scroll" && ctaValue) {
            document.querySelector(ctaValue)?.scrollIntoView({ behavior: "smooth" });
        } else if (ctaAction === "link" && ctaValue) {
            window.open(ctaValue, "_blank");
        } else if (ctaAction === "download" && ctaValue) {
            window.open(ctaValue, "_blank");
        }
    };

    const isCourse = variant === "course";
    // Override gradient for courses if it wasn't passed explicitly (though prop is required, we can force it logically or just style via classes)
    // User requested Gold border (#FFD700) for courses.
    // We'll use a specific class for the border if it's a course.

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay }}
            whileHover={{ scale: 1.02 }}
            className={cn(
                "group relative flex flex-col h-full bg-slate-950/50 backdrop-blur-md rounded-2xl overflow-hidden border transition-all duration-300 shadow-xl",
                isCourse ? "border-yellow-500/50 hover:border-yellow-400" : "border-white/5 hover:border-white/10",
                className
            )}
        >
            {/* Animated Gradient Border Effect (Standard) or Gold Glow (Course) */}
            <div
                className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br",
                    isCourse ? "from-yellow-500 to-amber-500" : gradient
                )}
            />

            {/* Top glowing line */}
            <div className={cn("h-1 w-full bg-gradient-to-r opacity-50", isCourse ? "from-yellow-500 to-amber-500" : gradient)} />

            <div className="p-6 md:p-8 flex flex-col h-full relative z-10">

                {/* Course Badge */}
                {isCourse && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 text-xs font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                        🎓 COURSE
                    </div>
                )}

                <div className="flex items-start justify-between mb-4 mt-2">
                    <div className={cn(
                        "p-3 rounded-xl bg-gradient-to-br bg-opacity-10 bg-white/5",
                        isCourse ? "text-yellow-400" : gradient.replace("from-", "text-").split(" ")[0]
                    )}>
                        <Icon className={cn("w-8 h-8", isCourse ? "text-yellow-400" : "text-white")} />
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300">
                    <span className={cn(
                        "bg-clip-text text-transparent bg-gradient-to-r group-hover:bg-gradient-to-r",
                        isCourse ? "from-white to-white group-hover:from-yellow-200 group-hover:to-amber-200" : `from-white to-white group-hover:from-white group-hover:to-white ${gradient}`
                    )}>
                        {title}
                    </span>
                </h3>

                <p className="text-slate-400 mb-4 flex-grow leading-relaxed text-sm md:text-base">
                    {description}
                </p>

                {/* Info for Courses */}
                {info && (
                    <div className="mb-6 text-sm text-slate-300 flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
                        {info}
                    </div>
                )}

                <div className="space-y-4 mt-auto">
                    {/* Tech Stack Badges */}
                    {techStack && techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {techStack.map((tech, idx) => (
                                <TechBadge
                                    key={idx}
                                    icon={tech.icon}
                                    name={tech.name}
                                    color={tech.color}
                                />
                            ))}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-3">
                        {/* Primary Button */}
                        <Button
                            onClick={handleCtaClick}
                            className={cn(
                                "w-full justify-between group/btn border",
                                isCourse
                                    ? "bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20 text-yellow-200"
                                    : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                            )}
                            variant="ghost"
                        >
                            <span>{ctaText}</span>
                            {ctaAction === "download" ? (
                                <Download className="w-4 h-4 ml-2 group-hover/btn:scale-110 transition-transform" />
                            ) : (
                                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            )}
                        </Button>

                        {/* Secondary Button (WhatsApp) */}
                        {secondaryCtaText && secondaryCtaLink && (
                            <Button
                                onClick={() => window.open(secondaryCtaLink, "_blank")}
                                className="w-full justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white hover:brightness-110 border-none transition-all"
                            >
                                {/* Fallback to simple circle or message if Brand icon not avail, but text helps */}
                                <span className="font-semibold">{secondaryCtaText}</span>
                                <ExternalLink className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
