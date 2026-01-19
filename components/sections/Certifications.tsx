
import { getCertifications } from "@/lib/data/server";
import { CertificationsClient } from "./CertificationsClient";

export default async function Certifications() {
    const certifications = await getCertifications();

    return <CertificationsClient certifications={certifications} />;
}
