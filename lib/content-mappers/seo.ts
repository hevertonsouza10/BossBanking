import type { Metadata } from 'next';
import type { BlogPost, Page } from '@/lib/cms/types';

export function mapPageToSeo(page: Page): Metadata {
  return {
    title: page.seo.title,
    description: page.seo.description,
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      type: 'website',
    },
  };
}

export function mapPostToSeo(post: BlogPost): Metadata {
  return {
    title: post.seo.title,
    description: post.seo.description,
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      type: 'article',
    },
  };
}
