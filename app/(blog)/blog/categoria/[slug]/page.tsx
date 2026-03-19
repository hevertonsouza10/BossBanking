import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogIndex from '@/components/site/sections/BlogIndex';
import { getAllCategories, getCategoryBySlug, getPostsByCategorySlug } from '@/lib/cms/content-repository';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  return category
    ? {
        title: `Categoria: ${category.name}`,
        description: category.description,
      }
    : {};
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const [category, posts, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getPostsByCategorySlug(slug),
    getAllCategories(),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <BlogIndex
      posts={posts}
      categories={categories}
      currentCategory={category}
      heading={category.name}
      description={category.description}
    />
  );
}
