"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Bell, ChevronDown, LayoutDashboard, LogOut, Search, Settings, User } from "lucide-react";

import { DashboardNotificationDropdown } from "@/components/dashboard/shared/DashboardNotificationDropdown";
import { NotificationButton } from "@/components/dashboard/shared/NotificationButton";
import type { DashboardNotification, DashboardRole } from "@/components/dashboard/shared/dashboard-notifications.types";
import { clearAuthSession, getAccessToken, getStoredUser, subscribeToAuthChanges } from "@/lib/auth-storage";
import { cn } from "@/lib/cn";
import { getDashboardPathByRole, normalizeRole } from "@/lib/profile-completion";
import { getRoleProfileHref } from "@/lib/profile-status";
import {
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  type ApiRecord,
} from "@/lib/workflow-api";
import type { AuthUser } from "@/types/auth";

type AuthAwareNavbarProps = {
  activeLink?: "Marketplace" | "RFQ";
  publicNavbar: ReactNode;
  searchPlaceholder?: string;
};

const navLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/rfq", label: "RFQ" },
];

export function AuthAwareNavbar({
  activeLink = "Marketplace",
  publicNavbar,
  searchPlaceholder = "Search products, farms, categories...",
}: AuthAwareNavbarProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    function refreshAuthState() {
      setUser(getStoredUser());
      setHasToken(Boolean(getAccessToken()));
    }

    setIsMounted(true);
    refreshAuthState();

    return subscribeToAuthChanges(refreshAuthState);
  }, []);

  const role = normalizeRole(user?.role);
  const dashboardRole = role === "quality_officer" ? "quality-officer" : role;

  if (!isMounted || !hasToken || !user || !dashboardRole) {
    return <>{publicNavbar}</>;
  }

  return (
    <PublicAuthenticatedNavbar
      activeLink={activeLink}
      role={dashboardRole}
      searchPlaceholder={searchPlaceholder}
      user={user}
    />
  );
}

