"use client";

import { ArrowUpDown, Clock, MoreVertical, Package, User } from "lucide-react";

import { AdminRFQsPagination } from "@/components/dashboard/admin/rfqs/AdminRFQsPagination";
import type { AdminRFQ, AdminRFQSortKey } from "@/components/dashboard/admin/rfqs/admin-rfqs.types";
import { cn } from "@/lib/cn";

type AdminRFQsTableProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onRFQSelect: (rfq: AdminRFQ) => void;
  onSortChange: (sortKey: AdminRFQSortKey) => void;
  pageSize: number;
  rfqs: AdminRFQ[];
  selectedRFQId?: string;
  selectedSort: AdminRFQSortKey;
  totalCount: number;
  totalPages: number;
};

const sortableHeaders: Array<{ key: AdminRFQSortKey; label: string }> = [
  { key: "rfqId", label: "RFQ ID" },
  { key: "buyer", label: "Buyer" },
  { key: "farmer", label: "Farmer" },
  { key: "product", label: "Product / Listing" },
  { key: "requestedQuantity", label: "Requested Qty" },
  { key: "status", label: "Status" },
  { key: "dateSubmitted", label: "Date Submitted" },
  { key: "lastActivity", label: "Last Activity" },
];

export function AdminRFQsTable({
  currentPage,
  onPageChange,
  onPageSizeChange,
  onRFQSelect,
  onSortChange,
  pageSize,
  rfqs,
  selectedRFQId,
  selectedSort,
  totalCount,
  totalPages,
}: AdminRFQsTableProps) {
  return (
    <section className="mt-5 overflow-hidden rounded-lg border border-emerald-100 bg-white shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md">
      <div className="border-b border-slate-100 px-4 py-4">
        <h2 className="text-[14px] font-black text-slate-800">Total RFQs: {totalCount}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1060px] text-left">
          <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wide text-slate-400">
            <tr>
              {sortableHeaders.map((header) => (
                <th className="px-4 py-3" key={header.key}>
                  <button
                    className={cn("inline-flex items-center gap-1 transition hover:text-emerald-800", selectedSort === header.key && "text-emerald-800")}
                    onClick={() => onSortChange(header.key)}
                    type="button"
                  >
                    {header.label}
                    <ArrowUpDown className="size-3" />
                  </button>
                </th>
              ))}
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[13px] font-semibold text-slate-700">
            {rfqs.map((rfq) => {
              const isSelected = selectedRFQId === rfq.id;

              return (
                <tr
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:bg-emerald-50/30",
                    isSelected && "bg-emerald-50/40",
                    rfq.status === "expired" && "text-slate-600",
                  )}
                  key={rfq.id}
                  onClick={() => onRFQSelect(rfq)}
                >
                  <td className="px-4 py-5 font-black leading-5 text-slate-950">{rfq.rfqId}</td>
                  <td className="px-4 py-5">
                    <EntityCell primary={rfq.buyer.company} secondary={rfq.buyer.contact} />
                  </td>
                  <td className="px-4 py-5">
                    <EntityCell primary={rfq.farmer.farmName} secondary={rfq.farmer.contact} />
                  </td>
                  <td className="px-4 py-5">
                    <ProductCell name={rfq.product.name} subtitle={rfq.product.subtitle} />
                  </td>
                  <td className="px-4 py-5 font-black text-slate-900">{rfq.requestedQuantity}</td>
                  <td className="px-4 py-5">
                    <RFQStatusBadge status={rfq.status} />
                  </td>
                  <td className="px-4 py-5 text-slate-600">
                    <span className="block">{rfq.dateSubmitted}</span>
                    {rfq.dateSubmittedTime ? <span className="block text-[11px] text-slate-400">{rfq.dateSubmittedTime}</span> : null}
                  </td>
                  <td className={cn("px-4 py-5 font-black", rfq.activityState === "inactive" ? "text-red-500" : "text-emerald-600")}>
                    {rfq.lastActivity}
                    {rfq.activityState === "inactive" ? <Clock className="ml-2 inline size-3 text-orange-400" /> : null}
                  </td>
                  <td className="px-4 py-5 text-right">
                    <button
                      aria-label="Open RFQ detail"
                      className="text-slate-400 transition hover:text-emerald-800"
                      onClick={(event) => {
                        event.stopPropagation();
                        onRFQSelect(rfq);
                      }}
                      type="button"
                    >
                      <MoreVertical className="size-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <AdminRFQsPagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </section>
  );
}

function EntityCell({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-900 text-white">
        <User className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block max-w-[130px] truncate font-black leading-4 text-slate-800">{primary}</span>
        <span className="block max-w-[130px] truncate text-[11px] font-medium text-slate-400">{secondary}</span>
      </span>
    </div>
  );
}

function ProductCell({ name, subtitle }: { name: string; subtitle: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-950 text-emerald-100">
        <Package className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block max-w-[130px] truncate font-black leading-4 text-slate-800">{name}</span>
        <span className="block text-[11px] font-medium text-slate-400">{subtitle}</span>
      </span>
    </div>
  );
}

export function RFQStatusBadge({ status }: { status: AdminRFQ["status"] }) {
  const styles = {
    accepted: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    expired: "bg-slate-100 text-slate-600 ring-slate-200",
    "flagged-for-review": "bg-orange-50 text-orange-700 ring-orange-200",
    "pending-farmer-response": "bg-amber-50 text-amber-700 ring-amber-200",
    quoted: "bg-blue-50 text-blue-700 ring-blue-200",
    rejected: "bg-red-50 text-red-700 ring-red-200",
  };
  const labels = {
    accepted: "Accepted -> Deal",
    expired: "Expired",
    "flagged-for-review": "Flagged for Review",
    "pending-farmer-response": "Pending Farmer Response",
    quoted: "Quoted",
    rejected: "Rejected",
  };

  return (
    <span className={cn("inline-flex max-w-[92px] items-center rounded-md px-2 py-1 text-[11px] font-black leading-4 ring-1", styles[status])}>
      {labels[status]}
    </span>
  );
}
