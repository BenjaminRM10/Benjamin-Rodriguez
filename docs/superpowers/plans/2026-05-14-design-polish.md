# Design Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the entire portfolio site visually and editorially without changing palette, fonts, or IA — kill AI-generated tells, cut filler copy, sharpen radii, single CTA per section.

**Architecture:** A series of localized edits across section components and translation files. No new components are created. New visual patterns (door card, service card, stats row, filter pills) are introduced inline in the affected files. Pattern code is given in full where it appears for the first time and referenced (not repeated) on subsequent uses.

**Tech Stack:** Next.js 14 (App Router) · React · TypeScript · Tailwind CSS · Framer Motion · Lucide icons · i18n via `lib/i18n/translations/{en,es}/*.json`.

**Source spec:** `docs/superpowers/specs/2026-05-14-design-polish-design.md`

**Verification protocol (every visual task):** after edits, dev server is running on `http://localhost:3000`. Run:
```bash
npx tsc --noEmit
```
Then take a screenshot of the affected page using `browser_screenshot` or open it in a browser to confirm the visual claim.

---

## Phase 1 — Design system foundations

### Task 1: Lower the radius scale

**Files:**
- Modify: `app/globals.css` (the `--radius` token, search for `--radius:`)

- [ ] **Step 1:** Open `app/globals.css`. Find the `--radius` definition (currently `0.625rem`).

- [ ] **Step 2:** Replace with:

```css
--radius: 0.25rem;       /* 4px — base card radius */
--radius-sm: 0.125rem;   /* 2px — buttons, pills, inputs */
```

If `--radius-sm` is already derived in the file, override it to `0.125rem` explicitly.

- [ ] **Step 3:** Build + verify nothing broke:

```bash
npx tsc --noEmit
```

- [ ] **Step 4:** Commit.

```bash
git add app/globals.css
git commit -m "chore(design): lower base radius to 4px"
```

---

### Task 2: Remove the `spin-slow` keyframe

**Files:**
- Modify: `app/globals.css` (lines ~142–154)

- [ ] **Step 1:** Delete the `@keyframes spin-slow` block and any `.animate-spin-slow { animation: spin-slow 10s linear infinite; }` rule. Grep first to find the exact range:

```bash
grep -n "spin-slow" app/globals.css
```

- [ ] **Step 2:** Remove those lines entirely.

- [ ] **Step 3:** Commit.

```bash
git add app/globals.css
git commit -m "chore(design): remove spin-slow keyframe"
```

---

### Task 3: Establish slate border + radius utility convention

**Files:** (none modified — this task is documentation for downstream tasks)

- [ ] **Step 1:** Throughout the plan, the convention is:
  - Default card: `rounded border border-slate-800 bg-transparent`
  - Hover: `hover:border-slate-700 transition-colors`
  - Buttons: `rounded-sm`
  - **Never** use: `border-white/10`, `backdrop-blur-*` on regular cards, `bg-white/5`, `bg-white/10`.

No commit. Move on.

---

## Phase 2 — Global decoration sweep

### Task 4: Remove ParticleBackground from home

**Files:**
- Modify: `app/[lang]/page.tsx`

- [ ] **Step 1:** Remove the `dynamic` import of `ParticleBackground` at line ~4 and any `<ParticleBackground />` usage in JSX.

- [ ] **Step 2:** Remove any `blur-xl` decorative div (line ~101) that holds a gradient overlay.

- [ ] **Step 3:** Verify build + screenshot the home (`http://localhost:3000/en`). Expect: flat navy background, no animated dots.

- [ ] **Step 4:** Commit.

```bash
git add app/[lang]/page.tsx
git commit -m "feat(home): remove particles and decorative blur"
```

---

### Task 5: Remove decorative blur orbs from Hero, SolutionsHero, Services

**Files:**
- Modify: `components/sections/Hero.tsx` (lines 18–19)
- Modify: `components/sections/SolutionsHero.tsx` (lines 17–18)
- Modify: `components/sections/Services.tsx` (line ~130)

- [ ] **Step 1:** In each file, locate the absolutely-positioned divs with classes like `bg-blue-500/20 ... blur-[80px] animate-pulse` or `bg-purple-500/10 ... blur-3xl`. Delete the whole div.

- [ ] **Step 2:** Verify build + screenshot `/en/profile` and `/en/solutions`. Expect: no glowing orbs in the background of any hero.

- [ ] **Step 3:** Commit.

```bash
git add components/sections/Hero.tsx components/sections/SolutionsHero.tsx components/sections/Services.tsx
git commit -m "feat(design): remove decorative blur orbs from heroes"
```

---

### Task 6: Remove `whileHover scale` micro-animations

**Files:**
- Modify: `components/sections/BeyondCode.tsx` (line 23)
- Modify: `components/shared/Navbar.tsx` (line 65 — `hover:scale-105`)
- Any other `whileHover={{ scale: 1.0X }}` or `hover:scale-*` found via grep

