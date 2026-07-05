"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";

import { NotificationButton } from "@/components/dashboard/shared/NotificationButton";
import { UserMenu } from "@/components/dashboard/shared/UserMenu";
import { cn } from "@/lib/cn";

type DashboardTopbarProps = {
  hideSearch?: boolean;
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
  hideSearch = false,
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
  const pathname = usePathname();
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm" dir="ltr">
      <div className="flex h-14 items-center gap-3 px-4 sm:px-5 lg:px-6">
        <button
          aria-label="Open sidebar"
          className="grid size-9 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-600 lg:hidden"
          onClick={onMenuClick}
          type="button"
        >
          <Menu className="size-5" />
        </button>

        {hideSearch ? null : (
          <div className="hidden h-9 w-full max-w-[360px] items-center gap-2.5 rounded-full border border-slate-300 bg-stone-50 px-3.5 md:flex">
            <Search className="size-4 shrink-0 text-slate-600" />
            <input
              className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-slate-700 outline-none placeholder:text-slate-500"
              onChange={(event) => onSearchChange?.(event.target.value)}
              placeholder={searchPlaceholder}
              type="search"
              value={searchValue}
            />
          </div>
        )}

        <nav className="ml-auto hidden h-full items-center gap-8 text-sm font-semibold text-slate-700 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                className={cn(
                  "relative flex h-full items-center transition after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-emerald-800 after:transition-all hover:text-emerald-800 hover:after:w-full",
                  isActive ? "text-emerald-900 after:w-full" : "after:w-0",
                )}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex h-full items-center gap-2.5 border-l border-slate-100 pl-3 md:ml-0">
          <NotificationButton count={notificationCount} />
          <UserMenu avatarInitials={initials} name={userName} profileHref={profileHref} subLabel={userSubLabel} />
        </div>
      </div>

      {hideSearch ? null : (
        <div className="border-t border-slate-100 px-4 py-2 md:hidden">
          <div className="flex h-9 items-center gap-3 rounded-full bg-slate-100 px-3.5 text-slate-500">
            <Search className="size-4 shrink-0" />
            <input
              className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-slate-700 outline-none placeholder:text-slate-500"
              onChange={(event) => onSearchChange?.(event.target.value)}
              placeholder={searchPlaceholder}
              type="search"
              value={searchValue}
            />
          </div>
        </div>
      )}
    </header>
  );
}
