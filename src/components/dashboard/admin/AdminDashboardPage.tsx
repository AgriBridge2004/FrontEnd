"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { AdminActionRequiredCard } from "@/components/dashboard/admin/AdminActionRequiredCard";
import { AdminChartsSection } from "@/components/dashboard/admin/AdminChartsSection";
import { AdminDashboardLoadingState } from "@/components/dashboard/admin/AdminDashboardLoadingState";
import { AdminOverviewStats } from "@/components/dashboard/admin/AdminOverviewStats";
import { adminSidebarItems } from "@/components/dashboard/admin/AdminSidebarConfig";
import { adminTopbarLinks } from "@/components/dashboard/admin/AdminTopbarConfig";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

export function AdminDashboardPage() {
  const [toast, setToast] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

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

  return (
    <DashboardLayout
      hideSearch
      navLinks={adminTopbarLinks}
      notificationCount={3}
      profileHref="/admin/profile"
      role="admin"
      searchPlaceholder=""
      sidebarItems={adminSidebarItems}
      userName="Admin"
      userSubLabel="Super Administrator"
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 py-5 sm:px-5 lg:px-6">
        <header>
          <h1 className="text-[22px] font-black leading-tight tracking-tight text-slate-950">Admin Overview</h1>
          <p className="mt-1 max-w-xl text-[13px] font-medium leading-5 text-slate-500">
            Welcome back, Admin! Here&apos;s what&apos;s happening on AgriBridge.
          </p>
        </header>

        <AdminOverviewStats />

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
          <AdminChartsSection />
          <AdminActionRequiredCard
            onDisputeClick={() => showToast("Dispute details will be connected later.")}
            onViewAllDisputes={() => router.push("/admin/disputes")}
          />
        </div>

        <AdminDashboardLoadingState />
      </div>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}
