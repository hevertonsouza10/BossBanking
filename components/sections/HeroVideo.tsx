'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroVideo() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">

      {/* Glow sutil */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[160px]" />
      </div>

      {/* Vídeo */}
      <motion.video
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: ready ? 1 : 0, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-10 w-full h-full object-cover"
        src="/videos/hero.mp4"
        poster="/images/cartao-poster.jpg"
        autoPlay
        muted
        playsInline
        preload="none"
      />

      {/* Máscara inferior */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
    </section>
  );
}
