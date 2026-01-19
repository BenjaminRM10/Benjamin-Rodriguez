
import { getProjects } from "@/lib/data/server";
import { PortfolioClient } from "./PortfolioClient";

export default async function Portfolio() {
    const projects = await getProjects();

    return <PortfolioClient initialProjects={projects} />;
}
