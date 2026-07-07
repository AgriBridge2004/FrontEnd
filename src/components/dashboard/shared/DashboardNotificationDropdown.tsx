"use client";

import Link from "next/link";
import { AlertTriangle, BadgeDollarSign, Info, ShieldCheck } from "lucide-react";

import {
  notificationRouteByRole,
} from "@/components/dashboard/shared/dashboard-notifications.mock";
import type {
  DashboardNotification,
  DashboardNotificationType,
  DashboardRole,
} from "@/components/dashboard/shared/dashboard-notifications.types";
import { cn } from "@/lib/cn";

type DashboardNotificationDropdownProps = {
  role: DashboardRole;
  notifications: DashboardNotification[];
  onClose?: () => void;
  onMarkAllAsRead?: () => void;
  onMissingNotificationHref?: () => void;
  onNotificationRead?: (notificationId: string) => void;
};

const notificationTypeMeta: Record<DashboardNotificationType, { icon: typeof AlertTriangle; iconClassName: string; circleClassName: string }> = {
  dispute: {
    circleClassName: "bg-red-50 text-red-500",
    icon: AlertTriangle,
    iconClassName: "size-4",
  },
  payment: {
    circleClassName: "bg-red-50 text-red-500",
    icon: BadgeDollarSign,
    iconClassName: "size-4",
  },
  system: {
    circleClassName: "bg-slate-100 text-slate-500",
    icon: Info,
    iconClassName: "size-4",
  },
  verification: {
    circleClassName: "bg-emerald-50 text-emerald-700",
    icon: ShieldCheck,
    iconClassName: "size-4",
  },
};

export function DashboardNotificationDropdown({
  role,
  notifications,
  onClose,
  onMarkAllAsRead,
  onMissingNotificationHref,
  onNotificationRead,
}: DashboardNotificationDropdownProps) {
  const allNotificationsHref = notificationRouteByRole[role];

  function renderNotificationContent(notification: DashboardNotification) {
    const meta = notificationTypeMeta[notification.type];
    const Icon = meta.icon;

    return (
      <>
        <span className={cn("grid size-8 shrink-0 place-items-center rounded-full", meta.circleClassName)}>
          <Icon className={meta.iconClassName} strokeWidth={2} />
        </span>
        <span className="min-w-0 flex-1 text-left">
          <span className="block text-sm font-semibold leading-5 text-slate-950">{notification.title}</span>
          <span className="mt-0.5 block text-xs font-medium leading-5 text-slate-600">{notification.message}</span>
          <span className="mt-1 block text-xs font-medium text-slate-400">{notification.time}</span>
        </span>
      </>
    );
  }

  return (
    <div
      className="fixed right-4 top-[4.25rem] z-50 w-[calc(100vw-32px)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl sm:absolute sm:right-0 sm:top-full sm:mt-3 sm:w-[340px] sm:max-w-[calc(100vw-32px)]"
      dir="ltr"
      role="menu"
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-black text-slate-900">Notifications</h2>
        <button
          className="text-[11px] font-black uppercase tracking-wide text-emerald-800 transition hover:text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          onClick={onMarkAllAsRead}
          type="button"
        >
          Mark all as read
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {notifications.map((notification) =>
          notification.href ? (
            <Link
              className={cn(
                "flex w-full gap-3 px-4 py-3 transition hover:bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-100",
                notification.isRead && "opacity-75",
              )}
              href={notification.href}
              key={notification.id}
              onClick={() => {
                onNotificationRead?.(notification.id);
                onClose?.();
              }}
              role="menuitem"
            >
              {renderNotificationContent(notification)}
            </Link>
          ) : (
            <button
              className={cn(
                "flex w-full gap-3 px-4 py-3 transition hover:bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-100",
                notification.isRead && "opacity-75",
              )}
              key={notification.id}
              onClick={() => {
                onNotificationRead?.(notification.id);
                onMissingNotificationHref?.();
              }}
              role="menuitem"
              type="button"
            >
              {renderNotificationContent(notification)}
            </button>
          ),
        )}
      </div>

      <Link
        className="block border-t border-slate-100 bg-slate-50 px-4 py-3 text-center text-sm font-black text-emerald-800 transition hover:bg-emerald-50 hover:text-emerald-950 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-100"
        href={allNotificationsHref}
        onClick={onClose}
        role="menuitem"
      >
        View all notifications
      </Link>
    </div>
  );
}
