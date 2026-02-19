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
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-bg">
      {/* Desktop Nav — grid cell style with dividers */}
      <div className="hidden md:flex items-stretch border border-green max-w-[1440px] mx-auto">
        {/* Logo cell — wider, ~1/3 of the bar */}
        <Link
          href="/"
          className="flex items-center px-6 py-3 border-r border-green w-[35%]"
        >
          <Image
            src="/images/ms-symbol.png"
            alt="Mad Scientists"
            width={40}
            height={49}
            className="w-[36px] h-auto"
          />
        </Link>

        {/* Nav links — right portion, evenly spaced cells */}
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className={`flex-1 flex items-center justify-center px-4 py-4 border-l border-green font-display text-base tracking-wider transition-colors ${
              link.highlight
                ? "text-green font-bold"
                : "text-[#D2DFD4] hover:text-green"
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border border-green">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/ms-symbol.png"
            alt="Mad Scientists"
            width={32}
            height={39}
            className="w-[32px] h-auto"
          />
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-[5px] p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-[3px] bg-green rounded-sm transition-transform ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-[3px] bg-green rounded-sm transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-[3px] bg-green rounded-sm transition-transform ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-x border-b border-green bg-bg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`block py-4 px-6 font-display text-base tracking-wider border-b border-green/30 text-center ${
                link.highlight ? "text-green font-bold" : "text-[#D2DFD4]"
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
