"use client";

import { useEffect, useRef } from "react";

interface Body {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  coreColor: string;
  glowColor: string;
  driftAngle: number;
  driftSpeed: number;
  driftRadius: number;
  type: "planet" | "star";
}

// 뚜렷한 행성 팔레트
const PLANET_CONFIGS = [
  { core: "#FF9500", glow: "255,120,0",    r: 28 },
  { core: "#C084FC", glow: "160,80,240",   r: 22 },
  { core: "#38BDF8", glow: "30,160,220",   r: 18 },
  { core: "#FFD166", glow: "255,190,50",   r: 20 },
  { core: "#F472B6", glow: "220,60,140",   r: 14 },
  { core: "#4ADE80", glow: "40,200,100",   r: 12 },
  { core: "#FB923C", glow: "240,110,30",   r: 16 },
];

const STAR_COUNT = 90;
const MOUSE_RADIUS = 180;
const REPULSION = 7000;
const SPRING = 0.02;
const DAMPING = 0.90;

function drawGlow(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  radius: number,
  glowRgb: string,
  coreColor: string
) {
  // 3겹 글로우 (shadowBlur 대신 수동으로)
  const layers = [
    { r: radius * 4.5, alpha: 0.06 },
    { r: radius * 2.8, alpha: 0.14 },
    { r: radius * 1.6, alpha: 0.28 },
  ];
  for (const l of layers) {
    ctx.beginPath();
    ctx.arc(x, y, l.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${glowRgb},${l.alpha})`;
    ctx.fill();
  }
  // 행성 본체 — 방사형 그라디언트
  const grad = ctx.createRadialGradient(
    x - radius * 0.35, y - radius * 0.35, 0,
    x, y, radius
  );
  grad.addColorStop(0,   "rgba(255,255,255,0.9)");
  grad.addColorStop(0.25, coreColor);
  grad.addColorStop(0.8,  coreColor + "CC");
  grad.addColorStop(1,    coreColor + "33");
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
}

export default function MagneticParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const bodiesRef = useRef<Body[]>([]);
  const starsRef = useRef<{ x: number; y: number; r: number; a: number; twinkle: number }[]>([]);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const init = () => {
      const w = canvas.width = canvas.offsetWidth;
      const h = canvas.height = canvas.offsetHeight;

      // 별 필드
      starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random() * 0.7 + 0.15,
        twinkle: Math.random() * Math.PI * 2,
      }));

      // 행성
      bodiesRef.current = PLANET_CONFIGS.map((cfg, i) => {
        const x = (i + 1) / (PLANET_CONFIGS.length + 1) * w + (Math.random() - 0.5) * w * 0.25;
        const y = Math.random() * h * 0.7 + h * 0.1;
        return {
          x, y, originX: x, originY: y,
          vx: 0, vy: 0,
          radius: cfg.r,
          coreColor: cfg.core,
          glowColor: cfg.glow,
          driftAngle: Math.random() * Math.PI * 2,
          driftSpeed: (Math.random() * 0.004 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
          driftRadius: Math.random() * 22 + 8,
          type: "planet" as const,
        };
      });
    };

    const draw = () => {
      timeRef.current += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 별 그리기 (트윈클)
      for (const s of starsRef.current) {
        s.twinkle += 0.02;
        const a = s.a * (0.6 + 0.4 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }

      // 행성 그리기
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of bodiesRef.current) {
        p.driftAngle += p.driftSpeed;
        const tx = p.originX + Math.cos(p.driftAngle) * p.driftRadius;
        const ty = p.originY + Math.sin(p.driftAngle) * p.driftRadius;

        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = REPULSION / (dist * dist);
          p.vx -= (dx / dist) * force;
          p.vy -= (dy / dist) * force;
        }
        p.vx += (tx - p.x) * SPRING;
        p.vy += (ty - p.y) * SPRING;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        drawGlow(ctx, p.x, p.y, p.radius, p.glowColor, p.coreColor);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    const onResize = () => { init(); };

    init();
    draw();
    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
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
