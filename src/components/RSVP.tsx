"use client";

import { motion } from "framer-motion";
import { Calendar, Leaf, Heart, Sprout } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const rsvpSchema = z.object({
    nomeCompleto: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    numeroAcompanhantes: z.coerce.number().int().min(0),
    telefone: z.string().min(10, "Informe um telefone válido com DDD"),
});

type FormInput = z.input<typeof rsvpSchema>;
type FormOutput = z.output<typeof rsvpSchema>;

export default function RSVP() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormInput>({
        resolver: zodResolver(rsvpSchema),
        defaultValues: {
            nomeCompleto: "",
            numeroAcompanhantes: 0,
            telefone: "",
        },
    });

    const onSubmit: SubmitHandler<FormInput> = async (data) => {
        // data here is actually the output of the resolver if validated
        // But SubmitHandler expects FormInput. We'll cast carefully or just use the output type.
        const validatedData = data as FormOutput;

        setStatus("loading");
        try {
            const response = await fetch("/api/rsvp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(validatedData),
            });

            if (response.ok) {
                setStatus("success");
                setMessage("Presença confirmada com sucesso! Mal podemos esperar para te ver.");
                reset();
            } else {
                throw new Error("Erro ao confirmar");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Ocorreu um erro ao enviar. Por favor, tente novamente mais tarde.");
        }
    };

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-20 bg-ivory shrink-0 overflow-x-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none opacity-15 flex justify-between px-4 md:px-10">
                <div className="h-full flex flex-col justify-between py-20">
                    <Leaf className="w-24 h-24 md:w-48 md:h-48 text-sage" />
                    <Heart className="w-16 h-16 md:w-32 md:h-32 text-sage fill-sage" />
                </div>
                <div className="h-full flex flex-col justify-center py-20">
                    <div className="rotate-180">
                        <Sprout className="w-32 h-32 md:w-60 md:h-60 text-sage" />
                    </div>
                </div>
            </div>

            {/* RSVP Card */}
            <div className="relative z-10 w-full max-w-2xl px-4 md:px-6">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="bg-white/40 backdrop-blur-xl border border-white/60 p-6 md:p-16 rounded-3xl shadow-2xl shadow-sage/5"
                >
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-4">
                            <Calendar className="text-gold w-10 h-10" />
                        </div>
                        <h1 className="font-headline text-4xl md:text-5xl font-light text-sage mb-6">Confirme sua Presença</h1>
                        <p className="text-charcoal/70 max-w-md mx-auto leading-relaxed">
                            Mal podemos esperar para viver esse sonho ao seu lado. Por favor, confirme sua presença e nos ajude a tornar este dia inesquecível.
                        </p>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-8">
                            {/* Nome Completo */}
                            <div className="relative group">
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-2">Nome completo</label>
                                <input
                                    {...register("nomeCompleto")}
                                    className="w-full bg-transparent border-0 border-b border-sage/30 py-3 px-0 focus:ring-0 focus:border-gold transition-colors text-lg placeholder:text-charcoal/20"
                                    placeholder="Como no convite"
                                    type="text"
                                />
                                {errors.nomeCompleto && <span className="text-[10px] text-red-500 uppercase mt-1">{errors.nomeCompleto.message}</span>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Acompanhantes */}
                                <div className="relative">
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-2">Número de acompanhantes</label>
                                    <select
                                        {...register("numeroAcompanhantes")}
                                        className="w-full bg-transparent border-0 border-b border-sage/30 py-3 px-0 focus:ring-0 focus:border-gold transition-colors text-lg appearance-none cursor-pointer"
                                    >
                                        <option value="0">Apenas eu</option>
                                        <option value="1">1 Acompanhante</option>
                                        <option value="2">2 Acompanhantes</option>
                                        <option value="3">3 Acompanhantes</option>
                                    </select>
                                </div>
                                {/* Telefone */}
                                <div className="relative">
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-2">Telefone</label>
                                    <input
                                        {...register("telefone")}
                                        className="w-full bg-transparent border-0 border-b border-sage/30 py-3 px-0 focus:ring-0 focus:border-gold transition-colors text-lg placeholder:text-charcoal/20"
                                        placeholder="(00) 00000-0000"
                                        type="tel"
                                    />
                                    {errors.telefone && <span className="text-[10px] text-red-500 uppercase mt-1">{errors.telefone.message}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex flex-col items-center">
                            <button
                                disabled={status === "loading"}
                                className="group relative px-12 py-4 bg-gold text-white rounded-full font-label tracking-widest text-sm uppercase overflow-hidden transition-all hover:bg-sage shadow-lg shadow-gold/20 disabled:opacity-50"
                            >
                                <span className="relative z-10">{status === "loading" ? "Confirmando..." : "Confirmar"}</span>
                            </button>

                            {status === "success" && (
                                <p className="mt-4 text-sage font-medium text-sm animate-fade-in">{message}</p>
                            )}
                            {status === "error" && (
                                <p className="mt-4 text-red-500 font-medium text-sm animate-fade-in">{message}</p>
                            )}

                            <div className="mt-6 flex items-center space-x-2 text-sage/50">
                                <Heart className="w-4 h-4 fill-sage opacity-50" />
                                <span className="text-[10px] uppercase tracking-widest">Até logo!</span>
                                <Heart className="w-4 h-4 fill-sage opacity-50" />
                            </div>
                        </div>
                    </form>
                </motion.div>
            </div>

            {/* Image Detail */}
            <div className="absolute bottom-10 right-10 hidden xl:block w-48 h-48 rounded-2xl overflow-hidden shadow-2xl rotate-3 border-4 border-white">
                <img
                    alt="Wedding invitation details"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9MpA2fQ6NeNUMTMhHCezIBsEFACNXLQ3UUDwdL_fDJy2knDnhykeuc1ncYwyggq78iPjb_P3P9tb0URgxXUqbG9PZB-MMyPpzDG5mzsqPruGNOh64q3iaGVQFtHz31NiJ_y3mnxw8Kxq-151k_zmTF5CntoIn4cGf9ySkbnZLtEHeBMM1pstVfpEFu170R1ukXreyzfEDRXYUnZZrmkL2Z25KRHLUlygM9oI0Y9UySYLBNqeDfZKQoLg1D2L-0fuJs1PoqytaKdq3"
                />
            </div>
        </section>
    );
}
