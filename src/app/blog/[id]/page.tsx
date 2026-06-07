"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Eye, Heart, Share2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { useThemeColors } from "@/contexts/ThemeContext";
import TerminalLoader from "@/components/TerminalLoader";
import categoryColors from "@/lib/categoryColors";

const toHeadingId = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9가-힣\s]/g, "").replace(/\s+/g, "-").trim();

export default function BlogDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [tocItems, setTocItems] = useState<Array<{ level: number; text: string; id: string }>>([]);
  const [activeId, setActiveId] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);
  const { isDark, bg, bgCard, text, textMuted, textFaint, border, navBg } = useThemeColors();

  const slug = params?.id ?? "";

  const { data: post, isLoading, error } = trpc.blog.getBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  useEffect(() => {
    if (!post?.content) return;
    const timer = setTimeout(() => {
      if (!contentRef.current) return;
      const headings = contentRef.current.querySelectorAll("h1, h2, h3");
      const items: Array<{ level: number; text: string; id: string }> = [];
      headings.forEach(el => {
        const t = (el.textContent ?? "").trim();
        const id = toHeadingId(t);
        el.id = id;
        items.push({ level: parseInt(el.tagName[1], 10), text: t, id });
      });
      setTocItems(items);
    }, 50);
    return () => clearTimeout(timer);
  }, [post?.content]);

  // 스크롤 스파이 — 뷰포트 상단 20% 구간에 들어온 헤딩을 활성화
  useEffect(() => {
    if (tocItems.length === 0) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-10% 0px -80% 0px" }
    );
    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tocItems]);

  const likeMutation = trpc.blog.like.useMutation({
    onSuccess: () => { setLiked(true); toast.success("좋아요!"); },
  });
  const unlikeMutation = trpc.blog.unlike.useMutation({
    onSuccess: () => { setLiked(false); },
  });

  const handleLike = () => {
    if (!post) return;
    if (liked) unlikeMutation.mutate({ slug: post.slug });
    else likeMutation.mutate({ slug: post.slug });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("링크가 복사되었습니다!");
  };

  if (isLoading) return <TerminalLoader />;

  if (error || !post) {
    return (
      <div
        className="min-h-screen p-8 pt-20 transition-[background] duration-350"
        style={{ background: bg }}
      >
        <div className="container max-w-275">
          <button
            onClick={() => router.push("/blogs")}
            className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer p-0 font-mono text-[0.75rem] transition-colors duration-200"
            style={{ color: "rgba(255,140,66,0.65)" }}
          >
            <ArrowLeft size={16} />
            블로그로 돌아가기
          </button>
          <p className="text-base font-sans mt-4" style={{ color: text }}>
            포스트를 찾을 수 없습니다.
          </p>
        </div>
      </div>
    );
  }

  let tags: string[] = [];
  try { tags = JSON.parse(post.tags ?? "[]"); } catch {}

  const accentColor = categoryColors[post.category.toLowerCase()] ?? "#FF8C42";

  return (
    <div
      className="min-h-screen transition-[background,color] duration-350"
      style={{ background: bg, color: text, paddingTop: "64px" }}
      data-color-mode={isDark ? "dark" : "light"}
    >
      {/* Back bar */}
      <div
        className="transition-[background,border-color] duration-350"
        style={{
          background: navBg,
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${border}`,
          padding: "1rem 0",
        }}
      >
        <div className="max-w-300 mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => router.push("/blogs")}
            className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer p-0 font-mono text-[0.75rem] transition-colors duration-200"
            style={{ color: "rgba(255,140,66,0.65)" }}
          >
            <ArrowLeft size={16} />
            블로그
          </button>
        </div>
      </div>

      {/* Content grid */}
      <div
        className="blog-detail-grid max-w-350 mx-auto px-10 py-12 grid gap-8 items-start"
        style={{ gridTemplateColumns: tocItems.length > 0 ? "1fr 220px" : "1fr" }}
      >
        <article className="min-w-0">
          {post.coverImage && (
            <div className="blog-cover-image rounded-xl overflow-hidden mb-8 h-70">
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="mb-7">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span
                className="font-mono text-[0.68rem] px-2.5 py-1 rounded-sm"
                style={{
                  color: accentColor,
                  border: `1px solid ${accentColor}40`,
                  background: `${accentColor}10`,
                }}
              >
                {post.category}
              </span>
              <span
                className="font-mono text-[0.72rem] flex items-center gap-1 transition-colors duration-350"
                style={{ color: textFaint }}
              >
                <Eye size={11} /> {post.viewCount ?? 0}
              </span>
            </div>

            <h1
              className="font-display font-bold leading-tight mb-4 transition-colors duration-350"
              style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", color: text }}
            >
              {post.title}
            </h1>

            <div className="flex items-center gap-5 flex-wrap">
              <span
                className="font-mono text-[0.72rem] flex items-center gap-1.5 transition-colors duration-350"
                style={{ color: textFaint }}
              >
                <Calendar size={13} />
                {new Date(post.publishedAt).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <span className="font-mono text-[0.72rem] transition-colors duration-350" style={{ color: textFaint }}>
                by {post.author ?? "김규리"}
              </span>
            </div>
          </div>

          <div
            ref={contentRef}
            className="font-sans text-base leading-[1.85] transition-colors duration-350"
            style={{ color: textMuted }}
          >
            <MDEditor.Markdown
              source={post.content ?? ""}
              style={{ background: "transparent", color: textMuted, transition: "color 0.35s ease" }}
            />
          </div>

          {tags.length > 0 && (
            <div
              className="mt-10 pt-7 flex flex-wrap gap-2 transition-[border-color] duration-350"
              style={{ borderTop: `1px solid ${border}` }}
            >
              {tags.map(tag => (
                <span
                  key={tag}
                  className="font-mono text-[0.68rem] px-3 py-1 rounded-sm"
                  style={{
                    color: "rgba(255,140,66,0.75)",
                    border: "1px solid rgba(255,140,66,0.2)",
                    background: "rgba(255,140,66,0.05)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Like / Share */}
          <div
            className="mt-8 flex gap-3 p-5 rounded-lg transition-[background,border-color] duration-350"
            style={{ background: bgCard, border: `1px solid ${border}` }}
          >
            <button
              onClick={handleLike}
              className="flex items-center gap-2 font-sans text-[0.85rem] px-4 py-[0.45rem] rounded-md transition-all duration-200"
              style={{
                background: liked ? "rgba(255,140,66,0.12)" : "transparent",
                border: `1px solid ${liked ? "rgba(255,140,66,0.4)" : border}`,
                color: liked ? "#FF8C42" : textMuted,
                cursor: liked ? "default" : "pointer",
              }}
            >
              <Heart size={15} fill={liked ? "#FF8C42" : "none"} />
              {(post.likes ?? 0) + (liked ? 1 : 0)}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-transparent font-sans text-[0.85rem] px-4 py-[0.45rem] rounded-md cursor-pointer transition-all duration-200"
              style={{ border: `1px solid ${border}`, color: textMuted }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)";
                (e.currentTarget as HTMLElement).style.color = text;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = border;
                (e.currentTarget as HTMLElement).style.color = textMuted;
              }}
            >
              <Share2 size={15} />
              공유
            </button>
          </div>
        </article>

        {/* TOC */}
        {tocItems.length > 0 && (
          <aside
            className="sticky top-32 max-h-[calc(100vh-152px)] overflow-y-auto"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,140,66,0.25) transparent" }}
          >
            <div
              className="p-5 rounded-lg transition-[background,border-color] duration-350"
              style={{ background: bgCard, border: `1px solid ${border}` }}
            >
              <h4 className="font-mono text-[0.7rem] font-semibold tracking-[0.12em] mb-4 text-tangerine">
                // 목차
              </h4>
              <nav className="flex flex-col gap-1.5">
                {tocItems.map(item => {
                  const isActive = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        const el = document.getElementById(item.id);
                        if (el) {
                          window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: "smooth" });
                          history.replaceState(null, "", `#${item.id}`);
                        }
                      }}
                      className="bg-transparent border-none font-sans text-[0.8rem] text-left cursor-pointer py-1 pr-0 w-full transition-[color,border-color,font-weight] duration-150"
                      style={{
                        color: isActive ? "#FF8C42" : textMuted,
                        fontWeight: isActive ? 600 : 400,
                        paddingLeft: `calc(0.6rem + ${(item.level - 1) * 0.875}rem)`,
                        borderLeft: `2px solid ${isActive ? "#FF8C42" : item.level === 1 ? "rgba(255,140,66,0.25)" : border}`,
                      }}
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#FF8C42"; }}
                      onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = textMuted; }}
                    >
                      {item.text}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
