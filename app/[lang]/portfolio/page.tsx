import { PortfolioPageClient } from "@/components/sections/PortfolioPageClient";
import { getProjects } from "@/lib/data/server";

export default async function PortfolioPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const projects = await getProjects();

    return <PortfolioPageClient projects={projects} lang={lang} />;
}
