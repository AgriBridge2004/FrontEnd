"use client";

import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { FarmerDashboardLayout } from "@/components/dashboard/farmer/FarmerDashboardLayout";
import { RecentDealsTable } from "@/components/dashboard/farmer/RecentDealsTable";
import { RevenueChart } from "@/components/dashboard/farmer/RevenueChart";
import { RFQOpportunitiesCard } from "@/components/dashboard/farmer/RFQOpportunitiesCard";
import { StatCard } from "@/components/dashboard/farmer/StatCard";
import { UpcomingTasksCard } from "@/components/dashboard/farmer/UpcomingTasksCard";
import {
  farmerRecentDeals,
  farmerRevenueData,
  farmerRfqOpportunities,
  farmerStats,
  farmerUpcomingTasks,
} from "@/components/dashboard/farmer/farmer-dashboard.mock";
import { ApiError } from "@/lib/api";
import { getStoredUser } from "@/lib/auth-storage";
import { getFarmerDisplayName } from "@/lib/farmer-display";
import { getFarmerStats } from "@/lib/farmer-api";
import type { FarmerDashboardStats } from "@/types/farmer";

function mapDashboardStatsToCards(stats: FarmerDashboardStats) {
  return [
    { label: "Active Listings", value: String(stats.activeListings), note: "Synced from listings", tone: "positive", icon: "listing" },
    // TODO: Replace with farmer RFQ endpoint when Swagger documents one.
    { ...farmerStats[1], value: String(stats.openRfqs) },
    // TODO: Replace with farmer deals endpoint when Swagger documents one.
    { ...farmerStats[2], value: String(stats.activeDeals) },
    // TODO: Replace with dashboard/revenue endpoint when Swagger documents one.
    { ...farmerStats[3], value: stats.totalRevenue.toLocaleString() },
  ];
}

export function FarmerDashboardPage() {
  const [dashboardStats, setDashboardStats] = useState(farmerStats);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState("");
  const [farmerName, setFarmerName] = useState("Farmer");

  const loadDashboardStats = useCallback(async () => {
    setIsLoadingStats(true);
    setStatsError("");

    try {
      const stats = await getFarmerStats();
      setDashboardStats(mapDashboardStatsToCards(stats));
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        // TODO: Backend may return 404 from documented GET /listings/my before a farmer profile/listing resource exists.
        setDashboardStats(farmerStats);
        return;
      }

      setStatsError(error instanceof Error ? error.message : "Unable to connect to the server.");
    } finally {
      setIsLoadingStats(false);
    }
  }, []);

  useEffect(() => {
    const storedUser = getStoredUser();

    setFarmerName(getFarmerDisplayName(storedUser));
    void loadDashboardStats();
  }, [loadDashboardStats]);

  return (
    <FarmerDashboardLayout>
      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-5 lg:px-7">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-[22px] font-black tracking-tight text-slate-950 sm:text-2xl">
              Good morning, {farmerName}
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Here&apos;s what&apos;s happening with your farm today.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 text-sm font-black text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
              href="/farmer/listings/create"
            >
              <Plus className="size-4" />
              Create Listing
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

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {isLoadingStats ? (
            <DashboardStatSkeletons />
          ) : (
            dashboardStats.map((stat) => <StatCard key={stat.label} stat={stat} />)
          )}
        </section>
        {statsError ? (
          <section className="mt-4 rounded-2xl border border-red-100 bg-white p-4 text-sm font-semibold text-slate-600 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span>{statsError}</span>
              <button
                className="h-9 rounded-lg bg-emerald-800 px-4 text-sm font-black text-white transition hover:bg-emerald-900"
                onClick={loadDashboardStats}
                type="button"
              >
                Retry
              </button>
            </div>
          </section>
        ) : null}

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="grid min-w-0 gap-6">
            <RevenueChart data={farmerRevenueData} />
            <RecentDealsTable deals={farmerRecentDeals} />
          </div>

          <aside className="grid h-fit gap-6 lg:grid-cols-2 xl:grid-cols-1">
            <UpcomingTasksCard tasks={farmerUpcomingTasks} />
            <RFQOpportunitiesCard opportunities={farmerRfqOpportunities} />
          </aside>
        </div>
      </div>
    </FarmerDashboardLayout>
  );
}

function DashboardStatSkeletons() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <article
          className="flex min-h-[104px] animate-pulse items-center gap-3.5 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"
          key={index}
        >
          <span className="size-10 rounded-xl bg-slate-100" />
          <div className="grid flex-1 gap-2">
            <span className="h-3 w-24 rounded bg-slate-100" />
            <span className="h-6 w-16 rounded bg-slate-100" />
            <span className="h-3 w-28 rounded bg-slate-100" />
          </div>
        </article>
      ))}
    </>
  );
}
