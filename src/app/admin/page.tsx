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
    Phone,
    Trash2
} from "lucide-react";

interface RSVP {
    id: number;
    nomeCompleto: string;
    numeroAcompanhantes: number;
    nomesAcompanhantes: string;
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
    group: string;
    isChecked: boolean;
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

    // New Guest Form State
    const [newGuest, setNewGuest] = useState({ name: "", group: "", maxCompanions: 0 });
    const [isAdding, setIsAdding] = useState(false);

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

    const handleDeleteRSVP = async (id: number) => {
        if (!confirm("Tem certeza que deseja remover esta confirmação?")) return;

        try {
            const pass = localStorage.getItem("admin_password");
            const res = await fetch(`/api/admin/rsvp/${id}?password=${pass}`, {
                method: "DELETE"
            });

            if (res.ok) {
                setRsvps(prev => prev.filter(r => r.id !== id));
                // Update stats locally
                if (stats) {
                    const removed = rsvps.find(r => r.id === id);
                    if (removed) {
                        setStats({
                            ...stats,
                            totalRSVPs: stats.totalRSVPs - 1,
                            totalConfirmed: stats.totalConfirmed - (1 + removed.numeroAcompanhantes)
                        });
                    }
                }
            } else {
                alert("Erro ao remover confirmação");
            }
        } catch (err) {
            alert("Erro na conexão");
        }
    };
    const handleToggleGuest = async (id: number) => {
        try {
            const pass = localStorage.getItem("admin_password");
            const res = await fetch(`/api/admin/guests/toggle/${id}?password=${pass}`, {
                method: "PATCH"
            });

            if (res.ok) {
                const { guest: updatedGuest } = await res.json();
                setInvitedGuests(prev => prev.map(g => g.id === id ? updatedGuest : g));
            }
        } catch (err) {
            console.error("Error toggling guest:", err);
        }
    };

