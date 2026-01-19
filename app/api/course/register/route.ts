import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'; // Use server-side Supabase client
import { z } from 'zod';

// Initialize Admin Client for service role operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Payment Links
const STRIPE_LINKS = {
    professional: 'https://buy.stripe.com/3cI28qewHcCL8ac4TZ', // Professional $2,950 MXN
    student: 'https://buy.stripe.com/14AaEW0FRfOX3TW0DJ'     // Student $1,150 MXN 
};

// Input Validation
const registrationSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    eventDate: z.string(),
    attendeeType: z.enum(['student', 'professional', 'company', 'student_tec', 'online_individual']),
    university: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = registrationSchema.parse(body);

        // 1. Check if email is institutional (Double check server-side)
        if (data.attendeeType === 'student') {
            const domain = data.email.split('@')[1];
            const validDomains = ['tecnm.mx', 'uadec.edu.mx', 'saltillo.tecnm.mx', '.edu', '.edu.mx'];
            const isInstitutional = validDomains.some(d => domain.includes(d) || domain.endsWith(d));

            if (!isInstitutional) {
                return NextResponse.json(
                    { error: 'Invalid institutional email for student pricing.' },
                    { status: 400 }
                );
            }
        }

        // 2. Create Registration Record
        // Generate a verification token (we'll use this as the password for the auth confirmation)
        const verificationToken = crypto.randomUUID();

        const { error: dbError } = await supabaseAdmin
            .from('course_registrations')
            .insert({
                course_id: 'ai-engineering-2026',
                event_date: data.eventDate,
                full_name: data.fullName,
                email: data.email,
                phone: data.phone,
                attendee_type: data.attendeeType,
                status: data.attendeeType === 'student' ? 'pending_email_verification' : 'pending_payment',
                email_verification_token: verificationToken
            });

        if (dbError) {
            console.error('DB Error:', dbError);
            return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 });
        }

        // 3. Handle specific flow
        if (data.attendeeType === 'student') {
            const { error: authError } = await supabaseAdmin.auth.admin.inviteUserByEmail(data.email, {
                data: { full_name: data.fullName, type: 'student_registration' },
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/academy?verified=true&email=${data.email}`
            });

            if (authError) console.error('Auth Error:', authError);

            return NextResponse.json({
                success: true,
                status: 'pending_email_verification'
            });

        } else if (data.attendeeType === 'student_tec') {
            // FREE EVENT - Direct Confirmation
            // Update status to confirmed immediately since it's free
            await supabaseAdmin
                .from('course_registrations')
                .update({ status: 'confirmed' })
                .eq('email', data.email)
                .eq('event_date', data.eventDate); // Ensure we target the specific row

            return NextResponse.json({
                success: true,
                status: 'confirmed',
                message: 'Registration Confirmed! See you at Tec Saltillo.'
            });

        } else if (data.attendeeType === 'professional') {
            return NextResponse.json({
                success: true,
                status: 'pending_payment',
                paymentUrl: STRIPE_LINKS.professional
            });

        } else if (data.attendeeType === 'online_individual') {
            return NextResponse.json({
                success: true,
                status: 'pending_payment',
                paymentUrl: STRIPE_LINKS.professional // Pro price for Online Individual
            });

        } else {
            // Company - Custom flow
            return NextResponse.json({
                success: true,
                status: 'pending_contact',
                message: 'We will contact you shortly for group arrangements.'
            });
        }

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
