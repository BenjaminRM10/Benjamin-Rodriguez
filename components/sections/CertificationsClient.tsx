"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { CertificationCard, Certification } from "@/components/shared/CertificationCard";
import { CertificationsModal } from "@/components/modals/CertificationsModal";
import { Award } from "lucide-react";
import type { ProfileTranslations } from "@/lib/i18n/types";

interface CertificationsClientProps {
    certifications: Certification[];
    translations: ProfileTranslations['certifications'];
}

export function CertificationsClient({ certifications, translations }: CertificationsClientProps) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <section className="py-24 relative bg-slate-900/50" id="certifications">
            <div className="container mx-auto px-4">

                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 text-blue-400 mb-4 font-medium"
                        >
                            <Award className="w-5 h-5" />
                            <span>{translations.badge}</span>
                        </motion.div>
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
                            className="text-slate-400 text-lg"
                        >
                            {translations.subtitle}
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Button
                            onClick={() => setModalOpen(true)}
                            size="lg"
                            className="bg-white/10 hover:bg-white/20 text-white border-0"
                        >
                            {translations.viewAll}
                        </Button>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {certifications.map((cert) => (
                                <CarouselItem key={cert.id} className="pl-4 md:basis-1/2 lg:basis-1/3 h-full">
                                    <div className="h-full p-1">
                                        <CertificationCard certification={cert} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden md:block">
                            <CarouselPrevious className="left-[-1rem] bg-slate-900/80 border-white/10 hover:bg-blue-600 hover:border-blue-600 text-white" />
                            <CarouselNext className="right-[-1rem] bg-slate-900/80 border-white/10 hover:bg-blue-600 hover:border-blue-600 text-white" />
                        </div>
                    </Carousel>
                </motion.div>

                <CertificationsModal
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                    certifications={certifications}
                />

            </div>
        </section>
    );
}
