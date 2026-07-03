import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type DashboardCardProps = {
  children: ReactNode;
  className?: string;
};

export function DashboardCard({ children, className }: DashboardCardProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md",
        className,
      )}
    >
      {children}
    </section>
  );
}
