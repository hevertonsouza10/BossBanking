import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/site/ui/Container';
import type { BlogPost } from '@/lib/cms/types';

export default function BlogPostView({ post }: { post: BlogPost }) {
  return (
    <main className="pb-24 pt-6">
      <Container className="max-w-4xl space-y-10">
        <Link href="/blog" className="inline-flex text-xs uppercase tracking-[0.24em] text-white/55 transition hover:text-white">
          Voltar para blog
        </Link>

        <header className="space-y-5">
          <p className="text-[11px] uppercase tracking-[0.34em] text-[#c9a24d]">{post.category.name}</p>
          <h1 className="font-[family:var(--font-display)] text-4xl font-light leading-tight text-white md:text-6xl">
            {post.title}
          </h1>
          <p className="max-w-2xl text-base text-white/62">{post.excerpt}</p>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.22em] text-white/42">
            <span>{post.publishedAt}</span>
            {post.author ? <span>{post.author}</span> : null}
          </div>
        </header>

        <div className="glass-panel overflow-hidden rounded-[2rem]">
          <div className="relative aspect-[16/8] bg-[radial-gradient(circle_at_top,rgba(201,162,77,0.18),transparent_35%),linear-gradient(180deg,#191919,#080808)]">
            {post.coverImage ? (
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" />
            ) : null}
          </div>
        </div>

        <article className="space-y-6 text-base leading-8 text-white/72">
          {post.body.map((block) => (
            <section key={block.id} className="space-y-3">
              {block.heading ? <h2 className="font-[family:var(--font-display)] text-2xl font-light text-white">{block.heading}</h2> : null}
              {block.paragraphs.map((paragraph, index) => (
                <p key={`${block.id}-${index}`}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>
      </Container>
    </main>
  );
}
