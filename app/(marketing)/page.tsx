import { notFound } from 'next/navigation';
import CinematicScroll from '@/components/site/layout/CinematicScroll';
import PageRenderer from '@/components/site/sections/PageRenderer';
import { mapPageToSeo } from '@/lib/content-mappers/seo';
import { getPageBySlug } from '@/lib/cms/content-repository';

export async function generateMetadata() {
  const page = await getPageBySlug('home');
  if (!page) {
    return {};
  }

  return mapPageToSeo(page);
}

export default async function HomePage() {
  const page = await getPageBySlug('home');

  if (!page) {
    notFound();
  }

  return (
    <>
      <CinematicScroll />
      <PageRenderer page={page} />
    </>
  );
}
