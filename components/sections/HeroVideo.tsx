'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function HeroVideo() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-yellow-600/10 blur-[160px]" />
      </div>

      {/* Vídeo */}
      <motion.video
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: ready ? 1 : 0, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="
          relative z-10
          h-full w-full
          object-contain md:object-cover
          bg-black
        "
        src="/videos/hero.mp4"
        poster="/images/cartao-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      />

      {/* Fade inferior */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    </section>
  )
}
