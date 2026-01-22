import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { createClient as createServerSupabaseClient } from '@/lib/supabase/server';
import { createCheckoutSession } from '@/lib/stripe';

// Initialize Admin Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Input Validation
const registrationSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    eventDate: z.string(),
    attendeeType: z.enum(['student', 'professional', 'company', 'student_tec', 'online_individual']),
    eventType: z.string().optional().default('public-workshop'), // 'corporate', 'tec-saltillo', 'public-workshop', 'online'
    attendees: z.number().optional().default(1),
    university: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = registrationSchema.parse(body);

        // 1. Validation (Institutional Email)
        if (data.attendeeType === 'student' || data.attendeeType === 'student_tec') {
            const domain = data.email.split('@')[1];
            if (data.attendeeType === 'student_tec') {
                if (!domain.endsWith('saltillo.tecnm.mx')) {
                    return NextResponse.json({ error: 'Event reserved for @saltillo.tecnm.mx students.' }, { status: 400 });
                }
            } else {
                const validDomains = ['tecnm.mx', 'uadec.edu.mx', 'saltillo.tecnm.mx', '.edu', '.edu.mx'];
                const isInstitutional = validDomains.some(d => domain.includes(d) || domain.endsWith(d));
                if (!isInstitutional) {
                    return NextResponse.json({ error: 'Invalid institutional email for student pricing.' }, { status: 400 });
                }
            }
        }

        // 2. Duplicate Check
        const { data: existing } = await supabaseAdmin
            .from('course_registrations')
            .select('status')
            .eq('email', data.email)
            .eq('event_date', data.eventDate)
            .in('status', ['pending_email_verification', 'pending_payment', 'confirmed'])
            .maybeSingle();

        if (existing) {
            return NextResponse.json(
                { error: `You already have a registration with status: ${existing.status}` },
                { status: 409 }
            );
        }

        // 2.5 Server-Side Capacity Check (Strict)
        // Only for public/student events that have limits. Corporate/Online Individual might be exempt or have different logic.
        // Assuming limit applies to the specific `eventDate`
        if (data.eventType !== 'corporate' && data.eventType !== 'online_individual') {
            const CAPACITY_LIMIT = 12;

            const { count, error: countError } = await supabaseAdmin
                .from('course_registrations')
                .select('*', { count: 'exact', head: true })
                .eq('event_date', data.eventDate)
                .in('status', ['confirmed', 'pending_payment', 'pending_email_verification']);

            if (countError) {
                console.error('Capacity Check Error:', countError);
                return NextResponse.json({ error: 'Failed to verify availability' }, { status: 500 });
            }

            const currentCount = count || 0;
            // Check if adding this request's attendees would overflow
            if ((currentCount + (data.attendees || 1)) > CAPACITY_LIMIT) {
                return NextResponse.json(
                    { error: `Event is full. Only ${Math.max(0, CAPACITY_LIMIT - currentCount)} spots remaining.` },
                    { status: 400 }
                );
            }
        }

        // 3. Create Registration Record
        const verificationToken = crypto.randomUUID();

        // Determine initial status
        let initialStatus = 'pending_payment';
        // Students verify email first (unless it's Tec Saltillo which might have different flow, keeping generic student flow consistent)
        if (data.attendeeType === 'student' || data.attendeeType === 'student_tec') {
            initialStatus = 'pending_email_verification';
        }

        const { data: record, error: dbError } = await supabaseAdmin
            .from('course_registrations')
            .insert({
                course_id: 'ai-engineering-2026',
                event_date: data.eventDate,
                full_name: data.fullName,
                email: data.email,
                phone: data.phone,
                attendee_type: data.attendeeType,
                status: initialStatus,
                email_verification_token: verificationToken
            })
            .select()
            .single();

        if (dbError || !record) {
            console.error('DB Error:', dbError);
            return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 });
        }

        // 4. Handle Flow based on Type

        // A) Students (Free or Paid? If Tec -> Free/Verify. If Public -> Paid/Verify)
        // Actually, public students PAY ($860). So they need verify -> THEN pay?
        // OR Pay -> Verify?
        // Providing immediate payment link for students might bypass verification if not careful.
        // Current logic: Send Magic Link first.

        if (data.attendeeType === 'student' || data.attendeeType === 'student_tec') {
            // Easter Egg / Test Mode: Redirect 'test@saltillo.tecnm.mx' email to admin
            const emailToSendTo = data.email === 'test@saltillo.tecnm.mx'
                ? 'benjaminrm14032018@gmail.com'
                : data.email;

            // Robust Base URL detection (Allows Localhost for Testing)
            const getBaseUrl = () => {
                if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
                if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
                return 'https://appcreatorbr.com';
            };

            const siteUrl = getBaseUrl();
            // Fix: Add '/es' locale prefix because page is under [lang]
            const callbackUrl = `${siteUrl}/api/auth/callback?next=${encodeURIComponent(`/es/academy/verify-callback?registrationId=${record.id}`)}`;

            // 5. Send Verification Email via Admin Invite (Robust for Cross-Device)
            // We use inviteUserByEmail because it generates a link with a `token_hash` that works 
            // even if the user opens the email on a different device (unlike PKCE which requires the same browser cookie).

            const { error: authError } = await supabaseAdmin.auth.admin.inviteUserByEmail(emailToSendTo, {
                data: {
                    full_name: data.fullName,
                    registration_id: record.id,
                    attendee_type: data.attendeeType
                },
                redirectTo: callbackUrl
            });

            if (authError) {
                console.error('Auth Error:', authError);
                await supabaseAdmin.from('course_registrations').delete().eq('id', record.id);
                return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
            }

            return NextResponse.json({
                success: true,
                status: 'pending_email_verification',
                message: 'Verification email sent'
            });

        }

        // B) Professionals / Online (Paid Checkouts)
        else if (data.attendeeType === 'professional' || data.attendeeType === 'online_individual') {

            try {
                // Map to Stripe Logic parameters
                let regType: any = 'public-workshop';
                if (data.eventType?.includes('online')) regType = 'online';

                const session = await createCheckoutSession({
                    registrationId: record.id,
                    registrationType: regType,
                    ticketType: 'professional', // mapped from attendeeType
                    attendees: data.attendees || 1,
                    customerEmail: data.email,
                    eventDate: data.eventDate
                });

                if (!session || !session.url) {
                    throw new Error('Failed to generate checkout url');
                }

                return NextResponse.json({
                    success: true,
                    status: 'pending_payment',
                    paymentUrl: session.url,
                    registrationId: record.id
                });
            } catch (stripeError: any) {
                console.error('Stripe Error:', stripeError);
                // Rollback
                await supabaseAdmin.from('course_registrations').delete().eq('id', record.id);
                return NextResponse.json({ error: 'Payment initialization failed: ' + stripeError.message }, { status: 500 });
            }

        } else {
            // Company
            return NextResponse.json({
                success: true,
                status: 'pending_contact',
                message: 'We will contact you shortly.'
            });
        }

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
