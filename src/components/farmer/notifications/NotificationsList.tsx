"use client";

import { NotificationItem } from "@/components/farmer/notifications/NotificationItem";
import type { FarmerNotification } from "@/components/farmer/notifications/notifications.mock";

type NotificationsListProps = {
  notifications: FarmerNotification[];
  onMarkRead: (notificationId: string) => void;
};

const groupLabels: FarmerNotification["dateGroup"][] = ["Today", "Yesterday", "Earlier"];

export function NotificationsList({ notifications, onMarkRead }: NotificationsListProps) {
  if (notifications.length === 0) {
    return (
      <section className="mt-4 rounded-lg border border-emerald-100 bg-white p-8 text-center text-sm font-semibold text-slate-500 shadow-sm">
        No notifications found.
      </section>
    );
  }

  return (
    <section className="mt-4 space-y-7">
      {groupLabels.map((group) => {
        const groupNotifications = notifications.filter((notification) => notification.dateGroup === group);

        if (groupNotifications.length === 0) {
          return null;
        }

        return (
          <div key={group}>
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-600">{group}</h2>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="space-y-2">
              {groupNotifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} onMarkRead={onMarkRead} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
