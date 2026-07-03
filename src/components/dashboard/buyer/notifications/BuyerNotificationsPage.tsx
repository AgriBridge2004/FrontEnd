"use client";

import { useMemo, useState } from "react";

import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import { BuyerActionRequiredCards } from "@/components/dashboard/buyer/notifications/BuyerActionRequiredCards";
import { buyerNotifications } from "@/components/dashboard/buyer/notifications/buyer-notifications.mock";
import type { BuyerNotification, BuyerNotificationTab } from "@/components/dashboard/buyer/notifications/buyer-notifications.types";
import { BuyerNotificationsList } from "@/components/dashboard/buyer/notifications/BuyerNotificationsList";
import { BuyerNotificationsStats } from "@/components/dashboard/buyer/notifications/BuyerNotificationsStats";
import { BuyerNotificationTabs } from "@/components/dashboard/buyer/notifications/BuyerNotificationTabs";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const buyerTopbarLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/buyer/rfqs", label: "RFQ" },
];

function matchesTab(notification: BuyerNotification, selectedTab: BuyerNotificationTab) {
  if (selectedTab === "all") {
    return true;
  }

  if (selectedTab === "unread") {
    return notification.unread;
  }

  return notification.category === selectedTab;
}

export function BuyerNotificationsPage() {
  const [notifications, setNotifications] = useState<BuyerNotification[]>(buyerNotifications);
  const [selectedTab, setSelectedTab] = useState<BuyerNotificationTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  }

  const unreadCount = notifications.filter((notification) => notification.unread).length;

  const filteredNotifications = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return notifications.filter((notification) => {
      const searchableText = `${notification.title} ${notification.body} ${notification.meta ?? ""} ${notification.category} ${
        notification.dealId ?? ""
      }`.toLowerCase();

      return matchesTab(notification, selectedTab) && (!normalizedSearch || searchableText.includes(normalizedSearch));
    });
  }, [notifications, searchQuery, selectedTab]);

  function handleNotificationClick(notification: BuyerNotification) {
    setNotifications((currentNotifications) =>
      currentNotifications.map((currentNotification) =>
        currentNotification.id === notification.id ? { ...currentNotification, unread: false } : currentNotification,
      ),
    );

    if (notification.dealId) {
      showToast("Notification action will be connected later.");
    }
  }

  function handleMarkAllRead() {
    setNotifications((currentNotifications) => currentNotifications.map((notification) => ({ ...notification, unread: false })));
    showToast("All notifications marked as read.");
  }

  // TODO: Connect buyer notifications, read state, and action flows to backend notification APIs.
  return (
    <DashboardLayout
      navLinks={buyerTopbarLinks}
      notificationCount={unreadCount}
      onSearchChange={setSearchQuery}
      profileHref="/buyer/profile"
      role="buyer"
      searchPlaceholder="Search notifications, deals, or partners..."
      searchValue={searchQuery}
      sidebarItems={buyerSidebarItems}
      userName="Ramesh Kumar"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-5 lg:px-7">
        <BuyerNotificationsStats unreadCount={unreadCount} />
        <BuyerActionRequiredCards onAction={showToast} />
        <BuyerNotificationTabs
          onMarkAllRead={handleMarkAllRead}
          onTabChange={setSelectedTab}
          selectedTab={selectedTab}
          unreadCount={unreadCount}
        />
        <BuyerNotificationsList notifications={filteredNotifications} onNotificationClick={handleNotificationClick} />
      </div>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}
