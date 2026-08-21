import { CalendarCheck, ClipboardList, FileText, Gavel, Home, Settings } from "lucide-react";

import type { DashboardSidebarItem } from "@/components/dashboard/shared/DashboardSidebar";

export const qualityOfficerSidebarItems: DashboardSidebarItem[] = [
  { href: "/quality-officer/dashboard", icon: Home, label: "Dashboard" },
  { badge: 12, href: "/quality-officer/assignments", icon: ClipboardList, label: "Assignments" },
  { href: "/quality-officer/inspections", icon: CalendarCheck, label: "Inspections" },
  { href: "/quality-officer/reports", icon: FileText, label: "Reports" },
  { badge: 2, badgeTone: "red", href: "/quality-officer/disputes", icon: Gavel, label: "Disputes" },
  { href: "/quality-officer/settings", icon: Settings, label: "Settings" },
];
