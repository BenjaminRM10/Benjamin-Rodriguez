# Design Polish — Site-wide Cleanup

**Date:** 2026-05-14
**Scope:** Visual and content polish across the entire portfolio site. Not a redesign — keep the existing design system (dark navy, blue/cyan/purple, Geist) and information architecture.

## Goal

Remove "AI-generated" tells, reduce content noise, and improve scanability so each visitor (recruiter or potential client) can find what they need fast.

## Non-Goals

- No new color palette, no font swap, no IA change.
- No new pages, no new sections.
- No light-mode toggle.

---

## Design system changes

### Border radius

| Element | Before | After |
|---|---|---|
| Cards (all) | `rounded-2xl` / `rounded-3xl` (16–24px) | `rounded` (4px) |
| Buttons | `rounded-md` (6px) | `rounded-sm` (2px) |
| Badges/pills (where they remain) | `rounded-full` | `rounded-sm` (2px) |
| Inputs | `rounded-md` | `rounded-sm` (2px) |

Update Tailwind `--radius` token if used; otherwise change utility classes.

### Text gradients

- **Keep:** the cyan→blue gradient on "Rodríguez" in the home hero (`app/[lang]/page.tsx`). This is the only allowed text gradient site-wide.
- **Remove everywhere else:** all `bg-clip-text bg-gradient-to-*` on headings — Profile hero, "Intelligent Automation", BeyondCode title, etc. Replace with solid `text-white` or `text-slate-100`.

### Backgrounds & decoration

Remove site-wide:
- Floating blur orbs (`bg-blue-500/20 ... blur-[100px] animate-pulse`)
- Particle background on home
- Rotating gradient border around profile photo (`animate-spin-slow`)
- `animate-ping` status dots
- Any decorative gradient overlays inside cards

Replace with: flat `#0a0e27` background. Optional very subtle 1px grid or noise at <3% opacity if a section feels empty after the cleanup.

### Borders

Replace `border-white/10` with a defined slate border:
- Default: `border border-slate-800` (~`#1e293b`)
- Hover: `hover:border-slate-700`

No `backdrop-blur` on regular cards (only modals/dropdowns).

### Animations

Remove decorative motion. Keep only:
- `transition-colors` / `transition-opacity` on hover (200ms)
- `framer-motion` fade-in on first view, max once per section, no scale/spring
- Existing modal/accordion transitions

Delete: `animate-spin-slow`, `animate-ping`, `animate-pulse` on decorative blobs, hover `scale: 1.02` on cards.

### Spacing & typography

- Card internal padding: +30% (e.g., `p-6` → `p-8`, `p-8` → `p-10`)
- Section vertical padding: `py-16` → `py-24` minimum
- Headings: cap at 3 levels per page. H1 ~`text-6xl md:text-7xl` (was `text-5xl`). Weights limited to `font-medium` (500), `font-semibold` (600), `font-bold` (700) — no mixing 4 weights in one section.

---

## Content rules (apply across pages)

- **One CTA per section.** Primary leads to Contact or WhatsApp. Secondary CTAs become text-link with arrow (`Discuss a project →`), no button styling.
- **Cut filler phrases.** Strip: "Transform Your Business", "24/7 availability", "tailored to your business needs", "next big thing", "Where Engineering Meets Innovation", "The only limit is your imagination", "Solutions for the Future".
- **No tech-stack badge rows inline in cards.** If stack must be shown, only in project detail modal or on hover.
- **No motivational blockquotes.**
- **No status pulsing badges.** "Available for work" → small line in footer or contact page.
- **No mono-numbered labels** ("01 / WEB", "02 / SOLUTIONS"). Cards lead with the actual title.

---

## Per-page changes

### Home (`app/[lang]/page.tsx`)

Keep current structure: nav, hero (name + photo + role typer), three "door" cards (Profile / Solutions / Portfolio), footer.

