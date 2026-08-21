"use client";

import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { QualityReportRow } from "@/components/dashboard/quality-officer/reports/quality-officer-reports.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import {
  dashboardActivePaginationButtonClass,
  dashboardPaginationButtonClass,
  dashboardTableHeadClass,
  dashboardTableRowClass,
} from "@/components/dashboard/shared/dashboard-ui";
import { cn } from "@/lib/cn";

type RecentQualityReportsTableProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  onViewAll: () => void;
  onViewAnalysis: () => void;
  reports: QualityReportRow[];
};

const productDotClasses = {
  red: "bg-red-600",
  orange: "bg-amber-400",
  green: "bg-emerald-700",
};

const gradeClasses = {
  "Grade A": "bg-emerald-50 text-emerald-800",
  "Grade B+": "bg-green-100 text-emerald-800",
  "Grade A+": "bg-emerald-100 text-emerald-900",
  "Grade C": "bg-amber-50 text-amber-800",
};

export function RecentQualityReportsTable({
  currentPage,
  onPageChange,
  onViewAll,
  onViewAnalysis,
  reports,
}: RecentQualityReportsTableProps) {
  // TODO: Connect recent quality reports to API.
  return (
    <DashboardCard className="mt-5 overflow-hidden">
      <div className="flex items-center justify-between gap-3 p-4">
        <h2 className="text-base font-black text-slate-950">Recent Quality Reports</h2>
        <button className="text-xs font-black text-emerald-800 transition hover:text-emerald-950" onClick={onViewAll} type="button">
          View All Records
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px] border-t border-emerald-100 text-left">
          <thead className={dashboardTableHeadClass}>
            <tr>
              <th className="px-4 py-2.5">Date</th>
              <th className="px-4 py-2.5">Product</th>
              <th className="px-4 py-2.5">Supplier</th>
              <th className="px-4 py-2.5">Inspector</th>
              <th className="px-4 py-2.5">Grade</th>
              <th className="px-4 py-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr className={cn("border-t border-emerald-100 text-[13px] text-slate-800", dashboardTableRowClass)} key={report.id}>
                <td className="px-4 py-3 font-medium">{report.date}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-2 font-medium">
                    <span className={cn("size-2 rounded-full", productDotClasses[report.productColor])} />
                    {report.product}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium">{report.supplier}</td>
                <td className="px-4 py-3 font-medium">{report.inspector}</td>
                <td className="px-4 py-3">
                  <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-black", gradeClasses[report.grade])}>
                    {report.grade}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-[11px] font-black text-emerald-800 transition hover:bg-emerald-50"
                    onClick={onViewAnalysis}
                    type="button"
                  >
                    View Full Analysis
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-emerald-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold text-slate-600">Showing 4 of 128 reports</p>
        <div className="flex items-center gap-2">
          <PageButton ariaLabel="Previous page" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
            <ChevronLeft className="size-3.5" />
          </PageButton>
          {[1, 2, 3].map((page) => (
            <PageButton ariaLabel={`Page ${page}`} isActive={currentPage === page} key={page} onClick={() => onPageChange(page)}>
              {page}
            </PageButton>
          ))}
          <PageButton ariaLabel="Next page" onClick={() => onPageChange(currentPage + 1)}>
            <ChevronRight className="size-3.5" />
          </PageButton>
        </div>
      </div>
    </DashboardCard>
  );
}

function PageButton({
  ariaLabel,
  children,
  disabled = false,
  isActive = false,
  onClick,
}: {
  ariaLabel: string;
  children: ReactNode;
  disabled?: boolean;
  isActive?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      aria-label={ariaLabel}
      className={cn(
        dashboardPaginationButtonClass,
        isActive && dashboardActivePaginationButtonClass,
        disabled && "cursor-not-allowed bg-slate-50 text-slate-300 hover:bg-slate-50 hover:text-slate-300",
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
