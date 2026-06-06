"use client";

import HeroSection from "@/components/sections/HeroSection";
import BlogPreviewSection from "@/components/sections/BlogPreviewSection";
import { useThemeColors } from "@/contexts/ThemeContext";

export default function Home() {
  const { bg, text } = useThemeColors();
  return (
    <div
      style={{
        background: bg,
        minHeight: "100vh",
        color: text,
        transition: "background 0.35s ease, color 0.35s ease",
      }}
    >
      <HeroSection />
      <BlogPreviewSection />
    </div>
  );
}
