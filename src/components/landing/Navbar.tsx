"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Categories", href: "/marketplace" },
  { label: "RFQ", href: "/buyer/rfqs/create" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link className="flex items-center focus:outline-none focus:ring-2 focus:ring-white/60" href="/">
          <span className="relative block h-10 w-[151px]">
            <Image
              alt="AgriBridge logo"
              className="object-contain"
              fill
              priority
              sizes="151px"
              src="/images/brand/agribridge-logo.png"
            />
          </span>
        </Link>

        <div className="hidden items-center gap-9 text-sm font-bold text-white/80 lg:flex">
          {links.map((link) => (
            <Link
              className="rounded-sm transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/60"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="inline-flex items-center gap-1 rounded-sm transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/60"
            href="#faq"
          >
            Resources <ChevronDown className="size-4" />
          </Link>
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-white/75">
            <span className="text-white">EN</span>
            <span className="h-4 w-px bg-white/35" />
            <span>AR</span>
          </div>
          <Link
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/35 px-7 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60"
            href="/auth/login"
          >
            Login
          </Link>
          <Link
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-7 text-sm font-black text-emerald-950 shadow-sm transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-white/60"
            href="/auth/register"
          >
            Get Started
          </Link>
        </div>

        <button
          aria-label="Toggle navigation"
          className="grid size-11 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60 lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="mx-5 rounded-2xl border border-white/10 bg-emerald-950/95 p-5 text-white shadow-2xl backdrop-blur lg:hidden">
          <div className="grid gap-4 text-sm font-bold">
            {[...links, "Resources"].map((link) => (
              <Link
                className="rounded-sm focus:outline-none focus:ring-2 focus:ring-white/60"
                href={typeof link === "string" ? "#faq" : link.href}
                key={typeof link === "string" ? link : link.label}
                onClick={() => setIsOpen(false)}
              >
                {typeof link === "string" ? link : link.label}
              </Link>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/30 font-bold transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60"
              href="/auth/login"
            >
              Login
            </Link>
            <Link
              className="inline-flex h-11 items-center justify-center rounded-full bg-white font-black text-emerald-950 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-white/60"
              href="/auth/register"
            >
              Get Started
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
