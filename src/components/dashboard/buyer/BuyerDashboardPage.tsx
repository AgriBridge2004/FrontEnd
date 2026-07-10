"use client";

import Link from "next/link";
import { FileText, Plus, Sprout } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { BuyerApiNotice } from "@/components/dashboard/buyer/BuyerApiNotice";
import { BuyerDeliveriesCard } from "@/components/dashboard/buyer/BuyerDeliveriesCard";
import { BuyerRecentAlerts } from "@/components/dashboard/buyer/BuyerRecentAlerts";
import { BuyerRecentPurchases } from "@/components/dashboard/buyer/BuyerRecentPurchases";
import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import { BuyerSpendingOverview } from "@/components/dashboard/buyer/BuyerSpendingOverview";
import { BuyerStatsGrid } from "@/components/dashboard/buyer/BuyerStatsGrid";
import { BuyerTopSuppliers } from "@/components/dashboard/buyer/BuyerTopSuppliers";
import type { BuyerAlert, BuyerDelivery, BuyerRecentPurchase, BuyerSupplier } from "@/components/dashboard/buyer/buyer-dashboard.types";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import { getStoredUser } from "@/lib/auth-storage";
import { getBuyerDeals, getBuyerNotifications, getBuyerRfqs, type ApiRecord } from "@/lib/buyer-api";

const buyerTopbarLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/rfq", label: "RFQ" },
];

export function BuyerDashboardPage() {
  const [deals, setDeals] = useState<ApiRecord[]>([]);
  const [rfqs, setRfqs] = useState<ApiRecord[]>([]);
  const [notifications, setNotifications] = useState<ApiRecord[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const user = getStoredUser();
  const userName = typeof user?.fullName === "string" ? user.fullName : typeof user?.name === "string" ? user.name : "Buyer";
  const firstName = userName.split(" ")[0] || "Buyer";

  useEffect(() => {
    async function loadDashboardData() {
      setErrorMessage("");

      const [dealsResult, rfqsResult, notificationsResult] = await Promise.allSettled([
        getBuyerDeals(),
        getBuyerRfqs(),
        getBuyerNotifications(),
      ]);

      if (dealsResult.status === "fulfilled") setDeals(dealsResult.value);
      if (rfqsResult.status === "fulfilled") setRfqs(rfqsResult.value);
      if (notificationsResult.status === "fulfilled") setNotifications(notificationsResult.value);
      if ([dealsResult, rfqsResult, notificationsResult].some((result) => result.status === "rejected")) {
        setErrorMessage("Some dashboard sections could not load. Connected sections will retry on refresh.");
      }
    }

    void loadDashboardData();
  }, []);

  const dashboardData = useMemo(() => {
    const activeDeals = deals.filter((deal) => ["active", "confirmed", "pending"].includes(String(deal.status ?? "")));
    const completedDeals = deals.filter((deal) => String(deal.status ?? "") === "completed");
    const recentPurchases: BuyerRecentPurchase[] = deals.slice(0, 5).map((deal) => ({
      amount: getNumber(deal.totalAmount ?? deal.amount ?? deal.price) ?? 0,
      id: String(deal.id ?? deal._id ?? ""),
      product: getProductName(deal),
      status: mapRecentPurchaseStatus(String(deal.status ?? "")),
      supplier: getFarmerName(deal),
    }));
    const deliveries: BuyerDelivery[] = activeDeals.slice(0, 3).map((deal) => ({
      date: formatDate(deal.deliveryDate ?? deal.updatedAt ?? deal.createdAt),
      id: String(deal.id ?? deal._id ?? ""),
      image: getString(asRecord(deal.listing).imageUrl),
      location: getString(deal.location ?? asRecord(deal.listing).location) ?? "Not specified",
      product: getProductName(deal),
    }));
    const suppliers: BuyerSupplier[] = deals.slice(0, 3).map((deal) => ({
      image: getString(asRecord(deal.farmer).avatarUrl),
      location: getString(asRecord(deal.farmer).location ?? asRecord(deal.farmer).region) ?? "Not specified",
      name: getFarmerName(deal),
      rating: getNumber(asRecord(deal.farmer).rating) ?? 0,
    }));
    const alerts: BuyerAlert[] = notifications.slice(0, 4).map((notification) => ({
      time: formatDate(notification.createdAt ?? notification.time),
      title: String(notification.title ?? notification.message ?? "Notification"),
    }));

    return {
      alerts,
      deliveries,
      recentPurchases,
      spendingData: [
        { label: "Deals", spending: deals.reduce((total, deal) => total + (getNumber(deal.totalAmount ?? deal.amount ?? deal.price) ?? 0), 0) },
        { label: "RFQs", spending: rfqs.reduce((total, rfq) => total + (getNumber(rfq.budget) ?? 0), 0) },
      ],
      stats: {
        activeContracts: activeDeals.length,
        openDisputes: 0,
        pendingDeliveries: activeDeals.length,
        totalSpent: completedDeals.reduce((total, deal) => total + (getNumber(deal.totalAmount ?? deal.amount ?? deal.price) ?? 0), 0),
      },
      suppliers,
    };
  }, [deals, notifications, rfqs]);

  return (
    <DashboardLayout
      navLinks={buyerTopbarLinks}
      notificationCount={notifications.filter((notification) => notification.read === false || notification.isRead === false).length}
      profileHref="/buyer/profile"
      role="buyer"
      searchPlaceholder="Search orders, suppliers, or markets..."
      sidebarItems={buyerSidebarItems}
      userName={userName}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-5 lg:px-7">
        {errorMessage ? <BuyerApiNotice description={errorMessage} title="Some API data could not be loaded." /> : null}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-[22px] font-black tracking-tight text-slate-950 sm:text-2xl">
              Good morning, {firstName} <Sprout className="inline size-5 text-emerald-600" aria-hidden="true" />
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
              href="/rfq"
            >
              <FileText className="size-4 text-emerald-700" />
              View RFQs
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <BuyerStatsGrid stats={dashboardData.stats} />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_308px]">
          <div className="grid min-w-0 gap-6">
            <BuyerSpendingOverview data={dashboardData.spendingData} />
            <BuyerRecentPurchases purchases={dashboardData.recentPurchases} />
          </div>

          <aside className="grid h-fit gap-6 md:grid-cols-2 xl:grid-cols-1">
            <BuyerDeliveriesCard deliveries={dashboardData.deliveries} />
            <BuyerTopSuppliers suppliers={dashboardData.suppliers} />
            <BuyerRecentAlerts alerts={dashboardData.alerts} />
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}

function asRecord(value: unknown): ApiRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as ApiRecord) : {};
}

function getString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function getProductName(deal: ApiRecord) {
  const listing = asRecord(deal.listing);
  const rfq = asRecord(deal.rfq);
  return getString(deal.productName ?? listing.name ?? listing.title ?? rfq.productType) ?? "Deal";
}

function getFarmerName(deal: ApiRecord) {
  const farmer = asRecord(deal.farmer ?? deal.seller);
  return getString(farmer.fullName ?? farmer.name ?? deal.farmerName) ?? "Farmer";
}

function mapRecentPurchaseStatus(status: string): BuyerRecentPurchase["status"] {
  if (status === "completed") return "completed";
  if (status === "confirmed" || status === "active") return "confirmed";
  if (status === "pending") return "pending";
  return "in-progress";
}

function formatDate(value: unknown) {
  const date = typeof value === "string" || typeof value === "number" ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "Recently";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date);
}
