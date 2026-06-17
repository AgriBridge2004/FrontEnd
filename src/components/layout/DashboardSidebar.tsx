"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { dashboardNavItems } from "@/lib/navigation";
import type { UserRole } from "@/types";

type DashboardSidebarProps = {
  role: UserRole;
};

const roleNames: Record<UserRole, string> = {
  farmer: "Farmer",
  buyer: "Buyer",
  quality_officer: "Quality Officer",
  admin: "Admin",
};

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const items = dashboardNavItems[role];

  return (
    <aside className="border-b border-slate-200 bg-white md:sticky md:top-0 md:h-screen md:w-72 md:border-b-0 md:border-r">
      <div className="flex h-full flex-col">
        <Link className="flex items-center gap-3 border-b border-slate-200 px-4 py-5" href="/">
          <span className="grid size-9 place-items-center rounded-md bg-emerald-700 text-white">A</span>
          <span>
            <span className="block text-sm font-bold text-slate-950">AgriBridge</span>
            <span className="block text-xs text-slate-500">{roleNames[role]}</span>
          </span>
        </Link>
        <nav className="flex gap-2 overflow-x-auto px-4 py-4 md:flex-1 md:flex-col md:overflow-x-visible">
          {items.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                className={cn(
                  "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-emerald-700 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
