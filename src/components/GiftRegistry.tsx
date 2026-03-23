"use client";

import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer";
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
        <section className="relative min-h-screen bg-ivory font-body text-olive/80 pb-20 overflow-x-hidden">
            {/* Elegant Watercolor Background Elements */}
            <div className="fixed -top-14 -left-14 md:-top-20 md:-left-20 w-48 md:w-64 opacity-50 z-0 pointer-events-none" style={{ WebkitMaskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 70%)', maskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 70%)' }}>
                <img src="/folhagens-premium.png" alt="" className="w-full brightness-[1.1] contrast-[1.1]" />
            </div>
            <div className="fixed -top-14 -right-14 md:-top-20 md:-right-20 w-48 md:w-64 opacity-50 z-0 pointer-events-none scale-x-[-1]" style={{ WebkitMaskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 70%)', maskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 70%)' }}>
                <img src="/folhagens-premium.png" alt="" className="w-full brightness-[1.1] contrast-[1.1]" />
            </div>
            <div className="fixed -bottom-14 -left-14 md:-bottom-20 md:-left-20 w-48 md:w-64 opacity-50 z-0 pointer-events-none scale-y-[-1]" style={{ WebkitMaskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 70%)', maskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 70%)' }}>
                <img src="/folhagens-premium.png" alt="" className="w-full brightness-[1.1] contrast-[1.1]" />
            </div>
            <div className="fixed -bottom-14 -right-14 md:-bottom-20 md:-right-20 w-48 md:w-64 opacity-50 z-0 pointer-events-none rotate-180" style={{ WebkitMaskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 70%)', maskImage: 'radial-gradient(ellipse at top left, black 30%, transparent 70%)' }}>
                <img src="/folhagens-premium.png" alt="" className="w-full brightness-[1.1] contrast-[1.1]" />
            </div>

            <main className="relative z-10 flex flex-col items-center px-4 md:px-24 pt-32">
                <header className="text-center max-w-2xl mb-12">
                    <h1 className="font-headline text-4xl md:text-5xl text-olive mb-4">Nossa Lista de Presentes</h1>
                    <p className="text-olive/70 leading-relaxed font-light text-sm md:text-base">
                        Sua presença é o que mais importa, mas se quiser nos presentear, aqui estão algumas sugestões para o nosso novo lar.
                    </p>
                    <p className="text-olive/60 leading-relaxed font-light text-xs md:text-sm mt-4 bg-white/50 border border-gold/10 rounded-2xl px-6 py-4 text-center">
                        🏠 Também teremos lista de presentes na <strong className="text-olive font-medium">Ricardo Móveis</strong> (Natividade) e na <strong className="text-olive font-medium">Super Útil</strong> (Porciúncula).
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
                        {filteredGifts.map((gift) => (

                            <motion.div
                                key={gift.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white border border-gold/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-sage border border-sage/20 bg-sage-50/50 px-3 py-1 rounded-full">{gift.category}</span>
                                    </div>

                                    <h3 className="font-headline text-charcoal mb-3 text-xl">{gift.name}</h3>
                                    <p className="text-xs text-charcoal/60 mb-6 leading-relaxed">Um toque de carinho para o nosso lar.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="h-[1px] w-full bg-gold/10"></div>
                                    <button
                                        onClick={() => handleGiftClick(gift)}
                                        className="w-full bg-olive text-white py-3 rounded-xl text-[10px] font-bold uppercase hover:bg-olive/80 transition-all shadow-lg flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                                    >
                                        <Heart size={14} />
                                        Escolher Presente
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Floating Quick PIX Card */}
                <div className="fixed bottom-12 right-4 md:right-12 z-40 bg-white rounded-2xl p-2 flex items-center shadow-2xl border border-gold/10 group transition-all cursor-pointer overflow-hidden max-w-[50px] hover:max-w-[300px]"
                    onClick={() => {
                        navigator.clipboard.writeText("22999983316");
                        alert("Chave PIX copiada!");
                    }}
                >
                    <div className="bg-sage p-3 rounded-xl text-white shadow-inner group-hover:bg-sage transition-colors shrink-0">
                        <QrCode size={20} />
                    </div>
                    <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pr-4">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-sage">Chave PIX Rápida (Celular)</p>
                        <p className="text-xs font-mono text-charcoal">(22) 99998-3316</p>
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
                            className="absolute inset-0 bg-charcoal/70"
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

                                        <div className="space-y-4 mb-8">
                                            {selectedGift.productUrl && (
                                                <div className="bg-white/60 rounded-2xl p-5 md:p-6 border border-gold/10 flex flex-col gap-4">
                                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-3 bg-sage/10 rounded-xl text-sage shrink-0">
                                                                <ShoppingCart size={20} />
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] text-charcoal/50 uppercase tracking-widest mb-1 font-bold">Opção 1: Comprar Online</p>
                                                                <p className="font-bold text-charcoal text-xs leading-snug">Ver produto na loja parceira</p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => window.open(selectedGift.productUrl, "_blank")}
                                                            className="w-full sm:w-auto bg-sage text-white px-6 py-3 sm:py-2.5 rounded-xl sm:rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-sage/80 transition-colors text-center shrink-0"
                                                        >
                                                            Ir para Loja
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="bg-white/60 rounded-2xl p-5 md:p-6 border border-gold/10 flex flex-col gap-4">
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gold/10 pb-4 gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-3 bg-sage/10 rounded-xl shrink-0">
                                                            <QrCode className="text-sage" size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] text-charcoal/50 uppercase tracking-widest mb-1 font-bold">Opção {selectedGift.productUrl ? "2" : "1"}: Enviar via PIX</p>
                                                            <p className="font-bold text-charcoal text-xs">(22) 99998-3316 (Celular)</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText("22999983316");
                                                            alert("Chave PIX copiada!");
                                                        }}
                                                        className="w-full sm:w-auto bg-gold/10 text-gold hover:bg-gold hover:text-white px-6 py-3 sm:py-2.5 rounded-xl sm:rounded-lg text-[10px] uppercase tracking-widest font-bold transition-all text-center shrink-0 border border-gold/20 hover:border-transparent"
                                                    >
                                                        Copiar Chave
                                                    </button>
                                                </div>

                                                {selectedGift.price && (
                                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-2 gap-4">
                                                        <div>
                                                            <p className="text-[10px] text-charcoal/50 uppercase tracking-widest mb-1 font-bold">Valor Sugerido</p>
                                                            <p className="text-xl font-headline text-sage">
                                                                R$ {selectedGift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(selectedGift.price?.toString() || "");
                                                                alert("Valor copiado!");
                                                            }}
                                                            className="w-full sm:w-auto bg-white border border-gold/20 text-charcoal/60 hover:text-charcoal hover:border-gold/40 px-6 py-3 sm:py-2.5 rounded-xl sm:rounded-lg text-[10px] uppercase tracking-widest font-bold transition-all text-center shrink-0"
                                                        >
                                                            Copiar Valor
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
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
                                                className="w-full py-4 bg-olive text-white rounded-2xl font-label tracking-widest uppercase hover:bg-olive/80 transition-all shadow-xl shadow-sage/10 flex items-center justify-center gap-2 disabled:opacity-50"
                                            >
                                                {submitting ? "Processando..." : (
                                                    <>
                                                        <CheckCircle2 size={18} />
                                                        Confirmar Escolha
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
            <Footer />
        </section>
    );
}
