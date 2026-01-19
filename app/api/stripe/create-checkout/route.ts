import { NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            registrationId,
            registrationType,
            ticketType,
            attendees,
            customerEmail,
            eventDate
        } = body;

        // Validaciones básicas
        if (!registrationId || !registrationType || !attendees || !customerEmail || !eventDate) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        // Verificar que el registro existe
        const { data: registration, error: fetchError } = await supabase
            .from('course_registrations')
            .select('*')
            .eq('id', registrationId)
            .single();

        if (fetchError || !registration) {
            return NextResponse.json(
                { error: 'Registration not found' },
                { status: 404 }
            );
        }

        // Verificar que no esté ya confirmado
        if (registration.status === 'confirmed') {
            return NextResponse.json(
                { error: 'Registration already confirmed' },
                { status: 400 }
            );
        }

        // Crear sesión de Stripe Checkout
        const session = await createCheckoutSession({
            registrationId,
            registrationType,
            ticketType: ticketType || 'professional',
            attendees: Number(attendees),
            customerEmail,
            eventDate,
        });

        if (!session.url) {
            throw new Error('Failed to create checkout session');
        }

        // Actualizar registro a pending_payment
        await supabase
            .from('course_registrations')
            .update({ status: 'pending_payment' })
            .eq('id', registrationId);

        return NextResponse.json({ url: session.url });

    } catch (error: any) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json(
            { error: error.message || 'Error creating checkout session' },
            { status: 500 }
        );
    }
}
