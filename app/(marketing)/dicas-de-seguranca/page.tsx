import type { Metadata } from 'next';
import Container from '@/components/site/ui/Container';
import Reveal from '@/components/site/ui/Reveal';

const securityTips = [
  {
    title: 'Não compartilhe credenciais',
    description: 'Nunca informe senhas, códigos de acesso ou credenciais pessoais a terceiros. Não solicitamos essas informações.',
  },
  {
    title: 'Use senhas fortes',
    description: 'Prefira combinações robustas, exclusivas e atualizadas periodicamente.',
  },
  {
    title: 'Evite redes públicas',
    description: 'Sempre que possível, utilize conexões seguras e evite acessar informações sensíveis em redes abertas.',
  },
  {
    title: 'Mantenha dispositivos atualizados',
    description: 'Atualizações de sistema e aplicativos ajudam a reduzir vulnerabilidades e riscos de exposição.',
  },
  {
    title: 'Verifique comunicações',
    description: 'Confirme a autenticidade de contatos, links e mensagens antes de compartilhar qualquer informação.',
  },
];

export const metadata: Metadata = {
  title: 'Segurança',
  description:
    'Boas práticas de segurança para proteger informações e operações no uso diário com clareza e responsabilidade.',
};

export default function DicasDeSegurancaPage() {
  return (
    <main className="relative overflow-hidden bg-[#050505] pt-[100px] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,77,0.1),transparent_24%),linear-gradient(180deg,#090909_0%,#040404_100%)]" />

      <Container className="relative py-10 md:py-14 lg:py-20">
        <Reveal>
          <section className="luxury-panel-subtle rounded-[2rem] px-6 py-14 md:px-10 md:py-16 lg:px-14 lg:py-20">
            <div className="max-w-4xl space-y-6">
              <span className="inline-flex rounded-full border border-[rgba(230,194,122,0.18)] bg-[rgba(201,162,77,0.08)] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#e6c27a]">
                Proteção no dia a dia
              </span>
              <h1
                className="hero-title text-4xl font-semibold tracking-[-0.05em] text-[#f7f3ea] sm:text-5xl lg:text-6xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Segurança
              </h1>
              <p className="text-lg leading-8 text-white/76 md:text-[1.24rem] md:leading-9">
                Boas práticas para proteger suas informações
              </p>
              <p className="max-w-3xl text-base leading-8 text-white/58 md:text-lg">
                A segurança das suas operações depende tanto das nossas tecnologias quanto das boas práticas no uso
                do dia a dia.
              </p>
            </div>
          </section>
        </Reveal>

        <section className="grid gap-8 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:py-24">
          <Reveal className="space-y-4">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
              Responsabilidade compartilhada
            </span>
            <h2
              className="text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              A proteção das informações depende de tecnologia, processos e comportamento responsável.
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="luxury-panel-subtle rounded-[1.75rem] px-6 py-8 md:px-8 md:py-9">
              <p className="text-base leading-8 text-white/66 md:text-lg">
                Mantemos controles, monitoramento e camadas de segurança para proteger as operações. Ao mesmo tempo,
                o uso consciente das credenciais, dos dispositivos e dos canais de comunicação fortalece a segurança
                de forma contínua e ajuda a prevenir incidentes.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="py-4 lg:py-8">
          <Reveal className="mb-8 space-y-4 lg:mb-10">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
              Boas práticas
            </span>
            <h2
              className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Orientações simples para preservar a segurança das suas informações e operações.
            </h2>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {securityTips.map((tip, index) => (
              <Reveal key={tip.title} delay={0.04 * index}>
                <article className="luxury-panel-subtle rounded-[1.5rem] px-6 py-6 md:px-7 md:py-7">
                  <div className="space-y-3">
                    <span className="inline-flex rounded-full border border-[rgba(201,162,77,0.14)] bg-[rgba(201,162,77,0.06)] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#ddb25f]">
                      Dica {index + 1}
                    </span>
                    <h3
                      className="text-[1.2rem] font-semibold tracking-[-0.03em] text-[#f7f3ea]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {tip.title}
                    </h3>
                    <p className="text-sm leading-7 text-white/62 md:text-[0.98rem]">{tip.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal>
          <section className="cta-luxury-shell mt-20 rounded-[2rem] p-[1px] lg:mt-24">
            <div className="cta-luxury-panel rounded-[2rem] px-6 py-12 md:px-10 md:py-14 lg:px-14 lg:py-16">
              <div className="space-y-5">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
                  Nota institucional
                </span>
                <h2
                  className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-5xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  O Boss Ledger não solicita dados sensíveis por canais não oficiais.
                </h2>
                <p className="max-w-3xl text-base leading-8 text-white/66 md:text-lg">
                  Sempre confirme a autenticidade de contatos e utilize exclusivamente os canais oficiais da Boss
                  Ledger para tratar informações pessoais, financeiras ou de acesso.
                </p>
              </div>
            </div>
          </section>
        </Reveal>
      </Container>
    </main>
  );
}
