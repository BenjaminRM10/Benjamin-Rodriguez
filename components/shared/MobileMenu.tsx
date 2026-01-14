"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import LanguageToggle from "./LanguageToggle";
import { useState } from "react";

export default function MobileMenu({ lang }: { lang: string }) {
    const [open, setOpen] = useState(false);

    const navLinks = [
        { href: `#about`, label: "About" },
        { href: `#services`, label: "Services" },
        { href: `#portfolio`, label: "Portfolio" },
        { href: `#contact`, label: "Contact" },
    ];

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-11 w-11 text-slate-200 hover:text-white hover:bg-slate-800/50">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0a0e27]/95 border-slate-800 text-slate-100 backdrop-blur-xl">
                <SheetHeader>
                    <SheetTitle className="text-left text-slate-100">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-6 mt-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={`/${lang}${link.href}`}
                            onClick={() => setOpen(false)}
                            className="text-lg font-medium text-slate-300 hover:text-white transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-4 border-t border-slate-800">
                        <LanguageToggle />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
