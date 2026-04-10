export type LocalizedCompanyInfo = {
  heading: string;
  subheading: string;
  legalNameLabel: string;
  legalName: string;
  brandLabel: string;
  brand: string;
  ownerLabel: string;
  owner: string;
  countryLabel: string;
  country: string;
  regionLabel: string;
  region: string;
  businessTypeLabel: string;
  businessType: string;
  servicesLabel: string;
  services: string[];
  contactTitle: string;
  emailLabel: string;
  email: string;
  websiteLabel: string;
  website: string;
  responseTimeLabel: string;
  responseTime: string;
  reviewTitle: string;
  reviewText: string;
};

export const companyInfo = {
  es: {
    heading: "Información de la empresa",
    subheading:
      "Información visible para validación de identidad comercial, contacto y operación del sitio.",
    legalNameLabel: "Responsable / titular",
    legalName: "Benjamin Rodríguez",
    brandLabel: "Nombre comercial",
    brand: "AppCreatorBR",
    ownerLabel: "Representante",
    owner: "Benjamin Rodríguez",
    countryLabel: "País",
    country: "México",
    regionLabel: "Ubicación operativa",
    region: "Saltillo, Coahuila, México",
    businessTypeLabel: "Giro",
    businessType: "Desarrollo de software, automatización, integración de IA y soluciones web empresariales",
    servicesLabel: "Servicios principales",
    services: [
      "Desarrollo de aplicaciones web a la medida",
      "Automatización de procesos operativos y administrativos",
      "Integración de asistentes y flujos con inteligencia artificial",
      "Dashboards, analítica y herramientas internas para negocio",
    ],
    contactTitle: "Datos de contacto",
    emailLabel: "Correo electrónico",
    email: "contacto@appcreatorbr.com",
    websiteLabel: "Sitio web",
    website: "https://appcreatorbr.com",
    responseTimeLabel: "Tiempo de respuesta",
    responseTime: "Usualmente dentro de 1 a 2 días hábiles",
    reviewTitle: "Nota para validación",
    reviewText:
      "Esta sección se publica para mostrar de forma clara la identidad del responsable del sitio, medios de contacto y naturaleza de los servicios ofrecidos.",
  },
  en: {
    heading: "Company information",
    subheading:
      "Visible information for business identity, contact and website verification.",
    legalNameLabel: "Owner / controller",
    legalName: "Benjamin Rodríguez",
    brandLabel: "Trade name",
    brand: "AppCreatorBR",
    ownerLabel: "Representative",
    owner: "Benjamin Rodríguez",
    countryLabel: "Country",
    country: "Mexico",
    regionLabel: "Operating location",
    region: "Saltillo, Coahuila, Mexico",
    businessTypeLabel: "Business activity",
    businessType: "Software development, automation, AI integration and business web solutions",
    servicesLabel: "Main services",
    services: [
      "Custom web application development",
      "Operational and administrative process automation",
      "AI assistant and workflow integrations",
      "Dashboards, analytics and internal business tools",
    ],
    contactTitle: "Contact details",
    emailLabel: "Email",
    email: "contacto@appcreatorbr.com",
    websiteLabel: "Website",
    website: "https://appcreatorbr.com",
    responseTimeLabel: "Response time",
    responseTime: "Usually within 1 to 2 business days",
    reviewTitle: "Verification note",
    reviewText:
      "This section is published to clearly display the website owner identity, contact channels and the nature of the services offered.",
  },
} as const;
