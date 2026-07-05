"use client";

import { useState } from "react";
import { AlertTriangle, ChevronRight } from "lucide-react";

import { openDisputes } from "@/components/dashboard/admin/admin-dashboard.mock";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { cn } from "@/lib/cn";

type AdminActionRequiredCardProps = {
  onDisputeClick: () => void;
  onViewAllDisputes: () => void;
};

type ActionTab = "disputes" | "verifications";

export function AdminActionRequiredCard({ onDisputeClick, onViewAllDisputes }: AdminActionRequiredCardProps) {
  const [activeTab, setActiveTab] = useState<ActionTab>("disputes");

  // TODO: Connect action required disputes to API.
  // TODO: Connect pending verifications tab to API.
  return (
    <DashboardCard className="overflow-hidden p-5">
      <h2 className="text-lg font-black text-slate-950">Action Required</h2>

      <div className="mt-6 grid grid-cols-2 border-b border-slate-100 text-center">
        <ActionTabButton active={activeTab === "disputes"} label="Open Disputes (5)" onClick={() => setActiveTab("disputes")} />
        <ActionTabButton active={activeTab === "verifications"} label="Pending Verifications (6)" onClick={() => setActiveTab("verifications")} />
      </div>

      <div className="mt-4 grid gap-3">
        {activeTab === "disputes" ? (
          openDisputes.map((item) => (
            <button
              className="grid grid-cols-[38px_minmax(0,1fr)_38px] items-center gap-3 rounded-xl p-2 text-left transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md"
              key={item.id}
              onClick={onDisputeClick}
              type="button"
            >
              <span className="grid size-8 place-items-center rounded-lg bg-orange-50 text-orange-600">
                <AlertTriangle className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="flex items-start justify-between gap-2">
                  <span className="text-sm font-black leading-5 text-slate-950">{item.title}</span>
                  <span className="shrink-0 text-[11px] font-black text-red-600">{item.time}</span>
                </span>
                <span className="mt-1 grid grid-cols-2 gap-2 text-[11px] font-medium leading-4 text-slate-500">
                  <span>Buyer: {item.buyer}</span>
                  <span>Farm: {item.farm}</span>
                </span>
              </span>
              <ChevronRight className="justify-self-end size-4 text-slate-300" />
            </button>
          ))
        ) : (
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4 text-sm font-semibold text-slate-600">
            Pending verification workflow will be connected later.
          </div>
        )}
      </div>

      <button className="mt-5 text-sm font-black text-red-600 transition hover:text-red-700" onClick={onViewAllDisputes} type="button">
        View all disputes -&gt;
      </button>
    </DashboardCard>
  );
}

function ActionTabButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      className={cn(
        "relative h-12 px-2 text-sm font-black transition",
        active ? "text-red-600" : "text-slate-400 hover:text-red-600",
      )}
      onClick={onClick}
      type="button"
    >
      {label}
      {active ? <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-red-600" /> : null}
    </button>
  );
}
