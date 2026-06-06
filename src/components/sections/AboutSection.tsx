/**
 * AboutSection — 자기소개 섹션
 * Design: "Dark Terminal × Tangerine Pulse"
 * - 헥사곤 프로필 이미지
 * - 타임라인
 * - 스크롤 reveal 애니메이션
 */
import { useEffect, useRef, useState } from "react";
import { MapPin, Calendar, Coffee, Code2 } from "lucide-react";

const PROFILE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663623383809/ZiuXtF6r9qxuu4WpJaGtpX/profile-avatar-oCCUx6KdEAs5A8AbMoZDfb.webp";

const timeline = [
  { year: "2024", title: "백엔드 개발자 인턴십", desc: "스타트업에서 Spring Boot 기반 API 서버 개발", type: "work" },
  { year: "2023", title: "오픈소스 기여 시작", desc: "GitHub 오픈소스 프로젝트 컨트리뷰터 활동", type: "achievement" },
  { year: "2022", title: "컴퓨터공학과 입학", desc: "백엔드 개발에 매력을 느끼고 본격적으로 학습 시작", type: "education" },
  { year: "2021", title: "첫 번째 프로젝트", desc: "Python Flask로 개인 블로그 API 서버 구축", type: "project" },
];

const stats = [
  { icon: <Code2 size={18} />, value: "15+", label: "프로젝트" },
  { icon: <Coffee size={18} />, value: "1,200+", label: "커밋" },
  { icon: <Calendar size={18} />, value: "3년+", label: "개발 경험" },
  { icon: <MapPin size={18} />, value: "Seoul", label: "위치" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: "7rem 0",
        background: "linear-gradient(180deg, #0A0F1E 0%, #0D1525 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 배경 장식 */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,140,66,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ maxWidth: "1100px" }}>
        {/* 섹션 헤더 */}
        <div
          style={{
            marginBottom: "4rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease",
          }}
        >
          <span className="section-label">// 01. about_me</span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "#E2E8F0",
              marginTop: "0.5rem",
              lineHeight: 1.2,
            }}
          >
            나에 대하여
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* 좌측: 프로필 */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.7s ease 0.1s",
            }}
          >
            {/* 헥사곤 프로필 이미지 */}
            <div
              style={{
                position: "relative",
                width: "220px",
                height: "220px",
                margin: "0 auto 2rem",
              }}
            >
              <div
                style={{
                  width: "220px",
                  height: "220px",
                  clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={PROFILE_IMG}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* 헥사곤 테두리 글로우 */}
              <div
                style={{
                  position: "absolute",
                  inset: "-3px",
                  clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                  background: "linear-gradient(135deg, #FF8C42, #FFD166, #FF8C42)",
                  zIndex: -1,
                  opacity: 0.6,
                }}
              />
            </div>

            {/* 상태 배지 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                justifyContent: "center",
                marginBottom: "1.5rem",
                padding: "0.5rem 1.25rem",
                background: "rgba(76, 175, 80, 0.1)",
                border: "1px solid rgba(76, 175, 80, 0.3)",
                borderRadius: "20px",
                width: "fit-content",
                margin: "0 auto 1.5rem",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#4CAF50",
                  boxShadow: "0 0 8px #4CAF50",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: "#4CAF50",
                }}
              >
                Open to Work
              </span>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
              }}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="card-dark"
                  style={{
                    padding: "0.875rem",
                    textAlign: "center",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.5s ease ${0.3 + i * 0.1}s`,
                  }}
                >
                  <div style={{ color: "#FF8C42", marginBottom: "0.25rem" }}>{stat.icon}</div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "#E2E8F0",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.7rem",
                      color: "rgba(226,232,240,0.5)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 우측: 소개 + 타임라인 */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(30px)",
              transition: "all 0.7s ease 0.2s",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', 'Noto Sans KR', sans-serif",
                fontSize: "1rem",
                color: "rgba(226,232,240,0.8)",
                lineHeight: 1.9,
                marginBottom: "1.5rem",
              }}
            >
              안녕하세요! 저는 <strong style={{ color: "#FF8C42" }}>백엔드 시스템 설계</strong>에 열정을 가진 개발자입니다.
              확장 가능하고 유지보수하기 쉬운 API와 마이크로서비스 아키텍처를 구축하는 것을 즐깁니다.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', 'Noto Sans KR', sans-serif",
                fontSize: "1rem",
                color: "rgba(226,232,240,0.8)",
                lineHeight: 1.9,
                marginBottom: "2.5rem",
              }}
            >
              Spring Boot와 FastAPI를 주로 사용하며, Docker와 Kubernetes를 통한 컨테이너 오케스트레이션,
              AWS 클라우드 인프라 구축 경험을 보유하고 있습니다.
              <strong style={{ color: "#FFD166" }}> 코드 품질</strong>과
              <strong style={{ color: "#FFD166" }}> 시스템 안정성</strong>을 최우선으로 생각합니다.
            </p>

            {/* 타임라인 */}
            <div>
              <h3
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: "#FF8C42",
                  letterSpacing: "0.15em",
                  marginBottom: "1.5rem",
                }}
              >
                // timeline
              </h3>
              <div style={{ position: "relative" }}>
                {/* 수직 라인 */}
                <div
                  style={{
                    position: "absolute",
                    left: "60px",
                    top: 0,
                    bottom: 0,
                    width: "1px",
                    background: "rgba(255,140,66,0.2)",
                  }}
                />

                {timeline.map((item, i) => (
                  <div
                    key={item.year}
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      marginBottom: "1.5rem",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateX(0)" : "translateX(20px)",
                      transition: `all 0.5s ease ${0.4 + i * 0.1}s`,
                    }}
                  >
                    {/* 연도 */}
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.7rem",
                        color: "#FF8C42",
                        minWidth: "48px",
                        paddingTop: "0.2rem",
                      }}
                    >
                      {item.year}
                    </div>

                    {/* 도트 */}
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "flex-start",
                        paddingTop: "0.35rem",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "#FF8C42",
                          boxShadow: "0 0 8px rgba(255,140,66,0.5)",
                          flexShrink: 0,
                        }}
                      />
                    </div>

                    {/* 내용 */}
                    <div>
                      <div
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          color: "#E2E8F0",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.8rem",
                          color: "rgba(226,232,240,0.55)",
                          lineHeight: 1.6,
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
