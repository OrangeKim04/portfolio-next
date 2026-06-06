"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    if (switchable) {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored && stored !== theme) setTheme(stored);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchable]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    if (switchable) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, switchable]);

  const toggleTheme = switchable
    ? () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
      }
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

export function useThemeColors() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return {
    isDark,
    bg:           isDark ? "#0A0F1E"                    : "#FFFBF2",
    bgCard:       isDark ? "rgba(255,255,255,0.07)"     : "rgba(255,248,232,0.95)",
    bgCardSolid:  isDark ? "#111827"                    : "#FFF8EB",
    bgHover:      isDark ? "rgba(255,255,255,0.04)"     : "rgba(255,140,66,0.06)",
    text:         isDark ? "#E2E8F0"                    : "#1A1A2E",
    textMuted:    isDark ? "rgba(226,232,240,0.70)"     : "rgba(26,26,46,0.62)",
    textFaint:    isDark ? "rgba(226,232,240,0.38)"     : "rgba(26,26,46,0.38)",
    border:       isDark ? "rgba(255,255,255,0.07)"     : "rgba(200,150,80,0.16)",
    borderStrong: isDark ? "rgba(255,255,255,0.14)"     : "rgba(200,150,80,0.30)",
    cardBorder:   isDark ? "rgba(255,140,66,0.35)"      : "rgba(200,130,60,0.40)",
    navBg:        isDark ? "rgba(10,15,30,0.97)"        : "rgba(255,251,242,0.97)",
    accent:       "#FF8C42",
    gold:         "#FFD166",
  };
}
