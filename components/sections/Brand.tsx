"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export const Brand = () => {
    return (
        <section className="py-0 md:py-8 px-4 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-3xl mx-auto"
            >
                <div className="relative group">
                    <div className="absolute inset-0 bg-blue-500/10 blur-[40px] rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-1000" />

                    <div className="relative bg-slate-900/50 border border-slate-700/50 backdrop-blur-md rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 hover:border-blue-500/30 transition-colors shadow-xl">
                        <div className="w-40 shrink-0">
                            <Image
                                src="/logo.png"
                                alt="AppCreatorBR"
                                width={200}
                                height={100}
                                className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                            />
                        </div>
                        <div className="text-center sm:text-left relative z-10">
                            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2">
                                The Brand
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                All my professional services and digital solutions are delivered through
                                <span className="text-white font-bold mx-1">AppCreatorBR</span>,
                                my dedicated platform for engineering & automation excellence.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
