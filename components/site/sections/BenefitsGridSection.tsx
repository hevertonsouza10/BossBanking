'use client';

import Container from '@/components/site/ui/Container';
import Reveal from '@/components/site/ui/Reveal';
import SectionHeading from '@/components/site/ui/SectionHeading';
import type { BenefitsGridSection as BenefitsGridSectionType } from '@/lib/cms/types';

export default function BenefitsGridSection({ section }: { section: BenefitsGridSectionType }) {
  const useGoldDividers = section.id === 'home-benefits';
  const useCenteredCardContent = section.id === 'home-benefits';

  return (
    <section className="py-24 md:py-32" data-scroll-scene="true">
      <Container className="space-y-12">
        <Reveal className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            align="center"
            className="max-w-3xl"
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {section.items.map((item, index) => {
            const bulletLines = item.description
              .split('\n')
              .map((line) => line.trim())
              .filter(Boolean);
            const hasBulletList = bulletLines.every((line) => line.startsWith('•'));

            return (
              <Reveal key={item.title} delay={0.1 * index}>
                <article
                  className={`minimal-glass-card h-full rounded-[1.75rem] p-7 md:p-8 ${useCenteredCardContent ? 'flex flex-col items-center text-center' : ''}`}
                >
                  {item.kicker ? (
                    <div className={`flex items-center gap-4 ${useCenteredCardContent ? 'justify-center' : ''}`}>
                      <p className="text-[12px] uppercase tracking-[0.36em] text-[#ddb25f]">{item.kicker}</p>
                    </div>
                  ) : null}
                  <div
                    className={
                      useGoldDividers
                        ? 'mt-6 h-px w-full bg-[linear-gradient(90deg,rgba(221,178,95,0),rgba(221,178,95,0.42),rgba(221,178,95,0))]'
                        : 'minimal-glass-separator mt-6'
                    }
                  />
                  <h3
                    className={`mt-6 text-[1.35rem] font-light leading-[1.14] text-white md:text-[1.55rem] ${useCenteredCardContent ? 'max-w-[18ch] text-center' : 'max-w-[18ch]'}`}
                  >
                    {item.title}
                  </h3>
                  {hasBulletList ? (
                    <div className={`mt-5 w-full ${useCenteredCardContent ? 'text-center' : ''}`}>
                      {bulletLines.map((line, lineIndex) => (
                        <div
                          key={line}
                          className={
                            lineIndex === 0
                              ? `py-3 text-[0.98rem] ${useCenteredCardContent ? 'leading-6' : 'leading-8'} text-white/68`
                              : `${useGoldDividers ? 'border-t border-[rgba(221,178,95,0.24)]' : 'border-t border-white/8'} py-3 text-[0.98rem] ${useCenteredCardContent ? 'leading-6' : 'leading-8'} text-white/68`
                          }
                        >
                          {line.replace(/^•\s*/, '')}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p
                      className={`mt-4 max-w-none whitespace-pre-line text-[0.98rem] ${useCenteredCardContent ? 'leading-6 text-center' : 'leading-8'} text-white/68`}
                    >
                      {item.description}
                    </p>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
