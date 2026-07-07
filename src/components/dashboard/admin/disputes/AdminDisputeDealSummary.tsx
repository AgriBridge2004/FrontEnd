import { FileText, LockKeyhole, Package, User } from "lucide-react";

import type { AdminDispute } from "@/components/dashboard/admin/disputes/admin-disputes.types";

export function AdminDisputeDealSummary({ dispute }: { dispute: AdminDispute }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md">
      <h3 className="flex items-center gap-2 text-[15px] font-black text-slate-900">
        <span className="grid size-8 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
          <FileText className="size-4" />
        </span>
        Deal Summary
      </h3>
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <SummaryItem icon={Package} label="Product" value={dispute.product} />
        <SummaryItem icon={User} label="Farmer" value={dispute.farmer} />
        <div>
          <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Payment Status</p>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1 text-[11px] font-black text-red-600 ring-1 ring-red-200">
            <LockKeyhole className="size-3.5" />
            FROZEN
          </span>
          <p className="mt-2 text-[11px] font-medium leading-4 text-slate-400">Payment is frozen until this dispute is resolved.</p>
        </div>
        <SummaryItem label="Deal Value" value={`${dispute.dealValue.toLocaleString()} SAR`} />
        <SummaryItem label="Buyer" value={dispute.buyer} />
      </div>
    </section>
  );
}

function SummaryItem({ icon: Icon, label, value }: { icon?: typeof Package; label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 flex items-center gap-2 text-[14px] font-black leading-5 text-slate-900">
        {Icon ? (
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500">
            <Icon className="size-4" />
          </span>
        ) : null}
        {value}
      </p>
    </div>
  );
}
