"use client";

import { Check, ExternalLink } from "lucide-react";

import type { AdminNotificationAlert } from "@/components/dashboard/admin/notifications/admin-notifications.types";
import { cn } from "@/lib/cn";

type AdminNotificationCenterProps = {
  alerts: AdminNotificationAlert[];
  onAction: (alert: AdminNotificationAlert) => void;
  onMarkAllRead: () => void;
  onViewAll: () => void;
};

const toneClasses: Record<AdminNotificationAlert["tone"], string> = {
  blue: "bg-blue-50 text-blue-600",
  orange: "bg-orange-50 text-orange-600",
  red: "bg-red-50 text-red-600",
};

export function AdminNotificationCenter({ alerts, onAction, onMarkAllRead, onViewAll }: AdminNotificationCenterProps) {
  const unreadCount = alerts.filter((alert) => alert.isUnread).length;

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="grid size-5 place-items-center rounded bg-emerald-800 text-[11px] font-black text-white">B</span>
          <h2 className="text-base font-black text-slate-900">Admin Notification Center</h2>
          <span className="rounded-full bg-emerald-800 px-2 py-0.5 text-[11px] font-black text-white">12</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-black">
          <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-slate-500">All (12)</span>
          <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-emerald-800">Unread ({unreadCount})</span>
          <button
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50/30"
            onClick={onMarkAllRead}
            type="button"
          >
            <Check className="size-3.5" />
            Mark all as read
          </button>
        </div>
      </div>
      <div className="divide-y divide-slate-100">
        {alerts.map((alert) => {
          const Icon = alert.icon;

          return (
            <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between" key={alert.id}>
              <div className="flex gap-3">
                <span className={cn("grid size-8 shrink-0 place-items-center rounded-lg", toneClasses[alert.tone])}>
                  <Icon className="size-4" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-black text-slate-900">{alert.title}</h3>
                    <span className="text-xs font-semibold text-slate-400">{alert.time}</span>
                    {alert.badge && alert.isUnread ? (
                      <span className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-black text-red-500">{alert.badge}</span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm font-medium text-slate-500">{alert.message}</p>
                </div>
              </div>
              <button
                className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-black text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50/30"
                onClick={() => onAction(alert)}
                type="button"
              >
                {alert.actionLabel}
                <ExternalLink className="size-3.5" />
              </button>
            </div>
          );
        })}
      </div>
      <button
        className="w-full border-t border-slate-100 px-4 py-4 text-center text-sm font-black text-emerald-800 transition hover:bg-emerald-50/40"
        onClick={onViewAll}
        type="button"
      >
        View all notifications -&gt;
      </button>
    </section>
  );
}
