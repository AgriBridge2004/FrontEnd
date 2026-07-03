import {
  Bell,
  CreditCard,
  FileText,
  Gavel,
  Handshake,
  Heart,
  Home,
  MessageSquare,
  Settings,
  Star,
  User,
} from "lucide-react";

import type { DashboardSidebarItem } from "@/components/dashboard/shared/DashboardSidebar";

export const buyerSidebarItems: DashboardSidebarItem[] = [
  { href: "/buyer/dashboard", icon: Home, label: "Dashboard" },
  { href: "/buyer/favorites", icon: Heart, label: "Favorite Listings" },
  { href: "/buyer/deals", icon: Handshake, label: "Deals" },
  { href: "/buyer/messages", icon: MessageSquare, label: "Messages" },
  { href: "/buyer/contracts", icon: FileText, label: "Contracts" },
  { href: "/buyer/payments", icon: CreditCard, label: "Payments" },
  { href: "/buyer/reviews", icon: Star, label: "Reviews" },
  { href: "/buyer/disputes", icon: Gavel, label: "Disputes" },
  { href: "/buyer/notifications", icon: Bell, label: "Notifications" },
  { href: "/buyer/profile", icon: User, label: "Profile" },
  { href: "/buyer/settings", icon: Settings, label: "Settings" },
];
