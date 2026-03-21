'use client';

import { Handshake } from 'lucide-react';
import Container from '@/components/site/ui/Container';
import Reveal from '@/components/site/ui/Reveal';
import SectionHeading from '@/components/site/ui/SectionHeading';
import type { TestimonialProofSection as TestimonialProofSectionType } from '@/lib/cms/types';

const metricIcons = {
  handshake: Handshake,
} as const;

export default function TestimonialProofSection({ section }: { section: TestimonialProofSectionType }) {
  const hasQuoteContent = Boolean(section.quote || section.attribution);
  const showDescriptionAboveCard = !hasQuoteContent && Boolean(section.description);
  const premiumTitle = !hasQuoteContent
    ? section.title
        .replace('Atendimento humanizado', 'Atendimento humanizado\n')
        .replace('Gerentes Dedicados', 'Gerentes Dedicados\n')
    : section.title;

  return (
    <section className="py-24 md:py-32" data-scroll-scene="true">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:items-start lg:gap-16">
        <Reveal>
          <div className="max-w-[34rem] space-y-7 pt-1 text-center lg:text-left">
            {hasQuoteContent ? (
              <div className="mx-auto max-w-[24rem] lg:mx-0 lg:max-w-none">
                <SectionHeading
                  eyebrow={section.eyebrow}
                  title={section.title}
                  description={showDescriptionAboveCard ? undefined : section.description}
                />
              </div>
            ) : (
              <div className="mx-auto max-w-2xl lg:mx-0">
                {section.eyebrow ? (
                  <p className="mb-5 text-[12px] uppercase tracking-[0.42em] text-[#ddb25f]">{section.eyebrow}</p>
                ) : null}
                <h2 className="max-w-[12ch] font-[family:var(--font-display)] text-[2.3rem] font-semibold leading-[0.97] tracking-[-0.06em] text-white md:text-[3.8rem]">
                  {premiumTitle.split('\n').map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
              </div>
            )}

            {!hasQuoteContent ? (
              <div className="space-y-4 pt-1">
                <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                  <a
                    href="/contato"
                    className="lux-button lux-button-gold px-6 text-[0.64rem]"
                  >
                    Entrar em contato
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="space-y-5 pt-1 text-center lg:text-left">
            {showDescriptionAboveCard ? (
              <div className="mx-auto max-w-[42rem] border-t border-[#ddb25f]/24 pt-5 lg:mx-0 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                <p className="max-w-[34rem] text-sm leading-7 text-white/64 md:text-[1.02rem]">{section.description}</p>
              </div>
            ) : null}

            <div className="relative overflow-hidden rounded-[1.35rem] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(18,18,19,0.94),rgba(9,9,10,0.84))] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.28)] md:p-8">
              <div className="absolute left-[-4rem] top-[-4rem] h-32 w-32 rounded-full bg-[#ddb25f]/12 blur-3xl" />
              <div className="absolute bottom-[-5rem] right-[-3rem] h-40 w-40 rounded-full bg-white/[0.04] blur-3xl" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ddb25f]/24 to-transparent" />
              {hasQuoteContent ? (
                <>
                  {section.quote ? (
                    <p className="text-2xl font-light leading-10 text-white/90 md:text-3xl">{section.quote}</p>
                  ) : null}
                  {section.attribution ? (
                    <p className="mt-7 text-[12px] uppercase tracking-[0.36em] text-[#ddb25f]">{section.attribution}</p>
                  ) : null}
                </>
              ) : (
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex items-center gap-4">
                    <p className="text-[10px] uppercase tracking-[0.34em] text-white/30">Relacionamento premium</p>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                  </div>
                </div>
              )}

              <div className={hasQuoteContent ? 'mt-10 grid gap-3 sm:grid-cols-3' : 'grid gap-3 md:grid-cols-3'}>
                {section.metrics.map((metric, index) => {
                  const MetricIcon = metric.icon ? metricIcons[metric.icon] : null;

                  return (
                    <Reveal key={metric.label} delay={0.1 * index}>
                      <div className="relative flex min-h-[10.5rem] flex-col items-center justify-center overflow-hidden rounded-[1.1rem] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.012))] px-5 py-6 text-center">
                        <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(221,178,95,0.08),transparent_70%)]" />
                        <div className="absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-transparent via-[#ddb25f]/20 to-transparent" />
                        <div className="flex flex-1 flex-col items-center justify-center gap-3">
                          {MetricIcon ? (
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-[1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(48,48,50,0.9),rgba(10,10,11,0.96))] shadow-[0_12px_28px_rgba(0,0,0,0.28)]">
                              <div className="absolute inset-0 rounded-[1rem] bg-[radial-gradient(circle_at_top,rgba(255,236,196,0.08),transparent_60%)]" />
                              <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[linear-gradient(180deg,#f7e49f_0%,#ddb25f_52%,#b8862e_100%)]">
                                <MetricIcon className="h-4 w-4 text-[#0b0b0c] stroke-[2.2]" />
                              </div>
                            </div>
                          ) : (
                            <p className="font-[family:var(--font-display)] text-[2rem] font-light text-white md:text-[2.5rem]">
                              {metric.value}
                            </p>
                          )}
                          <p className="max-w-[18ch] text-[10px] uppercase leading-5 tracking-[0.24em] text-white/42">{metric.label}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            {!hasQuoteContent ? (
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 pt-1 lg:justify-start">
                <div className="flex items-center gap-3 text-[0.74rem] uppercase tracking-[0.16em] text-white/46">
                  <span className="h-px w-8 bg-gradient-to-r from-[#ddb25f]/40 to-transparent" />
                  <span>WhatsApp: +55 11 99999-9999</span>
                </div>
                <div className="flex items-center gap-3 text-[0.74rem] uppercase tracking-[0.16em] text-white/46">
                  <span className="h-px w-8 bg-gradient-to-r from-[#ddb25f]/26 to-transparent" />
                  <span>Telefone: +55 11 4000-0000</span>
                </div>
              </div>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
