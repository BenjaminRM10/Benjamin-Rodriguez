"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Award, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
    logo?: string; // URL to logo
    credentialUrl?: string;
    category?: string; // 'engineering', 'programming', 'ai', 'data'
}

interface CertificationCardProps {
    certification: Certification;
}

export function CertificationCard({ certification }: CertificationCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="h-full"
        >
            <div className="h-full rounded border border-slate-800 hover:border-slate-700 transition-colors p-6 bg-transparent flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-12 h-12 rounded-lg bg-white/10 p-2 shrink-0 flex items-center justify-center overflow-hidden">
                        {certification.logo ? (
                            <Image
                                src={certification.logo}
                                alt={certification.issuer}
                                fill
                                className="object-contain p-1"
                                sizes="(max-width: 768px) 48px, 48px"
                            />
                        ) : (
                            <Award className="w-6 h-6 text-blue-400" />
                        )}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <h3 className="font-semibold text-slate-100 truncate w-full" title={certification.name}>
                            {certification.name}
                        </h3>
                        <p className="text-sm text-slate-400 truncate">{certification.issuer}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 border-0">
                        {certification.date}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                    </div>
                </div>

                <div className="mt-auto pt-2">
                    <a
                        href={certification.credentialUrl && certification.credentialUrl !== 'undefined' ? certification.credentialUrl : "#"}
                        target={certification.credentialUrl ? "_blank" : undefined}
                        rel={certification.credentialUrl ? "noopener noreferrer" : undefined}
                        className="text-blue-400 hover:text-blue-300 text-sm transition-colors inline-flex items-center gap-1"
                    >
                        View Credential <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
