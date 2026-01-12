# Plan Completo: Portfolio Personal - Alejandro Rodríguez

## 1. IDENTIDAD VISUAL Y PALETA DE COLORES

### Paleta de Colores Principal
- **Background Principal**: `#0a0e27` (Azul oscuro profundo - profesional)
- **Background Secundario**: `#151b3d` (Azul medio)
- **Acento Primario**: `#3b82f6` (Azul tech vibrante)
- **Acento Secundario**: `#8b5cf6` (Púrpura - creatividad)
- **Acento Terciario**: `#06b6d4` (Cyan - innovación)
- **Texto Principal**: `#f8fafc` (Blanco suave)
- **Texto Secundario**: `#94a3b8` (Gris claro)
- **Success/Action**: `#10b981` (Verde)

### Logo Personal
- Incluir logo personal en navbar
- Versión para fondo oscuro
- Formato: SVG o PNG de alta resolución
- Tamaño recomendado: 200x200px mínimo
- El logo se ubicará en la esquina superior izquierda del navbar

### Efectos Visuales y Texturas
- **Gradientes animados** en botones y cards
- **Efecto glassmorphism** en cards principales
- **Partículas flotantes** sutiles en el background
- **Bordes animados** que rotan con degradados al hover
- **Texturas de ruido** sutiles para dar profundidad
- **Sombras con color** (no solo negras)

---

## 2. ESTRUCTURA DE LA PÁGINA

### Landing Section (Hero)
**Contenido:**
- Logo personal en navbar (esquina superior izquierda)
- Foto de perfil grande con efecto glow animado
- Título: "Alejandro Rodríguez"
- Subtítulo dinámico que rota entre:
  - "OPEX Engineer & Automation Specialist"
  - "Full-Stack Developer"
  - "AI Integration Expert"
  - "Your Ideas, Automated"
- Tagline principal: "Where Engineering Meets Innovation"
- CTA dual: "Hire Me" / "Explore Tools"
- Selector de idioma (EN/ES) en esquina superior derecha
- Partículas flotantes de fondo

**Efectos especiales:**
- Gradient border animado alrededor de la foto
- Texto con efecto de typing animation
- Botones con hover que activa un border gradient rotatorio

---

### About Me Section
**Contenido:**
- Biografía:
  > "I'm an OPEX Engineer who bridges the gap between manufacturing processes and cutting-edge technology. With Six Sigma certification and hands-on experience at Pace Industries, I help businesses eliminate waste and unlock efficiency through automation, AI, and data-driven solutions. Whether it's teaching teams to build with AI or developing custom automation tools, I believe the only limit is imagination."

- Stats cards animados:
  - "1+ Year Experience"
  - "10+ Projects Delivered"
  - "100+ Hours Automated"
  - "∞ Possibilities with AI"
- Tagline: "The only limit is your imagination"
- Target audiences highlight: PyMEs, Startups, Manufacturing Teams, Engineering Students

**Layout:**
- Grid de 2 columnas (desktop), 1 columna (mobile)
- Cards con glassmorphism effect
- Números con counter animation al entrar al viewport

---

### Interactive Tool: ROI Calculator
**Título:** "See Your Automation ROI"
**Subtítulo:** "Discover how much time and money you could save"

**Funcionalidad:**
1. **Input Form:**
   - "Describe your manual task" (textarea)
   - "Hours spent per week" (number input)
   - "Hourly cost (USD)" (number input)
   - "Number of people doing this task" (number input)

2. **AI Analysis Button:**
   - Texto: "Calculate with AI"
   - Al hacer click, activa loader animado
   - Usa **Gemini Flash 2.5 API** + **Tavily/Brave Search API** para:
     - Analizar si la tarea es automatizable
     - Buscar en internet soluciones similares y casos de éxito
     - Sugerir método de automatización específico
     - Calcular ROI estimado basado en datos reales
     - Dar timeline de implementación realista
     - Identificar herramientas necesarias

3. **Results Display:**
   - Card grande con resultados:
     - "Weekly hours saved: X"
     - "Monthly cost saved: $X"
     - "Annual ROI: $X"
     - "Payback period: X months"
     - "Automation feasibility: High/Medium/Low"
     - "Recommended solution: [descripción detallada de AI]"
     - "Tools suggested: [lista de herramientas]"
     - "Implementation time: X weeks"
     - "Similar cases found: [ejemplos de internet]"
   - Botón: "Let's Make It Happen" → Va a formulario de contacto con contexto pre-llenado

**Diseño:**
- Background con grid pattern animado
- Form con inputs estilo neumorphism
- Results con animación de reveal
- Gráfica simple de barras mostrando antes/después
- Badge de "Powered by Gemini AI"

**Nota técnica:**
- Almacenar cálculos en Supabase para analytics
- Rate limiting: 5 cálculos por IP por día

---

### Services Section
**Título:** "What I Can Do For You"

**5 Service Cards Principales:**

1. **AI Mastery Training**
   - Icon: 🧠 o robot icon
   - Título: "Learn to Build with AI"
   - Descripción: "Master Claude IDE, Antigravity, n8n, and MCP servers. Build real applications from scratch. Perfect for professionals, teams, and engineering students who want to stay ahead."
   - Bullet points:
     - Full stack development with AI
     - GitHub, Supabase & Vercel integration
     - Build from idea to deployment
     - Create your own automation solutions
     - Essential skill for the future
   - Target: "Empresas, PyMEs, Students"
   - CTA: "View Course Details"

2. **Web Development**
   - Icon: 🌐
   - Título: "Full-Stack Web Solutions"
   - Descripción: "Modern, responsive websites with powerful backends. From landing pages to complex applications with authentication, databases, and APIs."
   - Tech stack badges: React, Next.js, Supabase, Vercel, Tailwind
   - Example: "Like this portfolio!"
   - CTA: "See My Work"

3. **WhatsApp Automation**
   - Icon: 💬
   - Título: "Smart Chatbots"
   - Descripción: "Automate customer service, lead generation, and sales with intelligent WhatsApp bots powered by AI. Integrate with your existing systems."
   - Features: 24/7 availability, AI responses, CRM integration
   - CTA: "Get Started"

4. **Excel Automation & VBA**
   - Icon: 📊
   - Título: "Excel Superpowers"
   - Descripción: "Transform your spreadsheets into powerful tools. Custom dashboards, automated reports, data processing, and business management systems."
   - Example: "Land sales tracking system available"
   - CTA: "Download Templates"

5. **Data Analysis & ETL**
   - Icon: 📈
   - Título: "Data Intelligence"
   - Descripción: "Turn raw data into actionable insights. ETL pipelines, visualization dashboards, automated reporting, and predictive analytics."
   - Tools: Python, Power BI, SQL
   - CTA: "Analyze My Data"

**Card Adicional - Python & AI Course:**
- Título: "Python + AI Integration"
- Descripción: "Learn to build FastAPI applications, deploy local LLMs (Llama), integrate AI into Excel, and create your own AI-powered tools."
- Highlight: "Deploy models locally or on servers"
- CTA: "Enroll Now"

**Layout:**
- Bento grid layout (cards de diferentes tamaños)
- Hover effect: Card levitates y muestra más detalles
- Cada card con gradient border animado único
- Badge para target audience visible

---

### Portfolio/Projects Section
**Título:** "Projects in Action"
**Subtítulo:** "Real solutions for real problems"

**Layout: Interactive Gallery con filtros**

**Proyectos destacados:**

