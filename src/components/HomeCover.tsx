"use client";

import { motion } from "framer-motion";
import { Church, Heart, Diamond } from "lucide-react";
import { useState, useEffect } from "react";

export default function HomeCover() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        mins: 0,
    });

    useEffect(() => {
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
        <section className="relative h-screen flex items-center justify-center px-6 bg-ivory text-charcoal overflow-hidden shrink-0">
            {/* Lateral Decorative Elements (Left) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 md:w-64 h-full flex flex-col justify-between py-20 pointer-events-none opacity-40">
                <img
                    className="w-full object-contain"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSsHgHNKfiAKc2kSNCwJ4frabY4w-ICKdDG7xn0sfYUXC1uOtTmpOT3TR3rhqF5g4JVC6gOsNN1r6_jC3lgAZdUXe5LS1Ir5-5Jvd7KgRme9xBoU6HLh3xp8wwHgvUx_BoiVzK6g__CEhq4hGJDXSga3U1nTP6Y8Zu15XRPQr_W6U8mnAzSqQf72MHtbUwN0W5ZTjslJxmO-lLnPeVuahBYBY1fXdcRVHIOacDISINvVFDUI7pmkfG3PLxzfHq21UQIWxddLe_KoHL"
                    alt="Sage watercolor leaves"
                />
                <div className="flex justify-center">
                    <Heart className="text-gold w-10 h-10 opacity-20" />
                </div>
                <img
                    className="w-full object-contain rotate-180"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD07wokwk0CyuSOMgYR5LhfczfN9RI8WRfsX55dEuOR7YK-eLhep5GeBMedsC54hFFd3tuiBp7VMbH56ihCvLOgTWrhol1srWEeQkCbATTG3U3u8O5gZkzgjm133Wwg1IT-gD2U2Q7i6Cp0IByt3bPy82yp-xk8Z9yrzKNwqHh9u22rGScmnXFR98exqsw7lIziCyghahYrCevhjbcYZXNGFPPaby3TK_VkgMccoX5oWisbV0834JgP-AEscXGnnapmUpFewChfrIPz"
                    alt="Eucalyptus branch"
                />
            </div>

            {/* Lateral Decorative Elements (Right) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 md:w-64 h-full flex flex-col justify-between py-20 pointer-events-none opacity-40">
                <img
                    className="w-full object-contain scale-x-[-1]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjfhWd6NTElDuoWwBBLxIMG-gLvwI0DZmuClccJaeqOPLv9Ww-XqheotqM7E8FFKna4K_OrgsGzTsYKpTR8990HVzUY2vBCGoRU90jGKAJjBK9cGPdg5xXnJJZnbky0uw7EjWdl5uavhKK7F6G-rjB8c-M_Qo8c0qpGSKmDQcaWtHJmnfxzYCk7ckx_zGCHC5B0g9wwXlt6nDgp_XW6YXzlqLTT5U3uf0gc7SPcu3fDOSP1EAE1Ftu7FwQ7C68bm2ymRD_MCx2u4hN"
                    alt="Watercolor branch"
                />
                <div className="flex justify-center">
                    <Heart className="text-gold w-10 h-10 opacity-20 fill-gold" />
                </div>
                <img
                    className="w-full object-contain scale-x-[-1] rotate-180"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKJwb_cqGu2riARloov0X6FIjepW3fHE_8mwaLm2lNecKr8FAX2EfRChGoSLEseRPqEH9JDcNQGNqAjnG6xyc1i3_zSnEFrxl9cz9AvBmDYfSfmu5xS_SgAt9n2lozSuoDPmFNbZPzFCR_e59ZonXILh517meZkImVSl5jvUdIFnDsUF0ym9jbzY18zZUur_yMVYNaSHJlKl8mvM1xQanV7SwFHeO25ofJmUsok9VhFlFIZFtXN3LGjMZEdsygRMkJEGumVniZrmRU"
                    alt="Botanical heart"
                />
            </div>

            {/* Central Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-4xl w-full text-center space-y-12 z-10"
            >
                <div className="space-y-4">
                    <span className="block text-gold font-label tracking-[0.3em] uppercase text-xs mb-4">Save Our Date</span>
                    <h1 className="text-6xl md:text-8xl font-headline text-charcoal">Fernando & Vittorya</h1>
                    <div className="flex items-center justify-center gap-4 py-2">
                        <div className="h-[1px] w-12 bg-gold/30"></div>
                        <Church className="text-gold w-6 h-6" />
                        <div className="h-[1px] w-12 bg-gold/30"></div>
                    </div>
                </div>

                <p className="text-lg md:text-xl text-charcoal/80 max-w-2xl mx-auto font-light leading-relaxed italic">
                    Com a bênção de Deus e de nossas famílias, convidamos você para celebrar o início do nosso "para sempre".
                </p>

                {/* Wedding Date/Countdown */}
                <div className="flex flex-wrap justify-center gap-6 mt-12">
                    <div className="bg-white/40 backdrop-blur-md border border-gold/20 px-8 py-6 rounded-xl flex flex-col items-center min-w-[100px]">
                        <span className="text-3xl font-headline text-gold">{timeLeft.days}</span>
                        <span className="text-[10px] font-label uppercase tracking-widest text-charcoal/60 mt-1">Dias</span>
                    </div>
                    <div className="bg-white/40 backdrop-blur-md border border-gold/20 px-8 py-6 rounded-xl flex flex-col items-center min-w-[100px]">
                        <span className="text-3xl font-headline text-gold">{timeLeft.hours}</span>
                        <span className="text-[10px] font-label uppercase tracking-widest text-charcoal/60 mt-1">Horas</span>
                    </div>
                    <div className="bg-white/40 backdrop-blur-md border border-gold/20 px-8 py-6 rounded-xl flex flex-col items-center min-w-[100px]">
                        <span className="text-3xl font-headline text-gold">{timeLeft.mins}</span>
                        <span className="text-[10px] font-label uppercase tracking-widest text-charcoal/60 mt-1">Minutos</span>
                    </div>
                </div>

                <div className="pt-8">
                    <p className="text-charcoal font-label tracking-widest text-sm uppercase">22 de Maio de 2026 • 19:00h</p>
                    <a
                        href="https://www.google.com/maps/search/?api=1&query=Capela+Nossa+Senhora+da+Assunção+Rio+de+Janeiro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold hover:text-charcoal transition-colors text-xs mt-2 uppercase tracking-widest border-b border-gold/30 block w-fit mx-auto"
                    >
                        Capela Nossa Senhora da Assunção • Cantinho do Fiorello - Natividade-RJ
                    </a>
                </div>
            </motion.div>

            {/* Geometric Heart Accents */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[15%] opacity-10">
                    <Diamond className="w-16 h-16 text-sage" />
                </div>
                <div className="absolute bottom-[20%] right-[15%] opacity-10">
                    <Diamond className="w-16 h-16 text-sage" />
                </div>
            </div>
        </section>
    );
}
