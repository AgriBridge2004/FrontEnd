import { CalendarDays } from "lucide-react";

import type { QualityScheduleItem } from "@/components/dashboard/quality-officer/quality-officer-dashboard.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { cn } from "@/lib/cn";

type UpcomingScheduleCardProps = {
  items: QualityScheduleItem[];
  onDetails: (item: QualityScheduleItem) => void;
};

export function UpcomingScheduleCard({ items, onDetails }: UpcomingScheduleCardProps) {
  return (
    <DashboardCard className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h2 className="text-base font-black text-slate-950">Upcoming Schedule</h2>
        <CalendarDays className="size-[18px] text-slate-400" />
      </div>
      <div className="grid gap-4 p-5">
        {items.map((item) => (
          <div className="grid grid-cols-[16px_minmax(0,1fr)_auto] gap-2.5" key={item.id}>
            <span
              className={cn(
                "mt-1 grid size-2.5 place-items-center rounded-full ring-4",
                item.active ? "bg-emerald-500 ring-emerald-50" : "bg-slate-300 ring-slate-100",
              )}
            />
            <div className="min-w-0">
              <p className="text-sm font-black leading-5 text-slate-950">{item.title}</p>
              <p className="mt-0.5 text-[11px] font-medium text-slate-500">{item.meta}</p>
            </div>
            <button
              className="text-[11px] font-black text-emerald-700 transition hover:text-emerald-900"
              onClick={() => onDetails(item)}
              type="button"
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
