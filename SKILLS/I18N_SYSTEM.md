# Sistema de Internacionalización (i18n)

## Resumen

Este proyecto implementa un sistema de internacionalización **Server-First** con soporte para inglés (`en`) y español (`es`). Las traducciones se cargan en el servidor y se pasan como props a los componentes cliente.

**IMPORTANTE**: Cualquier texto visible al usuario DEBE estar traducido en ambos idiomas.

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    Server Component                          │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  const t = await getTranslations(lang, 'namespace') │    │
│  └─────────────────────────────────────────────────────┘    │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  <ClientComponent translations={t.section} />       │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## Estructura de Archivos

```
lib/i18n/
├── config.ts          # Configuración de locales (en, es)
├── types.ts           # Interfaces TypeScript para traducciones
├── server.ts          # getTranslations() - carga server-side
├── client.tsx         # LocaleProvider y useLocale hook
└── translations/
    ├── en/
    │   ├── common.json     # Navbar, Footer, botones globales
    │   ├── home.json       # Página principal
    │   ├── profile.json    # Página de perfil
    │   ├── solutions.json  # Página de soluciones
    │   ├── academy.json    # Página de academia
    │   └── contact.json    # Página de contacto
    └── es/
        ├── common.json
        ├── home.json
        ├── profile.json
        ├── solutions.json
        ├── academy.json
        └── contact.json
```

---

## Cómo Funciona

### 1. Cargar Traducciones (Server Component)

```typescript
// app/[lang]/page.tsx
import { getTranslations } from "@/lib/i18n/server";
import type { HomeTranslations } from "@/lib/i18n/types";
import { Locale } from "@/lib/i18n/config";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const validLang = (lang === 'es' || lang === 'en') ? lang as Locale : 'en';

    // Cargar traducciones del namespace 'home'
    const homeTranslations = await getTranslations<HomeTranslations>(validLang, 'home');

    return <ClientComponent translations={homeTranslations} />;
}
```

### 2. Usar Traducciones (Client Component)

```typescript
// components/sections/MyComponent.tsx
'use client';

interface MyComponentProps {
    translations?: {
        title: string;
        description: string;
    };
}

// Siempre incluir valores por defecto en inglés
const defaultTranslations = {
    title: "Default Title",
    description: "Default description"
};

export function MyComponent({ translations }: MyComponentProps) {
    const t = translations ?? defaultTranslations;

    return (
        <div>
            <h1>{t.title}</h1>
            <p>{t.description}</p>
        </div>
    );
}
```

---

## Agregar Nuevas Traducciones

### Paso 1: Definir el Tipo en `types.ts`

```typescript
// lib/i18n/types.ts

export interface MiNuevoComponenteTranslations {
    title: string;
    subtitle: string;
    items: {
        item1: { name: string; description: string };
        item2: { name: string; description: string };
    };
}
```

### Paso 2: Crear/Actualizar JSON en AMBOS idiomas

**CRÍTICO**: Siempre modificar ambos archivos simultáneamente.

```json
// lib/i18n/translations/en/mi-namespace.json
{
    "title": "My Title",
    "subtitle": "My subtitle",
    "items": {
        "item1": { "name": "Item 1", "description": "Description 1" },
        "item2": { "name": "Item 2", "description": "Description 2" }
    }
}
```

```json
// lib/i18n/translations/es/mi-namespace.json
{
    "title": "Mi Título",
    "subtitle": "Mi subtítulo",
    "items": {
        "item1": { "name": "Elemento 1", "description": "Descripción 1" },
        "item2": { "name": "Elemento 2", "description": "Descripción 2" }
    }
}
```

### Paso 3: Actualizar `server.ts` si es un nuevo namespace

```typescript
// lib/i18n/server.ts
export type TranslationNamespace =
    | 'common'
    | 'home'
    | 'profile'
    | 'solutions'
    | 'academy'
    | 'contact'
    | 'mi-namespace';  // <-- Agregar nuevo namespace
```

---

## Patrones Comunes

### Texto con HTML (negritas, cursivas)

```json
// JSON
{
    "intro": "This is <strong>important</strong> text."
}
```

```tsx
// Component
<p dangerouslySetInnerHTML={{ __html: t.intro }} />
```

### Valores Condicionales por Idioma

