"use client";

import { motion } from "framer-motion";
import { MapPin, Mountain, BookOpen, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeyondCardProps {
    title: string;
    description: string | React.ReactNode;
    badge: string[];
    icon: any;
    className?: string;
    gradient: string;
}

function BeyondCard({ title, description, badge, icon: Icon, className, gradient }: BeyondCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className={cn(
                "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10 flex flex-col justify-between",
                className
            )}
        >
            {/* Background Gradient/Image Placeholder */}
            <div className={cn("absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30", gradient)} />

            {/* Content */}
            <div className="relative z-10">
                <div className="mb-6 flex items-start justify-between">
                    <div className="rounded-full bg-white/10 p-3 backdrop-blur-md">
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex gap-2">
                        {badge.map((b, i) => (
                            <span key={i} className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-md border border-white/5">
                                {b}
                            </span>
                        ))}
                    </div>
                </div>

                <h3 className="mb-4 text-2xl font-bold text-white">{title}</h3>
                <div className="text-slate-300 leading-relaxed text-sm md:text-base space-y-4">
                    {description}
                </div>
            </div>
        </motion.div>
    );
}

export function BeyondCode() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container relative mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4"
                    >
                        Beyond the Code
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        The experiences that shaped who I am
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {/* Card 1: Toronto */}
                    <BeyondCard
                        title="Six Months That Changed Everything"
                        icon={MapPin}
                        gradient="bg-gradient-to-br from-red-500 to-orange-500"
                        badge={["🌍 Cultural Immersion", "🗣️ English Mastery"]}
                        className="min-h-[400px]"
                        description={
                            <>
                                <p>
                                    At 20, I spent six months living in <strong>Toronto, Canada</strong>, working and fully immersing myself in an English-speaking environment. Living independently, far from home, was both challenging and incredibly rewarding.
                                </p>
                                <p>
                                    I shared accommodations with people from Korea, China, India, and Canada. This multicultural experience not only accelerated my English proficiency but broadened my worldview in ways I never imagined.
                                </p>
                                <p>
                                    The friendships I formed endure to this day, and I've returned to Toronto for two-month stays in each of the past two summers.
                                </p>
                            </>
                        }
                    />

                    {/* Card 2: Legendarios */}
                    <BeyondCard
                        title="A Transformative Wilderness Journey"
                        icon={Mountain}
                        gradient="bg-gradient-to-br from-emerald-600 to-teal-600"
                        badge={["💪 Resilience", "🏔️ Transformation"]}
                        className="min-h-[400px]"
                        description={
                            <>
                                <p>
                                    In 2024, I embarked on the <strong>Legendarios Track</strong> experience in Tampa, Florida—a four-day immersive adventure designed to challenge men physically and spiritually.
                                </p>
                                <p>
                                    Five days in the wilderness with minimal food, long-distance hikes, heavy lifting, and extended physical challenges. Each task was a lesson in resilience, self-discovery, and pushing beyond perceived limits.
                                </p>
                                <p>
                                    This experience taught me that transformation happens outside your comfort zone, and that personal growth requires both physical endurance and mental fortitude.
                                </p>
                            </>
                        }
                    />

                    {/* Card 3: Books */}
                    <BeyondCard
                        title="Lifelong Learning Philosophy"
                        icon={BookOpen}
                        gradient="bg-gradient-to-br from-blue-500 to-indigo-500"
                        badge={["📖 Growth Mindset", "🧠 Personal Development"]}
                        description={
                            <>
                                <p className="mb-4">
                                    I'm deeply influenced by principles of personal development, effective communication, and financial wisdom. Key pillars of my mindset:
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-slate-400">
                                    <li>Proactive living & principle-centered leadership</li>
                                    <li>Building genuine relationships through empathy</li>
                                    <li>Wealth-building through discipline</li>
                                    <li>Continuous improvement & compound effect</li>
                                </ul>
                            </>
                        }
                    />

                    {/* Card 4: Basketball */}
                    <BeyondCard
                        title="Where I Recharge"
                        icon={Trophy}
                        gradient="bg-gradient-to-br from-orange-500 to-amber-500"
                        badge={["🏀 Team Player", "⚡ Balance"]}
                        description={
                            <>
                                <p>
                                    When I'm not coding or optimizing processes, you'll find me on the basketball court. Basketball taught me teamwork, strategy under pressure, and the importance of consistent practice.
                                </p>
                                <p className="mt-4">
                                    It's my way of staying physically active, clearing my mind, and maintaining balance. Whether playing pickup games or watching the NBA, basketball keeps me grounded and energized.
                                </p>
                            </>
                        }
                    />
                </div>

                <div className="mt-16 text-center">
                    <p className="text-xl md:text-2xl font-light text-slate-300 italic">
                        "The only limit is your imagination"
                    </p>
                </div>
            </div>
        </section>
    );
}
