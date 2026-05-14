"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Award, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
            <Card className="h-full bg-white/5 border-white/10 backdrop-blur-md hover:border-blue-500/30 transition-colors flex flex-col overflow-hidden group">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
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
                </CardHeader>

                <CardContent className="flex-grow pt-2">
                    <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 border-0">
                            {certification.date}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Verified
                        </div>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button
                        variant="outline"
                        className="w-full border-white/10 hover:bg-white/5 hover:text-white text-slate-300 group-hover:border-blue-500/30 group-hover:text-blue-200 transition-all"
                        asChild
                    >
                        <a href={certification.credentialUrl && certification.credentialUrl !== 'undefined' ? certification.credentialUrl : "#"} target={certification.credentialUrl ? "_blank" : undefined} rel={certification.credentialUrl ? "noopener noreferrer" : undefined}>
                            View Credential
                            <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
