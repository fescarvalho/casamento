"use client";

import { motion } from "framer-motion";
import { Church, Heart, Gift, Leaf, Sprout } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomeCover() {
    const [mounted, setMounted] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        mins: 0,
    });

    useEffect(() => {
        setMounted(true);
        const weddingDate = new Date("2026-05-22T18:00:00").getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = weddingDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, mins: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 py-20 text-charcoal overflow-hidden shrink-0">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/fundo.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-ivory/40 backdrop-blur-[5px]" />
            </div>

            {/* Lateral Decorative Elements (Left) */}
            <div className="absolute -left-12 md:left-0 top-1/2 -translate-y-1/2 w-48 md:w-64 h-full flex flex-col justify-between items-center py-20 pointer-events-none opacity-20 z-0">
                <Leaf className="w-16 h-16 md:w-40 md:h-40 text-sage" strokeWidth={1} />
                <Heart className="text-gold w-10 h-10 opacity-30" />
                <Sprout className="w-16 h-16 md:w-40 md:h-40 text-sage rotate-180" strokeWidth={1} />
            </div>

            {/* Lateral Decorative Elements (Right) */}
            <div className="absolute -right-12 md:right-0 top-1/2 -translate-y-1/2 w-48 md:w-64 h-full flex flex-col justify-between items-center py-20 pointer-events-none opacity-20 z-0">
                <Sprout className="w-16 h-16 md:w-40 md:h-40 text-sage scale-x-[-1]" strokeWidth={1} />
                <Heart className="text-gold w-10 h-10 opacity-30 fill-gold" />
                <Leaf className="w-16 h-16 md:w-40 md:h-40 text-sage scale-x-[-1] rotate-180" strokeWidth={1} />
            </div>

            {/* Central Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-4xl w-full text-center space-y-8 md:space-y-10 z-10"
            >
                <div className="space-y-4 px-4">
                    <span className="block text-gold font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-2 md:mb-4 bg-white/30 md:bg-transparent w-fit mx-auto px-2 py-1 rounded">Save Our Date</span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline text-charcoal drop-shadow-sm leading-tight">Fernando & Vittorya</h1>
                    <div className="flex items-center justify-center gap-4 py-2">
                        <div className="h-[1px] w-12 bg-gold/30"></div>
                        <Church className="text-gold w-6 h-6" />
                        <div className="h-[1px] w-12 bg-gold/30"></div>
                    </div>

                    <div className="space-y-2 mt-4">
                        <p className="text-gold font-bold tracking-[0.2em] text-sm uppercase">22 de Maio de 2026 • 19:00h</p>
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Capela+Nossa+Senhora+da+Assunção+Rio+de+Janeiro"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-charcoal/80 hover:text-gold transition-colors text-[10px] md:text-xs uppercase tracking-[0.15em] border-b border-gold/20 block w-fit mx-auto pb-1 font-medium"
                        >
                            Capela Nossa Senhora da Assunção • Natividade-RJ
                        </a>
                    </div>
                </div>

                <p className="text-base md:text-xl text-charcoal/90 max-w-2xl mx-auto font-medium leading-relaxed italic px-6">
                    Com a bênção de Deus e de nossas famílias, convidamos você para celebrar o início do nosso "para sempre".
                </p>

                {/* Wedding Date/Countdown */}
                {mounted && (
                    <div className="flex flex-row justify-center gap-2 md:gap-6 mt-8 md:mt-10 px-2 sm:px-4">
                        <div className="bg-white/60 backdrop-blur-md border border-gold/20 px-3 py-3 md:px-8 md:py-6 rounded-xl flex flex-col items-center min-w-[70px] md:min-w-[100px] shadow-sm">
                            <span className="text-xl md:text-3xl font-headline text-gold font-bold">{timeLeft.days}</span>
                            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-charcoal/70 mt-1">Dias</span>
                        </div>
                        <div className="bg-white/60 backdrop-blur-md border border-gold/20 px-3 py-3 md:px-8 md:py-6 rounded-xl flex flex-col items-center min-w-[70px] md:min-w-[100px] shadow-sm">
                            <span className="text-xl md:text-3xl font-headline text-gold font-bold">{timeLeft.hours}</span>
                            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-charcoal/70 mt-1">Horas</span>
                        </div>
                        <div className="bg-white/60 backdrop-blur-md border border-gold/20 px-3 py-3 md:px-8 md:py-6 rounded-xl flex flex-col items-center min-w-[70px] md:min-w-[100px] shadow-sm">
                            <span className="text-xl md:text-3xl font-headline text-gold font-bold">{timeLeft.mins}</span>
                            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-charcoal/70 mt-1">Minutos</span>
                        </div>
                    </div>
                )}



                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 px-6">
                    <Link
                        href="/rsvp"
                        className="w-full sm:w-auto bg-sage text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg hover:bg-sage/80 transition-all flex items-center justify-center gap-2"
                    >
                        <Heart size={16} className="fill-white" />
                        Confirmar Presença
                    </Link>
                    <Link
                        href="/presentes"
                        className="w-full sm:w-auto bg-white/60 backdrop-blur-md border border-gold/20 text-charcoal px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-sm hover:bg-white transition-all flex items-center justify-center gap-2"
                    >
                        <Gift size={16} className="text-gold" />
                        Lista de Presentes
                    </Link>
                </div>

            </motion.div>
        </section>
    );
}
