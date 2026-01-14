import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-white/10", className)}
            {...props}
        />
    );
}

export function SkeletonCard() {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="pt-4 flex gap-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
            </div>
        </div>
    )
}

export function SkeletonImage({ className }: { className?: string }) {
    return (
        <Skeleton className={cn("w-full h-full min-h-[200px] rounded-xl", className)} />
    )
}
