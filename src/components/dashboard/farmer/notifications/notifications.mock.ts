export type NotificationCategory =
  | "Contracts"
  | "Payments"
  | "Messages"
  | "Reviews"
  | "Deals"
  | "Disputes"
  | "System";

export type NotificationFilter = "All" | "Unread" | NotificationCategory;

export type FarmerNotification = {
  id: string;
  category: NotificationCategory;
  title: string;
  message: string;
  meta?: string;
  time: string;
  dateGroup: "Today" | "Yesterday" | "Earlier";
  unread: boolean;
  actionRequired?: boolean;
};

export type ActionRequiredItem = {
  id: string;
  type: "Contract Signature" | "Escrow Approval";
  title: string;
  description: string;
  urgency?: string;
  time?: string;
  tone: "red" | "green";
};

export const notificationTabs: Array<{ label: NotificationFilter; count?: number }> = [
  { label: "All", count: 24 },
  { label: "Unread", count: 7 },
  { label: "Contracts", count: 4 },
  { label: "Payments", count: 12 },
  { label: "Messages", count: 3 },
  { label: "Reviews" },
  { label: "Deals" },
  { label: "Disputes" },
  { label: "System" },
];

export const actionRequiredItems: ActionRequiredItem[] = [
  {
    id: "signature-dl-1042",
    type: "Contract Signature",
    urgency: "Expires in 18h",
    title: "Pending Signature: Deal #DL-1042",
    description:
      "Green Kitchen Restaurant has signed the Seasonal Potato supply agreement. Your signature is required to finalize escrow.",
    tone: "red",
  },
  {
    id: "escrow-dl-0988",
    type: "Escrow Approval",
    time: "Today, 2:45 PM",
    title: "Approve Fund Release: Deal #DL-0988",
    description: "Quality inspection passed for Batch B-42. Approve release of SAR 12,400 to logistics partner.",
    tone: "green",
  },
];

export const farmerNotifications: FarmerNotification[] = [
  {
    id: "notif-1",
    category: "Messages",
    title: "New Message from Green Kitchen Restaurant",
    message:
      '"Hi, we received the first pallet of organic carrots. The quality is exceptional! Just checking on the timing for..."',
    meta: "Deal #DL-1042 • Logistics Thread",
    time: "10:24 AM",
    dateGroup: "Today",
    unread: true,
  },
  {
    id: "notif-2",
    category: "System",
    title: "Compliance Checklist Completed",
    message: "Your farm sanitation certificate (FS-2024-001) has been verified by the regional inspector.",
    time: "8:15 AM",
    dateGroup: "Today",
    unread: false,
  },
  {
    id: "notif-3",
    category: "Reviews",
    title: "New 5-Star Review Received",
    message: '"Best produce delivery in the tri-state area. Reliable, clean packaging, and always on time." - Northside Bistro',
    time: "Yesterday, 4:50 PM",
    dateGroup: "Yesterday",
    unread: false,
  },
  {
    id: "notif-4",
    category: "Payments",
    title: "Payment Processed: SAR 4,200.00",
    message: "Payment for Invoice #INV-2024-089 has been cleared and is now available in your AgriBridge Wallet.",
    meta: "Batch B-39 • Organic Kale",
    time: "Yesterday, 2:10 PM",
    dateGroup: "Yesterday",
    unread: true,
  },
  {
    id: "notif-5",
    category: "Contracts",
    title: "Contract Signature Required",
    message: "Deal #DL-1042 is waiting for your signature before escrow can be finalized.",
    meta: "Green Kitchen Restaurant",
    time: "Yesterday, 11:15 AM",
    dateGroup: "Yesterday",
    unread: true,
    actionRequired: true,
  },
  {
    id: "notif-6",
    category: "Deals",
    title: "Deal Status Updated",
    message: "Deal #DL-1008 moved to inspection scheduled.",
    meta: "FreshMart Distributors",
    time: "Mon, 9:40 AM",
    dateGroup: "Earlier",
    unread: false,
  },
  {
    id: "notif-7",
    category: "Disputes",
    title: "Dispute Response Requested",
    message: "Please review the buyer note for shipment #B-31 and upload supporting documents.",
    meta: "Response due in 2 days",
    time: "Mon, 8:20 AM",
    dateGroup: "Earlier",
    unread: true,
    actionRequired: true,
  },
  {
    id: "notif-8",
    category: "Payments",
    title: "Escrow Funded: SAR 12,400.00",
    message: "Green Kitchen Restaurant funded escrow for Deal #DL-1042.",
    meta: "Deal #DL-1042",
    time: "Sun, 5:15 PM",
    dateGroup: "Earlier",
    unread: true,
  },
];
