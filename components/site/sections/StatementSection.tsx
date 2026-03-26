'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Container from '@/components/site/ui/Container';
import Reveal from '@/components/site/ui/Reveal';
import { keepBossLedgerTogether } from '@/lib/utils';
import type { StatementSection as StatementSectionType } from '@/lib/cms/types';

export default function StatementSection({ section }: { section: StatementSectionType }) {
  const testimonials = useMemo(() => section.testimonials ?? [], [section.testimonials]);
  const desktopCloneCount = Math.min(3, testimonials.length);
  const mobileCloneCount = Math.min(1, testimonials.length);
  const desktopLoopSlides = useMemo(() => {
    if (!testimonials.length) {
      return [];
    }

    return [
      ...testimonials.slice(-desktopCloneCount),
      ...testimonials,
      ...testimonials.slice(0, desktopCloneCount),
    ];
  }, [desktopCloneCount, testimonials]);
  const mobileLoopSlides = useMemo(() => {
    if (!testimonials.length) {
      return [];
    }

    return [
      ...testimonials.slice(-mobileCloneCount),
      ...testimonials,
      ...testimonials.slice(0, mobileCloneCount),
    ];
  }, [mobileCloneCount, testimonials]);
  const [desktopIndex, setDesktopIndex] = useState(desktopCloneCount);
  const [mobileIndex, setMobileIndex] = useState(mobileCloneCount);
  const [desktopInstant, setDesktopInstant] = useState(false);
  const [mobileInstant, setMobileInstant] = useState(false);
  const canSlide = testimonials.length > 1;

  const handlePrev = () => {
    if (!testimonials.length) {
      return;
    }

    setDesktopInstant(false);
    setMobileInstant(false);
    setDesktopIndex((current) => current - 1);
    setMobileIndex((current) => current - 1);
  };

  const handleNext = () => {
    if (!testimonials.length) {
      return;
    }

    setDesktopInstant(false);
    setMobileInstant(false);
    setDesktopIndex((current) => current + 1);
    setMobileIndex((current) => current + 1);
  };

  const handleDotClick = (index: number) => {
    setDesktopInstant(false);
    setMobileInstant(false);
    setDesktopIndex(index + desktopCloneCount);
    setMobileIndex(index + mobileCloneCount);
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');

  const activeIndex = testimonials.length ? ((desktopIndex - desktopCloneCount) % testimonials.length + testimonials.length) % testimonials.length : 0;
  const desktopX = `-${desktopIndex * (100 / 3)}%`;
  const mobileX = `-${mobileIndex * 100}%`;

  const handleDesktopAnimationComplete = () => {
    if (!testimonials.length) {
      return;
    }

    if (desktopIndex >= testimonials.length + desktopCloneCount) {
      setDesktopInstant(true);
      setDesktopIndex(desktopCloneCount);
      return;
    }

    if (desktopIndex < desktopCloneCount) {
      setDesktopInstant(true);
      setDesktopIndex(testimonials.length + desktopIndex);
    }
  };

  const handleMobileAnimationComplete = () => {
    if (!testimonials.length) {
      return;
    }

    if (mobileIndex >= testimonials.length + mobileCloneCount) {
      setMobileInstant(true);
      setMobileIndex(mobileCloneCount);
      return;
    }

    if (mobileIndex < mobileCloneCount) {
      setMobileInstant(true);
      setMobileIndex(testimonials.length + mobileIndex);
    }
  };

  return (
    <section className="py-20 md:py-22" data-scroll-scene="true">
      <Container className="space-y-10 md:space-y-12">
        <Reveal className="mx-auto max-w-4xl text-center">
          {section.eyebrow ? (
            <p className="mb-4 text-[12px] uppercase tracking-[0.42em] text-[#ddb25f]">{section.eyebrow}</p>
          ) : null}
          <h2 className="mx-auto max-w-3xl font-[family:var(--font-display)] text-3xl font-light leading-[1.02] tracking-[-0.03em] text-white md:text-5xl">
            {keepBossLedgerTogether(section.title)}
          </h2>
          {section.description ? (
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
              {keepBossLedgerTogether(section.description)}
            </p>
          ) : null}
        </Reveal>

        {testimonials.length ? (
          <Reveal className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#050505] via-[#050505]/55 to-transparent md:w-16" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#050505] via-[#050505]/55 to-transparent md:w-16" />

            <div className="mb-5 flex items-center justify-between gap-4 md:mb-6">
              <p className="pl-[30px] text-[11px] uppercase tracking-[0.3em] text-white/68">
                Cases em destaque
              </p>
              <div className="relative z-20 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-[#111111] text-white/88 shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition hover:border-[#ddb25f]/42 hover:bg-[#171717] hover:text-white"
                  aria-label="Ver case anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-[#111111] text-white/88 shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition hover:border-[#ddb25f]/42 hover:bg-[#171717] hover:text-white"
                  aria-label="Ver próximo case"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="overflow-hidden md:hidden">
              <motion.div
                className="flex"
                initial={false}
                animate={{ x: mobileX }}
                transition={mobileInstant ? { duration: 0 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={handleMobileAnimationComplete}
              >
                {mobileLoopSlides.map((item, index) => (
                  <div key={`${item.name}-mobile-${index}`} className="w-full flex-none px-1">
                    <article className="minimal-glass-card min-h-[21.5rem] rounded-[1.45rem] p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ddb25f]/18 bg-[linear-gradient(180deg,rgba(221,178,95,0.2),rgba(255,255,255,0.05))] text-xs font-semibold uppercase tracking-[0.18em] text-[#f3d08a]">
                          {getInitials(item.name)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{item.name}</p>
                          <p className="text-xs uppercase tracking-[0.22em] text-white/34">{item.role}</p>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center gap-1 text-[#ddb25f]">
                        {Array.from({ length: item.rating }).map((_, starIndex) => (
                          <Star key={`${item.name}-mobile-star-${starIndex}`} className="h-4 w-4 fill-current" />
                        ))}
                      </div>

                      <p className="mt-5 text-[0.98rem] leading-7 text-white/82">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </article>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="hidden overflow-hidden md:block">
              <motion.div
                className="flex"
                initial={false}
                animate={{ x: desktopX }}
                transition={desktopInstant ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={handleDesktopAnimationComplete}
              >
                {desktopLoopSlides.map((item, index) => (
                  <div key={`${item.name}-desktop-${index}`} className="w-1/3 flex-none px-2">
                    <article className="minimal-glass-card relative min-h-[22.75rem] rounded-[1.7rem] p-6">
                      <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-[#ddb25f]/22 to-transparent" />
                      <div className="absolute right-6 top-6 h-20 w-20 rounded-full bg-[#ddb25f]/8 blur-3xl" />

                      <div className="flex items-center gap-3">
                        <div className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-[#ddb25f]/18 bg-[linear-gradient(180deg,rgba(221,178,95,0.2),rgba(255,255,255,0.05))] text-sm font-semibold uppercase tracking-[0.18em] text-[#f3d08a]">
                          {getInitials(item.name)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{item.name}</p>
                          <p className="text-xs uppercase tracking-[0.22em] text-white/34">{item.role}</p>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center gap-1 text-[#ddb25f]">
                        {Array.from({ length: item.rating }).map((_, starIndex) => (
                          <Star key={`${item.name}-desktop-star-${starIndex}`} className="h-4 w-4 fill-current" />
                        ))}
                      </div>

                      <p className="mt-5 text-[1rem] leading-7 text-white/82">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </article>
                  </div>
                ))}
              </motion.div>
            </div>

            {canSlide ? (
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                      key={`dot-${index}`}
                      type="button"
                      onClick={() => handleDotClick(index)}
                      className={index === activeIndex ? 'h-2.5 w-8 rounded-full bg-[#ddb25f]' : 'h-2.5 w-2.5 rounded-full border border-white/32 bg-transparent'}
                      aria-label={`Ir para o case ${index + 1}`}
                    />
                ))}
              </div>
            ) : null}
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
