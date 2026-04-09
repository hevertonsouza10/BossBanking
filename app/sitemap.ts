import type { MetadataRoute } from 'next';
import { getAllCategories, getAllMarketingSlugs, getAllPosts } from '@/lib/cms/content-repository';
import { getAllComplianceSlugs } from '@/lib/compliance/policies';

const SITE_URL = process.env.SITE_URL || 'https://www.bossbanking.com.br';

const STATIC_ROUTES = [
  '/',
  '/assessoria-boss',
  '/compliance',
  '/conheca-nossa-agencia',
  '/consultoria-financeira',
  '/consultoria-boss',
  '/conheca-nossa-fintech',
  '/custos-operacionais',
  '/dicas-de-seguranca',
  '/noticias-boss',
  '/operacoes-estruturadas',
  '/termos-de-cookies',
  '/blog',
] as const;

const MONTHS_PT_BR: Record<string, number> = {
  janeiro: 0,
  fevereiro: 1,
  marco: 2,
  março: 2,
  abril: 3,
  maio: 4,
  junho: 5,
  julho: 6,
  agosto: 7,
  setembro: 8,
  outubro: 9,
  novembro: 10,
  dezembro: 11,
};

function getSiteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

function parseBrazilianDate(value?: string) {
  if (!value) {
    return undefined;
  }

  const normalized = value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const match = normalized.match(/^(\d{1,2})\s+de\s+([a-z]+)\s+de\s+(\d{4})$/);

  if (!match) {
    return undefined;
  }

  const [, day, monthName, year] = match;
  const month = MONTHS_PT_BR[monthName];

  if (month === undefined) {
    return undefined;
  }

  return new Date(Date.UTC(Number(year), month, Number(day), 12, 0, 0));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [marketingSlugs, posts, categories, complianceSlugs] = await Promise.all([
    getAllMarketingSlugs(),
    getAllPosts(),
    getAllCategories(),
    Promise.resolve(getAllComplianceSlugs()),
  ]);

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: getSiteUrl(route),
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/blog' ? 0.9 : 0.8,
  }));

  const marketingEntries: MetadataRoute.Sitemap = marketingSlugs
    .filter((slug) => slug !== 'home')
    .map((slug) => ({
      url: getSiteUrl(`/${slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  const blogPostEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: getSiteUrl(`/blog/${post.slug}`),
    lastModified: parseBrazilianDate(post.publishedAt) || now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogCategoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: getSiteUrl(`/blog/categoria/${category.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const complianceEntries: MetadataRoute.Sitemap = complianceSlugs.map((slug) => ({
    url: getSiteUrl(`/compliance/${slug}`),
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  return [...staticEntries, ...marketingEntries, ...blogPostEntries, ...blogCategoryEntries, ...complianceEntries];
}
