import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ManageCookiesButton from '@/components/site/layout/ManageCookiesButton';
import Container from '@/components/site/ui/Container';
import Reveal from '@/components/site/ui/Reveal';

const cookieTopics = [
  {
    title: 'Cookies estritamente necessários',
    description:
      'Mantêm o funcionamento básico do site, recursos de segurança, navegação e estabilidade da experiência.',
  },
  {
    title: 'Cookies de atendimento e experiência',
    description:
      'Podem habilitar integrações opcionais, como canais de atendimento, quando o usuário aceita esse uso.',
  },
  {
    title: 'Gestão de preferência',
    description:
      'A sua escolha é registrada no navegador para que o banner não seja exibido novamente a cada visita.',
  },
];

export const metadata: Metadata = {
  title: 'Termos de Cookies',
  description:
    'Informações sobre uso de cookies, finalidade, categorias aplicadas e referência às políticas de privacidade da Boss Ledger.',
};

export default function CookieTermsPage() {
  return (
    <main className="relative overflow-hidden bg-[#050505] pt-[100px] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,77,0.1),transparent_22%),linear-gradient(180deg,#090909_0%,#040404_100%)]" />

      <Container className="relative py-10 md:py-14 lg:py-20">
        <Reveal>
          <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="space-y-5">
              <Link
                href="/compliance"
                className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#ddb25f] transition hover:text-[#f0cb80]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar para compliance</span>
              </Link>

              <span className="inline-flex rounded-full border border-[rgba(230,194,122,0.18)] bg-[rgba(201,162,77,0.08)] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#e6c27a]">
                Transparência digital
              </span>

              <div className="space-y-4">
                <h1
                  className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-[#f7f3ea] sm:text-5xl lg:text-6xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Termos de Cookies
                </h1>
                <p className="max-w-3xl text-base leading-8 text-white/62 md:text-lg">
                  Esta página resume como a Boss Ledger utiliza cookies no site, quais categorias podem ser ativadas e
                  como o seu consentimento impacta recursos opcionais.
                </p>
              </div>
            </div>

            <div className="luxury-panel-subtle rounded-[1.75rem] px-6 py-6 md:px-7 md:py-7">
              <div className="space-y-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#ddb25f]">
                  Referência institucional
                </p>
                <p className="text-sm leading-7 text-white/64 md:text-base">
                  O tratamento de cookies é complementar aos documentos de privacidade e às políticas de compliance já
                  publicadas pela Boss Ledger.
                </p>
                <Link
                  href="/compliance/nossas-politicas"
                  className="inline-flex text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#ddb25f] transition hover:text-[#f0cb80]"
                >
                  Ler documento completo
                </Link>
              </div>
            </div>
          </section>
        </Reveal>

        <section className="grid gap-8 pt-12 lg:grid-cols-[1.14fr_0.86fr] lg:gap-10 lg:pt-16">
          <Reveal>
            <section className="luxury-panel-subtle rounded-[2rem] px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#ddb25f]">
                    Como usamos cookies
                  </span>
                  <h2
                    className="text-2xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-3xl"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Finalidades e consentimento
                  </h2>
                </div>

                <div className="space-y-5 text-sm leading-7 text-white/72 md:text-[0.98rem] md:leading-8">
                  <p>
                    Os cookies são pequenos arquivos armazenados no navegador para viabilizar funcionalidades,
                    reconhecer preferências e apoiar a navegação com mais estabilidade e segurança.
                  </p>
                  <p>
                    No ambiente da Boss Ledger, os cookies estritamente necessários podem ser usados para manter a
                    operação do site. Recursos opcionais de experiência e atendimento só devem ser ativados após o seu
                    aceite no banner de consentimento.
                  </p>
                  <p>
                    Quando você escolhe “Somente necessários”, o site continua funcionando com o mínimo indispensável e
                    evita carregar integrações opcionais baseadas em cookies. Quando você escolhe “Aceitar cookies”,
                    esses recursos adicionais podem ser habilitados.
                  </p>
                  <p>
                    Para uma visão institucional mais ampla sobre privacidade, consentimento e tratamento de dados, a
                    referência principal continua sendo o documento de{' '}
                    <Link href="/compliance/nossas-politicas" className="text-[#ddb25f] transition hover:text-[#f0cb80]">
                      Nossas Políticas
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </section>
          </Reveal>

          <aside className="space-y-4">
            <Reveal>
              <div className="luxury-panel-subtle rounded-[1.75rem] px-6 py-6">
                <div className="space-y-4">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#ddb25f]">
                    Categorias
                  </span>
                  {cookieTopics.map((topic) => (
                    <div
                      key={topic.title}
                      className="rounded-[1rem] border border-[rgba(201,162,77,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4"
                    >
                      <p className="text-sm font-medium text-white/88">{topic.title}</p>
                      <p className="mt-2 text-xs leading-6 text-white/54">{topic.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="luxury-panel-subtle rounded-[1.75rem] px-6 py-6">
                <div className="space-y-3">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#ddb25f]">
                    Ajuste posterior
                  </span>
                  <p className="text-sm leading-7 text-white/62 md:text-base">
                    Se precisar revisar sua escolha depois, basta limpar os dados do site no navegador e retornar à
                    página para registrar uma nova preferência.
                  </p>
                  <ManageCookiesButton className="inline-flex text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#ddb25f] transition hover:text-[#f0cb80]" />
                </div>
              </div>
            </Reveal>
          </aside>
        </section>
      </Container>
    </main>
  );
}
