import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/site/ui/Container';
import Reveal from '@/components/site/ui/Reveal';
import { compliancePolicies } from '@/lib/compliance/policies';

export const metadata: Metadata = {
  title: 'Compliance',
  description:
    'Central institucional de compliance da Boss Ledger com políticas de privacidade, segurança, governança e anticorrupção.',
};

export default function CompliancePage() {
  return (
    <main className="relative overflow-hidden bg-[#050505] pt-[100px] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,77,0.12),transparent_24%),linear-gradient(180deg,#090909_0%,#040404_100%)]" />

      <Container className="relative py-10 md:py-14 lg:py-20">
        <Reveal>
          <section className="luxury-panel-subtle rounded-[2rem] px-6 py-14 md:px-10 md:py-16 lg:px-14 lg:py-20">
            <div className="relative max-w-4xl space-y-6">
              <span className="inline-flex rounded-full border border-[rgba(230,194,122,0.18)] bg-[rgba(201,162,77,0.08)] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#e6c27a]">
                Central institucional
              </span>
              <h1
                className="hero-title text-4xl font-semibold tracking-[-0.05em] text-[#f7f3ea] sm:text-5xl lg:text-6xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Compliance
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-white/76 md:text-[1.24rem] md:leading-9">
                Transparência, segurança e governança
              </p>
              <p className="max-w-3xl text-base leading-8 text-white/58 md:text-lg">
                A Boss Ledger segue rigorosamente práticas de conformidade para garantir integridade, proteção de
                dados e segurança nas operações.
              </p>
            </div>
          </section>
        </Reveal>

        <section className="py-20 lg:py-24">
          <Reveal className="mb-10 space-y-4 lg:mb-12">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
              Políticas e documentos
            </span>
            <h2
              className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Acesse os principais documentos legais e institucionais da Boss Ledger.
            </h2>
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-2">
            {compliancePolicies.map((policy, index) => (
              <Reveal key={policy.slug} delay={0.04 * index}>
                <Link
                  href={`/compliance/${policy.slug}`}
                  className="luxury-panel-subtle group block rounded-[1.5rem] p-7 transition duration-300 hover:-translate-y-1 hover:border-[rgba(230,194,122,0.18)] hover:shadow-[0_24px_52px_rgba(0,0,0,0.28)]"
                >
                  <div className="flex h-full flex-col gap-5">
                    <div className="space-y-3">
                      <h3
                        className="text-2xl font-semibold tracking-[-0.03em] text-[#f7f3ea]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {policy.title}
                      </h3>
                      <p className="text-sm leading-7 text-white/60 md:text-base">{policy.description}</p>
                    </div>
                    <div className="mt-auto inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#ddb25f]">
                      <span>Acessar documento</span>
                      <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal>
          <section className="cta-luxury-shell rounded-[2rem] p-[1px]">
            <div className="cta-luxury-panel rounded-[2rem] px-6 py-12 md:px-10 md:py-14 lg:px-14 lg:py-16">
              <div className="space-y-5">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
                  Governança institucional
                </span>
                <h2
                  className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Confiança se constrói com transparência, critérios claros e responsabilidade nas operações.
                </h2>
                <p className="max-w-3xl text-base leading-8 text-white/66 md:text-lg">
                  Nossa estrutura de compliance reforça o compromisso com segurança, proteção de informações e
                  governança institucional em todas as frentes de relacionamento.
                </p>
              </div>
            </div>
          </section>
        </Reveal>
      </Container>
    </main>
  );
}
