import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { analyzeTask } from "@/lib/ai/gemini";
import { findSimilarCases } from "@/lib/ai/tavily";

const requestSchema = z.object({
    taskDescription: z.string().min(10).max(500),
    hoursPerWeek: z.number().min(1).max(168),
    hourlyCost: z.number().min(1),
    peopleCount: z.number().min(1),
    currency: z.enum(["USD", "MXN"]).default("MXN"),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validation = requestSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: "Invalid input data", details: validation.error.format() },
                { status: 400 }
            );
        }

        const { taskDescription, hoursPerWeek, hourlyCost, peopleCount, currency } = validation.data;

        // 1. Parallel AI Execution
        const [aiAnalysis, similarCases] = await Promise.all([
            analyzeTask(taskDescription, { hoursPerWeek, hourlyCost, peopleCount, currency }),
            findSimilarCases(taskDescription),
        ]);

        // 2. Calculate financial metrics
        const automationPercentage = aiAnalysis.automation_percentage || 0;
        const weeklyHoursSaved = (hoursPerWeek * peopleCount * automationPercentage) / 100;
        const monthlyCostSaved = weeklyHoursSaved * 4.33 * hourlyCost;
        const annualROI = monthlyCostSaved * 12;

        // --- COST ADJUSTMENT LOGIC ---
        // 1. Reduce the AI-estimated global market cost to be 1/3 (User request: "1/3 parte de lo que calcula actualmente")
        let adjustedCost = Math.round(aiAnalysis.implementation_cost / 3);

        // 2. USD Premium Logic ("los que tienen dolares tienen mas dinero... sin pasarse de lanza")
        if (currency === "USD") {
            adjustedCost = Math.round(adjustedCost * 1.25); // 25% premium for USD clients
        }

        // Overwrite the analysis cost with our competitive pricing
        aiAnalysis.implementation_cost = adjustedCost;
        // -----------------------------

        // Simple payback calc
        const paybackPeriodMonths = monthlyCostSaved > 0
            ? (aiAnalysis.implementation_cost / monthlyCostSaved)
            : 0;

        // 3. Return Response
        return NextResponse.json({
            metrics: {
                weeklyHoursSaved,
                monthlyCostSaved,
                annualROI,
                paybackPeriodMonths,
                currency // Pass back currency for formatter
            },
            analysis: aiAnalysis,
            similarCases,
            currency
        });

    } catch (error: any) {
        console.error("API Error - Detailed:", error);

        // In production, we might want to hide details, but for debugging we need them
        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}
