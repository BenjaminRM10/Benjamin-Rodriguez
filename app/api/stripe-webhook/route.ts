import { headers } from 'next/headers';
import { getStripeServerClient } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { createCalendarEvent } from '@/lib/google/calendar-actions';
import { getCachedEnvVar } from '@/lib/config/env';
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
        console.error('Missing stripe-signature header');
        return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Initialize Admin Client
    const supabaseAdmin = createAdminClient();

    // Retrieve webhook secret securely
    const webhookSecret = await getCachedEnvVar('STRIPE_WEBHOOK_SECRET');

    if (!webhookSecret) {
        console.error('No webhook secret configured or decryption failed');
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    let event: Stripe.Event;

    try {
        const stripe = await getStripeServerClient();
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle checkout.session.completed
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        const {
            registrationId,
            registrationType,
            ticketType,
            attendees,
            eventDate
        } = session.metadata || {};

        if (!registrationId) {
            console.error('No registrationId in session metadata');
            return NextResponse.json({ error: 'Missing registrationId' }, { status: 400 });
        }

        try {
            // 1. Get current registration
            const { data: registration, error: fetchError } = await supabaseAdmin
                .from('course_registrations')
                .select('*')
                .eq('id', registrationId)
                .single();

            if (fetchError || !registration) {
                console.error('Registration not found:', registrationId);
                return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
            }

            // 2. Update registration to 'confirmed'
            const { error: updateError } = await supabaseAdmin
                .from('course_registrations')
                .update({
                    status: 'confirmed',
                    payment_id: session.id,
                    confirmed_at: new Date().toISOString(),
                })
                .eq('id', registrationId);

            if (updateError) {
                console.error('Error updating registration:', updateError);
                throw updateError;
            }

            // 3. Create Google Calendar event
            const finalEventDate = registration.event_date || eventDate;

            if (finalEventDate) {
                try {
                    // Pass the admin client to allow secret decryption inside the function if updated
                    await createCalendarEvent({
                        summary: `AI Engineering Course - ${registrationType} - ${registration.full_name}`,
                        description: `
Tipo: ${registrationType}
Ticket: ${ticketType}
Asistentes: ${attendees}
Email: ${registration.email}
Phone: ${registration.phone || 'N/A'}
Payment ID: ${session.id}
`.trim(),
                        startTime: finalEventDate,
                        endTime: new Date(new Date(finalEventDate).getTime() + 8 * 60 * 60 * 1000).toISOString(),
                        attendees: [registration.email, 'contacto@appcreatorbr.com'],
                        location: 'Vía Google Meet / Presencial',
                    }, supabaseAdmin); // Pass admin client

                    console.log('Calendar event created for:', registration.email);
                } catch (calendarError) {
                    console.error('Error creating calendar event (non-fatal):', calendarError);
                }
            } else {
                console.warn('No event date found for calendar invite');
            }

            console.log(`✅ Registration ${registrationId} confirmed successfully`);

        } catch (error) {
            console.error('Error processing webhook:', error);
            return NextResponse.json({ error: 'Error processing webhook' }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true }, { status: 200 });
}

// Config for Next.js App Router
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
