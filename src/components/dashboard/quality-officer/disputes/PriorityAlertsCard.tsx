import { AlertCircle } from "lucide-react";

import type { PriorityAlert } from "@/components/dashboard/quality-officer/disputes/quality-officer-disputes.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";

type PriorityAlertsCardProps = {
  alerts: PriorityAlert[];
};

export function PriorityAlertsCard({ alerts }: PriorityAlertsCardProps) {
  return (
    <DashboardCard className="p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="size-5 text-red-600" />
          <h2 className="text-base font-black text-slate-950">Priority Alerts</h2>
        </div>
        <span className="rounded-md bg-red-50 px-2 py-1 text-[10px] font-black text-red-600">3 NEW</span>
      </div>

      <div className="mt-4 grid gap-3">
        {alerts.map((alert) => (
          <article
            className="rounded-lg border border-emerald-100 bg-stone-50 p-3 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md"
            key={alert.id}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-black text-red-600">{alert.label}</p>
              <span className="text-[11px] font-medium text-slate-500">{alert.time}</span>
            </div>
            <h3 className="mt-2 text-[13px] font-black leading-5 text-slate-950">{alert.title}</h3>
            <p className="mt-1 text-[12px] font-medium leading-5 text-slate-600">{alert.description}</p>
          </article>
        ))}
      </div>
    </DashboardCard>
  );
}
