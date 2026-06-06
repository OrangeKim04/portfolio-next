"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Star, Search } from "lucide-react";

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
import { useState, useEffect } from "react";

const THUMB_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663623383809/ZiuXtF6r9qxuu4WpJaGtpX/project-thumb-1-BVTnggJ7ZXJwKccGzcDR8J.webp";
const THUMB_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663623383809/ZiuXtF6r9qxuu4WpJaGtpX/project-thumb-2-AJsfk7G69qcSHSFzX7tqu8.webp";
const THUMB_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663623383809/ZiuXtF6r9qxuu4WpJaGtpX/project-thumb-3-AZEhFhRcddmKomjo9h2ngn.webp";

interface Project {
  id: number;
  title: string;
  desc: string;
  tags: string[];
  category: string;
  github: string;
  demo: string | null;
  thumb: string;
  featured: boolean;
  stars: number;
}

const projects: Project[] = [
  {
    id: 1,
    title: "MSA Order Platform",
    desc: "Spring Boot 기반 마이크로서비스 주문 플랫폼. Kafka 이벤트 스트리밍, Redis 캐싱, JWT 인증 구현.",
    tags: ["Spring Boot", "Kafka", "Redis", "Docker", "MySQL"],
    category: "backend",
    github: "https://github.com",
    demo: null,
    thumb: THUMB_1,
    featured: true,
    stars: 42,
  },
  {
    id: 2,
    title: "Real-Time Chat API",
    desc: "WebSocket 기반 실시간 채팅 서버. 룸 관리, 메시지 히스토리, 읽음 처리 기능 포함.",
    tags: ["FastAPI", "WebSocket", "MongoDB", "Redis"],
    category: "backend",
    github: "https://github.com",
    demo: "https://demo.example.com",
    thumb: THUMB_2,
    featured: false,
    stars: 28,
  },
  {
    id: 3,
    title: "K8s Infra Automation",
    desc: "Terraform + Helm으로 구성된 Kubernetes 클러스터 자동화 도구. CI/CD 파이프라인 포함.",
    tags: ["Kubernetes", "Terraform", "Helm", "GitHub Actions", "AWS"],
    category: "infra",
    github: "https://github.com",
    demo: null,
    thumb: THUMB_3,
    featured: false,
    stars: 35,
  },
  {
    id: 4,
    title: "Dev Blog API",
    desc: "Notion API 연동 블로그 백엔드. ISR 렌더링, Giscus 댓글, SEO 최적화 구현.",
    tags: ["Next.js", "Notion API", "TypeScript", "Vercel"],
    category: "fullstack",
    github: "https://github.com",
    demo: "https://blog.example.com",
    thumb: THUMB_1,
    featured: false,
    stars: 19,
  },
  {
    id: 5,
    title: "Auth Service",
    desc: "OAuth2 + JWT 기반 인증 서비스. 소셜 로그인, 토큰 갱신, 권한 관리 기능.",
    tags: ["Spring Security", "OAuth2", "JWT", "PostgreSQL"],
    category: "backend",
    github: "https://github.com",
    demo: null,
    thumb: THUMB_2,
    featured: false,
    stars: 31,
  },
  {
    id: 6,
    title: "Portfolio Site",
    desc: "Three.js 3D 귤 애니메이션이 포함된 개인 포트폴리오 웹사이트. 이 사이트입니다!",
    tags: ["React", "Three.js", "TypeScript", "Next.js"],
    category: "side",
    github: "https://github.com",
    demo: "#",
    thumb: THUMB_3,
    featured: false,
    stars: 12,
  },
];

const filters = [
  { id: "all", label: "전체" },
  { id: "backend", label: "백엔드" },
  { id: "fullstack", label: "풀스택" },
  { id: "infra", label: "인프라" },
  { id: "side", label: "사이드" },
];

const sorts = [
  { id: "featured", label: "Featured 순" },
  { id: "stars", label: "⭐ 많은 순" },
  { id: "recent", label: "최신 순" },
];

