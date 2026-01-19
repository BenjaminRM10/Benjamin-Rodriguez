import { CheckCircle, Calendar, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GetReadyChecklist } from '@/components/sections/GetReadyChecklist';

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-[#0a0e27] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">

            {/* 1. Confirmation Section */}
            <div className="max-w-3xl w-full text-center mb-12">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-green-500/50">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                </div>

                <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
                    ¡Registro Confirmado!
                </h1>
                <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
                    Tu lugar ha sido reservado exitosamente. Hemos enviado los detalles de acceso a tu correo electrónico.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-4xl mx-auto">
                    <div className="flex items-start gap-3 p-4 bg-slate-900/40 rounded-xl border border-slate-800/60 backdrop-blur-sm hover:border-slate-700 transition-colors">
                        <Mail className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-white">Revisa tu email</p>
                            <p className="text-xs text-slate-500">
                                Busca el correo de confirmación con tu ticket.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-900/40 rounded-xl border border-slate-800/60 backdrop-blur-sm hover:border-slate-700 transition-colors">
                        <Calendar className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-white">Agenda la fecha</p>
                            <p className="text-xs text-slate-500">
                                Bloquea el horario en tu calendario para asistir.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-900/40 rounded-xl border border-slate-800/60 backdrop-blur-sm hover:border-slate-700 transition-colors">
                        <FileText className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-white">Diploma oficial</p>
                            <p className="text-xs text-slate-500">
                                Al finalizar recibirás tu certificación.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Get Ready Section (Integrated) */}
            <div className="w-full max-w-3xl mb-12">
                <div className="p-1 mb-8 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/20">
                    <div className="bg-[#0a0e27]/80 backdrop-blur-xl rounded-xl p-6 md:p-8 text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">Prepárate para el curso</h2>
                        <p className="text-slate-400 text-sm mb-6">
                            Es vital que completes estos pasos <strong>antes</strong> de la sesión para aprovechar el tiempo al máximo.
                        </p>
                        <GetReadyChecklist />
                    </div>
                </div>
            </div>

            {/* 3. Action Buttons */}
            <div className="flex flex-col gap-3 w-full max-w-sm">
                <Button asChild variant="outline" className="w-full border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 h-11">
                    <Link href="/">
                        Ir al inicio
                    </Link>
                </Button>
                <Button asChild className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border-0 h-11">
                    <Link href="/academy">
                        Volver a Academy
                    </Link>
                </Button>
            </div>

        </div>
    );
}
