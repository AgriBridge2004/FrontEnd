"use client";

import { BadgeCheck, ShieldCheck } from "lucide-react";

type BuyerPaymentActionPanelProps = {
  onEscrowGovernance: () => void;
  onManageInspections: () => void;
};

export function BuyerPaymentActionPanel({ onEscrowGovernance, onManageInspections }: BuyerPaymentActionPanelProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-emerald-900 p-6 text-white shadow-lg">
      <ShieldCheck className="absolute bottom-6 right-8 size-40 text-white/5" />
      <div className="relative max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-50">
          <BadgeCheck className="size-3.5" />
          Quality Assurance Protocol
        </span>
        <h2 className="mt-5 text-2xl font-black leading-tight">Inspection-Confirmed Releases</h2>
        <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-emerald-50/80">
          Funds held in Escrow require your institutional sign-off on inspection reports before automated distribution to supply partners.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="h-10 rounded-lg bg-white px-6 text-sm font-black text-emerald-900 transition hover:bg-emerald-50" onClick={onManageInspections} type="button">
            Manage Inspections
          </button>
          <button
            className="h-10 rounded-lg border border-white/25 px-6 text-sm font-black text-white transition hover:bg-white/10"
            onClick={onEscrowGovernance}
            type="button"
          >
            Escrow Governance
          </button>
        </div>
      </div>
    </section>
  );
}
