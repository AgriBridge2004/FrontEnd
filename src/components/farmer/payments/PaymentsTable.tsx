import { ChevronLeft, ChevronRight } from "lucide-react";

import { PaymentStatusBadge } from "@/components/farmer/payments/PaymentStatusBadge";
import type { PaymentTransaction } from "@/components/farmer/payments/payments.mock";
import { cn } from "@/lib/cn";

type PaymentsTableProps = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  transactions: PaymentTransaction[];
  onPageChange: (page: number) => void;
};

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function PaymentsTable({
  currentPage,
  pageSize,
  totalItems,
  totalPages,
  transactions,
  onPageChange,
}: PaymentsTableProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <section className="mt-8 overflow-hidden rounded-lg border border-emerald-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left">
          <thead className="bg-slate-50 text-[13px] font-black uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-6 py-4">Transaction ID</th>
              <th className="px-6 py-4">Contract</th>
              <th className="px-6 py-4">Buyer</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr className="transition hover:bg-emerald-50/20" key={transaction.id}>
                  <td className="px-6 py-5 font-medium text-slate-800">{transaction.transactionId}</td>
                  <td className="px-6 py-5 font-medium text-slate-600">{transaction.contractId}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span className="grid size-6 shrink-0 place-items-center rounded bg-emerald-50 text-[9px] font-black text-emerald-800">
                        {transaction.buyerInitials}
                      </span>
                      <span className="font-black text-slate-900">{transaction.buyer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-medium text-slate-600">{transaction.type}</td>
                  <td className={cn("px-6 py-5 font-black", getAmountClassName(transaction.amountDirection))}>
                    {formatAmount(transaction.amount, transaction.amountDirection)}
                  </td>
                  <td className="px-6 py-5">
                    <PaymentStatusBadge status={transaction.status} />
                  </td>
                  <td className="px-6 py-5 font-medium text-slate-600">{transaction.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-8 text-center text-sm font-semibold text-slate-500" colSpan={7}>
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold tracking-wide text-slate-600">
          Showing {startItem} to {endItem} of {totalItems} transactions
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            aria-label="Previous page"
            className="grid size-8 place-items-center rounded-md text-slate-400 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            type="button"
          >
            <ChevronLeft className="size-4" />
          </button>
          {getPageItems(totalPages, currentPage).map((item) =>
            item === "ellipsis" ? (
              <span className="px-2 text-sm font-black text-slate-500" key={`${item}-${currentPage}`}>
                ...
              </span>
            ) : (
              <button
                className={cn(
                  "grid size-8 place-items-center rounded-md text-sm font-black transition",
                  currentPage === item ? "bg-emerald-800 text-white" : "text-slate-600 hover:bg-white",
                )}
                key={item}
                onClick={() => onPageChange(item)}
                type="button"
              >
                {item}
              </button>
            ),
          )}
          <button
            aria-label="Next page"
            className="grid size-8 place-items-center rounded-md text-slate-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            type="button"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function formatAmount(amount: number, direction: PaymentTransaction["amountDirection"]) {
  const absoluteAmount = Math.abs(amount);
  if (direction === "positive") {
    return `+ SAR ${formatter.format(absoluteAmount)}`;
  }
  if (direction === "negative") {
    return `- SAR ${formatter.format(absoluteAmount)}`;
  }
  return `SAR ${formatter.format(absoluteAmount)}`;
}

function getAmountClassName(direction: PaymentTransaction["amountDirection"]) {
  if (direction === "positive") {
    return "text-emerald-700";
  }
  if (direction === "negative") {
    return "text-red-600";
  }
  return "text-slate-950";
}

function getPageItems(totalPages: number, currentPage: number): Array<number | "ellipsis"> {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "ellipsis", currentPage, "ellipsis", totalPages];
}