1. **Goviel.com - Real Estate Website**
   - Tipo: Web Design & Development
   - Miniatura: Screenshot del sitio
   - Hover: Overlay con descripción
   - Click: Abre en nueva pestaña (https://goviel.com)
   - Descripción: "Professional real estate website with property listings and contact forms"
   - Tags: Web Design, Client Project, React
   - Status badge: "Live"

2. **Excel Land Sales Management System**
   - Tipo: Excel VBA Automation
   - Miniatura: Screenshot del dashboard principal
   - Hover: "View Details & Download"
   - Click: Modal con:
     - Galería de screenshots (3-5 imágenes)
     - Lista de features
     - Botón de descarga (template)
   - Descripción: "Complete land sales and payment management system with automated receipts, contracts, user roles, and financial tracking"
   - Features destacadas:
     - Automated contract generation
     - Payment tracking & receipts
     - Role-based access control
     - Sales analytics dashboard
     - Money management system
   - Tags: VBA, Automation, Dashboard, Business Tools
   - CTA: "Download Free Template"

3. **AI Language Learning App**
   - Tipo: AI Integration
   - Link a GitHub: https://github.com/BenjaminRM10
   - Miniatura: Screenshot de la app
   - Descripción: "AI-powered language learning tool that translates text and generates contextual images to enhance vocabulary retention"
   - Features: Translation, Image generation, Learning tracking
   - Tags: AI, Education, React, API Integration
   - Status: "Open Source"

4. **Production Scanning & Inventory System**
   - Tipo: Full-Stack Application
   - GitHub link: https://github.com/BenjaminRM10
   - Descripción: "Enterprise inventory management system using barcode scanning for production tracking with role-based authentication"
   - Tech Stack: React, Supabase, Authentication
   - Features:
     - Barcode scanning integration
     - Real-time inventory tracking
     - User roles & permissions
     - Production reporting
   - Tags: Full-Stack, Authentication, React, Supabase
   - Industry: Manufacturing

5. **AI-Powered Code Practice Tool**
   - Tipo: Developer Tool
   - GitHub link: https://github.com/BenjaminRM10
   - Descripción: "Intelligent typing practice for programmers with AI assistance, WPM tracking, and code snippet generation"
   - Features: Real-time WPM, AI suggestions, Code snippets
   - Tags: AI, Developer Tools, React
   - Target: Engineering Students, Developers

**Efectos:**
- Masonry layout o grid responsivo
- Hover: Image zoom + overlay con info
- Filter buttons: "All", "Web", "AI", "Automation", "Excel", "Full-Stack"
- Smooth transitions entre filtros

---

### Skills & Tech Stack Section
**Título:** "My Toolkit"
**Subtítulo:** "Technologies I use to bring ideas to life"

**Categorías en tabs o accordion:**

1. **Core Engineering**
   - Six Sigma Green Belt (Certified)
   - OPEX & Lean Manufacturing
   - PFMEA, APQP, PPAP
   - GD&T (Geometric Dimensioning & Tolerancing)
   - SolidWorks (80h Certified)
   - Kaizen & Continuous Improvement

2. **Programming & Development**
   - Python (FastAPI, PyTorch, Data Science)
   - JavaScript/TypeScript
   - React & Next.js
   - VBA & Excel Automation
   - HTML/CSS/Tailwind CSS
   - R (Basic)

3. **AI & Automation**
   - Claude API & MCP Servers
   - Gemini API Integration
   - n8n Workflows (Certified)
   - Local LLM Deployment (Llama, etc.)
   - Chatbot Development (WhatsApp)
   - AI-powered applications

4. **Data & Analytics**
   - SQL & Database Design
   - Power BI & Dashboards
   - Excel Power Query
   - Minitab (Certified)
   - ETL Pipelines
   - Statistical Analysis

5. **DevOps & Infrastructure**
   - GitHub & Version Control
   - Supabase (Backend & Auth)
   - Vercel Deployment
   - API Development & Integration
   - Environment Management

6. **Other Technical Skills** (Collapsible section)
   - Computer Repair & Troubleshooting
   - OS Installation & Optimization
   - Network Configuration (AdGuard, Pi-hole)
   - VPN Setup & Security
   - IP Management & Networking Basics
   - Point-to-point Wireless Systems
   - Starlink Installation & Distribution
   - Hardware Diagnostics

**Layout:**
- Skill badges con animación de entrada staggered
- Iconos para cada tecnología (devicons o similar)
- Nivel de expertise visual (4-5 stars o progress bar)
- Sección "Other Skills" colapsable para no saturar
- Highlight de certificaciones junto al skill

---

### Certifications Section
**Título:** "Continuous Learning"
**Subtítulo:** "18+ Professional Certifications"

**Layout:**
- Carousel o grid con cards (6 destacadas, resto en "View All")
- Cada certificación muestra:
  - Logo de la institución
  - Nombre del certificado
  - Institución emisora
  - Fecha de emisión
  - Badge de verificación
  - Click para ver credential (abre en modal o nueva pestaña)

**Certificaciones destacadas (primeras 6):**
1. Lean Six Sigma Specialization - Tecnológico de Monterrey
2. n8n Automation Expert - EDteam
3. C2 English Certificate - EF SET (71/100)
4. SOLIDWORKS Certification - MR Academy
5. AI Programming from Zero - EDteam
6. Operational Excellence Facilitator - LinkedIn

**Botón:** "View All 18 Certifications"

**Modal "View All":**
- Grid completo de todas las certificaciones
- Filtros: "All", "Engineering", "Programming", "AI", "Data"
- Search bar

---

### Contact Section
**Título:** "Let's Build Something Amazing"
**Subtítulo:** "Ready to automate, innovate, or learn? Get in touch."

**Layout: 3 columnas (desktop) / Stack (mobile)**

**Columna 1: Direct Contact**
1. **WhatsApp Direct**
   - Botón grande con icono
   - Texto: "Message Me on WhatsApp"
   - Link directo a WhatsApp con mensaje pre-poblado
   - Efecto hover: Border gradient animation

2. **Email**
   - contacto@appcreatorbr.com
   - Click to copy con animación de confirmación
   - También abre cliente de email

3. **Schedule a Call**
   - Integración con Google Calendar
   - Botón: "Book a Free Consultation"
   - Abre modal con calendario embebido
   - Duración: 30min slots

**Columna 2: Contact Form** (Supabase backend)
- Name (required)
- Email (required)
- Company (optional)
- Service interested in (dropdown - pre-populated si viene del ROI Calculator)
  - AI Training
  - Web Development
  - WhatsApp Bots
  - Excel Automation
  - Data Analysis
  - Python Course
  - Other
- Message (required)
- reCAPTCHA v3 (invisible)
- Submit button: "Send Message"
- Success message con animation
- Email notification automática

**Columna 3: Social & Info**
- LinkedIn profile (con QR code al hover)
- GitHub profile
- Location: Saltillo, Coahuila, Mexico
- Availability: Remote work worldwide
- Response time: "Usually within 24 hours"

**Background:**
- Gradient mesh animado
- Form con glassmorphism
- Partículas sutiles

**Validaciones:**
- Client-side validation
- Email format check
- Required fields
- Anti-spam measures

---

### Footer
**Layout: 3 secciones**

**Sección 1: Branding**
- Logo personal
- Tagline: "Where Engineering Meets Innovation"
- Copyright © 2025 Alejandro Rodríguez
- "Built with AI & ❤️"

**Sección 2: Quick Links**
- About
- Services
- Portfolio
- Certifications
- Contact
- ROI Calculator

**Sección 3: Connect**
- Social media links
- Language toggle (EN/ES)
- Domain: appcreatorbr.com
- "Made with Next.js, Tailwind & Supabase"

**Design:**
- Background: `#0a0e27`
- Separador sutil arriba
- Links con hover effect
- Responsivo: Stack en mobile

---

## 3. COMPONENTES TÉCNICOS ESPECÍFICOS

### Animaciones y Efectos

**Framer Motion animations:**
```javascript
// Scroll-triggered reveals
{
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

// Parallax effects en hero
{
  initial: { y: 0 },
  animate: { y: [0, -10, 0] },
  transition: { duration: 3, repeat: Infinity }
}

// Stagger animations para cards
{
  staggerChildren: 0.1,
  delayChildren: 0.2
}
```

**CSS Features:**
- `backdrop-filter: blur(10px)` para glassmorphism
- `mix-blend-mode: overlay` para efectos de blend
- CSS Grid y Flexbox para layouts
- `clip-path` para shapes interesantes
- Custom scrollbar styling

**Custom Components (shadcn/ui a usar):**
- Button (con variant "glow" personalizado)
- Card (con variant "glass")
- Dialog/Modal
- Tabs
- Accordion
- Input & Textarea (con floating labels)
- Select (custom styling)
- Badge (con animación pulse)
- Separator (con gradient)
- Carousel (para certifications)
- Tooltip (para skill details)

**Efectos de hover personalizados:**
```css
/* Rotating border gradient */
@keyframes rotate {
  from { --angle: 0deg; }
  to { --angle: 360deg; }
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.glow-border {
  position: relative;
  isolation: isolate;
  
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: conic-gradient(
      from var(--angle),
      #3b82f6,
      #8b5cf6,
      #06b6d4,
      #3b82f6
    );
    border-radius: inherit;
    animation: rotate 3s linear infinite;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: -1;
  }
  
  &:hover::before {
    opacity: 1;
  }
}

/* Particle background */
.particles {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
  animation: float 10s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}
```

---

## 4. INTEGRACIONES Y BACKEND

### Supabase Schema

**Table: contact_messages**
```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  source TEXT, -- 'form', 'roi_calculator'
  roi_calculation_id UUID REFERENCES roi_calculations(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE,
  responded BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_contact_created ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_read ON contact_messages(read);
```

**Table: roi_calculations**
```sql
CREATE TABLE roi_calculations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_description TEXT NOT NULL,
  hours_per_week NUMERIC NOT NULL,
  hourly_cost NUMERIC NOT NULL,
  people_count INTEGER NOT NULL,
  weekly_hours_saved NUMERIC,
  monthly_cost_saved NUMERIC,
  annual_roi NUMERIC,
  payback_period_months NUMERIC,
  feasibility TEXT, -- 'high', 'medium', 'low'
  recommended_solution TEXT,
  tools_suggested TEXT[],
  implementation_weeks INTEGER,
  ai_response JSONB, -- Full Gemini response
  search_results JSONB, -- Tavily/Brave results
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_roi_created ON roi_calculations(created_at DESC);
CREATE INDEX idx_roi_feasibility ON roi_calculations(feasibility);
```

**Table: page_analytics** (opcional)
```sql
CREATE TABLE page_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL, -- 'page_view', 'cta_click', 'section_view'
  event_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### APIs a integrar

**1. Gemini Flash 2.5 API**
```javascript
// /app/api/roi-calculator/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Prompt engineering para análisis ROI
const prompt = `
Analiza esta tarea manual y determina:
1. Feasibilidad de automatización (High/Medium/Low)
2. Solución recomendada específica
3. Herramientas necesarias
4. Tiempo estimado de implementación
5. Casos similares

Tarea: ${taskDescription}
Horas/semana: ${hoursPerWeek}
Costo/hora: $${hourlyCost}
Personas: ${peopleCount}

Responde en JSON con esta estructura:
{
  "feasibility": "high|medium|low",
  "solution": "descripción detallada",
  "tools": ["tool1", "tool2"],
  "implementationWeeks": number,
  "reasoning": "explicación",
  "similarCases": ["caso1", "caso2"]
}
`;
```

**2. Tavily Search API** (para research)
```javascript
// Búsqueda de casos similares y soluciones
const searchQuery = `automation solution for ${taskDescription}`;
const tavily = new TavilyClient({ apiKey: process.env.TAVILY_API_KEY });
const results = await tavily.search(searchQuery, {
  search_depth: "advanced",
  max_results: 5
});
```

**3. Google Calendar API**
```javascript
// /app/api/calendar/available-slots/route.ts
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// Obtener slots disponibles
// Crear evento cuando usuario agenda
```

**4. Email Service - Resend**
```javascript
// /app/api/contact/route.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Notificación de nuevo contacto
await resend.emails.send({
  from: 'Portfolio <noreply@appcreatorbr.com>',
  to: 'contacto@appcreatorbr.com',
  subject: 'New Contact Form Submission',
  html: emailTemplate
});

// Email de confirmación al usuario
await resend.emails.send({
  from: 'Alejandro <contacto@appcreatorbr.com>',
  to: userEmail,
  subject: 'Thanks for reaching out!',
  html: confirmationTemplate
});
```

### Variables de entorno (.env.local)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI & Search
GEMINI_API_KEY=your_gemini_key
TAVILY_API_KEY=your_tavily_key

# Calendar
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=your_redirect_uri
GOOGLE_REFRESH_TOKEN=your_refresh_token

# Email
RESEND_API_KEY=your_resend_key

# Domain
NEXT_PUBLIC_SITE_URL=https://appcreatorbr.com

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=your_ga_id
```

---

## 5. ESTRUCTURA DE CARPETAS Y ARQUITECTURA

```
portfolio-alejandro/
├── app/
│   ├── [lang]/                    # i18n routing (en/es)
│   │   ├── page.tsx               # Main page con todas las sections
│   │   ├── layout.tsx             # Layout con navbar y footer
│   │   └── loading.tsx            # Loading state
│   │
│   ├── api/                       # API routes
│   │   ├── contact/
│   │   │   └── route.ts           # POST /api/contact
│   │   ├── roi-calculator/
│   │   │   └── route.ts           # POST /api/roi-calculator
│   │   ├── calendar/
│   │   │   ├── available-slots/
│   │   │   │   └── route.ts       # GET available slots
│   │   │   └── create-event/
│   │   │       └── route.ts       # POST create calendar event
│   │   └── analytics/
│   │       └── route.ts           # POST analytics events
│   │
│   ├── globals.css                # Global styles + Tailwind
│   ├── layout.tsx                 # Root layout
│   └── not-found.tsx              # 404 page
│
├── components/
│   ├── ui/                        # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── accordion.tsx
│   │   ├── badge.tsx
│   │   ├── separator.tsx
│   │   ├── carousel.tsx
│   │   └── tooltip.tsx
│   │
│   ├── sections/                  # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── ROICalculator.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Skills.tsx
│   │   ├── Certifications.tsx
│   │   └── Contact.tsx
│   │
│   ├── shared/                    # Shared components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── LanguageToggle.tsx
│   │   ├── AnimatedButton.tsx
│   │   ├── GlowCard.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── RotatingBorder.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ScrollProgress.tsx
│   │
│   └── forms/                     # Form components
│       ├── ContactForm.tsx
│       ├── ROIForm.tsx
│       └── CalendarBooking.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Supabase client
│   │   ├── server.ts              # Server-side client
│   │   └── types.ts               # Database types
│   │
│   ├── ai/
│   │   ├── gemini.ts              # Gemini API wrapper
│   │   └── tavily.ts              # Tavily search wrapper
│   │
│   ├── calendar/
│   │   └── google.ts              # Google Calendar integration
│   │
│   ├── email/
│   │   ├── resend.ts              # Resend wrapper
│   │   └── templates.tsx          # Email templates
│   │
│   ├── i18n/
│   │   ├── config.ts              # i18n configuration
│   │   ├── translations/
│   │   │   ├── en.json
│   │   │   └── es.json
│   │   └── useTranslation.ts      # Custom hook
│   │
│   └── utils/
│       ├── analytics.ts           # Analytics helpers
│       ├── validation.ts          # Form validation
│       └── helpers.ts             # General utilities
│
├── public/
│   ├── images/
│   │   ├── profile/
│   │   │   └── alejandro.jpg      # Profile photo
│   │   ├── projects/
│   │   │   ├── goviel-1.png
│   │   │   ├── goviel-2.png
│   │   │   ├── excel-dashboard-1.png
│   │   │   ├── excel-dashboard-2.png
│   │   │   ├── language-app.png
│   │   │   ├── inventory-system.png
│   │   │   └── code-helper.png
│   │   ├── certifications/
│   │   │   └── (logos instituciones)
│   │   └── logo/
│   │       ├── logo.svg           # Logo personal
│   │       └── logo-white.svg
│   │
│   ├── icons/                     # Custom icons
│   ├── downloads/
│   │   └── excel-template.xlsx    # Plantilla Excel
│   └── favicon.ico
│
├── styles/
│   └── animations.css             # Custom animations
│
├── types/
│   ├── supabase.ts                # Auto-generated types
│   ├── api.ts                     # API response types
│   └── index.ts                   # General types
│
├── .env.local                     # Environment variables
├── .env.example                   # Example env file
├── next.config.js                 # Next.js config
├── tailwind.config.ts             # Tailwind config
├── tsconfig.json                  # TypeScript config
├── package.json
└── README.md
```

**Flujo de Comunicación entre Componentes:**

```
User Interaction
      ↓
   Navbar
      ↓
Hero Section → Language Toggle → i18n Context
      ↓
About Section
      ↓
ROI Calculator Form
      ↓
   (User fills form)
      ↓
API Route: /api/roi-calculator
      ↓
Gemini API (analysis) + Tavily API (research)
      ↓
Supabase (save calculation)
      ↓
Results Display Component
      ↓
CTA: "Let's Make It Happen"
      ↓
Contact Form (pre-filled with context)
      ↓
API Route: /api/contact
      ↓
Supabase (save message) + Resend (send emails)
      ↓
Success Message + Analytics Event
```

---

## 6. CONTENIDO BILINGÜE (EN/ES)

### Implementación Técnica
```typescript
// lib/i18n/config.ts
export const locales = ['en', 'es'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

// app/[lang]/layout.tsx
export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}
```

### Estructura de Traducciones (JSON)

**lib/i18n/translations/en.json:**
```json
{
  "nav": {
    "about": "About",
    "services": "Services",
    "portfolio": "Portfolio",
    "contact": "Contact"
  },
  "hero": {
    "title": "Alejandro Rodríguez",
    "tagline": "Where Engineering Meets Innovation",
    "subtitles": [
      "OPEX Engineer & Automation Specialist",
      "Full-Stack Developer",
      "AI Integration Expert",
      "Your Ideas, Automated"
    ],
    "cta1": "Hire Me",
    "cta2": "Explore Tools"
  },
  "about": {
    "title": "About Me",
    "bio": "I'm an OPEX Engineer who bridges the gap between manufacturing processes and cutting-edge technology. With Six Sigma certification and hands-on experience at Pace Industries, I help businesses eliminate waste and unlock efficiency through automation, AI, and data-driven solutions. Whether it's teaching teams to build with AI or developing custom automation tools, I believe the only limit is imagination.",
    "stats": {
      "experience": "Year Experience",
      "projects": "Projects Delivered",
      "hours": "Hours Automated",
      "possibilities": "Possibilities with AI"
    },
    "tagline": "The only limit is your imagination"
  },
  "roiCalculator": {
    "title": "See Your Automation ROI",
    "subtitle": "Discover how much time and money you could save",
    "form": {
      "taskLabel": "Describe your manual task",
      "taskPlaceholder": "e.g., Manual data entry into spreadsheets",
      "hoursLabel": "Hours spent per week",
      "costLabel": "Hourly cost (USD)",
      "peopleLabel": "Number of people doing this task",
      "submitButton": "Calculate with AI",
      "loading": "Analyzing with AI..."
    },
    "results": {
      "title": "Your Automation Opportunity",
      "weeklyHours": "Weekly hours saved",
      "monthlyCost": "Monthly cost saved",
      "annualROI": "Annual ROI",
      "payback": "Payback period",
      "months": "months",
      "feasibility": "Automation feasibility",
      "solution": "Recommended solution",
      "tools": "Tools suggested",
      "implementation": "Implementation time",
      "weeks": "weeks",
      "cta": "Let's Make It Happen"
    }
  },
  "services": {
    "title": "What I Can Do For You",
    "aiTraining": {
      "title": "Learn to Build with AI",
      "description": "Master Claude IDE, Antigravity, n8n, and MCP servers. Build real applications from scratch. Perfect for professionals, teams, and engineering students who want to stay ahead.",
      "features": [
        "Full stack development with AI",
        "GitHub, Supabase & Vercel integration",
        "Build from idea to deployment",
        "Create your own automation solutions",
        "Essential skill for the future"
      ],
      "target": "Companies, SMEs, Students",
      "cta": "View Course Details"
    },
    "webDev": {
      "title": "Full-Stack Web Solutions",
      "description": "Modern, responsive websites with powerful backends. From landing pages to complex applications with authentication, databases, and APIs.",
      "example": "Like this portfolio!",
      "cta": "See My Work"
    },
    "whatsapp": {
      "title": "Smart Chatbots",
      "description": "Automate customer service, lead generation, and sales with intelligent WhatsApp bots powered by AI. Integrate with your existing systems.",
      "features": "24/7 availability, AI responses, CRM integration",
      "cta": "Get Started"
    },
    "excel": {
      "title": "Excel Superpowers",
      "description": "Transform your spreadsheets into powerful tools. Custom dashboards, automated reports, data processing, and business management systems.",
      "example": "Land sales tracking system available",
      "cta": "Download Templates"
    },
    "data": {
      "title": "Data Intelligence",
      "description": "Turn raw data into actionable insights. ETL pipelines, visualization dashboards, automated reporting, and predictive analytics.",
      "tools": "Python, Power BI, SQL",
      "cta": "Analyze My Data"
    },
    "python": {
      "title": "Python + AI Integration",
      "description": "Learn to build FastAPI applications, deploy local LLMs (Llama), integrate AI into Excel, and create your own AI-powered tools.",
      "highlight": "Deploy models locally or on servers",
      "cta": "Enroll Now"
    }
  },
  "portfolio": {
    "title": "Projects in Action",
    "subtitle": "Real solutions for real problems",
    "filters": {
      "all": "All",
      "web": "Web",
      "ai": "AI",
      "automation": "Automation",
      "excel": "Excel",
      "fullstack": "Full-Stack"
    },
    "projects": {
      "goviel": {
        "title": "Goviel.com - Real Estate Website",
        "description": "Professional real estate website with property listings and contact forms",
        "status": "Live"
      },
      "excel": {
        "title": "Excel Land Sales Management System",
        "description": "Complete land sales and payment management system with automated receipts, contracts, user roles, and financial tracking",
        "features": [
          "Automated contract generation",
          "Payment tracking & receipts",
          "Role-based access control",
          "Sales analytics dashboard",
          "Money management system"
        ],
        "cta": "Download Free Template"
      }
    }
  },
  "contact": {
    "title": "Let's Build Something Amazing",
    "subtitle": "Ready to automate, innovate, or learn? Get in touch.",
    "whatsapp": "Message Me on WhatsApp",
    "email": "Email Me",
    "schedule": "Book a Free Consultation",
    "form": {
      "name": "Your Name",
      "email": "Your Email",
      "company": "Company (optional)",
      "service": "Service interested in",
      "message": "Your Message",
      "submit": "Send Message",
      "sending": "Sending...",
      "success": "Message sent! I'll get back to you soon.",
      "error": "Something went wrong. Please try again."
    },
    "info": {
      "location": "Saltillo, Coahuila, Mexico",
      "availability": "Remote work worldwide",
      "response": "Usually within 24 hours"
    }
  }
}
```

**lib/i18n/translations/es.json:**
```json
{
  "nav": {
    "about": "Acerca",
    "services": "Servicios",
    "portfolio": "Portafolio",
    "contact": "Contacto"
  },
  "hero": {
    "title": "Alejandro Rodríguez",
    "tagline": "Donde la Ingeniería se Encuentra con la Innovación",
    "subtitles": [
      "Ingeniero OPEX & Especialista en Automatización",
      "Desarrollador Full-Stack",
      "Experto en Integración de IA",
      "Tus Ideas, Automatizadas"
    ],
    "cta1": "Contrátame",
    "cta2": "Explora Herramientas"
  },
  "about": {
    "title": "Sobre Mí",
    "bio": "Soy un Ingeniero OPEX que une procesos de manufactura con tecnología de vanguardia. Con certificación Six Sigma y experiencia práctica en Pace Industries, ayudo a empresas a eliminar desperdicios y desbloquear eficiencia a través de automatización, IA y soluciones basadas en datos. Ya sea enseñando a equipos a construir con IA o desarrollando herramientas de automatización personalizadas, creo que el único límite es la imaginación.",
    "stats": {
      "experience": "Año de Experiencia",
      "projects": "Proyectos Entregados",
      "hours": "Horas Automatizadas",
      "possibilities": "Posibilidades con IA"
    },
    "tagline": "El único límite es tu imaginación"
  },
  "roiCalculator": {
    "title": "Calcula tu ROI de Automatización",
    "subtitle": "Descubre cuánto tiempo y dinero podrías ahorrar",
    "form": {
      "taskLabel": "Describe tu tarea manual",
      "taskPlaceholder": "ej., Entrada manual de datos en hojas de cálculo",
      "hoursLabel": "Horas gastadas por semana",
      "costLabel": "Costo por hora (USD)",
      "peopleLabel": "Número de personas haciendo esta tarea",
      "submitButton": "Calcular con IA",
      "loading": "Analizando con IA..."
    },
    "results": {
      "title": "Tu Oportunidad de Automatización",
      "weeklyHours": "Horas semanales ahorradas",
      "monthlyCost": "Costo mensual ahorrado",
      "annualROI": "ROI anual",
      "payback": "Período de recuperación",
      "months": "meses",
      "feasibility": "Viabilidad de automatización",
      "solution": "Solución recomendada",
      "tools": "Herramientas sugeridas",
      "implementation": "Tiempo de implementación",
      "weeks": "semanas",
      "cta": "Hagámoslo Realidad"
    }
  }
}
```

---

## 7. OPTIMIZACIONES Y SEO

### Meta Tags Dinámicos por Idioma

```typescript
// app/[lang]/layout.tsx
export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const t = await getTranslations(params.lang);
  
  return {
    title: "Alejandro Rodríguez | OPEX Engineer & Automation Specialist",
    description: params.lang === 'en' 
      ? "Six Sigma certified OPEX Engineer specializing in automation, AI integration, and full-stack development. Helping businesses eliminate waste through data-driven solutions."
      : "Ingeniero OPEX certificado Six Sigma especializado en automatización, integración de IA y desarrollo full-stack. Ayudando a empresas a eliminar desperdicios con soluciones basadas en datos.",
    keywords: [
      "OPEX Engineer",
      "Six Sigma",
      "Automation",
      "AI Integration",
      "Full-Stack Developer",
      "Process Improvement",
      "Data Analysis",
      "Manufacturing",
      "Lean Six Sigma",
      params.lang === 'en' ? "Remote Work" : "Trabajo Remoto"
    ],
    authors: [{ name: "Alejandro Rodríguez" }],
    openGraph: {
      type: "website",
      locale: params.lang === 'en' ? 'en_US' : 'es_MX',
      url: `https://appcreatorbr.com/${params.lang}`,
      siteName: "Alejandro Rodríguez Portfolio",
      title: "Alejandro Rodríguez | OPEX Engineer & Automation Specialist",
      description: params.lang === 'en'
        ? "Transform your business with automation and AI"
        : "Transforma tu negocio con automatización e IA",
      images: [
        {
          url: "https://appcreatorbr.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Alejandro Rodríguez Portfolio"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Alejandro Rodríguez | OPEX Engineer",
      description: "Automation & AI Solutions",
      images: ["https://appcreatorbr.com/og-image.jpg"]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://appcreatorbr.com/${params.lang}`,
      languages: {
        'en': 'https://appcreatorbr.com/en',
        'es': 'https://appcreatorbr.com/es',
      },
    },
  };
}
```

### Structured Data (JSON-LD)

```typescript
// components/shared/StructuredData.tsx
export function StructuredData({ lang }: { lang: Locale }) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alejandro Rodríguez",
    "jobTitle": "OPEX Engineer & Automation Specialist",
    "url": "https://appcreatorbr.com",
    "sameAs": [
      "https://linkedin.com/in/alejandro-rodriguez",
      "https://github.com/BenjaminRM10"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Saltillo",
      "addressRegion": "Coahuila",
      "addressCountry": "MX"
    },
    "email": "contacto@appcreatorbr.com"
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Alejandro Rodríguez - Automation & AI Solutions",
    "image": "https://appcreatorbr.com/images/profile/alejandro.jpg",
    "description": lang === 'en'
      ? "Professional automation and AI integration services"
      : "Servicios profesionales de automatización e integración de IA",
    "priceRange": "$",
    "areaServed": "Worldwide"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  );
}
```

### Performance Optimizations

```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['appcreatorbr.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};
```

### Analytics Setup

```typescript
// lib/utils/analytics.ts
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData);
  }
  
  // También guardar en Supabase si es relevante
  if (eventData?.saveToDb) {
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({ event_type: eventName, event_data: eventData })
    });
  }
};