- [ ] **Step 1:** Grep for the pattern site-wide:

```bash
grep -rn "whileHover={{ scale" components/
grep -rn "hover:scale-" components/
```

- [ ] **Step 2:** Remove every instance. Keep the `whileInView` fade-in (opacity + small y translate), drop scale.

- [ ] **Step 3:** Commit.

```bash
git add components/
git commit -m "feat(design): remove hover scale micro-animations"
```

---

### Task 7: Kill text gradients everywhere except home "Rodríguez"

**Files:**
- Modify: `components/sections/Hero.tsx:40`
- Modify: `components/sections/BeyondCode.tsx:69`
- Modify: `components/sections/Services.tsx:146`
- Modify: `components/sections/PortfolioClient.tsx:77` and `PortfolioPageClient.tsx` if same pattern present
- Modify: `components/sections/SkillsClient.tsx:130`
- Modify: `components/sections/Contact.tsx:109`
- **Do not modify:** `app/[lang]/page.tsx:73` (home hero — gradient on "Rodríguez" stays)

- [ ] **Step 1:** In each file above, find the span/heading carrying `bg-clip-text text-transparent bg-gradient-to-r from-*-400 to-*-400`. Replace classes with `text-white`.

  Example before/after for `Hero.tsx:40`:

  ```tsx
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
    {translations.lastName}
  </span>
  ```

  becomes:

  ```tsx
  <span className="text-white">
    {translations.lastName}
  </span>
  ```

- [ ] **Step 2:** Verify build + screenshot each affected page. Confirm headings render solid white.

- [ ] **Step 3:** Commit.

```bash
git add components/sections/
git commit -m "feat(design): remove text gradients (keep only home hero)"
```

---

## Phase 3 — Home page

### Task 8: Restyle the three door cards

**Files:**
- Modify: `app/[lang]/page.tsx` (around line 90–115)

- [ ] **Step 1:** Locate the three `<Link>` cards (Profile / Solutions / Portfolio). Current pattern: filled colored circle icon, title centered, description, "Enter →".

- [ ] **Step 2:** Replace each card with this pattern (preserve i18n props):

```tsx
<Link
  href={`/${lang}/profile`}
  className="group flex flex-col justify-between rounded border border-slate-800 hover:border-slate-700 transition-colors p-8 min-h-[200px]"
>
  <div className="flex items-start justify-between">
    <UserIcon className="size-5 text-slate-400" />
    <ArrowRight className="size-4 text-slate-500 group-hover:text-white transition-colors" />
  </div>
  <div>
    <h3 className="text-white text-xl font-semibold mb-1">{t.cards.profile.title}</h3>
    <p className="text-slate-400 text-sm">{t.cards.profile.description}</p>
  </div>
</Link>
```

Use `User`, `Briefcase`, `FolderGit2` from `lucide-react` for the three cards respectively. Drop the existing filled-circle wrapper, drop the centered `Enter` text.

- [ ] **Step 3:** Verify build + screenshot home. Cards should be transparent with 1px slate border, sharp 4px corners.

- [ ] **Step 4:** Commit.

```bash
git add app/[lang]/page.tsx
git commit -m "feat(home): flatten door cards, sharper radius, line icons"
```

---

### Task 9: Footer — drop tech credit, add "open to projects" line

**Files:**
- Modify: `components/shared/Footer.tsx`

- [ ] **Step 1:** Find the string `Built with Next.js & Tailwind CSS` (probably in the bottom bar). Remove it.

- [ ] **Step 2:** In the "Connect" column or below the brand description, add a single line:

```tsx
<p className="text-slate-400 text-sm mt-2">{t.footer.openToWork}</p>
```

- [ ] **Step 3:** Add the i18n string to both locales.

`lib/i18n/translations/en/common.json` (or wherever footer strings live — confirm by grep `Built with`):
```json
"footer": {
  "openToWork": "Open to new projects."
}
```

`lib/i18n/translations/es/common.json`:
```json
"footer": {
  "openToWork": "Abierto a nuevos proyectos."
}
```

Merge with existing footer keys (do not overwrite).

- [ ] **Step 4:** Commit.

```bash
git add components/shared/Footer.tsx lib/i18n/translations/
git commit -m "feat(footer): drop tech credit, add open-to-work line"
```

---

### Task 10: Navbar — demote Contact button + segmented language switcher

**Files:**
- Modify: `components/shared/Navbar.tsx`

- [ ] **Step 1:** Find the Contact link (likely styled `bg-blue-500 rounded-full hover:scale-105`). Replace with:

```tsx
<Link
  href={`/${lang}/contact`}
  className="rounded-sm border border-slate-700 hover:border-slate-500 text-white px-4 py-1.5 text-sm transition-colors"
>
  {t.nav.contact}
</Link>
```

