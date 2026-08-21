"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { FarmerDashboardLayout } from "@/components/dashboard/farmer/FarmerDashboardLayout";
import { ActionRequiredPanel } from "@/components/dashboard/farmer/notifications/ActionRequiredPanel";
import { NotificationStats } from "@/components/dashboard/farmer/notifications/NotificationStats";
import { NotificationTabs } from "@/components/dashboard/farmer/notifications/NotificationTabs";
import { NotificationsList } from "@/components/dashboard/farmer/notifications/NotificationsList";
import { Toast } from "@/components/dashboard/farmer/notifications/Toast";
import {
  type FarmerNotification,
  type NotificationFilter,
} from "@/components/dashboard/farmer/notifications/notifications.mock";
import { getNotifications, markAllNotificationsAsRead, markNotificationAsRead, type ApiRecord } from "@/lib/workflow-api";

export function FarmerNotificationsPage() {
  const [notifications, setNotifications] = useState<FarmerNotification[]>([]);
  const [selectedTab, setSelectedTab] = useState<NotificationFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const unreadCount = notifications.filter((notification) => notification.unread).length;

  const filteredNotifications = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesTab =
        selectedTab === "All" ||
        (selectedTab === "Unread" && notification.unread) ||
        notification.category === selectedTab;

      const matchesSearch =
        notification.title.toLowerCase().includes(normalizedSearch) ||
        notification.message.toLowerCase().includes(normalizedSearch) ||
        notification.meta?.toLowerCase().includes(normalizedSearch) ||
        notification.category.toLowerCase().includes(normalizedSearch);

      return matchesTab && matchesSearch;
    });
  }, [notifications, searchQuery, selectedTab]);

  useEffect(() => {
    void loadNotifications();

    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  async function loadNotifications() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const records = await getNotifications();
      setNotifications(records.map(mapFarmerNotificationFromApi));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to load notifications.");
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  }

  function showToast(message: string) {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage("");
      toastTimeoutRef.current = null;
    }, 3000);
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
  }

  function handleTabChange(tab: NotificationFilter) {
    setSelectedTab(tab);
  }

  async function handleMarkRead(notificationId: string) {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === notificationId ? { ...notification, unread: false } : notification,
      ),
    );

    try {
      await markNotificationAsRead(notificationId);
    } catch {
      showToast("Could not mark notification as read.");
    }
  }

  async function handleMarkAllRead() {
    setNotifications((currentNotifications) => currentNotifications.map((notification) => ({ ...notification, unread: false })));
    try {
      await markAllNotificationsAsRead();
      showToast("All notifications marked as read.");
    } catch {
      showToast("Could not mark all notifications as read.");
    }
  }

  return (
    <FarmerDashboardLayout
      onSearchChange={handleSearchChange}
      searchPlaceholder="Search notifications, deals, or partners..."
      searchValue={searchQuery}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-5 lg:px-7">
        <NotificationStats unreadCount={unreadCount} />
        <ActionRequiredPanel onAction={showToast} />
        <NotificationTabs onMarkAllRead={handleMarkAllRead} onTabChange={handleTabChange} selectedTab={selectedTab} />
        {isLoading ? (
          <div className="mt-5 rounded-2xl border border-emerald-100 bg-white p-6 text-sm font-black text-slate-600 shadow-sm">Loading notifications...</div>
        ) : errorMessage ? (
          <div className="mt-5 rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm">
            <p className="text-sm font-black text-slate-900">{errorMessage}</p>
            <button className="mt-3 h-9 rounded-lg bg-emerald-800 px-4 text-xs font-black text-white" onClick={loadNotifications} type="button">
              Retry
            </button>
          </div>
        ) : (
          <NotificationsList notifications={filteredNotifications} onMarkRead={handleMarkRead} />
        )}
      </div>
      <Toast message={toastMessage} />
    </FarmerDashboardLayout>
  );
}

function mapFarmerNotificationFromApi(record: ApiRecord): FarmerNotification {
  const type = String(record.type ?? record.category ?? "System");
  const createdAt = String(record.createdAt ?? record.time ?? "");

  return {
    actionRequired: type === "contract" || type === "dispute" || type === "payment",
    category: mapFarmerNotificationCategory(type),
    dateGroup: getDateGroup(createdAt),
    id: String(record.id ?? record._id ?? ""),
    message: String(record.message ?? record.body ?? ""),
    meta: typeof record.meta === "string" ? record.meta : typeof record.reference === "string" ? record.reference : undefined,
    time: formatTime(createdAt),
    title: String(record.title ?? "Notification"),
    unread: record.read === false || record.isRead === false,
  };
}

function mapFarmerNotificationCategory(type: string): FarmerNotification["category"] {
  const normalized = type.toLowerCase();
  if (normalized.includes("contract")) return "Contracts";
  if (normalized.includes("payment")) return "Payments";
  if (normalized.includes("message")) return "Messages";
  if (normalized.includes("review")) return "Reviews";
  if (normalized.includes("deal")) return "Deals";
  if (normalized.includes("dispute")) return "Disputes";
  return "System";
}

function getDateGroup(value: string): FarmerNotification["dateGroup"] {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Earlier";

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return "Earlier";
}

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(date);
}
