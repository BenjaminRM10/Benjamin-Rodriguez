"use client";

import Typewriter from "typewriter-effect";

interface RoleTyperProps {
    roles?: string[];
}

export function RoleTyper({ roles }: RoleTyperProps) {
    const defaultTitles = [
        "OPEX Engineer",
        "Full-Stack Developer",
        "AI Consultant",
        "Engineering the Future with AI & Automation",
        "POV: Your Ideas, Automated",
    ];

    const titles = roles && roles.length > 0 ? roles : defaultTitles;

    return (
        <div className="text-2xl lg:text-3xl font-light text-slate-300 h-20 flex items-center justify-center md:justify-start">
            <Typewriter
                options={{
                    strings: titles,
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                }}
            />
        </div>
    );
}
