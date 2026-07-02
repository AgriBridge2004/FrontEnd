"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronDown, LogOut, Menu, Search, User } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { clearAuthSession, getStoredUser } from "@/lib/auth-storage";
import { getFarmerAvatarUrl, getFarmerDisplayName, getFarmerFarmName } from "@/lib/farmer-display";
import type { AuthUser } from "@/types/auth";

type FarmerTopbarProps = {
  onMenuClick: () => void;
  onSearchChange?: (value: string) => void;
  searchValue?: string;
  searchPlaceholder?: string;
};

const farmerLinks = [
  { label: "Marketplace", href: "/marketplace", activePaths: ["/marketplace"] },
  { label: "RFQ", href: "/farmer/rfqs", activePaths: ["/farmer/rfqs"] },
  { label: "Dashboard", href: "/farmer/dashboard", activePaths: ["/farmer/dashboard"] },
];

export function FarmerTopbar({
  onMenuClick,
  onSearchChange,
  searchValue,
  searchPlaceholder = "Search products, farms, categories...",
}: FarmerTopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUser(getStoredUser());
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

  const userLabel = getFarmerDisplayName(user);
  const farmLabel = getFarmerFarmName(user);
  const avatarSrc = getFarmerAvatarUrl(user);
  const avatarInitial = useMemo(() => userLabel.trim().charAt(0).toUpperCase() || "A", [userLabel]);

  function handleLogout() {
    clearAuthSession();
    setUser(null);
    setIsUserMenuOpen(false);
    router.push("/auth/login");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm" dir="ltr">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-5 lg:px-7">
        <button
          aria-label="Open sidebar"
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-600 lg:hidden"
          onClick={onMenuClick}
          type="button"
        >
          <Menu className="size-5" />
        </button>

        <div className="hidden h-11 w-full max-w-[315px] items-center gap-3 rounded-full bg-slate-100 px-5 text-slate-500 md:flex xl:max-w-[360px]">
          <Search className="size-5 shrink-0" />
          <input
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-500"
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder={searchPlaceholder}
            type="search"
            value={searchValue}
          />
        </div>

        <div className="ml-auto hidden h-full items-center gap-7 text-sm font-semibold text-slate-700 lg:flex xl:gap-8">
          {farmerLinks.map((link) => {
            const isActive = link.activePaths.some((activePath) => pathname === activePath || pathname.startsWith(`${activePath}/`));

            return (
              <Link
                className={`flex h-full items-center border-b-2 pt-0.5 transition ${
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

        <div className="ml-auto flex h-full items-center gap-3 md:ml-0">
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
              className="flex items-center gap-2.5 rounded-xl px-1.5 py-1.5 text-left transition hover:bg-emerald-50/60 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 sm:gap-3 sm:px-2"
              onClick={() => setIsUserMenuOpen((value) => !value)}
              type="button"
            >
              <Avatar avatarInitial={avatarInitial} avatarSrc={avatarSrc} />
              <span className="hidden min-w-0 sm:block">
                <span className="block max-w-32 truncate text-sm font-black leading-4 text-slate-900 xl:max-w-36">{userLabel}</span>
                <span className="hidden max-w-32 truncate text-[11px] font-bold uppercase text-slate-500 md:block xl:max-w-36">
                  {farmLabel}
                </span>
              </span>
              <ChevronDown className={`hidden size-4 text-slate-500 transition sm:block ${isUserMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {isUserMenuOpen ? <UserDropdown onLogout={handleLogout} /> : null}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 px-4 py-2.5 md:hidden">
        <div className="flex h-10 items-center gap-3 rounded-full bg-slate-100 px-4 text-slate-500">
          <Search className="size-4 shrink-0" />
          <input
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-500"
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder={searchPlaceholder}
            type="search"
            value={searchValue}
          />
        </div>
      </div>
    </header>
  );
}

function Avatar({ avatarInitial, avatarSrc }: { avatarInitial: string; avatarSrc?: string }) {
  return (
    <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-emerald-900 text-sm font-black text-white ring-2 ring-emerald-100">
      {avatarSrc ? <Image alt="User avatar" className="object-cover" fill sizes="40px" src={avatarSrc} /> : avatarInitial}
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
