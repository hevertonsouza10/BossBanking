import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Globe2,
  Landmark,
  ShieldAlert,
} from 'lucide-react';
import Container from '@/components/site/ui/Container';
import Reveal from '@/components/site/ui/Reveal';

const problemItems = [
  {
    title: 'Tributação elevada',
    description: 'Estruturas mal desenhadas tendem a ampliar custo fiscal e reduzir eficiência no longo prazo.',
    icon: Landmark,
  },
  {
    title: 'Riscos jurídicos',
    description: 'Falta de desenho societário, governança e alinhamento documental pode gerar vulnerabilidades.',
    icon: ShieldAlert,
  },
  {
    title: 'Desorganização patrimonial',
    description: 'Mistura entre pessoa física, operação e patrimônio dificulta leitura, controle e sucessão.',
    icon: AlertTriangle,
  },
  {
    title: 'Exposição a riscos locais',
    description: 'Concentrar tudo na mesma jurisdição aumenta dependência de um único ambiente econômico e regulatório.',
    icon: Globe2,
  },
];

const solutionPoints = [
  'Mais clareza sobre patrimônio, participações e fluxo financeiro',
  'Melhor leitura de risco para decisões societárias e patrimoniais',
  'Eficiência tributária com racionalidade técnica e desenho coerente',
  'Base mais sólida para sucessão, proteção e expansão de ativos',
];

const structureBlocks = [
  {
    eyebrow: 'Holdings',
    title: 'Estruturas para organizar patrimônio, participações e sucessão.',
    description:
      'A holding ajuda a separar riscos, consolidar ativos e dar previsibilidade para governança, planejamento sucessório e eficiência na leitura patrimonial.',
    benefits: [
      'Separação mais clara entre patrimônio pessoal e atividade operacional',
      'Mais controle sobre participações societárias e distribuição de resultados',
      'Base jurídica mais organizada para sucessão e continuidade',
      'Estrutura com leitura mais profissional para crescimento e proteção',
    ],
  },
  {
    eyebrow: 'Offshores',
    title: 'Estruturas internacionais com critério, governança e visão integrada.',
    description:
      'Offshores bem estruturadas podem apoiar proteção patrimonial, diversificação jurisdicional e uma estratégia internacional mais organizada.',
    benefits: [
      'Diversificação de exposição para além do ambiente local',
      'Melhor organização de ativos e investimentos internacionais',
      'Mais previsibilidade para planejamento patrimonial global',
      'Estrutura com governança para decisões e acompanhamento de longo prazo',
    ],
  },
];

const proofItems = [
  {
    title: 'Leitura mais eficiente',
    description: 'Estruturas bem desenhadas tornam a operação mais compreensível e melhoram a tomada de decisão.',
  },
  {
    title: 'Execução com critério',
    description: 'Não se trata de empilhar entidades, mas de construir uma estrutura aderente ao contexto real do cliente.',
  },
  {
    title: 'Base para continuidade',
    description: 'Quando a estrutura faz sentido na prática, ela sustenta patrimônio, governança e próximos movimentos.',
  },
];

const advisorySteps = [
  'Diagnóstico patrimonial, societário e operacional',
  'Leitura de riscos, gargalos e oportunidades de estruturação',
  'Desenho estratégico com holdings, offshores e arquitetura complementar',
  'Acompanhamento consultivo com profundidade técnica e visão executiva',
];

export const metadata: Metadata = {
  title: 'Operações estruturadas',
  description:
    'Operações estruturadas com profundidade técnica e leitura estratégica para holdings, offshores e organização patrimonial.',
};

