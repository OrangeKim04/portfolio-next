/**
 * SkillsSection — 기술 스택 섹션
 * Design: "Dark Terminal × Tangerine Pulse"
 * - 카테고리별 스킬 시각화
 * - 스크롤 시 progress bar 애니메이션
 * - 아키텍처 키워드 태그
 */
import { useEffect, useRef, useState } from "react";
import { Code2, Layers, Database, Cloud } from "lucide-react";

const skillCategories = [
  {
    id: "languages",
    label: "Languages",
    icon: <Code2 size={14} />,
    skills: [
      { name: "Java", level: 88, desc: "Spring 생태계 전반" },
      { name: "Python", level: 82, desc: "FastAPI, 데이터 처리" },
      { name: "Go", level: 65, desc: "고성능 서버 개발" },
      { name: "TypeScript", level: 75, desc: "풀스택 개발" },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    icon: <Layers size={14} />,
    skills: [
      { name: "Spring Boot", level: 90, desc: "주력 백엔드 프레임워크" },
      { name: "FastAPI", level: 80, desc: "Python 비동기 API" },
      { name: "Node.js", level: 72, desc: "이벤트 드리븐 서버" },
      { name: "React", level: 68, desc: "프론트엔드 개발" },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: <Database size={14} />,
    skills: [
      { name: "MySQL", level: 85, desc: "관계형 DB 설계/최적화" },
      { name: "Redis", level: 78, desc: "캐싱, 세션 관리" },
      { name: "MongoDB", level: 70, desc: "NoSQL 도큐먼트 DB" },
      { name: "PostgreSQL", level: 75, desc: "고급 쿼리, JSON 지원" },
    ],
  },
  {
    id: "infra",
    label: "Infra & Cloud",
    icon: <Cloud size={14} />,
    skills: [
      { name: "Docker", level: 82, desc: "컨테이너화, 멀티스테이지" },
      { name: "Kubernetes", level: 65, desc: "오케스트레이션, Helm" },
      { name: "AWS", level: 75, desc: "EC2, RDS, S3, Lambda" },
      { name: "CI/CD", level: 78, desc: "GitHub Actions, Jenkins" },
    ],
  },
];

const archTags = [
  "REST API", "MSA", "Event-Driven", "CQRS", "DDD",
  "Clean Architecture", "TDD", "JWT Auth", "OAuth2",
  "Message Queue", "gRPC", "WebSocket",
];

interface ProgressBarProps {
  level: number;
  visible: boolean;
  delay: number;
}

function ProgressBar({ level, visible, delay }: ProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setWidth(level), delay);
      return () => clearTimeout(timer);
    }
  }, [visible, level, delay]);

  return (
    <div
      style={{
        height: "3px",
        background: "rgba(255,255,255,0.08)",
        borderRadius: "2px",
        overflow: "hidden",
        marginTop: "0.5rem",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${width}%`,
          background: "linear-gradient(90deg, #FF8C42 0%, #FFD166 100%)",
          borderRadius: "2px",
          transition: `width 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
          boxShadow: "0 0 6px rgba(255,140,66,0.5)",
          position: "relative",
        }}
      >
        {/* 끝 부분 글로우 */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "-2px",
            width: "6px",
            height: "7px",
            background: "#FFD166",
            borderRadius: "50%",
            boxShadow: "0 0 8px #FFD166",
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("languages");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeCategory = skillCategories.find((c) => c.id === activeTab)!;

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: "7rem 0",
        background: "#0A0F1E",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 배경 그리드 패턴 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,140,66,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,140,66,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ maxWidth: "1100px", position: "relative" }}>
        {/* 섹션 헤더 */}
        <div
          style={{
            marginBottom: "3.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease",
          }}
        >
          <span className="section-label">// 02. tech_stack</span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "#E2E8F0",
              marginTop: "0.5rem",
            }}
          >
            기술 스택
          </h2>
        </div>

        {/* 탭 네비게이션 */}
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
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              style={{
                background: activeTab === cat.id
                  ? "rgba(255,140,66,0.12)"
                  : "transparent",
                border: `1px solid ${activeTab === cat.id ? "rgba(255,140,66,0.6)" : "rgba(255,255,255,0.1)"}`,
                color: activeTab === cat.id ? "#FF8C42" : "rgba(226,232,240,0.55)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.82rem",
                fontWeight: 500,
                padding: "0.5rem 1.1rem",
                borderRadius: "0.375rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* 스킬 그리드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1rem",
            marginBottom: "3.5rem",
          }}
        >
          {activeCategory.skills.map((skill, i) => (
            <div
              key={`${activeTab}-${skill.name}`}
              style={{
                background: "rgba(17, 24, 39, 0.7)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "0.625rem",
                padding: "1.25rem 1.5rem",
                transition: "all 0.3s ease",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${i * 0.08}s`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,140,66,0.3)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,140,66,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.background = "rgba(17, 24, 39, 0.7)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.2rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#E2E8F0",
                  }}
                >
                  {skill.name}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.72rem",
                    color: "#FF8C42",
                    fontWeight: 500,
                  }}
                >
                  {skill.level}%
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  color: "rgba(226,232,240,0.4)",
                  marginBottom: "0.5rem",
                }}
              >
                {skill.desc}
              </div>
              <ProgressBar
                level={skill.level}
                visible={visible}
                delay={i * 120 + 300}
              />
            </div>
          ))}
        </div>

        {/* 아키텍처 키워드 태그 */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.5s",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.25rem",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem",
                color: "rgba(255,140,66,0.55)",
                letterSpacing: "0.15em",
              }}
            >
              // architecture_keywords
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(255,140,66,0.1)",
              }}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {archTags.map((tag, i) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  color: "rgba(255,209,102,0.75)",
                  border: "1px solid rgba(255,209,102,0.18)",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "2px",
                  background: "rgba(255,209,102,0.04)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "scale(1)" : "scale(0.9)",
                  transition: `all 0.4s ease ${0.5 + i * 0.04}s`,
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,209,102,0.5)";
                  (e.currentTarget as HTMLElement).style.color = "#FFD166";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,209,102,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,209,102,0.18)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,209,102,0.75)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,209,102,0.04)";
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
