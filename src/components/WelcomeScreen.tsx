"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState(0);
    const [isOpening, setIsOpening] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setStep(1), 500); // Save the Date
        const timer2 = setTimeout(() => setStep(2), 1800); // Fernando & Vittórya
        const timer3 = setTimeout(() => setStep(3), 3200); // 22.05.2026
        const timer4 = setTimeout(() => setStep(4), 4500); // Show Button

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, []);

    const handleOpen = () => {
        setIsOpening(true);
        // Wait for the slide-up animation to complete before removing the component
        setTimeout(() => onComplete(), 1500);
    };

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={isOpening ? { y: "-100vh" } : { y: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} // Elegant easing for an "envelope pull"
            className="fixed inset-0 z-[200] bg-ivory flex flex-col items-center justify-center overflow-hidden"
        >
            <motion.div 
                animate={isOpening ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col items-center justify-center text-center px-6 w-full h-full"
            >
                {/* Save the Date */}
                <div className="h-8 md:h-12 overflow-hidden mb-2 md:mb-4">
                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={step >= 1 ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="text-[10px] md:text-[12px] font-label tracking-[0.5em] text-gold uppercase"
                    >
                        Save the Date
                    </motion.p>
                </div>

                {/* Names */}
                <div className="h-16 md:h-24 overflow-hidden mb-4 md:mb-6">
                    <motion.h1
                        initial={{ y: 80, opacity: 0 }}
                        animate={step >= 2 ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 1, ease: "circOut" }}
                        className="text-3xl md:text-5xl font-headline text-midnight-olive font-bold tracking-tight"
                    >
                        Fernando & Vittórya
                    </motion.h1>
                </div>

                {/* Date */}
                <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={step >= 3 ? { scaleX: 1 } : {}}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="h-[1px] w-12 md:w-20 bg-gold/30 mb-4"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1.2, ease: "circOut" }}
                        className="text-xs md:text-sm font-label tracking-[0.3em] text-gold/80"
                    >
                        22 • 05 • 2026
                    </motion.p>
                </div>

                {/* Open Invitation Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={step >= 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mt-12 md:mt-16 h-16 flex items-center"
                >
                    {step >= 4 && (
                        <button 
                            onClick={handleOpen}
                            className="text-xs md:text-[13px] uppercase tracking-[0.3em] bg-transparent text-midnight-olive border border-midnight-olive/20 hover:border-gold hover:text-gold px-8 py-3 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 backdrop-blur-sm"
                        >
                            Abrir Convite
                        </button>
                    )}
                </motion.div>

                {/* Premium Texture Overlay */}
                <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            </motion.div>

            {/* Subtle Progress Bar */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={step >= 4 && !isOpening ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 4.5, ease: "linear" }}
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold/40 origin-left"
            />
        </motion.div>
    );
}
