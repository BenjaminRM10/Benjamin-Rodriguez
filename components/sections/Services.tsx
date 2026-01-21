"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Bot,
    Code,
    MessageSquare,
    FileSpreadsheet,
    BarChart3,
    Terminal,
    Database,
    Globe,
    Smartphone,
    Server,
    Cpu,
    BrainCircuit
} from "lucide-react";
// ... (imports remain)
import { ServiceCard } from "@/components/shared/ServiceCard";
// CourseDetailsModal import removed

// ... (ServiceCardProps interface remains)

interface ServiceItem {
    title: string;
    description: string;
    cta: string;
}

interface ServicesProps {
    mode?: 'all' | 'business' | 'academy';
    lang?: string;
    translations?: {
        title: string;
        titleHighlight: string;
        subtitle: string;
        professionalServices: string;
        availableCourses: string;
        items?: {
            webDev?: ServiceItem;
            whatsapp?: ServiceItem;
            excel?: ServiceItem;
            data?: ServiceItem;
            pythonAI?: ServiceItem;
        };
    };
}

export function Services({ mode = 'all', lang, translations }: ServicesProps) {
    // SelectedCourse state removed

    // Courses array removed as legacy modules are no longer displayed

    const t = translations?.items;

    const services = [
        {
            id: "webDev",
            title: t?.webDev?.title ?? "Web Development",
            description: t?.webDev?.description ?? "Custom, high-performance web applications tailored to your business needs. SEO-optimized and built for scale.",
            icon: Globe,
            gradient: "from-purple-500 to-violet-500",
            secondaryCtaText: t?.webDev?.cta ?? "Get a Quote",
            secondaryCtaLink: "https://wa.me/528661479075?text=Hi!%20I'm%20interested%20in%20Web%20Development%20services",
            techStack: [
                { icon: Code, name: "React" },
                { icon: Server, name: "Node.js" },
                { icon: Smartphone, name: "Responsive" }
            ]
        },
        {
            id: "whatsapp",
            title: t?.whatsapp?.title ?? "WhatsApp Automation",
            description: t?.whatsapp?.description ?? "Automate your customer service and sales with intelligent WhatsApp bots. 24/7 availability for your clients.",
            icon: MessageSquare,
            gradient: "from-green-500 to-emerald-500",
            secondaryCtaText: t?.whatsapp?.cta ?? "Start Automating",
            secondaryCtaLink: "https://wa.me/528661479075?text=Hi!%20I'm%20interested%20in%20WhatsApp%20Automation",
            techStack: [
                { icon: Bot, name: "Chatbots" },
                { icon: Database, name: "CRM" },
                { icon: Server, name: "API" }
            ]
        },
        {
            id: "excel",
            title: t?.excel?.title ?? "Excel Automation",
            description: t?.excel?.description ?? "Say goodbye to manual data entry. Custom dashboards, VBA macros, and Python scripts to automate your spreadsheets.",
            icon: FileSpreadsheet,
            gradient: "from-orange-500 to-red-500",
            secondaryCtaText: t?.excel?.cta ?? "Get Custom Solution",
            secondaryCtaLink: "https://wa.me/528661479075?text=Hi!%20I'm%20interested%20in%20Excel%20Automation",
            techStack: [
                { icon: FileSpreadsheet, name: "Excel" },
                { icon: Terminal, name: "VBA" },
                { icon: Code, name: "Python" }
            ]
        },
        {
            id: "data",
            title: t?.data?.title ?? "Data Analysis",
            description: t?.data?.description ?? "Turn your raw data into actionable insights. Interactive dashboards, reporting pipelines, and predictive analytics.",
            icon: BarChart3,
            gradient: "from-pink-500 to-rose-500",
            secondaryCtaText: t?.data?.cta ?? "Analyze My Data",
            secondaryCtaLink: "https://wa.me/528661479075?text=Hi!%20I'm%20interested%20in%20Data%20Analysis%20services",
            techStack: [
                { icon: BarChart3, name: "PowerBI" },
                { icon: Database, name: "SQL" },
                { icon: Terminal, name: "Python" }
            ]
        },
        {
            id: "pythonAI",
            title: t?.pythonAI?.title ?? "Python + AI Integration",
            description: t?.pythonAI?.description ?? "Learn to build FastAPI applications, deploy local LLMs (Llama), integrate AI into Excel, and create your own AI-powered tools.",
            icon: BrainCircuit,
            gradient: "from-emerald-500 to-teal-500",
            secondaryCtaText: t?.pythonAI?.cta ?? "Enroll Now",
            secondaryCtaLink: "/academy",
            techStack: [
                { icon: Code, name: "FastAPI" },
                { icon: Cpu, name: "Llama 3" },
                { icon: FileSpreadsheet, name: "Excel AI" }
            ]
        }
    ];

    // openModal function removed

    return (
        <section id="services" className="py-24 relative overflow-hidden bg-slate-950">

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            {translations?.title ?? "Solutions for the"} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">{translations?.titleHighlight ?? "Future"}</span>
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
                            {translations?.subtitle ?? "Whether you need to automate your workflows, analyze your data, or build the next big thing, I have the stack to make it happen."}
                        </p>
                    </motion.div>
                </div>

                {/* Legacy Courses - Removed per user request */}

                {/* Services Grid */}
                <div>
                    {(mode === 'academy') && (
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-orange-600 rounded-full inline-block"></span>
                            {translations?.availableCourses ?? "Available Courses"}
                        </h3>
                    )}

                    {(mode === 'all' || mode === 'business') && (
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-1 h-8 bg-gradient-to-b from-blue-400 to-cyan-600 rounded-full inline-block"></span>
                            {translations?.professionalServices ?? "Professional Services"}
                        </h3>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services
                            .filter(service => {
                                if (mode === 'all') return true;
                                if (mode === 'academy') return service.id === "pythonAI";
                                if (mode === 'business') return service.id !== "pythonAI";
                                return true;
                            })
                            .map((service, index) => (
                                <ServiceCard
                                    key={index}
                                    {...service}
                                    delay={index * 0.1}
                                />
                            ))}
                    </div>
                </div>
            </div>

            {/* CourseDetailsModal removed */}
        </section>
    );
}
