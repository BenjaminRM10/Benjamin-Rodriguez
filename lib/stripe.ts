import Stripe from 'stripe';
import { getCachedEnvVar } from '@/lib/config/env';

/**
 * Async initialization of Stripe client using secure keys from Supabase key store.
 * Do NOT use process.env.STRIPE_SECRET_KEY directly.
 */
export const getStripeServerClient = async () => {
    // 1. Fetch encrypted key from Supabase (or cache)
    const apiKey = await getCachedEnvVar('STRIPE_SECRET_KEY');

    if (!apiKey) {
        throw new Error("Missing STRIPE_SECRET_KEY in database config. Please ensure it is set in 'app_config' table.");
    }

    // 2. Initialize and return client
    return new Stripe(apiKey, {
        apiVersion: '2025-12-15.clover' as any,
        appInfo: {
            name: 'Benjamin Rodriguez Portfolio',
            version: '1.0.0'
        }
    });
};

// Tipos de registro
type RegistrationType = 'corporate' | 'tec-saltillo' | 'public-workshop' | 'online';
type TicketType = 'student' | 'professional';

// ============ FUNCIONES DE PRECIOS ============

// Corporate Training (presencial)
export const getCorporatePrice = (attendees: number): number => {
    const prices: Record<number, number> = {
        5: 17500,
        6: 19000,
        7: 20500,
        8: 22000,
        9: 23500,
        10: 25000,
        11: 26500,
        12: 28000
    };
    return prices[attendees] || 28000;
};

// Public Workshop - Estudiante (presencial)
export const getStudentWorkshopPrice = (attendees: number): number => {
    if (attendees >= 11) return 860 * attendees;
    if (attendees >= 9) return 920 * attendees;
    if (attendees >= 7) return 980 * attendees;
    if (attendees >= 5) return 1050 * attendees;
    return 1150 * attendees;
};

// Public Workshop - Profesional (presencial)
export const getProfessionalWorkshopPrice = (attendees: number): number => {
    if (attendees >= 11) return 2200 * attendees;
    if (attendees >= 9) return 2300 * attendees;
    if (attendees >= 7) return 2500 * attendees;
    if (attendees >= 5) return 2700 * attendees;
    return 2950 * attendees;
};

// Online - Estudiante
export const getStudentOnlinePrice = (attendees: number): number => {
    if (attendees >= 9) return 850 * attendees;
    if (attendees >= 7) return 900 * attendees;
    if (attendees >= 5) return 950 * attendees;
    if (attendees >= 2) return 1000 * attendees;
    return 1035; // individual
};

// Online - Profesional
export const getProfessionalOnlinePrice = (attendees: number): number => {
    if (attendees >= 9) return 2100 * attendees;
    if (attendees >= 7) return 2200 * attendees;
    if (attendees >= 5) return 2350 * attendees;
    if (attendees >= 2) return 2500 * attendees;
    return 2655; // individual
};

// ============ FUNCIÓN PRINCIPAL ============

export const calculatePrice = (
    registrationType: RegistrationType,
    ticketType: TicketType,
    attendees: number
): number => {
    // Tec Saltillo es GRATIS
    if (registrationType === 'tec-saltillo') return 0;

    // Corporate
    if (registrationType === 'corporate') {
        return getCorporatePrice(attendees);
    }

    // Public Workshop (presencial)
    if (registrationType === 'public-workshop') {
        return ticketType === 'student'
            ? getStudentWorkshopPrice(attendees)
            : getProfessionalWorkshopPrice(attendees);
    }

    // Online
    if (registrationType === 'online') {
        return ticketType === 'student'
            ? getStudentOnlinePrice(attendees)
            : getProfessionalOnlinePrice(attendees);
    }

    return 0;
};

// ============ CHECKOUT SESSION ============

interface CreateCheckoutParams {
    registrationId: string;
    registrationType: RegistrationType;
    ticketType: TicketType;
    attendees: number;
    customerEmail: string;
    eventDate: string;
}

export const createCheckoutSession = async (params: CreateCheckoutParams) => {
    const { registrationId, registrationType, ticketType, attendees, customerEmail, eventDate } = params;

    const totalPrice = calculatePrice(registrationType, ticketType, attendees);

    // No crear checkout si es gratis
    if (totalPrice === 0) {
        throw new Error('This event is free, no payment required');
    }

    // Get Async Client
    const stripe = await getStripeServerClient();

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'mxn',
                    product_data: {
                        name: `AI Engineering Course - ${registrationType}`,
                        description: `${attendees} attendee(s) - ${eventDate} - ${ticketType}`,
                    },
                    unit_amount: totalPrice * 100, // Stripe usa centavos
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        customer_email: customerEmail,
        metadata: {
            registrationId,
            registrationType,
            ticketType,
            attendees: attendees.toString(),
            eventDate,
        },
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/academy/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/academy?cancelled=true`,
    });

    return session;
};
