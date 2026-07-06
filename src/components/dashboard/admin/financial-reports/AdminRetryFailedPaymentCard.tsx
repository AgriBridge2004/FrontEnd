"use client";

import { AlertTriangle, X } from "lucide-react";

import type { AdminPayment } from "@/components/dashboard/admin/financial-reports/admin-payments.types";

type Props = {
  onCancel: () => void;
  onRetry: () => void;
  payment?: AdminPayment;
};

export function AdminRetryFailedPaymentCard({ onCancel, onRetry, payment }: Props) {
  if (!payment) return null;
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="flex items-center gap-2 text-base font-black text-red-600"><AlertTriangle className="size-4" />Retry Failed Payment</h3>
        <button aria-label="Dismiss retry card" className="text-slate-400 hover:text-slate-700" onClick={onCancel} type="button"><X className="size-4" /></button>
      </div>
      <p className="mt-5 text-sm text-slate-500">You are about to retry this failed payment.</p>
      <dl className="mt-4 grid grid-cols-[120px_1fr] gap-y-2 text-sm">
        <dt className="text-slate-500">Transaction ID:</dt><dd className="font-black text-slate-900">{payment.transactionId}</dd>
        <dt className="text-slate-500">Deal ID:</dt><dd className="font-black text-slate-900">{payment.dealId}</dd>
        <dt className="text-slate-500">Amount:</dt><dd className="font-black text-slate-900">{payment.amount}</dd>
        <dt className="text-slate-500">Reason for failure:</dt><dd className="font-semibold text-slate-700">{payment.failureReason ?? "Not provided"}</dd>
      </dl>
      <p className="mt-5 text-sm font-black text-slate-900">Are you sure you want to retry this payment?</p>
      <div className="mt-5 flex justify-end gap-3">
        <button className="h-9 rounded-lg border border-slate-200 px-4 text-sm font-black text-slate-600 hover:bg-slate-50" onClick={onCancel} type="button">Cancel</button>
        <button className="h-9 rounded-lg bg-red-600 px-4 text-sm font-black text-white hover:bg-red-700" onClick={onRetry} type="button">Retry Payment</button>
      </div>
    </article>
  );
}
