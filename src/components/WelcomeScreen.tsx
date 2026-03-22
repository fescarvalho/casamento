"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState(0);
    const [isOpening, setIsOpening] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [showSeal, setShowSeal] = useState(false);

    useEffect(() => {
        // Mostra o selo logo após o envelope aparecer na tela
        const timer = setTimeout(() => setShowSeal(true), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleOpen = () => {
        setIsOpening(true);
        // Orquestração de tempo:
        // 0.0s -> Flap abre (1.0s)
        // 0.8s -> Carta sobe levemente (1.2s duração)
        // 1.2s -> Envelope escorrega pra baixo (1.2s duração)
        
        // Textos aparecem após a carta já estar subindo/isolada
        setTimeout(() => setStep(1), 1400); // Save the Date
        setTimeout(() => setStep(2), 2200); // Names
        setTimeout(() => setStep(3), 3200); // Date & Line

        // Dá tempo de leitura confortável, depois o cartão cresce e dá fade out
        setTimeout(() => setIsFadingOut(true), 6500);
        
        // Finaliza a tela e libera o acesso ao site
        setTimeout(() => onComplete(), 7500);
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-black/40 perspective-[1200px]"
            style={{ 
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                // Força aceleração de hardware no iOS para evitar flickers
                transform: "translateZ(0)"
            }}
        >
            {/* ENVELOPE WRAPPER */}
            <div className="relative w-[90vw] max-w-[420px] h-[75vh] max-h-[600px] flex items-center justify-center">

                {/* BACK OF ENVELOPE (Darker Ivory) */}
                <motion.div 
                    animate={isOpening ? { y: "100vh", opacity: 0 } : { y: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute inset-0 shadow-2xl rounded-sm bg-[#EAE8E0] overflow-hidden"
                >
                     <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                </motion.div>

                {/* THE CARD (Inside the envelope) */}
                <motion.div
                    initial={{ y: 20 }}
                    animate={
                        isFadingOut
                        ? { y: 0, scale: 1.1, opacity: 0 } // Desaparece no final (centralizado)
                        : isOpening 
                        ? { y: 0, scale: 1.05, opacity: 1 } // Sobe e fica no CENTRO exato
                        : { y: 20, scale: 1, opacity: 1 } // Dentro do envelope
                    }
                    transition={
                        isFadingOut 
                        ? { duration: 1.0, ease: "easeInOut" } 
                        : isOpening 
                        ? { y: { delay: 0.8, duration: 1.2, ease: "circOut" }, scale: { delay: 1.6, duration: 2.0, ease: "circOut" } }
                        : {}
                    }
                    className="absolute w-[90%] md:w-[85%] h-[85%] md:h-[90%] bg-[#FDFCF8] rounded shadow-lg flex flex-col items-center justify-center text-center px-6 z-10 border border-black/5"
                >
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                    
                    <div className="h-8 md:h-12 overflow-hidden mb-2 md:mb-4">
                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            animate={step >= 1 ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="text-[10px] md:text-[12px] font-label tracking-[0.5em] text-midnight-olive/40 uppercase"
                        >
                            Save the Date
                        </motion.p>
                    </div>

                    <div className="min-h-20 md:min-h-24 mb-4 md:mb-6 flex items-center justify-center py-2">
                        <motion.h1
                            initial={{ y: 80, opacity: 0 }}
                            animate={step >= 2 ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 1, ease: "circOut" }}
                            className="text-3xl md:text-5xl font-script text-midnight-olive py-2 px-2 whitespace-nowrap"
                        >
                            Fernando e Vittórya
                        </motion.h1>
                    </div>

                    <div className="flex flex-col items-center">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={step >= 3 ? { scaleX: 1 } : {}}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="h-[0.5px] w-12 md:w-20 bg-gold/40 mb-4"
                        />
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1.2, ease: "circOut" }}
                            className="text-xs md:text-sm font-label tracking-[0.3em] text-midnight-olive/60"
                        >
                            22 • 05 • 2026
                        </motion.p>
                    </div>
                </motion.div>

                {/* BOTTOM POCKET (Front of envelope) */}
                <motion.div
                    animate={isOpening ? { y: "100vh", opacity: 0 } : { y: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute inset-0 z-20 pointer-events-none drop-shadow-2xl"
                    style={{
                        clipPath: "polygon(0 40%, 50% 65%, 100% 40%, 100% 100%, 0 100%)",
                        backgroundColor: "#FDFCF8" // ivory
                    }}
                >
                     <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                     <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                </motion.div>

                {/* TOP FLAP */}
                <motion.div
                    initial={{ rotateX: 0 }}
                    animate={isOpening ? { rotateX: 180, y: "100vh", opacity: 0 } : { rotateX: 0, y: 0, opacity: 1 }}
                    transition={{
                        rotateX: { duration: 1.0, ease: "easeInOut" },
                        y: { delay: 1.2, duration: 1.2, ease: [0.76, 0, 0.24, 1] },
                        opacity: { delay: 1.2, duration: 1.2 }
                    }}
                    style={{
                        clipPath: "polygon(0 0, 100% 0, 50% 50%)",
                        backgroundColor: "#FDFCF8", // ivory
                        transformOrigin: "top"
                    }}
                    className="absolute inset-0 z-30 drop-shadow-xl"
                >
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none" />
                     <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                </motion.div>

                {/* WAX SEAL (The Button) */}
                <AnimatePresence>
                    {!isOpening && showSeal && (
                        <motion.button
                            onClick={handleOpen}
                            initial={{ opacity: 0, scale: 0.5, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.5 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.6, type: "spring" }}
                            className="absolute z-40 flex items-center justify-center top-[50%] translate-y-[-50%] group"
                        >
                            <div className="relative flex items-center justify-center w-20 md:w-24 h-20 md:h-24 rounded-full bg-gradient-to-br from-[#C5A059] to-[#9E7C41] shadow-2xl border-2 border-yellow-100/30 overflow-hidden cursor-pointer hover:shadow-gold/50 hover:shadow-lg transition-shadow duration-300">
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/worn-dots.png')]" />
                                <div className="absolute inset-1 rounded-full border border-black/10" />
                                
                                <span className="relative z-10 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-[#FDFCF8] group-hover:text-white drop-shadow-md text-center leading-tight">
                                    Abrir<br/>Convite
                                </span>
                            </div>
                            
                            <motion.div 
                                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 rounded-full bg-[#C5A059]"
                            />
                        </motion.button>
                    )}
                </AnimatePresence>

            </div>
        </motion.div>
    );
}
