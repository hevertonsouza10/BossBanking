import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock3 } from 'lucide-react';
import Container from '@/components/site/ui/Container';
import Reveal from '@/components/site/ui/Reveal';

export const metadata: Metadata = {
  title: 'Consultoria Boss',
  description: 'Consultoria Boss em breve.',
};

export default function ConsultoriaBossPage() {
  return (
    <main className="relative overflow-hidden bg-[#050505] pt-[100px] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,77,0.12),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.04),transparent_14%),linear-gradient(180deg,#090909_0%,#040404_100%)]" />
      <div className="noise-overlay absolute inset-0 opacity-[0.18]" />
      <div className="absolute left-1/2 top-28 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,77,0.2),transparent_68%)] blur-3xl" />

      <Container className="relative py-10 md:py-14 lg:py-20">
        <Reveal>
          <section className="relative overflow-hidden rounded-[2rem] border border-white/[0.045] bg-[linear-gradient(180deg,rgba(18,18,20,0.88),rgba(7,7,8,0.74))] px-6 py-16 shadow-[0_30px_90px_rgba(0,0,0,0.35)] md:px-10 md:py-20 lg:px-16 lg:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,194,122,0.12),transparent_28%)]" />
            <div className="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(230,194,122,0.5),transparent)]" />
            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
              <span className="inline-flex rounded-full border border-[rgba(230,194,122,0.18)] bg-[rgba(201,162,77,0.08)] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#e6c27a]">
                Em breve
              </span>
              <div className="mt-8 inline-flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(230,194,122,0.18)] bg-[rgba(201,162,77,0.08)] text-[#ddb25f]">
                <Clock3 className="h-7 w-7" />
              </div>
              <h1
                className="hero-title mt-8 text-4xl font-semibold tracking-[-0.05em] text-[#f7f3ea] sm:text-5xl lg:text-6xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Consultoria Boss
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/76 md:text-[1.24rem] md:leading-9">
                Estamos preparando uma nova frente consultiva com posicionamento mais claro e uma experiência dedicada.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/58 md:text-lg">
                A página já está reservada e, por enquanto, segue em construção. Quando liberarmos, ela vai apresentar
                a proposta, os diferenciais e a forma de atuação da Consultoria Boss.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/contato" className="lux-button lux-button-gold min-h-[3.35rem] px-7 py-4 text-[0.66rem] tracking-[0.24em]">
                  <span>Falar com especialista</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/" className="lux-button lux-button-dark min-h-[3.35rem] px-7 py-4 text-[0.66rem] tracking-[0.2em]">
                  Voltar para home
                </Link>
              </div>
            </div>
          </section>
        </Reveal>
      </Container>
    </main>
  );
}
