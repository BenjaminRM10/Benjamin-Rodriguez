"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { CertificationCard, Certification } from "@/components/shared/CertificationCard";
import { Search } from "lucide-react";

interface CertificationsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    certifications: Certification[];
}

export function CertificationsModal({ open, onOpenChange, certifications }: CertificationsModalProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");

    const filteredCertifications = certifications.filter((cert) => {
        const matchesSearch = cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === "all" || cert.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-7xl w-11/12 h-[85vh] flex flex-col bg-slate-950/95 border-white/10 backdrop-blur-xl p-0 gap-0 overflow-hidden">
                <DialogHeader className="p-6 md:p-8 border-b border-white/10 shrink-0">
                    <DialogTitle className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Professional Certifications
                    </DialogTitle>
                    <DialogDescription className="text-slate-400 text-base mt-2">
                        A comprehensive list of my continuous learning journey.
                    </DialogDescription>

                    <div className="flex flex-col md:flex-row gap-4 mt-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Search certifications..."
                                className="pl-9 h-11 bg-white/5 border-white/10 text-slate-200 placeholder:text-slate-500 focus:border-blue-500/50 transition-colors"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Tabs defaultValue="all" value={categoryFilter} onValueChange={setCategoryFilter} className="w-full md:w-auto">
                            <TabsList className="bg-white/5 border border-white/10 h-11 p-1">
                                <TabsTrigger value="all" className="h-9">All</TabsTrigger>
                                <TabsTrigger value="engineering" className="h-9">Engineering</TabsTrigger>
                                <TabsTrigger value="programming" className="h-9">Dev</TabsTrigger>
                                <TabsTrigger value="ai" className="h-9">AI</TabsTrigger>
                                <TabsTrigger value="data" className="h-9">Data</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30 transition-colors">
                    {filteredCertifications.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredCertifications.map((cert) => (
                                <div key={cert.id} className="h-full">
                                    <CertificationCard certification={cert} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-500 py-12">
                            <p>No certifications found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
