"use client";

import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { useRouter } from "next/navigation";
import { Search, Eye, Heart, Calendar, ArrowLeft } from "lucide-react";
import { useThemeColors } from "@/contexts/ThemeContext";
import TerminalLoader from "@/components/TerminalLoader";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string;
  tags: string | null;
  publishedAt: Date;
  readingTime: number | null;
  viewCount: number | null;
  likes: number | null;
  coverImage: string | null;
}

const categoryColors: Record<string, string> = {
  개인: "#FF8C42",
  backend: "#FF8C42",
  infra: "#4CAF50",
  architecture: "#64B5F6",
  devops: "#A78BFA",
  database: "#F472B6",
};

export default function AllBlogs() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const { isDark, bg, bgCard, text, textMuted, textFaint, border, cardBorder } = useThemeColors();

  const sentinelRef = useRef<HTMLDivElement>(null);
  const canLoadMoreRef = useRef(false);
  const processedRef = useRef("");
  const isPagingRef = useRef(false);

  const { data: blogData, isLoading, isFetching } = trpc.blog.list.useQuery(
    { page, limit: 10, category: selectedCategory },
    { enabled: !searchQuery }
  );

  const { data: categories } = trpc.blog.categories.useQuery();

  const { data: searchResults, isLoading: isSearching } = trpc.blog.search.useQuery(
    { query: searchQuery, limit: 20 },
    { enabled: searchQuery.length > 0 }
  );

  useEffect(() => {
    if (!isFetching && blogData?.posts) {
      const key = `${page}|${selectedCategory ?? "all"}`;
      if (processedRef.current !== key) {
        processedRef.current = key;
        setAllPosts(prev =>
          page === 1 ? [...blogData.posts] : [...prev, ...blogData.posts]
        );
      }
      isPagingRef.current = false;
    }
  }, [isFetching, blogData, page, selectedCategory]);

  useEffect(() => {
    setPage(1);
    setAllPosts([]);
    processedRef.current = "";
    isPagingRef.current = false;
  }, [selectedCategory]);

  useEffect(() => {
    setPage(1);
    setAllPosts([]);
    processedRef.current = "";
    isPagingRef.current = false;
  }, [searchQuery]);

  const hasNextPage =
    !!blogData?.pagination && page < blogData.pagination.pages && !searchQuery;
  canLoadMoreRef.current = !isFetching && hasNextPage;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && canLoadMoreRef.current && !isPagingRef.current) {
          isPagingRef.current = true;
          setPage(prev => prev + 1);
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const displayPosts: BlogPost[] = searchQuery && searchResults
    ? searchResults
    : allPosts.length > 0 ? allPosts : (blogData?.posts ?? []);
  const isInitialLoading = ((isLoading || isFetching) && displayPosts.length === 0) || isSearching;
  const isLoadingMore = isFetching && page > 1;

  if (isInitialLoading) return <TerminalLoader />;

  return (
    <div
      className="min-h-screen transition-[background,color] duration-[350ms]"
      style={{ background: bg, color: text, paddingTop: "64px" }}
    >
      <div className="allblogs-container max-w-[900px] mx-auto px-5 pt-[100px] pb-[80px]">

        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-1.5 bg-transparent border-none cursor-pointer mb-6 p-0 font-mono text-[0.75rem] transition-colors duration-200"
            style={{ color: "rgba(255,140,66,0.6)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#FF8C42")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,140,66,0.6)")}
          >
            <ArrowLeft size={14} />
            홈으로
          </button>
          <span className="section-label mb-2">// 04. blog</span>
          <h1
            className="font-display font-bold mb-3 transition-colors duration-[350ms]"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: text }}
          >
            블로그
          </h1>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "rgba(255,140,66,0.5)" }}
          />
          <input
            type="text"
            placeholder="블로그 검색..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-[0.9rem] rounded-lg outline-none font-sans box-border transition-[border-color,background,color] duration-[350ms]"
            style={{
              background: bgCard,
              border: `1px solid ${border}`,
              color: text,
            }}
            onFocus={e => { e.currentTarget.style.borderColor = "rgba(255,140,66,0.5)"; }}
            onBlur={e => { e.currentTarget.style.borderColor = border; }}
          />
        </div>

        {/* Category Filter */}
        {!searchQuery && (
          <div className="flex gap-2 flex-wrap mb-10">
            {categories?.map(cat => {
              const isActive = selectedCategory === cat.id || (!selectedCategory && cat.id === "all");
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id === "all" ? undefined : cat.id)}
                  className="px-4 py-1.5 text-[0.82rem] font-sans rounded-md cursor-pointer transition-all duration-200"
                  style={{
                    fontWeight: isActive ? 700 : 500,
                    background: isActive ? "linear-gradient(135deg, #FF8C42, #FFD166)" : "transparent",
                    color: isActive ? "#0A0F1E" : textMuted,
                    border: `1px solid ${isActive ? "transparent" : border}`,
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        )}

        {/* Post List */}
        {displayPosts.length === 0 ? (
          <div
            className="text-center py-20 font-mono text-[0.85rem] transition-colors duration-[350ms]"
            style={{ color: textFaint }}
          >
            {searchQuery ? "// 검색 결과 없음" : "// 포스트 없음"}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {displayPosts.map(post => {
              const accent = categoryColors[post.category] ?? "#FF8C42";
              return (
                <article
                  key={post.id}
                  className="blog-list-card flex gap-5 p-5 rounded-xl cursor-pointer transition-[border-color,box-shadow,transform,background] duration-150"
                  onClick={() => router.push(`/blog/${post.slug}`)}
                  style={{
                    background: bgCard,
                    border: `1px solid ${cardBorder}`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(255,140,66,0.5)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(255,140,66,0.08)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = cardBorder;
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {post.coverImage && (
                    <div className="blog-list-thumbnail shrink-0 w-[110px] self-stretch rounded-lg overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-2.5 flex-wrap gap-2">
                      {post.category && (
                        <span
                          className="font-mono text-[0.68rem] px-2.5 py-1 rounded-sm"
                          style={{
                            color: accent,
                            border: `1px solid ${accent}40`,
                            background: `${accent}10`,
                          }}
                        >
                          {post.category}
                        </span>
                      )}
                      <div
                        className="meta-row flex gap-4 font-mono text-[0.68rem] transition-colors duration-[350ms]"
                        style={{ color: textFaint }}
                      >
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          {new Date(post.publishedAt).toLocaleDateString("ko-KR", { year: "numeric", month: "short", day: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={10} />{post.viewCount || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart size={10} />{post.likes || 0}
                        </span>
                      </div>
                    </div>

                    <h2
                      className="font-display text-[1.1rem] font-semibold mb-2 leading-snug transition-colors duration-[350ms]"
                      style={{ color: text }}
                    >
                      {post.title}
                    </h2>

                    <p
                      className="font-sans text-[0.875rem] leading-[1.75] mb-0 line-clamp-2 transition-colors duration-[350ms]"
                      style={{
                        color: textMuted,
                        marginBottom: post.tags ? "1rem" : 0,
                      }}
                    >
                      {post.excerpt ?? ""}
                    </p>

                    {post.tags && (() => {
                      try {
                        const parsed: string[] = JSON.parse(post.tags);
                        return (
                          <div className="flex gap-1.5 flex-wrap">
                            {parsed.map((tag, idx) => (
                              <span
                                key={idx}
                                className="font-mono text-[0.63rem] px-2 py-[0.15rem] rounded-sm"
                                style={{
                                  color: isDark ? "rgba(255,209,102,0.75)" : "rgba(160,100,0,0.85)",
                                  border: `1px solid ${isDark ? "rgba(255,209,102,0.2)" : "rgba(160,100,0,0.3)"}`,
                                  background: isDark ? "rgba(255,209,102,0.06)" : "rgba(160,100,0,0.07)",
                                }}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        );
                      } catch { return null; }
                    })()}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div ref={sentinelRef} className="h-px" />

        {isLoadingMore && (
          <div className="text-center py-8">
            <div
              className="inline-block w-7 h-7 rounded-full animate-spin"
              style={{ border: "2px solid rgba(255,255,255,0.08)", borderTop: "2px solid #FF8C42" }}
            />
          </div>
        )}

        {!isLoadingMore && !hasNextPage && allPosts.length > 0 && !searchQuery && (
          <div
            className="text-center py-8 font-mono text-[0.7rem] tracking-[0.1em]"
            style={{ color: "rgba(255,140,66,0.35)" }}
          >
            // end of posts
          </div>
        )}
      </div>
    </div>
  );
}
