import { blogCategories, blogPosts, marketingPages } from '@/lib/cms/mock-content';

export async function getPageBySlug(slug: string) {
  return marketingPages.find((page) => page.slug === slug) ?? null;
}

export async function getAllMarketingSlugs() {
  return marketingPages.map((page) => page.slug);
}

export async function getAllPosts() {
  return blogPosts;
}

export async function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}

export async function getAllCategories() {
  return blogCategories;
}

export async function getCategoryBySlug(slug: string) {
  return blogCategories.find((category) => category.slug === slug) ?? null;
}

export async function getPostsByCategorySlug(slug: string) {
  return blogPosts.filter((post) => post.category.slug === slug);
}