export default function OperacoesEstruturadasPage() {
  return (
    <main className="relative overflow-hidden bg-[#050505] pt-[100px] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,77,0.14),transparent_22%),radial-gradient(circle_at_84%_16%,rgba(255,255,255,0.04),transparent_14%),linear-gradient(180deg,#090909_0%,#040404_100%)]" />
      <div className="noise-overlay absolute inset-0 opacity-[0.16]" />
      <div className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,77,0.18),transparent_70%)] blur-3xl" />

      <Container className="relative py-10 md:py-14 lg:py-20">
        <Reveal>
          <section className="relative overflow-hidden rounded-[2.2rem] border border-white/[0.05] bg-[linear-gradient(180deg,rgba(18,18,20,0.9),rgba(7,7,8,0.78))] px-6 py-16 shadow-[0_32px_100px_rgba(0,0,0,0.38)] md:px-10 md:py-20 lg:px-16 lg:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,194,122,0.12),transparent_28%)]" />
            <div className="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(230,194,122,0.5),transparent)]" />

            <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
              <div className="space-y-7">
                <span className="inline-flex rounded-full border border-[rgba(230,194,122,0.18)] bg-[rgba(201,162,77,0.08)] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#e6c27a]">
                  Operações estruturadas
                </span>

                <div className="space-y-5">
                  <h1
                    className="hero-title max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-[#f7f3ea] sm:text-5xl lg:text-7xl"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Operações estruturadas com profundidade técnica e leitura estratégica
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-white/74 md:text-[1.24rem] md:leading-9">
                    Estruturamos holdings e offshores com critério técnico, visão patrimonial e foco em eficiência real.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/contato" className="lux-button lux-button-gold min-h-[3.35rem] px-7 py-4 text-[0.66rem] tracking-[0.24em]">
                    <span>Falar com especialista</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/consultoria-boss" className="lux-button lux-button-dark min-h-[3.35rem] px-7 py-4 text-[0.66rem] tracking-[0.2em]">
                    Conhecer assessoria Boss
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {['Visão patrimonial', 'Eficiência fiscal', 'Governança', 'Proteção'].map((item) => (
                  <div
                    key={item}
                    className="minimal-glass-card rounded-[1.45rem] px-5 py-5 text-sm uppercase tracking-[0.22em] text-white/72 before:opacity-[0.22] after:opacity-[0.26]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <section className="py-20 md:py-24 lg:py-28">
          <Reveal className="max-w-3xl space-y-4">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
              Problema
            </span>
            <h2
              className="text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Quando a estrutura está errada, o patrimônio paga a conta.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-white/58 md:text-lg">
              Muitas operações chegam ao limite não por falta de ativo, mas por falta de desenho. Os sintomas mais comuns
              aparecem aqui.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {problemItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={0.06 * index}>
                  <article className="group relative h-full overflow-hidden rounded-[1.8rem] border border-white/[0.05] bg-[linear-gradient(180deg,rgba(18,18,20,0.86),rgba(8,8,9,0.72))] p-7 transition duration-300 hover:-translate-y-1 hover:border-[rgba(230,194,122,0.16)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,194,122,0.08),transparent_32%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                    <div className="relative space-y-5">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-[1rem] border border-[rgba(230,194,122,0.18)] bg-[rgba(201,162,77,0.08)] text-[#ddb25f]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="space-y-3">
                        <h3
                          className="text-2xl font-semibold tracking-[-0.03em] text-[#f7f3ea]"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-sm leading-7 text-white/60 md:text-base">{item.description}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="grid gap-8 py-6 lg:grid-cols-[0.94fr_1.06fr] lg:gap-14 lg:py-10">
          <Reveal className="space-y-4">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
              Solução
            </span>
            <h2
              className="text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Estruturar bem significa transformar complexidade em clareza.
            </h2>
            <p className="max-w-xl text-base leading-8 text-white/58 md:text-lg">
              Uma estrutura adequada melhora a leitura do patrimônio, reduz ruído decisório e cria base concreta para
              crescimento, proteção e sucessão.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {solutionPoints.map((item, index) => (
              <Reveal key={item} delay={0.05 * index}>
                <div className="minimal-glass-card flex h-full gap-4 rounded-[1.55rem] px-6 py-6 before:opacity-[0.22] after:opacity-[0.28]">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(230,194,122,0.22)] bg-[rgba(201,162,77,0.08)] text-[#ddb25f]">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-base leading-7 text-white/78 md:text-[1.02rem]">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="py-20 md:py-24 lg:py-28">
          <Reveal className="max-w-3xl space-y-4">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
              Estruturas principais
            </span>
            <h2
              className="text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Holdings e offshores como blocos centrais de uma arquitetura patrimonial mais inteligente.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            {structureBlocks.map((block, index) => (
              <Reveal key={block.eyebrow} delay={0.08 * index}>
                <article className="luxury-panel-subtle rounded-[2rem] px-6 py-8 md:px-8 md:py-9">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#ddb25f]">
                        {block.eyebrow}
                      </span>
                      <h3
                        className="max-w-[18ch] text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {block.title}
                      </h3>
                      <p className="max-w-2xl text-base leading-8 text-white/62 md:text-lg">{block.description}</p>
                    </div>

                    <div className="grid gap-3">
                      {block.benefits.map((benefit) => (
                        <div
                          key={benefit}
                          className="flex items-start gap-3 rounded-[1.2rem] border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] px-4 py-4"
                        >
                          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(230,194,122,0.2)] bg-[rgba(201,162,77,0.08)] text-[#ddb25f]">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <p className="text-sm leading-7 text-white/72 md:text-[0.98rem]">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:py-10">
          <Reveal className="space-y-4">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
              Prova
            </span>
            <h2
              className="text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Eficiência real nasce de estrutura bem pensada, não de improviso.
            </h2>
            <p className="max-w-xl text-base leading-8 text-white/58 md:text-lg">
              O ganho de uma operação estruturada aparece no mundo real: mais controle, menos atrito e mais consistência
              para executar movimentos patrimoniais com segurança.
            </p>
          </Reveal>

          <div className="grid gap-4">
            {proofItems.map((item, index) => (
              <Reveal key={item.title} delay={0.05 * index}>
                <div className="minimal-glass-card rounded-[1.6rem] px-6 py-6 before:opacity-[0.22] after:opacity-[0.28]">
                  <div className="space-y-2">
                    <p
                      className="text-2xl font-semibold tracking-[-0.03em] text-[#f7f3ea]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {item.title}
                    </p>
                    <p className="text-sm leading-7 text-white/62 md:text-base">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="py-20 md:py-24 lg:py-28">
          <Reveal>
            <div className="cta-luxury-shell rounded-[2rem] p-[1px]">
              <div className="cta-luxury-panel rounded-[2rem] px-6 py-12 md:px-10 md:py-14 lg:px-16 lg:py-16">
                <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
                  <div className="space-y-5">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
                      Assessoria Boss Ledger
                    </span>
                    <h2
                      className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      A estruturação ganha força quando está conectada a uma assessoria que entende execução.
                    </h2>
                    <p className="max-w-2xl text-base leading-8 text-white/64 md:text-lg">
                      A Boss Ledger conecta leitura estratégica, profundidade técnica e acompanhamento consultivo para
                      transformar holdings e offshores em decisões bem construídas, e não apenas em estruturas no papel.
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {advisorySteps.map((step) => (
                      <div
                        key={step}
                        className="flex items-start gap-3 rounded-[1.2rem] border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] px-4 py-4"
                      >
                        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(230,194,122,0.2)] bg-[rgba(201,162,77,0.08)] text-[#ddb25f]">
                          <BriefcaseBusiness className="h-4 w-4" />
                        </span>
                        <p className="text-sm leading-7 text-white/74 md:text-[0.98rem]">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <Reveal>
          <section className="relative overflow-hidden rounded-[2rem] border border-[rgba(230,194,122,0.12)] bg-[linear-gradient(180deg,rgba(15,15,17,0.92),rgba(7,7,8,0.84))] px-6 py-12 shadow-[0_26px_70px_rgba(0,0,0,0.32)] md:px-10 md:py-14 lg:px-16 lg:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,194,122,0.1),transparent_28%)]" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
                  Próximo passo
                </span>
                <h2
                  className="text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Fale com um especialista e avalie a estrutura mais coerente para o seu patrimônio.
                </h2>
                <p className="max-w-2xl text-base leading-8 text-white/62 md:text-lg">
                  Se a sua operação pede holdings, offshores ou uma reorganização mais técnica, podemos iniciar pela
                  leitura do contexto e dos objetivos.
                </p>
              </div>

              <Link href="/contato" className="lux-button lux-button-gold min-h-[3.4rem] w-full justify-center px-7 py-4 text-[0.66rem] tracking-[0.24em] sm:w-auto">
                <span>Falar com especialista</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </Reveal>
      </Container>
    </main>
  );
}
