import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Container from '@/components/site/ui/Container';
import {
  compliancePolicies,
  getAllComplianceSlugs,
  getCompliancePolicyBySlug,
  getCompliancePolicyContent,
} from '@/lib/compliance/policies';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllComplianceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const policy = getCompliancePolicyBySlug(slug);

  if (!policy) {
    return {};
  }

  return {
    title: policy.shortTitle,
    description: policy.description,
  };
}

export default async function CompliancePolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = await getCompliancePolicyContent(slug);

  if (!policy) {
    notFound();
  }

  const relatedPolicies = compliancePolicies.filter((item) => item.slug !== policy.slug);

  return (
    <main className="relative overflow-hidden bg-[#050505] pt-[100px] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,77,0.09),transparent_22%),linear-gradient(180deg,#090909_0%,#040404_100%)]" />

      <Container className="relative py-10 md:py-14 lg:py-20">
        <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div className="space-y-6">
            <Link
              href="/compliance"
              className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#ddb25f] transition hover:text-[#f0cb80]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar para compliance</span>
            </Link>

            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-[rgba(230,194,122,0.18)] bg-[rgba(201,162,77,0.08)] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#e6c27a]">
                Documento institucional
              </span>
              <h1
                className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-[#f7f3ea] sm:text-5xl lg:text-6xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {policy.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-white/58 md:text-lg">{policy.description}</p>
            </div>
          </div>

          <div className="luxury-panel-subtle rounded-[1.75rem] px-6 py-6 md:px-7 md:py-7">
            <div className="space-y-5">
              <div className="space-y-2">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#ddb25f]">
                  Estrutura de governança
                </p>
                <p className="text-sm leading-7 text-white/62 md:text-base">
                  Este documento faz parte da base institucional de conformidade da Boss Ledger e está integrado à
                  nossa estrutura de transparência, segurança e controles internos.
                </p>
              </div>
              <div className="minimal-glass-separator" />
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {['Conformidade', 'Segurança', 'Transparência'].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1rem] border border-[rgba(201,162,77,0.1)] bg-[rgba(255,255,255,0.02)] px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/72"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 pt-12 lg:grid-cols-[1.18fr_0.82fr] lg:gap-10 lg:pt-16">
          <section className="luxury-panel-subtle rounded-[2rem] px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
            <div className="mb-8 space-y-3">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#ddb25f]">
                Conteúdo do documento
              </span>
              <h2
                className="text-2xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-3xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Leitura institucional
              </h2>
            </div>

            <div className="space-y-5">
              {policy.paragraphs.map((paragraph, index) => (
                <p
                  key={`${policy.slug}-${index}`}
                  className="whitespace-pre-wrap text-sm leading-7 text-white/72 md:text-[0.98rem] md:leading-8"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <aside className="space-y-4">
            <div className="luxury-panel-subtle rounded-[1.75rem] px-6 py-6">
              <div className="space-y-4">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#ddb25f]">
                  Outras políticas
                </span>
                {relatedPolicies.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/compliance/${item.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-[1rem] border border-[rgba(201,162,77,0.08)] bg-[rgba(255,255,255,0.015)] px-4 py-4 transition duration-300 hover:border-[rgba(230,194,122,0.14)] hover:bg-[rgba(255,255,255,0.028)]"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-white/88">{item.title}</span>
                      <span className="mt-1 block text-xs leading-6 text-white/46">{item.description}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#ddb25f] transition duration-300 group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="luxury-panel-subtle rounded-[1.75rem] px-6 py-6">
              <div className="space-y-3">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#ddb25f]">
                  Base institucional
                </span>
                <p className="text-sm leading-7 text-white/62 md:text-base">
                  As políticas publicadas nesta área reforçam o compromisso da marca com segurança, boas práticas,
                  proteção de dados e integridade nas operações.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </Container>
    </main>
  );
}
