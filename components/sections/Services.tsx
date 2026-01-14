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
import { ServiceCard } from "@/components/shared/ServiceCard";
import { CourseDetailsModal } from "@/components/modals/CourseDetailsModal";

export function Services() {
    const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

    const courses = [
        {
            id: "ai-fullstack",
            title: "AI & Full Stack Training",
            description: "Learn to build modern, AI-powered applications from scratch. Master Next.js, Supabase, and generative AI integrations in this intensive 2-day course.",
            icon: BrainCircuit,
            gradient: "from-blue-500 to-cyan-500",
            ctaText: "View Course Details",
            ctaAction: "modal",
            variant: "course",
            info: "⏱️ 10 hours total (5h/day) • 👥 Individual or Group",
            secondaryCtaText: "Enroll via WhatsApp",
            secondaryCtaLink: "https://wa.me/528661479075?text=Hi!%20I'm%20interested%20in%20the%20AI%20%26%20Full%20Stack%20Training%20course",
            techStack: [
                { icon: Code, name: "Next.js" },
                { icon: Database, name: "Supabase" },
                { icon: Bot, name: "AI SDK" }
            ],
            details: {
                duration: "10 Hours (2 Days)",
                format: "Online / In-person",
                schedule: "Flexible, arranged per request",
                requirements: ["Laptop", "Basic JavaScript knowledge", "Internet Connection"],
                curriculum: [
                    "Day 1: Modern Stack Foundations (Next.js 14, Tailwind, Supabase Auth & DB)",
                    "Day 1: Building the Core Application & Real-time features",
                    "Day 2: AI Integration (OpenAI/Gemini API, Vercel AI SDK)",
                    "Day 2: Advanced Features (Vector Search, RAG) & Deployment"
                ],
                outcomes: [
                    "Build and deploy a full-stack AI app",
                    "Understand the modern React ecosystem",
                    "Master Supabase for backend-as-a-service",
                    "Learn to integrate LLMs into apps"
                ]
            }
        },
        {
            id: "python-ai",
            title: "Python + AI Solutions",
            description: "Build FastAPI applications, deploy local LLMs (Llama), integrate AI into Excel, and create your own AI-powered tools. Perfect for automation enthusiasts.",
            icon: Terminal,
            gradient: "from-yellow-500 to-amber-500",
            ctaText: "View Course Details",
            ctaAction: "modal",
            variant: "course",
            info: "⏱️ 10 hours total (5h/day) • 👥 Individual or Group",
            secondaryCtaText: "Enroll via WhatsApp",
            secondaryCtaLink: "https://wa.me/528661479075?text=Hi!%20I'm%20interested%20in%20the%20Python%20%2B%20AI%20Solutions%20course",
            techStack: [
                { icon: Code, name: "FastAPI" },
                { icon: Cpu, name: "Llama 3" },
                { icon: Server, name: "Docker" }
            ],
            details: {
                duration: "10 Hours (2 Days)",
                format: "Online / In-person",
                schedule: "Flexible, arranged per request",
                requirements: ["Laptop", "Basic Python knowledge"],
                curriculum: [
                    "Day 1: Python Advanced Patterns & FastAPI",
                    "Day 1: Building Robust APIs & Async Programming",
                    "Day 2: Local LLMs with Ollama & LangChain",
                    "Day 2: AI-Powered Automation Scripts & Excel Integration"
                ],
                outcomes: [
                    "Create high-performance APIs with FastAPI",
                    "Run and integrate local LLMs privacy-first",
                    "Automate complex workflows",
                    "Build custom AI tools for business"
                ]
            }
        }
    ];

    const services = [
        {
            title: "Web Development",
            description: "Custom, high-performance web applications tailored to your business needs. SEO-optimized and built for scale.",
            icon: Globe,
            gradient: "from-purple-500 to-violet-500",
            ctaText: "See My Work",
            ctaAction: "scroll",
            ctaValue: "#portfolio",
            secondaryCtaText: "Get a Quote",
            secondaryCtaLink: "https://wa.me/528661479075?text=Hi!%20I'm%20interested%20in%20Web%20Development%20services",
            techStack: [
                { icon: Code, name: "React" },
                { icon: Server, name: "Node.js" },
                { icon: Smartphone, name: "Responsive" }
            ]
        },
        {
            title: "WhatsApp Automation",
            description: "Automate your customer service and sales with intelligent WhatsApp bots. 24/7 availability for your clients.",
            icon: MessageSquare,
            gradient: "from-green-500 to-emerald-500",
            ctaText: "Start Automating", // Changed to match previous general link as 'Learn More' usually implies modal but user directed a scroll/link
            ctaAction: "link", // Or modal if we had one, but user link is robust
            ctaValue: "https://wa.me/528661479075?text=Hi!%20I'm%20interested%20in%20WhatsApp%20Automation",
            secondaryCtaText: "Start Automating",
            secondaryCtaLink: "https://wa.me/528661479075?text=Hi!%20I'm%20interested%20in%20WhatsApp%20Automation",
            techStack: [
                { icon: Bot, name: "Chatbots" },
                { icon: Database, name: "CRM" },
                { icon: Server, name: "API" }
            ]
        },
        {
            title: "Excel Automation",
            description: "Say goodbye to manual data entry. Custom dashboards, VBA macros, and Python scripts to automate your spreadsheets.",
            icon: FileSpreadsheet,
            gradient: "from-orange-500 to-red-500",
            ctaText: "Download Templates",
            ctaAction: "download",
            ctaValue: "https://example.com/templates",
            secondaryCtaText: "Get Custom Solution",
            secondaryCtaLink: "https://wa.me/528661479075?text=Hi!%20I'm%20interested%20in%20Excel%20Automation",
            techStack: [
                { icon: FileSpreadsheet, name: "Excel" },
                { icon: Terminal, name: "VBA" },
                { icon: Code, name: "Python" }
            ]
        },
        {
            title: "Data Analysis",
            description: "Turn your raw data into actionable insights. Interactive dashboards, reporting pipelines, and predictive analytics.",
            icon: BarChart3,
            gradient: "from-pink-500 to-rose-500",
            ctaText: "Get Insights",
            ctaAction: "link",
            ctaValue: "https://wa.me/528661479075?text=Hi!%20I'm%20interested%20in%20Data%20Analysis%20services",
            secondaryCtaText: "Analyze My Data",
            secondaryCtaLink: "https://wa.me/528661479075?text=Hi!%20I'm%20interested%20in%20Data%20Analysis%20services",
            techStack: [
                { icon: BarChart3, name: "PowerBI" },
                { icon: Database, name: "SQL" },
                { icon: Terminal, name: "Python" }
            ]
        }
    ];

    const openModal = (course: any) => {
        setSelectedCourse({
            ...course.details,
            title: course.title,
            description: course.description,
            whatsAppLink: course.secondaryCtaLink
        });
    };

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
                            Solutions for the <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Future</span>
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
                            Whether you need to automate your workflows, analyze your data, or build the next big thing, I have the stack to make it happen.
                        </p>
                    </motion.div>
                </div>

                {/* Featured Courses Grid */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-full inline-block"></span>
                        Featured Courses
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {courses.map((course, index) => (
                            <ServiceCard
                                key={index}
                                {...course}
                                variant="course"
                                ctaAction="modal"
                                onCtaClick={() => openModal(course)}
                                delay={index * 0.1}
                            />
                        ))}
                    </div>
                </div>

                {/* Services Grid */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-1 h-8 bg-gradient-to-b from-blue-400 to-cyan-600 rounded-full inline-block"></span>
                        Professional Services
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={index}
                                {...service}
                                // Cast string literal to union type expected by component
                                ctaAction={service.ctaAction as any}
                                delay={index * 0.1}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <CourseDetailsModal
                isOpen={!!selectedCourse}
                onClose={() => setSelectedCourse(null)}
                course={selectedCourse}
            />
        </section>
    );
}
