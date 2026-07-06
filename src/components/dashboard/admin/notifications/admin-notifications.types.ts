import type { LucideIcon } from "lucide-react";

export type NotificationChannel = "inApp" | "email" | "sms";

export type NotificationTemplateStatus = "active" | "disabled";

export type NotificationTemplate = {
  id: string;
  bodyEn: string;
  channels: Record<NotificationChannel, boolean>;
  icon: LucideIcon;
  name: string;
  status: NotificationTemplateStatus;
  subjectEn: string;
  triggerEvent: string;
};

export type AdminNotificationAlert = {
  id: string;
  actionHref?: string;
  actionLabel: string;
  badge?: string;
  icon: LucideIcon;
  isUnread: boolean;
  message: string;
  time: string;
  title: string;
  tone: "red" | "blue" | "orange";
};

export type NotificationTemplateDraft = Pick<NotificationTemplate, "bodyEn" | "channels" | "name" | "subjectEn">;
