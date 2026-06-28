"use client";

import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { useState } from "react";

import { FarmerSidebar } from "@/components/farmer/FarmerSidebar";
import { FarmerTopbar } from "@/components/farmer/FarmerTopbar";
import { RecentDealsTable } from "@/components/farmer/RecentDealsTable";
import { RevenueChart } from "@/components/farmer/RevenueChart";
import { RFQOpportunitiesCard } from "@/components/farmer/RFQOpportunitiesCard";
import { StatCard } from "@/components/farmer/StatCard";
import { UpcomingTasksCard } from "@/components/farmer/UpcomingTasksCard";
import {
  farmerRecentDeals,
  farmerRevenueData,
  farmerRfqOpportunities,
  farmerStats,
  farmerUpcomingTasks,
} from "@/lib/mock-data";

export default function FarmerDashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // TODO: Protect farmer dashboard route after backend auth/session is finalized.
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900" dir="ltr">
      <div>
        <FarmerSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="min-w-0 lg:pl-[232px]">
          <FarmerTopbar onMenuClick={() => setIsSidebarOpen(true)} />

          <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-5 lg:px-7">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h1 className="text-[22px] font-black tracking-tight text-slate-950 sm:text-2xl">
                  Good morning, Ahmed <span className="text-emerald-600">🌱</span>
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
                  href="/farmer/rfqs"
                >
                  <FileText className="size-4 text-emerald-700" />
                  View RFQs
                </Link>
              </div>
            </div>

            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {farmerStats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </section>

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
        </div>
      </div>
    </main>
  );
}
