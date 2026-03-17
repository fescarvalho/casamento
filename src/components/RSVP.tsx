"use client";

import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const rsvpSchema = z.object({
    nomeCompleto: z.string().min(3, "Por favor, informe seu nome completo"),
    telefone: z.string().min(10, "Por favor, informe um telefone válido"),
    numeroAcompanhantes: z.number().min(0).max(2),
    acompanhantes: z.array(z.object({
        nome: z.string().min(2, "Nome do acompanhante é obrigatório")
    })).optional(),
});

type FormInput = z.infer<typeof rsvpSchema>;

export default function RSVP() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isValid },
    } = useForm<FormInput>({
        resolver: zodResolver(rsvpSchema),
        defaultValues: {
            nomeCompleto: "",
            telefone: "",
            numeroAcompanhantes: 0,
            acompanhantes: [],
        },
        mode: "onChange"
    });

    const { fields, replace } = useFieldArray({
        control,
        name: "acompanhantes"
    });

    const numAcompanhantes = watch("numeroAcompanhantes");

    // Dynamic field logic
    useEffect(() => {
        const count = parseInt(String(numAcompanhantes)) || 0;
        const newFields = Array.from({ length: count }, () => ({ nome: "" }));
        replace(newFields);
    }, [numAcompanhantes, replace]);

    const onSubmit = async (data: FormInput) => {
        setStatus("loading");
        try {
            // Transform companions array to comma-separated string for simplicity in DB
            const companionNames = data.acompanhantes?.map(a => a.nome).join(", ") || "";

            const response = await fetch("/api/rsvp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nomeCompleto: data.nomeCompleto,
                    telefone: data.telefone,
                    numeroAcompanhantes: data.numeroAcompanhantes,
                    nomesAcompanhantes: companionNames,
                }),
            });

            if (response.ok) {
                setStatus("success");
            } else {
                throw new Error("Erro ao confirmar");
            }
        } catch (error) {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <section className="min-h-[100dvh] w-full flex flex-col items-center bg-white overflow-x-hidden relative pt-32 pb-10 text-olive">

            {/* Elegant Card Texture Overlay - Matching HomeCover */}
            <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] mix-blend-multiply" />

            {/* Elegant Watercolor Background Elements (Four Corners - Subtle) */}
            <div className="absolute -top-14 -left-14 md:-top-20 md:-left-20 w-64 md:w-80 opacity-60 z-0 pointer-events-none">
                <img src="/folhagens-vibrant.png" alt="" className="w-full mix-blend-multiply brightness-[1.1] contrast-[1.1]" />
            </div>
            <div className="absolute -top-14 -right-14 md:-top-20 md:-right-20 w-64 md:w-80 opacity-60 z-0 pointer-events-none scale-x-[-1]">
                <img src="/folhagens-vibrant.png" alt="" className="w-full mix-blend-multiply brightness-[1.1] contrast-[1.1]" />
            </div>
            <div className="absolute -bottom-20 -left-20 md:-bottom-28 md:-left-28 w-64 md:w-80 opacity-60 z-0 pointer-events-none scale-y-[-1]">
                <img src="/folhagens-vibrant.png" alt="" className="w-full mix-blend-multiply brightness-[1.1] contrast-[1.1]" />
            </div>
            <div className="absolute -bottom-20 -right-20 md:-bottom-28 md:-right-28 w-64 md:w-80 opacity-60 z-0 pointer-events-none rotate-180">
                <img src="/folhagens-vibrant.png" alt="" className="w-full mix-blend-multiply brightness-[1.1] contrast-[1.1]" />
            </div>

            <div className="relative z-10 w-full max-w-lg px-6 md:px-8">
                <AnimatePresence mode="wait">
                    {status !== "success" ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="space-y-8 md:space-y-10"
                        >
                            <div className="text-center space-y-4">
                                <h1 className="font-headline text-3xl md:text-5xl text-olive font-light tracking-tight px-2 leading-tight">
                                    Confirmação de Presença
                                </h1>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-[0.5px] bg-gold/30" />
                                    <p className="text-charcoal/40 font-body text-[10px] italic">
                                        Crianças menores de 10 anos não precisam ser informadas.
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                <div className="space-y-10">
                                    {/* Nome Completo */}
                                    <div className="space-y-3">
                                        <label className="block text-[10px] uppercase tracking-[0.25em] text-midnight-olive/80 font-bold ml-1">
                                            Nome do Convidado
                                        </label>
                                        <div className="relative group">
                                            <input
                                                {...register("nomeCompleto")}
                                                type="text"
                                                placeholder="Como no convite"
                                                className="w-full bg-transparent border-b border-midnight-olive/10 py-3 px-1 focus:ring-0 focus:border-gold transition-all text-lg text-midnight-olive font-headline placeholder:text-midnight-olive/20"
                                            />
                                            {errors.nomeCompleto && (
                                                <span className="text-[9px] text-red-500 uppercase tracking-widest absolute -bottom-6 left-1 font-bold">
                                                    {errors.nomeCompleto.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Telefone */}
                                    <div className="space-y-3">
                                        <label className="block text-[10px] uppercase tracking-[0.25em] text-midnight-olive/80 font-bold ml-1">
                                            Telefone de Contato
                                        </label>
                                        <div className="relative group">
                                            <input
                                                {...register("telefone")}
                                                type="tel"
                                                placeholder="(00) 00000-0000"
                                                className="w-full bg-transparent border-b border-midnight-olive/10 py-3 px-1 focus:ring-0 focus:border-gold transition-all text-lg text-midnight-olive font-headline placeholder:text-midnight-olive/20"
                                            />
                                            {errors.telefone && (
                                                <span className="text-[9px] text-red-500 uppercase tracking-widest absolute -bottom-6 left-1 font-bold">
                                                    {errors.telefone.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Numero de Acompanhantes */}
                                    <div className="space-y-3">
                                        <label className="block text-[10px] uppercase tracking-[0.25em] text-midnight-olive/80 font-bold ml-1">
                                            Número de acompanhantes
                                        </label>
                                        <div className="relative">
                                            <select
                                                {...register("numeroAcompanhantes", { valueAsNumber: true })}
                                                className="w-full bg-transparent border-b border-midnight-olive/10 py-3 px-1 focus:ring-0 focus:border-gold transition-colors text-lg text-midnight-olive font-headline appearance-none cursor-pointer"
                                            >
                                                {[0, 1, 2].map((num) => (
                                                    <option key={num} value={num} className="bg-white">
                                                        {num === 0 ? "Apenas eu" : `${num} acompanhante${num > 1 ? "s" : ""}`}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-midnight-olive/30 text-[10px]">
                                                ▼
                                            </div>
                                        </div>
                                    </div>

                                    {/* Acompanhantes Dinâmicos */}
                                    <div className="max-h-[30dvh] overflow-y-auto pr-2 custom-scrollbar transition-all">
                                        <AnimatePresence>
                                            {fields.map((field, index) => (
                                                <motion.div
                                                    key={field.id}
                                                    initial={{ opacity: 0, x: -5 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 5 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className="relative py-4 space-y-2"
                                                >
                                                    <label className="block text-[9px] uppercase tracking-widest text-midnight-olive/40 font-medium ml-1">
                                                        Nome do acompanhante {index + 1}
                                                    </label>
                                                    <input
                                                        {...register(`acompanhantes.${index}.nome` as const)}
                                                        type="text"
                                                        placeholder="Nome completo"
                                                        className="w-full bg-midnight-olive/[0.02] border-b border-midnight-olive/5 py-2 px-2 focus:ring-0 focus:border-gold/40 transition-colors text-base text-midnight-olive/80 font-headline placeholder:text-midnight-olive/20"
                                                    />
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    disabled={!isValid || status === "loading"}
                                    className="w-full py-5 bg-olive text-white rounded-xl font-label tracking-[0.3em] text-[10px] uppercase shadow-xl shadow-olive/10 transition-all hover:bg-olive/90 disabled:bg-olive/10 disabled:text-olive/30 disabled:shadow-none disabled:cursor-not-allowed mt-4"
                                >
                                    {status === "loading" ? "Processando..." : "Confirmar Presença"}
                                </motion.button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-8"
                        >
                            <div className="w-24 h-24 bg-gold/5 rounded-full flex items-center justify-center mx-auto relative">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1.2 }}
                                    className="text-gold text-4xl"
                                >
                                    ♥
                                </motion.div>
                                <div className="absolute inset-0 border border-gold/10 rounded-full animate-ping"></div>
                            </div>
                            <div className="space-y-4">
                                <h2 className="font-headline text-3xl md:text-4xl text-slate-800 leading-tight">
                                    Obrigado por celebrar esse <br />
                                    <span className="text-gold italic font-light lowercase">momento</span>
                                </h2>
                                <p className="text-slate-500 font-headline text-xl">com Fernando & Vittórya!</p>
                            </div>
                            <div className="pt-6">
                                <p className="text-slate-300 text-[10px] font-label tracking-widest uppercase flex items-center justify-center gap-3">
                                    <span className="w-8 h-[0.5px] bg-slate-100"></span>
                                    Sua confirmação foi recebida
                                    <span className="w-8 h-[0.5px] bg-slate-100"></span>
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #c5a05933;
                    border-radius: 10px;
                }
            `}</style>
            <Footer />
        </section>
    );
}
