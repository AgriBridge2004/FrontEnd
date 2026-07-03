"use client";

import { Banknote, Bell, FileCheck, MessageSquare, PackageCheck, ShieldCheck, Star } from "lucide-react";

import type {
  BuyerNotification,
  BuyerNotificationDateGroup,
  BuyerNotificationIconType,
} from "@/components/dashboard/buyer/notifications/buyer-notifications.types";
import { EmptyState } from "@/components/dashboard/shared/EmptyState";
import { cn } from "@/lib/cn";

type BuyerNotificationsListProps = {
  notifications: BuyerNotification[];
  onNotificationClick: (notification: BuyerNotification) => void;
};

const groupLabels: Array<{ label: string; value: BuyerNotificationDateGroup }> = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Older", value: "older" },
];

const iconConfig: Record<BuyerNotificationIconType, { icon: typeof Bell; style: string }> = {
  delivery: { icon: PackageCheck, style: "bg-emerald-50 text-emerald-800" },
  invoice: { icon: ShieldCheck, style: "bg-slate-50 text-slate-400" },
  message: { icon: MessageSquare, style: "bg-emerald-50 text-emerald-800" },
  payment: { icon: Banknote, style: "bg-emerald-50 text-emerald-800" },
  review: { icon: Star, style: "bg-emerald-50 text-emerald-800" },
  system: { icon: FileCheck, style: "bg-slate-50 text-slate-500" },
};

export function BuyerNotificationsList({ notifications, onNotificationClick }: BuyerNotificationsListProps) {
  if (notifications.length === 0) {
    return (
      <section className="mt-4">
        <EmptyState description="There are no notifications in this category yet." icon={Bell} title="No notifications found" />
      </section>
    );
  }

  return (
    <section className="mt-4 space-y-7">
      {groupLabels.map((group) => {
        const groupNotifications = notifications.filter((notification) => notification.dateGroup === group.value);

        if (groupNotifications.length === 0) {
          return null;
        }

        return (
          <div key={group.value}>
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-600">{group.label}</h2>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="space-y-2">
              {groupNotifications.map((notification) => {
                const Icon = iconConfig[notification.iconType].icon;

                return (
                  <button
                    className={cn(
                      "grid w-full cursor-pointer grid-cols-[16px_40px_minmax(0,1fr)] gap-3 rounded-lg border border-emerald-100 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md sm:grid-cols-[20px_44px_minmax(0,1fr)_120px]",
                      notification.unread && "bg-emerald-50/30",
                    )}
                    key={notification.id}
                    onClick={() => onNotificationClick(notification)}
                    type="button"
                  >
                    <span className="flex items-center justify-center pt-4">
                      {notification.unread ? <span className="size-2 rounded-full bg-emerald-800" /> : null}
                    </span>
                    <span className={cn("grid size-10 place-items-center rounded-xl", iconConfig[notification.iconType].style)}>
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-black text-slate-950">{notification.title}</span>
                      <span className="mt-1 block text-sm font-medium leading-5 text-slate-500">{notification.body}</span>
                      {notification.meta ? (
                        <span className="mt-1 block text-xs font-semibold uppercase text-emerald-800">{notification.meta}</span>
                      ) : null}
                    </span>
                    <span className="col-start-3 text-xs font-semibold text-slate-600 sm:col-start-auto sm:text-right">{notification.timeLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