function PublicAuthenticatedNavbar({
  activeLink,
  role,
  searchPlaceholder,
  user,
}: {
  activeLink: "Marketplace" | "RFQ";
  role: DashboardRole;
  searchPlaceholder: string;
  user: AuthUser;
}) {
  const pathname = usePathname();
  const dashboardHref = getDashboardPathByRole(role);
  const displayName = getDisplayName(user);
  const avatar = getAvatar(user);
  const roleLabel = getRoleLabel(user);
  const initials = useMemo(() => getInitials(displayName), [displayName]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm" dir="ltr">
      <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link className="flex shrink-0 items-center gap-2.5 rounded-lg text-2xl font-black text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/30" href="/">
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

        <div className="hidden h-12 w-full max-w-[315px] items-center gap-3 rounded-full bg-slate-100 px-5 text-slate-500 lg:flex">
          <Search className="size-5 shrink-0" />
          <input
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-500"
            placeholder={searchPlaceholder}
            type="search"
          />
        </div>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive =
              link.label === activeLink ||
              pathname === link.href ||
              pathname.startsWith(`${link.href}/`) ||
              (link.label === "Marketplace" && pathname.startsWith("/marketplace/"));

            return (
              <Link
                className={cn(
                  "border-b-2 py-2 text-base font-medium transition",
                  isActive ? "border-emerald-800 text-emerald-900" : "border-transparent text-slate-600 hover:text-emerald-900",
                )}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            className={cn(
              "border-b-2 py-2 text-base font-medium transition",
              pathname === dashboardHref ? "border-emerald-800 text-emerald-900" : "border-transparent text-slate-600 hover:text-emerald-900",
            )}
            href={dashboardHref}
          >
            Dashboard
          </Link>
        </div>

        <AuthenticatedUserCluster avatar={avatar} displayName={displayName} initials={initials} role={role} roleLabel={roleLabel} />
      </nav>
    </header>
  );
}

export function AuthenticatedUserCluster({
  avatar,
  displayName,
  initials,
  role,
  roleLabel,
}: {
  avatar?: string;
  displayName: string;
  initials: string;
  role: DashboardRole;
  roleLabel?: string;
}) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const notificationMenuRef = useRef<HTMLDivElement | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<DashboardNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadNotifications() {
      try {
        const [records, unreadResponse] = await Promise.all([getNotifications(), getUnreadNotificationCount()]);
        if (!isMounted) return;
        setNotifications(records.map((record) => mapDashboardNotification(record, role)));
        setUnreadCount(readUnreadCount(unreadResponse));
      } catch {
        if (!isMounted) return;
        setNotifications([]);
        setUnreadCount(null);
      }
    }

    void loadNotifications();
    const intervalId = window.setInterval(() => {
      if (document.visibilityState !== "hidden") {
        void loadNotifications();
      }
    }, 45000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [role]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (notificationMenuRef.current && !notificationMenuRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    clearAuthSession();
    setIsUserMenuOpen(false);
    setIsNotificationOpen(false);
    router.push("/auth/login");
  }

  function handleMarkAllAsRead() {
    setNotifications((current) => current.map((notification) => ({ ...notification, isRead: true })));
    setUnreadCount(0);
    void markAllNotificationsAsRead();
  }

  function handleNotificationRead(notificationId: string) {
    setNotifications((current) =>
      current.map((notification) => (notification.id === notificationId ? { ...notification, isRead: true } : notification)),
    );
    setUnreadCount((current) => (current === null ? current : Math.max(0, current - 1)));
    void markNotificationAsRead(notificationId);
  }

  const count = unreadCount ?? notifications.filter((notification) => !notification.isRead).length;
  const dashboardHref = getDashboardPathByRole(role);
  const profileHref = getRoleProfileHref(role);
  const settingsHref = getSettingsHref(role, profileHref);
  const notificationsHref = getNotificationsHref(role);

  return (
    <div className="ml-auto flex items-center gap-5">
      <div className="relative" ref={notificationMenuRef}>
        <NotificationButton aria-expanded={isNotificationOpen} count={count} onClick={() => setIsNotificationOpen((value) => !value)} />
        {isNotificationOpen ? (
          <DashboardNotificationDropdown
            notifications={notifications}
            onClose={() => setIsNotificationOpen(false)}
            onMarkAllAsRead={handleMarkAllAsRead}
            onNotificationRead={handleNotificationRead}
            role={role}
          />
        ) : null}
      </div>

      <div className="relative" ref={menuRef}>
        <button
          aria-expanded={isUserMenuOpen}
          className="flex items-center gap-3 rounded-xl px-2 py-1.5 text-left transition hover:bg-emerald-50/60 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
          onClick={() => setIsUserMenuOpen((value) => !value)}
          type="button"
        >
          <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-emerald-900 text-sm font-black text-white ring-2 ring-emerald-100">
            {avatar ? <Image alt="User avatar" className="object-cover" fill sizes="44px" src={avatar} /> : initials}
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block max-w-36 truncate text-sm font-black text-slate-900">{displayName}</span>
            {roleLabel ? <span className="block max-w-36 truncate text-[11px] font-bold uppercase text-slate-500">{roleLabel}</span> : null}
          </span>
          <ChevronDown className={cn("hidden size-4 text-slate-500 transition sm:block", isUserMenuOpen && "rotate-180")} />
        </button>

        {isUserMenuOpen ? (
          <div className="absolute right-0 top-[calc(100%+10px)] w-52 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-2xl">
            <MenuLink href={dashboardHref} icon={<LayoutDashboard className="size-4" />} label="Dashboard" />
            <MenuLink href={profileHref} icon={<User className="size-4" />} label="Profile" />
            <MenuLink href={settingsHref} icon={<Settings className="size-4" />} label="Settings" />
            <MenuLink href={notificationsHref} icon={<Bell className="size-4" />} label="Notifications" />
            <button
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-bold text-red-600 transition hover:bg-red-50"
              onClick={handleLogout}
              type="button"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function MenuLink({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <Link className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-emerald-50/50 hover:text-emerald-900" href={href}>
      {icon}
      {label}
    </Link>
  );
}

export function getProfileRecord(user: AuthUser | null) {
  return user?.profile && typeof user.profile === "object" && !Array.isArray(user.profile)
    ? (user.profile as Record<string, unknown>)
    : {};
}

export function getString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function getDisplayName(user: AuthUser | null) {
  const profile = getProfileRecord(user);
  return (
    getString(profile.fullName ?? profile.name) ??
    getString(user?.fullName ?? user?.name) ??
    getString(user?.email) ??
    "User"
  );
}

export function getAvatar(user: AuthUser | null) {
  const profile = getProfileRecord(user);
  return getString(profile.profileImage ?? profile.avatarUrl ?? profile.avatar ?? user?.avatarUrl ?? user?.avatar);
}

export function getRoleLabel(user: AuthUser | null) {
  const profile = getProfileRecord(user);
  const farmName = getString(profile.farmName ?? user?.farmName);
  if (farmName) return farmName;

  switch (normalizeRole(user?.role)) {
    case "farmer":
      return "Farmer";
    case "buyer":
      return "Buyer";
    case "admin":
      return "Admin";
    case "quality_officer":
      return "Quality Officer";
    default:
      return undefined;
  }
}

export function getInitials(name: string) {
  return (
    name
      .split(" ")
      .map((part) => part.trim()[0])
      .filter(Boolean)
      .join("")
      .slice(0, 2)
      .toUpperCase() || "US"
  );
}

function mapDashboardNotification(record: ApiRecord, role: DashboardRole): DashboardNotification {
  const type = String(record.type ?? record.category ?? "system");
  const dealId = getString(record.dealId);
  const rfqId = getString(record.rfqId);

  return {
    href: getNotificationHref(role, dealId, rfqId),
    id: String(record.id ?? record._id ?? ""),
    isRead: record.read === true || record.isRead === true,
    message: String(record.message ?? record.body ?? ""),
    time: String(record.createdAt ?? record.time ?? "Recently"),
    title: String(record.title ?? "Notification"),
    type: type === "payment" || type === "dispute" || type === "verification" ? type : "system",
  };
}

function getNotificationHref(role: DashboardRole, dealId?: string, rfqId?: string) {
  if (role === "buyer") {
    if (dealId) return `/buyer/deals/${dealId}`;
    if (rfqId) return "/rfq";
  }

  if (role === "farmer") {
    if (dealId) return `/farmer/deals/${dealId}`;
    if (rfqId) return "/rfq";
  }

  return undefined;
}

function readUnreadCount(record: ApiRecord) {
  const value = record.count ?? record.unreadCount ?? record.total ?? record.data;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function getNotificationsHref(role: DashboardRole) {
  switch (role) {
    case "farmer":
      return "/farmer/notifications";
    case "buyer":
      return "/buyer/notifications";
    case "admin":
      return "/admin/notifications";
    case "quality-officer":
      return "/quality-officer/notifications";
  }
}

function getSettingsHref(role: DashboardRole, fallbackHref: string) {
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
