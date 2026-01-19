'use client';

import { ContactForm } from '@/components/forms/ContactForm';
import { CalendarBooking } from '@/components/modals/CalendarBooking';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Github, Linkedin, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function Contact({ lang = 'en' }: { lang?: string }) {

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('contacto@appcreatorbr.com');
        toast.success('Email copied to clipboard!');
    };

    const socialLinks = [
        {
            name: 'LinkedIn',
            icon: Linkedin,
            href: 'https://www.linkedin.com/in/alejandro-benjamin-rodriguez-mares-20b871236/',
            color: 'text-blue-500',
            bg: 'bg-blue-500/10'
        },
        {
            name: 'GitHub',
            icon: Github,
            href: 'https://github.com/BenjaminRM10',
            color: 'text-white',
            bg: 'bg-white/10'
        }
    ];

    return (
        <section className="pb-24 pt-0 relative overflow-hidden" id="contact">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[#0a0e27]">
                <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="container relative mx-auto px-4 z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4 pb-2"
                    >
                        Let's Build Something Amazing
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        Ready to automate your workflow, launch a new project, or just say hi?
                        Get in touch and let's make it happen.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">

                    {/* Column 1: Direct Contact & Social (4 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-4 space-y-8"
                    >
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white">Direct Contact</h3>

                            {/* WhatsApp - Standardized */}
                            <a
                                href="https://wa.me/528661479075?text=Hola%20Alejandro,%20me%20gustaría%20conocer%20más%20sobre%20tus%20servicios"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group cursor-pointer p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-green-500/30 transition-all block"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                        <MessageCircle className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="block text-sm text-slate-400">WhatsApp Me</span>
                                        <span className="block font-medium text-white truncate group-hover:text-green-400 transition-colors">
                                            Instant Response
                                        </span>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                                </div>
                            </a>

                            {/* Email - Standardized */}
                            <a
                                href="mailto:contacto@appcreatorbr.com"
                                className="group cursor-pointer p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all block"
                                onClick={(e) => {
                                    handleCopyEmail();
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="block text-sm text-slate-400">Email Me</span>
                                        <span className="block font-medium text-white truncate group-hover:text-purple-300 transition-colors">
                                            contacto@appcreatorbr.com
                                        </span>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                                </div>
                            </a>

                            {/* Calendar Booking */}
                            <CalendarBooking />

                        </div>

                        <div className="space-y-6 pt-8 border-t border-white/10">
                            <h3 className="text-xl font-semibold text-white">Connect</h3>

                            <div className="flex gap-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-3 rounded-lg border border-white/10 transition-all hover:scale-110 ${social.bg} hover:border-white/20`}
                                    >
                                        <social.icon className={`w-5 h-5 ${social.color}`} />
                                    </a>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 text-slate-400">
                                <MapPin className="w-4 h-4 text-slate-500" />
                                <span>Saltillo, Coahuila, Mexico</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Open to opportunities worldwide (Remote)
                            </div>
                        </div>
                    </motion.div>

                    {/* Column 2: Form (8 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-8"
                    >
                        <ContactForm />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
