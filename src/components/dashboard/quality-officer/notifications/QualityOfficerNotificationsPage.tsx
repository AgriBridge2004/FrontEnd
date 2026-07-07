"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, BadgeDollarSign, Info, ShieldCheck } from "lucide-react";

import { qualityOfficerSidebarItems } from "@/components/dashboard/quality-officer/QualityOfficerSidebarConfig";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import {
  getDashboardNotifications,
} from "@/components/dashboard/shared/dashboard-notifications.mock";
import type {
  DashboardNotification,
  DashboardNotificationType,
} from "@/components/dashboard/shared/dashboard-notifications.types";
import { cn } from "@/lib/cn";

type NotificationTab = "all" | "unread" | DashboardNotificationType;

const notificationTabs: Array<{ id: NotificationTab; label: string }> = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "system", label: "System" },
  { id: "payment", label: "Payments" },
  { id: "dispute", label: "Disputes" },
];

const notificationTypeMeta: Record<DashboardNotificationType, { icon: typeof AlertTriangle; circleClassName: string }> = {
  dispute: { circleClassName: "bg-red-50 text-red-500", icon: AlertTriangle },
  payment: { circleClassName: "bg-red-50 text-red-500", icon: BadgeDollarSign },
  system: { circleClassName: "bg-slate-100 text-slate-500", icon: Info },
  verification: { circleClassName: "bg-emerald-50 text-emerald-700", icon: ShieldCheck },
};

function matchesTab(notification: DashboardNotification, selectedTab: NotificationTab) {
  if (selectedTab === "all") {
    return true;
  }

  if (selectedTab === "unread") {
    return !notification.isRead;
  }

  return notification.type === selectedTab;
}

export function QualityOfficerNotificationsPage() {
  const [notifications, setNotifications] = useState<DashboardNotification[]>(() => getDashboardNotifications("quality-officer"));
  const [selectedTab, setSelectedTab] = useState<NotificationTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState("");

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  const filteredNotifications = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return notifications.filter((notification) => {
      const searchableText = `${notification.title} ${notification.message} ${notification.time} ${notification.type}`.toLowerCase();

      return matchesTab(notification, selectedTab) && (!normalizedSearch || searchableText.includes(normalizedSearch));
    });
  }, [notifications, searchQuery, selectedTab]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  function handleMarkAllAsRead() {
    setNotifications((currentNotifications) => currentNotifications.map((notification) => ({ ...notification, isRead: true })));
    showToast("All notifications marked as read.");
  }

  function handleNotificationRead(notificationId: string) {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    );
  }

  function renderNotificationContent(notification: DashboardNotification) {
    const meta = notificationTypeMeta[notification.type];
    const Icon = meta.icon;

    return (
      <>
        <span className={cn("grid size-10 shrink-0 place-items-center rounded-full", meta.circleClassName)}>
          <Icon className="size-5" />
        </span>
        <span className="min-w-0 flex-1 text-left">
          <span className="block text-sm font-black text-slate-950">{notification.title}</span>
          <span className="mt-1 block text-sm font-medium text-slate-600">{notification.message}</span>
          <span className="mt-2 block text-xs font-medium text-slate-400">{notification.time}</span>
        </span>
      </>
    );
  }

  // TODO: Connect Quality Officer notifications page to backend notification APIs.
  return (
    <DashboardLayout
      navLinks={[]}
      notificationCount={unreadCount}
      onSearchChange={setSearchQuery}
      profileHref="/quality-officer/settings"
      role="quality-officer"
      searchPlaceholder="Search notifications, assignments, or updates..."
      searchValue={searchQuery}
      sidebarItems={qualityOfficerSidebarItems}
      userName="Fatima Hassan"
      userSubLabel="Senior Quality Officer"
    >
      <div className="mx-auto w-full max-w-[960px] px-4 py-6 sm:px-5 lg:px-7">
        <header>
          <h1 className="text-[22px] font-black leading-tight tracking-tight text-slate-950 sm:text-2xl">Notifications</h1>
          <p className="mt-1 text-sm font-medium text-slate-500">View recent alerts and platform updates.</p>
        </header>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {notificationTabs.map((tab) => (
            <button
              className={cn(
                "h-9 rounded-full border px-4 text-xs font-black transition",
                selectedTab === tab.id
                  ? "border-emerald-800 bg-emerald-800 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50/40 hover:text-emerald-900",
              )}
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}

          <button
            className="ml-auto h-9 rounded-full px-4 text-xs font-black uppercase tracking-wide text-emerald-800 transition hover:bg-emerald-50"
            onClick={handleMarkAllAsRead}
            type="button"
          >
            Mark all as read
          </button>
        </div>

        <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {filteredNotifications.map((notification) =>
            notification.href ? (
              <Link
                className={cn(
                  "flex gap-4 border-b border-slate-100 px-5 py-5 transition last:border-b-0 hover:bg-emerald-50/30",
                  notification.isRead && "opacity-75",
                )}
                href={notification.href}
                key={notification.id}
                onClick={() => handleNotificationRead(notification.id)}
              >
                {renderNotificationContent(notification)}
              </Link>
            ) : (
              <button
                className={cn(
                  "flex w-full gap-4 border-b border-slate-100 px-5 py-5 transition last:border-b-0 hover:bg-emerald-50/30",
                  notification.isRead && "opacity-75",
                )}
                key={notification.id}
                onClick={() => {
                  handleNotificationRead(notification.id);
                  showToast("Notification details will be connected later.");
                }}
                type="button"
              >
                {renderNotificationContent(notification)}
              </button>
            ),
          )}
        </section>
      </div>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}
