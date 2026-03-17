"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    Gift,
    Search,
    CheckCircle2,
    X,
    Send,
    QrCode,
    Utensils,
    Coffee,
    Bed,
    Wine,
    Tv,
    ShoppingCart,
    MessageCircle
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import WhatsAppButton from "./WhatsAppButton";

interface GiftItem {
    id: number;
    name: string;
    category: string;
    price?: number;
    productUrl?: string;
    isGiven: boolean;
}

export default function GiftRegistry() {
    const [gifts, setGifts] = useState<GiftItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Todos");
    const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form state
    const [giverName, setGiverName] = useState("");
    const [giverMessage, setGiverMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchGifts();
    }, []);

    const fetchGifts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/gifts");
            if (res.ok) {
                const data = await res.json();
                setGifts(data);
            }
        } catch (error) {
            console.error("Error fetching gifts:", error);
        } finally {
            setLoading(false);
        }
    };

    const categories = useMemo(() => {
        const cats = new Set(gifts.map((g) => g.category));
        return ["Todos", ...Array.from(cats)];
    }, [gifts]);

    const filteredGifts = useMemo(() => {
        return gifts.filter((g) => {
            const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase());
            const matchesFilter = filter === "Todos" || g.category === filter;
            return matchesSearch && matchesFilter;
        });
    }, [gifts, search, filter]);

    const handleGiftClick = (gift: GiftItem) => {
        setSelectedGift(gift);
        setIsModalOpen(true);
        setSuccess(false);
    };

    const handleSubmitGift = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedGift || !giverName) return;

        setSubmitting(true);
        try {
            const res = await fetch("/api/gifts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    giftId: selectedGift.id,
                    giverName,
                    giverMessage,
                }),
            });

            if (res.ok) {
                setSuccess(true);
                setGifts(prev => prev.filter(g => g.id !== selectedGift.id));
                setTimeout(() => {
                    setIsModalOpen(false);
                    setSelectedGift(null);
                    setGiverName("");
                    setGiverMessage("");
                }, 3000);
            }
        } catch (error) {
            console.error("Error submitting gift:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category.toLowerCase()) {
            case "cozinha": return <Utensils size={20} className="text-sage" />;
            case "eletro": return <Coffee size={20} className="text-sage" />;
            case "cama/banho": return <Bed size={20} className="text-sage" />;
            case "eletrodoméstico": return <Tv size={20} className="text-sage" />;
            default: return <Gift size={20} className="text-sage" />;
        }
    };

    return (
        <section className="relative min-h-screen bg-ivory font-body text-slate-800 pb-20 overflow-x-hidden">
            {/* Elegant Watercolor Background Elements (Four Corners - Fixed) */}
            <div className="fixed -top-6 -left-6 md:-top-12 md:-left-12 w-48 md:w-64 opacity-50 z-0 pointer-events-none">
                <img src="/folhagens-premium.png" alt="" className="w-full mix-blend-multiply brightness-[1.1] contrast-[1.1]" />
            </div>
            <div className="fixed -top-6 -right-6 md:-top-12 md:-right-12 w-48 md:w-64 opacity-50 z-0 pointer-events-none scale-x-[-1]">
                <img src="/folhagens-premium.png" alt="" className="w-full mix-blend-multiply brightness-[1.1] contrast-[1.1]" />
            </div>
            <div className="fixed -bottom-6 -left-6 md:-bottom-12 md:-left-12 w-48 md:w-64 opacity-50 z-0 pointer-events-none scale-y-[-1]">
                <img src="/folhagens-premium.png" alt="" className="w-full mix-blend-multiply brightness-[1.1] contrast-[1.1]" />
            </div>
            <div className="fixed -bottom-6 -right-6 md:-bottom-12 md:-right-12 w-48 md:w-64 opacity-50 z-0 pointer-events-none rotate-180">
                <img src="/folhagens-premium.png" alt="" className="w-full mix-blend-multiply brightness-[1.1] contrast-[1.1]" />
            </div>

            <main className="relative z-10 flex flex-col items-center px-4 md:px-24 pt-32">
                <header className="text-center max-w-2xl mb-12">
                    <h1 className="font-headline text-4xl md:text-5xl text-charcoal mb-4">Nossa Lista de Presentes</h1>
                    <p className="text-charcoal/70 leading-relaxed font-light text-sm md:text-base">
                        Sua presença é o que mais importa, mas se quiser nos presentear, aqui estão algumas sugestões para o nosso novo lar.
                    </p>
                </header>

                {/* Search & Filter */}
                <div className="w-full max-w-6xl mb-10 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar por nome..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/60 border border-gold/10 rounded-full py-3 pl-12 pr-6 focus:ring-2 focus:ring-gold/20 outline-none transition-all placeholder:text-charcoal/50 text-sm"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-2 -mx-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all ${filter === cat
                                        ? "bg-sage text-white shadow-lg"
                                        : "bg-white/60 text-charcoal/60 hover:bg-white"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="py-20">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-6xl">
                        {filteredGifts.map((gift, index) => {
                            // Create a bento pattern: every 5th element is wide
                            const isLarge = index % 7 === 0;
                            const isWide = index % 7 === 1;

                            return (
                                <motion.div
                                    key={gift.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ y: -5 }}
                                    className={`
                                        ${isLarge ? "md:col-span-2 md:row-span-2" : ""}
                                        ${isWide ? "md:col-span-2" : ""}
                                        bg-white/60 backdrop-blur-md border border-white/30 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group
                                    `}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-sage border border-sage/20 bg-sage-50/50 px-3 py-1 rounded-full">{gift.category}</span>
                                            {getCategoryIcon(gift.category)}
                                        </div>
                                        {isLarge && (
                                            <div className="hidden border md:flex w-full h-40 bg-gold/5 rounded-2xl mb-6 items-center justify-center">
                                                <Gift size={48} className="text-gold/20" />
                                            </div>
                                        )}
                                        <h3 className={`font-headline text-charcoal mb-3 ${isLarge ? "text-2xl" : "text-xl"}`}>{gift.name}</h3>
                                        <p className="text-xs text-charcoal/60 mb-6 leading-relaxed">Um toque de carinho para o nosso lar.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="h-[1px] w-full bg-gold/10"></div>
                                        <div className={`${isWide ? "flex flex-col sm:flex-row gap-3" : "grid grid-cols-1 gap-3"}`}>
                                            {gift.productUrl && (
                                                <button
                                                    onClick={() => window.open(gift.productUrl, "_blank")}
                                                    className="flex-1 border border-gold/30 text-charcoal py-3 rounded-xl text-[10px] font-bold uppercase hover:bg-white transition-colors"
                                                >
                                                    Ver na Loja
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleGiftClick(gift)}
                                                className="flex-1 bg-sage text-white py-3 rounded-xl text-[10px] font-bold uppercase hover:bg-sage/80 transition-colors shadow-lg flex items-center justify-center gap-2"
                                            >
                                                Presentear via PIX
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* Floating Quick PIX Card */}
                <div className="fixed bottom-12 right-4 md:right-12 z-40 bg-white/80 backdrop-blur-md rounded-2xl p-2 flex items-center shadow-2xl border border-white/50 group transition-all cursor-pointer overflow-hidden max-w-[50px] hover:max-w-[300px]"
                    onClick={() => {
                        navigator.clipboard.writeText("15175144790");
                        alert("Chave PIX copiada!");
                    }}
                >
                    <div className="bg-sage p-3 rounded-xl text-white shadow-inner group-hover:bg-sage transition-colors shrink-0">
                        <QrCode size={20} />
                    </div>
                    <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pr-4">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-sage">Chave PIX Rápida (CPF)</p>
                        <p className="text-xs font-mono text-charcoal">151.751.447-90</p>
                    </div>
                </div>
                <WhatsAppButton />
            </main>

            {/* Gifting Modal (same logic as before but updated style) */}
            <AnimatePresence>
                {isModalOpen && selectedGift && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !submitting && setIsModalOpen(false)}
                            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-ivory w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl overflow-y-auto max-h-[90vh]"
                        >
                            {success ? (
                                <div className="p-12 text-center space-y-6">
                                    <div className="flex justify-center">
                                        <CheckCircle2 className="text-sage w-20 h-20" />
                                    </div>
                                    <h2 className="font-headline text-3xl">Muito obrigado!</h2>
                                    <p className="text-charcoal/70 italic">Sua intenção de presente foi registrada. O carinho de vocês aquece nossos corações!</p>
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="absolute top-6 right-6 p-2 text-charcoal/40 hover:text-charcoal transition-colors z-10"
                                    >
                                        <X size={24} />
                                    </button>

                                    <div className="p-8 md:p-12">
                                        <span className="text-gold text-[10px] uppercase tracking-widest font-bold mb-2 block">Presenteando</span>
                                        <h2 className="font-headline text-3xl mb-8 leading-tight">{selectedGift.name}</h2>

                                        <div className="bg-white/60 rounded-2xl p-6 border border-gold/10 mb-8 flex flex-col gap-4">
                                            <div className="flex items-center justify-between border-b border-gold/10 pb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-sage/10 rounded-xl">
                                                        <QrCode className="text-sage" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-charcoal/50 uppercase tracking-widest mb-1 font-bold">Chave PIX (CPF)</p>
                                                        <p className="font-bold text-charcoal">151.751.447-90</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText("15175144790")}
                                                    className="text-[10px] uppercase tracking-tighter font-bold text-gold hover:text-charcoal transition-colors border-b border-gold/30"
                                                >
                                                    Copiar
                                                </button>
                                            </div>

                                            {selectedGift.price && (
                                                <div className="flex items-center justify-between pt-2">
                                                    <div>
                                                        <p className="text-[10px] text-charcoal/50 uppercase tracking-widest mb-1 font-bold">Valor Sugerido</p>
                                                        <p className="text-xl font-headline text-sage">
                                                            R$ {selectedGift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => navigator.clipboard.writeText(selectedGift.price?.toString() || "")}
                                                        className="text-[10px] uppercase tracking-tighter font-bold text-gold hover:text-charcoal transition-colors border-b border-gold/30"
                                                    >
                                                        Copiar Valor
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <form onSubmit={handleSubmitGift} className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/50 ml-1">Seu Nome</label>
                                                <input
                                                    required
                                                    value={giverName}
                                                    onChange={(e) => setGiverName(e.target.value)}
                                                    placeholder="Como você gostaria de assinar?"
                                                    className="w-full bg-white/40 border-0 border-b border-gold/20 py-3 focus:ring-0 focus:border-gold outline-none transition-all placeholder:text-charcoal/20"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/50 ml-1">Seu Recado/Cartão</label>
                                                <textarea
                                                    value={giverMessage}
                                                    onChange={(e) => setGiverMessage(e.target.value)}
                                                    placeholder="Envie uma mensagem especial para nós..."
                                                    rows={3}
                                                    className="w-full bg-white/40 border-0 border-b border-gold/20 py-3 focus:ring-0 focus:border-gold outline-none transition-all resize-none placeholder:text-charcoal/20"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full py-4 bg-sage text-white rounded-2xl font-label tracking-widest uppercase hover:bg-sage/80 transition-all shadow-xl shadow-sage/10 flex items-center justify-center gap-2 disabled:opacity-50"
                                            >
                                                {submitting ? "Processando..." : (
                                                    <>
                                                        <Send size={18} />
                                                        Enviar Presente
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
