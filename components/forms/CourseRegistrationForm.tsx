import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, ChevronRight, X, AlertCircle } from "lucide-react";
import { getAvailableSlots, checkDateAvailability, getBusyDates } from "@/lib/google-calendar";


import { cn } from "@/lib/utils";
import { format, isSameDay, addDays } from "date-fns";
import { useRouter } from "next/navigation";

import { CalendarIcon, MapPin, Users } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CardTitle, CardDescription } from "@/components/ui/card";

// --- Props ---
interface CourseRegistrationFormProps {
    eventType: 'corporate' | 'tec-saltillo' | 'student' | 'online-group' | 'online-individual';
    eventDate?: Date;
    onSuccess: () => void;
    onCancel: () => void;
}

// --- Validation Schema ---
const createFormSchema = (eventType: CourseRegistrationFormProps['eventType']) => {
    return z.object({
        fullName: z.string().min(2, "Name must be at least 2 characters."),
        email: z.string().email("Invalid email address."),
        phone: z.string().optional(),
        attendeeType: z.enum(["student", "professional", "company"]),
        numberOfAttendees: z.number().optional(),
        preferredDate: z.date().optional(), // Changed to Date object
        studentProof: z.any().optional(),
        location: z.enum(["in-company", "appcreatorbr-office"]).optional(), // New field
    }).superRefine((data, ctx) => {
        // Tec Saltillo Validation
        if (eventType === 'tec-saltillo') {
            if (!data.email.endsWith('@saltillo.tecnm.mx')) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Must use an institutional email (@saltillo.tecnm.mx)",
                    path: ["email"],
                });
            }
        }

        // Student Validation (Now Peers Workshop with sub-types)
        if (eventType === 'student') {
            // We access specific sub-ticket type via data.attendeeType
            // If student -> institutional logic
            if (data.attendeeType === 'student') {
                const validDomains = ['.edu', '.edu.mx', '.tecnm.mx', '.unam.mx', '.ipn.mx', '.itesm.mx', '.tec.mx'];
                const isValid = validDomains.some(domain => data.email.endsWith(domain));

                if (!isValid) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "Must use a valid institutional email (.edu, .mx, .tec.mx, etc.) for Student rate.",
                        path: ["email"]
                    });
                }
            }
            // If professional -> no specific email validation needed beyond standard format
        }

        // Online Group Validation (Follows same rules as Peers Workshop for Students)
        if (eventType === 'online-group' && data.attendeeType === 'student') {
            const validDomains = ['.edu', '.edu.mx', '.tecnm.mx', '.unam.mx', '.ipn.mx', '.itesm.mx', '.tec.mx'];
            const isValid = validDomains.some(domain => data.email.endsWith(domain));

            if (!isValid) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Must use a valid institutional email (.edu, .mx, .tec.mx, etc.) for Student rate.",
                    path: ["email"]
                });
            }
        }

        // Online Group Date Validation
        if (eventType === 'online-group' && data.preferredDate) {
            const attendees = data.numberOfAttendees || 1;
            const day = data.preferredDate.getDay(); // 0 = Sun, 6 = Sat
            if (attendees === 1 && (day === 0 || day === 6)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Individual sessions available Monday to Friday only.",
                    path: ["preferredDate"]
                });
            }
        }

        // Corporate Validation
        if (eventType === 'corporate') {
            if (!data.numberOfAttendees || data.numberOfAttendees < 5) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Minimum 5 attendees required for corporate training.",
                    path: ["numberOfAttendees"],
                });
            }
        }

        // Private/Custom Date Validation
        if (eventType === 'corporate' || eventType === 'online-group' || (eventType === 'student' && !data.preferredDate)) {
            // Note: For student 'scheduled', preferredDate is set automatically. 
            // For 'custom', user must pick.
            if (eventType === 'student' && data.numberOfAttendees && data.numberOfAttendees < 5 && !data.preferredDate) {
                // Actually logic handled in UI, but good to have safety
            }
        }

        if ((eventType === 'corporate' || eventType === 'online-group') && !data.preferredDate) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please select a preferred date.",
                path: ["preferredDate"],
            });
        }


        // Corporate Location Validation
        if (eventType === 'corporate') {
            if (!data.location) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Please select a training location.",
                    path: ["location"],
                });
            }
        }
    });
};

export type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

// --- Constants & Helpers ---
// --- Constants & Helpers ---
const UPCOMING_WORKSHOPS = [
    new Date("2026-01-31T09:00:00"), // Jan 31, 9AM Local
    new Date("2026-02-07T09:00:00")  // Feb 7, 9AM Local
];

