"use client";

import { Fragment } from "react";
import { AlertCircle, AlertTriangle, ArrowUpDown, MoreHorizontal, RefreshCw } from "lucide-react";

import { AdminDealProgressTrack } from "@/components/dashboard/admin/deals/AdminDealProgressTrack";
import type { AdminDeal, AdminDealSortKey } from "@/components/dashboard/admin/deals/admin-deals.types";
import {
  dashboardIconButtonClass,
  dashboardSelectedRowClass,
  dashboardTableBodyClass,
  dashboardTableCardClass,
  dashboardTableHeadClass,
  dashboardTableRowClass,
} from "@/components/dashboard/shared/dashboard-ui";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { cn } from "@/lib/cn";

type AdminDealsTableProps = {
  deals: AdminDeal[];
  onAlertClick: (deal: AdminDeal) => void;
  onActionClick: (deal: AdminDeal) => void;
  onDealSelect: (deal: AdminDeal) => void;
  onRefresh: () => void;
  onSortChange: (sortKey: AdminDealSortKey) => void;
  selectedDealId?: string;
  selectedSort: AdminDealSortKey;
  totalCount: number;
};

const sortableHeaders: Array<{ key: AdminDealSortKey; label: string }> = [
  { key: "dealId", label: "Deal ID" },
  { key: "farmer", label: "Farmer" },
  { key: "buyer", label: "Buyer" },
  { key: "product", label: "Product" },
  { key: "value", label: "Value" },
  { key: "status", label: "Status" },
];

const statusMeta = {
  completed: { label: "Completed", tone: "emerald" },
  confirmed: { label: "Confirmed", tone: "emerald" },
  disputed: { label: "Disputed", tone: "rose" },
  negotiating: { label: "Negotiating", tone: "sky" },
  "under-inspection": { label: "Under Inspection", tone: "amber" },
} as const;

export function AdminDealsTable({
  deals,
  onAlertClick,
  onActionClick,
  onDealSelect,
  onRefresh,
  onSortChange,
  selectedDealId,
  selectedSort,
  totalCount,
}: AdminDealsTableProps) {
  return (
    <section className={cn("mt-5", dashboardTableCardClass)}>
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
        <h2 className="text-[14px] font-black text-slate-950">
          Deals <span className="text-slate-500">({totalCount})</span>
        </h2>
        <button
          className="inline-flex items-center gap-1.5 text-[12px] font-bold text-slate-500 transition hover:text-emerald-800"
          onClick={onRefresh}
          type="button"
        >
          <RefreshCw className="size-3.5" />
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className={dashboardTableHeadClass}>
            <tr>
              {sortableHeaders.map((header) => (
                <th className="px-4 py-3" key={header.key}>
                  <button
                    className={cn(
                      "inline-flex items-center gap-1 transition hover:text-emerald-800",
                      selectedSort === header.key && "text-emerald-800",
                    )}
                    onClick={() => onSortChange(header.key)}
                    type="button"
                  >
                    {header.label}
                    <ArrowUpDown className="size-3" />
                  </button>
                </th>
              ))}
              <th className="px-4 py-3">Date / Time</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className={dashboardTableBodyClass}>
            {deals.map((deal) => {
              const meta = statusMeta[deal.status];
              const isDisputed = deal.status === "disputed";
              const isSelected = selectedDealId === deal.id;

              return (
                <Fragment key={deal.id}>
                  <tr
                    className={cn(
                      "group cursor-pointer border-t border-slate-100",
                      dashboardTableRowClass,
                      isSelected && dashboardSelectedRowClass,
                      isDisputed && "bg-red-50/20",
                      isDisputed && isSelected && "bg-red-50/50",
                    )}
                    onClick={() => onDealSelect(deal)}
                  >
                    <td className="px-4 pt-4 align-top font-black leading-5 text-slate-950">{deal.dealId}</td>
                    <td className="px-4 pt-4 align-top leading-5">{deal.farmer}</td>
                    <td className="px-4 pt-4 align-top leading-5">{deal.buyer}</td>
                    <td className="px-4 pt-4 align-top">{deal.product}</td>
                    <td className="px-4 pt-4 align-top font-black text-slate-950">{deal.value}</td>
                    <td className="px-4 pt-4 align-top">
                      {isDisputed ? (
                        <span className="inline-flex items-center gap-1">
                          <StatusBadge label={meta.label} tone={meta.tone} />
                          <AlertCircle className="size-3.5 text-red-500" />
                        </span>
                      ) : (
                        <StatusBadge label={meta.label} tone={meta.tone} />
                      )}
                    </td>
                    <td className="px-4 pt-4 align-top text-slate-500">
                      <span className="block">{deal.date}</span>
                      <span className="block">{deal.time}</span>
                    </td>
                    <td className="px-4 pt-4 align-top">
                      <div className="flex items-center justify-end gap-2">
                        {isDisputed ? (
                          <button
                          aria-label="View dispute details"
                          className={cn(dashboardIconButtonClass, "text-red-500 hover:text-red-600")}
                          onClick={(event) => {
                            event.stopPropagation();
                            onAlertClick(deal);
                          }}
                          type="button"
                        >
                            <AlertTriangle className="size-4" />
                          </button>
                        ) : null}
                        <button
                        aria-label="Open deal actions"
                        className={dashboardIconButtonClass}
                        onClick={(event) => {
                          event.stopPropagation();
                          onActionClick(deal);
                        }}
                        type="button"
                      >
                          <MoreHorizontal className="size-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr
                    className={cn(
                      "cursor-pointer border-t border-slate-50",
                      dashboardTableRowClass,
                      isSelected && dashboardSelectedRowClass,
                      isDisputed && isSelected && "bg-red-50/40",
                    )}
                    onClick={() => onDealSelect(deal)}
                  >
                    <td className="px-4 pb-3 pt-0" colSpan={8}>
                      <AdminDealProgressTrack stage={deal.progressStage} />
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
