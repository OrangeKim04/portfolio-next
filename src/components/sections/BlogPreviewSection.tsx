"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
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
  const { isDark, bg, bgCard, text, textFaint, cardBorder } = useThemeColors();

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

        {/* Posts — 2×2 균일 그리드 */}
        {!isLoading && posts.length > 0 && (
          <div className="grid grid-cols-2 gap-5 blog-sub-grid">
            {posts.map((post, i) => {
              const accent = categoryColors[post.category] ?? "#FF8C42";
              return (
                <article
                  key={post.id}
                  onClick={() => router.push(`/blog/${post.slug}`)}
                  className="rounded-xl overflow-hidden cursor-pointer flex flex-col transition-[border-color,box-shadow,transform,opacity,background]"
                  style={{
                    background: bgCard,
                    border: `1px solid ${cardBorder}`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(24px)",
                    transitionDuration: "0.15s, 0.15s, 0.15s, 0.55s, 0.35s",
                    transitionDelay: `0s, 0s, 0s, ${i * 0.08}s, 0s`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,140,66,0.4)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 36px rgba(255,140,66,0.1)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = cardBorder;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* 이미지 — 16:9 비율 고정 */}
                  {post.coverImage && (
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}

                  {/* 콘텐츠 */}
                  <div className="flex flex-col flex-1 p-5">
                    {/* 카테고리 + 날짜 */}
                    <div className="flex items-center justify-between mb-3">
                      {post.category && (
                        <span
                          className="font-mono text-[0.65rem] px-2 py-0.5 rounded-sm"
                          style={{ color: accent, border: `1px solid ${accent}40`, background: `${accent}10` }}
                        >
                          {post.category}
                        </span>
                      )}
                      <span className="font-mono text-[0.62rem]" style={{ color: textFaint }}>
                        {new Date(post.publishedAt).toLocaleDateString("ko-KR", { year: "numeric", month: "short", day: "numeric" })}
                      </span>
                    </div>

                    {/* 제목 */}
                    <h3
                      className="font-display font-semibold leading-snug line-clamp-2 transition-colors duration-350"
                      style={{ fontSize: "0.95rem", color: text }}
                    >
                      {post.title}
                    </h3>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
