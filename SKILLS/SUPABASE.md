# Supabase Architecture Guide

> **Context**: This project uses Supabase as the primary backend for Database (PostgreSQL), Auth, and Storage.

## 1. Project Configuration

- **Project Name**: `BenjaminRodriguez`
- **Region**: `us-east-2` (Ohio)
- **Client Library**: `@supabase/ssr` (Next.js App Router compatible)

### Environment Variables
Required in `.env.local` and Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`: API URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Safe for client-side usage.
- `SUPABASE_SERVICE_ROLE_KEY`: **SECRET**. Use only in server-side API routes for admin tasks.

---

## 2. Database Schema

### Core Tables

#### `contact_messages`
Stores form submissions as an audit trail.
- **RLS**: `Disabled` (Public write access required for anonymous interactions).
- **Key Columns**: `email`, `message`, `service`, `source`.
- **Triggers**: None (Notifications handled by API Route + Resend).

#### `roi_calculations`
Stores the results of the AI interactions.
- **RLS**: `Disabled` (Public write access).
- **Key Columns**: `task_description`, `annual_roi`, `ai_response` (JSONB).

#### `course_registrations`
Manages enrollments for courses.
- **RLS**: `Enabled` (Secure user data).
- **Key Columns**: `event_id` (FK to `events`), `email`, `status`.
- **Status Enum**: `pending_email_verification`, `pending_payment`, `confirmed`.

#### `events` (NEW)
Central catalog of all Workshops, Courses, and Corporate offerings.
- **RLS**: `Enabled` (Public Read).
- **Key Columns**: `slug` (Unique Identifier), `type` (Enum: `workshop`, `online`, `corporate`, `tec_saltillo`), `price_config` (JSON).

---

## 3. Academy Architecture (Standardized)

We use a **Server-Side Registration Flow** to ensure data integrity and trigger 3rd party integrations securely.

**Flow:**
1.  **Frontend**: Submits to `/api/academy/register` (uses `eventSlug`).
2.  **API**:
    - Resolves `eventSlug` -> `event_id`.
    - Checks `capacity` in `events` table.
    - Inserts into `course_registrations`.
3.  **Integrations**:
    - **Google Calendar**: Creates an event via `lib/google/calendar-actions.ts`.
    - **Resend**: Sends HTML confirmation via `lib/emails/notifications.ts`.

---

## 3. Storage

**Bucket**: `portfolio-assets` (Public)
- **Usage**: Serves images for the portfolio and blog.
- **Access**: Publicly readable. Admin write-only.

---

## 4. Authentication (SSR Pattern)

We use the `@supabase/ssr` package to handle cookies automatically in the App Router.

### Client Component Usage (`lib/supabase/client.ts`)
Use inside `useEffect` or event handlers.
```typescript
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();
```

### Server Component Usage (`lib/supabase/server.ts`)
Use inside `page.tsx` or `layout.tsx`.
```typescript
import { createClient } from '@/lib/supabase/server';
const supabase = await createClient();
```

### Admin Access
For API routes that need to bypass RLS (e.g., cron jobs or system updates), initialize with the **Service Role Key** manually, NOT using the helper functions above.

---

## 5. RLS & Security Policy
- **Public Tables**: `contact_messages` and `roi_calculations` generally allow INSERT to `anon` role but restrict SELECT/UPDATE.
- **Private Tables**: `app_config` (if exists) and `course_registrations` are strictly protected.

## 6. How to Extend
To add a new feature:
1.  Create a migration file in `supabase/migrations`.
2.  Enable RLS immediately (`ALTER TABLE x ENABLE ROW LEVEL SECURITY`).
3.  Add policies for `anon` if public access is needed.
4.  Run `supabase gen types typescript --project-id ...` to update `types/supabase.ts`.
