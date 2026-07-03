"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";

import { NotificationButton } from "@/components/dashboard/shared/NotificationButton";
import { UserMenu } from "@/components/dashboard/shared/UserMenu";

type DashboardTopbarProps = {
  navLinks: Array<{ href: string; label: string }>;
  notificationCount?: number;
  onSearchChange?: (value: string) => void;
  onMenuClick: () => void;
  profileHref: string;
  searchPlaceholder: string;
  searchValue?: string;
  userSubLabel?: string;
  userName: string;
};

export function DashboardTopbar({
  navLinks,
  notificationCount = 0,
  onMenuClick,
  onSearchChange,
  profileHref,
  searchPlaceholder,
  searchValue,
  userSubLabel,
  userName,
}: DashboardTopbarProps) {
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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

        <div className="hidden h-11 w-full max-w-[386px] items-center gap-2.5 rounded-full border border-slate-300 bg-stone-50 px-4 md:flex">
          <Search className="size-[18px] shrink-0 text-slate-600" />
          <input
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-500"
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder={searchPlaceholder}
            type="search"
            value={searchValue}
          />
        </div>

        <nav className="ml-auto hidden h-full items-center gap-8 text-sm font-semibold text-slate-700 md:flex">
          {navLinks.map((link) => (
            <Link className="transition hover:text-emerald-800" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex h-full items-center gap-3 md:ml-0">
          <NotificationButton count={notificationCount} />
          <UserMenu avatarInitials={initials} name={userName} profileHref={profileHref} subLabel={userSubLabel} />
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
