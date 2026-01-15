'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { MousePointer2, Loader2 } from 'lucide-react';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

export default function DigitalExperience() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showHint, setShowHint] = useState(true);

  return (
    <section className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">

      {/* Glow dourado sutil */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-yellow-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Texto minimalista */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="z-10 mb-10 text-center"
      >
        <p className="text-[11px] tracking-[0.35em] uppercase text-yellow-500 mb-4 font-montserrat">
          Tecnologia Proprietária
        </p>

        <h2 className="text-3xl md:text-5xl font-montserrat font-light text-white tracking-tight">
          Controle. Clareza. Inteligência.
        </h2>

        <p className="mt-4 text-white/50 text-sm max-w-md mx-auto font-light">
          Um ecossistema visual para decisões financeiras estratégicas.
        </p>
      </motion.div>

      {/* Container 3D */}
      <div className="relative w-full h-[70vh] md:h-[85vh] max-w-6xl z-20 flex items-center justify-center">

        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-yellow-500/40">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        )}

        {isLoaded && showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-8 right-8 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-none"
          >
            <MousePointer2 className="w-4 h-4 text-yellow-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-white/80">
              Interaja com o sistema
            </span>
          </motion.div>
        )}

        <div
          className="w-full h-full cursor-grab active:cursor-grabbing"
          onMouseDown={() => setShowHint(false)}
          onTouchStart={() => setShowHint(false)}
        >
          <Spline
            className="w-full h-full"
            scene="https://prod.spline.design/x5wn5bZMT-Kfm7MB/scene.splinecode"
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        {/* Fade inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
      </div>

    </section>
  );
}
