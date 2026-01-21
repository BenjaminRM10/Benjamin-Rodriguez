import { getCertifications } from "@/lib/data/server";
import { CertificationsClient } from "./CertificationsClient";
import type { ProfileTranslations } from "@/lib/i18n/types";

interface CertificationsProps {
    lang?: string;
    translations: ProfileTranslations['certifications'];
}

export default async function Certifications({ lang, translations }: CertificationsProps) {
    const certifications = await getCertifications();

    return <CertificationsClient certifications={certifications} translations={translations} />;
}