- [ ] **Step 2:** Replace the language toggle (currently a single button flipping to the other lang) with a segmented control:

```tsx
<div className="flex items-center rounded-sm border border-slate-800 overflow-hidden text-xs">
  <Link
    href={`/en${pathnameWithoutLocale}`}
    className={cn(
      "px-2.5 py-1 transition-colors",
      lang === "en" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
    )}
  >EN</Link>
  <Link
    href={`/es${pathnameWithoutLocale}`}
    className={cn(
      "px-2.5 py-1 transition-colors",
      lang === "es" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
    )}
  >ES</Link>
</div>
```

If `pathnameWithoutLocale` does not exist, derive it from `usePathname()`:

```tsx
const pathname = usePathname();
const pathnameWithoutLocale = pathname.replace(/^\/(en|es)/, "") || "/";
```

- [ ] **Step 3:** Verify build, screenshot the nav on home. Contact button should look ghost (border, no fill). Language switcher should show both EN and ES inline.

- [ ] **Step 4:** Commit.

```bash
git add components/shared/Navbar.tsx
git commit -m "feat(nav): ghost contact button, segmented lang switcher"
```

---

## Phase 4 — Profile page

### Task 11: Profile Hero — drop pulsing badge, rotating ring

**Files:**
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1:** Lines 18–19: already removed in Task 5 (blur orbs).

- [ ] **Step 2:** Line ~29–34: the "Open to new projects" badge with `animate-ping` green dot. **Delete the entire badge.**

- [ ] **Step 3:** Lines ~55–65: the photo wrapper with `animate-spin-slow` rotating border and `blur-md` glow. Replace with a simple static ring:

```tsx
<div className="relative size-48 md:size-56">
  <Image
    src={profileSrc}
    alt={alt}
    fill
    sizes="(min-width:768px) 14rem, 12rem"
    className="rounded-full object-cover ring-1 ring-slate-700"
    priority
  />
</div>
```

- [ ] **Step 4:** Cap the typer to one phrase or two — find the array passed to it, trim to length 2.

- [ ] **Step 5:** Verify, screenshot `/en/profile`. Confirm photo has just a hairline ring; no rotating gradient; no pulsing dot.

- [ ] **Step 6:** Commit.

```bash
git add components/sections/Hero.tsx
git commit -m "feat(profile): drop rotating ring, pulsing badge, extra typer phrases"
```

---

### Task 12: About — strip blockquote, restructure stats, drop badges

**Files:**
- Modify: `components/sections/About.tsx`
- Modify: `lib/i18n/translations/en/profile.json`, `lib/i18n/translations/es/profile.json`

- [ ] **Step 1:** In `About.tsx`, find the blockquote `"The only limit is your imagination"` and delete that JSX block.

- [ ] **Step 2:** Find the "Who I work with" section that renders `Badge` components for `PYMES`, `STARTUPS`, etc. Delete the whole subsection (header + badge list).

- [ ] **Step 3:** Locate the 4 `GlowCard` stats components (Recent Graduate / OPEX Engineer 1 Year / Canada & Mexico / 18+ Certifications). Replace the entire stats grid with this inline pattern:

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 mt-12 border-t border-slate-800">
  {stats.map((s, i) => (
    <div
      key={s.label}
      className={cn(
        "py-6 px-4",
        i > 0 && "md:border-l border-slate-800"
      )}
    >
      <div className="text-white text-3xl md:text-4xl font-semibold tracking-tight">{s.value}</div>
      <div className="text-slate-400 text-xs uppercase tracking-wider mt-2">{s.label}</div>
    </div>
  ))}
