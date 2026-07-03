"use client";

import { buyerNotificationTabs } from "@/components/dashboard/buyer/notifications/buyer-notifications.mock";
import type { BuyerNotificationTab } from "@/components/dashboard/buyer/notifications/buyer-notifications.types";
import { cn } from "@/lib/cn";

type BuyerNotificationTabsProps = {
  onMarkAllRead: () => void;
  onTabChange: (tab: BuyerNotificationTab) => void;
  selectedTab: BuyerNotificationTab;
  unreadCount: number;
};

export function BuyerNotificationTabs({ onMarkAllRead, onTabChange, selectedTab, unreadCount }: BuyerNotificationTabsProps) {
  return (
    <section className="mt-7 border-b border-emerald-100 pb-2">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex gap-2 overflow-x-auto sm:gap-4">
          {buyerNotificationTabs.map((tab) => {
            const isActive = selectedTab === tab.value;
            const count = tab.value === "unread" ? unreadCount : tab.count;

            return (
              <button
                className={cn(
                  "inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition",
                  isActive ? "bg-emerald-800 text-white" : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800",
                )}
                key={tab.value}
                onClick={() => onTabChange(tab.value)}
                type="button"
              >
                {tab.label}
                {typeof count === "number" ? (
                  <span
                    className={cn(
                      "text-xs",
                      isActive ? "text-emerald-100" : "text-slate-500",
                    )}
                  >
                    {count}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <button
          className="h-9 w-fit rounded-lg border border-emerald-100 bg-white px-4 text-sm font-black text-emerald-800 shadow-sm transition hover:bg-emerald-50"
          onClick={onMarkAllRead}
          type="button"
        >
          Mark all as read
        </button>
      </div>
    </section>
  );
}
