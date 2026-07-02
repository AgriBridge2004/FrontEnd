"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { FarmerDashboardLayout } from "@/components/farmer/FarmerDashboardLayout";
import { ActionRequiredPanel } from "@/components/farmer/notifications/ActionRequiredPanel";
import { NotificationStats } from "@/components/farmer/notifications/NotificationStats";
import { NotificationTabs } from "@/components/farmer/notifications/NotificationTabs";
import { NotificationsList } from "@/components/farmer/notifications/NotificationsList";
import { Toast } from "@/components/farmer/notifications/Toast";
import {
  farmerNotifications,
  type FarmerNotification,
  type NotificationFilter,
} from "@/components/farmer/notifications/notifications.mock";

export function FarmerNotificationsPage() {
  const [notifications, setNotifications] = useState<FarmerNotification[]>(farmerNotifications);
  const [selectedTab, setSelectedTab] = useState<NotificationFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
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
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

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

  function handleMarkRead(notificationId: string) {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === notificationId ? { ...notification, unread: false } : notification,
      ),
    );
  }

  function handleMarkAllRead() {
    setNotifications((currentNotifications) => currentNotifications.map((notification) => ({ ...notification, unread: false })));
    showToast("All notifications marked as read.");
  }

  // TODO: Connect notification filters, read state, and action flows to backend notification APIs.
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
        <NotificationsList notifications={filteredNotifications} onMarkRead={handleMarkRead} />
      </div>
      <Toast message={toastMessage} />
    </FarmerDashboardLayout>
  );
}
