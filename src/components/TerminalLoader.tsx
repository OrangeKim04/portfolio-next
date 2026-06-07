"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useThemeColors } from "@/contexts/ThemeContext";
import { usePageLoading } from "@/contexts/LoadingContext";

const STEPS = [
  { text: "$ connecting to notion.api...", delay: 0 },
  { text: "$ fetching database schema...", delay: 600 },
  { text: "$ querying posts...", delay: 1200 },
  { text: "$ processing markdown...", delay: 1900 },
];

const BAR_LEN = 20;

function ProgressBar({ pct }: { pct: number }) {
  const filled = Math.round((pct / 100) * BAR_LEN);
  return (
    <span className="font-mono text-[0.75rem]" style={{ color: "#FF8C42" }}>
      {"["}
      <span style={{ color: "#FFD166" }}>{"█".repeat(filled)}</span>
      <span style={{ color: "rgba(255,255,255,0.15)" }}>{"░".repeat(BAR_LEN - filled)}</span>
      {"]"} {pct}%
    </span>
  );
}

export default function TerminalLoader({ compact = false }: { compact?: boolean }) {
  const { bg, isDark: isDarkCtx } = useThemeColors();
  const { setIsPageLoading } = usePageLoading();
  const [isDark, setIsDark] = useState(isDarkCtx);

  useEffect(() => {
    setIsPageLoading(true);
    return () => setIsPageLoading(false);
  }, [setIsPageLoading]);

  // context보다 먼저 DOM/localStorage에서 직접 읽어 타이밍 문제 해결
  useLayoutEffect(() => {
    const stored = localStorage.getItem("theme");
    setIsDark(stored !== "light");
  }, []);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [typedIdx, setTypedIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [pct, setPct] = useState(0);

  // 단계별 라인 표시
  useEffect(() => {
    STEPS.forEach((step, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, step.delay);
    });
  }, []);

  // 현재 표시 중인 라인의 타이핑 효과
  useEffect(() => {
    if (typedIdx >= STEPS.length) return;
    const target = STEPS[typedIdx].text;
    if (typedText.length < target.length) {
      const t = setTimeout(() => {
        setTypedText(target.slice(0, typedText.length + 1));
      }, 22);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setTypedIdx(i => i + 1);
        setTypedText("");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [typedIdx, typedText]);

  // 프로그레스바
  useEffect(() => {
    if (pct >= 100) return;
    const t = setTimeout(() => setPct(p => Math.min(p + 2, 100)), 40);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div className={compact ? "flex justify-center py-12" : "min-h-screen flex items-center justify-center"} style={compact ? undefined : { background: bg }}>
      <div
        className="w-4/5 sm:w-full sm:max-w-md rounded-xl overflow-hidden"
        style={{
          border: isDark ? "1px solid rgba(255,140,66,0.25)" : "1px solid rgba(255,105,180,0.6)",
          boxShadow: isDark ? "none" : "0 4px 24px rgba(255,105,180,0.15)",
        }}
      >
        {/* 터미널 헤더 */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,105,180,0.12)",
            borderBottom: isDark ? "1px solid rgba(255,140,66,0.15)" : "1px solid rgba(255,105,180,0.3)",
          }}
        >
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono text-[0.7rem]" style={{ color: "rgba(255,255,255,0.35)" }}>
            blog.fetch — node
          </span>
        </div>

        {/* 터미널 바디 */}
        <div className="px-5 py-5 space-y-1.5" style={{ background: "rgba(10,15,30,0.95)", minHeight: "180px" }}>
          {STEPS.map((step, i) => {
            const isActive = typedIdx === i;
            const isDone = i < typedIdx;
            const isVisible = visibleLines.includes(i);
            if (!isVisible) return null;
            return (
              <div key={i} className="flex items-center gap-2 font-mono text-[0.78rem]">
                {isDone ? (
                  <>
                    <span style={{ color: "#4CAF50" }}>✓</span>
                    <span style={{ color: "rgba(226,232,240,0.55)" }}>{step.text}</span>
                  </>
                ) : isActive ? (
                  <>
                    <span style={{ color: "#FF8C42" }}>›</span>
                    <span style={{ color: "#E2E8F0" }}>
                      {typedText}
                      <span className="animate-pulse">▋</span>
                    </span>
                  </>
                ) : null}
              </div>
            );
          })}

          {/* 프로그레스바 */}
          <div className="pt-3">
            <ProgressBar pct={pct} />
          </div>
        </div>
      </div>
    </div>
  );
}
