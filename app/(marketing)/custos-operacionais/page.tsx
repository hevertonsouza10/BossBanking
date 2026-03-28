import type { Metadata } from 'next';
import Container from '@/components/site/ui/Container';
import Reveal from '@/components/site/ui/Reveal';

const accountCosts = [
  {
    service: 'Abertura de conta',
    description: 'Ativação inicial da conta e configuração de acesso.',
    value: 'R$ 0,00',
  },
  {
    service: 'Manutenção mensal',
    description: 'Valor de referência para manutenção da estrutura operacional da conta.',
    value: 'Personalizado',
  },
  {
    service: 'Transferências internas',
    description: 'Movimentações entre contas da própria instituição.',
    value: 'R$ 0,00',
  },
  {
    service: 'Transferência externa - TED',
    description: 'Envio de recursos para outras instituições via TED.',
    value: 'R$ 5,00',
  },
  {
    service: 'Pagamentos',
    description: 'Liquidação de boletos, contas e compromissos operacionais.',
    value: 'R$ 0,00',
  },
];

const serviceCosts = [
  {
    service: 'Emissão de boleto',
    description: 'Geração de boleto para cobrança ou recebimento.',
    value: 'R$ 0,00',
  },
  {
    service: 'Segunda via de comprovante',
    description: 'Reemissão de comprovantes e documentos operacionais.',
    value: 'R$ 0,00',
  },
  {
    service: 'Suporte operacional prioritário',
    description: 'Acompanhamento operacional dedicado em demandas específicas.',
    value: 'Personalizado',
  },
];

const cardCosts = [
  {
    service: 'Emissão do cartão',
    description: 'Disponibilização inicial do cartão vinculado à conta.',
    value: 'R$ 0,00',
  },
  {
    service: 'Anuidade',
    description: 'Valor de referência para utilização e manutenção do cartão.',
    value: 'R$ 0,00',
  },
  {
    service: 'Segunda via do cartão',
    description: 'Reemissão em caso de perda, roubo ou substituição.',
    value: 'R$ 0,00',
  },
];

const zeroFeeItems = [
  'Abertura de conta',
  'Transferências internas',
  'Pix entre contas elegíveis',
  'Primeira emissão de cartão',
  'Consulta de extrato digital',
];

export const metadata: Metadata = {
  title: 'Custos operacionais',
  description:
    'Página institucional da Boss Ledger com estrutura de custos de conta, taxas e serviços apresentada de forma clara.',
};

