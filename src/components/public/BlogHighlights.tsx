'use client';

 
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, ListChecks } from 'lucide-react';
import { RUNA_BLOG_POSTS, formatBlogDate, type BlogPost } from '@/config/blog';

const EASE = [0.22, 1, 0.36, 1] as const;

function Cover({ post, className = '' }: { post: BlogPost; className?: string }) {
  return (
    <picture className={`block overflow-hidden bg-[#0D342C] ${className}`}>
      <source srcSet={post.cover.avif} type="image/avif" />
      <source srcSet={post.cover.webp} type="image/webp" />
      <img
        src={post.cover.png}
        alt={post.cover.alt}
        width={post.cover.width}
        height={post.cover.height}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    </picture>
  );
}

function Meta({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-[#4c524b]">
      <span className="rounded-full bg-[#C97F38]/15 px-2.5 py-0.5 font-semibold uppercase tracking-wider text-[#b06b29]">
        {post.category}
      </span>
      <span className="flex items-center gap-1">
        <Clock className="h-3 w-3" /> {post.readingTime.replace(' de leitura', '')}
      </span>
      <span className="hidden sm:inline">· {formatBlogDate(post.date)}</span>
    </div>
  );
}

/* ---------------- Card de artigo ---------------- */
export function PostCard({ post }: { post: BlogPost }) {
  const topics = post.toc.filter((t) => !/fontes/i.test(t.title)).slice(0, 3);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#d8d7cf] bg-[#E8E7DF]/60 transition-all duration-300 hover:border-[#C97F38]/60 hover:shadow-xl hover:shadow-[#13302a]/10"
    >
      <div className="relative">
        <Cover post={post} className="aspect-[16/9]" />
        {/* Tópicos do artigo no hover */}
        <div className="pointer-events-none absolute inset-0 hidden items-end bg-gradient-to-t from-[#13302a]/95 via-[#13302a]/60 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex">
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#C97F38]">
              <ListChecks className="h-3.5 w-3.5" /> Neste artigo
            </p>
            <ul className="space-y-1">
              {topics.map((t, i) => (
                <li
                  key={t.id}
                  className="translate-y-2 text-sm text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  style={{ transitionDelay: `${80 + i * 70}ms` }}
                >
                  → {t.title.replace(/^\d+\.\s*/, '')}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Meta post={post} />
        <h3 className="mt-3 font-display text-xl leading-snug text-[#1c1c10] transition-colors group-hover:text-[#27594F]">
          {post.title}
        </h3>
        <p className="mb-5 mt-2 line-clamp-2 text-sm leading-relaxed text-[#4c524b]">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between border-t border-[#d8d7cf] pt-5">
          <span className="flex items-center gap-2.5 text-xs text-[#1c1c10]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#27594F] font-display text-sm text-[#fcfae5]">
              {post.author.charAt(0)}
            </span>
            <span>
              <strong className="block font-semibold">{post.author}</strong>
              <span className="hidden text-[#4c524b] sm:block">{post.authorRole.replace(' na RUNA', '')}</span>
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-[#27594F]">
            Ler artigo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ---------------- Seção ---------------- */
export function BlogHighlights() {
  const posts = RUNA_BLOG_POSTS.filter((p) => p.status === 'published').slice(0, 3);
  if (posts.length === 0) return null;

  const enter = (delay = 0, amount = 0.25) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section id="blog" className="border-b border-[#d8d7cf] bg-[#fcfae5] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...enter()} className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Blog RUNA</span>
            <h2 className="font-display text-3xl leading-tight text-[#1c1c10] sm:text-4xl">
              O que mudou no Google e na Meta, explicado para quem decide.
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#27594F] hover:text-[#C97F38]"
          >
            Ver todos os artigos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* 3 artigos lado a lado; no celular, carrossel de deslizar */}
        <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
          {posts.map((p, i) => (
            <motion.div key={p.slug} {...enter(0.05 + i * 0.08, 0.01)} className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
              <PostCard post={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