const getStudentGroupPrice = (attendees: number): number => {
    // Range $860 - $1150
    if (attendees >= 11) return 860;
    if (attendees >= 9) return 920;
    if (attendees >= 7) return 980;
    if (attendees >= 5) return 1050;
    return 1150; // 1-4 attendees
};

const getProfessionalPrice = (attendees: number): number => {
    // Range $2200 - $2950
    if (attendees >= 11) return 2200;
    if (attendees >= 9) return 2300;
    if (attendees >= 7) return 2500;
    if (attendees >= 5) return 2700;
    return 2950; // 1-4 attendees
};

// Online is ~10% off the Professional price (even for students, if the base is professional, 
// but prompt says "Online: Professional price - 10%". 
// Usually Online Student is cheaper than Online Professional.
// Assuming Online Student is Student Price - 10% and Online Pro is Pro Price - 10%
const getStudentOnlinePrice = (attendees: number): number => {
    return Math.floor(getStudentGroupPrice(attendees) * 0.9);
};

const getProfessionalOnlinePrice = (attendees: number): number => {
    return Math.floor(getProfessionalPrice(attendees) * 0.9);
};

// --- Component ---
export function CourseRegistrationForm({ eventType, eventDate, onSuccess, onCancel }: CourseRegistrationFormProps) {
    const router = useRouter();
    const [step, setStep] = useState<'form' | 'email-verification' | 'payment' | 'success'>('form');
    // Using form state for ticketType instead of local state to sync with validation
    const [studentDateOption, setStudentDateOption] = useState<'scheduled' | 'custom'>('scheduled');
    const [isLoading, setIsLoading] = useState(false);
    // Removed availableDates state as we check on selection for now, or could use it for Calendar modifiers
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
    const [busyDates, setBusyDates] = useState<string[]>([]);

    // Fetch busy dates on mount for ALL types that use calendar
    useEffect(() => {
        const fetchBusyDates = async () => {
            if (eventType !== 'tec-saltillo') {
                const today = new Date();
                const nextMonth = addDays(today, 60); // Check next 60 days
                const dates = await getBusyDates(
                    format(today, 'yyyy-MM-dd'),
                    format(nextMonth, 'yyyy-MM-dd')
                );
                setBusyDates(dates);
            }
        };
        fetchBusyDates();
    }, [eventType]);
    const schema = createFormSchema(eventType);

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            attendeeType: eventType === 'student' || eventType === 'tec-saltillo' ? 'student' :
                eventType === 'corporate' ? 'company' : 'professional',
            numberOfAttendees: eventType === 'corporate' ? 5 : 1,
            preferredDate: undefined,
            studentProof: undefined,
            location: undefined,
        },
    });

    const [publicCapacity, setPublicCapacity] = useState<number | null>(null);
    const preferredDate = form.watch('preferredDate');

    // Initial effect to check capacity for public events or slots for private
    useEffect(() => {
        const checkEventStatus = async () => {
            const targetDate = eventDate || preferredDate;

            if (eventType === 'corporate' || (eventType === 'online-group' && !targetDate)) {
                // Logic for private events availability if needed
            } else if (targetDate) {
                // Public Event: Check Capacity
                const supabase = createClient();
                const dateStr = targetDate.toISOString().split('T')[0];
                const { count } = await supabase
                    .from('course_registrations')
                    .select('*', { count: 'exact', head: true })
                    .eq('event_date', dateStr)
                    .in('status', ['confirmed', 'pending_payment']);

                const reserved = count || 0;
                const remaining = 12 - reserved;
                setPublicCapacity(remaining);
            }
        };
        checkEventStatus();
    }, [eventType, eventDate, preferredDate]);

    const isWideMode = eventType !== 'tec-saltillo'; // All except Tec Saltillo use 2-col logic

    const handleDateSelect = async (date: Date | undefined) => {
        if (!date) return;

        form.setValue("preferredDate", date);
        form.clearErrors("preferredDate");

        setIsCheckingAvailability(true);
        // Format date for checkDateAvailability (expected YYYY-MM-DD)
        const dateStr = format(date, 'yyyy-MM-dd');
        const isAvailable = await checkDateAvailability(dateStr);
        setIsCheckingAvailability(false);

        if (!isAvailable) {
            form.setError("preferredDate", { message: "Date not available. Please choose another." });
        }
    };



    const onSubmit = async (values: FormValues) => {
        setIsLoading(true);

        try {
            // 1. Determine Registration Type & Flow
            // eventType is passed from parent (AICourseDetails). 
            // values.attendeeType comes from form.
            // We need to pass both to API to map correctly to Stripe.

            const payload = {
                fullName: values.fullName,
                email: values.email,
                phone: values.phone || '',
                eventDate: values.preferredDate ? format(values.preferredDate, 'yyyy-MM-dd') : eventDate?.toISOString().split('T')[0],
                attendeeType: values.attendeeType,
                eventType: eventType, // e.g. 'student' (which assumes workshop), 'online-group', etc.
                attendees: values.numberOfAttendees || 1,
            };

            // 2. Call Unified API
            const response = await fetch('/api/course/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Registration failed");
            }

            // 3. Handle Response Actions
            if (result.status === 'pending_email_verification') {
                // Success -> Email Sent
                setStep('email-verification');
                // Effectively we are done here, UI shows check email message
            }
            else if (result.paymentUrl) {
                // Payment Required -> Redirect
                window.location.href = result.paymentUrl;
            }
            else if (result.status === 'pending_contact') {
                // Corporate contact
                onSuccess(); // Close modal or show success message
                alert("Thank you! We've received your request and will contact you shortly.");
            }
            else {
                // Generic Success (e.g. Free Tec Event confirmed immediately if logic permits?)
                // Currently API returns pending_email_verification for Tec students too.
                // If we implemented auto-confirm for them in API, we'd handle it here.
                onSuccess();
            }

            setIsLoading(false);

        } catch (error: any) {
            console.error("Registration Error:", error);
            setIsLoading(false);
            form.setError("root", { message: error.message || "Something went wrong." });
        }
    };

    // ... (handleVerifyEmail, handlePayment, getTitle remain same)

    // Handlers removed

    const getTitle = () => {
        switch (eventType) {
            case 'corporate': return "Corporate Training Registration";
            case 'tec-saltillo': return "Tec Saltillo Event Registration";
            case 'student': return "Peers Workshop Registration";
            default: return "Course Registration";
        }
    };

    const getCorporatePrice = (attendees: number): number => {
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

    const calculateTotal = () => {
        const type = form.getValues().attendeeType;
        const attendees = form.getValues().numberOfAttendees || 1;

        if (eventType === 'tec-saltillo') return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(0);

        // Corporate / Company (Fixed Price with Scale)
        if (type === 'company' || eventType === 'corporate') {
            const totalPrice = getCorporatePrice(attendees);
            return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(totalPrice);
        }

        let pricePerHead = 0;

        if (type === 'student') {
            // StudentLogic
            if (eventType === 'online-group') {
                pricePerHead = getStudentOnlinePrice(attendees);
            } else {
                pricePerHead = getStudentGroupPrice(attendees);
            }
        } else {
            // Professional
            if (eventType === 'online-group') {
                pricePerHead = getProfessionalOnlinePrice(attendees);
            } else {
                pricePerHead = getProfessionalPrice(attendees);
            }
        }

        // Removed old online group 90% logic, using new functions
        // if (eventType === 'online-group') { ... }

        return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(pricePerHead * attendees);
    };

    return (
        <div className="w-full text-slate-100 flex flex-col h-full bg-slate-950">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />

            {/* Header */}
            <div className="flex-shrink-0 px-6 py-4 border-b border-slate-800">
                <CardTitle className="flex items-center gap-2 text-xl text-white">
                    {step === 'success' && <CheckCircle2 className="text-emerald-500" />}
                    {getTitle()}
                </CardTitle>
                <CardDescription className="text-slate-400 mt-1">
                    {step === 'form' && (eventType === 'student' ? "Open to students & professionals" : "Please fill in your details to secure your spot.")}
                    {step === 'email-verification' && "We sent a verification link to your email."}
                    {step === 'payment' && "Complete your secure payment."}
                    {step === 'success' && "Registration confirmed! Check your email."}
                </CardDescription>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto w-full px-6 py-6">
                <AnimatePresence mode="wait">
                    {step === 'form' && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            key="step-form"
                        >
                            <Form {...form}>
                                <form id="registration-form" onSubmit={form.handleSubmit(onSubmit)} className="h-full">
                                    <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-8 h-full">

                                        {/* LEFT COLUMN: Fields */}
                                        <div className="space-y-6">
                                            {/* Ticket Type Selector (Peers Workshop & Online Training) */}
                                            {(eventType === 'student' || eventType === 'online-group') && (
                                                <FormField
                                                    control={form.control}
                                                    name="attendeeType"
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-3">
                                                            <Label>Ticket Type</Label>
                                                            <FormControl>
                                                                <RadioGroup
                                                                    onValueChange={field.onChange}
                                                                    defaultValue={field.value}
                                                                    className="flex flex-col space-y-3"
                                                                >
                                                                    <div className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${field.value === 'student' ? 'bg-slate-800 border-cyan-500' : 'border-slate-700 hover:bg-slate-900'}`}>
                                                                        <RadioGroupItem value="student" id="ticket-student" className="border-slate-500 text-cyan-500" />
                                                                        <Label htmlFor="ticket-student" className="flex-1 cursor-pointer">
                                                                            <div className="font-medium text-white">Student</div>
                                                                            <div className="text-sm text-slate-400">Requires institutional email • From $860/person</div>
                                                                        </Label>
                                                                    </div>
                                                                    <div className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${field.value === 'professional' ? 'bg-slate-800 border-cyan-500' : 'border-slate-700 hover:bg-slate-900'}`}>
                                                                        <RadioGroupItem value="professional" id="ticket-professional" className="border-slate-500 text-cyan-500" />
                                                                        <Label htmlFor="ticket-professional" className="flex-1 cursor-pointer">
                                                                            <div className="font-medium text-white">Professional</div>
                                                                            <div className="text-sm text-slate-400">No verification needed • From $2,200/person</div>
                                                                        </Label>
                                                                    </div>
                                                                </RadioGroup>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            )}

                                            <FormField
                                                control={form.control}
                                                name="fullName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Full Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="John Doe" {...field} className="bg-slate-900 border-slate-700 focus:border-cyan-500 transition-colors" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="john@example.com" {...field} className="bg-slate-900 border-slate-700 focus:border-cyan-500 transition-colors" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Phone (Optional)</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="+1 234..." {...field} className="bg-slate-900 border-slate-700 focus:border-cyan-500 transition-colors" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            {/* Attendees Field - Corporate, Student, Online Group (Hidden for Tec Saltillo) */}
                                            {(eventType === 'corporate' || eventType === 'online-group' || eventType === 'student') && (
                                                <div className="grid grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="numberOfAttendees"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Attendees ({field.value})</FormLabel>
                                                                <FormControl>
                                                                    {eventType === 'corporate' ? (
                                                                        <div className="space-y-2">
                                                                            <Input
                                                                                type="number"
                                                                                min={5}
                                                                                max={12}
                                                                                step={1}
                                                                                {...field}
                                                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                                                className="bg-slate-900 border-slate-700 focus:border-cyan-500 transition-colors"
                                                                            />
                                                                            <div className="flex justify-between text-xs text-slate-400">
                                                                                <span>Per Person: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(getCorporatePrice(Number(field.value)) / Number(field.value))}</span>
                                                                                <span className="text-emerald-400 font-bold">Total: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(getCorporatePrice(Number(field.value)))}</span>
                                                                            </div>
                                                                        </div>
                                                                    ) : eventType === 'student' ? (
                                                                        <div className="space-y-2">
                                                                            <Input
                                                                                type="number"
                                                                                min={studentDateOption === 'scheduled' ? 1 : 5}
                                                                                max={studentDateOption === 'scheduled' ? (publicCapacity ?? 12) : 12}
                                                                                {...field}
                                                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                                                className="bg-slate-900 border-slate-700 focus:border-cyan-500 transition-colors"
                                                                            />
                                                                            {form.watch('attendeeType') === 'student' ? (
                                                                                <div className="flex justify-between text-xs text-slate-400">
                                                                                    <span>Per Student: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(getStudentGroupPrice(Number(field.value) || 1))}</span>
                                                                                    <span className="text-emerald-400 font-bold">Total: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(getStudentGroupPrice(Number(field.value) || 1) * (Number(field.value) || 1))}</span>
                                                                                </div>
                                                                            ) : (
                                                                                <div className="flex justify-between text-xs text-slate-400">
                                                                                    <span>Per Professional: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(getProfessionalPrice(Number(field.value) || 1))}</span>
                                                                                    <span className="text-emerald-400 font-bold">Total: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(getProfessionalPrice(Number(field.value) || 1) * (Number(field.value) || 1))}</span>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <div className="space-y-2">
                                                                            <Input
                                                                                type="number"
                                                                                min={1}
                                                                                max={12}
                                                                                {...field}
                                                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                                                className="bg-slate-900 border-slate-700 focus:border-cyan-500 transition-colors"
                                                                            />
                                                                            {form.watch('attendeeType') === 'student' ? (
                                                                                <div className="flex justify-between text-xs text-slate-400">
                                                                                    <span>Per Student: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(getStudentOnlinePrice(Number(field.value) || 1))}</span>
                                                                                    <span className="text-emerald-400 font-bold">Total: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(getStudentOnlinePrice(Number(field.value) || 1) * (Number(field.value) || 1))}</span>
                                                                                </div>
                                                                            ) : (
                                                                                <div className="flex justify-between text-xs text-slate-400">
                                                                                    <span>Per Professional: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(getProfessionalOnlinePrice(Number(field.value) || 1))}</span>
                                                                                    <span className="text-emerald-400 font-bold">Total: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(getProfessionalOnlinePrice(Number(field.value) || 1) * (Number(field.value) || 1))}</span>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            )}

                                            {/* Student Date Option */}
                                            {eventType === 'student' && (
                                                <div className="space-y-3">
                                                    <FormLabel>Date Selection</FormLabel>
                                                    <RadioGroup
                                                        defaultValue="scheduled"
                                                        onValueChange={(val) => {
                                                            setStudentDateOption(val as 'scheduled' | 'custom');
                                                            if (val === 'scheduled') {
                                                                form.setValue('numberOfAttendees', 1);
                                                                // Default to first upcoming
                                                                form.setValue('preferredDate', UPCOMING_WORKSHOPS[0]);
                                                                form.clearErrors('preferredDate');
                                                            } else {
                                                                form.setValue('numberOfAttendees', 5);
                                                                form.setValue('preferredDate', undefined);
                                                            }
                                                        }}
                                                        className="flex flex-col space-y-1"
                                                    >
                                                        <div className="flex items-center space-x-3 space-y-0">
                                                            <RadioGroupItem value="scheduled" id="scheduled" />
                                                            <FormLabel htmlFor="scheduled" className="font-normal">
                                                                Join Upcoming Session
                                                            </FormLabel>
                                                        </div>

                                                        {studentDateOption === 'scheduled' && (
                                                            <div className="ml-7 mt-2 space-y-2">
                                                                {UPCOMING_WORKSHOPS.map((date) => (
                                                                    <div
                                                                        key={date.toISOString()}
                                                                        onClick={() => {
                                                                            form.setValue('preferredDate', date);
                                                                            form.clearErrors('preferredDate');
                                                                        }}
                                                                        className={cn(
                                                                            "p-2 rounded-md border cursor-pointer transition-colors text-sm flex justify-between",
                                                                            isSameDay(form.getValues().preferredDate || new Date(0), date)
                                                                                ? "bg-cyan-950/30 border-cyan-500 text-cyan-200"
                                                                                : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"
                                                                        )}
                                                                    >
                                                                        <span>{format(date, "MMMM d, yyyy")}</span>
                                                                        <span className="text-xs opacity-70">Alebrije Café</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        <div className="flex items-center space-x-3 space-y-0 pt-2">
                                                            <RadioGroupItem value="custom" id="custom" />
                                                            <FormLabel htmlFor="custom" className="font-normal">
                                                                Request Private Date (Min 5 people)
                                                            </FormLabel>
                                                        </div>
                                                    </RadioGroup>
                                                </div>
                                            )}

                                            {/* Conditional Date Picker or Fixed Date for Tec Saltillo */}
                                            {/* Conditional Date Picker or Fixed Date for Tec Saltillo */}
                                            {eventType === 'tec-saltillo' && (
                                                <FormItem className="space-y-3">
                                                    <FormLabel>Event Date</FormLabel>
                                                    <div className="p-3 border border-slate-700 bg-slate-900 rounded-md text-slate-300 flex items-center gap-2">
                                                        <CalendarIcon className="w-4 h-4 text-cyan-500" />
                                                        <span>Saturday, January 24, 2026</span>
                                                    </div>
                                                    {publicCapacity !== null && (
                                                        <p className="text-xs text-emerald-400 font-medium ml-1">
                                                            {publicCapacity} of 12 spots available
                                                        </p>
                                                    )}
                                                </FormItem>
                                            )}



                                            {eventType === 'corporate' && (
                                                <FormField
                                                    control={form.control}
                                                    name="location"
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-3">
                                                            <FormLabel>Training Location</FormLabel>
                                                            <FormControl>
                                                                <RadioGroup
                                                                    onValueChange={field.onChange}
                                                                    defaultValue={field.value}
                                                                    className="flex flex-col space-y-1"
                                                                >
                                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                                        <FormControl>
                                                                            <RadioGroupItem value="in-company" className="border-slate-500 text-cyan-500" />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal text-slate-300">
                                                                            In-Company (We go to you)
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                                        <FormControl>
                                                                            <RadioGroupItem value="appcreatorbr-office" className="border-slate-500 text-cyan-500" />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal text-slate-300">
                                                                            AppCreatorBR Offices
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                </RadioGroup>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            )}





                                        </div>

                                        {/* Right Column: Calendar & Summary (Wide Mode) */}
                                        {isWideMode && (
                                            <div className="space-y-6">
                                                {/* Calendar or Event Info */}
                                                {eventType === 'student' && studentDateOption === 'scheduled' ? (
                                                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                                                        <h4 className="text-white font-semibold mb-4">Selected Event</h4>
                                                        <div className="space-y-4">
                                                            <div className="flex items-start gap-3">
                                                                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                                                    <CalendarIcon className="w-5 h-5 text-cyan-400" />
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium text-white">February 7, 2026</p>
                                                                    <p className="text-sm text-slate-400">Alebrije Café, Saltillo</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-800">
                                                                <span className="text-slate-400">Available spots:</span>
                                                                <span className="text-cyan-400 font-medium">{publicCapacity !== null ? publicCapacity : 12} of 12</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                                                        <Label className="text-white mb-3 block font-medium ml-1">Select Date</Label>
                                                        <Calendar
                                                            mode="single"
                                                            selected={form.getValues().preferredDate}
                                                            onSelect={handleDateSelect}
                                                            disabled={(date) => {
                                                                const isPast = date < new Date();
                                                                // Check busy dates for ALL types
                                                                const dateStr = format(date, 'yyyy-MM-dd');
                                                                const isBusy = busyDates.includes(dateStr);

                                                                // For individual online: block weekends
                                                                const isWeekend = (date.getDay() === 0 || date.getDay() === 6);
                                                                const isIndividual = eventType === 'online-individual' || (eventType === 'online-group' && form.getValues().numberOfAttendees === 1);

                                                                return isPast || isBusy || (isIndividual && isWeekend);
                                                            }}
                                                            className="rounded-md border border-slate-800 bg-slate-950 p-3"
                                                        />
                                                        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap gap-4 text-xs text-slate-400 justify-center">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-3 h-3 rounded-sm bg-cyan-500"></div>
                                                                <span>Selected</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-3 h-3 rounded-sm bg-slate-700"></div>
                                                                <span>Available</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-3 h-3 rounded-sm bg-slate-800 opacity-40"></div>
                                                                <span>Unavailable</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Order Summary */}
                                                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                                                    <h4 className="text-white font-semibold mb-4">Summary</h4>
                                                    <div className="space-y-3 text-sm text-slate-300">
                                                        <div className="flex justify-between">
                                                            <span>Type</span>
                                                            <span className="text-white font-medium capitalize">{eventType.replace('-', ' ')}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>People</span>
                                                            <span className="text-white font-medium">{form.watch('numberOfAttendees') || 1}</span>
                                                        </div>

                                                        <div className="border-t border-slate-800 pt-3 mt-3 flex justify-between items-center">
                                                            <span>Total</span>
                                                            <span className="text-xl font-bold text-emerald-400">{calculateTotal()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </Form>
                        </motion.div>
                    )}

// Email verification block removed since we redirect to /academy/success

                </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 px-6 py-4 border-t border-slate-800 flex justify-end gap-3 bg-slate-950">
                {step === 'form' && (
                    <>
                        <Button variant="ghost" onClick={onCancel} className="text-slate-400 hover:text-white hover:bg-slate-800">
                            Cancel
                        </Button>
                        <Button
                            onClick={(e) => {
                                // Prevent default button behavior
                                // e.preventDefault(); 
                                // Actually we want to trigger the form submit. 
                                // Since the button is outside the form, we can use the ID trick or form attribute.
                                // We used document.getElementById... dispatchEvent which is okay.
                                document.getElementById('registration-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                            }}
                            disabled={isLoading}
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Processing...
                                </>
                            ) : (
                                "Proceed"
                            )}
                        </Button>
                    </>
                )}
                {step !== 'form' && step !== 'success' && (
                    <Button variant="ghost" onClick={() => setStep('form')} className="text-slate-400">
                        Back
                    </Button>
                )}
            </div>
        </div>
    );
}
