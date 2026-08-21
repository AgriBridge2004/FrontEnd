"use client";

import type { ReactNode } from "react";
import { Check, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";

import type { AdminPayment, AdminPaymentStatus } from "@/components/dashboard/admin/financial-reports/admin-payments.types";
import {
  dashboardActivePaginationButtonClass,
  dashboardIconButtonClass,
  dashboardPaginationButtonClass,
  dashboardSelectedRowClass,
  dashboardSelectClass,
  dashboardTableBodyClass,
  dashboardTableCardClass,
  dashboardTableHeadClass,
  dashboardTableRowClass,
} from "@/components/dashboard/shared/dashboard-ui";
import { cn } from "@/lib/cn";

type AdminPaymentsTableProps = {
  currentPage: number;
  onOpenDetail: (payment: AdminPayment) => void;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (value: number) => void;
  onSelectedPaymentIdsChange: (ids: string[]) => void;
  payments: AdminPayment[];
  rowsPerPage: number;
  selectedDetailPaymentId?: string;
  selectedPaymentIds: string[];
  totalCount: number;
};

export function AdminPaymentsTable({ currentPage, onOpenDetail, onPageChange, onRowsPerPageChange, onSelectedPaymentIdsChange, payments, rowsPerPage, selectedDetailPaymentId, selectedPaymentIds, totalCount }: AdminPaymentsTableProps) {
  const visibleIds = payments.map((payment) => payment.id);
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedPaymentIds.includes(id));
  const startRow = totalCount === 0 || payments.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endRow = totalCount === 0 || payments.length === 0 ? 0 : Math.min(currentPage * rowsPerPage, totalCount);

  function togglePayment(id: string) {
    onSelectedPaymentIdsChange(selectedPaymentIds.includes(id) ? selectedPaymentIds.filter((selectedId) => selectedId !== id) : [...selectedPaymentIds, id]);
  }

  function toggleAllVisible() {
    if (allVisibleSelected) {
      onSelectedPaymentIdsChange(selectedPaymentIds.filter((id) => !visibleIds.includes(id)));
      return;
    }
    onSelectedPaymentIdsChange(Array.from(new Set([...selectedPaymentIds, ...visibleIds])));
  }

  return (
    <section className={cn("mt-5", dashboardTableCardClass)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left">
          <thead className={dashboardTableHeadClass}>
            <tr>
              <th className="w-14 px-4 py-3">
                <CheckButton checked={allVisibleSelected} label="Select all visible payments" onClick={toggleAllVisible} />
              </th>
              <th className="px-4 py-3">Transaction ID</th>
              <th className="px-4 py-3">Deal ID</th>
              <th className="px-4 py-3">Payer (Buyer)</th>
              <th className="px-4 py-3">Payee (Farmer)</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Commission</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="w-12 px-4 py-3" />
            </tr>
          </thead>
          <tbody className={dashboardTableBodyClass}>
            {payments.length === 0 ? (
              <tr>
                <td className="px-4 py-10 text-center" colSpan={10}>
                  <p className="text-sm font-black text-slate-900">No payments found</p>
                  <p className="mt-1 text-sm font-medium text-slate-500">Try adjusting the filters or search query.</p>
                </td>
              </tr>
            ) : null}
            {payments.map((payment) => {
              const checked = selectedPaymentIds.includes(payment.id);
              const active = selectedDetailPaymentId === payment.id;
              return (
                <tr className={cn("cursor-pointer", dashboardTableRowClass, checked && dashboardSelectedRowClass, active && "ring-1 ring-inset ring-emerald-200")} key={payment.id} onClick={() => onOpenDetail(payment)}>
                  <td className="px-4 py-4" onClick={(event) => event.stopPropagation()}>
                    <CheckButton checked={checked} label={`Select ${payment.transactionId}`} onClick={() => togglePayment(payment.id)} />
                  </td>
                  <ClickableCell>{payment.transactionId}</ClickableCell>
                  <ClickableCell>{payment.dealId}</ClickableCell>
                  <ClickableCell>{payment.payer}</ClickableCell>
                  <ClickableCell>{payment.payee}</ClickableCell>
                  <td className="px-4 py-4 font-black text-slate-950">{payment.amount}</td>
                  <td className="px-4 py-4 font-medium text-slate-500">{payment.commission}</td>
                  <td className="px-4 py-4"><PaymentStatusBadge status={payment.status} label={payment.statusLabel} /></td>
                  <td className="px-4 py-4">
                    <p>{payment.transactionDate}</p>
                    <p className="mt-1 text-[11px] text-slate-400">{payment.transactionTime}</p>
                  </td>
                  <td className="px-4 py-4">
                    <button aria-label={`View details for ${payment.transactionId}`} className={dashboardIconButtonClass} type="button">
                      <MoreVertical className="size-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <footer className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 text-[12px] font-medium text-slate-500 lg:flex-row lg:items-center lg:justify-between">
        <span>Showing {startRow} to {endRow} of {totalCount.toLocaleString()} transactions</span>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1">
            <PageButton disabled={currentPage === 1} onClick={() => onPageChange(Math.max(1, currentPage - 1))}><ChevronLeft className="size-4" /></PageButton>
            {[1, 2, 3, 4].map((page) => (
              <PageButton isActive={currentPage === page} key={page} onClick={() => onPageChange(page)}>{page}</PageButton>
            ))}
            <span className="px-1 text-slate-400">...</span>
            <PageButton isActive={currentPage === 125} onClick={() => onPageChange(125)}>125</PageButton>
            <PageButton disabled={currentPage === 125} onClick={() => onPageChange(Math.min(125, currentPage + 1))}><ChevronRight className="size-4" /></PageButton>
          </div>
          <label className="flex items-center gap-2">
            Rows per page:
            <select className={cn(dashboardSelectClass, "h-8 w-auto px-2 py-1 text-[12px]")} onChange={(event) => onRowsPerPageChange(Number(event.target.value))} value={rowsPerPage}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </label>
        </div>
      </footer>
    </section>
  );
}

function CheckButton({ checked, label, onClick }: { checked: boolean; label: string; onClick: () => void }) {
  return (
    <button aria-label={label} className={cn("grid size-5 place-items-center rounded border transition-colors duration-150 hover:bg-emerald-50", checked ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-300 bg-white text-slate-400")} onClick={onClick} type="button">
      {checked ? <Check className="size-3.5" /> : null}
    </button>
  );
}

function ClickableCell({ children }: { children: ReactNode }) {
  return <td className="cursor-pointer px-4 py-4 font-bold text-slate-800 hover:text-emerald-800 hover:underline">{children}</td>;
}

export function PaymentStatusBadge({ label, status }: { label: string; status: AdminPaymentStatus }) {
  const styles = {
    failed: "bg-red-50 text-red-700",
    frozen: "bg-purple-50 text-purple-700",
    pending: "bg-orange-50 text-orange-700",
    refunded: "bg-blue-50 text-blue-700",
    released: "bg-emerald-50 text-emerald-700",
  };
  return <span className={cn("inline-flex rounded-full px-3 py-1 text-[12px] font-black", styles[status])}>{label}</span>;
}

function PageButton({ children, disabled = false, isActive = false, onClick }: { children: ReactNode; disabled?: boolean; isActive?: boolean; onClick: () => void }) {
  return (
    <button className={cn(dashboardPaginationButtonClass, disabled && "cursor-not-allowed opacity-40", isActive && dashboardActivePaginationButtonClass)} disabled={disabled} onClick={onClick} type="button">
      {children}
    </button>
  );
}
