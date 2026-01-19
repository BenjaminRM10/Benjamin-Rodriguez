
import { getSkills } from "@/lib/data/server";
import { SkillsClient } from "./SkillsClient";

export default async function Skills() {
    const skills = await getSkills();

    return <SkillsClient initialSkills={skills} />;
}
