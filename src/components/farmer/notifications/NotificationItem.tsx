"use client";

import {
  Bell,
  CheckCircle,
  FileSignature,
  Landmark,
  MessageSquare,
  ShieldCheck,
  Star,
  Wallet,
} from "lucide-react";

import type { FarmerNotification, NotificationCategory } from "@/components/farmer/notifications/notifications.mock";
import { cn } from "@/lib/cn";

type NotificationItemProps = {
  notification: FarmerNotification;
  onMarkRead: (notificationId: string) => void;
};

const categoryIcons: Record<NotificationCategory, typeof Bell> = {
  Contracts: FileSignature,
  Payments: Wallet,
  Messages: MessageSquare,
  Reviews: Star,
  Deals: CheckCircle,
  Disputes: ShieldCheck,
  System: ShieldCheck,
};

const categoryIconStyles: Record<NotificationCategory, string> = {
  Contracts: "bg-red-50 text-red-600",
  Payments: "bg-emerald-100 text-emerald-800",
  Messages: "bg-emerald-50 text-emerald-800",
  Reviews: "bg-emerald-50 text-emerald-800",
  Deals: "bg-blue-50 text-blue-700",
  Disputes: "bg-red-50 text-red-600",
  System: "bg-slate-100 text-slate-600",
};

export function NotificationItem({ notification, onMarkRead }: NotificationItemProps) {
  const Icon = categoryIcons[notification.category];

  return (
    <button
      className={cn(
        "grid w-full cursor-pointer grid-cols-[16px_40px_minmax(0,1fr)] gap-3 rounded-lg border border-emerald-100 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/40 hover:shadow-md sm:grid-cols-[20px_44px_minmax(0,1fr)_120px]",
        notification.unread && "bg-emerald-50/30",
      )}
      onClick={() => onMarkRead(notification.id)}
      type="button"
    >
      <span className="flex items-center justify-center pt-4">
        {notification.unread ? <span className="size-2.5 rounded-full bg-emerald-800" /> : null}
      </span>
      <span className={cn("grid size-10 place-items-center rounded-xl", categoryIconStyles[notification.category])}>
        <Icon className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate font-black text-slate-950">{notification.title}</span>
        <span className="mt-1 block line-clamp-2 text-sm font-medium leading-5 text-slate-600">{notification.message}</span>
        {notification.meta ? <span className="mt-1 block text-xs font-semibold text-emerald-700">{notification.meta}</span> : null}
      </span>
      <span className="col-start-3 text-xs font-semibold text-slate-600 sm:col-start-auto sm:text-right">{notification.time}</span>
    </button>
  );
}
