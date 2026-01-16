'use client'

import Link from 'next/link'
import {
  Home,
  User,
  CreditCard,
  Briefcase,
  Star,
} from 'lucide-react'

export default function Navbar() {
  return (
    <>
      {/* ================= DESKTOP ================= */}
      <header className="fixed top-0 left-0 z-50 hidden w-full md:block">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between bg-black/60 px-12 backdrop-blur-xl border-b border-white/10">

          {/* Logo */}
          <div className="flex items-center gap-1 text-[15px] font-semibold tracking-[0.25em]">
            <span>BOSS</span>
            <span className="text-[#C9A24D]">BANK</span>
          </div>

          {/* Menu */}
          <nav className="flex gap-10 text-[12px] font-light tracking-[0.22em] text-white/70">
            <span className="cursor-pointer hover:text-white transition">Início</span>
            <span className="cursor-pointer hover:text-white transition">Sobre</span>
            <span className="cursor-pointer hover:text-white transition">Serviços</span>
            <span className="cursor-pointer hover:text-white transition">Boss</span>
            <span className="cursor-pointer hover:text-white transition">Cobrança</span>
          </nav>

          {/* CTA */}
          <Link
            href="https://bossbanking.idez.com.br/login"
            target="_blank"
            rel="noopener noreferrer"
            className="
              rounded-md border border-white/20
              px-6 py-2 text-[11px] tracking-[0.25em]
              hover:border-[#C9A24D] hover:text-[#C9A24D]
              hover:shadow-[0_0_20px_rgba(201,162,77,0.25)]
              transition
            "
          >
            MINHA CONTA
          </Link>
        </div>
      </header>

      {/* ================= MOBILE ================= */}
      <MobileBottomNav />
    </>
  )
}

/* ================= MOBILE NAV ================= */

function MobileBottomNav() {
  return (
    <nav
      className="
        fixed bottom-4 left-1/2 z-50
        w-[90%] -translate-x-1/2
        rounded-2xl bg-black/60
        backdrop-blur-xl border border-white/10
        px-6 py-4 md:hidden
      "
    >
      <ul className="flex justify-between text-white/70">
        <MobileItem icon={<Home size={18} />} label="Início" />
        <MobileItem icon={<Briefcase size={18} />} label="Serviços" />
        <MobileItem icon={<Star size={18} />} label="Boss" />
        <MobileItem icon={<CreditCard size={18} />} label="Cartão" />
        <MobileItem icon={<User size={18} />} label="Conta" />
      </ul>
    </nav>
  )
}

interface MobileItemProps {
  icon: React.ReactNode
  label: string
}

function MobileItem({ icon, label }: MobileItemProps) {
  return (
    <li
      className="
        flex flex-col items-center gap-1
        text-[10px] tracking-widest
        hover:text-white transition
      "
    >
      {icon}
      <span>{label}</span>
    </li>
  )
}