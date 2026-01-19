

import { AICourseDetails } from "@/components/sections/AICourseDetails";







export default async function AcademyPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    return (
        <div className="relative z-10 w-full animate-in fade-in duration-500">


            {/* Specialization Course Section - Refactored to remove duplicate header */}
            <AICourseDetails />


        </div>
    );
}
