"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Menu } from "lucide-react";

import { DashboardSidebar, type DashboardSidebarItem } from "@/components/dashboard/shared/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/shared/DashboardTopbar";

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
  searchPlaceholder,
  searchValue,
  sidebarItems,
  userSubLabel,
  userName,
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900" dir="ltr">
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
            searchPlaceholder={searchPlaceholder}
            searchValue={searchValue}
            userName={userName}
            userSubLabel={userSubLabel}
          />
        )}
        {children}
      </div>
    </main>
  );
}
