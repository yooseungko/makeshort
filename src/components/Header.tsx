"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { label: "서비스", href: "#pricing" },
    { label: "기업 전용", href: "#enterprise" },
    { label: "포트폴리오", href: "#portfolio" },
    { label: "문의하기", href: "#contact" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-background via-primary/10 to-background bg-[length:200%_100%] animate-gradient backdrop-blur-xl border-b border-border/50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <a href="/" className="text-xl font-bold gradient-text">
                        MakeShort
                    </a>

                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden md:block">
                        <Button size="sm" asChild>
                            <a href="https://open.kakao.com/o/sfwQbQ6h" target="_blank" rel="noopener noreferrer">무료 상담</a>
                        </Button>
                    </div>

                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {isOpen && (
                    <nav className="md:hidden py-4 border-t border-border">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="block py-2 text-muted-foreground hover:text-foreground"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <Button className="w-full mt-4" size="sm" asChild>
                            <a href="https://open.kakao.com/o/sfwQbQ6h" target="_blank" rel="noopener noreferrer">무료 상담</a>
                        </Button>
                    </nav>
                )}
            </div>
        </header>
    );
}