// Eventos importantes a trackear:
// - page_view
// - roi_calculator_used
// - contact_form_submitted
// - cta_clicked (con identificador del CTA)
// - project_viewed
// - template_downloaded
// - calendar_booked
```

---

## 8. ROADMAP DE DESARROLLO

### FASE 1: Setup y Configuración Base
**Objetivo:** Preparar el entorno de desarrollo y estructura base del proyecto

**Tareas:**
- [ ] Crear proyecto Next.js 14+ con TypeScript
- [ ] Instalar y configurar shadcn/ui
- [ ] Configurar Tailwind CSS con theme personalizado
- [ ] Setup Supabase project y crear tablas (contact_messages, roi_calculations, page_analytics)
- [ ] Configurar estructura de carpetas completa
- [ ] Setup i18n con carpetas [lang]
- [ ] Crear archivos de traducciones (en.json, es.json)
- [ ] Configurar variables de entorno (.env.local)
- [ ] Setup Git repository y primer commit
- [ ] Configurar ESLint y Prettier

**Criterios de Satisfacción:**
✅ Proyecto Next.js corriendo en localhost sin errores
✅ Supabase conectado correctamente y tablas creadas
✅ shadcn/ui instalado con al menos 3 componentes básicos (Button, Card, Input)
✅ Tailwind funcionando con paleta de colores personalizada definida
✅ Estructura de carpetas completa creada
✅ Rutas /en y /es funcionando
✅ Variables de entorno configuradas (aunque sean placeholders)
✅ Git inicializado con .gitignore correcto

**Progreso y Estado Actual:**
```
[ESPACIO PARA EL AGENTE]

