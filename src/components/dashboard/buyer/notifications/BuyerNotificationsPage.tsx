"use client";

import { useEffect, useMemo, useState } from "react";

import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import { BuyerActionRequiredCards } from "@/components/dashboard/buyer/notifications/BuyerActionRequiredCards";
import type { BuyerNotification, BuyerNotificationTab } from "@/components/dashboard/buyer/notifications/buyer-notifications.types";
import { BuyerNotificationsList } from "@/components/dashboard/buyer/notifications/BuyerNotificationsList";
import { BuyerNotificationsStats } from "@/components/dashboard/buyer/notifications/BuyerNotificationsStats";
import { BuyerNotificationTabs } from "@/components/dashboard/buyer/notifications/BuyerNotificationTabs";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import {
  getBuyerNotifications,
  markAllBuyerNotificationsAsRead,
  markBuyerNotificationAsRead,
  type ApiRecord,
} from "@/lib/buyer-api";
import { getStoredUser } from "@/lib/auth-storage";

const buyerTopbarLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/rfq", label: "RFQ" },
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
  const [notifications, setNotifications] = useState<BuyerNotification[]>([]);
  const [selectedTab, setSelectedTab] = useState<BuyerNotificationTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const user = getStoredUser();
  const userName = typeof user?.fullName === "string" ? user.fullName : typeof user?.name === "string" ? user.name : "Buyer";

  useEffect(() => {
    void loadNotifications();
  }, []);

  async function loadNotifications() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const records = await getBuyerNotifications();
      setNotifications(records.map(mapBuyerNotificationFromApi));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to load notifications.");
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  }

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

  async function handleNotificationClick(notification: BuyerNotification) {
    setNotifications((currentNotifications) =>
      currentNotifications.map((currentNotification) =>
        currentNotification.id === notification.id ? { ...currentNotification, unread: false } : currentNotification,
      ),
    );

    try {
      await markBuyerNotificationAsRead(notification.id);
    } catch {
      showToast("Could not mark notification as read.");
    }

    if (notification.dealId) {
      showToast("Notification action will be connected later.");
    }
  }

  async function handleMarkAllRead() {
    setNotifications((currentNotifications) => currentNotifications.map((notification) => ({ ...notification, unread: false })));
    try {
      await markAllBuyerNotificationsAsRead();
      showToast("All notifications marked as read.");
    } catch {
      showToast("Could not mark all notifications as read.");
    }
  }

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
      userName={userName}
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
          <BuyerNotificationsList notifications={filteredNotifications} onNotificationClick={handleNotificationClick} />
        )}
      </div>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}

function mapBuyerNotificationFromApi(record: ApiRecord): BuyerNotification {
  const type = String(record.type ?? record.category ?? "system");
  const createdAt = String(record.createdAt ?? record.time ?? "");

  return {
    actionRequired: type === "dispute" || type === "payment",
    body: String(record.message ?? record.body ?? ""),
    category: mapNotificationCategory(type),
    dateGroup: getDateGroup(createdAt),
    dealId: typeof record.dealId === "string" ? record.dealId : undefined,
    iconType: mapNotificationIcon(type),
    id: String(record.id ?? record._id ?? ""),
    meta: String(record.meta ?? record.reference ?? ""),
    timeLabel: formatTime(createdAt),
    title: String(record.title ?? "Notification"),
    unread: record.read === false || record.isRead === false,
  };
}

function mapNotificationCategory(type: string): BuyerNotification["category"] {
  if (type === "payment") return "payments";
  if (type === "message") return "messages";
  if (type === "dispute") return "disputes";
  if (type === "delivery") return "deliveries";
  if (type === "deal" || type === "rfq" || type === "purchase") return "purchases";
  return "system";
}

function mapNotificationIcon(type: string): BuyerNotification["iconType"] {
  if (type === "payment") return "payment";
  if (type === "message") return "message";
  if (type === "delivery") return "delivery";
  if (type === "review") return "review";
  if (type === "invoice") return "invoice";
  return "system";
}

function getDateGroup(value: string): BuyerNotification["dateGroup"] {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "older";

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "today";
  if (date.toDateString() === yesterday.toDateString()) return "yesterday";
  return "older";
}

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(date);
}
