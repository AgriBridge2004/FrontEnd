import { Bell, CreditCard, Handshake, Home, Layers, MessageSquare, Settings, Star, User } from "lucide-react";

import type { DashboardSidebarItem } from "@/components/dashboard/shared/DashboardSidebar";

export const farmerSidebarItems: DashboardSidebarItem[] = [
  { label: "Dashboard", href: "/farmer/dashboard", icon: Home },
  { label: "My Listings", href: "/farmer/listings", icon: Layers },
  { label: "Deals", href: "/farmer/deals", icon: Handshake },
  { label: "Messages", href: "/farmer/messages", icon: MessageSquare },
  { label: "Payments", href: "/farmer/payments", icon: CreditCard },
  { label: "Reviews & Ratings", href: "/farmer/reviews", icon: Star },
  { label: "Notifications", href: "/farmer/notifications", icon: Bell, badge: 3 },
  { label: "Profile", href: "/farmer/profile", icon: User },
  { label: "Settings", href: "/farmer/settings", icon: Settings },
];