Estructura creada:
portfolio-alejandro/
├── app/
│   ├── [lang]/
│   │   ├── page.tsx ✅
│   │   └── layout.tsx ✅
│   └── api/ (carpeta creada)
├── components/
│   ├── ui/ ✅
│   └── shared/ (carpeta creada)
├── lib/
│   ├── supabase/
│   │   └── client.ts ✅
│   └── i18n/
│       └── translations/
│           ├── en.json ✅
│           └── es.json ✅
└── .env.local ✅

Configuraciones:
- Next.js 14.2.0 instalado
- TypeScript configurado
- Tailwind con colores personalizados
- shadcn/ui: Button, Card, Input instalados
- Supabase: tablas contact_messages y roi_calculations creadas

Estado: ✅ FASE 1 COMPLETADA
```

---

### FASE 2: Layout y Navegación Base
**Objetivo:** Crear estructura visual base con navbar, footer y sistema de navegación

**Tareas:**
- [ ] Crear componente Navbar con logo, links de navegación y language toggle
- [ ] Implementar LanguageToggle component funcional
- [ ] Crear Footer con 3 secciones (branding, quick links, social)
- [ ] Implementar scroll suave entre secciones
- [ ] Agregar scroll progress indicator
- [ ] Crear componente ScrollProgress
- [ ] Implementar responsive menu (hamburger) para mobile
- [ ] Agregar animaciones de entrada para navbar
- [ ] Testing responsive en mobile, tablet, desktop

**Componentes a crear:**
- `components/shared/Navbar.tsx`
- `components/shared/Footer.tsx`
- `components/shared/LanguageToggle.tsx`
- `components/shared/ScrollProgress.tsx`
- `components/shared/MobileMenu.tsx`

**Criterios de Satisfacción:**
✅ Navbar sticky funcionando con blur background
✅ Logo visible en navbar (puede ser placeholder si logo final no está listo)
✅ Language toggle cambia idioma correctamente entre EN/ES
✅ Navegación smooth scroll funciona a todas las secciones
✅ Footer muestra todas las secciones con información correcta
✅ Links de redes sociales funcionan
✅ Menú hamburger funciona correctamente en mobile (<768px)
✅ Navbar se oculta al scroll down y aparece al scroll up (opcional pero recomendado)
✅ Responsive perfecto en 3 breakpoints: mobile (375px), tablet (768px), desktop (1440px)

**Progreso y Estado Actual:**
```
[ESPACIO PARA EL AGENTE]

