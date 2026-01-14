import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { getCachedEnvVar } from '@/lib/config/env';

// Schema validation
const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    company: z.string().optional(),
    service: z.string().min(1, "Service is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Validate input
        const validatedData = contactSchema.parse(body);

        // 2. Initializing clients
        const supabase = await createClient();
        const resendKey = await getCachedEnvVar('RESEND_API_KEY');

        if (!resendKey) {
            console.error('RESEND_API_KEY is missing in app_config');
            return NextResponse.json(
                { error: 'Email service configuration missing' },
                { status: 503 }
            );
        }

        const resend = new Resend(resendKey);
        const ADMIN_EMAIL = 'contacto@appcreatorbr.com';

        // 3. Save to Supabase
        const { error: dbError } = await supabase
            .from('contact_messages')
            .insert({
                name: validatedData.name,
                email: validatedData.email,
                company: validatedData.company,
                service: validatedData.service,
                message: validatedData.message,
                source: 'contact_form'
            });

        if (dbError) {
            console.error('Supabase error:', dbError);
            return NextResponse.json(
                { error: 'Failed to save message' },
                { status: 500 }
            );
        }

        // 4. Send Notification to Admin (Alejandro)
        // We reply to the User's email to easily answer them
        await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Update this once domain is verified
            to: ADMIN_EMAIL,
            replyTo: validatedData.email,
            subject: `New Lead: ${validatedData.name} - ${validatedData.service}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Company:</strong> ${validatedData.company || 'N/A'}</p>
        <p><strong>Service:</strong> ${validatedData.service}</p>
        <h3>Message:</h3>
        <p>${validatedData.message}</p>
      `
        });

        // 5. Send Confirmation to User
        // We reply to 'contacto@appcreatorbr.com' as requested
        await resend.emails.send({
            from: 'Benjamin Rodriguez <onboarding@resend.dev>', // Update this once domain is verified
            to: validatedData.email,
            replyTo: ADMIN_EMAIL,
            subject: 'Got it! Thanks for reaching out',
            html: `
        <h2>Hi ${validatedData.name},</h2>
        <p>Thanks for getting in touch about <strong>${validatedData.service}</strong>.</p>
        <p>I've received your message and will get back to you within 24 hours.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>Benjamin Rodriguez</strong></p>
        <p>OPEX Engineer & Developer</p>
      `
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Contact API Error:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', details: (error as any).errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
