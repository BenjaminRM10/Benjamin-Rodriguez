import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";


const Skills = dynamic(() => import("@/components/sections/Skills"));
const Certifications = dynamic(() => import("@/components/sections/Certifications"));
const BeyondCode = dynamic(() => import("@/components/sections/BeyondCode").then(mod => mod.BeyondCode));

export default async function ProfilePage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    return (
        <div className="relative z-10 w-full animate-in fade-in duration-500">
            <Hero lang={lang} />
            <About lang={lang} />
            <Skills />
            <Certifications />
            <BeyondCode />
            {/* Contact removed - replaced by Global Contact Page */}
        </div>
    );
}
