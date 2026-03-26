import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/site/ui/Reveal';
import Container from '@/components/site/ui/Container';

type GoldIconProps = {
  className?: string;
};

type GoldIconFrameProps = GoldIconProps & {
  gradientId: string;
  viewBox?: string;
  children: (fill: string) => React.ReactNode;
};

function GoldIconFrame({
  className,
  gradientId,
  viewBox = '0 0 24 24',
  children,
}: GoldIconFrameProps) {
  const fill = `url(#${gradientId}-fill)`;

  return (
    <svg
      viewBox={viewBox}
      width="24"
      height="24"
      className={className}
      aria-hidden="true"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`${gradientId}-fill`} x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f7e49f" />
          <stop offset="0.48" stopColor="#ddb25f" />
          <stop offset="1" stopColor="#b8862e" />
        </linearGradient>
        <filter id={`${gradientId}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.25" stdDeviation="1.4" floodColor="#000000" floodOpacity="0.28" />
        </filter>
      </defs>
      <g filter={`url(#${gradientId}-shadow)`}>{children(fill)}</g>
    </svg>
  );
}

function CashFlowGoldIcon({ className }: GoldIconProps) {
  return (
    <GoldIconFrame className={className} gradientId="consultoria-cashflow">
      {(fill) => (
        <>
          <path
            d="M7.2 4h9.45c1.15 0 2.02.96 1.82 2.09L18.35 7H8.05c-1.41 0-2.55 1.13-2.55 2.53V6.7C5.5 5.2 6.17 4 7.2 4Z"
            fill={fill}
          />
          <rect x="4" y="7" width="16.75" height="11" rx="2.7" fill={fill} />
          <path d="M14.4 10.1H20v4.8h-5.6a2.4 2.4 0 1 1 0-4.8Z" fill="#0b0b0c" opacity="0.58" />
          <circle cx="16.2" cy="12.5" r="0.92" fill={fill} />
        </>
      )}
    </GoldIconFrame>
  );
}

function CostsGoldIcon({ className }: GoldIconProps) {
  return (
    <GoldIconFrame className={className} gradientId="consultoria-costs">
      {(fill) => (
        <>
          <circle cx="12" cy="12" r="8.65" fill={fill} />
          <path
            d="M12.05 7.15c-1.7 0-2.97.96-2.97 2.32 0 1.28.94 1.96 2.7 2.26l.48.08c1.08.18 1.48.42 1.48.96 0 .63-.62 1.05-1.55 1.05-.98 0-1.72-.42-2.17-1.2l-1.58.91c.62 1.24 1.8 1.97 3.27 2.11v1.12h1.56v-1.15c1.83-.22 3.03-1.24 3.03-2.71 0-1.38-.96-2.06-2.87-2.38l-.5-.08c-.95-.16-1.3-.37-1.3-.84 0-.56.54-.94 1.35-.94.82 0 1.44.33 1.82.95l1.54-.89c-.55-1.1-1.57-1.76-2.87-1.96V6.6h-1.56v.6Z"
            fill="#0b0b0c"
            opacity="0.86"
          />
        </>
      )}
    </GoldIconFrame>
  );
}

function RevenueGoldIcon({ className }: GoldIconProps) {
  return (
    <GoldIconFrame className={className} gradientId="consultoria-revenue">
      {(fill) => (
        <>
          <path d="M5.2 18.4h13.6c.66 0 1.2.54 1.2 1.2v.2H4v-.2c0-.66.54-1.2 1.2-1.2Z" fill={fill} />
          <rect x="5.2" y="11.4" width="2.75" height="6.2" rx="1.1" fill={fill} />
          <rect x="10.65" y="7.8" width="2.75" height="9.8" rx="1.1" fill={fill} />
          <rect x="16.1" y="5" width="2.75" height="12.6" rx="1.1" fill={fill} />
          <path d="M5.6 9.35 9.4 6.4l2.78 1.74 5.1-4.02 1.13 1.43-6.05 4.78-2.83-1.78-2.83 2.2Z" fill="#0b0b0c" opacity="0.82" />
        </>
      )}
    </GoldIconFrame>
  );
}

function ProcessGoldIcon({ className }: GoldIconProps) {
  return (
    <GoldIconFrame className={className} gradientId="consultoria-process">
      {(fill) => (
        <>
          <rect x="3.7" y="5" width="6.1" height="4.6" rx="1.35" fill={fill} />
          <rect x="14.2" y="5" width="6.1" height="4.6" rx="1.35" fill={fill} />
          <rect x="8.95" y="14.4" width="6.1" height="4.6" rx="1.35" fill={fill} />
          <path d="M12 9.6v2.9" stroke="#0b0b0c" strokeWidth="1.8" strokeLinecap="round" opacity="0.84" />
          <path d="M6.75 9.65v1.1c0 .72.58 1.3 1.3 1.3H12" stroke="#0b0b0c" strokeWidth="1.8" strokeLinecap="round" opacity="0.84" />
          <path d="M17.25 9.65v1.1c0 .72-.58 1.3-1.3 1.3H12" stroke="#0b0b0c" strokeWidth="1.8" strokeLinecap="round" opacity="0.84" />
        </>
      )}
    </GoldIconFrame>
  );
}

function IndicatorsGoldIcon({ className }: GoldIconProps) {
  return (
    <GoldIconFrame className={className} gradientId="consultoria-indicators">
      {(fill) => (
        <>
          <path
            d="M12 4.05c-4.56 0-8.26 3.7-8.26 8.26 0 1.58.45 3.04 1.23 4.28h2.1a6.55 6.55 0 1 1 9.86 0h2.1a8.2 8.2 0 0 0 1.23-4.28c0-4.56-3.7-8.26-8.26-8.26Z"
            fill={fill}
          />
          <rect x="7.05" y="17.15" width="9.9" height="2.65" rx="1.2" fill={fill} />
          <path d="m12 12.3 4.45-3.2" stroke="#0b0b0c" strokeWidth="2" strokeLinecap="round" opacity="0.86" />
          <circle cx="12" cy="12.3" r="1.35" fill="#0b0b0c" opacity="0.88" />
        </>
      )}
    </GoldIconFrame>
  );
}

function CheckGoldIcon({ className }: GoldIconProps) {
  return (
    <GoldIconFrame className={className} gradientId="consultoria-check">
      {(fill) => (
        <>
          <circle cx="12" cy="12" r="8.8" fill={fill} />
          <path
            d="m8.3 12.15 2.34 2.42 5.06-5.3"
            stroke="#0b0b0c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </>
      )}
    </GoldIconFrame>
  );
}

function ArrowGoldIcon({ className }: GoldIconProps) {
  return (
    <GoldIconFrame className={className} gradientId="consultoria-arrow">
      {(fill) => (
        <>
          <circle cx="12" cy="12" r="8.8" fill="rgba(11,11,12,0.16)" />
          <path d="M8.3 12h6.2" stroke={fill} strokeWidth="2" strokeLinecap="round" />
          <path d="m12 8.35 3.7 3.65L12 15.65" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </GoldIconFrame>
  );
}

const analysisAreas = [
  {
    title: 'Fluxo de caixa',
    description: 'Leitura das entradas, saídas, recorrência e capacidade de previsão financeira.',
    icon: CashFlowGoldIcon,
  },
  {
    title: 'Custos operacionais',
    description: 'Mapeamento de excessos, gargalos e estruturas que comprometem margem e eficiência.',
    icon: CostsGoldIcon,
  },
  {
    title: 'Receitas',
    description: 'Análise de composição, consistência e oportunidades de melhor aproveitamento financeiro.',
    icon: RevenueGoldIcon,
  },
  {
    title: 'Processos financeiros',
    description: 'Revisão dos fluxos internos para aumentar controle, padronização e agilidade.',
    icon: ProcessGoldIcon,
  },
  {
    title: 'Indicadores',
    description: 'Definição e leitura dos dados que apoiam decisões com mais clareza e confiança.',
    icon: IndicatorsGoldIcon,
  },
];

const results = [
  'Controle financeiro',
  'Redução de desperdícios',
  'Organização',
  'Decisões estratégicas',
  'Crescimento',
];

export const metadata: Metadata = {
  title: 'Consultoria financeira',
  description:
    'Consultoria financeira focada em analisar dados para reduzir ineficiências, melhorar decisões e otimizar a performance da empresa.',
};

export default function ConsultoriaFinanceiraPage() {
  return (
    <main className="relative overflow-hidden bg-[#050505] pt-[100px] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,77,0.11),transparent_24%),radial-gradient(circle_at_88%_18%,rgba(255,255,255,0.04),transparent_14%),linear-gradient(180deg,#090909_0%,#040404_100%)]" />

      <Container className="relative py-10 md:py-14 lg:py-20">
        <Reveal>
          <section className="luxury-panel-subtle rounded-[2rem] px-6 py-14 md:px-10 md:py-16 lg:px-14 lg:py-20">
            <div className="relative max-w-4xl space-y-6">
              <span className="inline-flex rounded-full border border-[rgba(230,194,122,0.18)] bg-[rgba(201,162,77,0.08)] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#e6c27a]">
                Otimização financeira
              </span>
              <h1
                className="hero-title text-4xl font-semibold tracking-[-0.05em] text-[#f7f3ea] sm:text-5xl lg:text-6xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Consultoria financeira
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-white/76 md:text-[1.24rem] md:leading-9">
                O que podemos fazer com seus dados para otimizar sua empresa
              </p>
              <p className="max-w-3xl text-base leading-8 text-white/58 md:text-lg">
                Analisamos dados financeiros para identificar ineficiências, reduzir custos e melhorar a tomada de
                decisão. Com uma leitura clara da operação, transformamos números em direcionamentos mais consistentes
                para performance, organização e crescimento.
              </p>
            </div>
          </section>
        </Reveal>

        <section className="py-20 lg:py-24">
          <Reveal className="mx-auto max-w-3xl space-y-4 text-center">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
              Análise de dados
            </span>
            <h2
              className="text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Onde olhamos para encontrar oportunidades reais de otimização.
            </h2>
          </Reveal>

          <Reveal delay={0.05} className="mt-12 lg:mt-14">
            <section className="luxury-panel-subtle rounded-[2rem] px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
              <div className="mb-8 flex justify-center">
                <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(201,162,77,0.14)] bg-[rgba(201,162,77,0.06)] px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#ddb25f]">
                  <span className="h-2 w-2 rounded-full bg-[#ddb25f]" />
                  Mapa de análise
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
                <div className="space-y-4">
                  {analysisAreas.slice(0, 3).map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="rounded-[1.4rem] border border-[rgba(201,162,77,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] px-5 py-5"
                      >
                        <div className="flex items-start gap-4">
                          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.95rem] border border-[rgba(201,162,77,0.14)] bg-[rgba(201,162,77,0.07)] text-[#ddb25f]">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="space-y-2">
                            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#ddb25f]/80">
                              Ponto {index + 1}
                            </p>
                            <h3
                              className="text-[1.18rem] font-semibold tracking-[-0.03em] text-[#f7f3ea]"
                              style={{ fontFamily: 'var(--font-display)' }}
                            >
                              {item.title}
                            </h3>
                            <p className="text-sm leading-7 text-white/60 md:text-[0.98rem]">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="hidden lg:flex lg:w-[4.5rem] lg:flex-col lg:items-center">
                  <div className="h-8 w-px bg-[linear-gradient(180deg,rgba(201,162,77,0),rgba(201,162,77,0.22))]" />
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(201,162,77,0.16)] bg-[radial-gradient(circle,rgba(201,162,77,0.16),rgba(201,162,77,0.04)_62%,transparent_70%)]">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#ddb25f]" />
                  </div>
                  <div className="h-full w-px bg-[linear-gradient(180deg,rgba(201,162,77,0.22),rgba(201,162,77,0.08),rgba(201,162,77,0.22))]" />
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(201,162,77,0.16)] bg-[radial-gradient(circle,rgba(201,162,77,0.16),rgba(201,162,77,0.04)_62%,transparent_70%)]">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#ddb25f]" />
                  </div>
                  <div className="h-8 w-px bg-[linear-gradient(180deg,rgba(201,162,77,0.22),rgba(201,162,77,0))]" />
                </div>

                <div className="space-y-4">
                  {analysisAreas.slice(3).map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="rounded-[1.4rem] border border-[rgba(201,162,77,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] px-5 py-5"
                      >
                        <div className="flex items-start gap-4">
                          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.95rem] border border-[rgba(201,162,77,0.14)] bg-[rgba(201,162,77,0.07)] text-[#ddb25f]">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="space-y-2">
                            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#ddb25f]/80">
                              Ponto {index + 4}
                            </p>
                            <h3
                              className="text-[1.18rem] font-semibold tracking-[-0.03em] text-[#f7f3ea]"
                              style={{ fontFamily: 'var(--font-display)' }}
                            >
                              {item.title}
                            </h3>
                            <p className="text-sm leading-7 text-white/60 md:text-[0.98rem]">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </Reveal>
        </section>

        <section className="grid gap-8 py-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14 lg:py-10">
          <Reveal className="space-y-4">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
              Resultados
            </span>
            <h2
              className="text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              O que a empresa ganha quando os dados passam a orientar a operação.
            </h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((item, index) => (
              <Reveal key={item} delay={0.04 * index}>
                <div className="minimal-glass-card flex h-full items-center gap-4 rounded-[1.4rem] px-5 py-5">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(230,194,122,0.22)] bg-[rgba(201,162,77,0.08)] text-[#ddb25f]">
                    <CheckGoldIcon className="h-4 w-4" />
                  </span>
                  <p className="text-base font-medium tracking-[-0.02em] text-white/84">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal>
          <section className="cta-luxury-shell mt-20 rounded-[2rem] p-[1px] lg:mt-24">
            <div className="cta-luxury-panel rounded-[2rem] px-6 py-12 md:px-10 md:py-14 lg:px-14 lg:py-16">
              <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
                <div className="space-y-5">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
                    Próximo passo
                  </span>
                  <h2
                    className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Use seus dados para enxergar melhor, decidir melhor e operar melhor.
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-base leading-8 text-white/66 md:text-lg">
                    Uma consultoria pensada para traduzir dados financeiros em ganho operacional e decisão estratégica.
                  </p>
                  <Link href="/contato" className="lux-button lux-button-gold min-h-[3.3rem] px-7 py-4 text-[0.66rem] tracking-[0.24em]">
                    <span>Agendar</span>
                    <ArrowGoldIcon className="h-4 w-4" />
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
