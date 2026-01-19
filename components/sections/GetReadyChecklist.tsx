'use client';

import { useState, useEffect } from 'react';
import { Check, ExternalLink, Monitor, Download, Github, Chrome } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ChecklistItem {
    id: string;
    title: string;
    description: string;
    link?: string;
    linkText?: string;
    icon: React.ReactNode;
    windowsOnly?: boolean;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
    {
        id: 'laptop',
        title: 'Laptop con 12GB+ RAM y SSD (Recomendado)',
        description: 'Para usar Claude, Antigravity y hacer tests locales sin problemas de rendimiento',
        icon: <Monitor className="w-5 h-5" />,
    },
    {
        id: 'os',
        title: 'Windows 10/11 o macOS actualizado',
        description: 'Sistema operativo compatible con las herramientas',
        icon: <Monitor className="w-5 h-5" />,
    },
    {
        id: 'antigravity',
        title: 'Google Antigravity IDE',
        description: 'El IDE orientado a agentes que usaremos',
        link: 'https://antigravity.google/',
        linkText: 'Abrir',
        icon: <Download className="w-5 h-5" />,
    },
    {
        id: 'claude',
        title: 'Claude Desktop',
        description: 'Para interactuar con el agente de IA',
        link: 'https://claude.ai/download',
        linkText: 'Descargar',
        icon: <Download className="w-5 h-5" />,
    },
    {
        id: 'git',
        title: 'Git instalado',
        description: 'Control de versiones para el proyecto',
        link: 'https://git-scm.com/downloads',
        linkText: 'Descargar',
        icon: <Github className="w-5 h-5" />,
    },
    {
        id: 'wsl',
        title: 'WSL instalado (Windows)',
        description: 'Windows Subsystem for Linux',
        link: 'https://learn.microsoft.com/en-us/windows/wsl/install',
        linkText: 'Tutorial',
        icon: <Monitor className="w-5 h-5" />,
        windowsOnly: true,
    },
    {
        id: 'github',
        title: 'Cuenta de GitHub activa',
        description: 'Para clonar repos y desplegar',
        link: 'https://github.com/signup',
        linkText: 'Crear cuenta',
        icon: <Github className="w-5 h-5" />,
    },
    {
        id: 'google',
        title: 'Cuenta de Google activa',
        description: 'Para Supabase Auth y servicios de Google',
        link: 'https://accounts.google.com/signup',
        linkText: 'Crear cuenta',
        icon: <Chrome className="w-5 h-5" />,
    },
];

export function GetReadyChecklist() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const saved = localStorage.getItem('courseChecklist');
        if (saved) {
            setCheckedItems(JSON.parse(saved));
        }
    }, []);

    const toggleItem = (id: string) => {
        const newChecked = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(newChecked);
        localStorage.setItem('courseChecklist', JSON.stringify(newChecked));
    };

    const completedCount = Object.values(checkedItems).filter(Boolean).length;
    const totalCount = CHECKLIST_ITEMS.length;
    const progress = (completedCount / totalCount) * 100;

    return (
        <section className="py-16 bg-slate-950/50">
            <div className="container px-4 md:px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Get Ready for the Course
                    </h2>
                    <p className="text-slate-400 mb-6">
                        Make sure you have everything set up before the session
                    </p>

                    <div className="mb-8">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-400">Progress</span>
                            <span className="text-cyan-400 font-medium">
                                {completedCount}/{totalCount} completed
                            </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>

                    <div className="space-y-3">
                        {CHECKLIST_ITEMS.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                className={`
                  flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all
                  ${checkedItems[item.id]
                                        ? 'bg-cyan-500/10 border-cyan-500/30'
                                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                                    }
                `}
                            >
                                <div className={`
                  w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                  ${checkedItems[item.id]
                                        ? 'bg-cyan-500 border-cyan-500'
                                        : 'border-slate-600'
                                    }
                `}>
                                    {checkedItems[item.id] && <Check className="w-4 h-4 text-white" />}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-400">{item.icon}</span>
                                        <h4 className={`font-medium ${checkedItems[item.id] ? 'text-cyan-300' : 'text-white'}`}>
                                            {item.title}
                                            {item.windowsOnly && (
                                                <span className="ml-2 text-xs bg-slate-700 px-2 py-0.5 rounded">
                                                    Windows only
                                                </span>
                                            )}
                                        </h4>
                                    </div>
                                    <p className="text-sm text-slate-500 mt-1">{item.description}</p>
                                </div>

                                {item.link && (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 flex-shrink-0"
                                    >
                                        {item.linkText}
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-center">
                        {progress === 100 ? (
                            <p className="text-green-400 font-medium">
                                ✓ You're all set! Ready to register.
                            </p>
                        ) : (
                            <p className="text-slate-500 text-sm">
                                Complete the checklist to ensure a smooth experience during the course.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
