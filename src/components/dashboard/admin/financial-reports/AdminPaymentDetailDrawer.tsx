"use client";

import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Lock, Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";

import type { AdminPayment } from "@/components/dashboard/admin/financial-reports/admin-payments.types";

type AdminPaymentDetailDrawerProps = {
  onAddNote: () => void;
  onClose: () => void;
  onViewDeal: () => void;
  open: boolean;
  payment: AdminPayment | null;
};

export function AdminPaymentDetailDrawer({ onAddNote, onClose, onViewDeal, open, payment }: AdminPaymentDetailDrawerProps) {
  const router = useRouter();
  if (!open || !payment) return null;

  return (
    <>
      <button aria-label="Close payment detail overlay" className="fixed inset-0 z-40 bg-slate-900/10 lg:left-[232px]" onClick={onClose} type="button" />
      <aside aria-labelledby="payment-detail-title" aria-modal="true" className="fixed bottom-0 right-0 top-0 z-50 flex w-full flex-col overflow-hidden border-l border-slate-200 bg-white shadow-2xl sm:w-[360px] xl:w-[380px] 2xl:w-[400px]" role="dialog">
        <header className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-bold text-slate-950" id="payment-detail-title">Payment Detail</h2>
          <button aria-label="Close payment detail" className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-emerald-50/30 hover:text-emerald-800" onClick={onClose} type="button">
            <X className="size-4" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          <section className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Transaction ID</p>
              <h3 className="mt-2 text-base font-black text-slate-950">{payment.transactionId}</h3>
            </div>
            <FrozenBadge label={payment.status === "frozen" ? "Frozen" : payment.statusLabel} />
          </section>

          <section className="mt-7 grid grid-cols-2 gap-5">
            <Detail label="Status" value={payment.statusLabel} tone={payment.status === "frozen" ? "purple" : undefined} />
            <Detail label="Payment Method" value={payment.paymentMethod} />
          </section>

          <section className="mt-7">
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Amount Breakdown</p>
            <div className="mt-3 space-y-2 text-sm">
              <AmountRow label="Gross Amount (from Buyer)" value={payment.amount} />
              <AmountRow label="Platform Commission (5%)" negative value={`-${payment.commission}`} />
              <AmountRow label="Inspection Fee" negative value={`-${payment.inspectionFee}`} />
              <div className="mt-3 flex items-center justify-between border-t border-dashed border-slate-200 pt-3 text-base font-black">
                <span>Net Amount (to Farmer)</span>
                <span className="text-emerald-700">{payment.netAmount}</span>
              </div>
            </div>
          </section>

          {payment.status === "frozen" ? (
            <div className="mt-6 flex gap-3 rounded-lg border border-purple-100 bg-purple-50 px-4 py-3 text-sm text-purple-700">
              <Lock className="size-4 shrink-0" />
              <div>
                <p className="font-black">This payment is frozen.</p>
                <p className="mt-1 font-medium">Release requires dispute resolution.</p>
              </div>
            </div>
          ) : null}

          <section className="mt-7">
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Linked Deal</p>
            <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="flex gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-md bg-gradient-to-br from-slate-200 via-slate-400 to-slate-900 text-[10px] font-black text-white">
                  {createInitials(payment.payer)}
                </span>
                <div>
                  <p className="font-black text-slate-950">{payment.dealId}</p>
                  <p className="mt-1 text-sm text-slate-600">{payment.linkedDeal.product} - {payment.linkedDeal.quantity}</p>
                  <p className="mt-2 text-[12px] text-slate-500">Buyer: {payment.payer}</p>
                  <p className="text-[12px] text-slate-500">Farmer: {payment.payee}</p>
                </div>
              </div>
              <button className="mt-3 h-9 w-full rounded-lg border border-slate-200 bg-white text-sm font-black text-slate-700 hover:bg-emerald-50/30" onClick={onViewDeal} type="button">View Deal</button>
            </div>
          </section>

          <section className="mt-7">
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Payment Timeline</p>
            <div className="mt-4 space-y-0">
              <Timeline icon={<CheckCircle2 className="size-4" />} title="Payment initiated by buyer" date={`${payment.transactionDate} 02:20 AM`} tone="green" />
              <Timeline icon={<Lock className="size-4" />} title="Payment frozen automatically" date={`${payment.transactionDate} 09:25 AM`} value="Reason: Buyer raised a dispute" tone="purple" />
              <Timeline title="Awaiting dispute resolution" />
            </div>
          </section>

          {payment.relatedDispute ? (
            <section className="mt-7">
              <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Related Dispute</p>
              <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="size-5 text-slate-400" />
                  <div>
                    <p className="font-black text-slate-950">{payment.relatedDispute.id}</p>
                    <p className="mt-1 text-sm text-slate-600">{payment.relatedDispute.title}</p>
                    <p className="mt-2 text-[12px] text-slate-500">Raised by: {payment.relatedDispute.raisedBy}</p>
                    <p className="text-[12px] font-black text-purple-700">Status: {payment.relatedDispute.status}</p>
                  </div>
                </div>
                <button className="mt-3 h-9 w-full rounded-md bg-purple-700 text-sm font-black text-white hover:bg-purple-800" onClick={() => router.push("/admin/disputes")} type="button">View Dispute</button>
              </div>
            </section>
          ) : null}

          <section className="mt-7">
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Notes</p>
            <p className="mt-2 text-sm italic text-slate-500">No admin notes for this transaction.</p>
            <button className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-800" onClick={onAddNote} type="button">
              <Pencil className="size-4" />
              Add Note
            </button>
          </section>
        </div>
      </aside>
    </>
  );
}

function Detail({ label, tone, value }: { label: string; tone?: "purple"; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</p>
      <p className={`mt-2 text-sm font-black ${tone === "purple" ? "text-purple-700" : "text-slate-950"}`}>{value}</p>
    </div>
  );
}

function FrozenBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-purple-100 px-2.5 py-1 text-[11px] font-black text-purple-700">
      <Lock className="size-3" />
      {label}
    </span>
  );
}

function AmountRow({ label, negative = false, value }: { label: string; negative?: boolean; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className={negative ? "font-black text-red-500" : "font-black text-slate-950"}>{value}</span>
    </div>
  );
}

function Timeline({ date, icon, title, tone, value }: { date?: string; icon?: ReactNode; title: string; tone?: "green" | "purple"; value?: string }) {
  return (
    <div className="relative flex gap-3 pb-5 text-sm last:pb-0">
      <span className="absolute left-2.5 top-5 h-full w-px bg-slate-200 last:hidden" />
      <span className={`relative z-10 mt-1 grid size-5 place-items-center rounded-full ${tone === "green" ? "bg-emerald-500 text-white" : tone === "purple" ? "bg-purple-500 text-white" : "border border-slate-200 bg-white"}`}>{icon}</span>
      <div>
        {date ? <p className="text-[12px] font-black text-slate-800">{date}</p> : null}
        <p className="font-medium text-slate-500">{title}</p>
        {value ? <p className="mt-1 text-[12px] text-slate-400">{value}</p> : null}
      </div>
    </div>
  );
}

function createInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
