"use client";

import { CalendarDays, MapPin, RefreshCw } from "lucide-react";

import type { DealNeedingAssignment } from "@/components/dashboard/admin/quality-officers/admin-quality-officers.types";
import { cn } from "@/lib/cn";

type AdminDealsNeedingAssignmentProps = {
  deals: DealNeedingAssignment[];
  onAssignDeal: (deal: DealNeedingAssignment) => void;
  onRefresh: () => void;
  onSelectDeal?: (deal: DealNeedingAssignment) => void;
  selectedDealId?: string;
};

export function AdminDealsNeedingAssignment({
  deals,
  onAssignDeal,
  onRefresh,
  onSelectDeal,
  selectedDealId,
}: AdminDealsNeedingAssignmentProps) {
  return (
    <section className="min-w-0">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-[16px] font-black text-slate-950">
          Deals Needing Assignment
          <span className="grid size-5 place-items-center rounded-full bg-red-500 text-[11px] font-black text-white">6</span>
        </h2>
        <button
          aria-label="Refresh deals needing assignment"
          className="grid size-8 place-items-center rounded-lg text-slate-400 transition hover:bg-emerald-50/30 hover:text-emerald-800"
          onClick={onRefresh}
          type="button"
        >
          <RefreshCw className="size-4" />
        </button>
      </div>
      <div className="grid gap-4">
        {deals.map((deal) => (
          <article
            className={cn(
              "rounded-lg border bg-white p-4 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md",
              selectedDealId === deal.id ? "border-emerald-500 bg-emerald-50/30" : "border-slate-200",
            )}
            key={deal.id}
            onClick={() => onSelectDeal?.(deal)}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[15px] font-black text-slate-900">{deal.dealId}</h3>
              {deal.priority === "high" ? (
                <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-black text-red-600">HIGH PRIORITY</span>
              ) : null}
            </div>
            <p className="mt-4 text-[13px] font-black text-slate-800">{deal.product}</p>
            <p className="mt-3 flex items-center gap-2 text-[12px] font-medium text-slate-500">
              <MapPin className="size-4 text-slate-400" />
              {deal.farmLocation}
            </p>
            <p className="mt-3 flex items-center gap-2 text-[12px] font-medium text-slate-500">
              <CalendarDays className="size-4 text-slate-400" />
              Required Date
              <span className="font-black text-slate-700">{deal.requiredDate}</span>
            </p>
            <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Deal Value</p>
                <p className="mt-1 text-[15px] font-black text-slate-900">{deal.dealValue.toLocaleString()} SAR</p>
              </div>
              <button
                className="h-9 rounded-lg border border-emerald-800 px-3 text-[12px] font-black text-emerald-800 transition hover:bg-emerald-50"
                onClick={(event) => {
                  event.stopPropagation();
                  onAssignDeal(deal);
                }}
                type="button"
              >
                Assign Quality Officer
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-5 flex justify-center gap-1">
        {[1, 2].map((page) => (
          <button
            className={page === 1 ? "grid size-8 place-items-center rounded-lg bg-emerald-800 text-[12px] font-black text-white" : "grid size-8 place-items-center rounded-lg border border-slate-200 text-[12px] font-black text-slate-500"}
            key={page}
            type="button"
          >
            {page}
          </button>
        ))}
      </div>
    </section>
  );
}
