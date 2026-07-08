"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bell, ChevronDown, LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { clearAuthSession } from "@/lib/auth-storage";
import { getDashboardPathByRole } from "@/lib/profile-completion";
import type { DashboardRole } from "@/components/dashboard/shared/dashboard-notifications.types";

type UserMenuProps = {
  avatar?: string;
  avatarInitials?: string;
  name: string;
  profileHref: string;
  role?: DashboardRole;
  subLabel?: string;
};

export function UserMenu({ avatar, avatarInitials = "RK", name, profileHref, role, subLabel }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    clearAuthSession();
    router.push("/auth/login");
  }

  const dashboardHref = getDashboardPathByRole(role);
  const notificationsHref = getNotificationsHref(role);
  const settingsHref = getSettingsHref(role, profileHref);

  return (
    <div className="relative" ref={menuRef}>
      <button
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-full pr-1 transition hover:bg-slate-50"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        <span className="relative grid size-8 place-items-center overflow-hidden rounded-full bg-emerald-950 text-xs font-black text-white">
          {avatar ? <Image alt="" className="object-cover" fill sizes="32px" src={avatar} /> : avatarInitials}
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-xs font-black leading-4 text-slate-900">{name}</span>
          {subLabel ? <span className="block text-[9px] font-bold uppercase tracking-wide text-slate-500">{subLabel}</span> : null}
        </span>
        <ChevronDown className="hidden size-3.5 text-slate-400 sm:block" />
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-40 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
          <Link
            className="flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800"
            href={dashboardHref}
            onClick={() => setIsOpen(false)}
          >
            <LayoutDashboard className="size-4" />
            Dashboard
          </Link>
          <Link
            className="flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800"
            href={profileHref}
            onClick={() => setIsOpen(false)}
          >
            <User className="size-4" />
            Profile
          </Link>
          <Link
            className="flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800"
            href={settingsHref}
            onClick={() => setIsOpen(false)}
          >
            <Settings className="size-4" />
            Settings
          </Link>
          <Link
            className="flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800"
            href={notificationsHref}
            onClick={() => setIsOpen(false)}
          >
            <Bell className="size-4" />
            Notifications
          </Link>
          <button
            className="flex h-9 w-full items-center gap-2 rounded-lg px-3 text-left text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-700"
            onClick={handleLogout}
            type="button"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}

function getNotificationsHref(role: DashboardRole | undefined) {
  switch (role) {
    case "farmer":
      return "/farmer/notifications";
    case "buyer":
      return "/buyer/notifications";
    case "admin":
      return "/admin/notifications";
    case "quality-officer":
      return "/quality-officer/notifications";
    default:
      return "/notifications";
  }
}

function getSettingsHref(role: DashboardRole | undefined, fallbackHref: string) {
  switch (role) {
    case "farmer":
      return "/farmer/settings";
    case "buyer":
      return "/buyer/settings";
    case "admin":
      return "/admin/settings";
    case "quality-officer":
      return "/quality-officer/settings";
    default:
      return fallbackHref;
  }
}
