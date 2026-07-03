import type { ReactNode } from "react";

import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";

type ChartCardProps = {
  action?: ReactNode;
  children: ReactNode;
  subtitle?: string;
  title: string;
};

export function ChartCard({ action, children, subtitle, title }: ChartCardProps) {
  return (
    <DashboardCard className="p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-900">{title}</h2>
          {subtitle ? <p className="mt-1 text-[11px] font-black uppercase tracking-wide text-slate-500">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </DashboardCard>
  );
}
