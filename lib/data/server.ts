import { certifications, projects, skills } from "@/lib/data/content";

export async function getProjects() {
    return projects;
}

export async function getCertifications() {
    return certifications;
}

export async function getSkills() {
    return skills;
}
