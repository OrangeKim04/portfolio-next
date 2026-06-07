"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import confetti from "canvas-confetti";

interface Props {
  active: boolean;
  onDone: () => void;
}

function fireConfetti() {
  const tangerine = confetti.shapeFromText({ text: "🍊", scalar: 3 });

  const defaults = {
    shapes: [tangerine],
    scalar: 3,
    flat: false,
  };

  // 왼쪽 아래에서 발사
  confetti({
    ...defaults,
    particleCount: 40,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 1 },
    gravity: 0.8,
    drift: 0.3,
    ticks: 300,
  });

  // 오른쪽 아래에서 발사
  confetti({
    ...defaults,
    particleCount: 40,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 1 },
    gravity: 0.8,
    drift: -0.3,
    ticks: 300,
  });

  // 0.4초 후 가운데서 추가 폭발
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 30,
      angle: 90,
      spread: 100,
      origin: { x: 0.5, y: 0.9 },
      gravity: 0.7,
      ticks: 280,
    });
  }, 400);

  // 0.8초 후 양쪽 한 번 더
  setTimeout(() => {
    confetti({ ...defaults, particleCount: 25, angle: 65, spread: 45, origin: { x: 0.1, y: 0.85 }, gravity: 0.9, ticks: 260 });
    confetti({ ...defaults, particleCount: 25, angle: 115, spread: 45, origin: { x: 0.9, y: 0.85 }, gravity: 0.9, ticks: 260 });
  }, 800);
}

export default function TangerineRain({ active, onDone }: Props) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) return;
    fireConfetti();
    timerRef.current = setTimeout(onDone, 4000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      confetti.reset();
    };
  }, [active, onDone]);

  if (!active) return null;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden flex items-center justify-center px-4">
      <span
        className="font-display font-bold whitespace-nowrap flex items-center gap-3"
        style={{
          fontSize: "clamp(1.8rem, 7vw, 5rem)",
          color: "#4CAF50",
          animation: "happy-pop 3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both",
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
    </div>,
    document.body
  );
}
