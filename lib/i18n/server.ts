import { Locale, defaultLocale } from './config';
import { TranslationNamespace, TranslationObject } from './types';

// Dynamic import cache for translations
const translationCache = new Map<string, TranslationObject>();

/**
 * Load translations for a specific locale and namespace
 * Server-side only - uses dynamic imports for zero client overhead
 */
export async function getTranslations<T = TranslationObject>(
  locale: Locale | string,
  namespace: TranslationNamespace
): Promise<T> {
  const validLocale = (locale === 'en' || locale === 'es' ? locale : defaultLocale) as Locale;
  const cacheKey = `${validLocale}/${namespace}`;

  // Check cache first
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey) as T;
  }

  try {
    // Dynamic import based on locale and namespace
    const translations = await import(`./translations/${validLocale}/${namespace}.json`);
    const data = translations.default || translations;
    translationCache.set(cacheKey, data);
    return data as T;
  } catch (error) {
    console.error(`Failed to load translations for ${validLocale}/${namespace}:`, error);

    // Fallback to default locale if current locale fails
    if (validLocale !== defaultLocale) {
      try {
        const fallback = await import(`./translations/${defaultLocale}/${namespace}.json`);
        return (fallback.default || fallback) as T;
      } catch {
        console.error(`Failed to load fallback translations for ${namespace}`);
      }
    }

    return {} as T;
  }
}

/**
 * Load multiple namespaces at once
 * Useful for pages that need several translation files
 */
export async function getMultipleTranslations<T extends Record<TranslationNamespace, TranslationObject>>(
  locale: Locale | string,
  namespaces: TranslationNamespace[]
): Promise<Partial<T>> {
  const results = await Promise.all(
    namespaces.map(async (ns) => ({
      namespace: ns,
      translations: await getTranslations(locale, ns),
    }))
  );

  return results.reduce((acc, { namespace, translations }) => {
    acc[namespace as keyof T] = translations as T[keyof T];
    return acc;
  }, {} as Partial<T>);
}

/**
 * Helper to interpolate variables in translation strings
 * Usage: interpolate("Hello, {{name}}!", { name: "World" }) => "Hello, World!"
 */
export function interpolate(
  template: string,
  params: Record<string, string | number>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return params[key]?.toString() ?? `{{${key}}}`;
  });
}

/**
 * Create a translation function for a given translations object
 * Supports nested keys with dot notation: t('nav.home')
 */
export function createTranslator<T extends TranslationObject>(
  translations: T
): (key: string, params?: Record<string, string | number>) => string {
  return (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: unknown = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    if (typeof value === 'string') {
      return params ? interpolate(value, params) : value;
    }

    console.warn(`Translation value is not a string: ${key}`);
    return key;
  };
}
