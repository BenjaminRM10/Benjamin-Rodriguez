"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, Building2, ExternalLink, Lock, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Project, ProjectCard } from "@/components/shared/ProjectCard";
import { ProjectModal } from "@/components/shared/ProjectModal";
import { Button } from "@/components/ui/button";

const filters = [
    { id: "all", label: "Todos" },
    { id: "Public Website", label: "Sitios públicos" },
    { id: "Private System", label: "Sistemas privados" },
    { id: "Operations System", label: "Operación" },
    { id: "Own Product", label: "Productos propios" },
    { id: "AI", label: "AI" },
];

interface PortfolioPageClientProps {
    projects: Project[];
    lang: string;
}

export function PortfolioPageClient({ projects, lang }: PortfolioPageClientProps) {
    const [activeFilter, setActiveFilter] = useState("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects = useMemo(() => {
        if (activeFilter === "all") return projects;
        return projects.filter((project) => project.category.includes(activeFilter));
    }, [activeFilter, projects]);

    const publicWebsites = projects.filter((project) => project.category.includes("Public Website"));
    const privateSystems = projects.filter((project) => project.category.includes("Private System"));

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <section className="relative overflow-hidden pt-28 pb-16 border-b border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_32%)]" />
                <div className="container relative px-4 md:px-6">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 mb-6">
                            <BriefcaseBusiness className="h-4 w-4" />
                            Proyectos reales para clientes y operaciones
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Portafolio de sitios, sistemas y automatizaciones
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
                            Explora trabajos públicos, sistemas privados y productos propios según el tipo de problema que quieres resolver.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button asChild className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold">
                                <a href="#projects">
                                    Ver proyectos
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                            <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                                <Link href={`/${lang}/contact`}>Hablar de un proyecto</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10 border-b border-white/10 bg-slate-900/40">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SummaryCard icon={ExternalLink} label="Sitios públicos" value={publicWebsites.length} />
                        <SummaryCard icon={Lock} label="Sistemas privados" value={privateSystems.length} />
                        <SummaryCard icon={Sparkles} label="Proyectos totales" value={projects.length} />
                    </div>
                </div>
            </section>

            <section id="projects" className="py-16">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-3">Explorar por interés</h2>
                            <p className="text-slate-400 max-w-2xl">
                                Filtra por sitios públicos, sistemas internos complejos, operación, productos propios o proyectos con AI.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${activeFilter === filter.id
                                        ? "bg-cyan-400 text-slate-950 border-cyan-300"
                                        : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onOpenModal={setSelectedProject}
                            />
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="py-16 bg-slate-900/60 border-y border-white/10">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <InfoPanel
                            icon={Building2}
                            title="Sitios web para clientes"
                            text="Proyectos públicos donde puedes entrar, revisar diseño, velocidad, contenido y posicionamiento comercial."
                            items={publicWebsites.map((project) => project.title)}
                        />
                        <InfoPanel
                            icon={Lock}
                            title="Sistemas privados"
                            text="Plataformas operativas que no se enlazan porque requieren usuarios, roles y datos internos del cliente."
                            items={privateSystems.map((project) => project.title)}
                        />
                    </div>
                </div>
            </section>

            <ProjectModal
                isOpen={Boolean(selectedProject)}
                onClose={() => setSelectedProject(null)}
                project={selectedProject}
            />
        </main>
    );
}

function SummaryCard({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: number }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
            <Icon className="h-5 w-5 text-cyan-300 mb-4" />
            <div className="text-3xl font-bold">{value}</div>
            <div className="text-sm text-slate-400">{label}</div>
        </div>
    );
}

function InfoPanel({ icon: Icon, title, text, items }: { icon: LucideIcon; title: string; text: string; items: string[] }) {
    return (
        <div className="rounded-xl border border-white/10 bg-slate-950/60 p-6">
            <Icon className="h-6 w-6 text-cyan-300 mb-4" />
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-slate-400 mb-6">{text}</p>
            <div className="space-y-3">
                {items.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}
