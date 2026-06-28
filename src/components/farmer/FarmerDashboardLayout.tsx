"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { FarmerSidebar } from "@/components/farmer/FarmerSidebar";
import { FarmerTopbar } from "@/components/farmer/FarmerTopbar";

type FarmerDashboardLayoutProps = {
  children: ReactNode;
};

export function FarmerDashboardLayout({ children }: FarmerDashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // TODO: Protect farmer routes after backend auth/session is finalized.
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900" dir="ltr">
      <FarmerSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="min-w-0 lg:pl-[232px]">
        <FarmerTopbar onMenuClick={() => setIsSidebarOpen(true)} />
        {children}
      </div>
    </main>
  );
}
