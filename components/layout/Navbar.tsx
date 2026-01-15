'use client';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div
        className="
          mx-auto flex h-20 max-w-[1400px] items-center justify-between
          px-12
          bg-black/60
          backdrop-blur-xl
          border-b border-white/10
        "
      >
        {/* Logo */}
        <div className="flex items-center gap-1 font-montserrat text-[15px] font-semibold tracking-[0.25em]">
          <span className="text-white">BOSS</span>
          <span className="text-[#C9A24D]">BANK</span>
        </div>

        {/* Menu */}
        <nav className="flex items-center gap-10 font-montserrat text-[12px] font-light tracking-[0.22em] text-white/70">
          <NavItem label="Início" />
          <NavItem label="Sobre nós" />
          <NavItem label="Nossos serviços" />
          <NavItem label="Quero ser Boss" />
          <NavItem label="Cobrança" />
        </nav>

        {/* CTA */}
        <button
          className="
            rounded-md
            border border-white/20
            px-6 py-2
            font-montserrat
            text-[11px]
            tracking-[0.25em]
            text-white
            transition
            hover:border-white/40
            hover:bg-white/5
          "
        >
          MINHA CONTA
        </button>
      </div>
    </header>
  );
}

function NavItem({ label }: { label: string }) {
  return (
    <span className="cursor-pointer transition hover:text-white">
      {label}
    </span>
  );
}
