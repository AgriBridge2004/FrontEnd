"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { buttonClasses } from "@/components/ui/Button";
import { AuthAwareNavbar } from "@/components/layout/AuthAwareNavbar";
import { cn } from "@/lib/cn";

const navLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "RFQ", href: "/rfq" },
];

type MarketplaceNavbarProps = {
  activeLink?: "Marketplace" | "RFQ";
};

export function MarketplaceNavbar({ activeLink = "Marketplace" }: MarketplaceNavbarProps) {
  return (
    <AuthAwareNavbar
      activeLink={activeLink}
      publicNavbar={<PublicMarketplaceNavbar activeLink={activeLink} />}
      searchPlaceholder={activeLink === "RFQ" ? "Search RFQs, products, suppliers..." : "Search products, farms, categories..."}
    />
  );
}

function PublicMarketplaceNavbar({ activeLink = "Marketplace" }: MarketplaceNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/95 shadow-sm backdrop-blur" dir="ltr">
      <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link
          className="flex shrink-0 items-center gap-2.5 rounded-lg text-2xl font-black text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          href="/"
        >
          <span className="relative block h-11 w-[165px]">
            <Image
              alt="AgriBridge logo"
              className="object-contain object-left"
              fill
              priority
              sizes="165px"
              src="/images/brand/agribridge-logo-Green.png"
            />
          </span>
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <Link
              className={cn(
                "border-b-2 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-emerald-700/20",
                link.label === activeLink
                  ? "border-emerald-800 text-emerald-900"
                  : "border-transparent text-emerald-900/80 hover:text-emerald-950",
              )}
              href={link.href}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-emerald-900/70">
            <span className="text-emerald-950">EN</span>
            <span className="h-4 w-px bg-emerald-900/20" />
            <span>AR</span>
          </div>
          <Link className={cn(buttonClasses("secondary"), "h-11 rounded-full border-transparent px-7 font-black")} href="/auth/login">
            Login
          </Link>
          <Link className={cn(buttonClasses("primary"), "h-11 rounded-full bg-emerald-100 px-7 font-black text-emerald-950 hover:bg-emerald-200")} href="/auth/register">
            Get Started
          </Link>
        </div>

        <button
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          className="grid size-11 place-items-center rounded-xl border border-slate-200 text-emerald-900 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="mx-5 mb-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-xl lg:hidden">
          <div className="grid gap-2 text-sm font-bold text-slate-700">
            {navLinks.map((link) => (
              <Link
                className={cn(
                  "rounded-lg px-3 py-2 transition hover:bg-emerald-50 hover:text-emerald-900",
                  link.label === activeLink && "bg-emerald-50 text-emerald-900",
                )}
                href={link.href}
                key={link.label}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wide text-emerald-900/70 sm:col-span-2">
              <span className="text-emerald-950">EN</span>
              <span className="h-4 w-px bg-emerald-900/20" />
              <span>AR</span>
            </div>
            <Link className={cn(buttonClasses("secondary"), "rounded-full")} href="/auth/login" onClick={() => setIsOpen(false)}>
              Login
            </Link>
            <Link className={cn(buttonClasses("primary"), "rounded-full")} href="/auth/register" onClick={() => setIsOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
