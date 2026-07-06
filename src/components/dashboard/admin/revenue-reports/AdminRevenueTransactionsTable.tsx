"use client";

import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { RevenueTransaction } from "@/components/dashboard/admin/revenue-reports/admin-revenue-reports.types";
import {
  dashboardActivePaginationButtonClass,
  dashboardPaginationButtonClass,
  dashboardSelectClass,
  dashboardTableBodyClass,
  dashboardTableCardClass,
  dashboardTableHeadClass,
  dashboardTableRowClass,
} from "@/components/dashboard/shared/dashboard-ui";
import { cn } from "@/lib/cn";

type Props = {
  currentPage: number;
  onPageChange: (page: number) => void;
  onRowClick: () => void;
  onRowsPerPageChange: (value: number) => void;
  rowsPerPage: number;
  totalCount: number;
  transactions: RevenueTransaction[];
};

export function AdminRevenueTransactionsTable({ currentPage, onPageChange, onRowClick, onRowsPerPageChange, rowsPerPage, totalCount, transactions }: Props) {
  const startRow = totalCount === 0 || transactions.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endRow = totalCount === 0 || transactions.length === 0 ? 0 : Math.min(currentPage * rowsPerPage, totalCount);
  return (
    <section className={cn("mt-8", dashboardTableCardClass)}>
      <h2 className="px-6 py-5 text-base font-black text-slate-950">Revenue Transactions</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left">
          <thead className={dashboardTableHeadClass}>
            <tr>
              <th className="px-4 py-4">Deal ID</th>
              <th className="px-4 py-4">Date</th>
              <th className="px-4 py-4">Total Deal Value</th>
              <th className="px-4 py-4">Commission %</th>
              <th className="px-4 py-4">Net Commission</th>
              <th className="px-4 py-4">Related Inspection Fees</th>
              <th className="px-4 py-4">Product Category</th>
              <th className="px-4 py-4">Status</th>
              <th className="w-12 px-4 py-4" />
            </tr>
          </thead>
          <tbody className={dashboardTableBodyClass}>
            {transactions.length === 0 ? (
              <tr><td className="px-4 py-10 text-center" colSpan={9}>No revenue transactions found.</td></tr>
            ) : null}
            {transactions.map((transaction) => (
              <tr className={cn("cursor-pointer", dashboardTableRowClass)} key={transaction.id} onClick={onRowClick}>
                <td className="px-4 py-5 font-bold text-slate-800">{transaction.dealId}</td>
                <td className="px-4 py-5 text-slate-600">{transaction.dateLabel}</td>
                <td className="px-4 py-5 font-black text-slate-950">{formatCurrency(transaction.totalDealValue)}</td>
                <td className="px-4 py-5">{transaction.commissionPercent.toFixed(2)}%</td>
                <td className="px-4 py-5 font-black text-slate-950">{formatCurrency(transaction.netCommission)}</td>
                <td className="px-4 py-5">{formatCurrency(transaction.relatedInspectionFees)}</td>
                <td className="px-4 py-5">{transaction.productCategory}</td>
                <td className="px-4 py-5"><span className="rounded-lg bg-emerald-50 px-3 py-1 text-[12px] font-black text-emerald-700">Completed</span></td>
                <td className="px-4 py-5"><ChevronRight className="size-5 text-slate-400" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="flex flex-col gap-3 border-t border-slate-100 px-6 py-4 text-sm text-slate-500 lg:flex-row lg:items-center lg:justify-between">
        <span>Showing {startRow} to {endRow} of {totalCount.toLocaleString()} transactions</span>
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2">
            Rows per page:
            <select className={cn(dashboardSelectClass, "h-8 w-auto px-2 py-1 text-[12px]")} onChange={(event) => onRowsPerPageChange(Number(event.target.value))} value={rowsPerPage}>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </label>
          <div className="flex items-center gap-1">
            <PageButton disabled={currentPage === 1} onClick={() => onPageChange(Math.max(1, currentPage - 1))}><ChevronLeft className="size-4" /></PageButton>
            {[1, 2, 3, 4, 5].map((page) => <PageButton isActive={currentPage === page} key={page} onClick={() => onPageChange(page)}>{page}</PageButton>)}
            <span className="px-2">...</span>
            <PageButton isActive={currentPage === 25} onClick={() => onPageChange(25)}>25</PageButton>
            <PageButton disabled={currentPage === 25} onClick={() => onPageChange(Math.min(25, currentPage + 1))}><ChevronRight className="size-4" /></PageButton>
          </div>
        </div>
      </footer>
    </section>
  );
}

function PageButton({ children, disabled = false, isActive = false, onClick }: { children: ReactNode; disabled?: boolean; isActive?: boolean; onClick: () => void }) {
  return <button className={cn(dashboardPaginationButtonClass, disabled && "cursor-not-allowed opacity-40", isActive && dashboardActivePaginationButtonClass)} disabled={disabled} onClick={onClick} type="button">{children}</button>;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { currency: "USD", style: "currency" }).format(value);
}