export default function CustosOperacionaisPage() {
  return (
    <main className="relative overflow-hidden bg-[#040404] pt-[100px] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,77,0.08),transparent_24%),linear-gradient(180deg,#080808_0%,#040404_100%)]" />

      <Container className="relative py-12 md:py-16 lg:py-20">
        <Reveal>
          <section className="border-b border-[rgba(201,162,77,0.12)] pb-12 md:pb-14 lg:pb-16">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="max-w-4xl space-y-5">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#ddb25f]">
                  Estrutura institucional
                </span>
                <h1
                  className="text-4xl font-semibold tracking-[-0.05em] text-[#f7f3ea] sm:text-5xl lg:text-[4.3rem]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Custos operacionais
                </h1>
                <p className="text-lg leading-8 text-white/76 md:text-[1.18rem] md:leading-9">
                  Transparência na estrutura de custos da conta
                </p>
                <p className="max-w-3xl text-base leading-8 text-white/58 md:text-lg">
                  Reunimos abaixo um modelo de custos da conta, taxas e serviços de forma clara e objetiva para
                  facilitar a leitura da operação financeira.
                </p>
              </div>

              <div className="rounded-[1.7rem] border border-[rgba(201,162,77,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] px-6 py-6 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
                <div className="space-y-3">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#ddb25f]">
                    Aviso importante
                  </span>
                  <p className="text-sm leading-7 text-white/66 md:text-[0.98rem]">
                    Os valores abaixo estão apresentados como exemplo ilustrativo para composição da página. Eles
                    podem ser ajustados depois para refletir a tabela oficial da instituição.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <section className="grid gap-8 py-14 md:py-16 lg:grid-cols-2 lg:gap-10 lg:py-20">
          <Reveal>
            <div className="rounded-[1.8rem] border border-[rgba(201,162,77,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.028),rgba(255,255,255,0.01))] px-6 py-7 md:px-8 md:py-8">
              <div className="space-y-4">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#ddb25f]">
                  Transparência
                </span>
                <h2
                  className="text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-[2.35rem]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Custos apresentados com leitura objetiva e institucional.
                </h2>
                <p className="text-base leading-8 text-white/62 md:text-lg">
                  A proposta desta página é mostrar de forma organizada como a estrutura de custos pode ser
                  apresentada ao cliente, com previsibilidade e sem linguagem agressiva.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-[1.8rem] border border-[rgba(201,162,77,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.024),rgba(255,255,255,0.01))] px-6 py-7 md:px-8 md:py-8">
              <div className="space-y-4">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#ddb25f]">
                  Isenções de referência
                </span>
                <div className="grid gap-0">
                  {zeroFeeItems.map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-center justify-between gap-4 py-3 ${
                        index !== zeroFeeItems.length - 1 ? 'border-b border-[rgba(201,162,77,0.08)]' : ''
                      }`}
                    >
                      <span className="text-sm leading-7 text-white/68 md:text-[1rem]">{item}</span>
                      <span className="text-sm font-semibold text-[#ddb25f]">R$ 0,00</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <CostSection
          eyebrow="Custos de conta"
          title="Tabela de referência para custos da conta."
          description="Exemplo de composição para manutenção, movimentação e uso básico da conta."
          rows={accountCosts}
        />

        <section className="border-t border-[rgba(201,162,77,0.1)] py-14 md:py-16 lg:py-20">
          <Reveal className="pb-8 md:pb-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-4xl space-y-4">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#ddb25f]">
                  Taxas e serviços
                </span>
                <h2
                  className="text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Serviços complementares e rotinas operacionais.
                </h2>
                <p className="max-w-3xl text-base leading-8 text-white/58 md:text-lg">
                  Aqui entram tarifas vinculadas a serviços específicos, reemissões, processamentos e demandas
                  operacionais adicionais.
                </p>
              </div>

              <button
                type="button"
                disabled
                aria-disabled="true"
                className="lux-button lux-button-dark min-h-[3.15rem] w-full cursor-not-allowed justify-center px-6 text-[0.62rem] tracking-[0.2em] opacity-55 grayscale sm:w-auto sm:min-w-[18rem]"
              >
                Baixar documento com taxas
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <CostTable rows={serviceCosts} />
          </Reveal>
        </section>

        <CostSection
          eyebrow="Cartão"
          title="Taxas de referência do cartão em bloco separado."
          description="Estrutura ilustrativa para emissão, anuidade e segunda via do cartão."
          rows={cardCosts}
        />
      </Container>
    </main>
  );
}

function CostSection({
  eyebrow,
  title,
  description,
  rows,
}: {
  eyebrow: string;
  title: string;
  description: string;
  rows: Array<{ service: string; description: string; value: string }>;
}) {
  return (
    <section className="border-t border-[rgba(201,162,77,0.1)] py-14 md:py-16 lg:py-20">
      <Reveal className="pb-8 md:pb-10">
        <div className="max-w-4xl space-y-4">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#ddb25f]">{eyebrow}</span>
          <h2
            className="text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h2>
          <p className="max-w-3xl text-base leading-8 text-white/58 md:text-lg">{description}</p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <CostTable rows={rows} />
      </Reveal>
    </section>
  );
}

function CostTable({
  rows,
}: {
  rows: Array<{ service: string; description: string; value: string }>;
}) {
  return (
    <section className="overflow-hidden rounded-[1.8rem] border border-[rgba(201,162,77,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))]">
      <div className="grid gap-4 border-b border-[rgba(201,162,77,0.08)] px-6 py-5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#ddb25f] md:grid-cols-[1fr_1.55fr_0.65fr] md:gap-6 md:px-8">
        <span>Serviço</span>
        <span>Descrição</span>
        <span>Valor de exemplo</span>
      </div>

      <div>
        {rows.map((item, index) => (
          <div
            key={item.service}
            className={`grid gap-5 px-6 py-6 md:grid-cols-[1fr_1.55fr_0.65fr] md:gap-6 md:px-8 md:py-7 ${
              index !== rows.length - 1 ? 'border-b border-[rgba(201,162,77,0.08)]' : ''
            }`}
          >
            <div className="space-y-1.5">
              <span className="text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-[#ddb25f] md:hidden">
                Serviço
              </span>
              <p
                className="text-[1rem] font-semibold tracking-[-0.02em] text-[#f7f3ea] md:text-[1.06rem]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {item.service}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-[#ddb25f] md:hidden">
                Descrição
              </span>
              <p className="text-sm leading-7 text-white/64 md:text-[0.98rem]">{item.description}</p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-[#ddb25f] md:hidden">
                Valor
              </span>
              <p className="text-sm font-semibold leading-7 text-[#ddb25f] md:text-[1rem]">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
