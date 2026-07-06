"use client";

import { cn } from "@/lib/cn";

export type AdminNotificationTab = "templates" | "alerts";

type AdminNotificationTabsProps = {
  activeTab: AdminNotificationTab;
  onTabChange: (tab: AdminNotificationTab) => void;
  unreadCount: number;
};

const tabs: Array<{ id: AdminNotificationTab; badge: string; label: string }> = [
  { badge: "A", id: "templates", label: "Notification Templates" },
  { badge: "B", id: "alerts", label: "Admin Notification Center" },
];

export function AdminNotificationTabs({ activeTab, onTabChange, unreadCount }: AdminNotificationTabsProps) {
  return (
    <div className="mt-7 border-b border-slate-200">
      <div className="flex flex-wrap gap-7">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              className={cn(
                "inline-flex items-center gap-2 border-b-2 px-1 pb-3 text-sm font-black transition",
                isActive ? "border-emerald-800 text-emerald-800" : "border-transparent text-slate-500 hover:text-emerald-800",
              )}
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              type="button"
            >
              <span
                className={cn(
                  "grid size-5 place-items-center rounded text-[11px] font-black",
                  isActive ? "bg-emerald-800 text-white" : "bg-slate-100 text-slate-500",
                )}
              >
                {tab.badge}
              </span>
              {tab.label}
              {tab.id === "alerts" ? (
                <span className="rounded-full bg-emerald-800 px-2 py-0.5 text-[11px] font-black text-white">{unreadCount}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
