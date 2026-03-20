'use client';

import Link from 'next/link';
import Container from '@/components/site/ui/Container';
import Reveal from '@/components/site/ui/Reveal';
import type { CtaSection as CtaSectionType } from '@/lib/cms/types';

export default function CtaSection({ section }: { section: CtaSectionType }) {
  const isHomeCta = section.id === 'home-cta';

  return (
    <section className="py-24 md:py-32" data-scroll-scene="true">
      <Container>
        <Reveal>
          <div className="cta-luxury-shell relative overflow-hidden rounded-[2rem] p-[1px]">
            <div className="cta-luxury-panel relative overflow-hidden rounded-[calc(2rem-1px)] px-6 py-14 text-center md:px-12 md:py-16">
              <div className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,236,196,0.82),transparent)]" />
              <div className="pointer-events-none absolute left-[10%] top-6 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(230,194,122,0.2),transparent_72%)] blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 right-[8%] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_72%)] blur-3xl" />

              <div className="relative z-10">
                <p className="text-[11px] uppercase tracking-[0.42em] text-[#ddb25f]">{section.eyebrow}</p>
                <h2 className="mx-auto mt-5 max-w-4xl font-[family:var(--font-display)] text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.04em] text-white md:text-6xl">
                  {section.title}
                </h2>
                {section.description ? (
                  <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/64 md:text-base">{section.description}</p>
                ) : null}
                {isHomeCta ? (
                  <div className="mt-10 flex flex-col items-center gap-4 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-6">
                    {section.actions.map((action) => {
                      const isSecondary = action.variant === 'secondary';

                      return (
                        <Link
                          key={action.href}
                          href={action.href}
                          target={action.external ? '_blank' : undefined}
                          rel={action.external ? 'noreferrer' : undefined}
                          className={
                            isSecondary
                              ? 'lux-button lux-button-dark min-w-[12.5rem] px-7 opacity-80 sm:justify-self-start sm:translate-x-4 sm:scale-[0.92]'
                              : 'lux-button lux-button-gold min-w-[16.5rem] px-10 text-[0.78rem] tracking-[0.32em] shadow-[0_18px_46px_rgba(201,162,77,0.24)] sm:col-start-2 sm:min-w-[18.5rem] sm:justify-self-center'
                          }
                        >
                          {action.label}
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                    {section.actions.map((action) => (
                      <Link
                        key={action.href}
                        href={action.href}
                        target={action.external ? '_blank' : undefined}
                        rel={action.external ? 'noreferrer' : undefined}
                        className={
                          action.variant === 'secondary'
                            ? 'lux-button lux-button-dark'
                            : 'lux-button lux-button-gold'
                        }
                      >
                        {action.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
