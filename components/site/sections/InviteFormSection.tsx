import Container from '@/components/site/ui/Container';
import Reveal from '@/components/site/ui/Reveal';
import type { InviteFormSection as InviteFormSectionType } from '@/lib/cms/types';
import { keepBossLedgerTogether } from '@/lib/utils';

const WIX_INVITE_FORM_URL = 'https://bossbankltda.wixforms.com/f/7467672973244105863';

export default function InviteFormSection({ section }: { section: InviteFormSectionType }) {
  return (
    <section className="relative py-24 md:py-32" data-scroll-scene="true">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(221,178,95,0.08),transparent_22%),linear-gradient(180deg,rgba(7,7,7,0),rgba(5,5,5,0.68)_18%,rgba(5,5,5,0.92))]" />
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <Reveal className="space-y-6 lg:sticky lg:top-[140px]">
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[#ddb25f]/15 bg-white/[0.03] px-4 py-2 text-[0.62rem] uppercase tracking-[0.28em] text-[#ddb25f]">
              <span className="h-2 w-2 rounded-full bg-[#ddb25f]" />
              {section.eyebrow ?? 'Pre-cadastro'}
            </div>

            <div className="space-y-5">
              <h2 className="max-w-xl font-[family:var(--font-sans)] text-[2.4rem] font-semibold leading-[0.96] tracking-[-0.06em] text-white md:text-[3.6rem]">
                {keepBossLedgerTogether(section.title)}
              </h2>
              {section.subtitle ? (
                <p className="text-[0.74rem] uppercase tracking-[0.34em] text-[#e1c58f]/90 md:text-[0.8rem]">
                  {keepBossLedgerTogether(section.subtitle)}
                </p>
              ) : null}
              <p className="max-w-xl text-[0.98rem] leading-8 text-white/64 md:text-[1.04rem]">
                {keepBossLedgerTogether(section.description)}
              </p>
            </div>

            <div className="soft-glass-pill relative inline-flex w-fit max-w-full items-center gap-3 rounded-full px-5 py-3 text-left">
              <span className="text-[0.58rem] uppercase tracking-[0.26em] text-white/42">Assunto fixo</span>
              <span className="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-white/82">{section.subject}</span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <iframe
              title="Solicitar convite Boss Ledger"
              src={WIX_INVITE_FORM_URL}
              className="block h-[1180px] w-full overflow-hidden rounded-[1.35rem] border-0 bg-white md:h-[1100px] lg:h-[1120px]"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              scrolling="no"
            />
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mx-auto mt-10 max-w-4xl">
          <p className="text-center text-[0.95rem] leading-8 text-white/56 md:text-[1rem]">
            {keepBossLedgerTogether(section.bottomText)}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
