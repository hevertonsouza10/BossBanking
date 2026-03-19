'use client';

import Container from '@/components/site/ui/Container';
import Reveal from '@/components/site/ui/Reveal';
import SectionHeading from '@/components/site/ui/SectionHeading';
import type { BenefitsGridSection as BenefitsGridSectionType } from '@/lib/cms/types';

export default function BenefitsGridSection({ section }: { section: BenefitsGridSectionType }) {
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
          {section.items.map((item, index) => (
            <Reveal key={item.title} delay={0.1 * index}>
              <article className="minimal-glass-card h-full rounded-[1.75rem] p-7 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] uppercase tracking-[0.36em] text-[#ddb25f]">{item.kicker}</p>
                  <span className="text-[10px] tracking-[0.28em] text-white/28">
                    0{index + 1}
                  </span>
                </div>
                <div className="minimal-glass-separator mt-6" />
                <h3 className="mt-6 max-w-[12ch] text-[1.5rem] font-light leading-[1.12] text-white md:text-[1.7rem]">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[34ch] text-sm leading-7 text-white/54">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
