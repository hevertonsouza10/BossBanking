import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageRenderer from '@/components/site/sections/PageRenderer';
import { mapPageToSeo } from '@/lib/content-mappers/seo';
import { getAllMarketingSlugs, getPageBySlug } from '@/lib/cms/content-repository';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllMarketingSlugs();
  return slugs.filter((slug) => slug !== 'home').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  return page ? mapPageToSeo(page) : {};
}

export default async function MarketingPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page || slug === 'home') {
    notFound();
  }

  return <PageRenderer page={page} />;
}
