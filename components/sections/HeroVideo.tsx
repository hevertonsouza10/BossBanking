'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Home,
  CreditCard,
  Star,
  User,
  Briefcase,
  LucideIcon,
} from 'lucide-react'

export default function HomePage() {
  const [ready, setReady] = useState<boolean>(false)
  const [active, setActive] = useState<string>('home')

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section
        className="
          relative w-full overflow-hidden bg-black
          h-[70vh] md:h-screen
        "
      >
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <div className="h-[500px] w-[500px] rounded-full bg-yellow-600/10 blur-[160px]" />
        </div>

        {/* Vídeo */}
        <motion.video
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: ready ? 1 : 0, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="
            absolute inset-0 z-10
            h-full w-full
            object-cover
            object-top md:object-center
          "
          src="/videos/hero.mp4"
          poster="/images/cartao-poster.jpg"
          autoPlay
          muted
          playsInline
          preload="none"
        />

        {/* Overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Conteúdo */}
        <div className="relative z-30 flex h-full flex-col items-center justify-end pb-24 text-center">
          <h1 className="text-3xl md:text-6xl font-semibold tracking-tight">
            <span>BOSS</span>
            <span className="text-[#C9A24D]">BANK</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm md:text-lg text-white/70">
            O banco premium para quem joga grande.
          </p>
        </div>
      </section>

      {/* ================= CONTEÚDO ================= */}
      <section className="relative z-10 px-6 py-16 md:px-16">
        <div className="grid gap-8 md:grid-cols-3">
          <InfoCard
            title="Cartão Black"
            description="Limites elevados, cashback e experiência premium."
          />
          <InfoCard
            title="Investimentos"
            description="Seu dinheiro trabalhando no nível máximo."
          />
          <InfoCard
            title="Conta Global"
            description="Movimente seu dinheiro sem fronteiras."
          />
        </div>
      </section>

      {/* ================= MENU MOBILE ================= */}
      <nav
        className="
          fixed bottom-0 left-0 right-0 z-50
          bg-black/70 backdrop-blur-xl
          border-t border-white/10
          md:hidden
        "
      >
        <ul className="flex items-center justify-around py-3">
          <NavItem
            icon={Home}
            label="Início"
            active={active === 'home'}
            onClick={() => setActive('home')}
          />
          <NavItem
            icon={Briefcase}
            label="Serviços"
            active={active === 'services'}
            onClick={() => setActive('services')}
          />
          <NavItem
            icon={Star}
            label="Boss"
            active={active === 'boss'}
            onClick={() => setActive('boss')}
          />
          <NavItem
            icon={CreditCard}
            label="Cartão"
            active={active === 'card'}
            onClick={() => setActive('card')}
          />
          <NavItem
            icon={User}
            label="Conta"
            active={active === 'account'}
            onClick={() => setActive('account')}
          />
        </ul>
      </nav>

      {/* Espaço para o menu não cobrir conteúdo */}
      <div className="h-20 md:hidden" />
    </main>
  )
}

/* ================= COMPONENTES ================= */

interface InfoCardProps {
  title: string
  description: string
}

function InfoCard({ title, description }: InfoCardProps) {
  return (
    <div
      className="
        rounded-2xl border border-white/10
        bg-white/5 p-6 backdrop-blur
      "
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{description}</p>
    </div>
  )
}

interface NavItemProps {
  icon: LucideIcon
  label: string
  active: boolean
  onClick: () => void
}

function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 text-xs"
    >
      <Icon
        className={
          active
            ? 'h-5 w-5 text-yellow-400 drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]'
            : 'h-5 w-5 text-gray-400'
        }
      />
      <span className={active ? 'text-yellow-400' : 'text-gray-400'}>
        {label}
      </span>
    </button>
  )
}
