"use client";

import Image from "next/image";
import { Download, X, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "./ProjectCard";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    if (!project) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl bg-slate-950 border-slate-800 text-white p-0 overflow-hidden">
                <DialogHeader className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
                    <div className="flex items-center justify-between pr-8">
                        <div>
                            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                                {project.title}
                                <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10">
                                    {project.status}
                                </Badge>
                            </DialogTitle>
                            <DialogDescription className="text-slate-400 mt-1">
                                {project.description}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="p-6 overflow-y-auto max-h-[80vh]">
                    {/* Gallery Carousel */}
                    {project.gallery && project.gallery.length > 0 && (
                        <div className="relative mb-8 group">
                            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900" ref={emblaRef}>
                                <div className="flex">
                                    {project.gallery.map((src, index) => (
                                        <div className="flex-[0_0_100%] min-w-0 relative aspect-video" key={index}>
                                            <Image
                                                src={src}
                                                alt={`${project.title} screenshot ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Buttons for Carousel */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={scrollPrev}
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={scrollNext}
                            >
                                <ChevronRight className="w-6 h-6" />
                            </Button>

                            {/* Dots */}
                            <div className="flex justify-center gap-2 mt-4">
                                {project.gallery.map((_, index) => (
                                    <button
                                        key={index}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all",
                                            index === selectedIndex ? "bg-blue-500 w-4" : "bg-slate-700 hover:bg-slate-600"
                                        )}
                                        onClick={() => emblaApi?.scrollTo(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Features List */}
                        <div className="md:col-span-2">
                            <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {project.features?.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Actions & Sidebar */}
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-4">Technologies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {project.downloadUrl && (
                                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                    <h5 className="font-semibold text-blue-100 mb-2">Get the Template</h5>
                                    <p className="text-xs text-blue-200/70 mb-4">
                                        Includes all dashboards, macros, and documentation.
                                    </p>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white gap-2 shadow-lg shadow-blue-500/20" asChild>
                                        <a href={project.downloadUrl} download>
                                            <Download className="w-4 h-4" />
                                            Download Now
                                        </a>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
