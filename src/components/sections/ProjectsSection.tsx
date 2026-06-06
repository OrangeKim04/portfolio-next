/**
 * ProjectsSection — 프로젝트 섹션
 * Design: "Dark Terminal × Tangerine Pulse"
 * - 필터 탭
 * - 카드 3D tilt hover
 * - staggered reveal
 */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Code2, ExternalLink, Star } from "lucide-react";

const THUMB_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663623383809/ZiuXtF6r9qxuu4WpJaGtpX/project-thumb-1-BVTnggJ7ZXJwKccGzcDR8J.webp";
const THUMB_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663623383809/ZiuXtF6r9qxuu4WpJaGtpX/project-thumb-2-AJsfk7G69qcSHSFzX7tqu8.webp";
const THUMB_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663623383809/ZiuXtF6r9qxuu4WpJaGtpX/project-thumb-3-AZEhFhRcddmKomjo9h2ngn.webp";

const projects = [
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
    tags: ["React", "Three.js", "TypeScript", "Vite"],
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

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  visible: boolean;
}

function ProjectCard({ project, index, visible }: ProjectCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || project.featured) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -6;
    const rotateY = ((x - rect.width / 2) / rect.width) * 6;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = project.featured
      ? "translateY(0)"
      : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  const linkStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    color: "rgba(226,232,240,0.6)",
    textDecoration: "none",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.8rem",
    transition: "color 0.2s ease",
  };

  const tags = (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
      {project.tags.map((tag) => (
        <span
          key={tag}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.63rem",
            color: "rgba(255,140,66,0.75)",
            border: "1px solid rgba(255,140,66,0.2)",
            padding: "0.15rem 0.5rem",
            borderRadius: "2px",
            background: "rgba(255,140,66,0.05)",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );

  const links = (
    <div style={{ display: "flex", gap: "0.75rem" }}>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        style={linkStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#FF8C42")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(226,232,240,0.6)")}
      >
        <Code2 size={14} />
        GitHub
      </a>
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#FFD166")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(226,232,240,0.6)")}
        >
          <ExternalLink size={14} />
          Demo
        </a>
      )}
    </div>
  );

  /* ── Featured: 가로형 히어로 카드 ── */
  if (project.featured) {
    return (
      <div
        ref={cardRef}
        onClick={() => router.push(`/project/${project.id}`)}
        onMouseLeave={handleMouseLeave}
        style={{
          gridColumn: "1 / -1",
          background: "rgba(17, 24, 39, 0.9)",
          border: "1px solid rgba(255,140,66,0.35)",
          borderRadius: "0.875rem",
          overflow: "hidden",
          cursor: "pointer",
          display: "flex",
          flexDirection: "row",
          transition: "border-color 0.15s ease, box-shadow 0.15s ease, transform 0.12s ease",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          boxShadow: "0 4px 24px rgba(255,140,66,0.06)",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,140,66,0.6)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 56px rgba(255,140,66,0.15)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        }}
        className="featured-card"
      >
        {/* 썸네일 — 좌측 40% */}
        <div
          style={{
            flex: "0 0 40%",
            minHeight: "240px",
            overflow: "hidden",
            position: "relative",
          }}
          className="featured-card-image"
        >
          <img
            src={project.thumb}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.2s ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, transparent 60%, rgba(17,24,39,0.95) 100%)",
            }}
          />
        </div>

        {/* 콘텐츠 — 우측 60% */}
        <div
          style={{
            flex: 1,
            padding: "2rem 2rem 2rem 1.75rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0.75rem",
          }}
        >
          {/* 배지 + 별 */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                background: "linear-gradient(135deg, #FF8C42, #FFD166)",
                color: "#0A0F1E",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.63rem",
                fontWeight: 700,
                padding: "0.2rem 0.65rem",
                borderRadius: "2px",
              }}
            >
              <Star size={9} fill="#0A0F1E" />
              FEATURED
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                color: "rgba(255,209,102,0.75)",
                fontSize: "0.7rem",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <Star size={10} />
              {project.stars}
            </div>
          </div>

          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.35rem",
              fontWeight: 700,
              color: "#E2E8F0",
              lineHeight: 1.25,
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontFamily: "'DM Sans', 'Noto Sans KR', sans-serif",
              fontSize: "0.875rem",
              color: "rgba(226,232,240,0.65)",
              lineHeight: 1.75,
            }}
          >
            {project.desc}
          </p>

          {tags}
          {links}
        </div>
      </div>
    );
  }

  /* ── 일반 카드 ── */
  return (
    <div
      ref={cardRef}
      onClick={() => router.push(`/project/${project.id}`)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "rgba(17, 24, 39, 0.8)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "0.75rem",
        overflow: "hidden",
        transition: "transform 0.12s ease, border-color 0.15s ease, box-shadow 0.15s ease",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${index * 0.08}s`,
        position: "relative",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,140,66,0.4)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(255,140,66,0.12)";
      }}
    >
      {/* 썸네일 */}
      <div style={{ height: "160px", overflow: "hidden", position: "relative" }}>
        <img
          src={project.thumb}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.2s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10,15,30,0.9) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* 콘텐츠 */}
      <div style={{ padding: "1.25rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "0.5rem",
          }}
        >
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#E2E8F0",
            }}
          >
            {project.title}
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              color: "rgba(255,209,102,0.7)",
              fontSize: "0.7rem",
              fontFamily: "'JetBrains Mono', monospace",
              flexShrink: 0,
              marginLeft: "0.5rem",
            }}
          >
            <Star size={10} />
            {project.stars}
          </div>
        </div>

        <p
          style={{
            fontFamily: "'DM Sans', 'Noto Sans KR', sans-serif",
            fontSize: "0.82rem",
            color: "rgba(226,232,240,0.6)",
            lineHeight: 1.7,
            marginBottom: "1rem",
          }}
        >
          {project.desc}
        </p>

        {tags}
        {links}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = filter === "all"
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        padding: "7rem 0",
        background: "linear-gradient(180deg, #0D1525 0%, #0A0F1E 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ maxWidth: "1100px" }}>
        {/* 섹션 헤더 */}
        <div
          style={{
            marginBottom: "3rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease",
          }}
        >
          <span className="section-label">// 03. projects</span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "#E2E8F0",
              marginTop: "0.5rem",
            }}
          >
            프로젝트
          </h2>
        </div>

        {/* 필터 탭 */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
          }}
        >
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                background: filter === f.id
                  ? "linear-gradient(135deg, #FF8C42, #FFD166)"
                  : "transparent",
                border: `1px solid ${filter === f.id ? "transparent" : "rgba(255,255,255,0.12)"}`,
                color: filter === f.id ? "#0A0F1E" : "rgba(226,232,240,0.6)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.82rem",
                fontWeight: filter === f.id ? 700 : 500,
                padding: "0.45rem 1.1rem",
                borderRadius: "0.375rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 프로젝트 그리드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
