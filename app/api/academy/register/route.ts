import { NextResponse } from 'next/server';
import { registerForEvent } from '@/lib/academy/actions';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Initialize Admin Client for Route
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

const registrationSchema = z.object({
    eventSlug: z.string().min(1),
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    attendeeType: z.enum(['student', 'professional', 'company']),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Validate Input
        const { eventSlug, ...payloadData } = registrationSchema.parse(body);

        // 2. Resolve Event Slog
        const { data: event, error } = await supabaseAdmin
            .from('events')
            .select('id')
            .eq('slug', eventSlug)
            .single();

        if (error || !event) {
            throw new Error(`Event not found: ${eventSlug}`);
        }

        // 3. Execute Business Logic
        const result = await registerForEvent({
            eventId: event.id,
            ...payloadData
        });

        return NextResponse.json(result);

    } catch (error: any) {
        console.error('Academy Registration Error:', error);
        return NextResponse.json(
            { error: error.message || 'Registration failed' },
            { status: 400 }
        );
    }
}
