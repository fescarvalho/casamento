"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Gift,
    CheckCircle,
    Clock,
    DollarSign,
    LogOut,
    ChevronRight,
    Search,
    UserPlus,
    MessageSquare,
    Phone
} from "lucide-react";

interface RSVP {
    id: number;
    nomeCompleto: string;
    numeroAcompanhantes: number;
    telefone: string;
    dataConfirmacao: string;
}

interface GiftGiven {
    id: number;
    name: string;
    giverName: string;
    giverMessage: string;
    price?: number;
    givenAt: string;
}

interface Guest {
    id: number;
    name: string;
    isInvited: boolean;
    maxCompanions: number;
}

interface Stats {
    totalRSVPs: number;
    totalConfirmed: number;
    pendingCount: number;
    giftsCount: number;
    giftsTotalValue: number;
}

export default function AdminDashboard() {
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [stats, setStats] = useState<Stats | null>(null);
    const [rsvps, setRsvps] = useState<RSVP[]>([]);
    const [gifts, setGifts] = useState<GiftGiven[]>([]);
    const [invitedGuests, setInvitedGuests] = useState<Guest[]>([]);

    const [activeTab, setActiveTab] = useState<"summary" | "guests" | "gifts" | "pending">("summary");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const savedPass = localStorage.getItem("admin_password");
        if (savedPass) {
            fetchData(savedPass);
        }
    }, []);

    const fetchData = async (pass: string) => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`/api/admin/stats?password=${pass}`);
            if (res.ok) {
                const data = await res.json();
                setStats(data.stats);
                setRsvps(data.rsvps);
                setGifts(data.gifts);
                setInvitedGuests(data.invitedGuests);
                setIsAuthorized(true);
                localStorage.setItem("admin_password", pass);
            } else {
                setError("Senha incorreta");
                localStorage.removeItem("admin_password");
            }
        } catch (err) {
            setError("Erro ao carregar dados");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        fetchData(password);
    };

    const handleLogout = () => {
        setIsAuthorized(false);
        setPassword("");
        localStorage.removeItem("admin_password");
    };

    const filteredRSVPs = useMemo(() => {
        return rsvps.filter(r => r.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [rsvps, searchTerm]);

    const filteredGifts = useMemo(() => {
        return gifts.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()) || g.giverName?.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [gifts, searchTerm]);

    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-ivory flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/60 backdrop-blur-xl border border-white/60 p-10 rounded-3xl shadow-2xl w-full max-w-md text-center"
                >
                    <div className="bg-gold/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Users className="text-gold w-8 h-8" />
                    </div>
                    <h1 className="font-headline text-3xl text-sage mb-2">Acesso Restrito</h1>
                    <p className="text-charcoal/60 text-sm mb-8">Olá Fê e Vy! Digitem a senha para acessar o painel administrativo.</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Sua senha secreta"
                            className="w-full bg-white border border-gold/20 rounded-xl py-3 px-4 focus:ring-2 focus:ring-gold/20 outline-none transition-all text-center"
                            autoFocus
                        />
                        {error && <p className="text-red-500 text-xs">{error}</p>}
                        <button
                            disabled={loading}
                            className="w-full bg-gold text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-sage transition-all shadow-lg shadow-gold/20 disabled:opacity-50"
                        >
                            {loading ? "Verificando..." : "Entrar"}
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ivory font-body text-slate-800 pb-20 pt-32 px-6 lg:px-24">
            <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="font-headline text-4xl text-charcoal mb-2">Painel de Controle</h1>
                    <p className="text-charcoal/60">Acompanhe cada detalhe do grande dia.</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-charcoal/40 hover:text-red-500 transition-colors"
                >
                    <LogOut size={16} />
                    Sair do Painel
                </button>
            </header>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
                <StatCard
                    title="Confirmados"
                    value={stats?.totalConfirmed || 0}
                    subtitle={`${stats?.totalRSVPs || 0} formulários`}
                    icon={<CheckCircle className="text-sage" />}
                    color="bg-sage/10"
                />
                <StatCard
                    title="Pendentes"
                    value={stats?.pendingCount || 0}
                    subtitle="Aguardando resposta"
                    icon={<Clock className="text-gold" />}
                    color="bg-gold/10"
                />
                <StatCard
                    title="Presentes"
                    value={stats?.giftsCount || 0}
                    subtitle="Total recebido"
                    icon={<Gift className="text-sage" />}
                    color="bg-sage/10"
                />
                <StatCard
                    title="Valor Estimado"
                    value={`R$ ${stats?.giftsTotalValue.toLocaleString() || "0"}`}
                    subtitle="Soma dos valores"
                    icon={<DollarSign className="text-gold" />}
                    color="bg-gold/10"
                />
            </div>

            {/* Content Tabs */}
            <div className="max-w-7xl mx-auto">
                <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar mb-8">
                    <TabButton active={activeTab === "summary"} onClick={() => setActiveTab("summary")} label="Resumo" />
                    <TabButton active={activeTab === "guests"} onClick={() => setActiveTab("guests")} label="Confirmados" />
                    <TabButton active={activeTab === "gifts"} onClick={() => setActiveTab("gifts")} label="Presentes Rec." />
                    <TabButton active={activeTab === "pending"} onClick={() => setActiveTab("pending")} label="Convidados" />
                </div>

                <div className="bg-white/60 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-xl min-h-[500px]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <h2 className="font-headline text-2xl text-sage">
                            {activeTab === "summary" && "Visão Geral"}
                            {activeTab === "guests" && "Lista de Presença"}
                            {activeTab === "gifts" && "Presentes Recebidos"}
                            {activeTab === "pending" && "Master Guest List"}
                        </h2>

                        {(activeTab !== "summary") && (
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-white/40 border border-gold/10 rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-gold/20 outline-none"
                                />
                            </div>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        {activeTab === "summary" && <SummaryView rsvps={rsvps} gifts={gifts} />}
                        {activeTab === "guests" && <GuestTable rsvps={filteredRSVPs} />}
                        {activeTab === "gifts" && <GiftTable gifts={filteredGifts} />}
                        {activeTab === "pending" && <MasterGuestList guests={invitedGuests} rsvps={rsvps} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, subtitle, icon, color }: any) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/60 backdrop-blur-md border border-white/60 p-6 rounded-2xl shadow-lg flex items-center gap-6"
        >
            <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 mb-1">{title}</p>
                <p className="text-2xl font-headline text-charcoal">{value}</p>
                <p className="text-[9px] text-charcoal/60 mt-1 italic">{subtitle}</p>
            </div>
        </motion.div>
    );
}

function TabButton({ active, onClick, label }: any) {
    return (
        <button
            onClick={onClick}
            className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${active
                    ? "bg-sage text-white shadow-lg shadow-sage/20"
                    : "bg-white/30 text-charcoal/50 hover:bg-white/50"
                }`}
        >
            {label}
        </button>
    );
}

function SummaryView({ rsvps, gifts }: { rsvps: RSVP[], gifts: GiftGiven[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold mb-6 flex items-center gap-2">
                    <UserPlus size={14} />
                    Últimas Confirmações
                </h3>
                <div className="space-y-4">
                    {rsvps.slice(0, 5).map(r => (
                        <div key={r.id} className="flex items-center justify-between p-4 bg-sage/5 rounded-2xl border border-sage/10">
                            <div>
                                <p className="font-bold text-charcoal text-sm">{r.nomeCompleto}</p>
                                <p className="text-[10px] text-charcoal/50">{r.numeroAcompanhantes > 0 ? `+ ${r.numeroAcompanhantes} acompanhantes` : "Apenas ele(a)"}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-sage font-medium">{new Date(r.dataConfirmacao).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                    {rsvps.length === 0 && <p className="text-sm text-charcoal/40 italic">Nenhuma confirmação ainda.</p>}
                </div>
            </div>
            <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold mb-6 flex items-center gap-2">
                    <Gift size={14} />
                    Mimos Recebidos
                </h3>
                <div className="space-y-4">
                    {gifts.slice(0, 5).map(g => (
                        <div key={g.id} className="flex items-center justify-between p-4 bg-gold/5 rounded-2xl border border-gold/10">
                            <div>
                                <p className="font-bold text-charcoal text-sm">{g.name}</p>
                                <p className="text-[10px] text-charcoal/50">por {g.giverName}</p>
                            </div>
                            <div className="text-right text-gold">
                                <ChevronRight size={16} />
                            </div>
                        </div>
                    ))}
                    {gifts.length === 0 && <p className="text-sm text-charcoal/40 italic">Nenhum presente ainda.</p>}
                </div>
            </div>
        </div>
    );
}

function GuestTable({ rsvps }: { rsvps: RSVP[] }) {
    return (
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b border-gold/10 text-[10px] uppercase font-bold text-charcoal/40">
                    <th className="pb-4 pl-2">Nome</th>
                    <th className="pb-4">Acomp.</th>
                    <th className="pb-4">Telefone</th>
                    <th className="pb-4">Data</th>
                    <th className="pb-4">WhatsApp</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {rsvps.map(r => (
                    <tr key={r.id} className="border-b border-gold/5 hover:bg-white/40 transition-colors">
                        <td className="py-4 pl-2 font-medium">{r.nomeCompleto}</td>
                        <td className="py-4">{r.numeroAcompanhantes}</td>
                        <td className="py-4 font-mono text-xs">{r.telefone}</td>
                        <td className="py-4 text-xs text-charcoal/60">{new Date(r.dataConfirmacao).toLocaleDateString()}</td>
                        <td className="py-4">
                            <a
                                href={`https://wa.me/${r.telefone.replace(/\D/g, "")}`}
                                target="_blank"
                                className="p-2 bg-green-500/10 text-green-600 rounded-full inline-block hover:bg-green-500 hover:text-white transition-all"
                            >
                                <Phone size={14} />
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function GiftTable({ gifts }: { gifts: GiftGiven[] }) {
    return (
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b border-gold/10 text-[10px] uppercase font-bold text-charcoal/40">
                    <th className="pb-4 pl-2">Presente</th>
                    <th className="pb-4">De</th>
                    <th className="pb-4">Mensagem</th>
                    <th className="pb-4">Valor</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {gifts.map(g => (
                    <tr key={g.id} className="border-b border-gold/5 hover:bg-white/40 transition-colors">
                        <td className="py-4 pl-2 font-medium">{g.name}</td>
                        <td className="py-4">{g.giverName}</td>
                        <td className="py-4 text-xs text-charcoal/60 max-w-xs">
                            <div className="flex items-start gap-2">
                                <MessageSquare size={12} className="mt-1 shrink-0 opacity-40" />
                                <span>{g.giverMessage || "-"}</span>
                            </div>
                        </td>
                        <td className="py-4 font-mono text-xs text-gold">
                            {g.price ? `R$ ${g.price}` : "-"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function MasterGuestList({ guests, rsvps }: { guests: Guest[], rsvps: RSVP[] }) {
    // Check which invited guests have confirmed
    // This assumes names match exactly or close enough (we'll do lower case comparison)
    const confirmedNames = new Set(rsvps.map(r => r.nomeCompleto.toLowerCase()));

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <p className="text-[10px] font-medium text-charcoal/40 uppercase tracking-widest">
                    {guests.length > 0 ? `Total: ${guests.length} convidados` : "Nenhum convidado cadastrado na lista master."}
                </p>
            </div>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gold/10 text-[10px] uppercase font-bold text-charcoal/40">
                        <th className="pb-4 pl-2">Nome</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4">Acomp. Máx</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {guests.map(g => {
                        const isConfirmed = confirmedNames.has(g.name.toLowerCase());
                        return (
                            <tr key={g.id} className="border-b border-gold/5 hover:bg-white/40 transition-colors">
                                <td className="py-4 pl-2 font-medium">{g.name}</td>
                                <td className="py-4">
                                    {isConfirmed ? (
                                        <span className="bg-sage/10 text-sage text-[9px] font-bold px-3 py-1 rounded-full uppercase">Confirmado</span>
                                    ) : (
                                        <span className="bg-gold/10 text-gold text-[9px] font-bold px-3 py-1 rounded-full uppercase">Pendente</span>
                                    )}
                                </td>
                                <td className="py-4 text-xs">{g.maxCompanions}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {guests.length === 0 && (
                <div className="py-12 text-center bg-gold/5 rounded-3xl border border-dashed border-gold/20">
                    <p className="text-sm text-charcoal/60">A lista master está vazia.</p>
                    <p className="text-[10px] text-charcoal/40 mt-1 uppercase">Use o script de seed para adicionar os convidados esperados.</p>
                </div>
            )}
        </div>
    );
}
