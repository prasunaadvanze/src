"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "#quote", label: "Get a Quote" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#support", label: "Support" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gainsco-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label="GAINSCO Auto Insurance home">
          <Image
            src="/images/gainsco-logo.png"
            alt="GAINSCO Auto Insurance"
            width={180}
            height={48}
            className="h-10 w-auto sm:h-11 hue-rotate-[205deg] saturate-[1.15]"
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-gainsco-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            size="sm"
            onClick={() => document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start Quote
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div
        className={clsx(
          "border-t border-slate-100 bg-white md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-gainsco-50 hover:text-gainsco-700"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button
            className="mt-2 w-full"
            size="sm"
            onClick={() => {
              setOpen(false);
              document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start Quote
          </Button>
        </nav>
      </div>
    </header>
  );
}
