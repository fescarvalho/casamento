"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { label: "Início", href: "/" },
        { label: "Confirmação de Presença", href: "/rsvp" },
        { label: "Lista de Presentes", href: "/presentes" },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-4 bg-white/20 backdrop-blur-md border-b border-gold/10">
            <Link href="/" className="text-xl font-headline tracking-widest text-gold font-bold">
                F&V
            </Link>
            <div className="hidden md:flex items-center gap-12">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`text-sm font-label tracking-widest transition-colors uppercase ${pathname === item.href
                                ? "text-gold font-bold border-b-2 border-gold"
                                : "text-charcoal hover:text-gold"
                            }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
            <div>
                <button className="border border-gold text-gold px-6 py-2 text-xs font-label tracking-widest hover:bg-gold hover:text-white transition-all rounded-lg uppercase">
                    Save the Date
                </button>
            </div>
        </nav>
    );
}
