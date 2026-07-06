import type { ReactNode } from "react";

import { dashboardCardClass } from "@/components/dashboard/shared/dashboard-ui";
import { cn } from "@/lib/cn";

type DashboardCardProps = {
  children: ReactNode;
  className?: string;
};

export function DashboardCard({ children, className }: DashboardCardProps) {
  return (
    <section
      className={cn(
        dashboardCardClass,
        className,
      )}
    >
      {children}
    </section>
  );
}
