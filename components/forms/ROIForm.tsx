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
        .min(1, { message: "Hourly cost must be at least 1." }),
    peopleCount: z.coerce
        .number()
        .min(1, { message: "At least one person must perform the task." }),
    currency: z.enum(["USD", "MXN"]),
});

type FormValues = z.infer<typeof formSchema>;

interface ROIFormTranslations {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
    form?: {
        taskName?: string;
        taskNamePlaceholder?: string;
        hoursPerWeek?: string;
        hourlyRate?: string;
        automationPercent?: string;
        calculate?: string;
    };
    results?: {
        title?: string;
        weeklySavings?: string;
        monthlySavings?: string;
        yearlySavings?: string;
        hoursSaved?: string;
        cta?: string;
        disclaimer?: string;
    };
}

interface ROIFormProps {
    translations?: ROIFormTranslations;
}

export function ROIForm({ translations }: ROIFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currency, setCurrency] = useState<"USD" | "MXN">("MXN");
    const [results, setResults] = useState<{
        metrics: any;
        analysis: AIAnalysisResult;
        similarCases: CaseStudy[];
        currency: string;
    } | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            taskDescription: "",
            hoursPerWeek: 5,
            hourlyCost: 200, // Default for MXN
            peopleCount: 1,
            currency: "MXN",
        },
    });

    // Update hourly cost default when currency changes
    const handleCurrencyChange = (newCurrency: "USD" | "MXN") => {
        setCurrency(newCurrency);
        form.setValue("currency", newCurrency);
        if (newCurrency === "USD") {
            form.setValue("hourlyCost", 20);
        } else {
            form.setValue("hourlyCost", 200);
        }
    };

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
        <div className="w-full max-w-lg mx-auto bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-1 md:p-1 relative overflow-hidden group shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)]">

            <div className="bg-[#0f1629] rounded-xl p-6 md:p-8 relative z-20 h-full">

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/20 shadow-inner">
                            <Calculator className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">ROI Calculator</h3>
                            <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">AI-Powered Analysis</p>
                        </div>
                    </div>

                    {/* Currency Toggle */}
                    <div className="bg-slate-900 border border-white/10 rounded-lg p-1 flex gap-1">
                        <button
                            type="button"
                            onClick={() => handleCurrencyChange("MXN")}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${currency === "MXN"
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-400 hover:text-white"
                                }`}
                        >
                            MXN
                        </button>
                        <button
                            type="button"
                            onClick={() => handleCurrencyChange("USD")}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${currency === "USD"
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-400 hover:text-white"
                                }`}
                        >
                            USD
                        </button>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="taskDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">What specific task do you want to automate?</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Example: Copying leads from LinkedIn to Excel and sending connection requests..."
                                            className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 min-h-[120px] resize-none"
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
                                        <div className="space-y-1">
                                            <FormLabel className="text-slate-300 text-xs">Hours/Week</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20"
                                                    disabled={isLoading}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage className="text-red-400 text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="peopleCount"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="space-y-1">
                                            <FormLabel className="text-slate-300 text-xs">People</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-purple-500/20"
                                                    disabled={isLoading}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage className="text-red-400 text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="hourlyCost"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="space-y-1">
                                            <FormLabel className="text-slate-300 text-xs">Hourly Copst ({currency})</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                                                    disabled={isLoading}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
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
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] border border-white/10 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <LoadingSpinner size="sm" className="border-white" />
                                    <span>Processing Analysis...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 relative z-10">
                                    <span>Calculate My Savings</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            )}
                        </Button>
                    </form>
                </Form>
            </div>

            {/* Animated Glow Border */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-2xl z-10 opacity-50 blur-sm group-hover:opacity-100 transition-opacity duration-500 animate-gradient-xy" />
        </div>
    );
}
