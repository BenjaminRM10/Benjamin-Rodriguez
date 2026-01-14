"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "w-5 h-5",
        md: "w-8 h-8",
        lg: "w-12 h-12",
    };

    return (
        <div className={cn("relative flex items-center justify-center", className)}>
            <motion.div
                className={cn(
                    "rounded-full border-2 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent",
                    sizeClasses[size]
                )}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
            <motion.div
                className={cn(
                    "absolute rounded-full border-2 border-t-transparent border-r-purple-500 border-b-transparent border-l-purple-500",
                    sizeClasses[size]
                )}
                animate={{ rotate: -360 }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{ width: "70%", height: "70%" }}
            />
        </div>
    );
}
