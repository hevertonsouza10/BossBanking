import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/site/ui/Container';
import Reveal from '@/components/site/ui/Reveal';

const addressLines = [
  'Av. Whilhelm Rotermund 124, Morro do Espelho',
  'São Leopoldo/RS, CEP 93.030.135',
];

const mapEmbedSrc =
  'https://www.google.com/maps?q=Av.%20Whilhelm%20Rotermund%20124%2C%20Morro%20do%20Espelho%2C%20Sao%20Leopoldo%20RS%2C%2093030-135&z=16&output=embed';

export const metadata: Metadata = {
  title: 'Conheça nossa fintech',
  description:
    'Conheça a estrutura institucional da Boss Ledger, nossa localização e os canais oficiais de contato.',
};

export default function ConhecaNossaFintechPage() {
  return (
    <main className="relative overflow-hidden bg-[#050505] pt-[100px] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,77,0.12),transparent_24%),linear-gradient(180deg,#090909_0%,#040404_100%)]" />

      <Container className="relative py-10 md:py-14 lg:py-20">
        <Reveal>
          <section className="luxury-panel-subtle rounded-[2rem] px-6 py-14 md:px-10 md:py-16 lg:px-14 lg:py-20">
            <div className="max-w-4xl space-y-6">
              <span className="inline-flex rounded-full border border-[rgba(230,194,122,0.18)] bg-[rgba(201,162,77,0.08)] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#e6c27a]">
                Estrutura institucional
              </span>
              <h1
                className="hero-title text-4xl font-semibold tracking-[-0.05em] text-[#f7f3ea] sm:text-5xl lg:text-6xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Conheça nossa fintech
              </h1>
              <p className="text-lg leading-8 text-white/76 md:text-[1.24rem] md:leading-9">
                Tecnologia financeira com atendimento, estrutura e governança.
              </p>
              <p className="max-w-3xl text-base leading-8 text-white/58 md:text-lg">
                A Boss Ledger atua com foco em experiência financeira, eficiência operacional e relacionamento
                institucional. Nossa proposta combina tecnologia, proximidade e clareza para apoiar empresas e
                clientes em uma rotina financeira mais segura e organizada.
              </p>
            </div>
          </section>
        </Reveal>

        <section className="grid gap-8 py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:py-24">
          <Reveal className="space-y-4">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
              Sobre a Boss Ledger
            </span>
            <h2
              className="text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Uma fintech orientada por transparência, estrutura e relacionamento de longo prazo.
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="luxury-panel-subtle rounded-[1.75rem] px-6 py-8 md:px-8 md:py-9">
              <p className="text-base leading-8 text-white/66 md:text-lg">
                Nossa atuação institucional é sustentada por processos, conformidade e canais oficiais de
                atendimento. Com base em uma estrutura profissional e em uma proposta de serviços financeiros
                conectada ao contexto do cliente, buscamos oferecer uma experiência consistente, segura e previsível.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="grid gap-8 py-4 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:py-8">
          <Reveal>
            <section className="luxury-panel-subtle overflow-hidden rounded-[1.9rem]">
              <div className="border-b border-[rgba(201,162,77,0.08)] px-6 py-5 md:px-8">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#ddb25f]">
                  Localização
                </span>
              </div>
              <div className="aspect-[16/12] w-full md:aspect-[16/10]">
                <iframe
                  src={mapEmbedSrc}
                  title="Localização da Boss Ledger"
                  className="h-full w-full border-0 grayscale contrast-125 brightness-[0.78]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </section>
          </Reveal>

          <div className="grid gap-4">
            <Reveal delay={0.04}>
              <section className="luxury-panel-subtle rounded-[1.6rem] px-6 py-6 md:px-7 md:py-7">
                <div className="space-y-3">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#ddb25f]">
                    Endereço institucional
                  </span>
                  <div className="space-y-1.5 text-sm leading-7 text-white/68 md:text-[0.98rem]">
                    {addressLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </section>
            </Reveal>

            <Reveal delay={0.08}>
              <section className="luxury-panel-subtle rounded-[1.6rem] px-6 py-6 md:px-7 md:py-7">
                <div className="space-y-3">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#ddb25f]">
                    Canais oficiais
                  </span>
                  <div className="space-y-1.5 text-sm leading-7 text-white/68 md:text-[0.98rem]">
                    <p>(51) 2165-9459 | 0800 130 1212</p>
                    <Link href="mailto:contato@bossbanking.com.br" className="transition hover:text-white">
                      contato@bossbanking.com.br
                    </Link>
                  </div>
                </div>
              </section>
            </Reveal>

            <Reveal delay={0.12}>
              <section className="luxury-panel-subtle rounded-[1.6rem] px-6 py-6 md:px-7 md:py-7">
                <div className="space-y-3">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#ddb25f]">
                    Presença institucional
                  </span>
                  <p className="text-sm leading-7 text-white/68 md:text-[0.98rem]">
                    Mantemos uma estrutura de atendimento e relacionamento alinhada a princípios de segurança,
                    transparência e clareza na comunicação com clientes e parceiros.
                  </p>
                </div>
              </section>
            </Reveal>
          </div>
        </section>
      </Container>
    </main>
  );
}
