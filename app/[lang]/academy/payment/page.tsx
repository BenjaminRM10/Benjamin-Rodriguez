'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2, AlertCircle } from 'lucide-react';

export default function PaymentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading');
    const [message, setMessage] = useState('Initializing secure payment...');
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const initPayment = async () => {
            const registrationId = searchParams.get('registrationId');
            if (!registrationId) {
                setStatus('error');
                setMessage('Missing registration ID.');
                return;
            }

            try {
                const supabase = createClient();
                const { data: registration, error } = await supabase
                    .from('course_registrations')
                    .select('*')
                    .eq('id', registrationId)
                    .single();

                if (error || !registration) {
                    throw new Error('Registration not found.');
                }

                // If already confirmed, skip payment
                if (registration.status === 'confirmed') {
                    router.push(`/academy/success?registrationId=${registrationId}`);
                    return;
                }

                // Determine types for Stripe
                let registrationType = 'public-workshop';
                // If it's online individual
                if ((registration.attendee_type as string) === 'online_individual') {
                    registrationType = 'online';
                }

                let ticketType = 'professional';
                if ((registration.attendee_type as string) === 'student' || (registration.attendee_type as string) === 'student_tec') {
                    ticketType = 'student';
                }

                // Create Checkout Session
                const response = await fetch('/api/stripe/create-checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        registrationId,
                        registrationType,
                        ticketType,
                        attendees: 1, // Default to 1 for this flow (usually individual verification)
                        customerEmail: registration.email,
                        eventDate: registration.event_date
                    })
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Payment initialization failed');
                }

                if (result.url) {
                    setStatus('redirecting');
                    setMessage('Redirecting to Stripe...');
                    window.location.href = result.url;
                } else {
                    throw new Error('No payment URL received');
                }

            } catch (err: any) {
                console.error("Payment Page Error:", err);
                setStatus('error');
                setMessage(err.message || 'An error occurred while setting up payment.');
            }
        };

        initPayment();
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#050816] text-slate-200 p-4">
            <div className="text-center p-8 rounded-2xl bg-slate-900/50 border border-slate-800 max-w-md w-full">
                {status !== 'error' ? (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
                        <h2 className="text-xl font-bold text-white">Payment Gateway</h2>
                        <p className="text-slate-400">{message}</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                            <AlertCircle className="w-6 h-6 text-red-500" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Action Failed</h2>
                        <p className="text-red-400 text-sm">{message}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white text-sm transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
