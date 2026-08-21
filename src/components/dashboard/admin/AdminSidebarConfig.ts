import {
  Banknote,
  Bell,
  FileText,
  Gavel,
  Handshake,
  Home,
  Layers,
  PieChart,
  Settings,
  User,
  Users,
  UsersRound,
} from "lucide-react";

import type { DashboardSidebarItem } from "@/components/dashboard/shared/DashboardSidebar";

export const adminSidebarItems: DashboardSidebarItem[] = [
  { href: "/admin/dashboard", icon: Home, label: "Dashboard" },
  { href: "/admin/deals", icon: Handshake, label: "Deals Management" },
  { href: "/admin/rfqs", icon: FileText, label: "RFQs Management" },
  { badge: 6, badgeTone: "red", href: "/admin/disputes", icon: Gavel, label: "Disputes" },
  { href: "/admin/quality-officers", icon: UsersRound, label: "Quality Officers" },
  { href: "/admin/users", icon: Users, label: "User Management" },
  { href: "/admin/listings", icon: Layers, label: "Listings Management" },
  { href: "/admin/financial-reports", icon: Banknote, label: "Financial Reports" },
  { href: "/admin/revenue-reports", icon: PieChart, label: "Revenue & Reports" },
  { href: "/admin/notifications", icon: Bell, label: "Notifications" },
  { href: "/admin/profile", icon: User, label: "Profile" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];
