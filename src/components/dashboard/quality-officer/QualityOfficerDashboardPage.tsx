"use client";

import { useEffect, useRef, useState } from "react";

import { NewAssignmentRequests } from "@/components/dashboard/quality-officer/NewAssignmentRequests";
import { QualityOfficerMessagesCard } from "@/components/dashboard/quality-officer/QualityOfficerMessagesCard";
import { qualityOfficerSidebarItems } from "@/components/dashboard/quality-officer/QualityOfficerSidebarConfig";
import { QualityOfficerStats } from "@/components/dashboard/quality-officer/QualityOfficerStats";
import { RecentSubmittedReports } from "@/components/dashboard/quality-officer/RecentSubmittedReports";
import { UpcomingScheduleCard } from "@/components/dashboard/quality-officer/UpcomingScheduleCard";
import {
  qualityAssignmentRequests,
  qualityOfficerStats,
  qualityReports,
  qualitySchedule,
} from "@/components/dashboard/quality-officer/quality-officer-dashboard.mock";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const qualityOfficerTopbarLinks: Array<{ href: string; label: string }> = [];

export function QualityOfficerDashboardPage() {
  const [toast, setToast] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  function showToast(message: string) {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToast(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToast("");
      toastTimeoutRef.current = null;
    }, 2400);
  }

  // TODO: Connect Quality Officer dashboard stats, assignments, schedule, and reports to API when endpoints are ready.
  return (
    <DashboardLayout
      hideSearch
      navLinks={qualityOfficerTopbarLinks}
      notificationCount={5}
      profileHref="/quality-officer/settings"
      role="quality-officer"
      searchPlaceholder=""
      sidebarItems={qualityOfficerSidebarItems}
      userName="Fatima Hassan"
      userSubLabel="Senior Quality Officer"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-5 lg:px-7">
        <header>
          <h1 className="text-[22px] font-black leading-tight tracking-tight text-slate-950 sm:text-2xl">
            Welcome back, Quality Officer
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Here&apos;s an overview of your quality assurance activities.
          </p>
        </header>

        <QualityOfficerStats stats={qualityOfficerStats} />

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_308px]">
          <div className="grid min-w-0 gap-6">
            <NewAssignmentRequests
              assignments={qualityAssignmentRequests}
              onAccept={() => showToast("Assignment accepted locally.")}
              onDecline={() => showToast("Assignment declined locally.")}
              onViewAll={() => showToast("Assignments list will be connected later.")}
            />
            <RecentSubmittedReports
              onView={() => showToast("Report details will be connected later.")}
              onViewAll={() => showToast("Reports list will be connected later.")}
              reports={qualityReports}
            />
          </div>

          <aside className="grid h-fit gap-6 lg:grid-cols-2 xl:grid-cols-1">
            <UpcomingScheduleCard
              items={qualitySchedule}
              onDetails={() => showToast("Schedule details will be connected later.")}
            />
            <QualityOfficerMessagesCard
              onNewMessage={() => showToast("New message flow will be connected later.")}
              onSearch={() => showToast("Messages controls will be connected later.")}
            />
          </aside>
        </div>

        <section className="mt-8 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <article className="rounded-2xl border border-slate-100 bg-white/60 p-4 opacity-70" key={index}>
              <div className="h-3 w-16 rounded bg-slate-100" />
              <div className="mt-3 h-3 w-32 rounded bg-slate-100" />
              <div className="mt-3 h-3 w-24 rounded bg-slate-100" />
            </article>
          ))}
        </section>
      </div>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}
