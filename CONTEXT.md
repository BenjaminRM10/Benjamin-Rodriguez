# 📘 Benjamin Rodríguez - Portfolio Developer Handbook

> **Project Version:** 1.0.0
> **Last Updated:** January 2026
> **Main Tech:** Next.js 16, React 19, Tailwind v4, Supabase

This document serves as the **Single Source of Truth** for the technical architecture, data flows, and development standards of the Benjamin Rodríguez Portfolio. It is designed to allow any AI agent or developer to understand the codebase instantly without needing to traverse the entire file tree.

---

## 1. 🏗️ High-Level Architecture & Tech Stack

This project is a modern, server-first Next.js application deployed on Vercel. It leverages serverless functions for backend logic and Supabase for persistence.

### Core Framework
- **Next.js:** `v16.1.1` (App Router)
  - Uses strictly Server Components where possible.
  - Client Components (`"use client"`) only for interactivity (Hooks, Event Listeners).
- **React:** `v19.2.3`
  - Leveraging new Hooks and experimental features stable in Next.js 16.
- **Language:** TypeScript `v5`
  - Strict mode enabled.
  - No `any` types allowed (use `unknown` or define interfaces).
- **Package Manager:** `npm`

### Styling & Design System
- **Tailwind CSS:** `v4` (PostCSS)
  - **Configuration:** No `tailwind.config.ts`. All config is in `app/globals.css` using the `@theme` directive.
  - **Dark Mode:** Class-based (`.dark`).
- **Component Library:** Shadcn/UI
  - Built on Radix UI primitives.
  - Customized via `components/ui`.
- **Animations:**
  - `framer-motion` `v12` for complex orchestrations.
  - `tw-animate-css` for simple standard animations.
  - CSS Variables for unified timing (see Design System section).
- **Fonts:**
  - `Geist Sans`: Primary variable font.
  - `Geist Mono`: Code/Technical variable font.

### Backend Services
- **Database:** Supabase (PostgreSQL 16)
  - **Extensions:** `pgcrypto` enabled for encryption.
  - **RLS:** Row Level Security enabled on all tables.
- **Authentication:**
  - **Operations:** Supabase Auth (Service Role) used for backend-to-backend tasks.
  - **User:** No public user auth (Admin-only access logic where applicable).
- **Email Service:** Resend API
  - Used for contact form submissions and notifications.
- **AI Integration:** Google Gemini 2.0 Flash
  - Library: `@google/generative-ai`
  - Role: ROI Analysis and logic generation.
- **Search:** Tavily API
  - Library: `@tavily/core`
  - Role: Real-time case study research for ROI calculator.
- **Calendar:** Google Calendar API
  - Library: `googleapis`
  - Role: Availability checking and booking management.

---

## 2. 📂 Detailed Directory Structure

An annotated map of the codebase.

