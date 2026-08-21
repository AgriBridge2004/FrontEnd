"use client";

import type { AdminQualityOfficerTab } from "@/components/dashboard/admin/quality-officers/admin-quality-officers.types";
import { cn } from "@/lib/cn";

type AdminQualityOfficerTabsProps = {
  activeTab: AdminQualityOfficerTab;
  onTabChange: (tab: AdminQualityOfficerTab) => void;
};

const tabs: Array<{ label: string; value: AdminQualityOfficerTab }> = [
  { label: "Quality Officer List", value: "officers" },
  { label: "Deals Needing Assignment", value: "assignments" },
];

export function AdminQualityOfficerTabs({ activeTab, onTabChange }: AdminQualityOfficerTabsProps) {
  return (
    <div className="mt-8 flex gap-8 border-b border-slate-200">
      {tabs.map((tab) => (
        <button
          className={cn(
            "border-b-2 px-2 pb-4 text-[14px] font-bold transition",
            activeTab === tab.value ? "border-emerald-800 text-emerald-800" : "border-transparent text-slate-500 hover:text-emerald-800",
          )}
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
