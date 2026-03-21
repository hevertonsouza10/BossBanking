'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const PRELOADER_VIDEO_SRC = '/videos/composicao-2-2.mp4';
const EXIT_ANIMATION_MS = 550;
const FINAL_FRAME_OFFSET = 0.04;

type Phase = 'playing' | 'holding' | 'exiting' | 'hidden';

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>('playing');
  const [pageReady, setPageReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasStartedRef = useRef(false);
  const hasCompletedVideoRef = useRef(false);
  const previousHtmlOverflowRef = useRef<string | null>(null);
  const previousBodyOverflowRef = useRef<string | null>(null);

  const hideScroll = phase !== 'hidden';

  const beginExit = useCallback(() => {
    setPhase((currentPhase) => (currentPhase === 'hidden' ? currentPhase : 'exiting'));
  }, []);

  const freezeOnLastFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (Number.isFinite(video.duration) && video.duration > FINAL_FRAME_OFFSET) {
      video.currentTime = Math.max(video.duration - FINAL_FRAME_OFFSET, 0);
    }

    video.pause();
  }, []);

  const handleVideoFinished = useCallback(() => {
    if (hasCompletedVideoRef.current) {
      return;
    }

    hasCompletedVideoRef.current = true;
    freezeOnLastFrame();

    setPhase((currentPhase) => {
      if (pageReady) {
        return currentPhase === 'hidden' ? currentPhase : 'exiting';
      }

      return 'holding';
    });
  }, [freezeOnLastFrame, pageReady]);

  useEffect(() => {
    if (!hideScroll) {
      document.documentElement.style.overflow = previousHtmlOverflowRef.current ?? '';
      document.body.style.overflow = previousBodyOverflowRef.current ?? '';
      return;
    }

    if (previousHtmlOverflowRef.current === null) {
      previousHtmlOverflowRef.current = document.documentElement.style.overflow;
    }

    if (previousBodyOverflowRef.current === null) {
      previousBodyOverflowRef.current = document.body.style.overflow;
    }

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflowRef.current ?? '';
      document.body.style.overflow = previousBodyOverflowRef.current ?? '';
    };
  }, [hideScroll, phase]);

  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = previousHtmlOverflowRef.current ?? '';
      document.body.style.overflow = previousBodyOverflowRef.current ?? '';
    };
  }, []);

  useEffect(() => {
    const markPageReady = () => {
      setPageReady(true);
    };

    if (document.readyState === 'complete') {
      markPageReady();
      return;
    }

    window.addEventListener('load', markPageReady, { once: true });
    return () => {
      window.removeEventListener('load', markPageReady);
    };
  }, []);

  useEffect(() => {
    if (!pageReady || !hasCompletedVideoRef.current) {
      return;
    }

    beginExit();
  }, [beginExit, pageReady]);

  const handleLoadedData = () => {
    const video = videoRef.current;
    if (!video || hasStartedRef.current || !video.paused) {
      return;
    }

    hasStartedRef.current = true;

    const playPromise = video.play();
    if (playPromise instanceof Promise) {
      playPromise.catch(() => {
        handleVideoFinished();
      });
    }
  };

  return (
    <AnimatePresence>
      {phase !== 'hidden' ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'exiting' ? 0 : 1 }}
          transition={{ duration: EXIT_ANIMATION_MS / 1000, ease: 'easeInOut' }}
          onAnimationComplete={() => {
            if (phase === 'exiting') {
              setPhase('hidden');
            }
          }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#121113]"
          aria-hidden="true"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full scale-[0.7] object-contain object-center sm:scale-100 sm:object-cover"
            muted
            playsInline
            preload="auto"
            autoPlay
            onPlay={() => {
              hasStartedRef.current = true;
            }}
            onLoadedData={handleLoadedData}
            onEnded={handleVideoFinished}
            onError={handleVideoFinished}
          >
            <source src={PRELOADER_VIDEO_SRC} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),transparent_18%,transparent_82%,rgba(0,0,0,0.14))]" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