```
/
├── app/                        # Next.js App Router Root
│   ├── [lang]/                 # 🌍 i18n Dynamic Route (en/es)
│   │   ├── layout.tsx          # Root Layout
│   │   │                       # - Inject Fonts (Geist)
│   │   │                       # - Global Providers
│   │   │                       # - Navbar/Footer/ScrollToTop
│   │   ├── page.tsx            # Main Landing Page Composition
│   │   │                       # - Imports sections from @/components/sections
│   │   ├── template.tsx        # 🔄 Page Transition Logic
│   │   │                       # - Framer Motion Fade-In (Opacity 0->1)
│   │   └── globals.css         # 🎨 MASTER STYLESHEET
│   │                           # - Tailwind v4 @theme config
│   │                           # - CSS Variables definition
│   │                           # - Custom utility classes
│   │
│   ├── api/                    # ⚡ Serverless Functions (Route Handlers)
│   │   ├── calendar/           
│   │   │   ├── available-slots/ # GET: Returns array of free times ["10:00 AM", ...]
│   │   │   └── create-event/    # POST: Creates GMeet event & sends invites
│   │   ├── contact/            # POST: Handles form submission via Resend
│   │   └── roi-calculator/     # POST: Orchestrates Gemini + Tavily analysis
│   │
│   ├── favicon.ico             # App Icon
│   └── not-found.tsx           # Custom 404 Page
│
├── components/                 # React Components
│   ├── forms/                  # 📝 Complex Business Logic Forms
│   │   ├── ContactForm.tsx     # - Zod Validation
│   │   │                       # - React Hook Form
│   │   │                       # - Loading States
│   │   └── ROIForm.tsx         # - Analysis state management
│   │                           # - Renders results visualization
│   ├── layout/                 # Global UI Structure
│   │   └── Navbar.tsx          # - Scroll-aware visibility
│   │                           # - Mobile menu trigger
│   ├── modals/                 # Dialogs & Overlays
│   │   └── CalendarBooking.tsx # - Multi-step booking wizard
│   │                           # - Step 1: Date/Time selection
│   │                           # - Step 2: Contact Details
│   │                           # - Step 3: Confirmation
│   ├── sections/               # 🧱 Principal Page Sections
│   │   ├── Hero.tsx            # - Intro & Typewriter effect
│   │   ├── About.tsx           # - Personal story
│   │   ├── Brand.tsx           # - Personal branding statement
│   │   ├── Portfolio.tsx       # - Interactive Project Gallery (Filterable)
│   │   ├── Services.tsx        # - Service offerings
│   │   ├── Skills.tsx          # - Tech stack grid
│   │   ├── Certifications.tsx  # - Credentials display
│   │   ├── ROICalculator.tsx   # - AI feature entry point
│   │   └── Contact.tsx         # - Contact info & form wrapper
│   ├── shared/                 # 🧩 Reusable logic components
│   │   ├── LanguageToggle.tsx  # - URL-based locale switcher
│   │   ├── MobileMenu.tsx      # - Sheet component for mobile nav
│   │   ├── ProjectCard.tsx     # - Card with hover effects and Skeleton
│   │   └── ScrollProgress.tsx  # - Reading position indicator
│   └── ui/                     # 🎨 Shadcn/UI Primitives
│       ├── button.tsx          # - Enhanced with hover scale
│       ├── card.tsx            # - Enhanced with hover lift
│       ├── scroll-to-top.tsx   # - Floating action button
│       ├── skeletons.tsx       # - Loading placeholders
│       └── ... (badge, input, etc.)
│
├── lib/                        # 🛠️ Utilities & Core Logic
│   ├── ai/                     # AI Service Wrappers
│   │   ├── gemini.ts           # - Gemini Client instantiation
│   │   └── tavily.ts           # - Search Client instantiation
│   ├── config/                 # Configuration
│   │   └── env.ts              # - Enforces env var presence
│   ├── google/                 # Google Integrations
│   │   └── calendar.ts         # - Singleton Auth Client
│   │                           # - Handles Token Refresh logic
│   ├── i18n/                   # Internationalization
│   │   └── config.ts           # - Locales definitions
│   └── utils.ts                # - cn() helper for Tailwind merging
│
├── supabase/                   # 💾 Database Assets
│   └── init_config.sql         # - DDL for app_config table
│
├── public/                     # Static Assets
│   └── images/                 # - Optimized images
│
├── .env.local                  # Environment Secrets (Git Ignored)
├── next.config.ts              # Next.js Configuration
└── package.json                # Dependencies manifest
```

---

## 3. 🔄 Key Feature Architecture & Data Flows

### A. AI ROI Calculator Logic
**Objective:** Provide potential clients with concrete estimated savings.
**Endpoint:** `POST /api/roi-calculator`

1.  **Frontend:**
    *   `ROIForm.tsx` collects: Task description, Hours/Week, Cost/Hour, People count.
    *   Validates via Zod schema.
2.  **Server (`route.ts`):**
    *   **Research Phase:** Calls `Tavily` to find real-world case studies for automating the specific task.
    *   **Analysis Phase:** Injects User Input + Research Results into a structured prompt for `Gemini 2.0 Flash`.
    *   **Calculation:** AI performs the math (Annual Savings = Hours * Cost * 52 * People).
    *   **Feasibility:** AI determines High/Medium/Low success probability.
3.  **Persistence:**
    *   Saves the full record to Supabase table `roi_calculations` for lead tracking.
4.  **Response:**
    *   Returns JSON payload to frontend to render the Results Card.

### B. Google Calendar Booking System
**Objective:** Allow leads to book Discovery Calls directly.
**Auth Strategy:** Service Account Server-to-Server.

**1. Availability Check (`GET /api/available-slots`):**
*   **Input:** `date` (ISO String).
*   **Logic:**
    *   Initialize `google.calendar` client using stored Refresh Token (from Supabase `app_config`).
    *   Call `freebusy.query` for the Admin's calendar.
    *   Generate all 30-min slots between 9 AM - 6 PM (Mexico City Time).
    *   Filter out any "Busy" periods returned by Google.
    *   Filter out past times (if booking for today).
*   **Output:** List of strings `["09:00 AM", "09:30 AM", ...]`.

