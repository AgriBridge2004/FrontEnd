"use client";

import Image from "next/image";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  LayoutGrid,
  List,
  MapPin,
  SlidersHorizontal,
} from "lucide-react";

import type {
  InspectionStatus,
  InspectionTab,
  QualityOfficerInspection,
} from "@/components/dashboard/quality-officer/inspections/quality-officer-inspections.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import {
  dashboardActivePaginationButtonClass,
  dashboardPaginationButtonClass,
  dashboardTableHeadClass,
  dashboardTableRowClass,
} from "@/components/dashboard/shared/dashboard-ui";
import { cn } from "@/lib/cn";

type QualityOfficerInspectionsTableProps = {
  activeTab: InspectionTab;
  inspections: QualityOfficerInspection[];
  onFilterClick: () => void;
  onTabChange: (tab: InspectionTab) => void;
};

const tabs: Array<{ count?: number; label: string; value: InspectionTab }> = [
  { label: "All Inspections", value: "all" },
  { label: "Upcoming", value: "scheduled" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
  { count: 4, label: "Flagged", value: "flagged" },
];

const statusClasses: Record<InspectionStatus, string> = {
  completed: "bg-slate-100 text-slate-700",
  flagged: "bg-orange-100 text-orange-800",
  "in-progress": "bg-emerald-100 text-emerald-800",
  scheduled: "bg-blue-100 text-blue-700",
};

const statusLabels: Record<InspectionStatus, string> = {
  completed: "Completed",
  flagged: "Flagged",
  "in-progress": "In Progress",
  scheduled: "Scheduled",
};

const statusIcons: Record<InspectionStatus, typeof Circle> = {
  completed: CheckCircle2,
  flagged: AlertTriangle,
  "in-progress": Circle,
  scheduled: Circle,
};

export function QualityOfficerInspectionsTable({
  activeTab,
  inspections,
  onFilterClick,
  onTabChange,
}: QualityOfficerInspectionsTableProps) {
  return (
    <DashboardCard className="mt-6 overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-5 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              className={cn(
                "relative h-9 whitespace-nowrap px-1 text-sm font-semibold transition",
                activeTab === tab.value ? "text-emerald-900" : "text-slate-600 hover:text-emerald-800",
              )}
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              type="button"
            >
              {tab.label}
              {tab.count ? (
                <span className="ml-2 inline-grid size-5 place-items-center rounded-full bg-red-50 text-[11px] font-black text-red-500">
                  {tab.count}
                </span>
              ) : null}
              {activeTab === tab.value ? <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-emerald-800" /> : null}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
            <button className="grid size-8 place-items-center rounded-md bg-emerald-50 text-emerald-800" type="button">
              <List className="size-4" />
            </button>
            <button className="grid size-8 place-items-center rounded-md text-slate-500 transition hover:bg-slate-50" type="button">
              <LayoutGrid className="size-4" />
            </button>
          </div>
          <button
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
            onClick={onFilterClick}
            type="button"
          >
            <SlidersHorizontal className="size-4" />
            Filters
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-left">
          <thead className={dashboardTableHeadClass}>
            <tr>
              <th className="px-6 py-4">ID & Product</th>
              <th className="px-6 py-4">Farm / Location</th>
              <th className="px-6 py-4">Date & Schedule</th>
              <th className="px-6 py-4">Inspector</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {inspections.map((inspection) => (
              <tr className={cn(dashboardTableRowClass, inspection.status === "flagged" && "bg-orange-50/20")} key={inspection.id}>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-emerald-50">
                      <Image
                        alt={`${inspection.productName} inspection`}
                        className="object-cover"
                        fill
                        sizes="48px"
                        src={inspection.productImage ?? "/images/farmer/create-listing/placeholders/listing-photo-placeholder-1.jpg"}
                      />
                    </span>
                    <div>
                      <p className="font-black text-slate-700">{inspection.id}</p>
                      <p className="mt-1 max-w-36 font-black leading-5 text-emerald-900">{inspection.productName}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex gap-2">
                    <MapPin className="mt-1 size-4 shrink-0 text-emerald-700" />
                    <div>
                      <p className="font-black leading-5 text-slate-950">{inspection.farmName}</p>
                      <p className="mt-1 text-xs font-medium leading-4 text-slate-500">{inspection.location}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="font-black text-slate-950">{inspection.date}</p>
                  <p className={cn("mt-1 text-xs font-medium leading-4 text-slate-600", inspection.status === "flagged" && "font-black text-red-600")}>
                    {inspection.schedule}
                  </p>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <span className="relative size-8 shrink-0 overflow-hidden rounded-full bg-emerald-50">
                      <Image
                        alt={`${inspection.inspectorName} avatar`}
                        className="object-cover"
                        fill
                        sizes="32px"
                        src={inspection.inspectorAvatar ?? "/images/farmer/profile/farmer-avatar.jpg"}
                      />
                    </span>
                    <p className="max-w-28 font-medium leading-5 text-slate-900">{inspection.inspectorName}</p>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <InspectionStatusBadge status={inspection.status} />
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="text-xs font-black text-emerald-700 transition hover:text-emerald-900" type="button">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-slate-600">Showing 1-10 of 1,284 entries</p>
        <div className="flex items-center gap-2">
          <button className="grid size-8 place-items-center rounded-lg text-slate-300 transition hover:bg-emerald-50" type="button">
            <ChevronLeft className="size-4" />
          </button>
          {[1, 2, 3].map((page) => (
            <button
              className={cn(
                dashboardPaginationButtonClass,
                page === 1 && dashboardActivePaginationButtonClass,
              )}
              key={page}
              type="button"
            >
              {page}
            </button>
          ))}
          <span className="px-1 text-sm font-black text-slate-500">...</span>
          <button className="grid size-8 place-items-center rounded-lg text-sm font-black text-slate-700 transition hover:bg-emerald-50" type="button">
            129
          </button>
          <button className="grid size-8 place-items-center rounded-lg text-slate-600 transition hover:bg-emerald-50" type="button">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </DashboardCard>
  );
}

function InspectionStatusBadge({ status }: { status: InspectionStatus }) {
  const Icon = statusIcons[status];

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black", statusClasses[status])}>
      <Icon className={cn("size-3", status === "in-progress" && "fill-current")} />
      {statusLabels[status]}
    </span>
  );
}
