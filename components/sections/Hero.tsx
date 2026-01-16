"use client";

import Image from "next/image";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero({ lang = "en" }: { lang?: string }) {
    const titles = [
        "OPEX Engineer",
        "Automation Specialist",
        "Full-Stack Developer",
        "POV: Your Ideas, Automated",
    ];

    return (
        <section className="relative min-h-[calc(100vh-4rem)] flex items-start justify-center overflow-hidden pt-0 pb-0 px-4">
            {/* Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] -z-10 animate-pulse delay-1000" />

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-2 md:mt-4">
                {/* Left Column: Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 text-center lg:text-left z-10"
                >
                    <div className="inline-flex items-center space-x-2 bg-slate-800/50 rounded-full px-4 py-1.5 border border-slate-700/50 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium text-slate-300">
                            Open to new projects
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white whitespace-nowrap">
                        Benjamin <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Rodríguez</span>
                    </h1>

                    <div className="text-2xl lg:text-3xl font-light text-slate-300 h-20">
                        <Typewriter
                            options={{
                                strings: titles,
                                autoStart: true,
                                loop: true,
                                delay: 50,
                                deleteSpeed: 30,
                            }}
                        />
                    </div>

                    <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        Where Engineering Meets Innovation. bridging the gap between manufacturing processes and cutting-edge technology to eliminate waste and unlock efficiency.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                        <Link href={`/${lang}#contact`}>
                            <Button
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 py-6 text-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300 group"
                            >
                                Hire Me
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href={`/${lang}#services`}>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full px-8 py-6 text-lg transition-all duration-300"
                            >
                                Explore Tools
                                <Sparkles className="ml-2 h-5 w-5 text-purple-400" />
                            </Button>
                        </Link>
                    </div>


                </motion.div>

                {/* Right Column: Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex justify-center z-10"
                >
                    {/* Rotating Borders */}
                    <div className="relative w-72 h-72 lg:w-96 lg:h-96">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-cyan-500 to-purple-500 animate-spin-slow opacity-70 blur-md"></div>
                        <div className="absolute inset-1 rounded-full bg-[#0a0e27] z-10"></div>

                        {/* Image Container */}
                        <div className="absolute inset-2 rounded-full overflow-hidden z-20 border-4 border-slate-800/50 shadow-2xl">
                            <Image
                                src="/profile.jpg"
                                alt="Benjamin Rodríguez"
                                fill
                                sizes="(max-width: 768px) 288px, (max-width: 1024px) 384px, 384px"
                                className="object-cover hover:scale-105 transition-transform duration-500"
                                priority
                            />
                        </div>

                        {/* Floating Elements */}

                    </div>
                </motion.div>

            </div>
        </section>
    );
}