</div>
```

Where `stats` comes from translations:

```ts
const stats = [
  { value: t.about.stats.experience.value, label: t.about.stats.experience.label },
  { value: t.about.stats.countries.value, label: t.about.stats.countries.label },
  { value: t.about.stats.certifications.value, label: t.about.stats.certifications.label },
  { value: t.about.stats.education.value, label: t.about.stats.education.label },
];
```

- [ ] **Step 4:** Update `lib/i18n/translations/en/profile.json` to ensure `about.stats` has this shape:

```json
"stats": {
  "experience": { "value": "1", "label": "Year OPEX Engineer" },
  "countries": { "value": "2", "label": "Canada & Mexico" },
  "certifications": { "value": "18+", "label": "Certifications" },
  "education": { "value": "Recent", "label": "Mech. Eng. Grad" }
}
```

And the Spanish equivalent in `es/profile.json`:

```json
"stats": {
  "experience": { "value": "1", "label": "Año Ingeniero OPEX" },
  "countries": { "value": "2", "label": "Canadá y México" },
  "certifications": { "value": "18+", "label": "Certificaciones" },
  "education": { "value": "Recién", "label": "Egresado Ing. Mec." }
}
```

If existing keys differ, merge — don't drop other `about.*` keys.

- [ ] **Step 5:** Verify, screenshot `/en/profile` (top portion). Expect: bio text, then 4 big numbers in a horizontal row, no card backgrounds.

- [ ] **Step 6:** Commit.

```bash
git add components/sections/About.tsx lib/i18n/translations/
git commit -m "feat(about): drop blockquote/badges, flatten stats row"
```

---

### Task 13: Skills — tab and chip restyle

**Files:**
- Modify: `components/sections/SkillsClient.tsx`

- [ ] **Step 1:** Locate the tab list (radix Tabs). Replace TabsList styling so each TabsTrigger looks like a text link with a 2px blue underline when active:

```tsx
<TabsList className="flex flex-wrap gap-x-6 gap-y-2 justify-start bg-transparent border-b border-slate-800 rounded-none p-0 h-auto">
  {categories.map((cat) => (
    <TabsTrigger
      key={cat.id}
      value={cat.id}
      className="bg-transparent text-slate-400 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-0 pb-3 text-sm font-medium shadow-none"
    >
      {cat.label}
    </TabsTrigger>
  ))}
</TabsList>
```

- [ ] **Step 2:** Inside each `TabsContent`, the skill chips currently have pill backgrounds. Replace the skill list with a clean grid:

```tsx
<div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2 mt-8">
  {skills.map((s) => (
    <div key={s.name} className="text-slate-300 text-sm py-1.5 border-b border-slate-900 last:border-0">
      {s.name}
    </div>
  ))}
</div>
```

(Drop any tech-icon inline if it adds visual noise. If icons help, keep one mono color: `text-slate-500 size-4 mr-2`.)

- [ ] **Step 3:** Skills section title: keep solid white (already handled in Task 7).

- [ ] **Step 4:** Verify, screenshot `/en/profile` (skills section). Expect: clean tab row with underline indicator, 3-column list of skill names.

- [ ] **Step 5:** Commit.

```bash
git add components/sections/SkillsClient.tsx
git commit -m "feat(skills): underline tabs, drop pill chips"
```

---

### Task 14: Certifications — apply new card styling

**Files:**
- Modify: `components/sections/CertificationsClient.tsx`

- [ ] **Step 1:** Locate the certification cards in the carousel. Update each card's wrapping `div` className to:

```tsx
className="rounded border border-slate-800 hover:border-slate-700 transition-colors p-6 bg-transparent"
```

(Replace any `rounded-2xl bg-white/5 border-white/10` with the above.)

- [ ] **Step 2:** Remove any badge or eyebrow text above the section title. Keep title + subtitle.

- [ ] **Step 3:** Inside each card, ensure the layout is: cert title (white, semibold), issuer (slate-400, sm), date (slate-500, xs), then "View Credential →" text-link (blue-400, no button styling).

- [ ] **Step 4:** Verify, screenshot. Commit.

```bash
git add components/sections/CertificationsClient.tsx
git commit -m "feat(certifications): new border/radius, text-link credentials"
```

---

### Task 15: BeyondCode — shorten copy + restyle

**Files:**
- Modify: `components/sections/BeyondCode.tsx`
- Modify: `lib/i18n/translations/en/profile.json`, `lib/i18n/translations/es/profile.json`

- [ ] **Step 1:** In each `beyondCode.cards.{toronto,legendarios,books,basketball}` block in both EN and ES JSON files, replace the long multi-paragraph `paragraphs` array with a single `body` string of **max 60 words**. Drop `badges` arrays entirely.

  Example EN (Toronto):

  ```json
  "toronto": {
    "title": "Toronto, Canada",
    "body": "Lived in Toronto for a year working in manufacturing. Working across cultures taught me to keep communication direct and ship under real constraints — habits I still bring to every project."
  }
  ```

  Repeat the same compression for the other three cards. Write the Spanish versions in parallel — keep them short and concrete, no motivational phrasing.

- [ ] **Step 2:** Update `lib/i18n/types.ts` (or wherever `ProfileTranslations` is defined) so each card type is:

```ts
{ title: string; body: string }
```

Remove `paragraphs`, `badges`, `intro`, `pillars` fields if they only existed for this section.

- [ ] **Step 3:** In `BeyondCode.tsx`, rewrite the `BeyondCard` component:

```tsx
function BeyondCard({ title, body, icon: Icon }: { title: string; body: string; icon: LucideIcon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded border border-slate-800 hover:border-slate-700 transition-colors p-8"
    >
      <Icon className="size-5 text-slate-400 mb-4" />
      <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
    </motion.div>
  );
}
```

- [ ] **Step 4:** Section header: title `text-white` (no gradient), drop the trailing motivational quote at the bottom of the section if present.

- [ ] **Step 5:** Update the four `<BeyondCard>` usages in the grid to pass `body={translations.cards.toronto.body}` etc. Drop all `gradient`, `className`, `badge` props.

- [ ] **Step 6:** Verify, screenshot `/en/profile` (BeyondCode section). Expect: 4 clean bordered cards, ~3 lines of text each.

- [ ] **Step 7:** Commit.

```bash
git add components/sections/BeyondCode.tsx lib/i18n/translations/ lib/i18n/types.ts
git commit -m "feat(beyond-code): compress copy, flatten cards"
```

---

## Phase 5 — Solutions page

### Task 16: SolutionsHero — single CTA, drop gradient + eyebrow

**Files:**
- Modify: `components/sections/SolutionsHero.tsx`

- [ ] **Step 1:** Delete the "Enterprise-Grade Solutions" badge (line ~27, rounded-full).

- [ ] **Step 2:** Title currently has gradient on "Intelligent Automation" — Task 7 already handled. Confirm it is solid white.

- [ ] **Step 3:** The button row has two CTAs (`Calculate Your ROI`, `View Services`). Keep only `Calculate Your ROI` as a primary `rounded-sm` button. Drop `View Services`.

```tsx
<Button
  onClick={scrollToROI}
  className="rounded-sm bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 text-sm font-medium"
