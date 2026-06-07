"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Mail } from "lucide-react";

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
import { toast } from "sonner";
import HeroBackground from "@/components/HeroBackground";
import MagneticParticles from "@/components/MagneticParticles";

const TYPING_TEXTS = [
  "Backend Developer",
  "API Architect",
  "Problem Solver",
  "System Designer",
];

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentText = TYPING_TEXTS[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setTextIndex(prev => (prev + 1) % TYPING_TEXTS.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#0A0F1E",
      }}
    >
      <HeroBackground />
      <MagneticParticles />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(10,15,30,0.75) 0%, rgba(10,15,30,0.4) 50%, rgba(10,15,30,0.7) 100%)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 220px 90px #0A0F1E",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "6rem",
          paddingBottom: "4rem",
          maxWidth: "900px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.5rem",
            animation: "fadeInUp 0.6s ease 0.1s both",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#4CAF50",
              boxShadow: "0 0 8px #4CAF50",
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              color: "rgba(226,232,240,0.6)",
              letterSpacing: "0.1em",
            }}
          >
            // 안녕하세요, 저는
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Space Grotesk', 'Noto Sans KR', sans-serif",
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 700,
            color: "#E2E8F0",
            lineHeight: 1.1,
            marginBottom: "1rem",
            animation: "fadeInUp 0.6s ease 0.2s both",
          }}
        >
          김규리
          <span style={{ color: "#FF8C42", marginLeft: "0.25em" }}>.</span>
        </h1>

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.25rem, 3.5vw, 2rem)",
            fontWeight: 500,
            color: "#FF8C42",
            marginBottom: "1.5rem",
            minHeight: "2.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            animation: "fadeInUp 0.6s ease 0.3s both",
          }}
        >
          <span>{displayText}</span>
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "1.2em",
              background: "#FF8C42",
              opacity: showCursor ? 1 : 0,
              transition: "opacity 0.1s",
            }}
          />
        </div>

        <p
          style={{
            fontFamily: "'DM Sans', 'Noto Sans KR', sans-serif",
            fontSize: "1rem",
            color: "rgba(226,232,240,0.7)",
            lineHeight: 1.8,
            maxWidth: "560px",
            marginBottom: "2.5rem",
            animation: "fadeInUp 0.6s ease 0.4s both",
          }}
        >
          확장 가능한 백엔드 시스템과 RESTful API를 설계합니다.
          <br />
          Spring Boot, FastAPI, 그리고 클라우드 인프라로 문제를 해결합니다.
        </p>

        <div style={{ display: "flex", gap: "1.25rem", animation: "fadeInUp 0.6s ease 0.6s both" }}>
          {[
            { icon: <GithubIcon size={20} />, href: "https://github.com/OrangeKim04", label: "GitHub" },
            { icon: <Mail size={20} />, href: "#", label: "Email" },
          ].map(social => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={social.label}
              onClick={e => {
                if (social.label === "Email") {
                  e.preventDefault();
                  navigator.clipboard.writeText("queemkim2@gmail.com");
                  toast.success("이메일 주소가 클립보드에 복사되었습니다! 🍊", {
                    style: {
                      background: "#0A0F1E",
                      color: "#FF8C42",
                      border: "1px solid #FF8C42",
                    },
                  });
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(255,140,66,0.25)",
                color: "rgba(226,232,240,0.7)",
                transition: "all 0.3s ease",
                textDecoration: "none",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "#FF8C42";
                (e.currentTarget as HTMLElement).style.color = "#FF8C42";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(255,140,66,0.3)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,140,66,0.25)";
                (e.currentTarget as HTMLElement).style.color = "rgba(226,232,240,0.7)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "none",
          border: "none",
          color: "rgba(255,140,66,0.5)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
          zIndex: 3,
          animation: "float 2.5s ease-in-out infinite",
        }}
      >
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em" }}>
          SCROLL
        </span>
        <ChevronDown size={14} />
      </button>

      <div
        style={{
          position: "absolute",
          right: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          opacity: 0.35,
        }}
        className="hidden lg:flex"
      >
        {["REST API", "MSA", "CI/CD", "Docker", "K8s"].map((tag, i) => (
          <div
            key={tag}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "#FF8C42",
              border: "1px solid rgba(255,140,66,0.3)",
              padding: "0.25rem 0.75rem",
              borderRadius: "2px",
              animation: `fadeInUp 0.5s ease ${0.7 + i * 0.1}s both`,
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </section>
  );
}
