"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Tangerine {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  spin: number;
}

interface Props {
  active: boolean;
  onDone: () => void;
}

export default function TangerineRain({ active, onDone }: Props) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) return;
    timerRef.current = setTimeout(onDone, 3500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, onDone]);

  if (!active) return null;

  const tangerines: Tangerine[] = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 90 + 5,
    size: Math.random() * 20 + 24,
    duration: Math.random() * 1.5 + 2,
    delay: Math.random() * 1.2,
    spin: Math.random() > 0.5 ? 360 : -360,
  }));

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {tangerines.map(t => (
        <div
          key={t.id}
          style={{
            position: "absolute",
            left: `${t.x}%`,
            top: "-60px",
            fontSize: `${t.size}px`,
            animation: `tangerine-fall ${t.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${t.delay}s forwards`,
            lineHeight: 1,
          }}
        >
          🍊
        </div>
      ))}
    </div>,
    document.body
  );
}
