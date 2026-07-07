import { AlertTriangle, CheckCircle2, ClipboardCheck, DollarSign, FileText, UserCheck, UserRound } from "lucide-react";

import type { AdminNotificationAlert, NotificationTemplate } from "@/components/dashboard/admin/notifications/admin-notifications.types";

export const notificationVariables = [
  "{{buyer_name}}",
  "{{seller_name}}",
  "{{rfq_id}}",
  "{{product_name}}",
  "{{quantity}}",
  "{{unit}}",
  "{{created_date}}",
  "{{expiry_date}}",
];

export const samplePreviewData: Record<string, string> = {
  buyer_name: "FreshMart LLC",
  created_date: "May 25, 2025",
  expiry_date: "May 30, 2025",
  product_name: "Tomatoes",
  quantity: "10,000",
  rfq_id: "RFQ-2025-0142",
  seller_name: "Ahmad Hassan",
  unit: "kg",
};

const defaultBody = `Hello {{seller_name}},

You have received a new Request for Quotation (RFQ) from {{buyer_name}}.

RFQ ID: {{rfq_id}}
Product: {{product_name}}
Quantity: {{quantity}} {{unit}}

Please review the RFQ and respond with your offer as soon as possible.`;

export const adminNotificationTemplates: NotificationTemplate[] = [
  {
    bodyEn: defaultBody,
    channels: { email: true, inApp: true, sms: false },
    icon: FileText,
    id: "template-rfq-received",
    name: "New RFQ Received",
    status: "active",
    subjectEn: "New RFQ Received - {{rfq_id}}",
    triggerEvent: "When new RFQ is submitted by a buyer",
  },
  {
    bodyEn: "Hello {{seller_name}},\n\nA deal has been confirmed by both parties.",
    channels: { email: true, inApp: true, sms: false },
    icon: CheckCircle2,
    id: "template-deal-confirmed",
    name: "Deal Confirmed",
    status: "active",
    subjectEn: "Deal Confirmed - {{rfq_id}}",
    triggerEvent: "When a deal is confirmed by both parties",
  },
  {
    bodyEn: "Hello Admin,\n\nA quality officer has submitted an inspection report.",
    channels: { email: true, inApp: true, sms: false },
    icon: ClipboardCheck,
    id: "template-inspection-submitted",
    name: "Inspection Report Submitted",
    status: "active",
    subjectEn: "Inspection Report Submitted",
    triggerEvent: "When a quality officer submits report",
  },
  {
    bodyEn: "Hello Admin,\n\nA dispute has been opened on a deal and requires review.",
    channels: { email: true, inApp: true, sms: true },
    icon: AlertTriangle,
    id: "template-dispute-opened",
    name: "Dispute Opened",
    status: "active",
    subjectEn: "Dispute Opened",
    triggerEvent: "When a dispute opened on a deal",
  },
  {
    bodyEn: "Hello {{seller_name}},\n\nYour payment has been released.",
    channels: { email: true, inApp: true, sms: false },
    icon: DollarSign,
    id: "template-payment-released",
    name: "Payment Released",
    status: "active",
    subjectEn: "Payment Released",
    triggerEvent: "When a payment is released to the seller",
  },
  {
    bodyEn: "Hello,\n\nYour account has been verified by admin.",
    channels: { email: false, inApp: true, sms: false },
    icon: UserCheck,
    id: "template-account-verified",
    name: "Account Verified",
    status: "disabled",
    subjectEn: "Account Verified",
    triggerEvent: "When user account is verified by admin",
  },
];

export const adminNotificationAlerts: AdminNotificationAlert[] = [
  {
    actionHref: "/admin/disputes",
    actionLabel: "View Dispute",
    badge: "NEW",
    icon: AlertTriangle,
    id: "alert-dispute-opened",
    isUnread: true,
    message: "A dispute has been opened for Deal #DL-0483 by Green Fields Co.",
    time: "10:24 AM",
    title: "New Dispute Opened",
    tone: "red",
  },
  {
    actionHref: "/admin/users",
    actionLabel: "Review Users",
    badge: "NEW",
    icon: UserRound,
    id: "alert-user-verification",
    isUnread: true,
    message: "5 new user accounts are pending verification.",
    time: "9:45 AM",
    title: "User Verification Pending",
    tone: "blue",
  },
  {
    actionHref: "/admin/rfqs",
    actionLabel: "View RFQ",
    icon: FileText,
    id: "alert-rfq-stalled",
    isUnread: false,
    message: "RFQ #RFQ-2025-0211 has been pending response for more than 48 hours.",
    time: "Yesterday, 6:15 PM",
    title: "RFQ Stalled",
    tone: "orange",
  },
];