>
  {t.hero.cta.calculateROI}
</Button>
```

- [ ] **Step 4:** Verify, screenshot `/en/solutions`. Commit.

```bash
git add components/sections/SolutionsHero.tsx
git commit -m "feat(solutions): one CTA, drop eyebrow, sharper button"
```

---

### Task 17: Brand — compress to single line

**Files:**
- Modify: `components/sections/Brand.tsx`

- [ ] **Step 1:** Replace the entire card body (logo + badge + multi-line description) with a centered one-liner:

```tsx
<section className="py-12">
  <div className="container mx-auto px-4">
    <p className="text-center text-slate-400 text-sm">
      {t.brand.line}{" "}
      <span className="text-white font-medium">AppCreatorBR</span>.
    </p>
  </div>
</section>
```

- [ ] **Step 2:** Add the i18n string in both locales:

EN: `"brand": { "line": "All services delivered through" }`
ES: `"brand": { "line": "Todos los servicios se prestan a través de" }`

- [ ] **Step 3:** Commit.

```bash
git add components/sections/Brand.tsx lib/i18n/translations/
git commit -m "feat(brand): compress to one line"
```

---

### Task 18: ROI Calculator — visual cleanup

**Files:**
- Modify: `components/sections/ROICalculator.tsx`
- Possibly: `components/sections/ROIForm` and `components/sections/ROIResults.tsx`

- [ ] **Step 1:** Remove the grid-background pattern div if it adds visual noise (only if it overlaps with the section). Otherwise keep but reduce opacity to `5%` max.

- [ ] **Step 2:** Drop any "AI-POWERED ANALYSIS" eyebrow badge.

- [ ] **Step 3:** Section title: solid white (no gradient — should already be the case after Task 7, double-check).

- [ ] **Step 4:** In the form, change all `rounded-md` inputs to `rounded-sm`. Change the MXN/USD toggle to a small segmented control matching the language switcher pattern (Task 10).

- [ ] **Step 5:** Submit button: `rounded-sm bg-blue-600 hover:bg-blue-500 text-white`, drop any glow/shadow utility.

- [ ] **Step 6:** Verify, screenshot. Commit.

```bash
git add components/sections/ROICalculator.tsx components/sections/
git commit -m "feat(roi): drop eyebrow, sharper inputs, segmented currency"
```

---

### Task 19: Services — consolidate to 4, single CTA, no tech badges

**Files:**
- Modify: `components/sections/Services.tsx`
- Modify: `lib/i18n/translations/en/solutions.json`, `lib/i18n/translations/es/solutions.json`

- [ ] **Step 1:** Update the services data array to 4 items by merging "Excel Automation" + "Data Analysis" into one entry "Data & Spreadsheets". Final 4: Web Development · Automation · Data & Spreadsheets · AI & Python.

- [ ] **Step 2:** For each service in both locales, replace the description with **≤ 18 words**. Examples (EN):

  ```json
  "web": { "title": "Web Development", "blurb": "Fast, SEO-ready sites and product UIs in Next.js and TypeScript." },
  "automation": { "title": "Automation", "blurb": "Custom scripts and tools that remove repetitive work from your team." },
  "data": { "title": "Data & Spreadsheets", "blurb": "Excel models, dashboards, and pipelines that turn data into decisions." },
  "ai": { "title": "AI & Python", "blurb": "LLM-powered tools and Python services tailored to your workflow." }
  ```

  Mirror in ES.

- [ ] **Step 3:** Replace the `ServiceCard` component body with:

```tsx
function ServiceCard({ title, blurb, href }: { title: string; blurb: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between rounded border border-slate-800 hover:border-slate-700 transition-colors p-8 min-h-[200px]"
    >
      <div>
        <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{blurb}</p>
      </div>
      <span className="text-blue-400 text-sm mt-6 group-hover:text-blue-300 transition-colors">
        {t.services.cta}
      </span>
    </Link>
  );
}
```

`t.services.cta` should be `"Discuss a project →"` / `"Hablar de un proyecto →"`.

- [ ] **Step 4:** Container grid:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-900">
  {services.map((s) => <ServiceCard key={s.id} {...s} />)}
</div>
```

