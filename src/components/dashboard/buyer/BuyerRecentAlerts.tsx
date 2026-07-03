import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import type { BuyerAlert } from "@/components/dashboard/buyer/buyer-dashboard.types";

type BuyerRecentAlertsProps = {
  alerts: BuyerAlert[];
};

export function BuyerRecentAlerts({ alerts }: BuyerRecentAlertsProps) {
  return (
    <DashboardCard className="p-5">
      <h2 className="text-lg font-black text-slate-900">Recent Alerts</h2>

      <div className="mt-5 grid gap-0">
        {alerts.map((alert, index) => (
          <article className="grid grid-cols-[14px_minmax(0,1fr)] gap-3" key={alert.title}>
            <div className="relative flex justify-center">
              <span className="mt-1.5 size-2 rounded-full bg-emerald-700" />
              {index < alerts.length - 1 ? <span className="absolute top-4 h-full w-px bg-emerald-200" /> : null}
            </div>
            <div className="pb-4">
              <p className="text-xs font-black text-slate-900">{alert.title}</p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">{alert.time}</p>
            </div>
          </article>
        ))}
      </div>
    </DashboardCard>
  );
}
