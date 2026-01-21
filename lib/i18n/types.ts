import { Locale } from './config';

// Namespace types for organized translations
export type TranslationNamespace =
  | 'common'
  | 'home'
  | 'profile'
  | 'solutions'
  | 'academy'
  | 'contact';

// Generic translation object type
export type TranslationObject = {
  [key: string]: string | string[] | TranslationObject;
};

// Common translations type
export interface CommonTranslations {
  nav: {
    home: string;
    profile: string;
    solutions: string;
    academy: string;
    contact: string;
    about: string;
    services: string;
    portfolio: string;
  };
  footer: {
    tagline: string;
    navigation: string;
    connect: string;
    services: string;
    automation: string;
    aiIntegration: string;
    webDevelopment: string;
    consulting: string;
    copyright: string;
    builtWith: string;
  };
  buttons: {
    learnMore: string;
    getStarted: string;
    viewMore: string;
    submit: string;
    send: string;
    cancel: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    loading: string;
    download: string;
    share: string;
  };
  form: {
    required: string;
    optional: string;
    invalidEmail: string;
    invalidPhone: string;
    minLength: string;
    maxLength: string;
    success: string;
    error: string;
  };
  aria: {
    openMenu: string;
    closeMenu: string;
    toggleLanguage: string;
    scrollToTop: string;
    externalLink: string;
  };
}

// Home translations type
export interface HomeTranslations {
  hero: {
    name: string;
    lastName: string;
    roles: string[];
  };
  cards: {
    profile: {
      title: string;
      description: string;
    };
    solutions: {
      title: string;
      description: string;
    };
    academy: {
      title: string;
      description: string;
    };
    enter: string;
  };
  footer: {
    copyright: string;
  };
  alt: {
    logo: string;
    profilePhoto: string;
  };
}

// Profile translations type
export interface ProfileTranslations {
  hero: {
    status: string;
    name: string;
    lastName: string;
    tagline: string;
    roles: string[];
    alt: {
      profilePhoto: string;
    };
  };
  about: {
    title: string;
    titleHighlight: string;
    bio: {
      paragraph1: string;
      paragraph2: string;
    };
    quote: string;
    whoIWorkWith: string;
    badges: string[];
    stats: {
      recentGraduate: { headline: string; description: string };
      experience: { headline: string; description: string };
      international: { headline: string; description: string };
      certifications: { headline: string; description: string };
    };
  };
  skills: {
    title: string;
    subtitle: string;
    categories: {
      devops: string;
      engineering: string;
      programming: string;
      ai: string;
      data: string;
      leadership: string;
    };
    otherSkills: {
      title: string;
      items: string[];
    };
  };
  certifications: {
    badge: string;
    title: string;
    subtitle: string;
    viewAll: string;
  };
  beyondCode: {
    title: string;
    subtitle: string;
    quote: string;
    cards: {
      toronto: {
        title: string;
        badges: string[];
        paragraphs: string[];
      };
      legendarios: {
        title: string;
        badges: string[];
        paragraphs: string[];
      };
      books: {
        title: string;
        badges: string[];
        intro: string;
        pillars: string[];
      };
      basketball: {
        title: string;
        badges: string[];
        paragraphs: string[];
      };
    };
  };
}

// Solutions translations type
export interface SolutionsTranslations {
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaROI: string;
    ctaServices: string;
  };
  brand: {
    badge: string;
    description: string;
    brandName: string;
    tagline: string;
  };
  services: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    professionalServices: string;
    availableCourses: string;
    items: {
      webDev: { title: string; description: string; cta: string };
      whatsapp: { title: string; description: string; cta: string };
      excel: { title: string; description: string; cta: string };
      data: { title: string; description: string; cta: string };
      pythonAI: { title: string; description: string; cta: string };
    };
  };
  roi: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    form: {
      taskName: string;
      taskNamePlaceholder: string;
      hoursPerWeek: string;
      hourlyRate: string;
      automationPercent: string;
      calculate: string;
    };
    results: {
      title: string;
      weeklySavings: string;
      monthlySavings: string;
      yearlySavings: string;
      hoursSaved: string;
      cta: string;
      disclaimer: string;
    };
  };
  portfolio: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
}

// Contact translations type
export interface ContactTranslations {
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  direct: {
    title: string;
    whatsapp: {
      label: string;
      action: string;
    };
    email: {
      label: string;
    };
  };
  social: {
    title: string;
    location: string;
    availability: string;
  };
  form: {
    title: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    validation: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      phoneRequired: string;
      phoneInvalid: string;
      messageRequired: string;
      messageMinLength: string;
    };
  };
  calendar: {
    title: string;
    subtitle: string;
    cta: string;
  };
  toast: {
    emailCopied: string;
  };
}

// Academy translations type
export interface AcademyTranslations {
  hero: {
    badge: string;
    badgeSecondary: string;
    title: string;
    titleHighlight: string;
    intro: string;
    stats: {
      intensive: string;
      workflow: string;
      impact: string;
    };
  };
  paths: {
    sectionTitle: string;
    sectionSubtitle: string;
    initializeSequence: string;
    items: {
      tecSaltillo: { title: string; subtitle: string; description: string; badge: string; date: string };
      student: { title: string; subtitle: string; description: string; badge: string; date: string };
      corporate: { title: string; subtitle: string; description: string; badge: string };
      onlineGroup: { title: string; subtitle: string; description: string; badge: string };
    };
  };
  protocol: {
    sectionTitle: string;
    sectionSubtitle: string;
    steps: {
      infrastructure: { time: string; title: string; header: string; description: string };
      dataEngineering: { time: string; title: string; header: string; description: string };
      frontend: { time: string; title: string; header: string; description: string };
      automation: { time: string; title: string; header: string; description: string };
      bridge: { time: string; title: string; header: string; description: string };
      deployment: { time: string; title: string; header: string; description: string };
    };
  };
  sidebar: {
    upcomingSets: string;
    schedule: string;
    checkRemote: string;
    events: {
      tecSaltillo: { title: string; status: string };
      alebrijeModule2: { title: string; status: string; note: string };
      alebrijeModule1: { title: string; status: string };
    };
  };
  requirements: {
    title: string;
    tooltip: string;
    hardware: { label: string; value: string; detail: string };
    knowledge: { label: string; value: string; detail: string };
    language: { label: string; value: string; detail: string };
  };
  modal: {
    onlineCourse: string;
    tecSaltilloEvent: string;
    courseRegistration: string;
    registerDescription: string;
    loadingForm: string;
  };
  form: {
    title: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    experience: string;
    experienceOptions: {
      none: string;
      beginner: string;
      intermediate: string;
      advanced: string;
    };
    goals: string;
    goalsPlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    validation: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      phoneRequired: string;
      phoneInvalid: string;
    };
  };
}

// Translation function type with interpolation support
export type TranslationFunction = (
  key: string,
  params?: Record<string, string | number>
) => string;

// Props for components that receive translations
export interface WithTranslationsProps<T extends TranslationObject = TranslationObject> {
  translations: T;
  locale?: Locale;
}

// Context type for client-side locale access
export interface LocaleContextType {
  locale: Locale;
}

// Helper type for getting nested translation keys
export type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}` | K
          : K
        : never;
    }[keyof T]
  : never;
