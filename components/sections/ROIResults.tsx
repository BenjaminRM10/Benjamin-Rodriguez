"use client";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import {
    CheckCircle2,
    TrendingUp,
    Clock,
    Wrench,
    ArrowRight,
    ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AIAnalysisResult } from "@/lib/ai/gemini";
import { CaseStudy } from "@/lib/ai/tavily";

// Note: Recharts is easier to use than chart.js for React, opting for it if available or standard chart.js if needed.
// Based on plan, I should use Chart.js, but I will stick to what's easier to implement quickly if I have to choose.
// However, the plan said charts.js. I'll switch to Chart.js to follow the plan precisely.
// Actually, let's stick to the plan. I previously installed chart.js and react-chartjs-2.

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
} from 'chart.js';
import { Bar as ChartJSBar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ChartTooltip,
    Legend
);

interface ROIResultsProps {
    metrics: {
        weeklyHoursSaved: number;
        monthlyCostSaved: number;
        annualROI: number;
        paybackPeriodMonths: number;
    };
    analysis: AIAnalysisResult;
    similarCases: CaseStudy[];
}

export function ROIResults({ metrics, analysis, similarCases, currency = "USD" }: // Default to USD if missing
    ROIResultsProps & { currency: string }) {

    const router = useRouter();

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const feasibilityColor = {
        high: "bg-green-500/20 text-green-400 border-green-500/50",
        medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
        low: "bg-red-500/20 text-red-400 border-red-500/50",
    };

    const currentAnnualCost =
        (metrics.monthlyCostSaved / (analysis.automation_percentage / 100)) * 12 || 0;
    const projectedAnnualCost = currentAnnualCost - metrics.annualROI;

    const chartData = {
        labels: ['Current Annual Cost', 'Projected Annual Cost'],
        datasets: [
            {
                label: `Cost (${currency})`,
                data: [currentAnnualCost, projectedAnnualCost],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.5)', // Red for current
                    'rgba(34, 197, 94, 0.5)', // Green for projected
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(34, 197, 94, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Annual Cost Comparison',
                color: '#94a3b8'
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#94a3b8'
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#94a3b8'
                }
            }
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* 1. Header & Feasibility */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-white">Analysis Complete</h3>
                    <p className="text-slate-400">Here is your customized automation roadmap</p>
                </div>
                <Badge className={`text-sm px-4 py-2 uppercase tracking-wider border ${feasibilityColor[analysis.feasibility]}`}>
                    {analysis.feasibility} Feasibility
                </Badge>
            </div>

            {/* 2. Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    label="Weekly Hours Saved"
                    value={metrics.weeklyHoursSaved.toFixed(1)}
                    suffix="hrs"
                    icon={<Clock className="w-4 h-4 text-blue-400" />}
                />
                <MetricCard
                    label="Monthly Savings"
                    value={formatMoney(metrics.monthlyCostSaved)}
                    icon={<ArrowRight className="w-4 h-4 text-green-400" />}
                />
                <MetricCard
                    label="Annual ROI"
                    value={formatMoney(metrics.annualROI)}
                    highlight
                    icon={<TrendingUp className="w-4 h-4 text-purple-400" />}
                />
                <MetricCard
                    label="Payback Period"
                    value={metrics.paybackPeriodMonths.toFixed(1)}
                    suffix="months"
                    icon={<CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                />
            </div>

            {/* 3. Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Solution & Technical Details */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-xl text-white flex items-center gap-2">
                                <Wrench className="w-5 h-5 text-blue-400" />
                                Recommended Solution
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-slate-300 leading-relaxed">
                                {analysis.solution}
                            </p>

                            <div className="pt-4">
                                <h4 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wide">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.tools.map((tool, i) => (
                                        <Badge key={i} variant="secondary" className="bg-slate-800 text-slate-200 border-slate-700">
                                            {tool}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Similar Cases Accordion */}
                    {similarCases.length > 0 && (
                        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg text-white">Similar Success Stories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    {similarCases.map((caseStudy, i) => (
                                        <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                                            <AccordionTrigger className="text-slate-200 hover:text-blue-400">
                                                {caseStudy.title}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-slate-400 space-y-2">
                                                <p>{caseStudy.content.substring(0, 150)}...</p>
                                                <a
                                                    href={caseStudy.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-sm text-blue-400 hover:underline"
                                                >
                                                    Read full case study <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Right Column: Chart & CTA */}
                <div className="space-y-6">
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="h-[250px] w-full">
                                <ChartJSBar data={chartData} options={chartOptions} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <CardContent className="p-6 text-center space-y-6 relative z-10">
                            <div>
                                <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Estimated Investment</p>
                                <div className="text-3xl font-bold text-white">
                                    {formatMoney(analysis.implementation_cost)}
                                </div>
                                <p className="text-xs text-slate-400 mt-1">Approx. {analysis.implementation_weeks} weeks delivery</p>
                            </div>

                            <div className="h-px bg-white/10 w-full" />

                            <div className="space-y-3">
                                <h3 className="text-lg font-bold text-white">Ready to automate this?</h3>
                                <Button
                                    className="w-full bg-white text-blue-900 hover:bg-blue-50 font-bold h-11"
                                    onClick={() => {
                                        const query = new URLSearchParams({
                                            service: 'Business Solution / Automation',
                                            message: `I'm interested in the ${analysis.solution} solution. ROI analysis estimates ${formatMoney(metrics.annualROI)} annual savings.`
                                        }).toString();
                                        router.push(`/contact?${query}`);
                                    }}
                                >
                                    Let's Make It Happen
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}

function MetricCard({
    label,
    value,
    suffix = "",
    icon,
    highlight = false
}: {
    label: string;
    value: string;
    suffix?: string;
    icon?: React.ReactNode;
    highlight?: boolean;
}) {
    return (
        <div className={`p-4 rounded-xl border ${highlight ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/5 border-white/10'}`}>
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-slate-400 uppercase tracking-wider">{label}</span>
                {icon}
            </div>
            <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-bold ${highlight ? 'text-blue-400' : 'text-white'}`}>
                    {value}
                </span>
                {suffix && <span className="text-sm text-slate-500">{suffix}</span>}
            </div>
        </div>
    );
}
