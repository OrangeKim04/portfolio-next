"use client";

import { useEffect, useRef } from "react";

interface Planet {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  glowSize: number;
  alpha: number;
  // 자체 드리프트
  driftAngle: number;
  driftSpeed: number;
  driftRadius: number;
}

// 행성 팔레트 — 우주 느낌
const PLANETS = [
  { color: "#FF8C42", glow: "#FF6A00" },  // 주황 행성
  { color: "#FFD166", glow: "#FFAA00" },  // 황금 행성
  { color: "#A78BFA", glow: "#7C3AED" },  // 보라 행성
  { color: "#64B5F6", glow: "#1565C0" },  // 파랑 행성
  { color: "#F472B6", glow: "#BE185D" },  // 핑크 행성
  { color: "#E2E8F0", glow: "#94A3B8" },  // 흰 행성 (별)
];

const COUNT = 30;
const MOUSE_RADIUS = 160;
const REPULSION = 5000;
const SPRING = 0.025;
const DAMPING = 0.92;

function makePlanet(w: number, h: number): Planet {
  const x = Math.random() * w;
  const y = Math.random() * h;
  const palette = PLANETS[Math.floor(Math.random() * PLANETS.length)];
  const isStar = Math.random() < 0.35;
  const radius = isStar
    ? Math.random() * 1.5 + 0.8          // 별 (작음)
    : Math.random() * 12 + 5;            // 행성 (다양한 크기)
  return {
    x, y, originX: x, originY: y,
    vx: 0, vy: 0,
    radius,
    color: palette.color,
    glowColor: palette.glow,
    glowSize: isStar ? radius * 3 : radius * 5,
    alpha: isStar ? Math.random() * 0.5 + 0.3 : Math.random() * 0.4 + 0.5,
    driftAngle: Math.random() * Math.PI * 2,
    driftSpeed: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
    driftRadius: Math.random() * 18 + 4,
  };
}

export default function MagneticParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const planetsRef = useRef<Planet[]>([]);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      planetsRef.current = Array.from({ length: COUNT }, () =>
        makePlanet(canvas.width, canvas.height)
      );
    };

    const draw = () => {
      timeRef.current += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of planetsRef.current) {
        // 자체 드리프트 (행성이 천천히 떠다니는 효과)
        p.driftAngle += p.driftSpeed;
        const driftX = p.originX + Math.cos(p.driftAngle) * p.driftRadius;
        const driftY = p.originY + Math.sin(p.driftAngle) * p.driftRadius;

        // 마우스 척력
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = REPULSION / (dist * dist);
          p.vx -= (dx / dist) * force;
          p.vy -= (dy / dist) * force;
        }

        // 드리프트 위치로 스프링 복귀
        p.vx += (driftX - p.x) * SPRING;
        p.vy += (driftY - p.y) * SPRING;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        // 행성 그리기 — 방사형 그라디언트 (한쪽이 밝은 구체 느낌)
        const grad = ctx.createRadialGradient(
          p.x - p.radius * 0.3, p.y - p.radius * 0.3, 0,
          p.x, p.y, p.radius
        );
        grad.addColorStop(0, `rgba(255,255,255,${p.alpha * 0.9})`);
        grad.addColorStop(0.3, `${p.color}${Math.round(p.alpha * 255).toString(16).padStart(2, "0")}`);
        grad.addColorStop(1, `${p.glowColor}00`);

        // 글로우
        ctx.shadowBlur = p.glowSize;
        ctx.shadowColor = p.glowColor;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 1 }}
    />
  );
}
