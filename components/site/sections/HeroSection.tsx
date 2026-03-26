'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Container from '@/components/site/ui/Container';
import { keepBossLedgerTogether } from '@/lib/utils';
import type { HeroSection as HeroSectionType } from '@/lib/cms/types';

function getHeroEmbed(src?: string) {
  if (!src) {
    return null;
  }

  const youtubeMatch = src.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/,
  );

  if (youtubeMatch) {
    const videoId = youtubeMatch[1];
    return {
      provider: 'youtube' as const,
      src: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&playsinline=1&rel=0`,
    };
  }

  const vimeoMatch = src.match(/(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)/);
  if (!vimeoMatch) {
    return null;
  }

  const videoId = vimeoMatch[1];
  return {
    provider: 'vimeo' as const,
    src: `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1&background=1&controls=0&autopause=0&playsinline=1&dnt=1`,
  };
}

export default function HeroSection({ section }: { section: HeroSectionType }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isHomeHero = section.id === 'home-hero';
  const heroEmbed = getHeroEmbed(section.media?.src);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const mediaOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.82, 0.55]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.38, 0.68]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.35]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -56]);

  const handleScrollNext = () => {
    if (!sectionRef.current) {
      return;
    }

    const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-scene="true"]'));
    const currentIndex = scenes.findIndex((scene) => scene === sectionRef.current);
    const nextScene = currentIndex >= 0 ? scenes[currentIndex + 1] : null;

    if (!nextScene) {
      return;
    }

    nextScene.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-0 min-h-screen overflow-hidden pt-[100px]"
      data-scroll-scene="true"
      style={{ opacity: isHomeHero ? undefined : 1 }}
    >
      <motion.div className="absolute inset-0" style={isHomeHero ? { scale: mediaScale, opacity: mediaOpacity } : undefined}>
        {heroEmbed ? (
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              src={heroEmbed.src}
              title={section.media?.alt ?? section.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 pointer-events-none [filter:grayscale(1)_brightness(0.44)_contrast(1.06)]"
            />
          </div>
        ) : section.media?.src ? (
          <video
            className="h-full w-full object-cover [filter:grayscale(1)_brightness(0.44)_contrast(1.06)]"
            autoPlay
            muted
            loop
            playsInline
            poster={section.media.poster}
          >
            <source src={section.media.src} type="video/mp4" />
          </video>
        ) : null}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,178,104,0.12),transparent_24%)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(221,178,95,0.12),transparent)]" />
        <div className="absolute left-[8%] top-[22%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(221,178,95,0.1),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[18%] right-[10%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(221,178,95,0.08),transparent_72%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.24),transparent_35%,transparent_65%,rgba(0,0,0,0.24))]" />
        <div className="noise-overlay absolute inset-0 opacity-[0.1]" />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42),rgba(0,0,0,0.5),rgba(0,0,0,0.86))]"
          style={isHomeHero ? { opacity: overlayOpacity } : undefined}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#040404] to-transparent" />
      </motion.div>

      <Container
        className={
          isHomeHero
            ? 'relative flex min-h-[calc(100vh-100px)] items-center justify-center px-5 md:px-8'
            : 'relative flex min-h-[calc(100vh-100px)] items-center justify-center px-5 py-8 md:px-8 md:py-10'
        }
      >
        <motion.div
          style={isHomeHero ? { opacity: contentOpacity, y: contentY } : undefined}
          className={
            isHomeHero
              ? 'flex w-full max-w-[72rem] -translate-y-[148px] flex-col items-center text-center md:-translate-y-[160px]'
              : 'flex w-full max-w-5xl -translate-y-[30px] flex-col items-center text-center md:-translate-y-[36px]'
          }
        >
          {isHomeHero ? (
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12 }}
              className="mb-4 inline-flex items-center gap-3 font-[family:var(--font-display)] text-[12px] uppercase tracking-[0.34em] text-[#e1c58f] md:mb-5"
            >
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#ddb25f]" />
              Boss Ledger
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#ddb25f]" />
            </motion.span>
          ) : section.eyebrow ? (
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12 }}
              className="mb-5 inline-flex items-center gap-3 font-[family:var(--font-display)] text-[11px] uppercase tracking-[0.34em] text-[#e1c58f]"
            >
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#ddb25f]" />
              {keepBossLedgerTogether(section.eyebrow)}
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#ddb25f]" />
            </motion.span>
          ) : null}

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={
              isHomeHero
                ? 'mx-auto max-w-[18ch] text-center font-[family:var(--font-sans)] text-[1.85rem] font-semibold leading-[0.96] tracking-[-0.072em] text-white [text-wrap:balance] sm:text-[2.2rem] md:text-[3.55rem] xl:text-[4.55rem]'
                : 'mx-auto max-w-4xl font-[family:var(--font-sans)] text-[1.8rem] font-semibold leading-[1.05] tracking-[-0.072em] text-white [text-wrap:balance] md:text-[3.2rem] xl:text-[4.1rem]'
            }
          >
            {isHomeHero ? (
              <>
                <span className="block">O primeiro banking</span>
                <span className="mt-0.5 block md:mt-1">as a service select do Brasil</span>
              </>
            ) : (
              keepBossLedgerTogether(section.title)
            )}
          </motion.h1>

          {!isHomeHero && section.description ? (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mx-auto mt-6 max-w-2xl text-[0.98rem] leading-8 text-white/62 md:text-[1.06rem]"
            >
              {keepBossLedgerTogether(section.description)}
            </motion.p>
          ) : null}

          {!isHomeHero && section.actions.length ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.62 }}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              {section.actions.map((action) => (
                <Link
                  key={`${section.id}-${action.href}-${action.label}`}
                  href={action.href}
                  target={action.external ? '_blank' : undefined}
                  rel={action.external ? 'noreferrer' : undefined}
                  className={action.variant === 'secondary' ? 'lux-button lux-button-dark' : 'lux-button lux-button-gold'}
                >
                  {action.label}
                </Link>
              ))}
            </motion.div>
          ) : null}

        </motion.div>

        <div className="absolute inset-x-0 bottom-6 flex justify-center md:bottom-8">
          <motion.button
            type="button"
            onClick={handleScrollNext}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="group flex flex-col items-center gap-3 text-white/72"
            aria-label="Ir para a próxima seção"
          >
            <span className="text-[10px] uppercase tracking-[0.36em]">
              {section.scrollLabel ?? 'Descubra a melhor experiência PJ'}
            </span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/20 shadow-[0_14px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 group-hover:border-[#ddb25f]/36"
            >
              <ChevronDown className="h-4.5 w-4.5 text-[#ddb25f] transition duration-300 group-hover:translate-y-1" />
            </motion.span>
          </motion.button>
        </div>
      </Container>
    </motion.section>
  );
}
