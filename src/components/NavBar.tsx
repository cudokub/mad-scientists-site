"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "REVEAL INFO", href: "/revealinfo" },
  { label: "UNIVERSITY", href: "/maduniversity" },
  { label: "MAD APP", href: "https://app.madscientists.io", external: true },
  {
    label: "REVEAL MAD",
    href: "https://mygateway.io/minting/mad-scientists",
    external: true,
    highlight: true,
  },
  // TODO: Uncomment on COSMIC launch day (Day 5)
  // { label: "COSMIC", href: "/cosmic" },
];

interface NavBarProps {
  theme?: "default" | "cosmic";
}

export default function NavBar({ theme = "default" }: NavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isCosmic = theme === "cosmic";
  const logoSrc = isCosmic ? "/images/cosmic-symbol.png" : "/images/ms-symbol.png";
  const logoAlt = isCosmic ? "COSMIC" : "Mad Scientists";
  const navBg = isCosmic ? "bg-[#050a16]/95 backdrop-blur-sm" : "bg-bg";
  const borderClass = isCosmic ? "border-cosmic/40" : "border-green";
  const linkBase = isCosmic ? "text-[#cfc6ea] hover:text-[#9fe5ff]" : "text-[#D2DFD4] hover:text-green";
  const highlightClass = isCosmic ? "text-[#f3ecff] font-bold" : "text-green font-bold";
  const mobileBurger = isCosmic ? "bg-[#9fe5ff]" : "bg-green";
  const mobileMenuBg = isCosmic ? "bg-[#060a16]" : "bg-bg";

  return (
    <nav className={`sticky top-0 z-50 ${navBg}`}>
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
            width={isCosmic ? 46 : 40}
            height={isCosmic ? 50 : 49}
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
            className={`flex-1 flex items-center justify-center px-4 py-4 border-l font-display text-base tracking-wider transition-colors ${borderClass} ${
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
            width={isCosmic ? 38 : 32}
            height={isCosmic ? 41 : 39}
            className={isCosmic ? "w-[34px] h-auto" : "w-[32px] h-auto"}
          />
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-[5px] p-2"
          aria-label="Toggle menu"
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
        <div className={`md:hidden border-x border-b ${borderClass} ${mobileMenuBg}`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`block py-4 px-6 font-display text-base tracking-wider border-b text-center ${
                isCosmic ? "border-cosmic/25" : "border-green/30"
              } ${
                link.highlight
                  ? highlightClass
                  : isCosmic
                    ? "text-[#d5cfee] hover:text-[#9fe5ff]"
                    : "text-[#D2DFD4]"
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
