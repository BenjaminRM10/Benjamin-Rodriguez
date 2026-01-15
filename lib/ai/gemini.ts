import { GoogleGenerativeAI } from "@google/generative-ai";
import { getCachedEnvVar } from "@/lib/config/env";

interface TaskContext {
    hoursPerWeek: number;
    hourlyCost: number;
    peopleCount: number;
}

export interface AIAnalysisResult {
    feasibility: "high" | "medium" | "low";
    automation_percentage: number;
    solution: string;
    tools: string[];
    implementation_weeks: number;
    implementation_cost: number;
    reasoning: string;
    considerations: string[];
}

export async function analyzeTask(
    taskDescription: string,
    context: TaskContext
): Promise<AIAnalysisResult> {

    const apiKey = await getCachedEnvVar("GEMINI_API_KEY");

    if (!apiKey) {
        console.error("GEMINI_API_KEY is missing in Supabase app_config.");
        throw new Error("Missing AI configuration (GEMINI_API_KEY)");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
        },
    });

    const prompt = `
    Analyze this manual task and determine its automation feasibility.
    
    TASK DESCRIPTION:
    "${taskDescription}"
    
    CONTEXT:
    - Hours spent per week: ${context.hoursPerWeek}
    - Hourly cost: $${context.hourlyCost} USD
    - Number of people performing the task: ${context.peopleCount}
    - Annual cost (current): $${context.hoursPerWeek * context.hourlyCost * context.peopleCount * 52
        } USD
    
    REQUIRED ANALYSIS:
    1. Feasibility (high/medium/low) based on technical complexity and potential ROI.
    2. Estimated percentage of the task that can be automated (0-100).
    3. Specific technical solution proposal.
    4. List of recommended tools/technologies.
    5. Estimated implementation time in weeks.
    6. Estimated implementation cost in USD (rough estimate).
    7. Key risks or considerations.
    
    Respond strictly in JSON format matching this schema:
    {
      "feasibility": "high" | "medium" | "low",
      "automation_percentage": number,
      "solution": "string",
      "tools": ["string"],
      "implementation_weeks": number,
      "implementation_cost": number,
      "reasoning": "string",
      "considerations": ["string"]
    }
  `;

    try {
        console.log("Calling Gemini 2.5 Flash with task:", taskDescription.substring(0, 50) + "...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("Gemini Response Raw:", text.substring(0, 100) + "...");

        // Parse JSON safely
        const data = JSON.parse(text) as AIAnalysisResult;
        return data;
    } catch (error: any) {
        console.error("Gemini API Detailed Error:", error);
        if (error.response) {
            console.error("Gemini Response Error:", error.response);
        }
        throw new Error(`Failed to analyze task with AI: ${error.message}`);
    }
}
