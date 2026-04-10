import type { Locale } from "@/lib/i18n/config";
import LegalPage from "@/components/sections/LegalPage";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLang = (lang === "es" || lang === "en") ? (lang as Locale) : "en";

  return <LegalPage lang={validLang} type="privacy" />;
}