The `gap-px bg-slate-900` creates clean 1px dividers between cards. Card borders themselves can be set to `border-0` in this case — pick the divider style that looks cleanest; if mixed, prefer per-card `border border-slate-800` with `gap-4`.

- [ ] **Step 5:** **Delete** every per-card tech-stack badge row (the inline 3 tech icons + names).

- [ ] **Step 6:** **Delete** the per-card multi-CTA stack (`Get a Quote / Start Automating / Get Custom Solution`). Only the single text-link remains.

- [ ] **Step 7:** Below the grid, add **one** shared section CTA button leading to `/contact`:

```tsx
<div className="mt-12 flex justify-center">
  <Link
    href={`/${lang}/contact`}
    className="rounded-sm bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 text-sm font-medium"
  >
    {t.services.sectionCta}
  </Link>
</div>
```

EN: `"sectionCta": "Start a conversation"` · ES: `"sectionCta": "Inicia una conversación"`.

- [ ] **Step 8:** Verify, screenshot `/en/solutions` (services section). Expect: 4 clean bordered cards in 2×2, each with title + short blurb + text-link, single button below.

- [ ] **Step 9:** Commit.

```bash
git add components/sections/Services.tsx lib/i18n/translations/
git commit -m "feat(services): 4-card 2x2 grid, drop tech badges and multi-CTA"
```

---

## Phase 6 — Portfolio page

### Task 20: Add portfolio i18n keys

**Files:**
- Create: `lib/i18n/translations/en/portfolio.json`
- Create: `lib/i18n/translations/es/portfolio.json`
- Modify: `lib/i18n/server.ts` (or wherever dictionary loaders live) — register the new namespace
- Modify: `lib/i18n/types.ts` — add `PortfolioTranslations` type

- [ ] **Step 1:** Grep current hardcoded Spanish strings:

```bash
grep -rn "Portafolio\|Sitios públicos\|Sistemas privados\|Operación\|Productos propios\|Hablar de un proyecto\|Explorar por interés\|Explora trabajos públicos" components/sections/PortfolioPageClient.tsx components/sections/PortfolioClient.tsx app/[lang]/portfolio/
```

Make a list of every string found.

- [ ] **Step 2:** Create `lib/i18n/translations/en/portfolio.json`:

```json
{
  "hero": {
    "eyebrow": "Real work for clients and operations",
    "title": "Portfolio: sites, systems, and automations",
    "subtitle": "Explore public sites, private systems, and own products by the kind of problem you want to solve.",
    "ctaPrimary": "View projects",
    "ctaSecondary": "Discuss a project"
  },
  "stats": {
    "publicSites": "Public sites",
    "privateSystems": "Private systems",
    "totalProjects": "Total projects"
  },
  "filters": {
    "heading": "Explore by interest",
    "subheading": "Filter by public sites, complex internal systems, operations, own products, or AI projects.",
    "all": "All",
    "public": "Public sites",
    "private": "Private systems",
    "operations": "Operations",
    "products": "Own products",
    "ai": "AI"
  },
  "card": {
    "visit": "Visit site",
    "live": "Live"
  }
}
```

- [ ] **Step 3:** Create `lib/i18n/translations/es/portfolio.json` mirroring the same keys with the existing Spanish strings.

- [ ] **Step 4:** In `lib/i18n/types.ts`, add:

```ts
export interface PortfolioTranslations {
  hero: { eyebrow: string; title: string; subtitle: string; ctaPrimary: string; ctaSecondary: string };
  stats: { publicSites: string; privateSystems: string; totalProjects: string };
  filters: {
    heading: string; subheading: string;
    all: string; public: string; private: string; operations: string; products: string; ai: string;
  };
  card: { visit: string; live: string };
}
```

- [ ] **Step 5:** Register the namespace in `lib/i18n/server.ts` (or wherever the dictionary helper lives). Look at how `profile`/`solutions` are loaded and add the same pattern for `portfolio`.

- [ ] **Step 6:** Verify build (`npx tsc --noEmit`). Commit.

```bash
git add lib/i18n/
git commit -m "feat(i18n): add portfolio namespace"
```

---

### Task 21: Wire Portfolio page to i18n + restyle hero/stats

