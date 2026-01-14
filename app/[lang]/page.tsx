import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { ROICalculator } from "@/components/sections/ROICalculator";
import { Portfolio } from "@/components/sections/Portfolio";
import { Skills } from "@/components/sections/Skills";
import { Certifications } from "@/components/sections/Certifications";
import { BeyondCode } from "@/components/sections/BeyondCode";
import ParticleBackground from "@/components/shared/ParticleBackground";
import { Locale } from "@/lib/i18n/config";
import { Contact } from "@/components/sections/Contact";

import { Brand } from "@/components/sections/Brand";

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