Polish:
- Remove rotating gradient ring on photo. Replace with a static 1px slate ring (`ring-1 ring-slate-700`).
- Remove particle / orb backgrounds.
- Hero typed text ("OPEX Engineer & Automation |"): keep typer but cap at 2 phrases that rotate, or hold one phrase.
- Three door cards: remove the colored filled circle icons. Replace with a small monochrome line icon (`text-slate-400`, `size-5`) top-left. Title, one-line description, `Enter →` text-link at bottom-right. Border `border-slate-800`, hover `border-slate-700`, radius `4px`, padding increased.
- Footer: remove "Built with Next.js & Tailwind CSS".

### Profile (`app/[lang]/profile/page.tsx`)

Sections in order: Hero, About, Skills, Certifications, BeyondCode.

- **Hero:** drop the emerald gradient on the title, drop "Open to new projects" pulsing badge (move text to contact page or footer). Keep photo, drop the rotating ring.
- **About:** strip the blockquote "The only limit is your imagination". Replace the 4 stat-cards row with a single horizontal row of 4 big numbers + short label, separated by `border-l border-slate-800`. No card backgrounds.
  - `1` Year as OPEX Engineer
  - `2` Countries (Canada, Mexico)
  - `18+` Certifications
  - `Recent` Mechanical Engineering grad
- **"Who I work with" badges:** delete entirely. The audience is implied by Solutions/Portfolio.
- **Skills:** keep the 6 tabbed groups, but redesign the tabs as a horizontal list (no big card buttons). Active tab gets a 2px blue underline; inactive tabs are `text-slate-400`. Skill chips inside lose their pill backgrounds — become a simple comma-separated list or a 3-column grid of names with a tiny icon.
- **Certifications:** keep the cards but apply new borders/radii. Hide "View All Certifications" if already showing 4+ — let users click to expand inline instead of going to a new view (no separate page exists).
- **BeyondCode:** keep 4 cards, but each becomes **max 60 words** (currently multiple paragraphs). Drop the badges on each card. Drop the colored gradient overlays. Format:
  ```
  [icon]  [title]
  [1 short paragraph: location + activity + what it taught you, ~50–60 words]
  ```
  Section title: solid white, not emerald gradient.

### Solutions (`app/[lang]/solutions/page.tsx`)

Sections in order: Hero, Brand (compact), ROI Calculator, Services, Contact CTA.

- **Hero:** kill "Intelligent Automation" gradient. Title becomes one line, solid white. Subtitle 1 sentence. **One CTA only** (`Calculate ROI`). Remove "Enterprise-Grade Solutions" eyebrow.
- **Brand section:** compress to a single line — `All services delivered through AppCreatorBR.` No card wrapper, no logo blowup.
- **ROI Calculator:** keep functionality. Visual: remove gradient title, drop the "AI-POWERED ANALYSIS" badge, simplify the MXN/USD toggle to a small inline segmented control. Inputs use new sharper styling.
- **Services:** restructure as a 2x2 grid of 4 services (consolidate the current 5: merge Excel + Data Analysis into "Data & Spreadsheets"). Each card:
  - Title (no tech badge row)
  - 1 short sentence (max 18 words)
  - `Discuss a project →` text-link
  - Border, no fill, no inner gradient
- **No "Get a Quote / Start Automating / Get Custom Solution" trio of CTAs.** Each card has one text-link. Section ends with a single shared CTA button.

### Portfolio (`app/[lang]/portfolio/page.tsx`)

- **Translate to use i18n properly.** The page currently mixes EN strings inside `/en`. All copy must come from translation files for both `en` and `es`. Strings to translate: "Portafolio de sitios, sistemas y automatizaciones", "Explora trabajos públicos…", filter labels ("Sitios públicos", "Sistemas privados", "Operación", "Productos propios", "AI"), stats labels.
- **Hero:** drop the eyebrow text, single H1 + 1-line subtitle.
- **Stats row** (5 / 3 / 11): same treatment as Profile About stats — horizontal numbers with `border-l` separators, no cards.
- **Filter pills:** smaller, `rounded-sm`, `text-slate-400`, active state uses a 1px bottom border in blue (no filled background).
- **Project cards:**
  - Image takes 60–65% of the card height (currently text-heavy)
  - Below image: title (1 line), one line of description max, no inline tech-tag row (move to modal)
  - `Visit Site` becomes a text-link with arrow on hover
  - Border `border-slate-800`, radius `4px`
