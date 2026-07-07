import type { DashboardNotification, DashboardNotificationType, DashboardRole } from "@/components/dashboard/shared/dashboard-notifications.types";

export const notificationRouteByRole: Record<DashboardRole, string> = {
  admin: "/admin/notifications",
  buyer: "/buyer/notifications",
  farmer: "/farmer/notifications",
  "quality-officer": "/quality-officer/notifications",
};

const notificationHrefByRoleAndType: Record<DashboardRole, Partial<Record<DashboardNotificationType, string>>> = {
  admin: {
    dispute: "/admin/disputes",
    payment: "/admin/financial-reports",
    system: "/admin/notifications",
    verification: "/admin/users",
  },
  buyer: {
    dispute: "/buyer/disputes",
    payment: "/buyer/payments",
    system: "/buyer/notifications",
    verification: "/buyer/profile",
  },
  farmer: {
    payment: "/farmer/payments",
    system: "/farmer/notifications",
    verification: "/farmer/profile",
  },
  "quality-officer": {
    dispute: "/quality-officer/disputes",
    payment: "/quality-officer/dashboard",
    system: "/quality-officer/notifications",
    verification: "/quality-officer/assignments",
  },
};

const defaultDashboardNotifications: Omit<DashboardNotification, "href">[] = [
  {
    id: "new-dispute-opened",
    isRead: false,
    message: "Deal #DL-0483 requires immediate admin review.",
    time: "2 mins ago",
    title: "New dispute opened",
    type: "dispute",
  },
  {
    id: "verification-request",
    isRead: false,
    message: "Ahmed Darwish submitted documents for verification.",
    time: "45 mins ago",
    title: "Verification Request",
    type: "verification",
  },
  {
    id: "system-maintenance",
    isRead: false,
    message: "Scheduled maintenance on Sunday, 02:00 AM UTC.",
    time: "3 hours ago",
    title: "System Maintenance",
    type: "system",
  },
  {
    id: "payment-failed",
    isRead: false,
    message: "Transaction failed for Deal #DL-0471.",
    time: "5 hours ago",
    title: "Payment Failed",
    type: "payment",
  },
];

export function getDashboardNotifications(role: DashboardRole): DashboardNotification[] {
  // TODO: Connect notifications to backend API.
  // TODO: Connect real-time notification updates.
  // TODO: Connect role-based notification content.
  return defaultDashboardNotifications.map((notification) => ({
    ...notification,
    href: notificationHrefByRoleAndType[role][notification.type],
    id: `${role}-${notification.id}`,
  }));
}
