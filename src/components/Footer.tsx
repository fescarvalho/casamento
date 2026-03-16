import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative z-10 w-full py-8 text-center text-charcoal/60 text-[10px] tracking-widest uppercase overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/fundo.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-ivory/90 md:bg-ivory/80" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-4 px-6 font-bold">
                <p className="text-[11px] md:text-[10px]">Fernando & Vittorya | Made with Love</p>
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
