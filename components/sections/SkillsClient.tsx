"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
            <div className="absolute inset-0 bg-slate-950" />

            <div className="container relative mx-auto px-4 z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
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
                    <TabsList className="flex flex-wrap gap-x-6 gap-y-2 justify-start bg-transparent border-b border-slate-800 rounded-none p-0 h-auto mb-12">
                        {skillCategories.map((cat) => (
                            <TabsTrigger
                                key={cat.id}
                                value={cat.id}
                                className="bg-transparent text-slate-400 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-0 pb-3 text-sm font-medium shadow-none"
                            >
                                {cat.label}
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
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2 mt-8">
                                        {group.skills.map((skill, idx) => (
                                            <div key={idx} className="text-slate-300 text-sm py-1.5 border-b border-slate-900 last:border-0">
                                                {skill.icon && (
                                                    <span className="text-slate-500 size-4 mr-2 inline-block" />
                                                )}
                                                {skill.name}
                                            </div>
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
