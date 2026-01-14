"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import LanguageToggle from "./LanguageToggle";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();
    const lang = pathname.split("/")[1] || "en";

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = lastScrollY;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setLastScrollY(latest);
    });

    const navLinks = [
        { href: `#about`, label: "About" },
        { href: `#services`, label: "Services" },
        { href: `#portfolio`, label: "Portfolio" },
        { href: `#contact`, label: "Contact" },
    ];

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 inset-x-0 h-16 z-40 border-b border-slate-800/50 bg-[#0a0e27]/80 backdrop-blur-md"
        >
            <div className="container mx-auto h-full px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href={`/${lang}`} className="relative group flex items-center gap-2">

                    <span className="font-bold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:from-blue-300 group-hover:to-cyan-300 transition-all duration-300">
                        AppCreatorBR
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={`/${lang}${link.href}`}
                            className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                    <div className="h-6 w-px bg-slate-800 mx-4" />
                    <LanguageToggle />
                </div>

                {/* Mobile Nav */}
                <MobileMenu lang={lang} />
            </div>
        </motion.nav>
    );
}
