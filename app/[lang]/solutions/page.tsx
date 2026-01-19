import dynamic from "next/dynamic";
import { Brand } from "@/components/sections/Brand";

import { SolutionsHero } from "@/components/sections/SolutionsHero";

const Services = dynamic(() => import("@/components/sections/Services").then(mod => mod.Services));
const ROICalculator = dynamic(() => import("@/components/sections/ROICalculator").then(mod => mod.ROICalculator));
const Portfolio = dynamic(() => import("@/components/sections/Portfolio"));

export default async function SolutionsPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    return (
        <div className="relative z-10 w-full animate-in fade-in duration-500">
            <SolutionsHero lang={lang} />
            <Brand />
            <ROICalculator />
            <Services mode="business" />
            <Portfolio />
            {/* Contact removed - replaced by Global Contact Page */}
        </div>
    );
}