**2. Booking Execution (`POST /api/create-event`):**
*   **Input:** Name, Email, Date, Time Slot.
*   **Logic:**
    *   Create event object: `summary: "Discovery Call: [Name]"`
    *   `conferenceData`: Request `hangoutsMeet` (Google Meet link).
    *   `attendees`: Admin Email + User Email.
    *   Call `events.insert` with `sendUpdates: 'all'`.
*   **Result:** Both parties receive a calendar invite with the Meet link.

### C. Contact Form System
**Objective:** General inquiries.
**Endpoint:** `POST /api/contact`

1.  **Input:** Name, Email, Company, Service, Message.
2.  **API Logic:**
    *   Save message to Supabase `contact_messages` (Audit trail).
    *   **Resend API Call 1:** Send notification email to Admin (`contacto@appcreatorbr.com`).
    *   **Resend API Call 2:** Send "We received your message" confirmation to User.
3.  **Frontend Feedback:**
    *   Show "Sending..." spinner.
    *   On success, replace form with "Message Sent!" success state.

---

## 4. 🎨 Design System & Visual Polish

The design system is implemented via Tailwind v4 variables in `app/globals.css`.

### Color Palette
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `bg-background` | `#0a0e27` | Main deep navy background |
| `card` | `#151b3d` | Secondary/Card background |
| `primary` | `#3b82f6` | Action buttons, key highlights (Blue) |
| `secondary` | `#8b5cf6` | Accents, gradients (Purple) |
| `accent` | `#06b6d4` | Highlights, charts (Cyan) |
| `text-foreground` | `#f8fafc` | Primary Text |
| `text-muted` | `#94a3b8` | Description/Subtext |

### Animation System
We enforce consistent animation timings across the app.

**CSS Variables:**
```css
:root {
  --transition-fast: 200ms;
  --transition-normal: 300ms;
  --transition-slow: 600ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
}
```

**Standard Behaviors:**
1.  **Buttons:** `hover:scale-[1.02]` + `active:scale-[0.98]`.
2.  **Cards:** `hover:-translate-y-1` + `hover:shadow-md`.
3.  **Page Load:** `opacity: 0` -> `1` (via `template.tsx`).
4.  **Loading:** Use `Skeleton` components. **Never** raw layout shifts.

---

## 5. 💾 Database Schema (Supabase)

### Table: `app_config`
Stores sensitive configuration encrypted.
```sql
CREATE TABLE app_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL -- Encrypted via PGP_SYM_ENCRYPT
);
```
*Used for:* Google Refresh Tokens, Client Secrets (avoiding exposure in env vars).

### Table: `roi_calculations`
Analytics for the AI calculator.
```sql
CREATE TABLE roi_calculations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_description TEXT NOT NULL,
  hours_per_week NUMERIC,
  hourly_cost NUMERIC,
  people_count INTEGER,
  annual_roi NUMERIC,     -- Calculated by AI
  ai_response JSONB,      -- Full analysis object
  search_results JSONB,   -- Tavily sources
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: `contact_messages`
Backup for contact form.
```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 6. ⚙️ Environment Configuration

These variables are required in `.env.local` for the application to function locally and in production (Vercel).

### Core Services
```bash
# Supabase - Data Persistence
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[public-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[secret-service-role] # ONLY for Server-Side Ops

# Encryption - For decoding app_config
SUPABASE_ENCRYPTION_KEY=[32-char-random-string]
```

### AI & Research Providers
```bash
# Google AI Studio (Gemini)
GEMINI_API_KEY=[AIza...]

# Tavily (Search)
TAVILY_API_KEY=[tvly-...]
```

### Communication
```bash
# Resend (Email)
RESEND_API_KEY=[re_...]

# Google Calendar (OAuth Credentials)
# Note: These acts as initialization values, but actual tokens 
# should be stored in DB app_config for rotation support.
GOOGLE_CLIENT_ID=[...apps.googleusercontent.com]
GOOGLE_CLIENT_SECRET=[GOCSPX-...]
GOOGLE_REFRESH_TOKEN=[1//...]
```

### Public Config
```bash
# Canonical URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000 # or https://production.com
```

---

## 7. 📜 Development Standards (Agent Instructions)

If you are an AI Agent modifying this codebase, strictly adhere to these rules:

