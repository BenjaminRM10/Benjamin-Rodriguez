import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer({ lang = "en" }: { lang?: string }) {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#0a0e27] border-t border-slate-800 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Column 1: Large Logo */}
                    <div className="flex items-center justify-center">
                        <div className="relative w-32 h-32 md:w-40 md:h-40">
                            <Image
                                src="/logo.png"
                                alt="AppCreatorBR"
                                fill
                                className="object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                                sizes="(max-width: 768px) 128px, 160px"
                            />
                        </div>
                    </div>

                    {/* Column 2: Personal Branding */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-2xl text-slate-100">Benjamin Rodríguez</h3>
                        <p className="text-slate-400 max-w-xs">
                            Where Engineering Meets Innovation. Built with AI & ❤️.
                        </p>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-slate-100">Quick Links</h4>
                        <nav className="flex flex-col space-y-2">
                            <Link href={`/${lang}/profile`} className="text-slate-400 hover:text-blue-400 transition-colors w-fit">Profile</Link>
                            <Link href={`/${lang}/solutions`} className="text-slate-400 hover:text-blue-400 transition-colors w-fit">Solutions</Link>
                            <Link href={`/${lang}/academy`} className="text-slate-400 hover:text-blue-400 transition-colors w-fit">Academy</Link>
                            <Link href={`/${lang}/contact`} className="text-slate-400 hover:text-blue-400 transition-colors w-fit">Contact</Link>
                        </nav>
                    </div>

                    {/* Column 4: Connect */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-slate-100">Connect</h4>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/BenjaminRM10"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/alejandro-benjamin-rodriguez-mares-20b871236/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="mailto:contacto@appcreatorbr.com"
                                className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                            >
                                <Mail size={20} />
                            </a>
                        </div>
                        <p className="text-sm text-slate-500">Saltillo, Coahuila, Mexico</p>
                    </div>
                </div>

                <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
                    <p>© {year} Benjamin Rodríguez. All rights reserved.</p>
                    <p>Made with Next.js, Tailwind & Supabase</p>
                </div>
            </div>
        </footer>
    );
}
