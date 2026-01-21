'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useSearchParams } from 'next/navigation';
import type { ContactTranslations } from '@/lib/i18n/types';

interface ContactFormProps {
    translations?: ContactTranslations['form'];
}

const defaultTranslations: ContactTranslations['form'] = {
    title: "Send a Message",
    name: "Name",
    namePlaceholder: "John Doe",
    email: "Email",
    emailPlaceholder: "john@example.com",
    phone: "Phone Number",
    phonePlaceholder: "+1 (555) 123-4567",
    company: "Company (Optional)",
    companyPlaceholder: "Your Company",
    subject: "Service",
    subjectPlaceholder: "Select a service",
    message: "Message",
    messagePlaceholder: "Tell me about your project...",
    submit: "Send Message",
    sending: "Sending...",
    success: "Message sent successfully! I'll get back to you soon.",
    error: "Something went wrong. Please try again.",
    validation: {
        nameRequired: "Name is required",
        emailRequired: "Email is required",
        emailInvalid: "Invalid email address",
        phoneRequired: "Phone number is required",
        phoneInvalid: "Please enter a valid phone number",
        messageRequired: "Message is required",
        messageMinLength: "Message must be at least 10 characters"
    }
};

const services = [
    'Recruiter / Hiring Opportunity',
    'Business Solution / Automation',
    'Academy / Training',
    'Other',
];

export function ContactForm({ translations }: ContactFormProps) {
    const t = translations ?? defaultTranslations;

    const formSchema = z.object({
        name: z.string().min(2, t.validation.nameRequired),
        email: z.string().email(t.validation.emailInvalid),
        company: z.string().optional(),
        service: z.string().min(1, 'Please select a service'),
        message: z.string().min(10, t.validation.messageMinLength),
    });
    type FormValues = z.infer<typeof formSchema>;

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const searchParams = useSearchParams();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            company: '',
            service: searchParams.get('service') || '',
            message: searchParams.get('message') || '',
        },
    });

    async function onSubmit(data: FormValues) {
        setStatus('submitting');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed to send message');

            setStatus('success');
            form.reset();
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    }

    return (
        <div className="relative p-6 md:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">{t.title}</h3>
                <p className="text-slate-400 mb-8">
                    {t.success.includes('!') ? "Fill out the form below and I'll get back to you within 24 hours." : "Llena el formulario y te responderé en 24 horas."}
                </p>

                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center justify-center py-12 text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                                <CheckCircle2 className="w-8 h-8 text-green-500" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">{t.success.split('!')[0]}!</h4>
                            <p className="text-slate-400 max-w-xs mx-auto mb-6">
                                {t.success}
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => setStatus('idle')}
                                className="border-white/10 hover:bg-white/5"
                            >
                                {t.submit}
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-slate-300">{t.name}</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={t.namePlaceholder} {...field} className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-slate-300">{t.email}</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={t.emailPlaceholder} {...field} className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="company"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-slate-300">{t.company}</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={t.companyPlaceholder} {...field} className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="service"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-slate-300">{t.subject}</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-blue-500/50">
                                                                <SelectValue placeholder={t.subjectPlaceholder} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                            {services.map((service) => (
                                                                <SelectItem key={service} value={service} className="focus:bg-white/10 focus:text-white">
                                                                    {service}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-slate-300">{t.message}</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder={t.messagePlaceholder}
                                                        className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50 min-h-[120px] resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {status === 'error' && (
                                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            {t.error}
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white h-12 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20"
                                        disabled={status === 'submitting'}
                                    >
                                        {status === 'submitting' ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                {t.sending}
                                            </>
                                        ) : (
                                            <>
                                                {t.submit}
                                                <Send className="w-4 h-4 ml-2" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
