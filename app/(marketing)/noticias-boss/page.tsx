import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/site/ui/Container';
import Reveal from '@/components/site/ui/Reveal';

const socialChannels = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sejabossbank',
    description: 'Conteúdos, bastidores e atualizações da marca.',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/sejabossbank/',
    description: 'Acompanhe publicações, novidades e comunicados da marca.',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/search/results/all/?keywords=Boss%20Ledger',
    description: 'Acompanhe a presença institucional da marca na plataforma.',
  },
  {
    label: 'X',
    href: 'https://x.com/sejabossbank',
    description: 'Acompanhe comunicados, novidades e atualizações da marca.',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@sejabossbank',
    description: 'Veja vídeos, lançamentos e conteúdos da Boss Ledger.',
  },
];

export const metadata: Metadata = {
  title: 'Notícias Boss',
  description:
    'Página temporária da Boss Ledger para acompanhar conteúdos e atualizações enquanto o blog institucional não está disponível.',
};

export default function NoticiasBossPage() {
  return (
    <main className="relative overflow-hidden bg-[#050505] pt-[100px] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,77,0.12),transparent_24%),linear-gradient(180deg,#090909_0%,#040404_100%)]" />

      <Container className="relative flex min-h-[calc(100vh-100px)] items-center py-14 md:py-16 lg:py-20">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          <Reveal className="w-full">
            <section className="luxury-panel-subtle rounded-[2rem] px-6 py-14 md:px-10 md:py-16 lg:px-16 lg:py-20">
              <div className="mx-auto max-w-3xl space-y-6">
                <span className="inline-flex rounded-full border border-[rgba(230,194,122,0.18)] bg-[rgba(201,162,77,0.08)] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#e6c27a]">
                  Conteúdo temporário
                </span>
                <h1
                  className="hero-title text-4xl font-semibold tracking-[-0.05em] text-[#f7f3ea] sm:text-5xl lg:text-6xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Notícias Boss
                </h1>
                <p className="text-lg leading-8 text-white/76 md:text-[1.24rem] md:leading-9">
                  Acompanhe nossos conteúdos e atualizações
                </p>
                <p className="text-base leading-8 text-white/58 md:text-lg">
                  Estamos direcionando nossos conteúdos e atualizações para nossos canais oficiais. Em breve, você
                  poderá acompanhar todas as notícias diretamente em nosso blog.
                </p>
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.08} className="mt-12 w-full max-w-5xl lg:mt-14">
            <section className="space-y-6">
              <div className="space-y-3">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#ddb25f]">
                  Acompanhe a Boss Ledger
                </span>
                <h2
                  className="text-3xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-4xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Fique por dentro de novidades, conteúdos e atualizações através dos nossos canais.
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {socialChannels.map((channel, index) => (
                  <Reveal key={channel.label} delay={0.12 + index * 0.05}>
                    <Link
                      href={channel.href}
                      target="_blank"
                      rel="noreferrer"
                      className="luxury-panel-subtle group flex h-full min-h-[13rem] flex-col items-center justify-center rounded-[1.65rem] px-6 py-7 text-center transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.3)]"
                    >
                      <span
                        className="text-[1.45rem] font-semibold tracking-[-0.03em] text-[#f7f3ea]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {channel.label}
                      </span>
                      <span className="mt-3 text-sm leading-7 text-white/58">{channel.description}</span>
                      <span className="mt-6 inline-flex rounded-full border border-[rgba(201,162,77,0.14)] bg-[rgba(201,162,77,0.07)] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#ddb25f] transition duration-300 group-hover:border-[rgba(201,162,77,0.24)]">
                        Acessar canal
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          </Reveal>
        </div>
      </Container>
    </main>
  );
}
