"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard, Project } from "@/components/shared/ProjectCard";
// import { ProjectModal } from "@/components/shared/ProjectModal";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const ProjectModal = dynamic(() => import("@/components/shared/ProjectModal").then(mod => mod.ProjectModal), {
    ssr: false,
    loading: () => null // Modal is initially hidden anyway, simplistic loading if it pops up
});
import { FilterButtons } from "@/components/shared/FilterButtons";
import { getImageUrl } from "@/lib/storage/supabase-images";

// Project Data
// Project data received via props

const categories = ["All", "Web", "AI", "Automation", "Excel", "Full-Stack"];

interface PortfolioTranslations {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
}

export interface PortfolioClientProps {
    initialProjects: Project[];
    translations?: PortfolioTranslations;
}

export function PortfolioClient({ initialProjects, translations }: PortfolioClientProps) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter projects
    const filteredProjects = useMemo(() => {
        if (activeCategory === "All") return initialProjects;
        return initialProjects.filter((project) => project.category.includes(activeCategory));
    }, [activeCategory, initialProjects]);

    // Calculate counts for badges
    const counts = useMemo(() => {
        const tempCounts: Record<string, number> = { All: initialProjects.length };
        initialProjects.forEach((p) => {
            p.category.forEach((cat) => {
                tempCounts[cat] = (tempCounts[cat] || 0) + 1;
            });
        });
        // Ensure all defined categories have a count, even if 0
        categories.forEach(c => {
            if (!tempCounts[c]) tempCounts[c] = 0;
        });
        return tempCounts;
    }, [initialProjects]);

    const handleOpenModal = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <section id="portfolio" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_100%)] pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6"
                    >
                        Projects in <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Action</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg md:text-xl"
                    >
                        Real solutions aimed at solving real problems. From simple automations to complex AI-powered applications.
                    </motion.p>
                </div>

                <FilterButtons
                    categories={categories}
                    activeCategory={activeCategory}
                    onFilterChange={setActiveCategory}
                    counts={counts}
                />

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onOpenModal={handleOpenModal}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 text-slate-500"
                    >
                        <p>No projects found in this category yet.</p>
                    </motion.div>
                )}
            </div>

            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                project={selectedProject}
            />
        </section>
    );
}
