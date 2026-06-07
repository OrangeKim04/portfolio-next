"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  active: boolean;
  onDone: () => void;
}

function mkTangerines() {
  return Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 92 + 4,
    size: Math.random() * 22 + 22,
    duration: Math.random() * 1.5 + 2,
    delay: Math.random() * 1.8,
  }));
}

export default function TangerineRain({ active, onDone }: Props) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) return;
    timerRef.current = setTimeout(onDone, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, onDone]);

  if (!active) return null;

  const tangerines = mkTangerines();

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* 귤 낙하 */}
      {tangerines.map(t => (
        <div
          key={t.id}
          style={{
            position: "absolute",
            left: `${t.x}%`,
            top: 0,
            fontSize: `${t.size}px`,
            animation: `tangerine-fall ${t.duration}s linear ${t.delay}s both`,
            lineHeight: 1,
            willChange: "transform, opacity",
          }}
        >
          🍊
        </div>
      ))}

      {/* 🍀 행복하세요 오버레이 */}
      <div
        className="absolute inset-0 flex items-center justify-center px-4"
        style={{
          animation: "happy-pop 3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both",
        }}
      >
        <span
          className="font-display font-bold whitespace-nowrap flex items-center gap-3"
          style={{
            fontSize: "clamp(1.8rem, 7vw, 5rem)",
            color: "#4CAF50",
            textShadow: [
              "0 0 10px #fff700",
              "0 0 25px #ffff00",
              "0 0 55px #ffee00",
              "0 0 100px rgba(255,240,0,0.6)",
              "0 0 160px rgba(255,230,0,0.3)",
            ].join(", "),
            letterSpacing: "0.04em",
          }}
        >
          행복하세요
          <span style={{ fontSize: "clamp(1.5rem, 6vw, 4rem)", lineHeight: 1 }}>🍀</span>
        </span>
      </div>
    </div>,
    document.body
  );
}
