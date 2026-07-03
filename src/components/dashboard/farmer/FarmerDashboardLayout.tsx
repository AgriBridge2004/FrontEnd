"use client";

import type { ReactNode } from "react";

import { farmerSidebarItems } from "@/components/dashboard/farmer/FarmerSidebarConfig";
import { farmerDashboardUser } from "@/components/dashboard/farmer/farmer-dashboard.mock";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

type FarmerDashboardLayoutProps = {
  children: ReactNode;
  hideTopbar?: boolean;
  onSearchChange?: (value: string) => void;
  searchValue?: string;
  searchPlaceholder?: string;
};

export function FarmerDashboardLayout({
  children,
  hideTopbar = false,
  onSearchChange,
  searchPlaceholder,
  searchValue,
}: FarmerDashboardLayoutProps) {
  // TODO: Protect farmer routes after backend auth/session is finalized.
  return (
    <DashboardLayout
      hideTopbar={hideTopbar}
      navLinks={[
        { href: "/marketplace", label: "Marketplace" },
        { href: "/farmer/rfqs", label: "RFQ" },
      ]}
      notificationCount={3}
      onSearchChange={onSearchChange}
      profileHref="/farmer/profile"
      role="farmer"
      searchPlaceholder={searchPlaceholder ?? "Search listing, contracts, or buyers..."}
      searchValue={searchValue}
      sidebarItems={farmerSidebarItems}
      userName={farmerDashboardUser.name}
      userSubLabel={farmerDashboardUser.farm}
    >
      {children}
    </DashboardLayout>
  );
}
