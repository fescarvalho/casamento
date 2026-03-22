"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { label: "Início", href: "/" },
        { label: "Confirmação", href: "/rsvp" },
        { label: "Presentes", href: "/presentes" },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav
            className={`fixed top-0 w-full z-[150] transition-all duration-500 px-6 py-4 ${scrolled || isMenuOpen
                ? "bg-white/80 border-b border-gold/10"
                : "bg-transparent"
                }`}
            style={scrolled || isMenuOpen ? { 
                backdropFilter: "blur(12px)", 
                WebkitBackdropFilter: "blur(12px)" 
            } : {}}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between relative">

                {/* Desktop Left Links */}
                <div className="hidden md:flex items-center gap-12 flex-1 md:pl-48">
                    {navItems.slice(0, 2).map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-[10px] font-label tracking-[0.2em] transition-all uppercase drop-shadow-md drop-shadow-white/80 ${pathname === item.href
                                ? "text-gold font-bold"
                                : "text-olive hover:text-gold"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Logo - Centered on all screen sizes */}
                <Link
                    href="/"
                    className="text-2xl font-headline tracking-[0.3em] text-gold font-bold z-[110] absolute left-1/2 -translate-x-1/2"
                >
                    F&V
                </Link>

                {/* Right Side Items */}
                <div className="flex items-center justify-end gap-12 flex-1 md:pr-48">
                    {/* Desktop Right Link */}
                    <Link
                        href="/presentes"
                        className={`hidden md:block text-[10px] font-label tracking-[0.2em] transition-all uppercase drop-shadow-md drop-shadow-white/80 ${pathname === "/presentes"
                            ? "text-gold font-bold"
                            : "text-olive hover:text-gold"
                            }`}
                    >
                        Presentes
                    </Link>

                    {/* Minimalist Toggle */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden flex flex-col items-end gap-1.5 z-[110] p-2 group"
                        aria-label="Toggle Menu"
                    >
                        <motion.span
                            animate={isMenuOpen ? { rotate: 45, y: 7.5, width: 24 } : { rotate: 0, y: 0, width: 24 }}
                            className="h-[1.5px] bg-gold rounded-full transition-all duration-300"
                        />
                        <motion.span
                            animate={isMenuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0, width: 16 }}
                            className="h-[1.5px] bg-gold rounded-full transition-all duration-300"
                        />
                        <motion.span
                            animate={isMenuOpen ? { rotate: -45, y: -7.5, width: 24 } : { rotate: 0, y: 0, width: 20 }}
                            className="h-[1.5px] bg-gold rounded-full transition-all duration-300"
                        />
                    </button>

                    <button className="hidden md:block border border-gold/30 text-olive px-6 py-2 text-[9px] font-label tracking-widest hover:bg-gold hover:text-white transition-all rounded-full uppercase">
                        22.05.2026
                    </button>
                </div>

                {/* Elegant Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            className="fixed inset-x-0 top-0 h-screen bg-ivory/98 z-[100] flex flex-col items-center justify-center gap-12 md:hidden"
                            style={{ 
                                backdropFilter: "blur(24px)", 
                                WebkitBackdropFilter: "blur(24px)" 
                            }}
                        >
                            <div className="flex flex-col items-center gap-8">
                                {navItems.map((item, i) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`text-2xl font-headline tracking-[0.15em] transition-colors uppercase ${pathname === item.href
                                                ? "text-gold font-bold"
                                                : "text-olive/60"
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-8 flex flex-col items-center gap-4"
                            >
                                <div className="w-12 h-[1px] bg-gold/20" />
                                <p className="text-[10px] tracking-[0.3em] text-olive/60 uppercase font-light">Natividade - RJ</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
