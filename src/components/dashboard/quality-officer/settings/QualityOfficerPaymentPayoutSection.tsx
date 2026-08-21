"use client";

import { Landmark, RefreshCw } from "lucide-react";

import { SettingsCard, Toggle } from "@/components/dashboard/farmer/settings/SettingsControls";

type QualityOfficerPaymentPayoutSectionProps = {
  automaticWithdrawal: boolean;
  onManagePayout: () => void;
  onToggleAutomaticWithdrawal: () => void;
  payoutMethod: string;
};

export function QualityOfficerPaymentPayoutSection({
  automaticWithdrawal,
  onManagePayout,
  onToggleAutomaticWithdrawal,
  payoutMethod,
}: QualityOfficerPaymentPayoutSectionProps) {
  return (
    <SettingsCard id="payment-payout" title="Payment & Payout">
      <div className="flex flex-col gap-4 rounded-xl bg-emerald-900 p-4 text-white sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-white/10">
            <Landmark className="size-5" />
          </span>
          <div>
            <p className="text-xs font-black uppercase text-emerald-100">Primary Payment Method</p>
            <p className="mt-1 font-black">{payoutMethod}</p>
          </div>
        </div>
        <button className="h-9 w-fit rounded-lg bg-white px-4 text-sm font-black text-emerald-900" onClick={onManagePayout} type="button">
          Manage
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-emerald-100 bg-white p-3">
        <span className="inline-flex items-start gap-2">
          <RefreshCw className="mt-0.5 size-5 text-emerald-800" />
          <span>
            <span className="block font-black text-slate-900">Automatic Withdrawal</span>
            <span className="text-sm font-medium text-slate-600">Transfer earnings every Thursday at 00:00</span>
          </span>
        </span>
        <Toggle checked={automaticWithdrawal} onChange={onToggleAutomaticWithdrawal} />
      </div>
    </SettingsCard>
  );
}
