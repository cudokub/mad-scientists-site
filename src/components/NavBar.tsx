"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "REVEAL INFO", href: "/revealinfo" },
  { label: "MAD UNIVERSITY", href: "https://mad.trendytech.dev", external: true },
  { label: "MAD APP", href: "https://app.madscientists.io", external: true },
  {
    label: "REVEAL MAD",
    href: "https://mygateway.io/minting/mad-scientists",
    external: true,
    highlight: true,
  },
];

interface NavBarProps {
  theme?: "default" | "cosmic" | "hackathon";
}

export default function NavBar({ theme = "default" }: NavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const isCosmic = theme === "cosmic";
  const isHackathon = theme === "hackathon";
  const logoSrc = isCosmic ? "/images/cosmic-symbol.png" : "/images/ms-symbol.png";
  const logoAlt = isCosmic ? "COSMIC" : "Mad Scientists";
  const navBg = isCosmic ? "bg-[#050a16]/95 backdrop-blur-sm" : isHackathon ? "bg-hackathon-bg" : "bg-bg";
  const borderClass = isCosmic ? "border-cosmic" : isHackathon ? "border-hackathon" : "border-green";
  const linkBase = isCosmic ? "text-cosmic-text-muted hover:text-cosmic-cyan-light" : isHackathon ? "text-hackathon-text-muted hover:text-hackathon-cyan" : "text-text hover:text-green";
  const highlightClass = isCosmic ? "text-cosmic-text font-bold" : isHackathon ? "text-hackathon-cyan font-bold" : "text-green font-bold";
  const mobileBurger = isCosmic ? "bg-cosmic-cyan-light" : isHackathon ? "bg-hackathon-cyan" : "bg-green";
  const mobileMenuBg = isCosmic ? "bg-[#060a16]" : isHackathon ? "bg-hackathon-bg" : "bg-bg";
  const focusOutline = isCosmic ? "focus-visible:outline-cosmic" : isHackathon ? "focus-visible:outline-hackathon" : "focus-visible:outline-green";

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileOpen]);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Focus trap + Escape to close mobile menu
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
        return;
      }

      if (e.key === "Tab") {
        const menu = mobileMenuRef.current;
        if (!menu) return;

        const focusableEls = [
          hamburgerRef.current,
          ...Array.from(menu.querySelectorAll<HTMLElement>("a, button")),
        ].filter(Boolean) as HTMLElement[];

        if (focusableEls.length === 0) return;

        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <nav className={`sticky top-0 z-50 ${navBg}`} aria-label="Main navigation">
      {/* Desktop Nav — grid cell style with dividers */}
      <div className={`hidden md:flex items-stretch border max-w-[1440px] mx-auto ${borderClass}`}>
        {/* Logo cell — wider, ~1/3 of the bar */}
        <Link
          href="/"
          className={`flex items-center px-6 py-3 border-r w-[35%] ${borderClass}`}
        >
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={isCosmic ? 47 : 43}
            height={isCosmic ? 56 : 53}
            className={isCosmic ? "w-[40px] h-auto" : "w-[36px] h-auto"}
          />
        </Link>

        {/* Nav links — right portion, evenly spaced cells */}
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className={`flex-1 flex items-center justify-center px-4 py-4 border-l font-display text-base tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${focusOutline} ${borderClass} ${
              link.highlight
                ? highlightClass
                : linkBase
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden flex items-center justify-between px-4 py-3 border ${borderClass}`}>
        <Link href="/" className="flex items-center">
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={isCosmic ? 47 : 43}
            height={isCosmic ? 56 : 53}
            className={isCosmic ? "w-[34px] h-auto" : "w-[32px] h-auto"}
          />
        </Link>

        <button
          ref={hamburgerRef}
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`flex flex-col gap-[5px] p-3 focus-visible:outline-2 focus-visible:outline-offset-2 ${focusOutline}`}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`w-6 h-[3px] rounded-sm transition-transform ${mobileBurger} ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-[3px] rounded-sm transition-opacity ${mobileBurger} ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-[3px] rounded-sm transition-transform ${mobileBurger} ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div ref={mobileMenuRef} className={`md:hidden border-x border-b ${borderClass} ${mobileMenuBg}`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`block py-4 px-6 font-display text-base tracking-wider border-b text-center focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${focusOutline} ${
                isCosmic ? "border-cosmic" : isHackathon ? "border-hackathon/40" : "border-green/30"
              } ${
                link.highlight
                  ? highlightClass
                  : isCosmic
                    ? "text-cosmic-text-muted hover:text-cosmic-cyan-light"
                    : isHackathon
                      ? "text-hackathon-text-muted hover:text-hackathon-cyan"
                      : "text-text"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
