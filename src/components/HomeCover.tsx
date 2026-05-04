"use client";

import { motion } from "framer-motion";
import { Church, Heart, Gift, MessageCircle, MapPin } from "lucide-react";
import Footer from "./Footer";
import Link from "next/link";

export default function HomeCover() {
    return (
        <section className="relative min-h-[100dvh] flex flex-col items-center justify-center bg-white overflow-hidden font-body text-midnight-olive pt-20 pb-10">


            {/* Elegant Watercolor Background Elements */}
            <div className="absolute -top-14 -left-14 md:-top-20 md:-left-20 w-64 md:w-96 z-0 pointer-events-none" style={{ WebkitMaskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 70%)', maskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 70%)' }}>
                <img src="/folhagens-vibrant.png" alt="" className="w-full brightness-[1.1] contrast-[1.1]" />
            </div>
            <div className="absolute -top-14 -right-14 md:-top-20 md:-right-20 w-64 md:w-96 z-0 pointer-events-none scale-x-[-1]" style={{ WebkitMaskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 70%)', maskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 70%)' }}>
                <img src="/folhagens-vibrant.png" alt="" className="w-full brightness-[1.1] contrast-[1.1]" />
            </div>
            <div className="absolute -bottom-14 -left-14 md:-bottom-20 md:-left-20 w-64 md:w-96 z-0 pointer-events-none scale-y-[-1]" style={{ WebkitMaskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 70%)', maskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 70%)' }}>
                <img src="/folhagens-vibrant.png" alt="" className="w-full brightness-[1.1] contrast-[1.1]" />
            </div>
            <div className="absolute -bottom-14 -right-14 md:-bottom-20 md:-right-20 w-64 md:w-96 z-0 pointer-events-none rotate-180" style={{ WebkitMaskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 70%)', maskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 70%)' }}>
                <img src="/folhagens-vibrant.png" alt="" className="w-full brightness-[1.1] contrast-[1.1]" />
            </div>

            {/* Main Content Card Container */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl w-full space-y-8 md:space-y-10"
            >


                {/* Quote */}
                <div className="space-y-2 px-4 italic">
                    <p className="text-[10px] md:text-xs leading-relaxed max-w-xs mx-auto text-midnight-olive/40 uppercase tracking-widest">
                        "Assim, eles já não são dois, mas sim uma só carne. Portanto, o que Deus uniu, ninguém separa."
                    </p>
                    <p className="text-[8px] md:text-[10px] uppercase tracking-tighter text-midnight-olive/30">(Mateus 19:6)</p>
                </div>

                {/* Sub-header */}
                <div className="space-y-1">
                    <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] text-midnight-olive/40">Com a bênção de Deus e de nossas famílias</p>
                </div>

                {/* Names */}
                <h1 className="text-5xl md:text-8xl font-script text-midnight-olive py-2 whitespace-nowrap">
                    Fernando e Vittórya
                </h1>

                {/* Ceremony Text */}
                <div className="space-y-4">
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-midnight-olive/50 leading-loose">
                        Convidam para a celebração de seu casamento <br className="hidden md:block" /> a ser realizado em
                    </p>

                    <div className="space-y-6 pt-4">
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-[0.5px] w-8 md:w-12 bg-gold/40"></div>
                            <h2 className="text-2xl md:text-4xl font-headline tracking-[0.2em] text-midnight-olive uppercase">
                                22 <span className="text-gold">.</span> 05 <span className="text-gold">.</span> 2026
                            </h2>
                            <div className="h-[0.5px] w-8 md:w-12 bg-gold/40"></div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-xs md:text-sm font-label tracking-[0.5em] text-midnight-olive/40 uppercase">
                                Sexta-feira <span className="text-gold/60 mx-2">|</span> 19:00h
                            </p>

                            <div className="space-y-2 pt-2">
                                <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-midnight-olive/60 border-t border-midnight-olive/10 pt-6 w-fit mx-auto">
                                    Capela Nossa Senhora da Assunção
                                </p>
                                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-gold font-medium">
                                    Cantinho do Fiorello
                                </p>
                                <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-midnight-olive/40">
                                    Natividade <span className="text-midnight-olive/20 mx-1">•</span> RJ
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Capacity Notice */}
                <div className="pt-4 px-4">
                    <p className="text-[9px] md:text-[11px] uppercase tracking-[0.15em] text-midnight-olive/60 font-medium max-w-sm mx-auto leading-relaxed">
                        Devido à capacidade do local, <br className="md:hidden" />
                        pedimos a gentileza de confirmar sua presença
                    </p>
                </div>

                {/* Fast Action Icons (Invited Style) */}
                <div className="flex flex-row items-center justify-center gap-8 md:gap-12 pt-4">
                    {/* Location */}
                    <a
                        href="https://maps.app.goo.gl/ZrpiH4w35JY7JQ1B6?g_st=ac"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-3 group"
                    >
                        <div className="w-12 h-12 rounded-full border border-midnight-olive/10 flex items-center justify-center text-midnight-olive/40 group-hover:bg-midnight-olive/5 transition-all">
                            <MapPin size={20} />
                        </div>
                        <span className="text-[8px] md:text-[9px] uppercase tracking-widest font-bold text-midnight-olive/40 whitespace-nowrap">Localização</span>
                    </a>

                    {/* RSVP */}
                    <Link href="/rsvp" className="flex flex-col items-center gap-3 group">
                        <div className="w-14 h-14 rounded-full border border-midnight-olive/10 flex items-center justify-center text-sage group-hover:bg-sage/5 transition-all shadow-sm">
                            <MessageCircle size={24} />
                        </div>
                        <span className="text-[8px] md:text-[9px] uppercase tracking-widest font-bold text-midnight-olive/40 whitespace-nowrap">Confirmar</span>
                    </Link>

                    {/* Gifts */}
                    <Link href="/presentes" className="flex flex-col items-center gap-3 group">
                        <div className="w-12 h-12 rounded-full border border-midnight-olive/10 flex items-center justify-center text-gold group-hover:bg-gold/5 transition-all">
                            <Gift size={20} />
                        </div>
                        <span className="text-[8px] md:text-[9px] uppercase tracking-widest font-bold text-midnight-olive/40 whitespace-nowrap">Presentes</span>
                    </Link>
                </div>

                <div className="pt-4">
                    <p className="text-[8px] uppercase tracking-widest text-midnight-olive/20 flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-midnight-olive/10" />
                        Clique nos ícones para acessar
                        <span className="w-4 h-[1px] bg-midnight-olive/10" />
                    </p>
                </div>
            </motion.div>
            <Footer />

            {/* Elegant Card Texture Overlay - Hidden on mobile to avoid iOS artifacts */}
            <div
                className="hidden md:block absolute inset-0 pointer-events-none opacity-[0.08]"
                style={{
                    backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
                }}
            />
        </section>
    );
}
