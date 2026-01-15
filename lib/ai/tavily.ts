import { tavily } from "@tavily/core";
import { getCachedEnvVar } from "@/lib/config/env";

export interface CaseStudy {
    title: string;
    url: string;
    content: string;
    score: number;
}

export async function findSimilarCases(
    taskDescription: string
): Promise<CaseStudy[]> {
    const apiKey = await getCachedEnvVar("TAVILY_API_KEY");

    if (!apiKey) {
        console.error("TAVILY_API_KEY is missing in Supabase app_config.");
        return []; // Fail gracefully for Tavily as it's secondary
    }

    const query = `automation case study success story for: ${taskDescription}`;
    const client = tavily({ apiKey });

    try {
        const response = await client.search(query, {
            search_depth: "advanced",
            max_results: 3,
            include_raw_content: false,
            include_images: false,
        });

        return response.results.map((result) => ({
            title: result.title,
            url: result.url,
            content: result.content,
            score: result.score,
        }));
    } catch (error) {
        console.error("Tavily API Error:", error);
        // Return empty array instead of failing completely to allow the rest of the app to work
        return [];
    }
}
