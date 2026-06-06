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

        {/* Posts — 텍스트 리스트 */}
        {!isLoading && posts.length > 0 && (
          <div className="flex flex-col gap-3">
            {posts.map((post, i) => {
              const accent = categoryColors[post.category] ?? "#FF8C42";
              return (
                <article
                  key={post.id}
                  onClick={() => router.push(`/blog/${post.slug}`)}
                  className="group flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer transition-[border-color,box-shadow,background,opacity,transform]"
                  style={{
                    background: bgCard,
                    border: `1px solid ${cardBorder}`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-16px)",
                    transitionDuration: "0.2s, 0.2s, 0.35s, 0.5s, 0.5s",
                    transitionDelay: `0s, 0s, 0s, ${i * 0.08}s, ${i * 0.08}s`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${accent}60`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${accent}18`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = cardBorder;
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* 카테고리 색상 도트 */}
                  <div
                    className="shrink-0 w-2 h-2 rounded-full"
                    style={{ background: accent, boxShadow: `0 0 6px ${accent}80` }}
                  />

                  {/* 제목 */}
                  <h3
                    className="flex-1 font-sans font-medium leading-snug line-clamp-1 transition-colors duration-200 min-w-0"
                    style={{ fontSize: "0.92rem", color: text }}
                  >
                    {post.title}
                  </h3>

                  {/* 카테고리 + 날짜 */}
                  <div className="shrink-0 flex items-center gap-3">
                    {post.category && (
                      <span
                        className="hidden sm:block font-mono text-[0.63rem] px-2 py-0.5 rounded-sm"
                        style={{ color: accent, border: `1px solid ${accent}40`, background: `${accent}10` }}
                      >
                        {post.category}
                      </span>
                    )}
                    <span className="font-mono text-[0.62rem] whitespace-nowrap" style={{ color: textFaint }}>
                      {new Date(post.publishedAt).toLocaleDateString("ko-KR", { month: "short", day: "numeric" })}
                    </span>
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
