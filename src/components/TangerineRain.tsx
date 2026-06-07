"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type AnimType = "tangerine-fall" | "tangerine-left" | "tangerine-right";

interface Tangerine {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  anim: AnimType;
}

interface Props {
  active: boolean;
  onDone: () => void;
}

function mkTangerines(): Tangerine[] {
  const total = 28;
  return Array.from({ length: total }, (_, i) => {
    const roll = Math.random();
    const anim: AnimType =
      i < 3 ? "tangerine-left" :
      i < 6 ? "tangerine-right" :
      "tangerine-fall";
    return {
      id: i,
      x: anim === "tangerine-left"  ? 0 :
         anim === "tangerine-right" ? 100 :
         Math.random() * 92 + 4,
      size: Math.random() * 22 + 22,
      duration: Math.random() * 1.4 + 2.2,
      delay: roll * 1.6,
      anim,
    };
  });
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
      {tangerines.map(t => (
        <div
          key={t.id}
          style={{
            position: "absolute",
            left: `${t.x}%`,
            top: 0,
            fontSize: `${t.size}px`,
            animation: `${t.anim} ${t.duration}s cubic-bezier(0.34, 1.56, 0.64, 1) ${t.delay}s both`,
            lineHeight: 1,
            willChange: "transform, opacity",
          }}
        >
          🍊
        </div>
      ))}
    </div>,
    document.body
  );
}
