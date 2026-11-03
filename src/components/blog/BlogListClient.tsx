'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BlogPost, formatBlogDate } from '@/config/blog';
import { ArrowRight, Calendar, Clock, Search, Tag, User } from 'lucide-react';

interface Props {
  posts: BlogPost[];
}

export function BlogListClient({ posts }: Props) {
  const [selectedTag, setSelectedTag] = useState<string>('Todos');
  const [query, setQuery] = useState('');

  const allTags = ['Todos', ...Array.from(new Set(posts.flatMap((p) => [p.category, ...p.tags])))];

  const filteredPosts = posts.filter((post) => {
    const matchesTag =
      selectedTag === 'Todos' ||
      post.category === selectedTag ||
      post.tags.includes(selectedTag);
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q));
    return matchesTag && matchesQuery;
  });

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="space-y-12">
      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-4 sm:p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {allTags.map((tag) => {
            const active = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#1e4840] text-[#fcfae5] shadow-sm'
                    : 'bg-[#E8E7DF] text-[#323630] hover:bg-[#d8d7cf]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a897c]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar assunto ou tag..."
            className="w-full rounded-xl border border-[#d8d7cf] bg-white py-2 pl-9 pr-3.5 text-sm text-[#1c1c10] placeholder:text-[#8a897c] focus:border-[#27594F] focus:outline-none"
          />
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-12 text-center">
          <p className="font-serif text-xl text-[#1c1c10]">
            Nenhum artigo encontrado para esse filtro.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedTag('Todos');
              setQuery('');
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#1e4840] px-4 py-2 text-xs font-semibold text-white"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <>
          {/* Featured Article Card */}
          {featuredPost && (
            <article className="group overflow-hidden rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] shadow-md transition-all hover:border-[#C97F38]/60 hover:shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="lg:col-span-7 relative block overflow-hidden bg-[#0D342C] flex items-center justify-center"
                >
                  <picture className="block w-full">
                    <source srcSet={featuredPost.cover.avif} type="image/avif" />
                    <source srcSet={featuredPost.cover.webp} type="image/webp" />
                    <img
                      src={featuredPost.cover.png}
                      alt={featuredPost.cover.alt}
                      width={featuredPost.cover.width}
                      height={featuredPost.cover.height}
                      loading="eager"
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </picture>
                </Link>

                <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs">
                      <span className="rounded-full bg-[#C97F38]/15 px-3 py-1 font-semibold uppercase tracking-wider text-[#b06b29]">
                        {featuredPost.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#4c524b]">
                        <Calendar className="h-3.5 w-3.5 text-[#C97F38]" />
                        {formatBlogDate(featuredPost.date)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#4c524b]">
                        <Clock className="h-3.5 w-3.5 text-[#27594F]" />
                        {featuredPost.readingTime}
                      </span>
                    </div>

                    <Link href={`/blog/${featuredPost.slug}`} className="block mt-4">
                      <h2 className="font-serif text-2xl sm:text-3xl font-medium leading-snug text-[#1c1c10] group-hover:text-[#27594F] transition-colors">
                        {featuredPost.title}
                      </h2>
                    </Link>

                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#4c524b]">
                      {featuredPost.excerpt}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {featuredPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 rounded-md border border-[#d8d7cf] bg-[#E8E7DF]/60 px-2.5 py-1 text-[11px] font-medium text-[#323630]"
                        >
                          <Tag className="h-3 w-3 text-[#C97F38]" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-[#d8d7cf] pt-5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1e4840] text-xs font-bold text-[#fcfae5]">
                        <User className="h-4 w-4 text-[#e59a54]" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#1c1c10]">
                          Por {featuredPost.author}
                        </div>
                        <div className="text-[11px] text-[#4c524b]">
                          {featuredPost.authorRole}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#1e4840] px-4 py-2.5 text-xs font-semibold text-[#fcfae5] transition-colors hover:bg-[#27594F]"
                    >
                      Ler artigo
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Secondary Grid (for future articles) */}
          {remainingPosts.length > 0 && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] shadow-sm transition-all hover:border-[#C97F38]/60 hover:shadow-md"
                >
                  <div>
                    <Link href={`/blog/${post.slug}`} className="block overflow-hidden bg-[#0D342C]">
                      <picture className="block w-full">
                        <source srcSet={post.cover.avif} type="image/avif" />
                        <source srcSet={post.cover.webp} type="image/webp" />
                        <img
                          src={post.cover.png}
                          alt={post.cover.alt}
                          width={post.cover.width}
                          height={post.cover.height}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </picture>
                    </Link>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-[#4c524b]">
                        <span className="font-semibold text-[#C97F38]">{post.category}</span>
                        <span>•</span>
                        <span>{formatBlogDate(post.date)}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="mt-2 block">
                        <h2 className="font-serif text-xl font-medium text-[#1c1c10] group-hover:text-[#27594F]">
                          {post.title}
                        </h2>
                      </Link>
                      <p className="mt-2 text-sm text-[#4c524b] line-clamp-3">{post.excerpt}</p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-3 border-t border-[#d8d7cf]/60 flex items-center justify-between text-xs font-semibold text-[#1e4840]">
                    <span>Por {post.author}</span>
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-[#C97F38] hover:underline">
                      Ler artigo <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
