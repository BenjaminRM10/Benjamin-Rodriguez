import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { companyInfo } from "@/lib/company-info";

type LegalPageProps = {
  lang: Locale;
  type: "privacy" | "company";
};

const privacyCopy = {
  es: {
    eyebrow: "Legal",
    title: "Aviso de Privacidad",
    intro:
      "En AppCreatorBR respetamos la privacidad de las personas que visitan este sitio y de quienes nos contactan para solicitar información o servicios.",
    updated: "Última actualización: 9 de abril de 2026",
    sections: [
      {
        title: "1. Responsable",
        body: [
          "El responsable del tratamiento de los datos personales recabados a través de este sitio es Alejandro Benjamin Rodriguez Mares, operando comercialmente como AppCreatorBR.",
        ],
      },
      {
        title: "2. Datos que podemos recopilar",
        body: [
          "Nombre, correo electrónico, teléfono, empresa y cualquier información que la persona decida compartir mediante formularios, correo o mensajes directos.",
          "También podemos recibir datos técnicos básicos como dirección IP, navegador, dispositivo, páginas visitadas y métricas generales de uso del sitio para fines de seguridad, analítica y mejora del servicio.",
        ],
      },
      {
        title: "3. Finalidades del uso de datos",
        body: [
          "Responder solicitudes de contacto, preparar propuestas, dar seguimiento comercial y prestar servicios profesionales.",
          "Mejorar la experiencia del sitio, mantener seguridad operativa y entender el uso general de la plataforma.",
        ],
      },
      {
        title: "4. Compartición de información",
        body: [
          "No vendemos datos personales.",
          "La información solo puede compartirse con proveedores tecnológicos o de infraestructura necesarios para operar el sitio o prestar el servicio, bajo criterios razonables de confidencialidad y seguridad.",
        ],
      },
      {
        title: "5. Conservación y seguridad",
        body: [
          "Se aplican medidas razonables de protección administrativa y tecnológica para resguardar la información recibida. Los datos se conservan únicamente durante el tiempo necesario para atender la relación de contacto, servicio, cumplimiento legal o seguridad operativa.",
        ],
      },
      {
        title: "6. Derechos y contacto",
        body: [
          "La persona titular puede solicitar información, corrección o eliminación de sus datos escribiendo a contacto@appcreatorbr.com.",
        ],
      },
      {
        title: "7. Cambios a este aviso",
        body: [
          "Este aviso puede actualizarse para reflejar cambios legales, operativos o técnicos. La versión vigente será la publicada en este sitio.",
        ],
      },
    ],
    ctaTitle: "Información adicional",
    ctaText:
      "Para revisar la identidad comercial y datos visibles del titular del sitio, consulta la página de información de la empresa.",
    ctaLabel: "Ver información de la empresa",
  },
  en: {
    eyebrow: "Legal",
    title: "Privacy Notice",
    intro:
      "At AppCreatorBR, we respect the privacy of people who visit this website and those who contact us to request information or services.",
    updated: "Last updated: April 9, 2026",
    sections: [
      {
        title: "1. Data controller",
        body: [
          "The controller of personal data collected through this website is Alejandro Benjamin Rodriguez Mares, operating commercially as AppCreatorBR.",
        ],
      },
      {
        title: "2. Data we may collect",
        body: [
          "Name, email address, phone number, company and any information a person voluntarily shares through forms, email or direct messages.",
          "We may also receive basic technical data such as IP address, browser, device, visited pages and general site usage metrics for security, analytics and service improvement purposes.",
        ],
      },
      {
        title: "3. Purposes of data use",
        body: [
          "To respond to contact requests, prepare proposals, follow up on commercial opportunities and provide professional services.",
          "To improve the website experience, maintain operational security and understand general platform usage.",
        ],
      },
      {
        title: "4. Information sharing",
        body: [
          "We do not sell personal data.",
          "Information may only be shared with technology or infrastructure providers necessary to operate the site or deliver services, under reasonable confidentiality and security standards.",
        ],
      },
      {
        title: "5. Retention and security",
        body: [
          "Reasonable administrative and technical safeguards are applied to protect received information. Data is retained only for as long as needed to handle contact, service delivery, legal compliance or operational security.",
        ],
      },
      {
        title: "6. Rights and contact",
        body: [
          "Data subjects may request access, correction or deletion of their data by writing to contacto@appcreatorbr.com.",
        ],
      },
      {
        title: "7. Changes to this notice",
        body: [
          "This notice may be updated to reflect legal, operational or technical changes. The current version will always be the one published on this website.",
        ],
      },
    ],
    ctaTitle: "Additional information",
    ctaText:
      "To review the business identity and visible owner details of this website, please visit the company information page.",
    ctaLabel: "View company information",
  },
} as const;

