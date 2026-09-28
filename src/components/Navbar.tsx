"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Terminal, Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme, useThemeColors } from "@/contexts/ThemeContext";
import { usePageLoading } from "@/contexts/LoadingContext";
import TangerineRain from "@/components/TangerineRain";

const navItems = [
  { label: "Home", href: "/#hero", section: "hero" },
  { label: "Projects", href: "/projects", section: "projects" },
  { label: "Blog", href: "/#blog", section: "blog" },
];

function ThemeToggle() {
  const { toggleTheme } = useTheme();
  const { isDark } = useThemeColors();
  return (
    <button onClick={toggleTheme} aria-label="테마 전환"
      className="relative flex items-center justify-between shrink-0 cursor-pointer px-1.5 rounded-full w-13 h-7"
      style={{ background: isDark ? "rgba(255,209,102,0.12)" : "rgba(160,100,0,0.08)", border: "1px solid rgba(200,150,40,.4)" }}>
      <Moon size={11} color="#BA923F" /><Sun size={11} color="#BA923F" />
      <span className="absolute top-0.5 w-5.5 h-5.5 rounded-full flex items-center justify-center pointer-events-none transition-[left] duration-300"
        style={{ left: isDark ? "3px" : "calc(100% - 25px)", background: "#FFD166", boxShadow: "0 2px 8px rgba(255,209,102,.4)" }}>
        {isDark ? <Moon size={11} color="#0A0F1E" /> : <Sun size={11} color="#0A0F1E" />}
      </span>
    </button>
  );
}

function Navigation({ pathname }: { pathname: string }) {
  const isHomePage = pathname === "/";
  const colors = useThemeColors();
  const { isPageLoading } = usePageLoading();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [tangerineActive, setTangerineActive] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (!isHomePage) return;
      const blog = document.getElementById("blog");
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80;
      setActiveSection(blog && (window.scrollY >= blog.offsetTop - 140 || atBottom) ? "blog" : "hero");
    };
    const frame = requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", handleScroll); };
  }, [isHomePage]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMobileOpen(false); menuButton.current?.focus(); }
    };
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  const isActive = (section: string) => isHomePage ? activeSection === section
    : section === "projects" ? pathname === "/projects" || pathname.startsWith("/project/")
    : section === "blog" && (pathname === "/blogs" || pathname.startsWith("/blog/"));
  const showThemeToggle = (!isHomePage || activeSection === "blog") && !isPageLoading;
  const solid = !isHomePage || scrolled || mobileOpen;

  return (
    <>
      <nav aria-label="메인 내비게이션"
        className="fixed top-0 left-0 right-0 z-100 px-5 md:px-8 h-16 flex items-center justify-between transition-[background,backdrop-filter,border-color] duration-300"
        style={{ background: solid ? colors.navBg : "transparent", backdropFilter: solid ? "blur(16px)" : "none", borderBottom: solid ? `1px solid ${colors.border}` : "1px solid transparent" }}>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setTangerineActive(true)} aria-label="귤 애니메이션"
            className="cursor-pointer border-0 bg-transparent p-1"><Terminal size={18} color="#FF8C42" /></button>
          <Link href="/#hero" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 no-underline">
            <span className="font-mono text-[0.9rem] font-bold tracking-wider text-tangerine">dev.portfolio</span>
            <span className="font-mono text-[0.9rem] opacity-50" style={{ color: colors.text }}>~$</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <Link key={item.section} href={item.href} aria-current={isActive(item.section) ? (isHomePage ? "location" : "page") : undefined}
              className="relative text-sm font-medium py-1 no-underline transition-colors duration-200"
              style={{ color: isActive(item.section) ? "#FF8C42" : colors.textMuted }}>
              {item.label}
              {isActive(item.section) && <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-tangerine rounded-sm" />}
            </Link>
          ))}
          {showThemeToggle && <ThemeToggle />}
        </div>
        <div className="flex md:hidden items-center gap-3">
          {showThemeToggle && <ThemeToggle />}
          <button ref={menuButton} type="button" onClick={() => setMobileOpen(open => !open)}
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"} aria-expanded={mobileOpen} aria-controls="mobile-navigation"
            className="flex items-center justify-center cursor-pointer rounded p-1.5 bg-transparent"
            style={{ border: "1px solid rgba(255,140,66,.25)", color: colors.text }}>
            {mobileOpen ? <X size={22} color="#FF8C42" /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      <TangerineRain active={tangerineActive} onDone={() => setTangerineActive(false)} />
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-98 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <nav id="mobile-navigation" aria-label="모바일 내비게이션"
            className="fixed top-16 left-0 right-0 z-99 px-6 py-5 md:hidden"
            style={{ background: colors.navBg, borderBottom: "1px solid rgba(255,140,66,.2)" }}>
            {navItems.map((item, index) => (
              <Link key={item.section} href={item.href} onClick={() => { setMobileOpen(false); menuButton.current?.focus(); }}
                aria-current={isActive(item.section) ? (isHomePage ? "location" : "page") : undefined}
                className="flex items-center gap-3 px-4 py-3 rounded-md no-underline text-base"
                style={{ color: isActive(item.section) ? "#FF8C42" : colors.text, background: isActive(item.section) ? "rgba(255,140,66,.08)" : "transparent" }}>
                <span className="font-mono text-xs text-tangerine opacity-60">0{index + 1}</span>{item.label}
              </Link>
            ))}
          </nav>
        </>
      )}
    </>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  return <Navigation key={pathname} pathname={pathname} />;
}