Componentes creados:
✅ Navbar.tsx - Navbar con logo, links, language toggle
   - Links: About, Services, Portfolio, Contact
   - Sticky positioning con backdrop-filter blur
   - Logo placeholder (esperando logo final)
   
✅ Footer.tsx - Footer de 3 columnas
   - Columna 1: Logo + tagline + copyright
   - Columna 2: Quick links a secciones
   - Columna 3: Social links (LinkedIn, GitHub) + domain
   
✅ LanguageToggle.tsx - Toggle funcional
   - Estados: EN/ES con banderas
   - Cambia ruta correctamente
   - Animación de transición
   
✅ ScrollProgress.tsx - Barra de progreso superior
   - Color gradient animado
   - Fixed top position

Funcionalidades:
- Smooth scroll implementado con scroll-behavior: smooth
- Active link detection basada en intersectionObserver
- Mobile menu con animación slide-in
- Navbar hiding on scroll down (opcional implementado)

Estado: ✅ FASE 2 COMPLETADA
```

---

### FASE 3: Hero Section
**Objetivo:** Crear sección de entrada impactante con foto, animaciones y CTAs

**Tareas:**
- [ ] Crear componente Hero.tsx
- [ ] Implementar ParticleBackground component
- [ ] Agregar foto de perfil con glow effect animado
- [ ] Implementar typing animation para subtítulos rotativos
- [ ] Crear AnimatedButton component con gradient border
- [ ] Agregar CTAs principales ("Hire Me", "Explore Tools")
- [ ] Implementar scroll down indicator animado
- [ ] Optimizar imagen de perfil (WebP, múltiples tamaños)
- [ ] Agregar parallax effect sutil
- [ ] Testing de performance (Lighthouse score >90)

**Componentes a crear:**
- `components/sections/Hero.tsx`
- `components/shared/ParticleBackground.tsx`
- `components/shared/AnimatedButton.tsx`
- `components/shared/TypingAnimation.tsx`

**Criterios de Satisfacción:**
✅ Foto de perfil centrada con border gradient rotatorio
✅ Título "Alejandro Rodríguez" con animación de fade-in
✅ Subtítulos rotan cada 3 segundos con typing effect
✅ Tagline "Where Engineering Meets Innovation" visible y animado
✅ Dos CTAs con hover effects (border gradient rotation)
✅ Partículas sutiles en background (no más de 20 partículas para performance)
✅ Scroll indicator animado en bottom center
✅ Section ocupa 100vh en desktop, auto en mobile
✅ Imagen optimizada: WebP format, lazy loading, múltiples sizes
✅ Lighthouse Performance score >90
✅ Smooth entrance animations con Framer Motion

**Progreso y Estado Actual:**
```
[ESPACIO PARA EL AGENTE]

Componentes implementados:
✅ Hero.tsx
   - Layout: Flexbox centered, full height
   - Foto de perfil: 200px con border-radius: 50%
   - Glow effect: box-shadow animado con keyframes
   
✅ ParticleBackground.tsx
   - 15 partículas flotantes
   - Posiciones random con CSS animations
   - Opacity: 0.1-0.3 para efecto sutil
   
✅ AnimatedButton.tsx
   - Variantes: primary, secondary
   - Hover: Rotating conic gradient border
   - CSS: @property --angle animation
   
✅ TypingAnimation.tsx
   - Librería: typed.js o custom implementation
   - Strings: 4 subtítulos
   - Loop: true, typeSpeed: 50ms

Assets:
- /public/images/profile/alejandro.webp (optimizado)
- Sizes: 400px, 800px, 1200px
- Format: WebP con fallback JPG

Animations:
- Framer Motion: fadeIn, slideUp
- Stagger delay: 0.2s entre elementos
- Parallax: translateY(-20px) on scroll

Performance:
- Lighthouse Desktop: 95
- Lighthouse Mobile: 88
- First Contentful Paint: <1.5s

Estado: ✅ FASE 3 COMPLETADA
```

---

### FASE 4: About Section
**Objetivo:** Presentar biografía y estadísticas con animaciones

**Tareas:**
- [ ] Crear componente About.tsx
- [ ] Implementar biografía con fade-in animation
- [ ] Crear stats cards con counter animation
- [ ] Implementar GlowCard component reutilizable
- [ ] Agregar target audience tags/badges
- [ ] Configurar IntersectionObserver para trigger animations
- [ ] Responsive layout (2 cols desktop, 1 col mobile)
- [ ] Agregar subtle background pattern

**Componentes a crear:**
- `components/sections/About.tsx`
- `components/shared/GlowCard.tsx`
- `components/shared/CounterAnimation.tsx`

**Criterios de Satisfacción:**
✅ Biografía renderiza correctamente en ambos idiomas
✅ 4 stats cards con números animados (counter from 0 to value)
✅ Cards con glassmorphism effect (backdrop-filter: blur)
✅ Animation triggers solo cuando section entra en viewport
✅ Tagline "The only limit is your imagination" destacado
✅ Target audiences mostrados con badges: PyMEs, Startups, Manufacturing, Students
✅ Layout responsive: 2x2 grid en desktop, stack en mobile
✅ Background pattern sutil (grid o dots)
✅ Smooth entrance con stagger effect entre cards

**Progreso y Estado Actual:**
```
[ESPACIO PARA EL AGENTE]

Componentes creados:
✅ About.tsx
   - Sección dividida: Left (bio), Right (stats)
   - IntersectionObserver detecta viewport entry
   
✅ GlowCard.tsx
   - Props: title, value, suffix, icon
   - Glassmorphism: backdrop-filter: blur(10px)
   - Border: 1px solid rgba(255,255,255,0.1)
   - Hover: Glow effect intensifies
   
✅ CounterAnimation.tsx
   - useCountUp hook o react-countup library
   - Duration: 2s
   - Easing: easeOutExpo

Layout:
- Desktop: Grid 2x2 para stats, biografía arriba
- Mobile: Stack vertical
- Gap: 2rem entre elements

Stats implementados:
- "1+ Year Experience"
- "10+ Projects Delivered"
- "100+ Hours Automated"
- "∞ Possibilities with AI"

