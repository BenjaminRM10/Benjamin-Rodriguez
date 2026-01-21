'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Locale, defaultLocale } from './config';
import { LocaleContextType, TranslationObject } from './types';

// Locale context for client components
const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
});

// Provider component wrapper
interface LocaleProviderProps {
  value: LocaleContextType;
  children: ReactNode;
}

export function LocaleProvider({ value, children }: LocaleProviderProps) {
  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

// Hook to access current locale
export function useLocale(): Locale {
  const context = useContext(LocaleContext);
  return context.locale;
}

/**
 * Helper to interpolate variables in translation strings
 * Usage: interpolate("Hello, {{name}}!", { name: "World" }) => "Hello, World!"
 */
function interpolate(
  template: string,
  params: Record<string, string | number>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return params[key]?.toString() ?? `{{${key}}}`;
  });
}

/**
 * Hook for using translations in client components
 * Translations are passed as props from server components
 */
export function useTranslations<T extends Record<string, unknown>>(translations: T) {
  const t = (key: string, params?: Record<string, string | number>): string => {
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

  // Get raw value (for arrays or nested objects)
  const raw = <R = unknown>(key: string): R => {
    const keys = key.split('.');
    let value: unknown = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key as R;
      }
    }

    return value as R;
  };

  return { t, raw };
}

/**
 * Type-safe helper to create typed translation hooks
 * Example usage:
 * const useNavTranslations = createTypedTranslationHook<NavTranslations>();
 */
export function createTypedTranslationHook<T extends TranslationObject>() {
  return (translations: T) => useTranslations(translations);
}
