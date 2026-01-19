import { Resend } from 'resend';
import { getCachedEnvVar } from '@/lib/config/env';

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

/**
 * Sends an email using Resend.
 * @param payload - The email details (to, subject, html).
 */
export async function sendEmail({ to, subject, html }: EmailPayload) {
  // 1. Fetch API Key securely
  const apiKey = await getCachedEnvVar('RESEND_API_KEY');

  if (!apiKey) {
    console.warn("RESEND_API_KEY is missing/null in configuration. Email not sent.");
    return { error: "Missing Resend API Key" };
  }

  // 2. Initialize Resend Client dynamically
  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: 'App Creator <contacto@appcreatorbr.com>',
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Resend Error:', error);
      throw new Error(error.message);
    }

    return { data };
  } catch (error) {
    console.error('Email Sending Failed:', error);
    return { error };
  }
}

/**
 * Generates the standardized HTML template for emails.
 */
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
