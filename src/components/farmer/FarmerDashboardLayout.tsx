"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Menu } from "lucide-react";

import { FarmerSidebar } from "@/components/farmer/FarmerSidebar";
import { FarmerTopbar } from "@/components/farmer/FarmerTopbar";

type FarmerDashboardLayoutProps = {
  children: ReactNode;
  hideTopbar?: boolean;
  onSearchChange?: (value: string) => void;
  searchValue?: string;
  searchPlaceholder?: string;
};

export function FarmerDashboardLayout({
  children,
  hideTopbar = false,
  onSearchChange,
  searchPlaceholder,
  searchValue,
}: FarmerDashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // TODO: Protect farmer routes after backend auth/session is finalized.
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900" dir="ltr">
      <FarmerSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

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
          <FarmerTopbar
            onMenuClick={() => setIsSidebarOpen(true)}
            onSearchChange={onSearchChange}
            searchPlaceholder={searchPlaceholder}
            searchValue={searchValue}
          />
        )}
        {children}
      </div>
    </main>
  );
}
