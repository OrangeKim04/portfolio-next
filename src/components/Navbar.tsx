"use client";

import { useState, useEffect } from "react";
import { Menu, X, Terminal, Sun, Moon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme, useThemeColors } from "@/contexts/ThemeContext";

const navItems = [
  { label: "Home", href: "#hero" },
  // { label: "About", href: "#about" },
  // { label: "Skills", href: "#skills" },
  // { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const { toggleTheme } = useTheme();
  const { isDark, text, textMuted, navBg, border } = useThemeColors();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["hero", "about", "skills", "projects", "blog"];

      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80) {
        setActiveSection(sections[sections.length - 1]);
        return;
      }

      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 10);
  };

  const showThemeToggle = !isHomePage || activeSection === "blog";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] px-8 h-16 flex items-center justify-between transition-[background,backdrop-filter,border-color] duration-300"
        style={{
          background: scrolled || mobileOpen ? navBg : "transparent",
          backdropFilter: scrolled || mobileOpen ? "blur(16px)" : "none",
          borderBottom: scrolled || mobileOpen ? `1px solid ${border}` : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          onClick={e => {
            e.preventDefault();
            if (isHomePage) scrollTo("#hero");
            else router.push("/");
          }}
          className="flex items-center gap-2 no-underline"
        >
          <Terminal size={18} color="#FF8C42" />
          <span className="font-mono text-[0.9rem] font-bold tracking-wider text-tangerine">
            dev.portfolio
          </span>
          <span className="font-mono text-[0.9rem] opacity-50" style={{ color: text }}>
            ~$
          </span>
        </a>

        {/* Desktop Nav + Theme Toggle */}
        {!isMobile && isHomePage && (
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            {showThemeToggle && (
              <li>
                <button
                  onClick={toggleTheme}
                  aria-label="테마 전환"
                  className="relative flex items-center justify-between shrink-0 cursor-pointer px-1.5 rounded-full transition-[background,border-color] duration-300"
                  style={{
                    width: "60px",
                    height: "30px",
                    background: isDark ? "rgba(255,209,102,0.12)" : "rgba(160,100,0,0.08)",
                    border: `1px solid ${isDark ? "rgba(255,209,102,0.4)" : "rgba(160,100,0,0.45)"}`,
                  }}
                >
                  <Moon size={12} color={isDark ? "rgba(255,209,102,0.4)" : "rgba(160,100,0,0.4)"} />
                  <Sun  size={12} color={isDark ? "rgba(255,209,102,0.4)" : "rgba(160,100,0,0.4)"} />
                  <span
                    className="absolute top-0.75 w-6 h-6 rounded-full flex items-center justify-center pointer-events-none transition-[left] duration-300"
                    style={{
                      left: isDark ? "3px" : "calc(100% - 27px)",
                      background: "#FFD166",
                      boxShadow: "0 2px 8px rgba(255,209,102,0.6)",
                      transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                  >
                    {isDark ? <Moon size={11} color="white" /> : <Sun size={11} color="white" />}
                  </span>
                </button>
              </li>
            )}
            {navItems.map(item => (
              <li key={item.href}>
                <button
                  onClick={() => scrollTo(item.href)}
                  className="relative bg-none border-none font-sans text-sm font-medium cursor-pointer transition-colors duration-200 py-1 px-0"
                  style={{ color: activeSection === item.href.replace("#", "") ? "#FF8C42" : textMuted }}
                >
                  {item.label}
                  {activeSection === item.href.replace("#", "") && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-tangerine rounded-sm" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Desktop Theme Toggle (비홈 페이지) */}
        {!isMobile && !isHomePage && (
          <button
            onClick={toggleTheme}
            aria-label="테마 전환"
            className="relative flex items-center justify-between shrink-0 cursor-pointer px-1.5 rounded-full transition-[background,border-color] duration-300"
            style={{
              width: "60px",
              height: "30px",
              background: isDark ? "rgba(255,209,102,0.12)" : "rgba(160,100,0,0.08)",
              border: `1px solid ${isDark ? "rgba(255,209,102,0.4)" : "rgba(160,100,0,0.45)"}`,
            }}
          >
            <Moon size={12} color={isDark ? "rgba(255,209,102,0.4)" : "rgba(160,100,0,0.4)"} />
            <Sun  size={12} color={isDark ? "rgba(255,209,102,0.4)" : "rgba(160,100,0,0.4)"} />
            <span
              className="absolute top-0.75 w-6 h-6 rounded-full flex items-center justify-center pointer-events-none transition-[left] duration-300"
              style={{
                left: isDark ? "3px" : "calc(100% - 27px)",
                background: "#FFD166",
                boxShadow: "0 2px 8px rgba(255,209,102,0.6)",
                transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              {isDark ? <Moon size={11} color="white" /> : <Sun size={11} color="white" />}
            </span>
          </button>
        )}

        {/* Mobile right side */}
        {isMobile && (
          <div className="flex items-center gap-2">
            {showThemeToggle && (
              <button
                onClick={toggleTheme}
                aria-label="테마 전환"
                className="relative flex items-center justify-between shrink-0 cursor-pointer px-1.5 rounded-full transition-[background,border-color] duration-300"
                style={{
                  width: "52px",
                  height: "26px",
                  background: isDark ? "rgba(255,209,102,0.12)" : "rgba(160,100,0,0.08)",
                  border: `1px solid ${isDark ? "rgba(255,209,102,0.4)" : "rgba(160,100,0,0.45)"}`,
                }}
              >
                <Moon size={10} color={isDark ? "rgba(255,209,102,0.4)" : "rgba(160,100,0,0.4)"} />
                <Sun  size={10} color={isDark ? "rgba(255,209,102,0.4)" : "rgba(160,100,0,0.4)"} />
                <span
                  className="absolute top-0.75 w-5 h-5 rounded-full flex items-center justify-center pointer-events-none transition-[left] duration-300"
                  style={{
                    left: isDark ? "3px" : "calc(100% - 23px)",
                    background: "#FFD166",
                    boxShadow: "0 2px 8px rgba(255,209,102,0.6)",
                    transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                >
                  {isDark ? <Moon size={9} color="white" /> : <Sun size={9} color="white" />}
                </span>
              </button>
            )}
            {isHomePage && (
              <button
                onClick={() => setMobileOpen(prev => !prev)}
                className="flex items-center justify-center cursor-pointer rounded p-[0.4rem] transition-[border-color,background] duration-200"
                style={{
                  background: "none",
                  border: "1px solid rgba(255,140,66,0.25)",
                  color: "#E2E8F0",
                }}
                aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
              >
                {mobileOpen ? <X size={22} color="#FF8C42" /> : <Menu size={22} />}
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && isHomePage && (
        <>
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-[98] transition-opacity duration-[250ms]"
            style={{
              background: "rgba(0,0,0,0.5)",
              opacity: mobileOpen ? 1 : 0,
              pointerEvents: mobileOpen ? "auto" : "none",
            }}
          />
          <div
            className="fixed top-16 left-0 right-0 z-[99] px-6 pt-5 pb-7 transition-[transform,opacity] duration-[250ms]"
            style={{
              background: "rgba(10, 15, 30, 0.98)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255, 140, 66, 0.15)",
              transform: mobileOpen ? "translateY(0)" : "translateY(-8px)",
              opacity: mobileOpen ? 1 : 0,
              pointerEvents: mobileOpen ? "auto" : "none",
            }}
          >
            <ul className="list-none m-0 p-0 flex flex-col gap-1">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => scrollTo(item.href)}
                      className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-md border-none cursor-pointer transition-[background,color] duration-150 font-sans text-base"
                      style={{
                        background: isActive ? "rgba(255,140,66,0.08)" : "none",
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? "#FF8C42" : "rgba(226,232,240,0.8)",
                      }}
                    >
                      <span
                        className="font-mono text-[0.65rem] min-w-[1.5rem]"
                        style={{ color: isActive ? "#FF8C42" : "rgba(255,140,66,0.35)" }}
                      >
                        0{i + 1}
                      </span>
                      {item.label}
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full shrink-0 bg-tangerine" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
