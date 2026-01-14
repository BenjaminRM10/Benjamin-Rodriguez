"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SkillBadge } from "@/components/shared/SkillBadge";
import { Laptop, Database, Cpu, Wrench, BarChart3, Globe, Users } from "lucide-react";

interface Skill {
    name: string;
    icon: string | null;
    certified?: boolean;
    description?: string;
}

interface SkillGroup {
    title?: string;
    skills: Skill[];
}

interface SkillCategory {
    id: string;
    label: string;
    icon: any;
    groups: SkillGroup[];
}

const skillCategories: SkillCategory[] = [
    {
        id: "devops",
        label: "DevOps",
        icon: Globe,
        groups: [{
            skills: [
                { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
                { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
                { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
                { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
            ]
        }]
    },
    {
        id: "engineering",
        label: "Core Engineering",
        icon: Wrench,
        groups: [
            {
                title: "Quality & Process Excellence",
                skills: [
                    { name: "Six Sigma Green Belt", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/minitab/minitab-original.svg", certified: true },
                    { name: "OPEX & Lean", icon: null },
                    { name: "Kaizen", icon: null },
                    { name: "PFMEA / APQP / PPAP", icon: null },
                    { name: "Operational Excellence", icon: null },
                    { name: "Process Transformation", icon: null },
                    { name: "Streamlining Process", icon: null },
                    { name: "Lean Applications", icon: null },
                ]
            },
            {
                title: "Design & CAD",
                skills: [
                    { name: "SolidWorks", icon: null, certified: true },
                    { name: "GD&T", icon: null },
                    { name: "Product Design", icon: null },
                    { name: "Pro/Mechanica", icon: null },
                    { name: "Packaging", icon: null },
                ]
            },
            {
                title: "Engineering Fundamentals",
                skills: [
                    { name: "Thermodynamics", icon: null },
                    { name: "Fluid Mechanics", icon: null },
                    { name: "Mechanics", icon: null },
                    { name: "Machining", icon: null },
                    { name: "Mechanical Engineering", icon: null },
                    { name: "Power Projects", icon: null },
                    { name: "Production Coordination", icon: null },
                ]
            }
        ]
    },
    {
        id: "programming",
        label: "Programming",
        icon: Laptop,
        groups: [{
            skills: [
                { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
                { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
                { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
                { name: "React & Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
                { name: "HTML5/CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
                { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
                { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
                { name: "VBA", icon: null },
                { name: "Chatbot Development", icon: null },
                { name: "Back-end Operations", icon: null },
                { name: "APIs", icon: null },
                { name: "Software Projects", icon: null },
            ]
        }]
    },
    {
        id: "ai",
        label: "AI & Automation",
        icon: Cpu,
        groups: [{
            skills: [
                { name: "Artificial Intelligence (AI)", icon: null },
                { name: "MCP Servers", icon: null },
                { name: "Claude & Gemini APIs", icon: null },
                { name: "n8n", icon: null, certified: true },
                { name: "Local LLMs (Llama)", icon: null },
                { name: "LangChain", icon: null },
                { name: "WhatsApp Bots", icon: null },
            ]
        }]
    },
    {
        id: "data",
        label: "Data & Analytics",
        icon: BarChart3,
        groups: [{
            skills: [
                { name: "Data Analysis", icon: null },
                { name: "Statistics", icon: null },
                { name: "Minitab", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/minitab/minitab-original.svg", certified: true },
                { name: "Power BI", icon: null },
                { name: "Excel Power Query", icon: null },
            ]
        }]
    },
    {
        id: "leadership",
        label: "Leadership & Professional Skills",
        icon: Users,
        groups: [{
            skills: [
                { name: "Strategic Communication", description: "Influencing & building relationships", icon: null },
                { name: "Proactive Leadership", description: "Principle-centered approach", icon: null },
                { name: "Continuous Growth Mindset", description: "Personal development focus", icon: null },
                { name: "Cross-cultural Collaboration", icon: null },
                { name: "Financial Intelligence", description: "Wealth-building principles", icon: null },
                { name: "Project Management", icon: null },
                { name: "Technical Training & Mentorship", icon: null },
                { name: "Bilingual", description: "English (C2) ↔ Spanish (Native)", icon: null },
                { name: "Leading Meetings", icon: null },
                { name: "Administrative Processes", icon: null },
                { name: "Consumer Packaged Goods (CPG)", icon: null },
                { name: "Labor Certification", icon: null },
                { name: "Creativity Skills", icon: null },
            ]
        }]
    }
];

const otherSkills = [
    "Computer Repair & Troubleshooting",
    "OS Installation & Optimization",
    "Network Configuration (AdGuard, Pi-hole)",
    "VPN Setup & Security",
    "IP Management",
    "Point-to-point Wireless Systems",
    "Starlink Installation",
    "Hardware Diagnostics",
];

export function Skills() {
    return (
        <section className="py-24 relative overflow-hidden" id="skills">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-slate-950">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container relative mx-auto px-4 z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4"
                    >
                        My Toolkit
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        Technologies I use to bring ideas to life
                    </motion.p>
                </div>

                <Tabs defaultValue="devops" className="max-w-6xl mx-auto">
                    <TabsList className="bg-white/5 border border-white/10 p-2 h-auto grid grid-cols-2 md:grid-cols-3 gap-3 mb-12 w-full rounded-2xl">
                        {skillCategories.map((category) => (
                            <TabsTrigger
                                key={category.id}
                                value={category.id}
                                className="px-4 py-3 text-sm md:text-base data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all flex items-center justify-center gap-2 rounded-xl hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <category.icon className="w-5 h-5" />
                                <span className="truncate">{category.label}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {skillCategories.map((category) => (
                        <TabsContent key={category.id} value={category.id} className="mt-0 space-y-8">
                            {category.groups.map((group, groupIdx) => (
                                <motion.div
                                    key={groupIdx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: groupIdx * 0.1 }}
                                >
                                    {group.title && (
                                        <h3 className="text-xl text-slate-300 font-semibold mb-4 pl-1 flex items-center gap-2">
                                            {group.title}
                                            <div className="h-px bg-white/10 flex-1 ml-2" />
                                        </h3>
                                    )}
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {group.skills.map((skill, idx) => (
                                            <SkillBadge
                                                key={idx}
                                                name={skill.name}
                                                icon={skill.icon || undefined}
                                                description={skill.description}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </TabsContent>
                    ))}
                </Tabs>

                {/* Other Skills Accordion */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl mx-auto mt-16"
                >
                    <Accordion type="single" collapsible>
                        <AccordionItem value="other-skills" className="border-white/10">
                            <AccordionTrigger className="text-slate-300 hover:text-white hover:no-underline">
                                Other Technical Skills
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                                    {otherSkills.map((skill, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-slate-400">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </motion.div>

            </div>
        </section>
    );
}

