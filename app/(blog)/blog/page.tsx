import type { Metadata } from 'next';
import BlogIndex from '@/components/site/sections/BlogIndex';
import { getAllCategories, getAllPosts } from '@/lib/cms/content-repository';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Conteúdo sobre a agência, benefícios, cartões e inteligência financeira.',
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()]);

  return <BlogIndex posts={posts} categories={categories} />;
}
