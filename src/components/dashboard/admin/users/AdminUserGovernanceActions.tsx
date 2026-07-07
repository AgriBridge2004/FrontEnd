"use client";

import type { ReactNode } from "react";
import { Ban, ShieldX, Trash2, X } from "lucide-react";

type AdminUserGovernanceActionsProps = {
  onPurge: () => void;
  onSuspend: () => void;
  selectedUserName: string;
};

export function AdminUserGovernanceActions({ onPurge, onSuspend, selectedUserName }: AdminUserGovernanceActionsProps) {
  return (
    <section className="mt-6 grid gap-5 border-t border-slate-200 pt-6 lg:grid-cols-2">
      <article className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <Header icon={<Ban className="size-4" />} subtitle="RESTRICTED ACCESS PROTOCOL" title="Suspend Account" />
        <div className="p-5">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-[12px] font-semibold leading-5 text-amber-800">
            <p className="font-black">User has 6 active inspections and 2 active deals.</p>
            <p className="mt-2">Account suspension will freeze all current funds in escrow and halt on-site quality verifications immediately.</p>
          </div>
          <button className="mt-4 h-9 rounded-lg border border-orange-300 px-4 text-[12px] font-black text-orange-700 hover:bg-orange-50" onClick={onSuspend} type="button">
            Suspend Account
          </button>
        </div>
      </article>
      <article className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <Header icon={<Trash2 className="size-4" />} subtitle="IRREVERSIBLE SECURITY ACTION" title="Purge Data & Account" tone="red" />
        <div className="p-5 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-red-50 text-red-600">
            <ShieldX className="size-6" />
          </span>
          <p className="mx-auto mt-4 max-w-md text-[12px] font-medium leading-5 text-slate-600">
            You are about to permanently delete the profile of <span className="font-black text-slate-900">{selectedUserName}</span>. All associated biometric data, credentials, and activity records will be queued for deletion.
          </p>
          <button className="mt-4 h-9 rounded-lg border border-red-300 px-4 text-[12px] font-black text-red-700 hover:bg-red-50" onClick={onPurge} type="button">
            Purge Data
          </button>
        </div>
      </article>
    </section>
  );
}

function Header({ icon, subtitle, title, tone = "orange" }: { icon: ReactNode; subtitle: string; title: string; tone?: "orange" | "red" }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
      <div className="flex items-center gap-3">
        <span className={tone === "red" ? "grid size-9 place-items-center rounded-lg bg-red-50 text-red-600" : "grid size-9 place-items-center rounded-lg bg-orange-50 text-orange-600"}>
          {icon}
        </span>
        <div>
          <h3 className="text-sm font-black text-slate-950">{title}</h3>
          <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{subtitle}</p>
        </div>
      </div>
      <X className="size-5 text-slate-400" />
    </div>
  );
}