**Files:**
- Modify: `app/[lang]/portfolio/page.tsx`
- Modify: `components/sections/PortfolioPageClient.tsx`

- [ ] **Step 1:** In `app/[lang]/portfolio/page.tsx`, load the new dictionary namespace and pass it to `PortfolioPageClient` as `translations`.

- [ ] **Step 2:** In `PortfolioPageClient.tsx`, replace every hardcoded Spanish string with `translations.X` references. Delete all hardcoded strings found in Task 20.

- [ ] **Step 3:** Hero section — apply same flat pattern (no eyebrow badge styling, solid white H1, single button):

```tsx
<section className="py-24">
  <div className="container mx-auto px-4 max-w-5xl">
    <p className="text-slate-400 text-xs uppercase tracking-wider mb-4">{t.hero.eyebrow}</p>
    <h1 className="text-white text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6">
      {t.hero.title}
    </h1>
    <p className="text-slate-300 text-lg max-w-2xl mb-8">{t.hero.subtitle}</p>
    <Link
      href="#projects"
      className="rounded-sm bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 text-sm font-medium"
    >
      {t.hero.ctaPrimary}
    </Link>
  </div>
</section>
```

Drop the second button.

- [ ] **Step 4:** Stats row — replicate the Task 12 stats pattern (`grid grid-cols-3 border-t border-slate-800`, big numbers, slate labels with `border-l` separators). Three stats: publicSites, privateSystems, totalProjects.

- [ ] **Step 5:** **Delete** the two bottom info panels ("Sitios web para clientes" + "Sistemas privados"). The filter UI above them communicates the same.

- [ ] **Step 6:** Verify, screenshot `/en/portfolio` and `/es/portfolio`. Expect: English strings on `/en`, Spanish on `/es`, no leftover hardcoded text.

- [ ] **Step 7:** Commit.

```bash
git add app/[lang]/portfolio/ components/sections/PortfolioPageClient.tsx
git commit -m "feat(portfolio): wire i18n, restyle hero+stats, drop bottom panels"
```

---

### Task 22: Portfolio filter pills — restyle

**Files:**
- Modify: `components/sections/PortfolioPageClient.tsx` (or `PortfolioClient.tsx` — wherever the filter row lives)

- [ ] **Step 1:** Replace existing filter button classes with:

```tsx
<button
  onClick={() => setFilter(opt.id)}
  className={cn(
    "text-sm pb-1.5 transition-colors border-b-2",
    filter === opt.id
      ? "text-white border-blue-500"
      : "text-slate-400 border-transparent hover:text-white"
  )}
>
  {opt.label}
</button>
```

Container:

```tsx
<div className="flex flex-wrap gap-x-6 gap-y-2 mb-12 border-b border-slate-800">
  {options.map((opt) => /* ... */)}
</div>
```

- [ ] **Step 2:** Drop any rounded pill background entirely.

- [ ] **Step 3:** Verify, screenshot. Commit.

```bash
git add components/sections/
git commit -m "feat(portfolio): underline filter pills"
```

---

### Task 23: ProjectCard — image-dominant, drop inline tech tags

**Files:**
- Modify: `components/shared/ProjectCard.tsx`

- [ ] **Step 1:** Replace the card with:

```tsx
<motion.article
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="group rounded border border-slate-800 hover:border-slate-700 transition-colors overflow-hidden flex flex-col"
>
  <div className="relative aspect-[16/10] bg-slate-900">
    {imageUrl ? (
      <Image src={imageUrl} alt={title} fill className="object-cover" />
    ) : (
      <div className="absolute inset-0 bg-slate-900" />
    )}
    {status === "live" && (
      <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider text-emerald-400 bg-slate-950/80 border border-slate-800 rounded-sm px-2 py-0.5">
        {t.card.live}
      </span>
    )}
  </div>
  <div className="p-5">
    <h3 className="text-white font-semibold text-base mb-1">{title}</h3>
    <p className="text-slate-400 text-sm line-clamp-2 mb-4">{description}</p>
    {href ? (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
      >
        {t.card.visit} →
      </a>
    ) : (
      <button
        onClick={openModal}
        className="text-blue-400 hover:text-blue-300 text-sm transition-colors text-left"
      >
        {t.card.details} →
      </button>
    )}
  </div>
</motion.article>
```

- [ ] **Step 2:** Remove the inline tags row (`<Tag>React</Tag><Tag>Tailwind</Tag>…`). Tags only appear in the project modal.

- [ ] **Step 3:** Remove `animate-pulse` on the live badge.

- [ ] **Step 4:** Verify, screenshot `/en/portfolio`. Expect: large image dominating each card, minimal text under it.

- [ ] **Step 5:** Commit.

```bash
git add components/shared/ProjectCard.tsx
git commit -m "feat(portfolio): image-dominant project cards, drop inline tags"
```

---

## Phase 7 — Contact + legal pages

