# Email Notification Guide (Resend)

> **Context**: All application emails are sent via **Resend** using the `contacto@appcreatorbr.com` domain. This ensures high deliverability and professional branding.

## 1. Prerequisites Setup

To send emails, you need an authenticated Resend client.

**Required Environment Variable**:
- `RESEND_API_KEY`: The API key from your Resend dashboard.

**Identity**:
- **From Address**: `Benjamin Rodriguez <contacto@appcreatorbr.com>` or `Portfolio <contacto@appcreatorbr.com>`
- **Reply-To**: Usually the user's email (for contact forms) or Admin email (for notifications to user).

---

## 2. Basic Implementation

Use the `resend` SDK in your API routes (Server-Side only).

```typescript
import { Resend } from 'resend';

export async function sendEmail({ to, subject, html }) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: 'Benjamin Rodriguez <contacto@appcreatorbr.com>',
    to: to, // e.g., 'client@email.com'
    subject: subject,
    html: html,
  });

  if (error) {
    console.error('Email Error:', error);
    throw new Error('Failed to send email');
  }

  return data;
}
```

---

## 3. Beautiful & Simple HTML Template

We use a "Premium Minimalist" design. It behaves well in Gmail, Outlook, and Apple Mail.

**Key Design Traits:**
- Single Column.
- San Serif Fonts (System defaults).
- Subtle background (off-white).
- Card-style container.
- Clean Call-to-Action (if needed).

### Reuse this Template Builder:

```typescript
export const getEmailTemplate = (title: string, bodyContent: string, ctaLink?: string, ctaText?: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #334155; margin: 0; padding: 0; background-color: #f8fafc; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0; }
    .header { background: #0a0e27; padding: 32px; text-align: center; }
    .header h1 { color: #f8fafc; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px; }
    .content { padding: 40px 32px; }
    .cta-button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; margin-top: 24px; }
    .footer { background: #f1f5f9; padding: 24px; text-align: center; font-size: 12px; color: #64748b; }
    .footer a { color: #3b82f6; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Benjamin Rodríguez</h1>
    </div>
    <div class="content">
      <h2 style="margin-top: 0; color: #1e293b; font-size: 20px;">${title}</h2>
      <div style="font-size: 16px;">
        ${bodyContent}
      </div>
      ${ctaLink ? `<a href="${ctaLink}" class="cta-button">${ctaText}</a>` : ''}
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Benjamin Rodríguez. All rights reserved.</p>
      <p>Saltillo, Coahuila, Mexico</p>
    </div>
  </div>
</body>
</html>
`;
```

### Usage Example:
```typescript
const html = getEmailTemplate(
  "Welcome to Premium", 
  "<p>Thank you for subscribing. You now have full access to all AI automation tools.</p>",
  "https://appcreatorbr.com/dashboard",
  "Go to Dashboard"
);
```

---

## 4. When to Use this Skill

- **Contact Form Confirmations** ("We received your message").
- **System Alerts** ("Your long-running automation finished").
- **Onboarding** ("Welcome! Here are some tips").
- **NOT for Meetings**: Use Google Calendar invites for that (see `GOOGLE_CALENDAR_INTEGRATION.md`).
