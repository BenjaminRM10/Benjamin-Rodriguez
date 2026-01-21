"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SkillBadge } from "@/components/shared/SkillBadge";
import { Laptop, Database, Cpu, Wrench, BarChart3, Globe, Users } from "lucide-react";
import type { ProfileTranslations } from "@/lib/i18n/types";

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

interface SkillsClientProps {
    initialSkills: any[];
    translations: ProfileTranslations['skills'];
}

// Define category icons statically
const categoryIcons: Record<string, any> = {
    "devops": Globe,
    "engineering": Wrench,
    "programming": Laptop,
    "ai": Cpu,
    "data": BarChart3,
    "leadership": Users
};

export function SkillsClient({ initialSkills, translations }: SkillsClientProps) {

    // Map category IDs to translation keys
    const categoryLabels: Record<string, string> = {
        "devops": translations.categories.devops,
        "engineering": translations.categories.engineering,
        "programming": translations.categories.programming,
        "ai": translations.categories.ai,
        "data": translations.categories.data,
        "leadership": translations.categories.leadership
    };

    const skillCategories = useMemo(() => {
        const categories: SkillCategory[] = [];

        // Group skills by categoryId
        const skillsByCategory: Record<string, any[]> = {};
        initialSkills.forEach(skill => {
            if (!skillsByCategory[skill.categoryId]) {
                skillsByCategory[skill.categoryId] = [];
            }
            skillsByCategory[skill.categoryId].push(skill);
        });

        // Build categories based on icons order
        Object.keys(categoryIcons).forEach(catId => {
            const catSkills = skillsByCategory[catId] || [];
            if (catSkills.length === 0) return;

            // Group by groupTitle if present
            const groups: SkillGroup[] = [];
            const skillsByGroup: Record<string, Skill[]> = {};
            const ungroupedSkills: Skill[] = [];

            catSkills.forEach(s => {
                const skillObj: Skill = {
                    name: s.name,
                    icon: s.icon,
                    certified: s.certified,
                    description: s.description
                };

                if (s.groupTitle) {
                    if (!skillsByGroup[s.groupTitle]) {
                        skillsByGroup[s.groupTitle] = [];
                    }
                    skillsByGroup[s.groupTitle].push(skillObj);
                } else {
                    ungroupedSkills.push(skillObj);
                }
            });

            if (ungroupedSkills.length > 0) {
                groups.push({ skills: ungroupedSkills });
            }

            Object.entries(skillsByGroup).forEach(([title, groupSkills]) => {
                groups.push({ title, skills: groupSkills });
            });

            categories.push({
                id: catId,
                label: categoryLabels[catId] || catId,
                icon: categoryIcons[catId],
                groups
            });
        });

        return categories;
    }, [initialSkills, categoryLabels]);

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
                        {translations.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        {translations.subtitle}
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
                                {translations.otherSkills.title}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                                    {translations.otherSkills.items.map((skill, idx) => (
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

