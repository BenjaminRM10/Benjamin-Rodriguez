import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
    icon: LucideIcon;
    name: string;
    color?: string; // e.g., "text-blue-400"
    className?: string;
}

export function TechBadge({ icon: Icon, name, color = "text-slate-300", className }: TechBadgeProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-white/5 border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20",
                className
            )}
        >
            <Icon className={cn("w-3.5 h-3.5", color)} />
            <span className="text-slate-300">{name}</span>
        </div>
    );
}
