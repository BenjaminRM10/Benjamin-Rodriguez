import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { analyzeTask } from "@/lib/ai/gemini";
import { findSimilarCases } from "@/lib/ai/tavily";

// Initialize Supabase client inside handler

const requestSchema = z.object({
    taskDescription: z.string().min(10).max(500),
    hoursPerWeek: z.number().min(1).max(168),
    hourlyCost: z.number().min(1),
    peopleCount: z.number().min(1),
    currency: z.enum(["USD", "MXN"]).default("MXN"),
});

export async function POST(req: NextRequest) {
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

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
        const ip = req.headers.get("x-forwarded-for") || "unknown";

        // 1. Rate Limiting (Simple Supabase check)
        const today = new Date().toISOString().split("T")[0];
        const { count, error: countError } = await supabase
            .from("roi_calculations")
            .select("*", { count: "exact", head: true })
            .eq("ip_address", ip)
            .gte("created_at", today);

        if (countError) {
            console.error("Rate limit check failed", countError);
        }

        if (count !== null && count >= 5) {
            return NextResponse.json(
                { error: "Daily limit reached. Please try again tomorrow." },
                { status: 429 }
            );
        }

        // 2. Parallel AI Execution
        const [aiAnalysis, similarCases] = await Promise.all([
            analyzeTask(taskDescription, { hoursPerWeek, hourlyCost, peopleCount, currency }),
            findSimilarCases(taskDescription),
        ]);

        // 3. Calculate financial metrics
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

        // 4. Save to Supabase
        const { error: dbError } = await supabase
            .from("roi_calculations")
            .insert({
                task_description: taskDescription,
                hours_per_week: hoursPerWeek,
                hourly_cost: hourlyCost,
                people_count: peopleCount,
                weekly_hours_saved: weeklyHoursSaved,
                monthly_cost_saved: monthlyCostSaved,
                annual_roi: annualROI,
                payback_period_months: paybackPeriodMonths,
                feasibility: aiAnalysis.feasibility,
                recommended_solution: aiAnalysis.solution,
                tools_suggested: aiAnalysis.tools,
                implementation_weeks: aiAnalysis.implementation_weeks,
                ai_response: aiAnalysis, // Store full JSON
                search_results: similarCases, // Store full JSON
                ip_address: ip,
                user_agent: req.headers.get("user-agent") || "unknown",
            });

        if (dbError) {
            console.error("Failed to save to DB:", dbError);
            // We continue returning results even if save fails, but log it.
        }

        // 5. Return Response
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
