"use client";

import { motion } from "framer-motion";
import {
    Monitor, BrainCircuit, Terminal,
    ShieldCheck, CalendarDays, ArrowRight, X, Cpu, Activity, Layers, Database, Link as LinkIcon, Info, Server
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
// import { CourseRegistrationForm } from "@/components/forms/CourseRegistrationForm"; // Replaced with dynamic import
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Lazy Load the Heavy Form
const CourseRegistrationForm = dynamic(
    () => import("@/components/forms/CourseRegistrationForm").then((mod) => mod.CourseRegistrationForm),
    {
        loading: () => (
            <div className="h-[400px] w-full flex flex-col items-center justify-center text-slate-400 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                <p>Loading Registration Protocol...</p>
            </div>
        ),
    }
);

// Supabase Assets
const SUPABASE_STORAGE_URL = "https://izkevbsyeqihydfzkuzt.supabase.co/storage/v1/object/public/portfolio-assets/courses";

// Updated Path Options
const PATH_OPTIONS = [
    {
        id: 'tec-saltillo',
        title: "Tec Saltillo Event",
        subtitle: "Exclusive for Students",
        description: "Join the exclusive launch event at ITS. Verification required.",
        badge: "FREE",
        date: "Jan 24",
        img: 'tec.webp',
        colSpan: "md:col-span-1",
    },
    {
        id: 'student',
        title: "Peers Workshop",
        subtitle: "Open Session",
        description: "Collaborative learning environment for students and pros.",
        badge: "LIMITED",
        date: "Jan 31",
        img: 'students.webp',
        colSpan: "md:col-span-2",
    },
    {
        id: 'corporate',
        title: "Corporate Training",
        subtitle: "For Enterprise",
        description: "Custom in-house training for engineering teams.",
        badge: "PREMIUM",
        img: 'company.webp',
        colSpan: "md:col-span-2",
    },
    {
        id: 'online-group',
        title: "Online Training",
        subtitle: "Remote Access",
        description: "Live interactive sessions via Google Meet.",
        badge: "-10% OFF",
        img: 'online.webp',
        colSpan: "md:col-span-1",
    }
];

const PROTOCOL_STEPS = [
    {
        time: "09:00",
        title: "Infrastructure & Security",
        header: "Secure Cloud Environment",
        desc: "Setup of Google Antigravity IDE. Implementation of SSH keys, IP protocols, and encrypted variables to protect industrial IP.",
        icon: ShieldCheck,
        tags: ['SSH', 'Antigravity IDE', 'Ubuntu']
    },
    {
        time: "10:00",
        title: "Data Engineering & Local AI",
        header: "Backend & LLMs",
        desc: "Building a FastAPI engine with Python/Pandas to process CSV production data. Integration of local Hugging Face models (Phi-4/Llama-3).",
        icon: Database,
        tags: ['Python', 'Pandas', 'ETL Pipelines']
    },
    {
        time: "12:00",
        title: "Digital Interface (Frontend)",
        header: "Industrial Dashboard",
        desc: "Developing a professional UI with Next.js & Tailwind (Glassmorphism). Implementing secure Google Auth via Supabase.",
        icon: Monitor,
        tags: ['Next.js 16', 'Supabase', 'Tailwind']
    },
    {
        time: "14:00",
        title: "Automation & 3D",
        header: "Agentic Orchestration",
        desc: "Configuring n8n for anomaly detection alerts. Using AI Agents to script 3D mechanical part generation inside Blender.",
        icon: Layers,
        tags: ['n8n Workflow', 'Blender', 'Automation']
    },
    {
        time: "16:00",
        title: "The Bridge (Legacy Integration)",
        header: "Excel & VBA Connection",
        desc: "The final link: Creating an Excel Macro that consumes your new Python API. Controlling the AI directly from a spreadsheet.",
        icon: LinkIcon,
        tags: ['VBA Macros', 'Excel Integration', 'API']
    },
    {
        time: "17:00",
        title: "Deployment",
        header: "Production Launch",
        desc: "Deploying the full stack solution to Vercel. Live testing of the \"Living Platform\" accessible from any device.",
        icon: Server,
        tags: ['Vercel', 'CI/CD', 'Production'],
        isLast: true
    }
];

export function AICourseDetails() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedPath, setSelectedPath] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Scroll reset effect
    useEffect(() => {
        if (isModalOpen) {
            const modalContent = document.querySelector('[data-dialog-content]');
            if (modalContent) {
                modalContent.scrollTop = 0;
            }
        }
    }, [isModalOpen]);

    const handlePathSelect = (pathId: string) => {
        setSelectedPath(pathId);
        setIsModalOpen(true);
    };

    const handleFormSuccess = () => {
        setIsModalOpen(false);
    };

    // Dynamic Modal Title
    const getModalTitle = () => {
        if (selectedPath === 'online-group') return "Online Course";
        if (selectedPath === 'tec-saltillo') return "Tec Saltillo Event";
        return "Course Registration";
    };

    return (
        <section className="min-h-screen pt-16 pb-24 relative bg-[#050816] text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30">

            {/* --- INDUSTRIAL GRIDS & BACKGROUNDS --- */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,11,38,.9),rgba(6,11,38,.9)),url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dpv0ukspz/image/upload/v1688689973/grid_overlay_v2.png')] bg-[length:40px_40px] opacity-[0.03] pointer-events-none" />

            {/* Contextual Glows */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

            <div className="container mx-auto px-4 relative z-10 max-w-7xl">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* === LEFT CONTENT COLUMN (8 Cols) === */}
                    <div className="lg:col-span-8 flex flex-col gap-20">

                        {/* 1. HERO SECTION */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-8"
                        >
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono tracking-wider uppercase backdrop-blur-md">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                    </span>
                                    System v2.0 Live
                                </div>
                                <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-950/20 text-purple-300 text-xs font-mono tracking-wider uppercase backdrop-blur-md">
                                    <BrainCircuit className="w-3 h-3" />
                                    Powered by Google Antigravity
                                </div>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                                AI FOR <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
                                    ENGINEERING
                                </span>
                            </h1>

                            <div className="max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed font-light">
                                <p className="mb-6">
                                    This is not just coding; it's <span className="text-white font-medium">Agentic-Dev</span>.
                                    Dominar la IA hoy es la diferencia entre liderar la planta o quedarse atrás.
                                    Aprende a <span className="text-cyan-300 font-medium">orquestar sistemas autónomos</span> para resolver problemas críticos de manufactura.
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm font-mono text-slate-500">
                                    <span className="flex items-center gap-1"><Terminal className="w-4 h-4 text-cyan-500" /> 8h Intensive</span>
                                    <span className="flex items-center gap-1"><Cpu className="w-4 h-4 text-purple-500" /> Agentic Workflow</span>
                                    <span className="flex items-center gap-1"><Activity className="w-4 h-4 text-emerald-500" /> Real Impact</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* 2. BENTO GRID - PATHS */}
                        <div>
                            <SectionHeader title="Select Protocol" subtitle="Choose your training path" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {PATH_OPTIONS.map((path, idx) => (
                                    <motion.div
                                        key={path.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={cn(
                                            "group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-500 cursor-pointer h-[280px]",
                                            path.colSpan
                                        )}
                                        onClick={() => handlePathSelect(path.id)}
                                    >
                                        <Image
                                            src={`${SUPABASE_STORAGE_URL}/${path.img}`}
                                            alt={path.title}
                                            fill
                                            className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                                        <div className="absolute bottom-0 left-0 p-6 w-full">
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge className="bg-white/10 text-white hover:bg-white/20 border-0 backdrop-blur-md">
                                                    {path.badge || "OPEN"}
                                                </Badge>
                                                {path.date && (
                                                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2 py-1 rounded border border-cyan-900">
                                                        {path.date}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                                                {path.title}
                                            </h3>
                                            <p className="text-sm text-slate-300 line-clamp-2 mb-4 group-hover:text-white transition-colors">
                                                {path.description}
                                            </p>

                                            <div className="flex items-center text-xs font-bold uppercase tracking-wider text-cyan-500 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                Initialize Sequence <ArrowRight className="ml-2 w-3 h-3" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* 3. THE PROTOCOL - MERGED TIMELINE & ARCHITECTURE */}
                        <div className="pb-12">
                            <SectionHeader title="The Protocol" subtitle="From Zero to Architect" />

                            <div className="relative pl-4 space-y-0">
                                {/* Connector Line */}
                                <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-500/30 via-purple-500/30 to-slate-800" />

                                {PROTOCOL_STEPS.map((step, idx) => (
                                    <ProtocolStep
                                        key={idx}
                                        time={step.time}
                                        title={step.title}
                                        header={step.header}
                                        desc={step.desc}
                                        icon={<step.icon className="w-5 h-5 text-cyan-400" />}
                                        tags={step.tags}
                                        isLast={step.isLast}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* === RIGHT SIDEBAR (4 Cols) === */}
                    <div className="lg:col-span-4 relative">
                        <div className="lg:sticky lg:top-8 space-y-6">

                            {/* UPCOMING SETS WIDGET */}
                            <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-1 shadow-2xl shadow-cyan-950/20">
                                <div className="rounded-xl bg-[#0a0e27] border border-white/5 p-6 space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                            <CalendarDays className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold">Upcoming Sets</h4>
                                            <p className="text-xs text-slate-500">Q1 2026 Schedule</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <SidebarEvent
                                            day="24" month="JAN" title="Tec Saltillo"
                                            status="REGISTER" statusColor="text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                                            onClick={() => handlePathSelect('tec-saltillo')}
                                        />
                                        <SidebarEvent
                                            day="31" month="JAN" title="Alebrije (Module II)"
                                            status="ADVANCED" statusColor="text-amber-400 border-amber-500/30 bg-amber-500/10"
                                            onClick={() => handlePathSelect('student')}
                                            note="Prerequisite: Level 1"
                                        />
                                        <SidebarEvent
                                            day="07" month="FEB" title="Alebrije (Module I)"
                                            status="OPEN" statusColor="text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                                            onClick={() => handlePathSelect('student')}
                                        />
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="w-full border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:text-white text-slate-400"
                                        onClick={() => handlePathSelect('online-group')}
                                    >
                                        Check Remote Availability
                                    </Button>
                                </div>
                            </div>

                            {/* SYSTEM REQS WIDGET (UPDATED) */}
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-slate-500" /> System Requirements
                                    </h4>
                                    <div className="group relative">
                                        <Info className="w-4 h-4 text-slate-600 cursor-help" />
                                        <div className="absolute right-0 w-48 p-2 bg-black/90 text-[10px] text-slate-400 rounded border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mb-1 bottom-full">
                                            Recommended specs for optimal performance.
                                        </div>
                                    </div>
                                </div>

                                <ul className="space-y-4 text-sm font-mono leading-relaxed">
                                    <li className="pb-3 border-b border-white/5">
                                        <div className="text-xs text-slate-500 mb-1">Hardware (Recommended)</div>
                                        <div className="text-cyan-400 font-semibold">Laptop 12GB+ RAM</div>
                                        <div className="text-slate-500 text-xs mt-0.5">SSD with 50GB+ Free</div>
                                    </li>
                                    <li className="pb-3 border-b border-white/5">
                                        <div className="text-xs text-slate-500 mb-1">Knowledge</div>
                                        <div className="text-slate-300">Engineering OR Programming Logic</div>
                                        <div className="text-slate-500 text-[10px] italic">(Recommended)</div>
                                    </li>
                                    <li>
                                        <div className="text-xs text-slate-500 mb-1">Language</div>
                                        <div className="text-slate-300">Technical English</div>
                                        <div className="text-slate-500 text-[10px] italic">(Rec. for AI Chain-of-Thought)</div>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            {/* Registration Modal - Preserving original logic */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent
                    data-dialog-content
                    className="sm:max-w-4xl max-h-[85vh] overflow-hidden flex flex-col p-0 bg-[#0a0e27] border-slate-800 text-white"
                >
                    <DialogTitle className="sr-only">{getModalTitle()}</DialogTitle>
                    <DialogDescription className="sr-only">
                        Register for the selected course path.
                    </DialogDescription>

                    <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
                        {selectedPath && (
                            <CourseRegistrationForm
                                eventType={selectedPath as any}
                                eventDate={selectedPath === 'tec-saltillo' ? new Date('2026-01-24') : undefined}
                                onSuccess={handleFormSuccess}
                                onCancel={() => setIsModalOpen(false)}
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>

        </section>
    );
}

// --- SUB-COMPONENTS ---

function SectionHeader({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <div className="mb-8 border-l-2 border-cyan-500 pl-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
            <p className="text-slate-400 text-sm font-mono uppercase tracking-widest mt-1">{subtitle}</p>
        </div>
    );
}

function ProtocolStep({ time, title, header, desc, icon, tags, isLast }: { time: string, title: string, header: string, desc: string, icon: any, tags: string[], isLast?: any }) {
    return (
        <div className={cn("relative pl-12 pb-10 group", isLast ? "pb-0" : "")}>
            {/* Connector Highlight on Hover */}
            <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Dot */}
            <div className="absolute left-[20px] top-1 w-4 h-4 rounded-full bg-[#050816] border-2 border-slate-700 group-hover:border-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all z-10" />

            <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4">

                {/* Time Badge */}
                <span className="text-xs font-mono text-cyan-500 px-2 py-0.5 rounded bg-cyan-950/30 border border-cyan-900/50 w-fit shrink-0 mt-1">
                    {time}
                </span>

                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h4 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors flex items-center gap-2">
                            {title}
                        </h4>
                        <span className="hidden sm:inline text-slate-600">|</span>
                        <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">{header}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                        {tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="bg-white/5 text-slate-400 text-[10px] border-white/5 hover:bg-white/10 px-1.5 py-0 h-5">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">{desc}</p>
                </div>
            </div>
        </div>
    );
}

function SidebarEvent({ day, month, title, status, statusColor, note, onClick }: any) {
    return (
        <div
            onClick={onClick}
            className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 cursor-pointer transition-all group"
        >
            <div className="flex flex-col items-center justify-center p-2 bg-[#050816] rounded-lg border border-slate-800 min-w-[50px]">
                <span className="text-xs font-black text-slate-500">{month}</span>
                <span className="text-lg font-bold text-white">{day}</span>
            </div>
            <div className="flex-1">
                <div className="flex flex-col">
                    <h5 className="font-bold text-slate-200 text-sm group-hover:text-white transition-colors">{title}</h5>
                    {note && <span className="text-[10px] text-amber-500/80 font-mono">{note}</span>}
                </div>
                <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-5 mt-1 border w-fit", statusColor)}>
                    {status}
                </Badge>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
        </div>
    );
}
