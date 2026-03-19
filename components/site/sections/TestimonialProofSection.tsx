'use client';

import Container from '@/components/site/ui/Container';
import Reveal from '@/components/site/ui/Reveal';
import SectionHeading from '@/components/site/ui/SectionHeading';
import type { TestimonialProofSection as TestimonialProofSectionType } from '@/lib/cms/types';

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
          <div className="max-w-[34rem] space-y-7 pt-1">
            {hasQuoteContent ? (
              <SectionHeading
                eyebrow={section.eyebrow}
                title={section.title}
                description={showDescriptionAboveCard ? undefined : section.description}
              />
            ) : (
              <div className="max-w-2xl">
                {section.eyebrow ? (
                  <p className="mb-5 text-[10px] uppercase tracking-[0.42em] text-[#ddb25f]">{section.eyebrow}</p>
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
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="/contato"
                    className="inline-flex min-h-[3.15rem] items-center justify-center rounded-full border border-[#d9dde2]/18 bg-[linear-gradient(180deg,#f4dcab_0%,#ddb25f_52%,#b9832e_100%)] px-6 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#130f08] shadow-[0_0_18px_rgba(173,177,184,0.08),0_10px_26px_rgba(201,162,77,0.14)] transition duration-300 ease-out hover:-translate-y-[1px] hover:scale-[1.01] hover:brightness-[1.02]"
                  >
                    Entrar em contato
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="space-y-5 pt-1">
            {showDescriptionAboveCard ? (
              <div className="max-w-[42rem] border-l border-[#ddb25f]/24 pl-5">
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
                    <p className="mt-7 text-[10px] uppercase tracking-[0.36em] text-[#ddb25f]">{section.attribution}</p>
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
                {section.metrics.map((metric, index) => (
                  <Reveal key={metric.label} delay={0.1 * index}>
                    <div className="relative flex min-h-[10.5rem] flex-col justify-between overflow-hidden rounded-[1.1rem] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.012))] px-5 py-6">
                      <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(221,178,95,0.08),transparent_70%)]" />
                      <div className="absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-transparent via-[#ddb25f]/20 to-transparent" />
                      <div className="space-y-2">
                        <p className="font-[family:var(--font-display)] text-[2rem] font-light text-white md:text-[2.5rem]">
                          {metric.value}
                        </p>
                      </div>
                      <p className="max-w-[14ch] text-[10px] uppercase tracking-[0.24em] text-white/42">{metric.label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {!hasQuoteContent ? (
              <div className="flex flex-wrap items-center justify-start gap-x-8 gap-y-2 pt-1">
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
