'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 2400);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#121113]"
        >
          <video
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-40 blur-sm"
            autoPlay
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/Composi%C3%A7%C3%A3o%202_2.mp4" type="video/mp4" />
          </video>

          <video
            className="relative h-full w-full scale-[0.92] object-contain sm:scale-[0.9]"
            autoPlay
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/Composi%C3%A7%C3%A3o%202_2.mp4" type="video/mp4" />
          </video>

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),transparent_22%,transparent_78%,rgba(0,0,0,0.12))]" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
