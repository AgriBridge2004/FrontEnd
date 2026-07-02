"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronDown, LogOut, Menu, Search, User, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { clearAuthSession, getAccessToken, getStoredRole, getStoredUser } from "@/lib/auth-storage";
import { getFarmerAvatarUrl, getFarmerDisplayName, getFarmerFarmName } from "@/lib/farmer-display";
import type { AuthUser } from "@/types/auth";

const links = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Categories", href: "/marketplace" },
  { label: "RFQ", href: "/buyer/rfqs/create" },
];

type NavbarProps = {
  authenticatedFarmerOnly?: boolean;
};

export function Navbar({ authenticatedFarmerOnly = false }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFarmer, setIsFarmer] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userLabel, setUserLabel] = useState("");
  const [farmLabel, setFarmLabel] = useState("Farm profile incomplete");
  const [dashboardHref, setDashboardHref] = useState("/marketplace");
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = getStoredUser();
    const role = getStoredRole();
    const nextUserLabel = getFarmerDisplayName(storedUser);
    const nextFarmLabel = getFarmerFarmName(storedUser);

    setIsMounted(true);
    setIsLoggedIn(Boolean(getAccessToken()));
    setIsFarmer(role === "farmer");
    setUser(storedUser);
    setUserLabel(nextUserLabel);
    setFarmLabel(nextFarmLabel);
    setDashboardHref(getDashboardHref(role));
  }, []);

  useEffect(() => {
    if (!isUserMenuOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isUserMenuOpen]);

  const avatarInitial = useMemo(() => userLabel.trim().charAt(0).toUpperCase() || "A", [userLabel]);

  function handleLogout() {
    clearAuthSession();
    setIsLoggedIn(false);
    setIsFarmer(false);
    setUser(null);
    setUserLabel("");
    setFarmLabel("Farm profile incomplete");
    setDashboardHref("/marketplace");
    setIsOpen(false);
    setIsUserMenuOpen(false);
    router.push("/auth/login");
  }

  if (isMounted && isLoggedIn && isFarmer) {
    return (
      <AuthenticatedFarmerNavbar
        avatarInitial={avatarInitial}
        dashboardHref={dashboardHref}
        farmLabel={farmLabel}
        isMobileOpen={isOpen}
        isUserMenuOpen={isUserMenuOpen}
        onLogout={handleLogout}
        onToggleMobile={() => setIsOpen((value) => !value)}
        onToggleUserMenu={() => setIsUserMenuOpen((value) => !value)}
        pathname={pathname}
        user={user}
        userLabel={userLabel}
        userMenuRef={userMenuRef}
      />
    );
  }

  if (authenticatedFarmerOnly) {
    return null;
  }

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
          {isMounted && isLoggedIn ? (
            <>
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <span className="grid size-9 place-items-center rounded-full bg-white text-sm font-black text-emerald-950">
                  {avatarInitial}
                </span>
                <span className="max-w-36 truncate">{userLabel}</span>
              </div>
              <Link
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-black text-emerald-950 shadow-sm transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-white/60"
                href={dashboardHref}
              >
                Dashboard
              </Link>
              <button
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/35 px-6 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60"
                onClick={handleLogout}
                type="button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
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
          {isMounted && isLoggedIn ? (
            <div className="mt-5 grid gap-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span className="grid size-9 place-items-center rounded-full bg-white text-sm font-black text-emerald-950">
                  {avatarInitial}
                </span>
                <span className="truncate text-sm font-bold">{userLabel}</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  className="inline-flex h-11 items-center justify-center rounded-full bg-white font-black text-emerald-950 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-white/60"
                  href={dashboardHref}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/30 font-bold transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60"
                  onClick={handleLogout}
                  type="button"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      ) : null}
    </header>
  );
}

type AuthenticatedFarmerNavbarProps = {
  avatarInitial: string;
  dashboardHref: string;
  farmLabel: string;
  isMobileOpen: boolean;
  isUserMenuOpen: boolean;
  onLogout: () => void;
  onToggleMobile: () => void;
  onToggleUserMenu: () => void;
  pathname: string;
  user: AuthUser | null;
  userLabel: string;
  userMenuRef: React.RefObject<HTMLDivElement>;
};

const farmerLinks = [
  { label: "Marketplace", href: "/marketplace", activePaths: ["/", "/marketplace"] },
  { label: "RFQ", href: "/farmer/rfqs", activePaths: ["/farmer/rfqs"] },
  { label: "Dashboard", href: "/farmer/dashboard", activePaths: ["/farmer/dashboard"] },
];

function AuthenticatedFarmerNavbar({
  avatarInitial,
  dashboardHref,
  farmLabel,
  isMobileOpen,
  isUserMenuOpen,
  onLogout,
  onToggleMobile,
  onToggleUserMenu,
  pathname,
  user,
  userLabel,
  userMenuRef,
}: AuthenticatedFarmerNavbarProps) {
  const avatarSrc = getFarmerAvatarUrl(user);

  return (
    <header className="relative z-50 border-b border-slate-200 bg-white shadow-sm" dir="ltr">
      <nav className="mx-auto flex min-h-[84px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link className="flex shrink-0 items-center gap-2.5 text-2xl font-black text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/30" href="/">
          <span className="grid size-10 place-items-center rounded-lg bg-emerald-900 text-white">
            <Image alt="AgriBridge mark" className="object-contain p-1.5" height={40} src="/images/brand/agribridge-logo.png" width={40} />
          </span>
          <span>AgriBridge</span>
        </Link>

        <div className="hidden h-12 w-full max-w-[315px] items-center gap-3 rounded-full bg-slate-100 px-5 text-slate-500 lg:flex">
          <Search className="size-5 shrink-0" />
          <input
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-500"
            placeholder="Search products, farms, categories..."
            type="search"
          />
        </div>

        <div className="hidden items-center gap-8 lg:flex">
          {farmerLinks.map((link) => {
            const isActive = link.activePaths.some((activePath) => pathname === activePath || pathname.startsWith(`${activePath}/`));

            return (
              <Link
                className={`border-b-2 py-2 text-base font-medium transition ${
                  isActive ? "border-emerald-800 text-emerald-900" : "border-transparent text-slate-600 hover:text-emerald-900"
                }`}
                href={link.href}
                key={link.label}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <button
            aria-label="Notifications"
            className="relative grid size-10 place-items-center rounded-full text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-900"
            type="button"
          >
            <Bell className="size-5" />
            <span className="absolute right-1.5 top-1 grid size-5 place-items-center rounded-full bg-red-500 text-[11px] font-black text-white">
              3
            </span>
          </button>

          <div className="relative" ref={userMenuRef}>
            <button
              aria-expanded={isUserMenuOpen}
              className="flex items-center gap-3 rounded-xl px-2 py-1.5 text-left transition hover:bg-emerald-50/60 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
              onClick={onToggleUserMenu}
              type="button"
            >
              <Avatar avatarInitial={avatarInitial} avatarSrc={avatarSrc} />
              <span className="min-w-0">
                <span className="block max-w-36 truncate text-sm font-black text-slate-900">{userLabel}</span>
                <span className="block max-w-36 truncate text-[11px] font-bold uppercase text-slate-500">{farmLabel}</span>
              </span>
              <ChevronDown className={`size-4 text-slate-500 transition ${isUserMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {isUserMenuOpen ? <UserDropdown onLogout={onLogout} /> : null}
          </div>
        </div>

        <button
          aria-label="Toggle navigation"
          className="grid size-11 place-items-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-emerald-50 lg:hidden"
          onClick={onToggleMobile}
          type="button"
        >
          {isMobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {isMobileOpen ? (
        <div className="mx-5 mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl lg:hidden">
          <div className="flex h-11 items-center gap-3 rounded-full bg-slate-100 px-4 text-slate-500">
            <Search className="size-4 shrink-0" />
            <input
              className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none"
              placeholder="Search products, farms, categories..."
              type="search"
            />
          </div>
          <div className="mt-4 grid gap-2 text-sm font-bold text-slate-700">
            {[...farmerLinks, { label: "Profile", href: "/farmer/profile", activePaths: ["/farmer/profile"] }].map((link) => (
              <Link
                className="rounded-lg px-3 py-2 transition hover:bg-emerald-50 hover:text-emerald-900"
                href={link.href}
                key={link.label}
              >
                {link.label}
              </Link>
            ))}
            <button
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-left font-bold text-red-600 transition hover:bg-red-50"
              onClick={onLogout}
              type="button"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Avatar({ avatarInitial, avatarSrc }: { avatarInitial: string; avatarSrc?: string }) {
  return (
    <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-emerald-900 text-sm font-black text-white ring-2 ring-emerald-100">
      {avatarSrc ? <Image alt="User avatar" className="object-cover" fill sizes="44px" src={avatarSrc} /> : avatarInitial}
    </span>
  );
}

function UserDropdown({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="absolute right-0 top-[calc(100%+10px)] w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-2xl">
      <Link
        className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-emerald-50/50 hover:text-emerald-900"
        href="/farmer/profile"
      >
        <User className="size-4" />
        Profile
      </Link>
      <button
        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-bold text-red-600 transition hover:bg-red-50"
        onClick={onLogout}
        type="button"
      >
        <LogOut className="size-4" />
        Logout
      </button>
    </div>
  );
}

function getDashboardHref(role: string | null | undefined) {
  if (role === "farmer") {
    return "/farmer/dashboard";
  }

  if (role === "buyer") {
    return "/buyer/dashboard";
  }

  if (role === "quality_officer" || role === "officer") {
    return "/officer/dashboard";
  }

  if (role === "admin") {
    return "/admin/dashboard";
  }

  return "/marketplace";
}
