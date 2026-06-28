"use client";

import type { NotificationFilter } from "@/components/farmer/notifications/notifications.mock";
import { notificationTabs } from "@/components/farmer/notifications/notifications.mock";
import { cn } from "@/lib/cn";

type NotificationTabsProps = {
  selectedTab: NotificationFilter;
  onMarkAllRead: () => void;
  onTabChange: (tab: NotificationFilter) => void;
};

export function NotificationTabs({ selectedTab, onMarkAllRead, onTabChange }: NotificationTabsProps) {
  return (
    <section className="mt-7 border-b border-emerald-100 pb-2">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {notificationTabs.map((tab) => (
            <button
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition",
                selectedTab === tab.label
                  ? "bg-emerald-800 text-white"
                  : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800",
              )}
              key={tab.label}
              onClick={() => onTabChange(tab.label)}
              type="button"
            >
              {tab.label}
              {tab.count ? (
                <span className={cn("text-xs", selectedTab === tab.label ? "text-emerald-100" : "text-slate-500")}>{tab.count}</span>
              ) : null}
            </button>
          ))}
        </div>

        <button
          className="h-10 w-fit rounded-lg border border-emerald-100 bg-white px-4 text-sm font-black text-emerald-800 shadow-sm transition hover:bg-emerald-50"
          onClick={onMarkAllRead}
          type="button"
        >
          Mark all as read
        </button>
      </div>
    </section>
  );
}
