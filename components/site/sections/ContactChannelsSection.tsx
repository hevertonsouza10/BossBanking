'use client';

import Link from 'next/link';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import Container from '@/components/site/ui/Container';
import Reveal from '@/components/site/ui/Reveal';
import type { ContactChannelsSection as ContactChannelsSectionType } from '@/lib/cms/types';
import { keepBossLedgerTogether } from '@/lib/utils';

function getChannelIcon(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes('whatsapp')) {
    return MessageCircle;
  }

  if (normalized.includes('mail') || normalized.includes('e-mail')) {
    return Mail;
  }

  return Phone;
}

export default function ContactChannelsSection({ section }: { section: ContactChannelsSectionType }) {
  return (
    <section className="relative py-24 md:py-32" data-scroll-scene="true">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(221,178,95,0.08),transparent_20%),linear-gradient(180deg,rgba(5,5,5,0),rgba(5,5,5,0.62)_18%,rgba(5,5,5,0.9))]" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          {section.eyebrow ? (
            <p className="text-[12px] uppercase tracking-[0.34em] text-[#ddb25f]">{section.eyebrow}</p>
          ) : null}
          <h2 className="mx-auto mt-5 max-w-4xl font-[family:var(--font-display)] text-[2.4rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white md:text-[3.8rem]">
            {keepBossLedgerTogether(section.title)}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[0.98rem] leading-8 text-white/62 md:text-[1.04rem]">
            {keepBossLedgerTogether(section.description)}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {section.items.map((item, index) => {
            const Icon = getChannelIcon(item.label);

            return (
              <Reveal key={`${item.label}-${item.href}`} delay={0.08 * index}>
                <Link
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  className={
                    item.primary
                      ? 'cta-luxury-shell group block overflow-hidden rounded-[1.8rem] p-[1px]'
                      : 'group block'
                  }
                >
                  <article
                    className={
                      item.primary
                        ? 'cta-luxury-panel relative h-full overflow-hidden rounded-[calc(1.8rem-1px)] px-6 py-7'
                        : 'minimal-glass-card relative h-full rounded-[1.8rem] px-6 py-7'
                    }
                  >
                    <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(221,178,95,0.15),transparent_72%)] blur-3xl" />
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="flex items-center gap-4">
                        <div
                          className={
                            item.primary
                              ? 'soft-glass-pill relative inline-flex h-12 w-12 items-center justify-center rounded-[1rem] border border-[#ddb25f]/20'
                              : 'soft-glass-pill relative inline-flex h-12 w-12 items-center justify-center rounded-[1rem]'
                          }
                        >
                          <Icon className={item.primary ? 'h-5 w-5 text-[#ddb25f]' : 'h-5 w-5 text-white/78'} />
                        </div>
                        <div>
                          <p className="text-[0.62rem] uppercase tracking-[0.26em] text-[#ddb25f]">{item.label}</p>
                          {item.primary ? (
                            <p className="mt-1 text-[0.58rem] uppercase tracking-[0.24em] text-white/38">Canal prioritário</p>
                          ) : null}
                        </div>
                      </div>

                      <div className="minimal-glass-separator mt-6" />

                      <p className="mt-6 text-[1.2rem] font-medium leading-[1.18] tracking-[-0.03em] text-white md:text-[1.38rem]">
                        {item.value}
                      </p>

                      {item.description ? (
                        <p className="mt-3 text-[0.96rem] leading-7 text-white/56">{item.description}</p>
                      ) : null}

                      <div className="mt-6 pt-1">
                        <span
                          className={
                            item.primary
                              ? 'lux-button lux-button-gold min-h-[3rem] min-w-[12.5rem] px-6 text-[0.62rem] tracking-[0.22em]'
                              : 'lux-button lux-button-dark min-h-[3rem] min-w-[11.5rem] px-6 text-[0.62rem] tracking-[0.18em]'
                          }
                        >
                          {item.primary ? 'Falar no WhatsApp' : 'Acessar canal'}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.12} className="mx-auto mt-12 max-w-4xl">
          <p className="text-center text-[0.96rem] leading-8 text-white/56 md:text-[1rem]">
            {keepBossLedgerTogether(section.bottomText)}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
