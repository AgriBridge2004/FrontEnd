"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, Download, Eye, Package } from "lucide-react";

import type {
  AssignmentStatus,
  AssignmentTab,
  QualityOfficerAssignment,
} from "@/components/dashboard/quality-officer/assignments/quality-officer-assignments.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { cn } from "@/lib/cn";

type QualityOfficerAssignmentsTableProps = {
  activeTab: AssignmentTab;
  assignments: QualityOfficerAssignment[];
  counts: Record<AssignmentTab, number>;
  currentPage: number;
  pageSize: number;
  onExport: () => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onTabChange: (tab: AssignmentTab) => void;
  onViewAssignment: (assignment: QualityOfficerAssignment) => void;
};

const tabs: Array<{ label: string; value: AssignmentTab }> = [
  { label: "All Assignments", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
  { label: "Overdue", value: "overdue" },
];

const statusLabels: Record<AssignmentStatus, string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  overdue: "Overdue",
  pending: "Pending",
};

const statusClasses: Record<AssignmentStatus, string> = {
  completed: "bg-emerald-100 text-emerald-700",
  "in-progress": "bg-blue-100 text-blue-700",
  overdue: "bg-red-100 text-red-600",
  pending: "bg-amber-100 text-amber-700",
};

export function QualityOfficerAssignmentsTable({
  activeTab,
  assignments,
  counts,
  currentPage,
  onExport,
  onPageChange,
  onPageSizeChange,
  onTabChange,
  onViewAssignment,
  pageSize,
}: QualityOfficerAssignmentsTableProps) {
  // TODO: Connect assignment details route/API and export action to backend.
  return (
    <div className="mt-5">
      <div className="flex flex-col gap-2.5 border-b border-slate-200 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              className={cn(
                "relative h-10 shrink-0 whitespace-nowrap px-1 text-[13px] font-semibold transition",
                activeTab === tab.value ? "text-emerald-900" : "text-slate-600 hover:text-emerald-800",
              )}
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              type="button"
            >
              {tab.label} ({counts[tab.value]})
              {activeTab === tab.value ? <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-emerald-800" /> : null}
            </button>
          ))}
        </div>

        <button
          className="mb-2.5 inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
          onClick={onExport}
          type="button"
        >
          <Download className="size-3.5" />
          Export
        </button>
      </div>

      <DashboardCard className="mt-3 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] table-fixed text-left">
            <colgroup>
              <col className="w-[13%]" />
              <col className="w-[20%]" />
              <col className="w-[16%]" />
              <col className="w-[13%]" />
              <col className="w-[12%]" />
              <col className="w-[12%]" />
              <col className="w-[11%]" />
              <col className="w-[3%]" />
            </colgroup>
            <thead className="bg-stone-50 text-[10px] font-black uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3">Deal ID</th>
                <th className="px-4 py-3">Product & Category</th>
                <th className="px-4 py-3">Farm & Location</th>
                <th className="px-4 py-3">Buyer</th>
                <th className="px-4 py-3">Required Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Assigned On</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">
              {assignments.length ? (
                assignments.map((assignment) => (
                  <tr className="transition hover:bg-emerald-50/30" key={assignment.id}>
                    <td className="px-4 py-4 align-middle">
                      <p className="font-black leading-5 text-slate-950">{assignment.dealId}</p>
                      <StatusBadge className="mt-2" status={assignment.status} />
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <div className="flex items-center gap-2.5">
                        <ProductImage alt={assignment.productName} src={assignment.productImage} />
                        <div className="min-w-0">
                          <p className="font-black leading-5 text-slate-950">{assignment.productName}</p>
                          <p className="text-xs font-medium leading-4 text-slate-500">{assignment.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <p className="font-black leading-5 text-slate-950">{assignment.farmName}</p>
                      <p className="mt-1 text-xs font-medium leading-4 text-slate-500">{assignment.location}</p>
                    </td>
                    <td className="px-4 py-4 align-middle font-medium leading-5 text-slate-600">{assignment.buyer}</td>
                    <td className="px-4 py-4 align-middle">
                      <p className="font-black leading-5 text-slate-950">{assignment.requiredDate}</p>
                      <p className="text-xs font-medium text-slate-500">{assignment.requiredTime}</p>
                      {assignment.urgencyLabel ? (
                        <p className={cn("mt-1 text-xs font-black", assignment.status === "overdue" ? "text-red-600" : "text-orange-600")}>
                          {assignment.urgencyLabel}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <StatusBadge status={assignment.status} />
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <p className="font-medium leading-5 text-slate-700">{assignment.assignedDate}</p>
                      <p className="text-xs font-medium text-slate-400">{assignment.assignedTime}</p>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <button
                        aria-label={`View ${assignment.dealId}`}
                        className="grid size-7 place-items-center rounded-lg text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-800"
                        onClick={() => onViewAssignment(assignment)}
                        type="button"
                      >
                        <Eye className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-8 text-center text-sm font-semibold text-slate-500" colSpan={8}>
                    No assignments match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] font-medium text-slate-600">Showing 1 to 8 of 24 assignments</p>
          <div className="flex flex-wrap items-center gap-2">
            <PageButton ariaLabel="Previous page" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
              <ChevronLeft className="size-4" />
            </PageButton>
            {[1, 2, 3].map((page) => (
              <PageButton ariaLabel={`Page ${page}`} isActive={currentPage === page} key={page} onClick={() => onPageChange(page)}>
                {page}
              </PageButton>
            ))}
            <PageButton ariaLabel="Next page" onClick={() => onPageChange(currentPage + 1)}>
              <ChevronRight className="size-4" />
            </PageButton>
            <select
              className="h-8 rounded-lg border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 outline-none"
              onChange={(event) => onPageSizeChange(Number(event.target.value))}
              value={pageSize}
            >
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
              <option value={50}>50 / page</option>
            </select>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}

function StatusBadge({ className, status }: { className?: string; status: AssignmentStatus }) {
  return (
    <span className={cn("inline-flex rounded-md px-2 py-0.5 text-[10px] font-black uppercase leading-none", statusClasses[status], className)}>
      {statusLabels[status]}
    </span>
  );
}

function ProductImage({ alt, src }: { alt: string; src?: string }) {
  if (!src) {
    return (
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
        <Package className="size-[18px]" />
      </span>
    );
  }

  return (
    <span className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-emerald-50">
      <Image alt={alt} className="object-cover" fill sizes="36px" src={src} />
    </span>
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
        "grid size-8 place-items-center rounded-lg border text-xs font-black transition",
        isActive
          ? "border-emerald-800 bg-emerald-800 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-900",
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
