import { getProjects } from "@/lib/data/server";
import { PortfolioClient } from "./PortfolioClient";
import type { SolutionsTranslations } from "@/lib/i18n/types";

interface PortfolioProps {
    lang?: string;
    translations: SolutionsTranslations['portfolio'];
}

export default async function Portfolio({ lang, translations }: PortfolioProps) {
    const projects = await getProjects();

    return <PortfolioClient initialProjects={projects} translations={translations} />;
}
