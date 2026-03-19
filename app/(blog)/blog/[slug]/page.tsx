import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostView from '@/components/site/sections/BlogPostView';
import { mapPostToSeo } from '@/lib/content-mappers/seo';
import { getAllPosts, getPostBySlug } from '@/lib/cms/content-repository';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return post ? mapPostToSeo(post) : {};
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostView post={post} />;
}