### Task 24: Contact — clean form layout

**Files:**
- Modify: `components/sections/Contact.tsx`

- [ ] **Step 1:** Title: solid white (Task 7 covered).

- [ ] **Step 2:** Remove the `animate-pulse` availability dot at line ~207.

- [ ] **Step 3:** Form container: max-width `~520px`, centered. Replace card background classes with `rounded border border-slate-800 p-8 bg-transparent`.

- [ ] **Step 4:** Inputs: `rounded-sm border border-slate-800 bg-slate-950 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none px-3 py-2 text-sm`.

- [ ] **Step 5:** Submit: `rounded-sm bg-blue-600 hover:bg-blue-500 text-white w-full py-2.5 text-sm font-medium`. No shadow.

- [ ] **Step 6:** Direct contact column / WhatsApp card: same border + radius pattern. Drop any `backdrop-blur` / `bg-white/10`.

- [ ] **Step 7:** Verify, screenshot `/en/contact`. Commit.

```bash
git add components/sections/Contact.tsx
git commit -m "feat(contact): clean form layout, sharper inputs"
```

---

### Task 25: Company info + Privacy — typography pass

**Files:**
- Modify: `app/[lang]/company-info/page.tsx`
- Modify: `app/[lang]/privacy/page.tsx`
- Possibly: `components/sections/LegalPage.tsx` (shared wrapper)

- [ ] **Step 1:** In the shared `LegalPage` component (if it wraps both), update:
  - Section title: `text-white text-4xl md:text-5xl font-semibold tracking-tight` — no gradient.
  - Body container: `max-w-3xl mx-auto` for readable line length.
  - Drop any card wrappers around prose. Text directly on the page.
  - Apply prose classes: `prose prose-invert prose-headings:text-white prose-p:text-slate-300 prose-a:text-blue-400` (install `@tailwindcss/typography` if not already present — check `tailwind.config.ts`).

- [ ] **Step 2:** Verify, screenshot `/en/company-info` and `/en/privacy`. Expect: long-form readable text, no card boxes, no gradient titles.

- [ ] **Step 3:** Commit.

```bash
git add app/[lang]/company-info/ app/[lang]/privacy/ components/sections/LegalPage.tsx
git commit -m "feat(legal): typography pass on company-info and privacy"
```

---

## Phase 8 — Final sweep + verification

### Task 26: Grep sweep for forbidden patterns

- [ ] **Step 1:** Run these greps. Each should return **zero results** in `components/` and `app/`:

```bash
grep -rn "bg-clip-text" components/ app/ | grep -v "page.tsx:73"
grep -rn "animate-spin-slow\|animate-ping\|spin-slow" components/ app/
grep -rn "blur-\[100px\]\|blur-\[80px\]\|blur-3xl\|blur-2xl" components/ app/
grep -rn "border-white/10\|bg-white/10\|bg-white/5" components/ app/
grep -rn "rounded-2xl\|rounded-3xl" components/ app/
grep -rn "whileHover={{ scale\|hover:scale-" components/ app/
```

(Allowlist exception: the home `page.tsx` text-gradient on "Rodríguez" — make sure that's the only `bg-clip-text` left.)

- [ ] **Step 2:** Fix any leftover instances by applying the relevant rule from earlier tasks.

- [ ] **Step 3:** Commit any final cleanups:

```bash
git add components/ app/
git commit -m "chore(design): final cleanup of forbidden patterns"
```

---

### Task 27: Visual QA across all pages

- [ ] **Step 1:** Start dev server if not running:

```bash
npm run dev
```

- [ ] **Step 2:** Visit each route in both locales, screenshot full page:
  - `/en`, `/es`
  - `/en/profile`, `/es/profile`
  - `/en/solutions`, `/es/solutions`
  - `/en/portfolio`, `/es/portfolio`
  - `/en/contact`, `/es/contact`
  - `/en/company-info`, `/en/privacy`

- [ ] **Step 3:** For each screenshot, confirm against the spec success criteria:
  - No text gradients except home "Rodríguez"
  - No glowing orbs, no particles, no rotating ring, no pulsing dots
  - No inline tech-badge rows in cards
  - Single CTA per section
  - Cards have visible 1px slate border, sharp ≤4px radius, generous padding
  - `/en` routes show only English; `/es` routes show only Spanish
  - Every section answers "what is this?" in ≤1 line of scanning

- [ ] **Step 4:** Fix any issues that come up during QA in their original component, then re-screenshot.

- [ ] **Step 5:** Final commit if any fixes:

```bash
git add components/ app/ lib/
git commit -m "chore(qa): final visual fixes from full-site review"
```

---

## Acceptance

When all tasks are complete and Task 27's QA passes, the site should match the success criteria in `docs/superpowers/specs/2026-05-14-design-polish-design.md`. Ready to merge to main or open a PR.
