export type BuyerNotificationCategory = "purchases" | "deliveries" | "payments" | "messages" | "disputes" | "system";

export type BuyerNotificationDateGroup = "today" | "yesterday" | "older";

export type BuyerNotificationIconType = "message" | "invoice" | "review" | "payment" | "delivery" | "system";

export type BuyerNotification = {
  id: string;
  title: string;
  body: string;
  meta?: string;
  timeLabel: string;
  dateGroup: BuyerNotificationDateGroup;
  category: BuyerNotificationCategory;
  unread: boolean;
  actionRequired?: boolean;
  dealId?: string;
  iconType: BuyerNotificationIconType;
};

export type BuyerNotificationTab = "all" | "unread" | BuyerNotificationCategory;

export type BuyerActionRequiredNotification = {
  id: string;
  badge: string;
  title: string;
  description: string;
  timeLabel: string;
  tone: "red" | "green";
  primaryActionLabel: string;
  primaryToast: string;
  secondaryActionLabel: string;
  secondaryToast: string;
};