export default function AllProjects() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [sort, setSortBy] = useState("featured");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => { setVisible(true); }, []);

  const filtered = projects
    .filter(p => {
      const matchCategory = filter === "all" || p.category === filter;
      const matchSearch =
        search === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sort === "featured") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      if (sort === "stars") return b.stars - a.stars;
      return 0;
    });

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", color: "#E2E8F0", paddingTop: "64px" }}>
      <div style={{
        background: "rgba(17, 24, 39, 0.8)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "1.5rem 0",
        position: "sticky",
        top: "64px",
        zIndex: 40,
      }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <button
            onClick={() => router.push("/")}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              color: "#FF8C42", background: "none", border: "none",
              cursor: "pointer", fontSize: "0.9rem",
              fontFamily: "'Space Grotesk', sans-serif", transition: "all 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateX(-4px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateX(0)")}
          >
            <ArrowLeft size={16} />
            돌아가기
          </button>
        </div>
      </div>

      <div className="container" style={{ maxWidth: "1100px", padding: "3rem 1rem" }}>
        <div style={{ marginBottom: "2rem", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.6s ease" }}>
          <span className="section-label">// all_projects</span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, marginTop: "0.5rem" }}>
            모든 프로젝트
          </h1>
        </div>

        <div style={{ marginBottom: "2rem", opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "0.5rem", padding: "0.75rem 1rem",
          }}>
            <Search size={18} color="rgba(255,140,66,0.5)" />
            <input
              type="text"
              placeholder="프로젝트 검색..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1, background: "none", border: "none",
                color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem", outline: "none",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap", opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  background: filter === f.id ? "linear-gradient(135deg, #FF8C42, #FFD166)" : "transparent",
                  border: `1px solid ${filter === f.id ? "transparent" : "rgba(255,255,255,0.12)"}`,
                  color: filter === f.id ? "#0A0F1E" : "rgba(226,232,240,0.6)",
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.82rem",
                  fontWeight: filter === f.id ? 700 : 500,
                  padding: "0.45rem 1.1rem", borderRadius: "0.375rem",
                  cursor: "pointer", transition: "all 0.2s ease",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {sorts.map(s => (
              <button
                key={s.id}
                onClick={() => setSortBy(s.id)}
                style={{
                  background: sort === s.id ? "rgba(255,140,66,0.15)" : "transparent",
                  border: `1px solid ${sort === s.id ? "rgba(255,140,66,0.5)" : "rgba(255,255,255,0.1)"}`,
                  color: sort === s.id ? "#FF8C42" : "rgba(226,232,240,0.5)",
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem",
                  padding: "0.4rem 0.9rem", borderRadius: "0.375rem",
                  cursor: "pointer", transition: "all 0.2s ease",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {filtered.map((project, i) => (
            <div
              key={project.id}
              onClick={() => router.push(`/project/${project.id}`)}
              style={{
                background: "rgba(17, 24, 39, 0.8)",
                border: `1px solid ${project.featured ? "rgba(255,140,66,0.3)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "0.75rem", overflow: "hidden", cursor: "pointer",
                transition: "all 0.3s ease",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${i * 0.05}s`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,140,66,0.4)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(255,140,66,0.12)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = project.featured ? "rgba(255,140,66,0.3)" : "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{ height: "180px", overflow: "hidden", position: "relative" }}>
                <img
                  src={project.thumb}
                  alt={project.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,15,30,0.95) 0%, transparent 60%)" }} />
                {project.featured && (
                  <div style={{
                    position: "absolute", top: "0.75rem", right: "0.75rem",
                    background: "linear-gradient(135deg, #FF8C42, #FFD166)", color: "#0A0F1E",
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", fontWeight: 700,
                    padding: "0.2rem 0.6rem", borderRadius: "2px",
                    display: "flex", alignItems: "center", gap: "0.25rem",
                  }}>
                    <Star size={10} fill="#0A0F1E" />
                    FEATURED
                  </div>
                )}
              </div>

              <div style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#E2E8F0" }}>
                    {project.title}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "rgba(255,209,102,0.7)", fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace" }}>
                    <Star size={10} />{project.stars}
                  </div>
                </div>

                <p style={{
                  fontFamily: "'DM Sans', 'Noto Sans KR', sans-serif", fontSize: "0.82rem",
                  color: "rgba(226,232,240,0.6)", lineHeight: 1.7, marginBottom: "1rem",
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                  {project.desc}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem",
                      color: "rgba(255,140,66,0.7)", border: "1px solid rgba(255,140,66,0.2)",
                      padding: "0.15rem 0.5rem", borderRadius: "2px", background: "rgba(255,140,66,0.05)",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "0.75rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "rgba(226,232,240,0.6)", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", transition: "color 0.2s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#FF8C42")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(226,232,240,0.6)")}
                  >
                    <GithubIcon size={14} />
                    GitHub
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "rgba(226,232,240,0.6)", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", transition: "color 0.2s ease" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#FFD166")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(226,232,240,0.6)")}
                    >
                      <ExternalLink size={14} />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 2rem", color: "rgba(226,232,240,0.4)" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              검색 결과가 없습니다.
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}>
              다른 검색어나 필터를 시도해보세요.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
