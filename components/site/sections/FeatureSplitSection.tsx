'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import Container from '@/components/site/ui/Container';
import MediaFrame from '@/components/site/ui/MediaFrame';
import Reveal from '@/components/site/ui/Reveal';
import SectionHeading from '@/components/site/ui/SectionHeading';
import { buildVideoEmbedSrc } from '@/lib/utils';
import type { FeatureSplitSection as FeatureSplitSectionType } from '@/lib/cms/types';

type VimeoPlayerInstance = {
  on: (event: 'pause' | 'play' | 'timeupdate' | 'ended', callback: (data?: { seconds: number }) => void) => void;
  off: (event: 'pause' | 'play' | 'timeupdate' | 'ended', callback: (data?: { seconds: number }) => void) => void;
  play: () => Promise<void>;
  setCurrentTime: (seconds: number) => Promise<number>;
};

type VimeoWindow = Window & {
  Vimeo?: {
    Player: new (element: HTMLIFrameElement) => VimeoPlayerInstance;
  };
};

export default function FeatureSplitSection({ section }: { section: FeatureSplitSectionType }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const vimeoPlayerRef = useRef<VimeoPlayerInstance | null>(null);
  const hasVideo = section.media?.src?.endsWith('.mp4');
  const isVimeoEmbed =
    section.media?.src?.includes('player.vimeo.com/video/') || section.media?.src?.includes('vimeo.com/video/');
  const hasImage = !!section.media?.src && !hasVideo && !isVimeoEmbed;
  const backgroundSrc =
    isVimeoEmbed
      ? buildVideoEmbedSrc(section.media?.src, {
          background: '1',
          autoplay: '1',
          muted: '1',
          loop: '1',
          title: '0',
          byline: '0',
          portrait: '0',
        })
      : section.media?.src;
  const autoplaySrc =
    isVimeoEmbed
      ? buildVideoEmbedSrc(section.media?.src, {
          autoplay: '1',
          muted: '1',
          loop: '1',
          autopause: '0',
          title: '0',
          byline: '0',
          portrait: '0',
          api: '1',
        })
      : section.media?.src;
  const loopUntilSeconds = section.media?.loopUntilSeconds;

  const handleStart = () => {
    setHasStarted(true);
    setIsPaused(false);
  };

  const handleResume = () => {
    if (isVimeoEmbed && vimeoPlayerRef.current) {
      void vimeoPlayerRef.current.play();
    }

    if (hasVideo && videoRef.current) {
      void videoRef.current.play();
    }

    setIsPaused(false);
  };

  useEffect(() => {
    if (section.layout !== 'immersive' || !hasStarted || !isVimeoEmbed) {
      return;
    }

    let isMounted = true;
    const handlePause = () => {
      if (isMounted) {
        setIsPaused(true);
      }
    };
    const handlePlay = () => {
      if (isMounted) {
        setIsPaused(false);
      }
    };

    const handleTimeUpdate = (data?: { seconds: number }) => {
      if (!loopUntilSeconds || !vimeoPlayerRef.current || !data) {
        return;
      }

      if (data.seconds >= loopUntilSeconds) {
        void vimeoPlayerRef.current.setCurrentTime(0).then(() => vimeoPlayerRef.current?.play());
      }
    };

    const handleEnded = () => {
      if (!vimeoPlayerRef.current) {
        return;
      }

      void vimeoPlayerRef.current.setCurrentTime(0).then(() => vimeoPlayerRef.current?.play());
    };

    const setupVimeoPlayer = async () => {
      const currentWindow = window as VimeoWindow;

      if (!currentWindow.Vimeo?.Player) {
        await new Promise<void>((resolve, reject) => {
          const existingScript = document.querySelector('script[data-vimeo-player-api="true"]') as HTMLScriptElement | null;

          if (existingScript) {
            existingScript.addEventListener('load', () => resolve(), { once: true });
            existingScript.addEventListener('error', () => reject(new Error('Falha ao carregar Vimeo API')), { once: true });

            if ((window as VimeoWindow).Vimeo?.Player) {
              resolve();
            }

            return;
          }

          const script = document.createElement('script');
          script.src = 'https://player.vimeo.com/api/player.js';
          script.async = true;
          script.dataset.vimeoPlayerApi = 'true';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Falha ao carregar Vimeo API'));
          document.body.appendChild(script);
        });
      }

      if (!isMounted || !iframeRef.current || !(window as VimeoWindow).Vimeo?.Player) {
        return;
      }

      vimeoPlayerRef.current = new (window as VimeoWindow).Vimeo!.Player(iframeRef.current);
      vimeoPlayerRef.current.on('pause', handlePause);
      vimeoPlayerRef.current.on('play', handlePlay);
      vimeoPlayerRef.current.on('timeupdate', handleTimeUpdate);
      vimeoPlayerRef.current.on('ended', handleEnded);
    };

    void setupVimeoPlayer();

    return () => {
      isMounted = false;
      if (vimeoPlayerRef.current) {
        vimeoPlayerRef.current.off('pause', handlePause);
        vimeoPlayerRef.current.off('play', handlePlay);
        vimeoPlayerRef.current.off('timeupdate', handleTimeUpdate);
        vimeoPlayerRef.current.off('ended', handleEnded);
      }
    };
  }, [hasStarted, isVimeoEmbed, loopUntilSeconds, section.layout]);

  if (section.layout === 'immersive') {
    return (
      <section id={section.id} className="cinematic-section relative min-h-screen overflow-hidden" data-scroll-scene="true">
        <div className="absolute inset-0 z-0 bg-[#030303]">
          <div className="absolute inset-0 overflow-hidden">
            {hasStarted && isVimeoEmbed ? (
              <iframe
                ref={iframeRef}
                src={autoplaySrc}
                className="absolute left-1/2 top-1/2 h-[56.25vw] w-full min-w-full -translate-x-1/2 -translate-y-1/2 sm:h-[56.25vw] sm:min-h-full sm:w-[177.78vh] sm:min-w-full"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                title={section.media?.alt ?? section.title}
              />
            ) : !hasStarted && isVimeoEmbed ? (
              <iframe
                src={backgroundSrc}
                className="pointer-events-none absolute left-1/2 top-1/2 h-[88vh] w-[245vw] min-w-[245vw] -translate-x-1/2 -translate-y-[48%] scale-[1.18] grayscale sm:h-[56.25vw] sm:min-h-full sm:w-[177.78vh] sm:min-w-full sm:-translate-y-1/2 sm:scale-100"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                title={section.media?.alt ?? section.title}
              />
            ) : hasStarted && hasVideo ? (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                autoPlay
                playsInline
                poster={section.media?.poster}
                onPause={() => setIsPaused(true)}
                onPlay={() => setIsPaused(false)}
              >
                <source src={section.media?.src} type="video/mp4" />
              </video>
            ) : hasVideo ? (
              <video className="h-full w-full object-cover grayscale" autoPlay muted loop playsInline poster={section.media?.poster}>
                <source src={section.media?.src} type="video/mp4" />
              </video>
            ) : hasImage ? (
              <Image
                src={section.media?.src as string}
                alt={section.media?.alt ?? section.title}
                fill
                className="object-cover grayscale"
                sizes="100vw"
              />
            ) : (
              <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(221,178,95,0.08),transparent_26%),linear-gradient(180deg,#090909,#020202)]" />
            )}
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_24%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),transparent)]" />
          <div className="pointer-events-none absolute left-[8%] top-[22%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)] blur-3xl" />
          <div className="pointer-events-none absolute bottom-[18%] right-[10%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_72%)] blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.24),transparent_35%,transparent_65%,rgba(0,0,0,0.24))]" />
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.1]" />
          <div
            className={
              hasStarted
                ? 'pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42),rgba(0,0,0,0.5),rgba(0,0,0,0.86))] opacity-55'
                : 'pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42),rgba(0,0,0,0.5),rgba(0,0,0,0.86))]'
            }
          />
        </div>

        {!hasStarted ? (
          <Container className="relative z-10 flex min-h-screen items-center justify-center px-5 py-16 sm:px-6 sm:py-20">
            <Reveal className="mx-auto max-w-4xl text-center">
              <button
                type="button"
                onClick={handleStart}
                className="group mx-auto mt-10 flex h-28 w-28 items-center justify-center rounded-full border border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(10,10,10,0.72))] text-white shadow-[0_24px_54px_rgba(0,0,0,0.42)] backdrop-blur-md transition duration-300 hover:scale-[1.03] hover:border-white/34 sm:h-24 sm:w-24"
                aria-label="Assistir filme conceito"
              >
                <span className="absolute h-28 w-28 rounded-full border border-white/12 transition duration-300 group-hover:scale-[1.12] sm:h-24 sm:w-24" />
                <Play className="relative ml-1 h-9 w-9 fill-current text-white sm:h-8 sm:w-8" />
              </button>

              <p className="mt-5 text-[0.72rem] font-medium uppercase tracking-[0.32em] text-white/74">ASSISTIR AGORA</p>
            </Reveal>
          </Container>
        ) : null}

        {hasStarted && isPaused ? (
          <button
            type="button"
            onClick={handleResume}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
            aria-label="Continuar vídeo conceito"
          >
            <span className="group flex h-24 w-24 items-center justify-center rounded-full border border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(10,10,10,0.78))] text-white shadow-[0_24px_54px_rgba(0,0,0,0.42)] backdrop-blur-md transition duration-300 hover:scale-[1.03] hover:border-white/34">
              <span className="absolute h-24 w-24 rounded-full border border-white/12 transition duration-300 group-hover:scale-[1.12]" />
              <Play className="relative ml-1 h-8 w-8 fill-current text-white" />
            </span>
          </button>
        ) : null}
      </section>
    );
  }

  return (
    <section id={section.id} className="py-24 md:py-32" data-scroll-scene="true">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal>
            <MediaFrame
              src={section.media?.src}
              poster={section.media?.poster}
              alt={section.media?.alt ?? section.title}
              ratio={section.media?.ratio ?? 'video'}
              caption={section.media?.caption}
              fallbackLabel={section.media?.fallbackLabel ?? 'Visual'}
            />
          </Reveal>

          <Reveal delay={0.1} className="space-y-7">
            <SectionHeading eyebrow={section.eyebrow} title={section.title} description={section.description} />
            <div className="space-y-2">
              {section.points.map((point, index) => (
                <Reveal key={point.title} delay={0.08 * index}>
                  <div className="border-b border-black/10 pb-5">
                    <h3 className="text-lg font-medium text-white">{point.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/58">{point.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

