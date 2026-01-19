'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { createCalendarEvent } from '@/lib/google-calendar';

export default function VerifyCallbackPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [message, setMessage] = useState('Verificando tu email...');

    useEffect(() => {
        const verifyAndUpdateRegistration = async () => {
            const supabase = createClient();
            const registrationId = searchParams.get('registrationId');

            // Verificar que el usuario está autenticado (el magic link ya lo hizo)
            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
                setStatus('error');
                setMessage('No pudimos verificar tu email. Intenta de nuevo.');
                return;
            }

            if (!registrationId) {
                setStatus('error');
                setMessage('Registro no encontrado.');
                return;
            }

            // Obtener el registro para verificar el tipo de evento
            const { data: registration, error: regError } = await supabase
                .from('course_registrations')
                .select('*')
                .eq('id', registrationId)
                .single();

            if (regError || !registration) {
                setStatus('error');
                setMessage('Registro no encontrado.');
                return;
            }

            // Determinar el nuevo status basado en el tipo de evento
            const isTecSaltilloFree =
                registration.event_date === '2026-01-24' &&
                user.email?.endsWith('@saltillo.tecnm.mx');

            const newStatus = isTecSaltilloFree ? 'confirmed' : 'pending_payment';

            // Actualizar el registro
            const { error: updateError } = await supabase
                .from('course_registrations')
                .update({
                    status: newStatus,
                    email_verified_at: new Date().toISOString()
                })
                .eq('id', registrationId);

            if (updateError) {
                setStatus('error');
                setMessage('Error al actualizar tu registro.');
                return;
            }

            setStatus('success');

            if (isTecSaltilloFree) {
                // Create Calendar Event for free confirmed event
                await createCalendarEvent({
                    ...registration,
                    phone: registration.phone || undefined,
                    event_date: registration.event_date || '',
                    status: registration.status || 'confirmed'
                });
                setMessage('¡Registro confirmado! Tu lugar está asegurado para el evento del 24 de enero.');
                // Redirigir a página de éxito después de 3 segundos
                setTimeout(() => {
                    router.push(`/academy/success?registrationId=${registrationId}`);
                }, 3000);
            } else {
                setMessage('Email verificado. Procede al pago para confirmar tu lugar.');
                // Redirigir a página de pago después de 3 segundos
                setTimeout(() => {
                    router.push(`/academy/payment?registrationId=${registrationId}`);
                }, 3000);
            }
        };

        verifyAndUpdateRegistration();
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0e27]">
            <div className="text-center p-8 rounded-2xl bg-slate-900/50 border border-slate-800 max-w-md">
                {status === 'verifying' && (
                    <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
                )}
                {status === 'success' && (
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                )}
                {status === 'error' && (
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                )}
                <p className="text-white text-lg">{message}</p>
            </div>
        </div>
    );
}
