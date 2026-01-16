import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ParticleBackground from "@/components/shared/ParticleBackground";
import { Brand } from "@/components/sections/Brand";
import { Contact } from "@/components/sections/Contact";

// Lazy load heavy components below the fold
const Services = dynamic(() => import("@/components/sections/Services").then(mod => mod.Services));
const ROICalculator = dynamic(() => import("@/components/sections/ROICalculator").then(mod => mod.ROICalculator));
const Portfolio = dynamic(() => import("@/components/sections/Portfolio").then(mod => mod.Portfolio));
const Skills = dynamic(() => import("@/components/sections/Skills").then(mod => mod.Skills));
const Certifications = dynamic(() => import("@/components/sections/Certifications").then(mod => mod.Certifications));
const BeyondCode = dynamic(() => import("@/components/sections/BeyondCode").then(mod => mod.BeyondCode));

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      <ParticleBackground />
      <div className="relative z-10 w-full">
        <Hero lang={lang} />
        <Brand />
        <About lang={lang} />
        <ROICalculator />
        <Services />
        <Portfolio />
        <Skills />
        <Certifications />
        <BeyondCode />
        <Contact lang={lang} />
      </div>
    </>
  );
}