1.  **Server Actions vs APIs:** We currently use **API Routes** (`app/api/...`) for clearer separation of concerns with external services. Do not mix Route Handlers with Server Actions unless necessary for specific form mutations.
2.  **Type Safety:** Always define interface props for Components. schema validation (Zod) is mandatory for API inputs.
3.  **Styling:**
    *   Use **Tailwind Utility Classes** primarily.
    *   Use `globals.css` variables for colors/animations.
    *   Do NOT use inline `style={{...}}` unless dynamic values require it.
4.  **Icons:** Use `lucide-react`. Import individual icons to leverage tree-shaking.
5.  **Files:**
    *   Filenames: `PascalCase.tsx` for components. `kebab-case.ts` for utilities.
    *   Exports: Named exports preferred (`export function Foo`).
6.  **Commits:** Update `task.md` before starting work. Update `CONTEXT.md` if architectural changes occur.

---

## 8. 🗺️ Detailed Roadmap & Status Log

### ✅ Phase 1: Environment Setup
- **Supabase:** Project created, Auth enabled, PGCrypto installed.
- **Next.js:** Initialized v16 App Router with TypeScript.
- **Structure:** Folders created for `components`, `lib`, `app/api`.
- **i18n:** Configured basic `[lang]` routing.

### ✅ Phase 2: Core Layout & Navigation
- **Navbar:** Sticky glassmorphism header implemented.
- **Language Toggle:** URL-based switching (/en <-> /es).
- **Mobile Menu:** Sheet component with smooth transitions.
- **Footer:** 4-column layout with social links.
- **Scroll Progress:** Top reading bar indicator.

### ✅ Phase 3: Hero Section
- **Typewriter Effect:** Rotating roles (OPEX Engineer, Dev, etc.).
- **Visuals:** Profile image with rotating gradient border.
- **Background:** `tsparticles` implementation with network graph effect.
- **CTAs:** Dual buttons with hover effects.

### ✅ Phase 4: About Section
- **Structure:** 2-column layout (Bio + Stats).
- **Micro-interactions:** Counter animation for numbers (0 -> 100).
- **Cards:** Glassmorphism style for key metrics.

### ✅ Phase 5: ROI Calculator (Frontend)
- **Form:** `ROIForm.tsx` with Zod validation.
- **Inputs:** Task desc, Hours, Cost, People count.
- **UI:** Loading state with custom spinner.

### ✅ Phase 6: ROI Calculator (AI & Backend)
- **API:** `POST /api/roi-calculator` created.
- **Models:** Gemini 2.0 Flash (Logic) + Tavily (Research).
- **DB:** `roi_calculations` table storing full JSON analysis.
- **Charts:** `chart.js` visualization of Before/After costs.

### ✅ Phase 7: Services Section
- **Bento Grid:** Layout implemented for 5 core services.
- **Course Integration:** Special "Course" card variant for Python/AI.
- **Details:** Modals/Expandables for curriculum details.

### ✅ Phase 8: Portfolio Gallery
- **Filtering:** State-based filter (Web, AI, Automation).
- **Cards:** `ProjectCard.tsx` with hover zoom.
- **Modals:** Detail view for "Excel Land Sales" project.
- **Downloads:** Template download logic implemented.

### ✅ Phase 9: Skills & Certifications
- **Skills:** Tabbed interface (Core, Dev, AI, Data).
- **Certifications:** Infinite carousel for 18+ certs.
- **Verification:** Modal with search/filter for all credentials.

### ✅ Phase 9.5: Beyond the Code
- **Personal Touch:** "Bento" grid showing Hobbies/Values (Books, Sports).
- **Design:** Unique gradient fills per card.

### ✅ Phase 10: Integrations (Contact & Calendar)
- **Contact Form:** Connected to Resend API & Supabase.
- **WhatsApp:** Direct "Click-to-Chat" link.
- **Calendar:** Full Google Calendar CRUD flow (Check slots -> Book -> Invite).
- **Notifications:** Admin & User email confirmations.

### ✅ Phase 11: Polish & Animations
- **Audit:** Standardized valid times (200ms/300ms/600ms).
- **Skeletons:** Loading states for Images and Cards.
- **Transitions:** `template.tsx` for route changes.
- **Mobile:** Touch targets enlarged (>44px).
- **Scroll:** "Back to Top" button implemented.

### 🚧 Phase 12: Testing & Deployment (CURRENT)
- [ ] **SEO:** Add `generateMetadata` to all pages.
- [ ] **Performance:** Run Lighthouse audits (aiming for 100/100).
- [ ] **E2E Testing:** Verify critical flows (Booking, ROI).
- [ ] **Production:** Final build check (`npm run build`).
- [ ] **Deploy:** Push to main branch for Vercel.

---

**End of Handbook**