    const handleAddGuest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGuest.name) return;

        setIsAdding(true);
        try {
            const pass = localStorage.getItem("admin_password");
            const res = await fetch(`/api/admin/guests?password=${pass}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newGuest)
            });

            if (res.ok) {
                const { guest: createdGuest } = await res.json();
                setInvitedGuests(prev => [...prev, createdGuest]);
                setNewGuest({ name: "", group: "", maxCompanions: 0 });
            } else {
                const data = await res.json();
                alert(data.message || "Erro ao adicionar convidado");
            }
        } catch (err) {
            alert("Erro na conexão");
        } finally {
            setIsAdding(false);
        }
    };

    const handleDeleteGuest = async (id: number) => {
        if (!confirm("Tem certeza que deseja remover este convidado da lista master?")) return;

        try {
            const pass = localStorage.getItem("admin_password");
            const res = await fetch(`/api/admin/guests/${id}?password=${pass}`, {
                method: "DELETE"
            });

            if (res.ok) {
                setInvitedGuests(prev => prev.filter(g => g.id !== id));
            } else {
                alert("Erro ao remover convidado");
            }
        } catch (err) {
            alert("Erro na conexão");
        }
    };
    // // Comentado a pedido do admin: "comente os confirmados"
    // const filteredRSVPs = useMemo(() => {
    //     return rsvps
    //         .filter(r => r.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()))
    //         .sort((a, b) => a.nomeCompleto.localeCompare(b.nomeCompleto));
    // }, [rsvps, searchTerm]);

    const filteredGifts = useMemo(() => {
        return gifts.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()) || g.giverName?.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [gifts, searchTerm]);

    const filteredInvitedGuests = useMemo(() => {
        return invitedGuests
            .filter(g => g?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => (a?.name || "").localeCompare(b?.name || ""));
    }, [invitedGuests, searchTerm]);

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
                    {/* <TabButton active={activeTab === "guests"} onClick={() => setActiveTab("guests")} label="Confirmados" /> */}
                    <TabButton active={activeTab === "gifts"} onClick={() => setActiveTab("gifts")} label="Presentes Rec." />
                    <TabButton active={activeTab === "pending"} onClick={() => setActiveTab("pending")} label="Convidados" />
                </div>

                <div className="bg-white/60 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-xl min-h-[500px]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <h2 className="font-headline text-2xl text-sage">
                            {activeTab === "summary" && "Visão Geral"}
                            {/* {activeTab === "guests" && "Lista de Presença"} */}
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
                        {/* {activeTab === "guests" && <GuestTable rsvps={filteredRSVPs} onDelete={handleDeleteRSVP} />} */}
                        {activeTab === "gifts" && <GiftTable gifts={filteredGifts} />}
                        {activeTab === "pending" && (
                            <MasterGuestList
                                guests={filteredInvitedGuests}
                                rsvps={rsvps}
                                onToggle={handleToggleGuest}
                                onDelete={handleDeleteGuest}
                                onAdd={handleAddGuest}
                                newGuest={newGuest}
                                setNewGuest={setNewGuest}
                                isAdding={isAdding}
                            />
                        )}
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
                                <p className="text-[10px] text-charcoal/50">
                                    {r.numeroAcompanhantes > 0
                                        ? `+ ${r.numeroAcompanhantes} (${r.nomesAcompanhantes})`
                                        : "Apenas ele(a)"}
                                </p>
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

function GuestTable({ rsvps, onDelete }: { rsvps: RSVP[], onDelete: (id: number) => void }) {
    return (
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b border-gold/10 text-[10px] uppercase font-bold text-charcoal/40">
                    <th className="pb-4 pl-2">Nome</th>
                    <th className="pb-4">Grupo</th>
                    <th className="pb-4">Acomp.</th>
                    <th className="pb-4">Nomes Acompanhantes</th>
                    <th className="pb-4">Telefone</th>
                    <th className="pb-4">Data</th>
                    <th className="pb-4">Ações</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {rsvps.map(r => (
                    <tr key={r.id} className="border-b border-gold/5 hover:bg-white/40 transition-colors">
                        <td className="py-4 pl-2 font-medium">{r.nomeCompleto}</td>
                        <td className="py-4 text-xs text-charcoal/40 italic">-</td>
                        <td className="py-4">{r.numeroAcompanhantes || 0}</td>
                        <td className="py-4 text-xs text-charcoal/60 italic max-w-xs">{r.nomesAcompanhantes || "-"}</td>
                        <td className="py-4 font-mono text-xs">{r.telefone}</td>
                        <td className="py-4 text-xs text-charcoal/60">{new Date(r.dataConfirmacao).toLocaleDateString()}</td>
                        <td className="py-4">
                            <div className="flex items-center gap-2">
                                <a
                                    href={`https://wa.me/${r.telefone?.replace(/\D/g, "")}`}
                                    target="_blank"
                                    className="p-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500 hover:text-white transition-all"
                                    title="WhatsApp"
                                >
                                    <Phone size={14} />
                                </a>
                                <button
                                    onClick={() => onDelete(r.id)}
                                    className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                                    title="Remover Confirmação"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
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

function MasterGuestList({
    guests,
    rsvps,
    onToggle,
    onDelete,
    onAdd,
    newGuest,
    setNewGuest,
    isAdding
}: {
    guests: Guest[],
    rsvps: RSVP[],
    onToggle: (id: number) => void,
    onDelete: (id: number) => void,
    onAdd: (e: React.FormEvent) => void,
    newGuest: any,
    setNewGuest: any,
    isAdding: boolean
}) {
    // const confirmedNames = new Set(rsvps.map(r => r?.nomeCompleto?.toLowerCase() || ""));

    const fernandoGuests = guests.filter(g => g.group === "Fernando");
    const vittoryaGuests = guests.filter(g => g.group === "Vittorya");
    const otherGuests = guests.filter(g => g.group !== "Fernando" && g.group !== "Vittorya");

    const GuestSection = ({ title, list }: { title: string, list: Guest[] }) => {
        if (list.length === 0) return null;
        return (
            <div className="mb-12">
                <h3 className="font-headline text-xl text-sage mb-6 border-b border-gold/10 pb-2">{title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {list.map(g => {
                        // const isConfirmed = confirmedNames.has(g.name.toLowerCase());
                        const isConfirmed = false;
                        return (
                            <div key={g.id} className="flex items-center justify-between p-3 bg-white/40 rounded-xl border border-gold/5 hover:border-gold/20 transition-all group">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => onToggle(g.id)}
                                        className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${g.isChecked
                                            ? "bg-sage border-sage text-white"
                                            : "border-gold/30 hover:border-gold"
                                            }`}
                                    >
                                        {g.isChecked && <CheckCircle size={12} />}
                                    </button>
                                    <div>
                                        <p className={`text-sm font-medium ${g.isChecked ? "text-sage" : "text-charcoal"}`}>{g.name}</p>
                                        {isConfirmed && (
                                            <span className="text-[8px] font-bold text-gold uppercase tracking-tighter">RSVP OK</span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => onDelete(g.id)}
                                    className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600 transition-all"
                                    title="Excluir Convidado"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {/* Add Guest Form */}
            <div className="bg-white/40 p-6 rounded-2xl border border-gold/10 mb-8">
                <form onSubmit={onAdd} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 space-y-1 w-full text-left">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40 ml-1">Nome do Convidado</label>
                        <input
                            type="text"
                            value={newGuest.name}
                            onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                            className="w-full bg-white border border-gold/10 rounded-xl py-2 px-4 focus:ring-2 focus:ring-gold/20 outline-none"
                            placeholder="Nome Completo"
                        />
                    </div>
                    <div className="w-full md:w-48 space-y-1 text-left">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40 ml-1">Grupo</label>
                        <select
                            value={newGuest.group}
                            onChange={(e) => setNewGuest({ ...newGuest, group: e.target.value })}
                            className="w-full bg-white border border-gold/10 rounded-xl py-2 px-4 focus:ring-2 focus:ring-gold/20 outline-none"
                        >
                            <option value="">Sem Grupo</option>
                            <option value="Fernando">Fernando</option>
                            <option value="Vittorya">Vittórya</option>
                        </select>
                    </div>
                    <div className="w-full md:w-32 space-y-1 text-left">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40 ml-1">Acomp. Máx.</label>
                        <input
                            type="number"
                            min="0"
                            value={newGuest.maxCompanions}
                            onChange={(e) => setNewGuest({ ...newGuest, maxCompanions: parseInt(e.target.value) || 0 })}
                            className="w-full bg-white border border-gold/10 rounded-xl py-2 px-4 focus:ring-2 focus:ring-gold/20 outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isAdding || !newGuest.name}
                        className="bg-gold text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-sage transition-all disabled:opacity-50 h-[42px]"
                    >
                        {isAdding ? "..." : "Adicionar"}
                    </button>
                </form>
            </div>

            <div className="bg-gold/5 p-4 rounded-2xl border border-gold/10 mb-8">
                <p className="text-[10px] text-gold font-bold uppercase tracking-widest text-center">
                    Exibindo {guests.length} convidados | {guests.filter(g => g.isChecked).length} Marcados como Presentes
                </p>
            </div>

            <GuestSection title="Grupo do Fernando" list={fernandoGuests} />
            <GuestSection title="Grupo da Vittórya" list={vittoryaGuests} />
            <GuestSection title="Outros / Sem Grupo" list={otherGuests} />

            {guests.length === 0 && (
                <div className="py-12 text-center bg-gold/5 rounded-3xl border border-dashed border-gold/20">
                    <p className="text-sm text-charcoal/60">Nenhum convidado encontrado para esta busca.</p>
                </div>
            )}
        </div>
    );
}
