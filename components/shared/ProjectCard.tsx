"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Eye, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SkeletonImage } from "@/components/ui/Skeletons";

export interface Project {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    tags: string[];
    category: string[];
    status: "live" | "open-source" | "beta" | "concept";
    link?: string;
    type: "external" | "modal";
    gallery?: string[]; // For modal
    features?: string[]; // For modal
    downloadUrl?: string; // For modal/download
}

interface ProjectCardProps {
    project: Project;
    onOpenModal?: (project: Project) => void;
}

export function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
    const [isImageLoading, setIsImageLoading] = useState(true);

    const handleClick = () => {
        if (project.type === "modal" && onOpenModal) {
            onOpenModal(project);
        } else if (project.type === "external" && project.link) {
            window.open(project.link, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-colors duration-300 cursor-pointer"
            onClick={handleClick}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-slate-950">
                {isImageLoading && <SkeletonImage className="absolute inset-0 z-10" />}
                <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    onLoad={() => setIsImageLoading(false)}
                    className={cn(
                        "object-cover transition-transform duration-500 group-hover:scale-110",
                        isImageLoading ? "opacity-0" : "opacity-100"
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white font-medium backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {project.type === "modal" ? (
                            <>
                                <Eye className="w-4 h-4" />
                                View Details
                            </>
                        ) : (
                            <>
                                <ExternalLink className="w-4 h-4" />
                                Visit Site
                            </>
                        )}
                    </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className={cn(
                        "backdrop-blur-md border-0",
                        project.status === "live" && "bg-green-500/20 text-green-300",
                        project.status === "open-source" && "bg-blue-500/20 text-blue-300",
                        project.status === "beta" && "bg-yellow-500/20 text-yellow-300"
                    )}>
                        {project.status === "live" && <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse" />}
                        {project.status.replace("-", " ")}
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700/50"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