- **Bottom "Sitios web para clientes / Sistemas privados" boxes:** delete. The filter UI above already communicates these categories.

### Contact (`app/[lang]/contact/page.tsx`)

- Single column form, max-width `~520px`, centered.
- Drop any colored gradient on the title.
- Submit button: `rounded-sm`, solid `bg-blue-600`, no glow/shadow.

### Company info / Privacy (`app/[lang]/company-info`, `app/[lang]/privacy`)

- Apply new typography scale and borders.
- Remove any gradient titles.
- Otherwise text-only — no card wrappers.

### Navigation (header, `components/Navbar.tsx` or equivalent)

- Logo: same.
- Links: `text-slate-300`, hover `text-white`, no underline animation.
- Active page: 2px blue underline.
- **Contact button:** demote from filled blue pill to ghost button — `border border-slate-700`, `rounded-sm`, same height. Keeps it visible without screaming.
- **Language switcher:** segmented control showing both `EN` `ES` side-by-side with active highlighted, instead of a button that flips.
- Mobile menu: keep current sheet/dropdown, apply new border/radius styling.

### Footer

- Remove "Built with Next.js & Tailwind CSS".
- Status "Open to work" line moves here as a small `text-slate-400` line: `Open to new projects.`
- Same 3-column structure (Brand / Navigation / Connect).

---

## Component-level checklist (files touched)

These are the files the implementation will need to edit:

- `tailwind.config.ts` — radius tokens
- `app/globals.css` — any custom CSS removal (animate-spin-slow, etc.)
- `components/sections/Hero.tsx` — profile page hero
- `components/sections/About.tsx` — strip blockquote + stats restructure
- `components/sections/Skills.tsx` + `SkillsClient.tsx` — tab redesign, chip restyle
- `components/sections/Certifications.tsx` + `CertificationsClient.tsx` — restyle
- `components/sections/BeyondCode.tsx` — shorten copy, restyle
- `components/sections/Services.tsx` — restructure to 2x2, copy cuts, single CTA
- `components/sections/SolutionsHero.tsx` — kill gradient, single CTA
- `components/sections/Brand.tsx` — compress
- `components/sections/ROICalculator.tsx` — visual cleanup
- `components/sections/PortfolioPageClient.tsx` + `PortfolioClient.tsx` — i18n, filter restyle, card restyle, drop bottom boxes
- `components/sections/Contact.tsx` — form restyle
- `components/shared/ProjectCard.tsx` — image-dominant layout, drop inline tech tags
- `components/Navbar.tsx` (or equivalent) — contact button demote, lang switcher segmented
- `components/Footer.tsx` (or equivalent) — drop tech credit, add status line
- `lib/i18n/dictionaries/{en,es}.json` (or wherever translations live) — add missing portfolio strings
- `app/[lang]/page.tsx` — home door cards restyle, remove particles
- All section files using `motion.div whileHover scale` — strip the scale animation

---

## Success criteria

- Visual scan of the site shows **zero** of: gradient headings (except "Rodríguez"), blur orbs, particles, rotating rings, pulsing dots, tech-badge rows inline in cards, multi-CTA stacks per section.
- No string is in Spanish on `/en` routes (and vice versa).
- Each page section answers "what is this, in one line" within 1 second of scanning.
- Cards have visible 1px slate borders, sharp 4px corners, no fills, generous padding.

## Out of scope (future work)

- Building a true `/certifications` detail page
- A proper case study page per portfolio project
- Light mode
- Reworking the ROI calculator's results visualization
