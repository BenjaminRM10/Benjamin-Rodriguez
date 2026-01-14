"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard, Project } from "@/components/shared/ProjectCard";
import { ProjectModal } from "@/components/shared/ProjectModal";
import { FilterButtons } from "@/components/shared/FilterButtons";

// Project Data
const projects: Project[] = [
    {
        id: "goviel",
        title: "Goviel.com - Real Estate Website",
        description: "Professional real estate website designed for high-conversion property listings. Features advanced search, contact forms, and a responsive design optimized for mobile users.",
        thumbnail: "/images/projects/goviel-1.png",
        tags: ["React", "Web Design", "Tailwind CSS"],
        category: ["Web", "Client Work"],
        status: "live",
        link: "https://goviel.com",
        type: "external"
    },
    {
        id: "excel-system",
        title: "Excel Land Sales Management System",
        description: "A comprehensive business management system built entirely in Excel. Handles automated contracts, receipt generation, payment tracking, and financial reporting with role-based access.",
        thumbnail: "/images/projects/excel-dashboard-1.png",
        tags: ["VBA", "Automation", "Excel", "Dashboard"],
        category: ["Automation", "Excel"],
        status: "live",
        type: "modal",
        downloadUrl: "/downloads/land-sales-template.xlsx",
        gallery: [
            "/images/projects/excel-dashboard-1.png",
            "/images/projects/excel-dashboard-2.png",
            "/images/projects/excel-dashboard-3.png",
            "/images/projects/excel-dashboard-4.png",
            "/images/projects/excel-dashboard-5.png"
        ],
        features: [
            "Automated PDF Contract Generation",
            "Digital Receipt System with WhatsApp Integration",
            "Role-Based Access Control (Admin/User)",
            "Real-time Sales Analytics Dashboard",
            "Installment Payment Tracking"
        ]
    },
    {
        id: "ai-lang-app",
        title: "Lingua Flash",
        description: "An intelligent translation and language learning assistant that generates contextual images to help users memorize vocabulary faster. Uses Gemini AI for content generation.",
        thumbnail: "/images/projects/language-app.png",
        tags: ["AI", "React", "Gemini API", "Education"],
        category: ["AI", "Web"],
        status: "live",
        link: "https://linguaflash.appcreatorbr.com",
        type: "external"
    },
    {
        id: "inventory-system",
        title: "Production Scanning & Inventory",
        description: "Enterprise-grade inventory management system for manufacturing. Integrates barcode scanning, real-time stock updates, and production tracking connected to Supabase.",
        thumbnail: "/images/projects/inventory-system.png",
        tags: ["Next.js", "Supabase", "Manufacturing"],
        category: ["Full-Stack", "Web"],
        status: "live",
        link: "https://escaneodeproduccion.appcreatorbr.com",
        type: "external"
    },
    {
        id: "code-practice",
        title: "CodeFlow",
        description: "A typing practice tool specifically for developers. Generates real code snippets to type and uses AI to analyze accuracy and provide coding tips.",
        thumbnail: "/images/projects/code-helper.png",
        tags: ["AI", "Developer Tools", "React"],
        category: ["AI", "Web"],
        status: "live",
        link: "https://codeflow.appcreatorbr.com",
        type: "external"
    }
];

const categories = ["All", "Web", "AI", "Automation", "Excel", "Full-Stack"];

export function Portfolio() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter projects
    const filteredProjects = useMemo(() => {
        if (activeCategory === "All") return projects;
        return projects.filter((project) => project.category.includes(activeCategory));
    }, [activeCategory]);

    // Calculate counts for badges
    const counts = useMemo(() => {
        const tempCounts: Record<string, number> = { All: projects.length };
        projects.forEach((p) => {
            p.category.forEach((cat) => {
                tempCounts[cat] = (tempCounts[cat] || 0) + 1;
            });
        });
        // Ensure all defined categories have a count, even if 0 (though FilterButtons handles undefined)
        categories.forEach(c => {
            if (!tempCounts[c]) tempCounts[c] = 0;
        });
        return tempCounts;
    }, []);

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
