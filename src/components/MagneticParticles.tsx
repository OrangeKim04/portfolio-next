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
  glowRgb: string;
  driftAngle: number;
  driftSpeed: number;
  driftRadius: number;
}

// 오로라 배경과 어울리는 통일된 팔레트
const CONFIGS = [
  // 큰 행성 5개
  { core: "#FF8C42", glow: "255,120,50",   r: 16 },
  { core: "#C4B5FD", glow: "160,130,250",  r: 13 },
  { core: "#FCD34D", glow: "240,190,40",   r: 11 },
  { core: "#67E8F9", glow: "50,210,240",   r: 12 },
  { core: "#FCA5A5", glow: "240,120,100",  r: 10 },
  // 중간 행성 6개
  { core: "#FDBA74", glow: "250,160,80",   r: 7  },
  { core: "#A5B4FC", glow: "130,140,240",  r: 6  },
  { core: "#86EFAC", glow: "80,220,130",   r: 7  },
  { core: "#F9A8D4", glow: "240,130,180",  r: 6  },
  { core: "#E2E8F0", glow: "210,220,235",  r: 5  },
  { core: "#FDE68A", glow: "245,200,80",   r: 6  },
  // 작은 별 10개 (동일하게 반응)
  { core: "#FFFFFF", glow: "255,255,255",  r: 2  },
  { core: "#FFF7ED", glow: "255,230,180",  r: 1.5},
  { core: "#EDE9FE", glow: "200,190,255",  r: 2  },
  { core: "#FFFFFF", glow: "255,255,255",  r: 1  },
  { core: "#FFF7ED", glow: "255,230,180",  r: 1.5},
  { core: "#FFFFFF", glow: "255,255,255",  r: 2  },
  { core: "#EDE9FE", glow: "200,190,255",  r: 1  },
  { core: "#FFFFFF", glow: "255,255,255",  r: 1.5},
  { core: "#FFF7ED", glow: "255,230,180",  r: 1  },
  { core: "#FFFFFF", glow: "255,255,255",  r: 2  },
];

const MOUSE_RADIUS = 160;
const REPULSION = 5500;
const SPRING = 0.022;
const DAMPING = 0.91;

function drawBody(ctx: CanvasRenderingContext2D, p: Body) {
  const { x, y, radius: r, coreColor, glowRgb } = p;
  if (r < 3) {
    // 별: 단순 글로우 원
    ctx.beginPath();
    ctx.arc(x, y, r * 3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${glowRgb},0.12)`;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = coreColor;
    ctx.fill();
    return;
  }
  // 행성: 2겹 글로우 + 구체 그라디언트
  ctx.beginPath();
  ctx.arc(x, y, r * 3.5, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${glowRgb},0.07)`;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y, r * 1.8, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${glowRgb},0.18)`;
  ctx.fill();
  const grad = ctx.createRadialGradient(
    x - r * 0.3, y - r * 0.3, 0,
    x, y, r
  );
  grad.addColorStop(0,    "rgba(255,255,255,0.85)");
  grad.addColorStop(0.3,  coreColor);
  grad.addColorStop(1,    `rgba(${glowRgb},0.2)`);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
}

export default function MagneticParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const bodiesRef = useRef<Body[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const init = () => {
      const w = canvas.width = canvas.offsetWidth;
      const h = canvas.height = canvas.offsetHeight;
      bodiesRef.current = CONFIGS.map((cfg, i) => {
        const x = (Math.random() * 0.8 + 0.1) * w;
        const y = (Math.random() * 0.75 + 0.1) * h;
        return {
          x, y, originX: x, originY: y,
          vx: 0, vy: 0,
          radius: cfg.r,
          coreColor: cfg.core,
          glowRgb: cfg.glow,
          driftAngle: (i / CONFIGS.length) * Math.PI * 2,
          driftSpeed: (Math.random() * 0.003 + 0.0008) * (i % 2 === 0 ? 1 : -1),
          driftRadius: cfg.r > 8 ? Math.random() * 20 + 10 : Math.random() * 10 + 5,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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

        drawBody(ctx, p);
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    const onResize = () => init();

    init(); draw();
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
