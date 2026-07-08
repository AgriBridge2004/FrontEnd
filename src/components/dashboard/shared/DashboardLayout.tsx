"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { DashboardSidebar, type DashboardSidebarItem } from "@/components/dashboard/shared/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/shared/DashboardTopbar";
import { cn } from "@/lib/cn";
import { getStoredUser, subscribeToAuthChanges } from "@/lib/auth-storage";
import type { AuthUser } from "@/types/auth";

type DashboardLayoutProps = {
  children: ReactNode;
  hideSearch?: boolean;
  hideTopbar?: boolean;
  navLinks: Array<{ href: string; label: string }>;
  notificationCount?: number;
  onSearchChange?: (value: string) => void;
  profileHref: string;
  role: "farmer" | "buyer" | "quality-officer" | "admin";
  searchPlaceholder: string;
  searchValue?: string;
  sidebarItems: DashboardSidebarItem[];
  userSubLabel?: string;
  userName: string;
};

export function DashboardLayout({
  children,
  hideSearch = false,
  hideTopbar = false,
  navLinks,
  notificationCount,
  onSearchChange,
  profileHref,
  role,
  searchPlaceholder,
  searchValue,
  sidebarItems,
  userSubLabel,
  userName,
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [storedUser, setStoredUser] = useState<AuthUser | null>(() => getStoredUser());
  const shouldUseDashboardPolish = role === "admin" || role === "quality-officer";
  const profile = getProfileRecord(storedUser);
  const resolvedUserName = getString(profile.fullName ?? profile.name ?? storedUser?.fullName ?? storedUser?.name) ?? userName;
  const resolvedUserSubLabel =
    getString(profile.farmName ?? storedUser?.farmName) ?? userSubLabel ?? getDefaultRoleLabel(role);
  const resolvedAvatar = getString(profile.profileImage ?? profile.avatarUrl ?? profile.avatar ?? storedUser?.avatarUrl ?? storedUser?.avatar);

  useEffect(() => {
    return subscribeToAuthChanges(() => setStoredUser(getStoredUser()));
  }, []);

  return (
    <main className={cn("min-h-screen bg-slate-50 text-slate-900", shouldUseDashboardPolish && "dashboard-polish")} dir="ltr">
      <DashboardSidebar isOpen={isSidebarOpen} items={sidebarItems} onClose={() => setIsSidebarOpen(false)} />

      <div className="min-w-0 lg:pl-[232px]">
        {hideTopbar ? (
          <button
            aria-label="Open sidebar"
            className="fixed left-4 top-4 z-30 grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
            type="button"
          >
            <Menu className="size-5" />
          </button>
        ) : (
          <DashboardTopbar
            hideSearch={hideSearch}
            navLinks={navLinks}
            notificationCount={notificationCount}
            onMenuClick={() => setIsSidebarOpen(true)}
            onSearchChange={onSearchChange}
            profileHref={profileHref}
            role={role}
            searchPlaceholder={searchPlaceholder}
            searchValue={searchValue}
            user={{ avatar: resolvedAvatar, name: resolvedUserName, roleLabel: resolvedUserSubLabel }}
          />
        )}
        {children}
      </div>
    </main>
  );
}

function getProfileRecord(user: AuthUser | null) {
  return user?.profile && typeof user.profile === "object" && !Array.isArray(user.profile)
    ? (user.profile as Record<string, unknown>)
    : {};
}

function getString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getDefaultRoleLabel(role: DashboardLayoutProps["role"]) {
  switch (role) {
    case "farmer":
      return "Farmer";
    case "buyer":
      return "Buyer";
    case "admin":
      return "Admin";
    case "quality-officer":
      return "Quality Officer";
  }
}
