# 🤖 Agent Playbook & Skill Index

> **Welcome, Agent.** This document is your map to navigating this codebase. It documents the tools, services, and patterns you must use to build features correctly.
>
> 🚨 **CRITICAL PROTOCOL**: You **MUST** read this `agent.md` file before starting any task to ensure you are using the correct tools and patterns.
>
> ♻️ **LIVING DOCUMENTATION**: The `SKILLS/` directory (especially `CONTEXT.md`) is a living knowledge base. If you implement new features or architectural changes, you **MUST** update the relevant `.md` files or create new ones. Do not let the documentation drift from reality.

## 1. 🛠️ Critical Tools (MCP)

Acccess these tools via your `mcp_*` functions.

### A. Database & Auth: `@mcp:supabase-mcp-server:`
**Use for:**
- **Inspecting Schema**: `list_tables`, `execute_sql` (READ ONLY).
- **Managing Database**: `apply_migration` (DDL).
- **Checking Auth/Users**: `execute_sql` on `auth.users`.
- **Storage**: `execute_sql` on `storage.objects`.

**Documentation**: [SKILLS/SUPABASE.md](SKILLS/SUPABASE.md) (Read this first for Architecture & RLS).

### B. Payments: `@mcp:stripe:`
**Use for:**
- **Subscriptions**: `mcp_stripe_list_subscriptions`, `mcp_stripe_create_product`.
- **Invoicing**: `mcp_stripe_create_invoice`.
- **Customers**: `mcp_stripe_search_customers`.

**Note**: Always check `SKILLS/SECRETS_MANAGEMENT.md` to ensure your keys are correctly set in `.env.local`.

---

## 2. 🧠 Capabilities & Skills (How-To Guides)

Always read the specific `SKILLS/*.md` file before implementing related features.

| Feature | Doc File | Description |
| :--- | :--- | :--- |
| **Project Architecture** | [CONTEXT.md](SKILLS/CONTEXT.md) | **MUST READ**. The Single Source of Truth for tech stack, folder structure, and design system. |
| **Scheduler** | [GOOGLE_CALENDAR_INTEGRATION.md](SKILLS/GOOGLE_CALENDAR_INTEGRATION.md) | How to available slots, book meetings on the Admin's personal calendar, and send Google Meet invites. |
| **Emails** | [EMAIL_NOTIFICATIONS.md](SKILLS/EMAIL_NOTIFICATIONS.md) | How to send clean, branded HTML emails via **Resend**. Use this for notifications, *not* for calendar invites. |
| **Backend** | [SUPABASE.md](SKILLS/SUPABASE.md) | Detailed schema, RLS policies, and Auth (SSR) patterns. |
| **Academy** | [SUPABASE.md#3-academy-architecture-standardized](SKILLS/SUPABASE.md) | **MUST READ**. Standardized Server-Side flow for course registrations, Calendar, and Emails. |

---

## 3. 🚦 Decision Framework

### When to use what?

1.  **"I need to query data..."**
    - First, read [SKILLS/SUPABASE.md](SKILLS/SUPABASE.md).
    - Use `@supabase/ssr` in Server Components.
    - Use `mcp:supabase-mcp-server` to inspect the table structure if you are unsure.

2.  **"I need to schedule a meeting..."**
    - Read [SKILLS/GOOGLE_CALENDAR_INTEGRATION.md](SKILLS/GOOGLE_CALENDAR_INTEGRATION.md).
    - Reuse the logic in `/api/calendar/available-slots`.
    - **Do NOT** try to implement a custom calendar system from scratch.

3.  **"I need to notify the user..."**
    - **Is it a meeting?** -> Use Google Calendar's native invite (`sendUpdates: 'all'`).
    - **Is it a system alert/message?** -> Use Resend. Read [SKILLS/EMAIL_NOTIFICATIONS.md](SKILLS/EMAIL_NOTIFICATIONS.md) and copy the `getEmailTemplate` function.

4.  **"I need to charge money..."**
    - Use `@mcp:stripe`.
    - Create Products/Prices via the tool first, then implement the checkout flow.

---

## 4. 📝 Development Standards

- **Files**: All new documentation goes into `SKILLS/`.
- **Maintenance**: Update `SKILLS/CONTEXT.md` or other skill files if your changes affect the architecture.
- **Tasks**: Update `task.md` before starting work.
- **Commits**: Verify your work with `npm run dev` before finishing.

*If you are unsure about an implementation detail, check [CONTEXT.md](SKILLS/CONTEXT.md) first. It is the constitution of this project.*
