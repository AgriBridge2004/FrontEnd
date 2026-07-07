export type DashboardRole = "farmer" | "buyer" | "quality-officer" | "admin";

export type DashboardNotificationType = "dispute" | "verification" | "system" | "payment";

export type DashboardNotification = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: DashboardNotificationType;
  isRead: boolean;
  href?: string;
};
