import Link from "next/link";
import Image from "next/image";
import { User, Briefcase, FolderGit2, ArrowRight } from "lucide-react";
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

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0e27]">

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <Link
            href={`/${lang}/profile`}
            className="group flex flex-col justify-between rounded border border-slate-800 hover:border-slate-700 transition-colors p-8 min-h-[200px]"
          >
            <div className="flex items-start justify-between">
              <User className="size-5 text-slate-400" />
              <ArrowRight className="size-4 text-slate-500 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-white text-xl font-semibold mb-1">{t.cards.profile.title}</h3>
              <p className="text-slate-400 text-sm">{t.cards.profile.description}</p>
            </div>
          </Link>

          <Link
            href={`/${lang}/solutions`}
            className="group flex flex-col justify-between rounded border border-slate-800 hover:border-slate-700 transition-colors p-8 min-h-[200px]"
          >
            <div className="flex items-start justify-between">
              <Briefcase className="size-5 text-slate-400" />
              <ArrowRight className="size-4 text-slate-500 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-white text-xl font-semibold mb-1">{t.cards.solutions.title}</h3>
              <p className="text-slate-400 text-sm">{t.cards.solutions.description}</p>
            </div>
          </Link>

          <Link
            href={`/${lang}/portfolio`}
            className="group flex flex-col justify-between rounded border border-slate-800 hover:border-slate-700 transition-colors p-8 min-h-[200px]"
          >
            <div className="flex items-start justify-between">
              <FolderGit2 className="size-5 text-slate-400" />
              <ArrowRight className="size-4 text-slate-500 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-white text-xl font-semibold mb-1">{t.cards.portfolio.title}</h3>
              <p className="text-slate-400 text-sm">{t.cards.portfolio.description}</p>
            </div>
          </Link>
        </div>

      </div>

      {/* Footer minimal */}
      <div className="absolute bottom-6 text-slate-600 text-sm">
        {t.footer.copyright}
      </div>
    </div>
  );
}
