import type { UserRole } from "@/types";

export type NavItem = {
  label: string;
  href: string;
};

export const publicNavItems: NavItem[] = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "Login", href: "/auth/login" },
  { label: "Register", href: "/auth/register" },
];

export const dashboardNavItems: Record<UserRole, NavItem[]> = {
  farmer: [
    { label: "Dashboard", href: "/farmer/dashboard" },
    { label: "My listings", href: "/farmer/listings" },
    { label: "Create listing", href: "/farmer/listings/create" },
    { label: "RFQs", href: "/farmer/rfqs" },
    { label: "Deals", href: "/farmer/deals" },
    { label: "Messages", href: "/farmer/messages" },
    { label: "Profile", href: "/farmer/profile" },
  ],
  buyer: [
    { label: "Dashboard", href: "/buyer/dashboard" },
    { label: "Browse listings", href: "/buyer/browse-listings" },
    { label: "My RFQs", href: "/buyer/rfqs" },
    { label: "Create RFQ", href: "/buyer/rfqs/create" },
    { label: "Deals", href: "/buyer/deals" },
    { label: "Messages", href: "/buyer/messages" },
    { label: "Profile", href: "/buyer/profile" },
  ],
  quality_officer: [
    { label: "Dashboard", href: "/officer/dashboard" },
    { label: "Assigned inspections", href: "/officer/inspections" },
  ],
  admin: [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Users", href: "/admin/users" },
    { label: "Deals", href: "/admin/deals" },
    { label: "Inspections", href: "/admin/inspections" },
    { label: "Disputes", href: "/admin/disputes" },
    { label: "Revenue", href: "/admin/revenue" },
    { label: "Settings", href: "/admin/settings" },
  ],
};
