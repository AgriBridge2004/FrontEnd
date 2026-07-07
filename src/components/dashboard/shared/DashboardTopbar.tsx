"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { DashboardNotificationDropdown } from "@/components/dashboard/shared/DashboardNotificationDropdown";
import { NotificationButton } from "@/components/dashboard/shared/NotificationButton";
import { UserMenu } from "@/components/dashboard/shared/UserMenu";
import {
  getDashboardNotifications,
} from "@/components/dashboard/shared/dashboard-notifications.mock";
import type { DashboardNotification, DashboardRole } from "@/components/dashboard/shared/dashboard-notifications.types";
import { cn } from "@/lib/cn";

type DashboardTopbarProps = {
  hideSearch?: boolean;
  navLinks?: Array<{ href: string; label: string; active?: boolean }>;
  notificationCount?: number;
  onSearchChange?: (value: string) => void;
  onMenuClick: () => void;
  profileHref: string;
  role: DashboardRole;
  searchPlaceholder?: string;
  searchValue?: string;
  user: {
    name: string;
    roleLabel?: string;
    avatar?: string;
    initials?: string;
  };
};

export function DashboardTopbar({
  hideSearch = false,
  navLinks = [],
  notificationCount = 0,
  onMenuClick,
  onSearchChange,
  profileHref,
  role,
  searchPlaceholder = "Search...",
  searchValue,
  user,
}: DashboardTopbarProps) {
  const pathname = usePathname();
  const notificationMenuRef = useRef<HTMLDivElement | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<DashboardNotification[]>(() => getDashboardNotifications(role));
  const [toast, setToast] = useState("");
  const initials = user.initials ?? user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const unreadNotificationCount = notifications.filter((notification) => !notification.isRead).length;

  useEffect(() => {
    setNotifications(getDashboardNotifications(role));
  }, [role]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationMenuRef.current && !notificationMenuRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsNotificationOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  function showToast(message: string) {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToast(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToast("");
      toastTimeoutRef.current = null;
    }, 2400);
  }

  function handleMarkAllAsRead() {
    // TODO: Connect mark all as read endpoint.
    setNotifications((currentNotifications) => currentNotifications.map((notification) => ({ ...notification, isRead: true })));
    showToast("All notifications marked as read.");
  }

  function handleNotificationRead(notificationId: string) {
    // TODO: Connect notification detail routes.
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    );
  }

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
            const isActive = link.active ?? (pathname === link.href || pathname.startsWith(`${link.href}/`));

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
          <div className="relative" ref={notificationMenuRef}>
            <NotificationButton
              aria-expanded={isNotificationOpen}
              count={unreadNotificationCount}
              onClick={() => setIsNotificationOpen((value) => !value)}
            />
            {isNotificationOpen ? (
              <DashboardNotificationDropdown
                notifications={notifications}
                onClose={() => setIsNotificationOpen(false)}
                onMarkAllAsRead={handleMarkAllAsRead}
                onMissingNotificationHref={() => showToast("Notification details will be connected later.")}
                onNotificationRead={handleNotificationRead}
                role={role}
              />
            ) : null}
          </div>
          <UserMenu avatar={user.avatar} avatarInitials={initials} name={user.name} profileHref={profileHref} subLabel={user.roleLabel} />
        </div>
      </div>

      {hideSearch ? null : (
        <div className="border-t border-slate-100 px-4 py-2 md:hidden">
          <div className="flex h-9 items-center gap-2.5 rounded-full border border-slate-300 bg-stone-50 px-3.5 text-slate-500 focus-within:ring-2 focus-within:ring-emerald-700/20">
            <Search className="size-4 shrink-0 text-slate-600" />
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

      {toast ? (
        <div className="fixed bottom-5 right-5 z-[60] rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </header>
  );
}
