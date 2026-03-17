"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer1 = setTimeout(() => setStep(1), 500); // Save the Date
        const timer2 = setTimeout(() => setStep(2), 1800); // Fernando & Vittórya
        const timer3 = setTimeout(() => setStep(3), 3200); // 22.05.2026
        const timer4 = setTimeout(() => onComplete(), 5000); // Final dismiss

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] bg-ivory flex flex-col items-center justify-center overflow-hidden"
        >
            <div className="relative flex flex-col items-center justify-center text-center px-6">

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
                        className="text-3xl md:text-5xl font-headline text-charcoal tracking-tight"
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
                        className="text-xs md:text-sm font-label tracking-[0.3em] text-charcoal/60"
                    >
                        22 • 05 • 2026
                    </motion.p>
                </div>

                {/* Premium Texture Overlay */}
                <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            </div>

            {/* Subtle Progress Bar */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold/20 origin-left"
            />
        </motion.div>
    );
}
