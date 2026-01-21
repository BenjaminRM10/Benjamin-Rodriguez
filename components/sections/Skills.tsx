import { getSkills } from "@/lib/data/server";
import { SkillsClient } from "./SkillsClient";
import type { ProfileTranslations } from "@/lib/i18n/types";

interface SkillsProps {
    lang?: string;
    translations: ProfileTranslations['skills'];
}

export default async function Skills({ lang, translations }: SkillsProps) {
    const skills = await getSkills();

    return <SkillsClient initialSkills={skills} translations={translations} />;
}
