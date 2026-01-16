"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle2, BookOpen, Clock, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Course {
    title: string;
    description: string;
    duration?: string;
    format?: string;
    schedule?: string;
    requirements?: string[];
    curriculum?: string[];
    outcomes?: string[];
    whatsAppLink?: string;
}

interface CourseDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    course: Course | null;
}

export function CourseDetailsModal({ isOpen, onClose, course }: CourseDetailsModalProps) {
    if (!course) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl bg-slate-950/95 border-white/10 backdrop-blur-xl text-white max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 bg-yellow-500/10">
                            🎓 COURSE
                        </Badge>
                        <span className="text-slate-400 text-sm">Open for Enrollment</span>
                    </div>
                    <DialogTitle className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-amber-200">
                        {course.title}
                    </DialogTitle>
                    <DialogDescription className="text-slate-400 text-base">
                        {course.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="bg-slate-900/50 border border-white/5 w-full justify-start grid grid-cols-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="investment">Investment</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="mt-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
                                    <Clock className="w-6 h-6 text-blue-400 mb-2" />
                                    <span className="text-lg font-bold">{course.duration || "10 Hours"}</span>
                                    <span className="text-xs text-slate-400">Total Duration</span>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
                                    <BookOpen className="w-6 h-6 text-purple-400 mb-2" />
                                    <span className="text-lg font-bold">{course.format || "Live Online"}</span>
                                    <span className="text-xs text-slate-400">Format</span>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
                                    <Trophy className="w-6 h-6 text-yellow-400 mb-2" />
                                    <span className="text-lg font-bold">Certificate</span>
                                    <span className="text-xs text-slate-400">Included</span>
                                </div>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                                {course.description}
                            </p>

                            <div className="mt-4">
                                <h4 className="text-white font-semibold mb-2">Key Outcomes:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {course.outcomes?.map((outcome, idx) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-1" />
                                            <span className="text-slate-300 text-sm">{outcome}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="curriculum" className="mt-4">
                            <div className="space-y-3">
                                {course.curriculum?.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="flex bg-blue-500/20 w-6 h-6 rounded-full items-center justify-center text-xs font-bold text-blue-400">
                                            {idx + 1}
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="details" className="mt-4 space-y-4">
                            <div className="space-y-4 text-slate-300">
                                <h4 className="text-lg font-semibold text-white">Course Logistics</h4>
                                <ul className="list-disc list-inside space-y-2">
                                    <li><strong>Schedule:</strong> {course.schedule || "Flexible, arranged per request"}</li>
                                    <li><strong>Requirements:</strong> {(course.requirements || []).join(", ") || "Laptop, Internet Connection"}</li>
                                    <li><strong>Group Size:</strong> Individual or Small Group (max 10)</li>
                                    <li><strong>Language:</strong> English or Spanish</li>
                                </ul>
                            </div>
                        </TabsContent>

                        <TabsContent value="investment" className="mt-4 space-y-4">
                            <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 text-center">
                                <h4 className="text-2xl font-bold text-white mb-2">Contact for Pricing</h4>
                                <p className="text-slate-400 mb-4">Invest in your future with personalized training.</p>
                                <ul className="text-left text-sm text-slate-300 space-y-2 max-w-xs mx-auto mb-6">
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Includes all course materials</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Direct mentorship access</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> Certificate of completion</li>
                                </ul>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="flex justify-end gap-3 mt-6 border-t border-white/10 pt-6">
                    <Button variant="outline" onClick={onClose} className="border-white/10 hover:bg-white/5 hover:text-white">
                        Close
                    </Button>
                    <Button
                        className="bg-[#25D366] hover:bg-[#20bd5a] text-white hover:brightness-110"
                        onClick={() => course.whatsAppLink && window.open(course.whatsAppLink, '_blank')}
                    >
                        Enroll via WhatsApp
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