export default function LegalPage({ lang, type }: LegalPageProps) {
  const company = companyInfo[lang];

  if (type === "company") {
    return (
      <div className="bg-[#0a0e27] text-slate-100">
        <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              AppCreatorBR
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{company.heading}</h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">{company.subheading}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-xl font-semibold text-white">Identidad comercial</h2>
              <dl className="space-y-4 text-sm text-slate-300">
                <div>
                  <dt className="text-slate-400">{company.legalNameLabel}</dt>
                  <dd className="mt-1 text-base text-white">{company.legalName}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">{company.taxStatusLabel}</dt>
                  <dd className="mt-1 text-base text-white">{company.taxStatus}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">{company.taxIdLabel}</dt>
                  <dd className="mt-1 text-base text-white">{company.taxId}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">{company.brandLabel}</dt>
                  <dd className="mt-1 text-base text-white">{company.brand}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">{company.ownerLabel}</dt>
                  <dd className="mt-1 text-base text-white">{company.owner}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">{company.countryLabel}</dt>
                  <dd className="mt-1 text-base text-white">{company.country}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">{company.regionLabel}</dt>
                  <dd className="mt-1 text-base text-white">{company.region}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">{company.addressLabel}</dt>
                  <dd className="mt-1 text-base text-white">{company.address}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">{company.businessTypeLabel}</dt>
                  <dd className="mt-1 text-base text-white">{company.businessType}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-xl font-semibold text-white">{company.contactTitle}</h2>
              <dl className="space-y-4 text-sm text-slate-300">
                <div>
                  <dt className="text-slate-400">{company.emailLabel}</dt>
                  <dd className="mt-1 text-base text-white">
                    <a className="text-cyan-300 hover:text-cyan-200" href={`mailto:${company.email}`}>
                      {company.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">{company.websiteLabel}</dt>
                  <dd className="mt-1 text-base text-white">
                    <a className="text-cyan-300 hover:text-cyan-200" href={company.website} target="_blank" rel="noreferrer">
                      {company.website}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">{company.phoneLabel}</dt>
                  <dd className="mt-1 text-base text-white">
                    <a className="text-cyan-300 hover:text-cyan-200" href={`tel:${company.phone.replace(/\s+/g, "")}`}>
                      {company.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">{company.responseTimeLabel}</dt>
                  <dd className="mt-1 text-base text-white">{company.responseTime}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-cyan-400/20 bg-cyan-500/5 p-6">
            <h2 className="text-xl font-semibold text-white">{company.servicesLabel}</h2>
            <ul className="mt-4 space-y-3 text-slate-300">
              {company.services.map((service) => (
                <li key={service} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">{company.reviewTitle}</h2>
            <p className="mt-3 text-slate-300">{company.reviewText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/${lang}/privacy`} className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200">
                {lang === "es" ? "Ver aviso de privacidad" : "View privacy notice"}
              </Link>
              <Link href={`/${lang}/contact`} className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                {lang === "es" ? "Ir a contacto" : "Go to contact"}
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const copy = privacyCopy[lang];

  return (
    <div className="bg-[#0a0e27] text-slate-100">
      <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">{copy.eyebrow}</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{copy.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">{copy.intro}</p>
          <p className="mt-4 text-sm text-slate-400">{copy.updated}</p>
        </div>

        <div className="space-y-6">
          {copy.sections.map((section) => (
            <article key={section.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <div className="mt-4 space-y-4 text-slate-300">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-cyan-500/5 p-6">
          <h2 className="text-xl font-semibold text-white">{copy.ctaTitle}</h2>
          <p className="mt-3 text-slate-300">{copy.ctaText}</p>
          <Link href={`/${lang}/company-info`} className="mt-5 inline-flex rounded-full bg-cyan-500 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-400">
            {copy.ctaLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
