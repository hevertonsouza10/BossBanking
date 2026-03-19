import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/site/ui/Container';
import type { BlogCategory, BlogPost } from '@/lib/cms/types';

type BlogIndexProps = {
  posts: BlogPost[];
  categories: BlogCategory[];
  currentCategory?: BlogCategory;
  heading?: string;
  description?: string;
};

export default function BlogIndex({
  posts,
  categories,
  currentCategory,
  heading = 'Insights Boss Ledger',
  description = 'Base editorial pronta para SEO, crescimento do blog e categorias navegáveis.',
}: BlogIndexProps) {
  return (
    <main className="pb-24 pt-6">
      <Container className="space-y-10">
        <section className="glass-panel rounded-[2rem] px-6 py-12 md:px-10">
          <p className="text-[11px] uppercase tracking-[0.34em] text-[#c9a24d]">Blog</p>
          <h1 className="mt-5 font-[family:var(--font-display)] text-4xl font-light text-white md:text-6xl">
            {heading}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/62 md:text-base">{description}</p>
        </section>

        <section className="flex flex-wrap gap-3">
          <Link
            href="/blog"
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em] transition ${
              currentCategory ? 'border-white/10 text-white/60 hover:text-white' : 'border-[#c9a24d] text-[#c9a24d]'
            }`}
          >
            Todos
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/blog/categoria/${category.slug}`}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em] transition ${
                currentCategory?.slug === category.slug
                  ? 'border-[#c9a24d] text-[#c9a24d]'
                  : 'border-white/10 text-white/60 hover:text-white'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="glass-panel overflow-hidden rounded-[1.8rem]">
              <div className="relative aspect-[16/10] bg-[radial-gradient(circle_at_top,rgba(201,162,77,0.18),transparent_35%),linear-gradient(180deg,#191919,#080808)]">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                ) : null}
              </div>
              <div className="space-y-4 p-6">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#c9a24d]">{post.category.name}</p>
                <h2 className="text-2xl font-light text-white">{post.title}</h2>
                <p className="text-sm text-white/58">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="inline-flex text-xs uppercase tracking-[0.24em] text-white/70 transition hover:text-white">
                  Ler artigo
                </Link>
              </div>
            </article>
          ))}
        </section>
      </Container>
    </main>
  );
}
