import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, Check, Globe2, ShieldCheck } from 'lucide-react';
import Reveal from '@/components/site/ui/Reveal';
import Container from '@/components/site/ui/Container';

const pillars = [
  {
    title: 'Operações estruturadas',
    description:
      'Desenhamos soluções para capital, reorganização financeira e alavancagem com critério técnico, clareza de risco e execução orientada a resultado.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Offshores',
    description:
      'Apoiamos estruturas internacionais voltadas à proteção patrimonial, eficiência e planejamento de ativos com visão integrada e governança.',
    icon: Globe2,
  },
  {
    title: 'Holdings',
    description:
      'Estruturamos holdings para organizar participações, sucessão e blindagem patrimonial com racionalidade jurídica e financeira.',
    icon: ShieldCheck,
  },
];

const benefits = ['Organização', 'Eficiência', 'Redução de risco', 'Visão estratégica'];

export const metadata: Metadata = {
  title: 'Operações estruturadas',
  description:
    'Estruturação financeira estratégica para empresas e investidores com foco em organização patrimonial, eficiência e visão de longo prazo.',
};

export default function AssessoriaBossPage() {
  return (
    <main className="relative overflow-hidden bg-[#050505] pt-[100px] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,77,0.14),transparent_26%),radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.06),transparent_16%),linear-gradient(180deg,#090909_0%,#040404_100%)]" />
      <div className="noise-overlay absolute inset-0 opacity-[0.18]" />
      <div className="absolute left-1/2 top-28 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,77,0.2),transparent_68%)] blur-3xl" />

      <Container className="relative py-10 md:py-14 lg:py-20">
        <Reveal>
          <section className="relative overflow-hidden rounded-[2rem] border border-white/[0.045] bg-[linear-gradient(180deg,rgba(18,18,20,0.86),rgba(7,7,8,0.72))] px-6 py-14 shadow-[0_30px_90px_rgba(0,0,0,0.35)] md:px-10 md:py-[4.5rem] lg:px-16 lg:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,194,122,0.12),transparent_28%)]" />
            <div className="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(230,194,122,0.5),transparent)]" />
            <div className="relative max-w-4xl space-y-8">
              <span className="inline-flex rounded-full border border-[rgba(230,194,122,0.18)] bg-[rgba(201,162,77,0.08)] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#e6c27a]">
                Operações estruturadas
              </span>
              <div className="space-y-5">
                <h1
                  className="hero-title max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-[#f7f3ea] sm:text-5xl lg:text-7xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Operações estruturadas
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-white/76 md:text-[1.35rem] md:leading-9">
                  Estruturação financeira estratégica para empresas e investidores
                </p>
                <p className="max-w-2xl text-base leading-8 text-white/58 md:text-lg">
                  Desenvolvemos soluções personalizadas para organizar, proteger e potencializar seus ativos com
                  eficiência e previsibilidade.
                </p>
              </div>

              <div className="grid gap-4 pt-4 md:grid-cols-[minmax(0,1fr)_20rem] md:items-end">
                <div className="grid gap-4 sm:grid-cols-3">
                  {['Estrutura', 'Protecao', 'Crescimento'].map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.4rem] border border-white/[0.045] bg-white/[0.03] px-5 py-5 text-sm uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <Link href="/contato" className="lux-button lux-button-gold min-h-[3.4rem] w-full justify-center px-7 py-4 text-[0.66rem] tracking-[0.24em] md:justify-self-end">
                  <span>Falar com especialista</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </Reveal>

        <section className="grid gap-8 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-28">
          <Reveal className="space-y-6">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
              Estruturação clara
            </span>
            <h2
              className="max-w-xl text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Operações estruturadas com profundidade técnica e leitura estratégica.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="minimal-glass-card rounded-[1.75rem] border-white/[0.045] p-8 before:opacity-[0.24] after:opacity-[0.28] md:p-10">
              <p className="text-base leading-8 text-white/70 md:text-lg">
                A frente de Operações estruturadas atende empresas e investidores que precisam tomar decisões com mais estrutura,
                governança e critério. Nosso trabalho conecta planejamento patrimonial, modelagem financeira e
                execução orientada ao contexto de cada cliente, sempre com foco em preservação, eficiência e
                sustentabilidade de longo prazo.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="space-y-10 py-6 lg:space-y-14 lg:py-10">
          <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
              Três pilares
              </span>
              <h2
                className="text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
              Frentes essenciais para estruturar patrimônio e decisão financeira.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/52 md:text-base">
              Cada frente atua de forma complementar para ampliar controle, proteger ativos e sustentar crescimento
              com mais previsibilidade.
            </p>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;

              return (
                <Reveal key={pillar.title} delay={0.06 * index}>
                  <article className="group relative h-full overflow-hidden rounded-[1.8rem] border border-white/[0.045] bg-[linear-gradient(180deg,rgba(18,18,20,0.88),rgba(8,8,9,0.7))] p-7 transition duration-300 hover:-translate-y-1 hover:border-[rgba(230,194,122,0.16)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,194,122,0.1),transparent_30%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                    <div className="relative space-y-6">
                      <span className="inline-flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-[1rem] border border-[rgba(230,194,122,0.18)] bg-[rgba(201,162,77,0.08)] text-[#ddb25f]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="space-y-3">
                        <h3
                          className="text-2xl font-semibold tracking-[-0.03em] text-[#f7f3ea]"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {pillar.title}
                        </h3>
                        <p className="text-sm leading-7 text-white/60 md:text-base">{pillar.description}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="grid gap-8 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:py-28">
          <Reveal className="space-y-4">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
              Benefícios
            </span>
            <h2
              className="text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Mais ordem para o presente. Mais visão para o próximo passo.
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit} delay={0.05 * index}>
                <div className="minimal-glass-card flex h-full items-center gap-4 rounded-[1.5rem] border-white/[0.045] px-6 py-6 before:opacity-[0.24] after:opacity-[0.28]">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(230,194,122,0.22)] bg-[rgba(201,162,77,0.08)] text-[#ddb25f]">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-lg font-medium tracking-[-0.02em] text-white/84">{benefit}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal>
          <section className="cta-luxury-shell rounded-[2rem] bg-[linear-gradient(135deg,rgba(255,236,196,0.14),rgba(255,255,255,0.035)_28%,rgba(255,255,255,0.01)_54%,rgba(255,236,196,0.08)_100%)] p-[1px] shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
            <div className="cta-luxury-panel rounded-[2rem] border-white/[0.045] px-6 py-12 before:border-white/[0.025] after:opacity-[0.42] md:px-10 md:py-14 lg:px-16 lg:py-16">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                <div className="space-y-5">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
                    Diferencial Boss
                  </span>
                  <h2
                    className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Abordagem personalizada para realidades patrimoniais que pedem decisão sob medida.
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-base leading-8 text-white/66 md:text-lg">
                    Não trabalhamos com estruturas padronizadas. Cada recomendação parte de uma leitura individual do
                    momento, dos objetivos e da complexidade patrimonial do cliente para construir um desenho coerente,
                    sofisticado e viável.
                  </p>
                  <Link href="/contato" className="lux-button lux-button-gold min-h-[3.35rem] px-7 py-4 text-[0.66rem] tracking-[0.24em]">
                    <span>Falar com especialista</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </Container>
    </main>
  );
}