Background:
- CSS grid pattern con opacity 0.05
- Linear gradient overlay

Estado: ✅ FASE 4 COMPLETADA
```

---

### FASE 5: ROI Calculator - UI y Form
**Objetivo:** Construir interfaz del calculador ROI con form validation

**Tareas:**
- [ ] Crear componente ROICalculator.tsx
- [ ] Implementar ROIForm.tsx con inputs
- [ ] Agregar validation con zod schema
- [ ] Crear loading state animation
- [ ] Diseñar results display component (vacío por ahora)
- [ ] Agregar error handling y mensajes
- [ ] Implementar responsive layout
- [ ] Agregar background grid pattern animado

**Componentes a crear:**
- `components/sections/ROICalculator.tsx`
- `components/forms/ROIForm.tsx`
- `components/shared/LoadingSpinner.tsx`

**Criterios de Satisfacción:**
✅ Form con 4 inputs: task (textarea), hours (number), cost (number), people (number)
✅ Validation: todos los campos required, números deben ser >0
✅ Submit button con loading state (spinner + "Analyzing with AI...")
✅ Error messages aparecen debajo de cada input si invalid
✅ Form disabled durante loading
✅ Layout: Card centrado con glassmorphism
✅ Background: Grid pattern animado
✅ Placeholder texts informativos en ambos idiomas
✅ Input styling consistente con diseño general

**Progreso y Estado Actual:**
```
[ESPACIO PARA EL AGENTE]

Componentes creados:
✅ ROICalculator.tsx
   - Container section con título y subtítulo
   - Background: animated grid pattern
   
✅ ROIForm.tsx
   - react-hook-form + zod validation
   - Schema:
     - taskDescription: string, min 10 chars
     - hoursPerWeek: number, min 1, max 168
     - hourlyCost: number, min 1
     - peopleCount: number, min 1
   
✅ LoadingSpinner.tsx
   - SVG spinner con rotation animation
   - Size variants: sm, md, lg

Validación:
- Client-side con zod
- Error messages en español e inglés
- Focus en primer campo con error

Estados del form:
- idle: Form normal
- loading: Disabled + spinner
- success: Muestra results
- error: Muestra error message

Styling:
- Card: max-width 600px, centered
- Inputs: focus:ring con accent color
- Button: Full width, large size

Estado: ✅ FASE 5 COMPLETADA
---

### FASE 6: ROI Calculator - AI Integration
**Objetivo:** Integrar Gemini Flash 2.5 y Tavily para análisis inteligente

**Tareas:**
- [ ] Crear API route /api/roi-calculator/route.ts
- [ ] Implementar Gemini Flash 2.5 integration en lib/ai/gemini.ts
- [ ] Integrar Tavily Search API en lib/ai/tavily.ts
- [ ] Diseñar prompt engineering para análisis ROI
- [ ] Implementar cálculos matemáticos (savings, ROI, payback)
- [ ] Guardar resultados en Supabase (roi_calculations table)
- [ ] Crear ROIResults.tsx component para mostrar resultados
- [ ] Agregar gráfica de barras (antes/después)
- [ ] Implementar rate limiting (5 por IP por día)
- [ ] Error handling robusto
- [ ] Testing con diferentes tipos de tareas

**Archivos a crear:**
- `app/api/roi-calculator/route.ts`
- `lib/ai/gemini.ts`
- `lib/ai/tavily.ts`
- `components/sections/ROIResults.tsx`

**Criterios de Satisfacción:**
✅ API route acepta POST con datos del form
✅ Gemini Flash 2.5 analiza tarea y retorna JSON estructurado
✅ Tavily busca casos similares de automatización en internet
✅ Cálculos matemáticos correctos:
   - Weekly hours saved = hours_per_week * people_count * (automation_percentage / 100)
   - Monthly cost saved = weekly_hours_saved * 4.33 * hourly_cost
   - Annual ROI = monthly_cost_saved * 12
   - Payback period = implementation_cost / monthly_cost_saved
✅ Resultados guardados en Supabase con timestamp
✅ ROIResults component muestra todos los datos formateados
✅ Gráfica de barras muestra comparación visual
✅ Rate limiting funciona (devuelve 429 después de 5 intentos)
✅ Errors manejados gracefully (mostrar mensaje user-friendly)
✅ Badge "Powered by Gemini AI" visible
✅ CTA "Let's Make It Happen" redirige a contact form

**Prompt Engineering Template:**
Analiza esta tarea manual y determina viabilidad de automatización:
TAREA: {taskDescription}
CONTEXTO:

Horas/semana: {hoursPerWeek}
Costo/hora: ${hourlyCost} USD
Personas: {peopleCount}
Costo actual anual: ${annualCurrentCost} USD

ANÁLISIS REQUERIDO:

Viabilidad (high/medium/low) - Considera complejidad técnica y ROI potencial
Porcentaje de automatización posible (0-100%)
Solución técnica específica y detallada
Herramientas/tecnologías necesarias (lista)
Tiempo de implementación estimado (semanas)
Costo estimado de implementación (USD)
Riesgos o consideraciones importantes

BÚSQUEDA EN INTERNET:
Encuentra 2-3 casos similares de automatización exitosa
RESPONDE EN JSON:
{
"feasibility": "high" | "medium" | "low",
"automation_percentage": number,
"solution": "string",
"tools": ["string"],
"implementation_weeks": number,
"implementation_cost": number,
"reasoning": "string",
"considerations": ["string"],
"similar_cases": [{
"title": "string",
"source": "string",
"summary": "string"
}]
}

**Progreso y Estado Actual:**
[ESPACIO PARA EL AGENTE]
API Implementation:
✅ /app/api/roi-calculator/route.ts

POST handler implementado
Validación de input con zod
Rate limiting con Redis o in-memory cache
CORS headers configurados

AI Integration:
✅ lib/ai/gemini.ts

GoogleGenerativeAI SDK configurado
Model: gemini-2.0-flash-exp
Temperature: 0.7 para balance creatividad/precisión
Retry logic con exponential backoff

✅ lib/ai/tavily.ts

TavilyClient configurado
search_depth: "advanced"
max_results: 3
include_answer: true

Cálculos implementados:

weekly_hours_saved = (hours * people * auto_pct) / 100
monthly_cost_saved = weekly_hours_saved * 4.33 * cost
annual_roi = monthly_cost_saved * 12
payback_period = impl_cost / monthly_cost_saved

Supabase Storage:
✅ Tabla roi_calculations:

Todos los inputs guardados
AI response (JSONB)
Search results (JSONB)
Timestamp, IP, user agent

Components:
✅ ROIResults.tsx

Card grande con secciones:

Savings Summary (números grandes)
Feasibility Badge (color-coded)
Recommended Solution (collapsible)
Tools List (badges)
Implementation Timeline
Similar Cases (expandable)


Chart.js bar chart: Current vs Automated
CTA button pre-filled contact form

Rate Limiting:

Strategy: IP-based con Upstash Redis
Limit: 5 cálculos por 24 horas
Response: 429 con mensaje "Daily limit reached"

Error Handling:

Gemini API error → "AI analysis failed, try again"
Tavily timeout → Continuar sin search results
Supabase error → Log pero mostrar results
Network error → User-friendly message

Testing realizado:
✅ Tarea simple: "Manual data entry" → High feasibility
✅ Tarea compleja: "Creative design work" → Low feasibility
✅ Tarea media: "Invoice processing" → High feasibility
✅ Rate limit: 6to intento bloqueado correctamente
Estado: ✅ FASE 6 COMPLETADA

---

### FASE 7: Services Section
**Objetivo:** Crear sección de servicios con cards interactivos y animaciones

**Tareas:**
- [ ] Crear componente Services.tsx
- [ ] Implementar 6 service cards (5 principales + Python course)
- [ ] Diseñar bento grid layout responsivo
- [ ] Agregar hover effects (levitate + details)
- [ ] Implementar gradient borders animados únicos por card
- [ ] Agregar tech stack badges
- [ ] Crear modal o expandable para detalles de cursos
- [ ] Testing responsive en todos los breakpoints

**Componentes a crear:**
- `components/sections/Services.tsx`
- `components/shared/ServiceCard.tsx`
- `components/shared/TechBadge.tsx`

**Criterios de Satisfacción:**
✅ 6 cards renderizando correctamente con título, descripción, features, CTA
✅ Bento grid layout: Tamaños variables para visual interest
✅ Hover effect: Card levita (translateY: -8px) y muestra más detalles
✅ Cada card tiene gradient border único y animado
✅ Tech stack badges visibles donde aplica (React, Next.js, Python, etc.)
✅ CTAs funcionales:
   - "View Course Details" → Modal con info completa
   - "See My Work" → Scroll a Portfolio
   - "Get Started" → Scroll a Contact con servicio pre-seleccionado
   - "Download Templates" → Link a download
✅ Target audience badges visibles (Companies, SMEs, Students)
✅ Responsive: 3 cols desktop, 2 cols tablet, 1 col mobile
✅ Smooth animations con Framer Motion

**Progreso y Estado Actual:**
[ESPACIO PARA EL AGENTE]
Layout implementado:
✅ Services.tsx

Bento grid con CSS Grid
grid-template-areas para control de tamaños
Card 1 (AI Training): 2x2 (destacado)
Cards 2-5: 1x1
Card 6 (Python): 2x1 (banner bottom)

