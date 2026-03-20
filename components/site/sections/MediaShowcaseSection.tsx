'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Container from '@/components/site/ui/Container';
import MediaFrame from '@/components/site/ui/MediaFrame';
import Reveal from '@/components/site/ui/Reveal';
import SectionHeading from '@/components/site/ui/SectionHeading';
import type { MediaShowcaseSection as MediaShowcaseSectionType } from '@/lib/cms/types';

function FullscreenMedia({ section }: { section: MediaShowcaseSectionType }) {
  const HOME_CARD_START_TIME = 1;
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasVideo = section.media?.src?.endsWith('.mp4');
  const hasImage = !!section.media?.src && !hasVideo;
  const isHomeCard = section.id === 'home-card';
  const homeCardTitleLines = isHomeCard
    ? ['Um cartão personalizado,', 'para clientes selecionados,', 'como você.']
    : null;

  useEffect(() => {
    if (!isHomeCard || !videoRef.current) {
      return;
    }

    const video = videoRef.current;
    video.playbackRate = 0.72;

    const handleLoadedMetadata = () => {
      video.currentTime = Math.min(HOME_CARD_START_TIME, Math.max(video.duration - 0.04, 0));
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
  }, [isHomeCard, section.media?.src]);

  useEffect(() => {
    if (!isHomeCard || !sectionRef.current || !videoRef.current) {
      return;
    }

    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.currentTime = Math.min(HOME_CARD_START_TIME, Math.max(video.duration - 0.04, 0));
          void video.play();
          return;
        }

        video.pause();
        video.currentTime = Math.min(HOME_CARD_START_TIME, Math.max(video.duration - 0.04, 0));
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [isHomeCard, section.media?.src]);

  const handleVideoEnded = () => {
    if (!isHomeCard || !videoRef.current) {
      return;
    }

    const video = videoRef.current;
    video.pause();
    video.currentTime = Math.max(video.duration - 0.04, 0);
  };

  return (
    <section ref={sectionRef} className="cinematic-section min-h-screen overflow-hidden pt-[100px]" data-scroll-scene="true">
      <div className="absolute inset-0 z-0">
        {hasVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            poster={section.media?.poster}
            loop={!isHomeCard}
            onEnded={handleVideoEnded}
          >
            <source src={section.media?.src} type="video/mp4" />
          </video>
        ) : hasImage ? (
          <Image
            src={section.media?.src as string}
            alt={section.media?.alt ?? section.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(201,162,77,0.12),transparent_22%),linear-gradient(180deg,#111,#020202)]" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,2,2,0.72),rgba(2,2,2,0.08),rgba(2,2,2,0.8))]" />
      </div>

      <Container className="relative z-10 flex min-h-[calc(100vh-100px)] items-end py-16 md:py-20">
        <div className={isHomeCard ? 'max-w-[24rem] space-y-5 pb-10 md:max-w-[30rem] md:pb-16' : 'max-w-3xl space-y-5'}>
          <Reveal>
            {section.eyebrow ? (
              <p className="text-[11px] uppercase tracking-[0.42em] text-[#ddb25f]">{section.eyebrow}</p>
            ) : null}
            <h2
              className={
                isHomeCard
                  ? 'mt-4 max-w-[11ch] text-[2.3rem] font-light leading-[1.02] tracking-[-0.05em] text-white md:text-[3.8rem]'
                  : 'mt-4 max-w-3xl text-4xl font-light leading-[1.02] tracking-[-0.04em] text-white md:text-6xl'
              }
            >
              {homeCardTitleLines
                ? homeCardTitleLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))
                : section.title}
            </h2>
          </Reveal>

          {section.description ? (
            <Reveal delay={0.08}>
              <p className={isHomeCard ? 'max-w-[28rem] text-sm leading-7 text-white/68 md:text-[0.98rem]' : 'max-w-xl text-sm leading-7 text-white/68 md:text-base'}>
                {section.description}
              </p>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

export default function MediaShowcaseSection({ section }: { section: MediaShowcaseSectionType }) {
  const isPhone = section.variant === 'phone';

  if (!isPhone) {
    return <FullscreenMedia section={section} />;
  }

  return (
    <section
      id="next-section"
      className="overflow-hidden bg-[#000001] py-20 md:py-24 lg:min-h-screen lg:py-0"
      data-scroll-scene="true"
    >
      <Container className="relative lg:flex lg:min-h-screen lg:items-center">
        <div className="grid items-start gap-10 lg:w-full lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-8">
          <Reveal className="relative z-10 max-w-[48rem] space-y-6 lg:py-24">
            <SectionHeading
              eyebrow={section.eyebrow}
              title={section.title}
              description={section.description}
            />
            {section.highlights?.length ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {section.highlights.map((item, index) => (
                  <Reveal key={item.title} delay={0.12 * index}>
                    <div className="minimal-glass-card rounded-[1.5rem] p-4 md:p-5">
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="mt-3 text-sm leading-7 text-white/55">{item.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : null}
          </Reveal>

          <div className="relative z-0 mx-auto w-full max-w-[46.8rem] lg:pointer-events-none lg:absolute lg:right-[-4rem] lg:top-1/2 lg:w-[52rem] lg:max-w-none lg:-translate-y-1/2 xl:right-[-1rem] xl:w-[56rem]">
            <Reveal delay={0.1}>
              <div className="absolute inset-x-20 top-14 h-40 rounded-full bg-[#c9a24d]/16 blur-3xl" />
              <MediaFrame
                src={section.media?.src}
                poster={section.media?.poster}
                alt={section.media?.alt ?? section.title}
                caption={section.media?.caption}
                ratio={section.media?.ratio ?? 'video'}
                fallbackLabel={section.media?.fallbackLabel ?? 'Asset pendente'}
                frameless
                className="relative max-h-[44rem] lg:max-h-none"
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
