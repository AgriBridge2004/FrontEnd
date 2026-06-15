import type { ReactNode } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import type { UserRole } from "@/types";

type DashboardShellProps = {
  role: UserRole;
  children: ReactNode;
};

export function DashboardShell({ role, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <DashboardSidebar role={role} />
      <div className="min-w-0 flex-1">
        <AppHeader role={role} />
        <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