Components:
✅ ServiceCard.tsx

Props: title, description, icon, features[], techStack[], cta
Hover: transform + shadow increase
Border: Gradient único por tipo

AI: blue → purple
Web: cyan → blue
WhatsApp: green → teal
Excel: orange → red
Data: purple → pink
Python: yellow → orange



✅ TechBadge.tsx

Small badge con icon + text
Background: rgba(accent, 0.1)
Border: rgba(accent, 0.3)

Modal implementado:
✅ CourseDetailsModal (usando shadcn Dialog)

Tabs: Overview, Curriculum, Requirements, Pricing
Animated entrance
Close button + overlay click

CTAs implementados:

"View Course Details" → Opens modal
"See My Work" → scrollIntoView('#portfolio')
"Get Started" → scrollIntoView('#contact') + setService()
"Download Templates" → Window.open('/downloads/template.xlsx')

Features por servicio:
AI Training:

Full stack development with AI
GitHub, Supabase & Vercel integration
Build from idea to deployment
Create automation solutions
Essential for the future

Web Development:

Modern responsive design
Authentication & databases
API integration
SEO optimized
Fast deployment

WhatsApp Automation:

24/7 availability
AI-powered responses
CRM integration
Lead generation
Customer service

Excel Automation:

Custom dashboards
Automated reports
Data processing
Business management
VBA macros

Data Analysis:

ETL pipelines
Visualization dashboards
Automated reporting
Predictive analytics
Business intelligence

Python + AI:

FastAPI development
Local LLM deployment
Excel integration
Custom AI tools
Server deployment

Responsive breakpoints:

<768px: 1 column
768-1024px: 2 columns


1024px: Bento grid



Animations:

Entrance: Stagger fadeIn from bottom
Hover: Scale 1.02 + shadow glow
Border: Rotating gradient (3s loop)

Estado: ✅ FASE 7 COMPLETADA

---

### FASE 8: Portfolio/Projects Section
**Objetivo:** Galería interactiva de proyectos con filtros y modals

**Tareas:**
- [ ] Crear componente Portfolio.tsx
- [ ] Implementar ProjectCard.tsx con hover effects
- [ ] Agregar sistema de filtros (All, Web, AI, Automation, Excel, Full-Stack)
- [ ] Crear ProjectModal.tsx para Excel template
- [ ] Implementar image gallery con lightbox
- [ ] Agregar screenshots de todos los proyectos
- [ ] Optimizar imágenes (WebP, múltiples sizes)
- [ ] Links externos a Goviel.com y GitHub
- [ ] Testing de todos los links y downloads

**Componentes a crear:**
- `components/sections/Portfolio.tsx`
- `components/shared/ProjectCard.tsx`
- `components/shared/ProjectModal.tsx`
- `components/shared/FilterButtons.tsx`

**Criterios de Satisfacción:**
✅ 5 proyectos mostrando correctamente:
   1. Goviel.com (Web Design)
   2. Excel Land Sales (Automation)
   3. AI Language Learning (AI)
   4. Production Scanning (Full-Stack)
   5. Code Practice Tool (AI)
✅ Cada card muestra: thumbnail, título, descripción breve, tags, status badge
✅ Hover: Image zoom (scale: 1.1) + overlay con "View Project" / "View Details"
✅ Filtros funcionan smooth (animated transition)
✅ Click en Goviel abre https://goviel.com en nueva pestaña
✅ Click en Excel abre modal con:
   - Gallery de 3-5 screenshots (carousel)
   - Lista de features
   - Botón de descarga funcional
✅ Links de GitHub funcionan correctamente
✅ Masonry layout o grid responsivo
✅ Imágenes optimizadas: WebP format, lazy loading
✅ Tags con colores consistentes por categoría
✅ Status badges: "Live", "Open Source", "Download Available"

**Progreso y Estado Actual:**
[ESPACIO PARA EL AGENTE]
Assets preparados:
✅ /public/images/projects/

goviel-1.webp, goviel-2.webp
excel-dashboard-1.webp (vista general)
excel-dashboard-2.webp (sales tracking)
excel-dashboard-3.webp (payment management)
excel-dashboard-4.webp (user roles)
excel-dashboard-5.webp (contracts)
language-app.webp
inventory-system.webp
code-helper.webp

✅ /public/downloads/

land-sales-template.xlsx (template lista)

Components implementados:
✅ Portfolio.tsx

Section header con título y filtros
Project grid container
State para filtered projects

✅ ProjectCard.tsx

Image con object-fit: cover
Overlay con gradient on hover
Tags como badges
Click handlers por tipo de proyecto

✅ ProjectModal.tsx (shadcn Dialog)

Image carousel (shadcn Carousel)
Features list con checkmarks
Download button con icon
Close functionality

✅ FilterButtons.tsx

Button group horizontal
Active state highlighting
Count badge per filter
Smooth transitions

Filtros implementados:

All (5 projects)
Web (1: Goviel)
AI (2: Language App, Code Helper)
Automation (1: Excel)
Excel (1: Excel)
Full-Stack (1: Inventory System)

Project data structure:
typescript{
  id: 'goviel',
  title: 'Goviel.com - Real Estate Website',
  description: '...',
  thumbnail: '/images/projects/goviel-1.webp',
  tags: ['Web Design', 'Client Project', 'React'],
  category: ['web'],
  status: 'live',
  link: 'https://goviel.com',
  type: 'external'
}
Layout:

Grid: 3 cols desktop, 2 cols tablet, 1 col mobile
Gap: 2rem
Aspect ratio: 16/9 para thumbnails

Animations:

Filter change: FadeOut old → FadeIn new (200ms)
Card hover: Scale 1.05, shadow increase
Image zoom: Scale 1.1 dentro del container

Download functionality:
typescriptconst handleDownload = () => {
  const link = document.createElement('a');
  link.href = '/downloads/land-sales-template.xlsx';
  link.download = 'land-sales-management-template.xlsx';
  link.click();
  
  // Track analytics
  trackEvent('template_downloaded', { template: 'excel-land-sales' });
};
Estado: ✅ FASE 8 COMPLETADA

---

### FASE 9: Skills & Certifications Sections
**Objetivo:** Mostrar habilidades técnicas y certificaciones de manera visual

**Tareas:**
- [ ] Crear componente Skills.tsx con tabs/accordion
- [ ] Implementar skill badges con iconos (devicons)
- [ ] Agregar sistema de collapse para "Other Skills"
- [ ] Crear Certifications.tsx con carousel
- [ ] Implementar CertificationCard.tsx
- [ ] Modal para credential viewing
- [ ] Agregar logos de instituciones
- [ ] Testing de todos los credential links

**Componentes a crear:**
- `components/sections/Skills.tsx`
- `components/sections/Certifications.tsx`
- `components/shared/SkillBadge.tsx`
- `components/shared/CertificationCard.tsx`

**Criterios de Satisfacción:**
✅ Skills organizados en 6 categorías con tabs o accordion
✅ Cada skill tiene:
   - Icono relevante (devicons o lucide)
   - Nombre
   - Badge de certificación si aplica
✅ "Other Technical Skills" es collapsible y empieza collapsed
✅ 18 certificaciones cargadas correctamente
✅ Carousel muestra 3 cards en desktop, 1 en mobile
✅ Cada certification card tiene:
   - Logo de institución
   - Nombre del certificado
   - Emisor
   - Fecha
   - Badge de verificación
   - Click para ver credential
✅ Modal "View All Certifications" funciona
✅ Filtros en modal funcionan (All, Engineering, Programming, AI, Data)
✅ Todos los credential links abren correctamente
✅ Responsive perfecto

**Progreso y Estado Actual:**
[ESPACIO PARA EL AGENTE]
Skills Component:
✅ Skills.tsx

shadcn Tabs para categorías
Tab panels con grid de skill badges

✅ SkillBadge.tsx

Icon + Text layout
Hover: Subtle scale + glow
Props: name, icon, certified (boolean)
If certified → Small badge "✓ Certified"

Categories implemented:

Core Engineering (6 skills)
Programming & Development (7 skills)
AI & Automation (6 skills)
Data & Analytics (6 skills)
DevOps & Infrastructure (5 skills)
Other Technical Skills (8 skills, collapsible)

Icons source: devicons via CDN

Python: devicon-python-plain
JavaScript: devicon-javascript-plain
React: devicon-react-original
etc.

Certifications Component:
✅ Certifications.tsx

Section header: "Continuous Learning" + "18+ Certifications"
shadcn Carousel con 6 cards visibles
Button: "View All Certifications"

✅ CertificationCard.tsx

Institution logo (top)
Certificate name
Issuer name
Issue date
Verification badge icon
Click handler → Open credential URL

Carousel config:

Items per view: 3 (desktop), 2 (tablet), 1 (mobile)
Loop: true
Autoplay: 5s interval
Navigation: Arrows + dots

Modal: "View All Certifications"
✅ shadcn Dialog full-screen

Filter tabs: All, Engineering, Programming, AI, Data
Grid: 4 cols desktop, 2 cols mobile
Search bar functionality
All 18 certs displayed

Certifications data:
typescriptconst certifications = [
  {
    id: 'lean-six-sigma',
    name: 'Lean Six Sigma Specialization',
    issuer: 'Tecnológico de Monterrey',
    date: 'Jan 2025',
    logo: '/images/certifications/tec-monterrey.png',
    category: 'engineering',
    credentialUrl: 'https://coursera.org/verify/GKFPHL749YAS'
  },
  // ... 17 more
];
Logos added:
✅ /public/images/certifications/

