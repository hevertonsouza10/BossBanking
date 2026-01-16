'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MousePointer2 } from 'lucide-react'
import dynamic from 'next/dynamic'

// Server Component carregado dinamicamente
const SplineScene = dynamic(() => import('./SplineScene'), {
  ssr: false,
})

export default function DigitalExperience() {
  const containerRef = useRef<HTMLDivElement>(null)

  const [shouldRenderSpline, setShouldRenderSpline] = useState(false)
  const [isSplineLoaded, setIsSplineLoaded] = useState(false)

  const [showHint, setShowHint] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return !sessionStorage.getItem('bossbank-spline-hint')
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRenderSpline(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const hideHint = () => {
    setShowHint(false)
    sessionStorage.setItem('bossbank-spline-hint', 'true')
  }

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black pt-20">

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[520px] w-[520px] rounded-full bg-yellow-600/10 blur-[160px]" />
      </div>

      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="z-10 mb-12 max-w-xl px-6 text-center"
      >
        <p className="mb-4 text-[11px] tracking-[0.35em] uppercase text-yellow-500">
          Tecnologia Proprietária
        </p>

        <h2 className="text-4xl font-light text-white md:text-5xl">
          Controle. Clareza. Inteligência.
        </h2>

        <p className="mt-4 text-sm text-white/50">
          Um ecossistema visual para decisões financeiras estratégicas.
        </p>
      </motion.div>

      {/* Spline */}
      <div
        ref={containerRef}
        className="relative z-20 h-[70vh] w-full max-w-6xl md:h-[85vh]"
      >
        {shouldRenderSpline && !isSplineLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              Inicializando sistema
            </span>
            <div className="h-[2px] w-40 overflow-hidden bg-white/10">
              <div className="h-full w-1/3 animate-loader bg-[#C9A24D]" />
            </div>
          </div>
        )}

        {isSplineLoaded && showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pointer-events-none absolute right-6 top-6 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 backdrop-blur-md"
          >
            <MousePointer2 className="h-4 w-4 animate-pulse text-yellow-500" />
            <span className="text-[10px] uppercase tracking-widest text-white/80">
              Interaja com o sistema
            </span>
          </motion.div>
        )}

        <div
          className="h-full w-full cursor-grab active:cursor-grabbing"
          onMouseDown={hideHint}
          onTouchStart={hideHint}
        >
          {shouldRenderSpline && (
            <SplineScene onLoad={() => setIsSplineLoaded(true)} />
          )}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>
    </section>
  )
}
