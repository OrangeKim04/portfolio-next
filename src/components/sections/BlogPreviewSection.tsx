"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowRight, Tag, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc";
import { useThemeColors } from "@/contexts/ThemeContext";
import TerminalLoader from "@/components/TerminalLoader";

const categoryColors: Record<string, string> = {
  개인: "#FF8C42", backend: "#FF8C42", Backend: "#FF8C42",
  infra: "#4CAF50", Infra: "#4CAF50",
  architecture: "#64B5F6", Architecture: "#64B5F6",
  devops: "#A78BFA", DevOps: "#A78BFA",
  database: "#F472B6", Database: "#F472B6",
};

export default function BlogPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { isDark, bg, bgCard, text, textMuted, textFaint, border, cardBorder } = useThemeColors();

  const { data, isLoading } = trpc.blog.list.useQuery({ page: 1, limit: 4 });
  const posts = data?.posts ?? [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const featured = posts[0] ?? null;
  const rest = posts.slice(1, 4);

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="blog-preview-section relative overflow-hidden transition-[background] duration-350"
      style={{
        padding: "9rem 0 8rem",
        background: isDark
          ? "linear-gradient(180deg, #0A0F1E 0%, #0D1525 50%, #0A0F1E 100%)"
          : `linear-gradient(180deg, ${bg} 0%, #FFF4E0 50%, ${bg} 100%)`,
      }}
    >
      {/* Glow */}
      <div
        className="absolute top-[20%] right-[-10%] w-150 h-150 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,140,66,0.04) 0%, transparent 70%)" }}
      />

      <div className="container max-w-300">
        {/* Header */}
        <div
          className="flex justify-between items-end mb-14 flex-wrap gap-4 transition-[opacity,transform] duration-600"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          <div>
            <span className="section-label">// 04. blog_preview</span>
            <h2
              className="font-display font-bold mt-2 transition-colors duration-350"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: text }}
            >
              최근 글
            </h2>
          </div>
          <button
            onClick={() => router.push("/blogs")}
            className="flex items-center gap-1.5 bg-transparent border-none font-mono text-[0.72rem] cursor-pointer p-0 tracking-wider transition-[color,gap] duration-200"
            style={{ color: "rgba(255,140,66,0.7)" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#FF8C42"; e.currentTarget.style.gap = "0.5rem"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,140,66,0.7)"; e.currentTarget.style.gap = "0.375rem"; }}
          >
            전체 보기
            <ArrowRight size={12} />
          </button>
        </div>

        {/* Loading */}
        {isLoading && <TerminalLoader compact />}

        {/* Empty */}
        {!isLoading && posts.length === 0 && (
          <p
            className="text-center font-mono text-[0.8rem] py-20 transition-colors duration-350"
            style={{ color: textFaint }}
          >
            // 아직 게시된 글이 없습니다
          </p>
        )}

        {/* Posts */}
        {!isLoading && featured && (
          <div className="flex flex-col gap-6">
            {/* Featured */}
            <article
              onClick={() => router.push(`/blog/${featured.slug}`)}
              className="blog-featured-card flex rounded-2xl overflow-hidden cursor-pointer h-55 transition-[border-color,box-shadow,transform,opacity,background] duration-150"
              style={{
                background: bgCard,
                border: `1px solid ${cardBorder}`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transitionProperty: "border-color, box-shadow, transform, opacity, background",
                transitionDuration: "0.15s, 0.15s, 0.15s, 0.6s, 0.35s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(255,140,66,0.35)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(255,140,66,0.12)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = cardBorder;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {featured.coverImage && (
                <div className="blog-featured-image relative overflow-hidden" style={{ flex: "0 0 45%" }}>
                  <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover transition-transform duration-300" />
                  <div
                    className="absolute inset-0 transition-[background] duration-350"
                    style={{
                      background: isDark
                        ? "linear-gradient(to right, transparent 60%, rgba(17,24,39,0.6) 100%)"
                        : "linear-gradient(to right, transparent 60%, rgba(255,248,232,0.6) 100%)",
                    }}
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col justify-between p-6 px-8 min-w-0">
                <div>
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    {featured.category && (
                      <span
                        className="font-mono text-[0.68rem] px-2.5 py-1 rounded-sm"
                        style={{
                          color: categoryColors[featured.category] ?? "#FF8C42",
                          border: `1px solid ${(categoryColors[featured.category] ?? "#FF8C42")}40`,
                          background: `${(categoryColors[featured.category] ?? "#FF8C42")}10`,
                        }}
                      >
                        {featured.category}
                      </span>
                    )}
                  </div>
                  <h3
                    className="font-display font-bold leading-[1.35] mb-2.5 transition-colors duration-350"
                    style={{ fontSize: "clamp(1.05rem, 2vw, 1.35rem)", color: text }}
                  >
                    {featured.title}
                  </h3>
                  <p
                    className="font-sans text-[0.85rem] leading-[1.7] line-clamp-2 transition-colors duration-350"
                    style={{ color: textMuted }}
                  >
                    {featured.excerpt ?? ""}
                  </p>
                </div>
                <div
                  className="flex justify-between items-center mt-3 pt-3 transition-[border-color] duration-350"
                  style={{ borderTop: `1px solid ${border}` }}
                >
                  <span className="font-mono text-[0.65rem] transition-colors duration-350" style={{ color: textFaint }}>
                    {new Date(featured.publishedAt).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1.5 font-sans text-[0.8rem]" style={{ color: "rgba(255,140,66,0.7)" }}>
                    읽기 <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </article>

            {/* Sub grid */}
            {rest.length > 0 && (
              <div className="blog-sub-grid grid grid-cols-3 gap-6">
                {rest.map((post, i) => {
                  let tags: string[] = [];
                  try { tags = JSON.parse(post.tags ?? "[]"); } catch {}
                  const accent = categoryColors[post.category] ?? "#FF8C42";
                  return (
                    <article
                      key={post.id}
                      onClick={() => router.push(`/blog/${post.slug}`)}
                      className="rounded-xl overflow-hidden cursor-pointer transition-[border-color,box-shadow,transform,opacity,background]"
                      style={{
                        background: bgCard,
                        border: `1px solid ${cardBorder}`,
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(30px)",
                        transitionDuration: `0.15s, 0.15s, 0.15s, 0.6s, 0.35s`,
                        transitionDelay: `0s, 0s, 0s, ${(i + 1) * 0.1}s, 0s`,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,140,66,0.3)";
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(255,140,66,0.1)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = cardBorder;
                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      {post.coverImage && (
                        <div className="h-45 overflow-hidden">
                          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-200" />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-3.5">
                          {post.category && (
                            <span
                              className="font-mono text-[0.68rem] px-2.5 py-1 rounded-sm"
                              style={{ color: accent, border: `1px solid ${accent}40`, background: `${accent}10` }}
                            >
                              {post.category}
                            </span>
                          )}
                        </div>
                        <h3
                          className="font-display text-[1.05rem] font-semibold leading-[1.45] mb-3 transition-colors duration-350"
                          style={{ color: text }}
                        >
                          {post.title}
                        </h3>
                        <p
                          className="font-sans text-[0.85rem] leading-[1.75] line-clamp-2 transition-colors duration-350"
                          style={{ color: textMuted, marginBottom: tags.length ? "1rem" : 0 }}
                        >
                          {post.excerpt ?? ""}
                        </p>
                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {tags.map(tag => (
                              <span
                                key={tag}
                                className="flex items-center gap-1 font-mono text-[0.62rem] transition-colors duration-350"
                                style={{ color: textFaint }}
                              >
                                <Tag size={8} />{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div
                          className="flex justify-between items-center pt-3.5 transition-[border-color] duration-350"
                          style={{ borderTop: `1px solid ${border}` }}
                        >
                          <span className="font-mono text-[0.63rem] transition-colors duration-350" style={{ color: textFaint }}>
                            {new Date(post.publishedAt).toLocaleDateString("ko-KR", { year: "numeric", month: "short", day: "numeric" })}
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
