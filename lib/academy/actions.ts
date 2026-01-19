import { createClient } from '@supabase/supabase-js';
import { createCalendarEvent } from '@/lib/google/calendar-actions';
import { sendEmail, getEmailTemplate } from '@/lib/emails/notifications';
import { Database } from '@/types/supabase';

// Initialize Admin Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey);

interface RegistrationPayload {
    eventId: string;
    fullName: string;
    email: string;
    phone: string;
    attendeeType: Database['public']['Enums']['course_attendee_type'];
}

export async function registerForEvent(payload: RegistrationPayload) {
    const { eventId, fullName, email, phone, attendeeType } = payload;

    // 1. Fetch Event Details
    const { data: event, error: eventError } = await supabaseAdmin
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

    if (eventError || !event) {
        throw new Error('Event not found');
    }

    // 2. Check Capacity (Simple check, concurrency ignored for now)
    const { count } = await supabaseAdmin
        .from('course_registrations')
        .select('*', { count: 'exact', head: true })
        .eq('event_id', eventId)
        .eq('status', 'confirmed');

    if (event.capacity && (count || 0) >= event.capacity) {
        throw new Error('Event is full');
    }

    // 3. Create Registration
    const { data: registration, error: regError } = await supabaseAdmin
        .from('course_registrations')
        .insert({
            event_id: eventId,
            course_id: event.slug, // Using event slug as course_id for now
            full_name: fullName,
            email,
            phone,
            attendee_type: attendeeType,
            status: 'pending_email_verification', // Default safety
            event_date: event.start_date, // Legacy support
        })
        .select()
        .single();

    if (regError) throw new Error(regError.message);

    // 4. Workflow based on Event Type
    if (event.type === 'tec_saltillo') {
        // Free Event - Auto Confirm
        await supabaseAdmin
            .from('course_registrations')
            .update({ status: 'confirmed' })
            .eq('id', registration.id!);

        // Calendar Invite
        await createCalendarEvent({
            summary: event.title,
            description: `Registro confirmado para ${event.title}.`,
            startTime: event.start_date,
            endTime: event.end_date,
            attendees: [email, 'contacto@appcreatorbr.com'],
            location: event.location || 'Tec Saltillo',
        });

        // Confirmation Email
        const emailHtml = getEmailTemplate(
            '¡Registro Confirmado!',
            `<p>Hola ${fullName},</p><p>Tu lugar en <strong>${event.title}</strong> está asegurado.</p><p>Te hemos enviado una invitación de Google Calendar con los detalles.</p>`,
        );
        await sendEmail({ to: email, subject: 'Confirmación de Registro', html: emailHtml });

        return { success: true, status: 'confirmed' };
    }

    // Default flow
    return { success: true, status: 'pending' };
}
