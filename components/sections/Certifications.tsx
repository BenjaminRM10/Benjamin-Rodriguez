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

// Placeholder data - would typically come from an API or separate data file
const allCertifications: Certification[] = [
    {
        id: "ai-prompts",
        name: "Cómo escribir prompts de IA que funcionen",
        issuer: "EDteam",
        date: "Certified",
        category: "ai",
        credentialUrl: "https://app.ed.team/u/rodriguezmaresalejandrobenjamin/curso/prompts",
        logo: "https://ed.team/favicon.ico"
    },
    {
        id: "mcp-scrimba",
        name: "Model Context Protocol (MCP)",
        issuer: "Scrimba",
        date: "Certified",
        category: "ai",
        credentialUrl: "https://scrimba.com/intro-to-model-context-protocol-mcp-c0sake4uir;cert2ffentAFNfAn9z5ecpFiCe2yYMN18MS7ZoK2DLSgSJnRYV",
    },
    {
        id: "lss-black-belt-adnlean",
        name: "Six Sigma Black Belt",
        issuer: "ADNLean",
        date: "Certified",
        category: "engineering",
        credentialUrl: "https://drive.google.com/file/d/14vNW_OW3V2ZDhwOTT105EkQJowRAUN5y/view?usp=sharing",
    },
    {
        id: "lss-green-belt-adnlean",
        name: "Six Sigma Green Belt",
        issuer: "ADNLean",
        date: "Certified",
        category: "engineering",
        credentialUrl: "https://drive.google.com/file/d/1olKehcm6VPEIzecz0e7BABAh3aW83U4s/view?usp=sharing",
    },
    {
        id: "lss-yellow-belt-adnlean",
        name: "Six Sigma Yellow Belt",
        issuer: "ADNLean",
        date: "Certified",
        category: "engineering",
        credentialUrl: "https://drive.google.com/file/d/1tWfQ3UAIYhLlQT67HPkJ6aaau586HOs3/view?usp=sharing",
    },
    {
        id: "lean-six-sigma-specialization",
        name: "Lean Six Sigma Specialization",
        issuer: "Tecnológico de Monterrey",
        date: "Certified",
        category: "engineering",
        credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/GKFPHL749YAS",
    },
    {
        id: "n8n-automation",
        name: "Automatizalo TODO con n8n",
        issuer: "EDteam",
        date: "Certified",
        category: "ai",
        credentialUrl: "https://ed.team/u/rodriguezmaresalejandrobenjamin/curso/n8n",
        logo: "https://ed.team/favicon.ico"
    },
    {
        id: "ai-programming",
        name: "Programación desde cero con IA",
        issuer: "EDteam",
        date: "Certified",
        category: "programming",
        credentialUrl: "https://ed.team/u/rodriguezmaresalejandrobenjamin/curso/programacion",
        logo: "https://ed.team/favicon.ico"
    },
    {
        id: "ef-set-c2",
        name: "EF SET English Certificate (C2)",
        issuer: "EF SET",
        date: "71/100",
        category: "data",
        credentialUrl: "https://cert.efset.org/Br5TqC",
    },
    {
        id: "solidworks",
        name: "SOLIDWORKS Certifications",
        issuer: "Dassault Systèmes",
        date: "Certified",
        category: "engineering",
        credentialUrl: "https://drive.google.com/file/d/12c5CSMFBNjjotiBOvSdutoUWVU4Y0Fws/view?usp=drive_link",
    },
    {
        id: "data-foundations",
        name: "Foundations: Data, Data, Everywhere",
        issuer: "Google",
        date: "Verified",
        category: "data",
        credentialUrl: "https://www.coursera.org/account/accomplishments/verify/6AUKZZOMULQZ",
    },
    {
        id: "lss-analyze-improve",
        name: "LSS: Analyze, Improve, Control",
        issuer: "LinkedIn Learning",
        date: "Verified",
        category: "engineering",
        credentialUrl: "https://www.linkedin.com/learning/certificates/ef7ccf3cd4246ea0034766d9f6afc3039581b71d20ddb0066f6ae27d8ca5f8b6",
    },
    {
        id: "lss-define-measure",
        name: "LSS: Define and Measure Tools",
        issuer: "LinkedIn Learning",
        date: "Verified",
        category: "engineering",
        credentialUrl: "https://www.linkedin.com/learning/certificates/4993e01359f200cf384f19d7ac3066303804fd316e170858d1de0d71b110600e",
    },
    {
        id: "learning-minitab",
        name: "Learning Minitab",
        issuer: "LinkedIn Learning",
        date: "Verified",
        category: "data",
        credentialUrl: "https://www.linkedin.com/learning/certificates/e502d830e8d5965d113c8aa116d8ed267bab335fac78f9a278a30aa88e49c6d1",
    },
    {
        id: "opex-kaizen",
        name: "OPEX Work-Out & Kaizen Facilitator",
        issuer: "LinkedIn Learning",
        date: "Verified",
        category: "engineering",
        credentialUrl: "https://www.linkedin.com/learning/certificates/4613c9927d760f847f2d88da0f704eed5b5fe70a0d3cc6e7bd717956fefa05c3",
    },
    {
        id: "six-sigma-foundations",
        name: "Six Sigma Foundations",
        issuer: "LinkedIn Learning",
        date: "Verified",
        category: "engineering",
        credentialUrl: "https://www.linkedin.com/learning/certificates/01c5d38282945c1c94f80d2066b77b40775e94ee5c1d3cc66796fffde7b3468e",
    },
    {
        id: "lss-incrementar-controlar",
        name: "Incrementar - Parte 2 y Controlar",
        issuer: "Tecnológico de Monterrey",
        date: "Verified",
        category: "engineering",
        credentialUrl: "https://www.coursera.org/account/accomplishments/records/U9AHZ8L1TUXR",
    },
    {
        id: "lss-analizar-incrementar",
        name: "Analizar e incrementar - Parte 1",
        issuer: "Tecnológico de Monterrey",
        date: "Verified",
        category: "engineering",
        credentialUrl: "https://www.coursera.org/account/accomplishments/records/M041KJRV5LWY",
    },
    {
        id: "lss-definicion-medicion",
        name: "Definición y Medición",
        issuer: "Tecnológico de Monterrey",
        date: "Verified",
        category: "engineering",
        credentialUrl: "https://www.coursera.org/account/accomplishments/records/VEUTRSMAWOU1",
    },
    {
        id: "lss-introduction",
        name: "Introducción a Lean Six Sigma",
        issuer: "Tecnológico de Monterrey",
        date: "Verified",
        category: "engineering",
        credentialUrl: "https://www.coursera.org/account/accomplishments/verify/KPKRZJ1DPF9R",
    },
    {
        id: "gdt-intro",
        name: "Intro to GD&T",
        issuer: "LinkedIn Learning",
        date: "Verified",
        category: "engineering",
        credentialUrl: "https://www.linkedin.com/learning/certificates/53b124befdc968891ab70ed48c1f73ebf632e2f8acb0a4f51122df4c461bc73e",
    },
    {
        id: "opex-foundations",
        name: "Operational Excellence Foundations",
        issuer: "LinkedIn Learning",
        date: "Verified",
        category: "engineering",
        credentialUrl: "https://www.linkedin.com/learning/certificates/b40c64ea1139b62709983cc2e6a27e2167f38ceee9937bc46823bd4b981b7827",
    },
    {
        id: "icemexico",
        name: "Constancia de Capacitacion",
        issuer: "Universidad ICEMÉXICO",
        date: "Verified",
        category: "other",
        credentialUrl: "https://drive.google.com/file/d/1HlhGoOdVgjOAgijP_NFvwwNDrq1q54tz/view?usp=sharing&usp=embed_facebook",
    },
];

export function Certifications() {
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
                            <span>Continuous Learning</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold text-white mb-4"
                        >
                            18+ Professional Certifications
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-400 text-lg"
                        >
                            Constantly upgrading my skills to stay ahead of the curve.
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
                            View All Certifications
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
                            {allCertifications.map((cert) => (
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
                    certifications={allCertifications}
                />

            </div>
        </section>
    );
}
