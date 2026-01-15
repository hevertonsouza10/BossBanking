'use client'

import { motion } from 'framer-motion'

export default function ManifestoVideo() {
  return (
    <section className="relative w-full min-h-screen bg-black flex items-center justify-center px-6 py-32">
      
      {/* Glow sutil de fundo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-yellow-500/10 blur-[160px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center gap-16">

        {/* Texto Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-yellow-500 mb-6">
            Manifesto
          </p>

          <h2 className="text-3xl md:text-5xl text-white font-light leading-tight">
            O sistema não muda.
            <br />
            <span className="text-gray-500">
              Quem muda é quem o entende.
            </span>
          </h2>
        </motion.div>

        {/* Container do Vídeo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl"
        >
          {/* Overlay vidro */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent z-10 pointer-events-none" />

          {/* YouTube Embed */}
          <iframe
            className="w-full h-full"
            src="https://youtu.be/embed/y7ZedgMOdKE"
            title="Boss Bank — O Sistema"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />

        </motion.div>

      </div>
    </section>
  )
}