```tsx
// Para fechas, meses, etc.
<span>{lang === 'es' ? 'ENE' : 'JAN'}</span>
```

### Arrays de Items Traducibles

```json
// JSON
{
    "services": {
        "webDev": { "title": "Web Development", "description": "..." },
        "automation": { "title": "Automation", "description": "..." }
    }
}
```

```tsx
// Component - crear array dinámicamente
const services = [
    { id: 'webDev', ...t.services.webDev, icon: Globe },
    { id: 'automation', ...t.services.automation, icon: Bot },
];
```

---

## Namespaces Existentes

| Namespace | Uso | Archivo de Tipos |
|-----------|-----|------------------|
| `common` | Navbar, Footer, botones globales | `CommonTranslations` |
| `home` | Página principal (/) | `HomeTranslations` |
| `profile` | Página de perfil (/profile) | `ProfileTranslations` |
| `solutions` | Página de soluciones (/solutions) | `SolutionsTranslations` |
| `academy` | Página de academia (/academy) | `AcademyTranslations` |
| `contact` | Página de contacto (/contact) | `ContactTranslations` |

---

## Checklist para Modificaciones

Cuando agregues o modifiques texto visible:

- [ ] Identificar el namespace correcto (common, home, profile, etc.)
- [ ] Actualizar `lib/i18n/translations/en/{namespace}.json`
- [ ] Actualizar `lib/i18n/translations/es/{namespace}.json`
- [ ] Si es nueva estructura, actualizar `lib/i18n/types.ts`
- [ ] Verificar que el componente acepta `translations` como prop
- [ ] Incluir valores por defecto (fallback) en inglés en el componente
- [ ] Verificar con `npx tsc --noEmit` que no hay errores de tipos

---

## Rutas con Idioma

El idioma se determina por el segmento `[lang]` en la URL:

- `/en` → Inglés
- `/es` → Español
- `/en/profile` → Perfil en inglés
- `/es/profile` → Perfil en español

El `LanguageToggle` en el Navbar permite cambiar entre idiomas.

---

## Ejemplo Completo: Agregar Nueva Sección

### 1. Agregar traducciones a JSON existente

```json
// lib/i18n/translations/en/home.json
{
    "existingSection": { ... },
    "newSection": {
        "title": "New Feature",
        "description": "This is a new feature we added.",
        "cta": "Learn More"
    }
}
```

```json
// lib/i18n/translations/es/home.json
{
    "existingSection": { ... },
    "newSection": {
        "title": "Nueva Función",
        "description": "Esta es una nueva función que agregamos.",
        "cta": "Saber Más"
    }
}
```

### 2. Actualizar tipo en types.ts

```typescript
export interface HomeTranslations {
    existingSection: { ... };
    newSection: {
        title: string;
        description: string;
        cta: string;
    };
}
```

### 3. Usar en componente

```tsx
// app/[lang]/page.tsx
const homeT = await getTranslations<HomeTranslations>(validLang, 'home');

return <NewSection translations={homeT.newSection} />;
```

```tsx
// components/sections/NewSection.tsx
'use client';

interface NewSectionProps {
    translations?: { title: string; description: string; cta: string };
}

const defaults = { title: "New Feature", description: "...", cta: "Learn More" };

export function NewSection({ translations }: NewSectionProps) {
    const t = translations ?? defaults;
    return (
        <section>
            <h2>{t.title}</h2>
            <p>{t.description}</p>
            <button>{t.cta}</button>
        </section>
    );
}
```

---

## Notas Importantes

1. **Siempre usar fallbacks**: Los componentes deben funcionar aunque no reciban traducciones.

2. **No hardcodear texto**: TODO texto visible debe venir de traducciones.

3. **Mantener paridad**: Los archivos en `en/` y `es/` deben tener exactamente la misma estructura.

4. **Traducciones semánticas**: No traducir literalmente. Adaptar al contexto cultural.

5. **Verificar tipos**: Ejecutar `npx tsc --noEmit` después de cambios.

---

## Archivos Clave de Referencia

- **Tipos**: `lib/i18n/types.ts`
- **Server loader**: `lib/i18n/server.ts`
- **Client utilities**: `lib/i18n/client.tsx`
- **Layout (carga common)**: `app/[lang]/layout.tsx`
