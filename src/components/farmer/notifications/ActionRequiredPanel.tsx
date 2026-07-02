"use client";

import { FileSignature, Landmark, Zap } from "lucide-react";

import { actionRequiredItems } from "@/components/farmer/notifications/notifications.mock";
import { cn } from "@/lib/cn";

type ActionRequiredPanelProps = {
  onAction: (message: string) => void;
};

export function ActionRequiredPanel({ onAction }: ActionRequiredPanelProps) {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="inline-flex items-center gap-1 text-xl font-black text-slate-950">
          <Zap className="size-5 fill-red-600 text-red-600" />
          Action Required
        </h2>
        <p className="text-sm font-semibold text-slate-600">3 Items Pending</p>
      </div>

      <div className="mt-3 grid gap-4 lg:grid-cols-2">
        {actionRequiredItems.map((item) => {
          const Icon = item.tone === "red" ? FileSignature : Landmark;

          return (
            <article
              className={cn(
                "rounded-md border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md",
                item.tone === "red"
                  ? "border-l-4 border-l-red-600 hover:border-red-200 hover:border-l-red-700 hover:bg-red-50/10"
                  : "border-l-4 border-l-emerald-700 hover:border-emerald-200 hover:border-l-emerald-800 hover:bg-emerald-50/30",
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
                        "rounded-full px-2 py-1 text-[10px] font-black uppercase",
                        item.tone === "red" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800",
                      )}
                    >
                      {item.type}
                    </span>
                    {item.urgency ? <span className="rounded bg-red-50 px-2 py-1 text-xs font-mono text-red-700">{item.urgency}</span> : null}
                    {item.time ? <span className="text-xs font-mono text-slate-600">{item.time}</span> : null}
                  </div>
                  <h3 className="mt-2 text-base font-medium text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{item.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tone === "red" ? (
                      <>
                        <button
                          className="h-10 rounded-md bg-emerald-800 px-5 text-sm font-black text-white transition hover:bg-emerald-900"
                          onClick={() => onAction("Contract signature flow will be connected later.")}
                          type="button"
                        >
                          Review & Sign
                        </button>
                        <button
                          className="h-10 rounded-md border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                          onClick={() => onAction("Deal details will be connected later.")}
                          type="button"
                        >
                          Details
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="h-10 rounded-md bg-emerald-800 px-5 text-sm font-black text-white transition hover:bg-emerald-900"
                          onClick={() => onAction("Fund release approval will be connected later.")}
                          type="button"
                        >
                          Approve Funds
                        </button>
                        <button
                          className="h-10 rounded-md border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                          onClick={() => onAction("Inspection report will be connected later.")}
                          type="button"
                        >
                          View Report
                        </button>
                      </>
                    )}
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
