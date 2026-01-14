"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calculator, ArrowRight, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ROIResults } from "@/components/sections/ROIResults";
import { AIAnalysisResult } from "@/lib/ai/gemini";
import { CaseStudy } from "@/lib/ai/tavily";

const formSchema = z.object({
    taskDescription: z
        .string()
        .min(10, { message: "Please describe the task in at least 10 characters." })
        .max(500, { message: "Description must be shorter than 500 characters." }),
    hoursPerWeek: z.coerce
        .number()
        .min(1, { message: "Must be at least 1 hour." })
        .max(168, { message: "Cannot exceed 168 hours per week." }),
    hourlyCost: z.coerce
        .number()
        .min(1, { message: "Hourly cost must be at least $1." }),
    peopleCount: z.coerce
        .number()
        .min(1, { message: "At least one person must perform the task." }),
});

type FormValues = z.infer<typeof formSchema>;

export function ROIForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<{
        metrics: any;
        analysis: AIAnalysisResult;
        similarCases: CaseStudy[];
    } | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            taskDescription: "",
            hoursPerWeek: 5,
            hourlyCost: 20,
            peopleCount: 1,
        },
    });

    async function onSubmit(values: FormValues) {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/roi-calculator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to calculate ROI");
            }

            setResults(data);
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    if (results) {
        return <ROIResults {...results} />;
    }

    return (
        <div className="w-full max-w-lg mx-auto bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden group">

            {/* Decorative gradient blob */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors duration-500" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors duration-500" />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <Calculator className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Calculate Savings</h3>
                        <p className="text-sm text-slate-400">See how much you can save with AI</p>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="taskDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">What task do you want to automate?</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="e.g. Copying data from PDF invoices to Excel..."
                                            className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 min-h-[100px] resize-none"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="hoursPerWeek"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300 text-xs">Hours/Week</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="peopleCount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300 text-xs">People</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-purple-500/20"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="hourlyCost"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300 text-xs">Hourly Cost ($)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] border border-white/10"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <LoadingSpinner size="sm" className="border-white" />
                                    <span>Analyzing with AI...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span>Calculate Potential Savings</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
