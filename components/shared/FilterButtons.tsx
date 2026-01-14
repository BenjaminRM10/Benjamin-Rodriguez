"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FilterButtonsProps {
    categories: string[];
    activeCategory: string;
    onFilterChange: (category: string) => void;
    counts: Record<string, number>;
}

export function FilterButtons({
    categories,
    activeCategory,
    onFilterChange,
    counts,
}: FilterButtonsProps) {
    return (
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onFilterChange(category)}
                    className={cn(
                        "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300",
                        activeCategory === category
                            ? "text-white"
                            : "text-slate-400 hover:text-white"
                    )}
                >
                    {activeCategory === category && (
                        <motion.div
                            layoutId="activeFilter"
                            className="absolute inset-0 bg-blue-600 rounded-full"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                        {category}
                        <span
                            className={cn(
                                "text-xs px-1.5 py-0.5 rounded-full transition-colors",
                                activeCategory === category
                                    ? "bg-white/20 text-white"
                                    : "bg-slate-800 text-slate-400"
                            )}
                        >
                            {counts[category] || 0}
                        </span>
                    </span>
                </button>
            ))}
        </div>
    );
}