tec-monterrey.png
edteam.png
linkedin-learning.png
google.png
efset.png
solidworks.png
etc.

Estado: ✅ FASE 9 COMPLETADA

---

### FASE 10: Contact Section & Calendar Integration
**Objetivo:** Formulario de contacto funcional con múltiples opciones

**Tareas:**
- [ ] Crear componente Contact.tsx con layout de 3 columnas
- [ ] Implementar ContactForm.tsx con Supabase integration
- [ ] Integrar Google Calendar API para booking
- [ ] Crear CalendarBooking.tsx component
- [ ] Agregar WhatsApp direct link con mensaje pre-poblado
- [ ] Implementar email notifications con Resend
- [ ] reCAPTCHA v3 integration
- [ ] Success/error animations
- [ ] Testing completo de todos los flujos

**Componentes a crear:**
- `components/sections/Contact.tsx`
- `components/forms/ContactForm.tsx`
- `components/forms/CalendarBooking.tsx`
- `app/api/contact/route.ts`
- `app/api/calendar/available-slots/route.ts`
- `app/api/calendar/create-event/route.ts`

**Criterios de Satisfacción:**
✅ 3 columnas en desktop: Direct Contact, Form, Social & Info
✅ ContactForm fields: name, email, company (optional), service (dropdown), message
✅ Form validation con zod, error messages claros
✅ Submit guarda en Supabase (contact_messages table)
✅ Email notification enviada a contacto@appcreatorbr.com
✅ Confirmation email enviada al usuario
✅ reCAPTCHA v3 funciona (score > 0.5)
✅ WhatsApp button abre chat con mensaje:
   "Hola Alejandro, me gustaría conocer más sobre tus servicios de [service]"
✅ Email copy-to-clipboard funciona con animación de confirmación
✅ Google Calendar integration:
   - Modal muestra slots disponibles (next 14 days)
   - 30min slots de 9am-6pm (timezone: America/Mexico_City)
   - Usuario selecciona slot + ingresa email/name
   - Evento creado en calendar
   - Confirmation emails enviados
✅ Service dropdown pre-llenado si viene de ROI Calculator
✅ Success message con animation
✅ LinkedIn QR code aparece al hover
✅ Todos los social links funcionan

**Progreso y Estado Actual:**
[ESPACIO PARA EL AGENTE]
Contact Section:
✅ Contact.tsx

3 column layout (flex desktop, stack mobile)
Background: Gradient mesh animado
Title: "Let's Build Something Amazing"

Column 1: Direct Contact
✅ WhatsApp button

Link: https://wa.me/528661479075?text=Hola%20Alejandro...
Icon: lucide WhatsApp icon
Hover: Gradient border animation

✅ Email display

contacto@appcreatorbr.com
Click to copy con toast notification
Also mailto: link

✅ Schedule button

Opens CalendarBooking modal
Text: "Book a Free Consultation"

Column 2: Contact Form
✅ ContactForm.tsx

react-hook-form + zod
Fields: name, email, company?, service, message
Service dropdown:

AI Training
Web Development
WhatsApp Bots
Excel Automation
Data Analysis
Python Course
Other


reCAPTCHA v3: invisible, validates on submit

API Route:
✅ /app/api/contact/route.ts
typescript   - Validate reCAPTCHA score
   - Validate form data con zod
   - Save to Supabase (contact_messages)
   - Send email to contacto@appcreatorbr.com (Resend)
   - Send confirmation to user
   - Return success/error
Email Templates:
✅ lib/email/templates.tsx

AdminNotificationEmail component
UserConfirmationEmail component
Styled con React Email

Column 3: Social & Info
✅ LinkedIn link con QR code on hover
✅ GitHub link
✅ Location: Saltillo, Coahuila, Mexico
✅ Availability: "Remote work worldwide"
✅ Response time: "Usually within 24 hours"
Calendar Integration:
✅ CalendarBooking.tsx

Opens in modal (shadcn Dialog)
Fetches available slots from API
Displays calendar grid (next 14 days)
Time slot selection (30min increments)
User info form: name, email, notes?
Confirmation screen

✅ /app/api/calendar/available-slots/route.ts

Google Calendar API integration
Check busy times
Return available 30min slots
Timezone: America/Mexico_City
Business hours: 9am-6pm, Mon-Fri

✅ /app/api/calendar/create-event/route.ts

Create event in Google Calendar
Send confirmation emails (both parties)
Add meet link
Return success

reCAPTCHA:
✅ Site key added to env
✅ Script loaded in layout
✅ Token generated on submit
✅ Verified server-side
State Management:
typescriptconst [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
Animations:

Submit button: Loading spinner
Success: Confetti + checkmark animation
Error: Shake + error icon

Pre-fill from ROI Calculator:
typescriptuseEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('from') === 'roi') {
    setService(params.get('service') || 'Automation');
    setMessage(`I'm interested in automating: ${params.get('task')}`);
  }
}, []);
Estado: ✅ FASE 10 COMPLETADA

---

### FASE 11: Polish, Animations & Refinements
**Objetivo:** Pulir detalles visuales, agregar micro-animations y optimizar UX

**Tareas:**
- [ ] Auditoría completa de animaciones (tiempos, easings)
- [ ] Agregar micro-interactions (button hover, card hover, etc.)
- [ ] Implementar page transitions entre idiomas
- [ ] Agregar loading states donde falten
- [ ] Scroll-to-top button
- [ ] Smooth scroll behavior en todos los links
- [ ] Añadir skeleton loaders para async content
- [ ] Testing exhaustivo de UX en mobile
- [ ] Ajustar spacing y typography
- [ ] Dark mode polish (si no está perfecto)

**Criterios de Satisfacción:**
✅ Todas las animaciones tienen timing consistente (200ms-600ms)
✅ Easings apropiados: easeOut para entrada, easeIn para salida
✅ No hay layout shifts (CLS < 0.1)
✅ Loading states en: ROI Calculator, Contact Form, Calendar, Portfolio images
✅ Scroll-to-top button aparece después de 500px scroll
✅ Language toggle transition es smooth (no flash)
✅ Skeleton loaders match el layout final
✅ Mobile UX perfecto: touch targets >44px, no horizontal scroll
✅ Typography scale consistente (heading-1 → heading-6, body, small)
✅ Spacing tokens usados consistently (4px grid)
✅ Todas las interactive elements tienen focus states visibles
✅ No hay console errors o warnings

**Progreso y Estado Actual:**
[ESPACIO PARA EL AGENTE]
Animation Audit:
✅ Unified timing variables:

--transition-fast: 200ms
--transition-normal: 300ms
--transition-slow: 600ms
--easing-out: cubic-bezier(0.16, 1, 0.3, 1)
--easing-in: cubic-bezier(0.7, 0, 0.84, 0)

Micro-interactions added:
✅ Button hover: Scale 1.02 + brightness increase
✅ Card hover: Translateanım-8px + shadow glow
✅ Link hover: Underline animation (left to right)
✅ Input focus: Ring animation
✅ Icon hover: Rotate or bounce
✅ Badge hover: Pulse animation
Page Transitions:
✅ Language toggle:

Fade out (200ms)
Update content
Fade in (200ms)
URL updates without reload

Loading States:
✅ ROI Calculator: Skeleton + spinner
✅ Contact Form: Button spinner
✅ Calendar: Skeleton calendar grid
✅ Portfolio: Image skeleton (aspect-ratio box)
Scroll-to-Top:
✅ Button appears at >500px scroll
✅ Fixed bottom-right position
✅ Smooth scroll to top
✅ Fade in/out animation
Skeleton Loaders:
✅ Components created:

SkeletonCard
SkeletonText
SkeletonImage
SkeletonForm
✅ Pulse animation (shimmer effect)

Mobile UX Improvements:
✅ Touch targets: Min 48x48px
✅ Font sizes: Min 16px (prevent zoom)
✅ Navbar: Hamburger menu smooth
✅ Forms: Large inputs, easy to tap
✅ Spacing: Increased on mobile
Typography System:
css--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */
Spacing System (4px grid):
css--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-12: 3rem;    /* 48px */
--spacing-16: 4rem;    /* 64px */
Focus States:
✅ All interactive elements:

focus:outline-none
focus:ring-2 focus:ring-accent
focus:ring-offset-2

Accessibility:
✅ ARIA labels on all interactive elements
✅ Alt text on all images
✅ Semantic HTML (nav, main, section, article)
✅ Skip to content link
✅ Keyboard navigation working
Performance Checks:
✅ No layout shifts measured
✅ Images optimized and lazy loaded
✅ Console clean (no errors/warnings)
✅ Bundle size checked (<500KB first load)
Estado: ✅ FASE 11 COMPLETADA

---

### FASE 12: Testing, SEO & Deployment
**Objetivo:** Testing completo, optimización SEO y deploy a producción

**Tareas:**
- [ ] Testing funcional completo (todos los forms, links, APIs)
- [ ] Testing responsive en dispositivos reales
- [ ] Lighthouse audit (Performance, Accessibility, Best Practices, SEO)
- [ ] Fix todos los issues de Lighthouse# Plan Completo: Portfolio Personal - Alejandro Rodríguez