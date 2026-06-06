"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Calendar, Users, Code2 } from "lucide-react";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
import { useEffect, useState } from "react";

interface ProjectDetailData {
  id: number;
  title: string;
  desc: string;
  fullDesc: string;
  tags: string[];
  category: string;
  github: string;
  demo: string | null;
  thumb: string;
  featured: boolean;
  stars: number;
  date: string;
  team?: string;
  role: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  techStack: Array<{ name: string; reason: string }>;
}

const projectsData: Record<number, ProjectDetailData> = {
  1: {
    id: 1,
    title: "MSA Order Platform",
    desc: "Spring Boot 기반 마이크로서비스 주문 플랫폼. Kafka 이벤트 스트리밍, Redis 캐싱, JWT 인증 구현.",
    fullDesc: "확장 가능한 마이크로서비스 아키텍처로 설계된 전자상거래 주문 플랫폼입니다. 각 서비스는 독립적으로 배포 가능하며, 이벤트 기반 통신으로 느슨한 결합을 유지합니다.",
    tags: ["Spring Boot", "Kafka", "Redis", "Docker", "MySQL"],
    category: "backend",
    github: "https://github.com",
    demo: null,
    thumb: "https://d2xsxph8kpxj0f.cloudfront.net/310519663623383809/ZiuXtF6r9qxuu4WpJaGtpX/project-thumb-1-BVTnggJ7ZXJwKccGzcDR8J.webp",
    featured: true,
    stars: 42,
    date: "2025.12 - 2026.03",
    team: "5명 (백엔드 3명, 프론트엔드 2명)",
    role: "백엔드 리드 개발자",
    challenges: [
      "마이크로서비스 간 트랜잭션 일관성 유지",
      "높은 동시성 환경에서의 성능 최적화",
      "서비스 간 통신 지연 최소화",
    ],
    solutions: [
      "Saga 패턴으로 분산 트랜잭션 구현",
      "Redis 캐싱 및 데이터베이스 인덱싱 최적화",
      "gRPC를 활용한 고속 통신 채널 구축",
    ],
    results: [
      "API 응답 시간 60% 단축 (평균 800ms → 320ms)",
      "동시 사용자 수 10배 증가 대응 (1,000 → 10,000)",
      "서비스 가용성 99.95% 달성",
    ],
    techStack: [
      { name: "Spring Boot 3.x", reason: "고성능 마이크로서비스 프레임워크" },
      { name: "Apache Kafka", reason: "이벤트 스트리밍 및 비동기 처리" },
      { name: "Redis", reason: "세션/캐시 관리 및 분산 락" },
      { name: "MySQL 8.0", reason: "트랜잭션 관리 및 데이터 일관성" },
      { name: "Docker & Kubernetes", reason: "컨테이너 오케스트레이션" },
    ],
  },
  2: {
    id: 2,
    title: "Real-Time Chat API",
    desc: "WebSocket 기반 실시간 채팅 서버. 룸 관리, 메시지 히스토리, 읽음 처리 기능 포함.",
    fullDesc: "WebSocket을 활용한 저지연 실시간 채팅 시스템입니다. 메시지 전달 보장, 읽음 상태 동기화, 채팅방 권한 관리 등 프로덕션 레벨의 기능을 포함합니다.",
    tags: ["FastAPI", "WebSocket", "MongoDB", "Redis"],
    category: "backend",
    github: "https://github.com",
    demo: "https://demo.example.com",
    thumb: "https://d2xsxph8kpxj0f.cloudfront.net/310519663623383809/ZiuXtF6r9qxuu4WpJaGtpX/project-thumb-2-AJsfk7G69qcSHSFzX7tqu8.webp",
    featured: false,
    stars: 28,
    date: "2025.08 - 2025.11",
    team: "3명 (백엔드 2명, QA 1명)",
    role: "백엔드 개발자",
    challenges: [
      "WebSocket 연결 상태 관리 및 자동 재연결",
      "메시지 순서 보장 및 중복 제거",
      "대규모 동시 연결 처리",
    ],
    solutions: [
      "Connection pool 및 heartbeat 메커니즘 구현",
      "메시지 ID 기반 중복 제거 로직",
      "Redis pub/sub을 활용한 수평 확장",
    ],
    results: [
      "10,000+ 동시 연결 안정적 처리",
      "메시지 전달 지연 평균 50ms 이하",
      "99.9% 메시지 전달 보장율",
    ],
    techStack: [
      { name: "FastAPI", reason: "비동기 처리 및 WebSocket 지원" },
      { name: "MongoDB", reason: "메시지 히스토리 저장" },
      { name: "Redis", reason: "pub/sub 및 세션 관리" },
    ],
  },
};

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<ProjectDetailData | null>(null);

  useEffect(() => {
    const id = params?.id;
    if (id) {
      const projectId = parseInt(id);
      setProject(projectsData[projectId] || null);
    }
  }, [params?.id]);

  if (!project) {
    return (
      <div style={{ minHeight: "100vh", background: "#0A0F1E", padding: "2rem", paddingTop: "80px" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <button
            onClick={() => router.push("/projects")}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              color: "#FF8C42", background: "none", border: "none",
              cursor: "pointer", fontSize: "0.9rem",
              fontFamily: "'Space Grotesk', sans-serif", marginBottom: "2rem",
            }}
          >
            <ArrowLeft size={16} />
            프로젝트로 돌아가기
          </button>
          <div style={{ color: "#E2E8F0", fontSize: "1.2rem" }}>프로젝트를 찾을 수 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", color: "#E2E8F0", paddingTop: "64px" }}>
      <div style={{
        background: "rgba(17, 24, 39, 0.8)", borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "1.5rem 0", position: "sticky", top: "64px", zIndex: 40,
      }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <button
            onClick={() => router.push("/projects")}
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
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            {project.featured && (
              <span style={{
                background: "linear-gradient(135deg, #FF8C42, #FFD166)", color: "#0A0F1E",
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", fontWeight: 700,
                padding: "0.2rem 0.6rem", borderRadius: "2px",
              }}>
                FEATURED
              </span>
            )}
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "rgba(255,140,66,0.6)" }}>
              {project.category.toUpperCase()}
            </span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, marginBottom: "1rem" }}>
            {project.title}
          </h1>
          <p style={{ fontFamily: "'DM Sans', 'Noto Sans KR', sans-serif", fontSize: "1.05rem", color: "rgba(226,232,240,0.7)", lineHeight: 1.8, maxWidth: "700px" }}>
            {project.fullDesc}
          </p>
        </div>

        <div style={{ marginBottom: "3rem", borderRadius: "0.75rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", height: "400px" }}>
          <img src={project.thumb} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem", marginBottom: "3rem", padding: "2rem",
          background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.75rem",
        }}>
          {[
            { icon: <Calendar size={16} />, label: "PERIOD", value: project.date },
            { icon: <Users size={16} />, label: "TEAM", value: project.team },
            { icon: <Code2 size={16} />, label: "ROLE", value: project.role },
          ].map(({ icon, label, value }) => value ? (
            <div key={label}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#FF8C42", marginBottom: "0.5rem" }}>
                {icon}
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem" }}>{label}</span>
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif" }}>{value}</div>
            </div>
          ) : null)}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
          <div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem", color: "#FFD166" }}>
              🎯 도전 과제
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {project.challenges.map((challenge, i) => (
                <li key={i} style={{ fontFamily: "'DM Sans', 'Noto Sans KR', sans-serif", fontSize: "0.95rem", color: "rgba(226,232,240,0.7)", marginBottom: "0.75rem", paddingLeft: "1.5rem", position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#FF8C42", fontWeight: 700 }}>•</span>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem", color: "#4CAF50" }}>
              ✓ 해결책
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {project.solutions.map((solution, i) => (
                <li key={i} style={{ fontFamily: "'DM Sans', 'Noto Sans KR', sans-serif", fontSize: "0.95rem", color: "rgba(226,232,240,0.7)", marginBottom: "0.75rem", paddingLeft: "1.5rem", position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#4CAF50", fontWeight: 700 }}>✓</span>
                  {solution}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          background: "linear-gradient(135deg, rgba(255,140,66,0.08), rgba(255,209,102,0.04))",
          border: "1px solid rgba(255,140,66,0.2)", borderRadius: "0.75rem",
          padding: "2rem", marginBottom: "3rem",
        }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.5rem", color: "#FFD166" }}>
            📊 성과
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
            {project.results.map((result, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "#FF8C42", marginBottom: "0.5rem" }}>
                  result_{i + 1}
                </div>
                <div style={{ fontFamily: "'DM Sans', 'Noto Sans KR', sans-serif", fontSize: "0.95rem", color: "rgba(226,232,240,0.8)", lineHeight: 1.6 }}>
                  {result}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.5rem" }}>
            🛠️ 기술 스택
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
            {project.techStack.map((tech, i) => (
              <div key={i} style={{ background: "rgba(17, 24, 39, 0.7)", border: "1px solid rgba(255,140,66,0.15)", borderRadius: "0.5rem", padding: "1rem" }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#FF8C42", marginBottom: "0.4rem" }}>
                  {tech.name}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(226,232,240,0.6)" }}>
                  {tech.reason}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", padding: "2rem", background: "rgba(17, 24, 39, 0.6)", borderRadius: "0.75rem", borderTop: "2px solid rgba(255,140,66,0.2)" }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-tangerine" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <GithubIcon size={18} />
            GitHub 저장소
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-outline-tangerine" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ExternalLink size={18} />
              라이브 데모
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
