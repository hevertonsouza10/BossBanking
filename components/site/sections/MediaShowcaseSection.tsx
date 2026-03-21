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
      <div className={isHomeCard ? 'absolute inset-x-0 bottom-0 z-0 h-[50vh] overflow-hidden bg-black md:inset-0 md:h-auto' : 'absolute inset-0 z-0'}>
        {hasVideo ? (
          <video
            ref={videoRef}
            className={
              isHomeCard
                ? 'absolute inset-0 h-full w-full scale-[1.4] object-cover object-[center_44%] md:left-[24%] md:top-0 md:h-full md:w-[86%] md:translate-x-0 md:translate-y-[-11%] md:scale-[1.34] md:object-cover'
                : 'h-full w-full object-cover'
            }
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

      <Container
        className={
          isHomeCard
            ? 'relative z-10 flex min-h-[calc(100vh-100px)] flex-col items-center py-0 md:items-start'
            : 'relative z-10 flex min-h-[calc(100vh-100px)] items-end py-16 md:py-20'
        }
      >
        <div
          className={
            isHomeCard
              ? 'flex w-full max-w-[24rem] flex-col items-center space-y-4 pt-7 text-center md:max-w-[27rem] md:items-start md:pt-[12vh] md:text-left lg:max-w-[31rem]'
              : 'max-w-3xl space-y-5'
          }
        >
          <Reveal>
            {section.eyebrow ? (
              <p className="text-[12px] uppercase tracking-[0.42em] text-[#ddb25f]">
                {section.eyebrow}
              </p>
            ) : null}
            <h2
              className={
                isHomeCard
                  ? 'mt-2 w-full text-[1.72rem] font-light leading-[0.98] tracking-[-0.05em] text-white md:mt-3 md:text-[2.95rem]'
                  : 'mt-4 max-w-3xl text-4xl font-light leading-[1.02] tracking-[-0.04em] text-white md:text-6xl'
              }
            >
              {section.title}
            </h2>
          </Reveal>

          {section.description ? (
            <Reveal delay={0.08}>
              <p className={isHomeCard ? 'max-w-[19rem] text-center text-[0.92rem] leading-6 text-white/55 md:max-w-[23rem] md:text-left md:text-[0.95rem] md:leading-7' : 'max-w-xl text-sm leading-7 text-white/68 md:text-base'}>
                {section.description}
              </p>
            </Reveal>
          ) : null}
        </div>

        {isHomeCard ? <div className="mt-6 h-[50vh] w-full md:hidden" aria-hidden="true" /> : null}
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
          <Reveal className="relative z-10 max-w-[48rem] space-y-6 text-center lg:py-24 lg:text-left">
            <div className="mx-auto max-w-[24rem] lg:mx-0 lg:max-w-none">
              <SectionHeading
                eyebrow={section.eyebrow}
                title={section.title}
                description={section.description}
              />
            </div>
            {section.highlights?.length ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {section.highlights.map((item, index) => (
                  <Reveal key={item.title} delay={0.12 * index}>
                    <div className="minimal-glass-card rounded-[1.5rem] p-4 text-center md:p-5 lg:text-left">
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="mt-3 text-sm leading-7 text-white/55">{item.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : null}
          </Reveal>

          <div className="relative z-0 mx-auto w-[140%] max-w-none -translate-x-[14%] sm:w-[128%] sm:-translate-x-[10%] lg:pointer-events-none lg:absolute lg:right-[-4rem] lg:top-1/2 lg:w-[52rem] lg:max-w-none lg:translate-x-0 lg:-translate-y-1/2 xl:right-[-1rem] xl:w-[56rem]">
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
                className="relative max-h-none lg:max-h-none"
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
