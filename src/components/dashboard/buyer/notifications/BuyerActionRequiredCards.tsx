"use client";

import { Landmark, PencilLine, Zap } from "lucide-react";

import { buyerActionRequiredItems } from "@/components/dashboard/buyer/notifications/buyer-notifications.mock";
import { cn } from "@/lib/cn";

type BuyerActionRequiredCardsProps = {
  onAction: (message: string) => void;
};

export function BuyerActionRequiredCards({ onAction }: BuyerActionRequiredCardsProps) {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="inline-flex items-center gap-1 text-xl font-black text-slate-950">
          <Zap className="size-5 fill-red-500 text-red-500" />
          Action Required
        </h2>
        <p className="text-sm font-semibold text-slate-600">3 Items Pending</p>
      </div>

      <div className="mt-3 grid gap-4 lg:grid-cols-2">
        {buyerActionRequiredItems.map((item) => {
          const Icon = item.tone === "red" ? PencilLine : Landmark;

          return (
            <article
              className={cn(
                "rounded-md border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md",
                item.tone === "red" ? "border-l-4 border-l-red-600" : "border-l-4 border-l-emerald-700",
              )}
              key={item.id}
            >
              <div className="flex gap-4">
                <span
                  className={cn(
                    "grid size-12 shrink-0 place-items-center rounded-xl",
                    item.tone === "red" ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-800",
                  )}
                >
                  <Icon className="size-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={cn(
                        "rounded-md px-3 py-1 text-[10px] font-black uppercase tracking-wide",
                        item.tone === "red" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-800",
                      )}
                    >
                      {item.badge}
                    </span>
                    <span className={cn("text-xs font-black", item.tone === "red" ? "text-red-600" : "text-slate-600")}>{item.timeLabel}</span>
                  </div>

                  <h3 className="mt-2 text-base font-medium leading-5 text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{item.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      className="h-10 rounded-md bg-emerald-800 px-5 text-sm font-black text-white transition hover:bg-emerald-900"
                      onClick={() => onAction(item.primaryToast)}
                      type="button"
                    >
                      {item.primaryActionLabel}
                    </button>
                    <button
                      className="h-10 rounded-md border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                      onClick={() => onAction(item.secondaryToast)}
                      type="button"
                    >
                      {item.secondaryActionLabel}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
