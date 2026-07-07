"use client";

import Link from "next/link";
import { FileText, Plus, Sprout } from "lucide-react";

import { BuyerDeliveriesCard } from "@/components/dashboard/buyer/BuyerDeliveriesCard";
import { BuyerRecentAlerts } from "@/components/dashboard/buyer/BuyerRecentAlerts";
import { BuyerRecentPurchases } from "@/components/dashboard/buyer/BuyerRecentPurchases";
import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import { BuyerSpendingOverview } from "@/components/dashboard/buyer/BuyerSpendingOverview";
import { BuyerStatsGrid } from "@/components/dashboard/buyer/BuyerStatsGrid";
import { BuyerTopSuppliers } from "@/components/dashboard/buyer/BuyerTopSuppliers";
import {
  buyerDashboardStats,
  buyerDeliveries,
  buyerRecentAlerts,
  buyerRecentPurchases,
  buyerSpendingData,
  buyerTopSuppliers,
} from "@/components/dashboard/buyer/buyer-dashboard.mock";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const buyerTopbarLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/buyer/rfqs", label: "RFQ" },
];

export function BuyerDashboardPage() {
  // TODO: Connect buyer dashboard data to API when endpoints are ready.
  return (
    <DashboardLayout
      navLinks={buyerTopbarLinks}
      notificationCount={3}
      profileHref="/buyer/profile"
      role="buyer"
      searchPlaceholder="Search orders, suppliers, or markets..."
      sidebarItems={buyerSidebarItems}
      userName="Ramesh Kumar"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-5 lg:px-7">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-[22px] font-black tracking-tight text-slate-950 sm:text-2xl">
              Good morning, Ahmed <Sprout className="inline size-5 text-emerald-600" aria-hidden="true" />
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-600">Your purchasing overview and key updates.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 text-sm font-black text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
              href="/buyer/browse-listings"
            >
              <Plus className="size-4" />
              New Purchase
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
              href="/buyer/rfqs"
            >
              <FileText className="size-4 text-emerald-700" />
              View RFQs
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <BuyerStatsGrid stats={buyerDashboardStats} />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_308px]">
          <div className="grid min-w-0 gap-6">
            <BuyerSpendingOverview data={buyerSpendingData} />
            <BuyerRecentPurchases purchases={buyerRecentPurchases} />
          </div>

          <aside className="grid h-fit gap-6 md:grid-cols-2 xl:grid-cols-1">
            <BuyerDeliveriesCard deliveries={buyerDeliveries} />
            <BuyerTopSuppliers suppliers={buyerTopSuppliers} />
            <BuyerRecentAlerts alerts={buyerRecentAlerts} />
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}
