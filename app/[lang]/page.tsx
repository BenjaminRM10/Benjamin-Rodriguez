import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
const ParticleBackground = dynamic(() => import("@/components/shared/ParticleBackground"));
import { Briefcase, GraduationCap, UserCircle, ArrowRight } from "lucide-react";
import { getImageUrl } from "@/lib/storage/supabase-images";
import { RoleTyper } from "@/components/shared/RoleTyper";
import { getTranslations } from "@/lib/i18n/server";
import type { HomeTranslations } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

export default async function GatewayPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations<HomeTranslations>(lang as Locale, 'home');

  const cards = [
    {
      href: `/${lang}/profile`,
      title: t.cards.profile.title,
      description: t.cards.profile.description,
      icon: UserCircle,
      gradient: "from-blue-500 to-indigo-600",
      delay: "delay-100",
    },
    {
      href: `/${lang}/solutions`,
      title: t.cards.solutions.title,
      description: t.cards.solutions.description,
      icon: Briefcase,
      gradient: "from-purple-500 to-pink-600",
      delay: "delay-200",
    },
    {
      href: `/${lang}/academy`,
      title: t.cards.academy.title,
      description: t.cards.academy.description,
      icon: GraduationCap,
      gradient: "from-yellow-500 to-orange-600",
      delay: "delay-300",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0e27]">
      <ParticleBackground />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col items-center text-center">

        {/* Header: Logo - Name - Photo */}
        <div className="mb-12 animate-in fade-in slide-in-from-top-10 duration-1000 w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">

          {/* Left: Logo */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0">
            <Image
              src="/logo.png"
              alt={t.alt.logo}
              fill
              className="object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              priority
            />
          </div>



          {/* Center: Name & Tagline */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight mb-2">
              {t.hero.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{t.hero.lastName}</span>
            </h1>

            <div className="mb-4 w-full flex justify-center md:justify-start">
              <RoleTyper roles={t.hero.roles} />
            </div>

          </div>

          {/* Right: Profile Photo */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.3)] shrink-0">
            <Image
              src={getImageUrl("profile.webp")}
              alt={t.alt.profilePhoto}
              fill
              className="object-cover"
              priority
            />
          </div>

        </div>



        {/* Choice Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {cards.map((card, index) => (
            <Link key={index} href={card.href} className={`group relative transform transition-all duration-300 hover:-translate-y-2`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-2xl`}></div>
              <div className="relative h-full bg-slate-900/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-slate-800/60 transition-colors">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                <p className="text-slate-400 mb-8 flex-grow">{card.description}</p>
                <div className="flex items-center text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                  {t.cards.enter}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* Footer minimal */}
      <div className="absolute bottom-6 text-slate-600 text-sm">
        {t.footer.copyright}
      </div>
    </div>
  );
}
