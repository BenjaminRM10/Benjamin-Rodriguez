'use client';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Video, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input'; // Need Input for user details
import { Label } from '@/components/ui/label'; // Need Label
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { toast } from 'sonner';

export function CalendarBooking() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    // State for slots fetching
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);

    // State for booking process
    const [step, setStep] = useState<'datetime' | 'details' | 'success'>('datetime');
    const [isBooking, setIsBooking] = useState(false);
    const [userDetails, setUserDetails] = useState({ name: '', email: '' });

    // Fetch slots when date changes
    useEffect(() => {
        if (date) {
            const fetchSlots = async () => {
                setIsLoadingSlots(true);
                setSelectedSlot(null);
                try {
                    const res = await fetch(`/api/calendar/available-slots?date=${date.toISOString()}`);
                    const data = await res.json();
                    if (data.slots) {
                        setAvailableSlots(data.slots);
                    }
                } catch (error) {
                    console.error(error);
                    toast.error('Failed to load available slots');
                } finally {
                    setIsLoadingSlots(false);
                }
            };
            fetchSlots();
        }
    }, [date]);

    const handleBooking = async () => {
        if (!date || !selectedSlot || !userDetails.name || !userDetails.email) return;

        setIsBooking(true);
        try {
            const res = await fetch('/api/calendar/create-event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: userDetails.name,
                    email: userDetails.email,
                    date: date.toISOString(),
                    time: selectedSlot
                })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Booking failed');

            setStep('success');
            toast.success('Meeting scheduled successfully!');

        } catch (error) {
            console.error(error);
            toast.error('Failed to book meeting. Please try again.');
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="group cursor-pointer p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all block w-full">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                            <CalendarIcon className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <span className="block text-sm text-slate-400">Schedule a Call</span>
                            <span className="block font-medium text-white truncate group-hover:text-blue-300 transition-colors">
                                Book a free 30-min consultation
                            </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="w-[95vw] md:w-full sm:max-w-[950px] h-[90vh] md:h-auto md:max-h-[85vh] p-0 overflow-hidden bg-slate-950 border-white/10 flex flex-col">

                {step === 'success' ? (
                    <div className="p-12 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Meeting Confirmed!</h3>
                        <p className="text-slate-400 mb-6">
                            Check your email for the Google Meet link. I look forward to speaking with you.
                        </p>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 w-full max-w-sm mb-6">
                            <div className="flex items-center gap-3 text-sm text-slate-300 mb-2">
                                <CalendarIcon className="w-4 h-4 text-blue-400" />
                                <span>{date && format(date, 'EEEE, MMMM do, yyyy')}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                <Clock className="w-4 h-4 text-purple-400" />
                                <span>{selectedSlot} (30 min)</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-[280px_1fr] h-full overflow-hidden">
                        {/* Left Panel: Info (Same as before) */}
                        <div className="bg-slate-900/50 p-6 flex flex-col border-r border-white/5 hidden md:flex">
                            <div className="mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                                    <Video className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-1">Discovery Call</h3>
                                <p className="text-sm text-slate-400">Video call via Google Meet</p>
                            </div>
                            <div className="space-y-4 mb-auto">
                                <div className="flex items-start gap-3 text-sm text-slate-300">
                                    <Clock className="w-4 h-4 mt-0.5 text-blue-400" />
                                    <div>
                                        <span className="block font-medium text-white">30 Minutes</span>
                                        <span className="text-slate-500">Duration</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-slate-300">
                                    <CalendarIcon className="w-4 h-4 mt-0.5 text-green-400" />
                                    <div>
                                        <span className="block font-medium text-white">Mexico City Time</span>
                                        <span className="text-slate-500">Timezone</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel: Logic */}
                        <div className="p-6 overflow-y-auto h-full bg-slate-950">

                            {step === 'datetime' && (
                                <>
                                    <DialogHeader className="mb-6">
                                        <DialogTitle>Select a Date & Time</DialogTitle>
                                        <DialogDescription>
                                            Check availability and book your slot.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="grid md:grid-cols-2 gap-8 items-start">
                                        {/* Column 1: Calendar */}
                                        <div className="w-full flex justify-center md:justify-start">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                className="rounded-xl border border-white/10 bg-white/5 p-4"
                                                classNames={{
                                                    head_cell: "text-slate-400 font-normal text-[0.8rem]",
                                                    cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-600/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                                    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-white/10 rounded-md transition-colors text-slate-300",
                                                    day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white shadow-lg shadow-blue-500/30",
                                                    day_today: "bg-white/5 text-white font-bold border border-white/20",
                                                }}
                                            />
                                        </div>

                                        {/* Column 2: Slots */}
                                        <div className="w-full h-full flex flex-col min-h-[350px]">
                                            {date ? (
                                                <div className="flex flex-col h-full">
                                                    <h4 className="text-sm font-medium text-white mb-3">
                                                        Available Slots for {format(date, 'EEEE, MMM do')}
                                                    </h4>
                                                    <ScrollArea className="flex-1 pr-4 max-h-[280px] bg-white/5 rounded-xl border border-white/10 p-2 mb-4">
                                                        {isLoadingSlots ? (
                                                            <div className="flex justify-center py-12">
                                                                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                                                            </div>
                                                        ) : availableSlots.length > 0 ? (
                                                            <div className="grid grid-cols-2 gap-2">
                                                                {availableSlots.map((slot) => (
                                                                    <Button
                                                                        key={slot}
                                                                        variant={selectedSlot === slot ? "default" : "outline"}
                                                                        onClick={() => setSelectedSlot(slot)}
                                                                        className={cn(
                                                                            "w-full justify-center text-xs h-9",
                                                                            selectedSlot === slot
                                                                                ? "bg-blue-600 hover:bg-blue-700 text-white border-transparent"
                                                                                : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                                                                        )}
                                                                    >
                                                                        {slot}
                                                                    </Button>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center h-full text-slate-500 py-12 gap-2">
                                                                <Clock className="w-8 h-8 opacity-20" />
                                                                <p className="text-sm">No slots available</p>
                                                            </div>
                                                        )}
                                                    </ScrollArea>

                                                    <Button
                                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20 mt-auto"
                                                        disabled={!date || !selectedSlot}
                                                        onClick={() => setStep('details')}
                                                    >
                                                        Next: Enter Details
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center h-full text-slate-500 border border-dashed border-white/10 rounded-xl bg-white/5">
                                                    <CalendarIcon className="w-10 h-10 opacity-20 mb-2" />
                                                    <p>Select a date to view slots</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                            {step === 'details' && (
                                <div className="space-y-6">
                                    <DialogHeader className="mb-6">
                                        <DialogTitle>Enter Your Details</DialogTitle>
                                        <DialogDescription>
                                            Where should I send the calendar invite?
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-slate-300">Full Name</Label>
                                            <Input
                                                placeholder="John Doe"
                                                className="bg-white/5 border-white/10 text-white"
                                                value={userDetails.name}
                                                onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-slate-300">Email Address</Label>
                                            <Input
                                                placeholder="john@example.com"
                                                type="email"
                                                className="bg-white/5 border-white/10 text-white"
                                                value={userDetails.email}
                                                onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Button
                                            variant="outline"
                                            className="flex-1 border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
                                            onClick={() => setStep('datetime')}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            className="flex-[2] bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                                            disabled={!userDetails.name || !userDetails.email || isBooking}
                                            onClick={handleBooking}
                                        >
                                            {isBooking ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Booking...
                                                </>
                                            ) : (
                                                'Confirm Meeting'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
