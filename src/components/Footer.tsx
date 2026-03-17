import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative w-full py-2 text-center text-slate-400 text-[9px] tracking-[0.3em] uppercase bg-white overflow-hidden">
            {/* Elegant Card Texture Overlay - Matching HomeCover */}
            <div className="absolute inset-0 opacity-[0.10] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] mix-blend-multiply" />

            <div className="relative z-10 flex flex-col items-center gap-3 px-6">
                <div className="w-12 h-[0.5px] bg-gold/20" />
                <p className="text-[10px] md:text-[11px] font-medium tracking-[0.4em] text-slate-400">Fernando & Vittórya <span className="text-gold/60 mx-1">|</span> 2026</p>
                <div className="flex items-center gap-2">
                    <span className="text-[8px] text-slate-300 uppercase tracking-widest">Made with Love</span>
                </div>
                <Link
                    href="/admin"
                    className="opacity-0 hover:opacity-100 transition-opacity duration-300 text-[9px] md:text-[8px]"
                >
                    Acesso Restrito
                </Link>
            </div>
        </footer>
    );
}
