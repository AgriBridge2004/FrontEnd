"use client";

import { Building2, CheckCircle2, HandCoins, PieChart, ShieldCheck, type LucideIcon } from "lucide-react";

import type {
  AdminDispute,
  AdminDisputeResolutionType,
} from "@/components/dashboard/admin/disputes/admin-disputes.types";
import { cn } from "@/lib/cn";

type AdminDisputeResolutionPanelProps = {
  buyerPercent: number;
  dispute: AdminDispute;
  farmerPercent: number;
  justification: string;
  onBuyerPercentChange: (value: number) => void;
  onConfirm: () => void;
  onFarmerPercentChange: (value: number) => void;
  onJustificationChange: (value: string) => void;
  onResolutionTypeChange: (value: AdminDisputeResolutionType) => void;
  resolutionType: AdminDisputeResolutionType;
  validationMessage: string;
  hideHeader?: boolean;
};

const options = [
  {
    description: "Release 100% of the payment to the farmer.",
    icon: HandCoins,
    label: "Full Release to Farmer",
    value: "full-release-to-farmer",
  },
  {
    description: "Refund 100% of the payment to the buyer.",
    icon: Building2,
    label: "Full Refund to Buyer",
    value: "full-refund-to-buyer",
  },
  {
    description: "Split the payment between both parties.",
    icon: PieChart,
    label: "Partial Split",
    value: "partial-split",
  },
] satisfies Array<{
  description: string;
  icon: LucideIcon;
  label: string;
  value: AdminDisputeResolutionType;
}>;

export function AdminDisputeResolutionPanel({
  buyerPercent,
  dispute,
  farmerPercent,
  justification,
  onBuyerPercentChange,
  onConfirm,
  onFarmerPercentChange,
  onJustificationChange,
  onResolutionTypeChange,
  resolutionType,
  validationMessage,
  hideHeader = false,
}: AdminDisputeResolutionPanelProps) {
  const farmerAmount = Math.round((dispute.amountInDispute * farmerPercent) / 100);
  const buyerAmount = Math.round((dispute.amountInDispute * buyerPercent) / 100);

  return (
    <aside className={cn("bg-white", hideHeader ? "" : "rounded-lg border border-emerald-100 p-5 shadow-sm")}>
      {hideHeader ? null : (
        <>
          <h2 className="flex items-center gap-2 text-[16px] font-black text-slate-950">
            <ShieldCheck className="size-5" />
            Issue Resolution (Final Decision)
          </h2>
          <p className="mt-3 text-[12px] font-medium text-slate-500">Select Resolution Type</p>
        </>
      )}

      <div className="mt-5 grid gap-4">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = resolutionType === option.value;

          return (
            <button
              className={cn(
                "flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30",
                isSelected ? "border-emerald-500 bg-emerald-50/60 shadow-sm" : "border-slate-200 bg-white",
              )}
              key={option.value}
              onClick={() => onResolutionTypeChange(option.value)}
              type="button"
            >
              <span className={cn("grid size-4 shrink-0 place-items-center rounded-full border", isSelected ? "border-emerald-600 bg-emerald-600" : "border-slate-300")}>
                {isSelected ? <span className="size-1.5 rounded-full bg-white" /> : null}
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn("block text-[14px] font-black", isSelected ? "text-emerald-900" : "text-slate-950")}>{option.label}</span>
                <span className={cn("mt-1 block text-[11px] font-medium", isSelected ? "text-emerald-700" : "text-slate-500")}>{option.description}</span>
              </span>
              <Icon className={cn("size-7 shrink-0", isSelected ? "text-emerald-300" : "text-slate-200")} />
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-3 text-[12px]">
        <SplitRow
          amount={farmerAmount}
          label={`Farmer (${dispute.farmer}) %`}
          onChange={onFarmerPercentChange}
          percent={farmerPercent}
        />
        <SplitRow
          amount={buyerAmount}
          label={`Buyer (${dispute.buyer}) %`}
          onChange={onBuyerPercentChange}
          percent={buyerPercent}
        />
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[12px] font-black text-slate-950">
          <span>Total</span>
          <span>{farmerPercent + buyerPercent}%</span>
          <span className="text-emerald-700">{dispute.amountInDispute.toLocaleString()} SAR</span>
        </div>
      </div>

      <label className="mt-6 block">
        <span className="text-[12px] font-black text-slate-800">
          Resolution Justification <span className="font-medium text-red-500">(Required)</span>
        </span>
        <textarea
          className="mt-2 min-h-[128px] w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-[13px] font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-700/10"
          maxLength={1000}
          onChange={(event) => onJustificationChange(event.target.value)}
          placeholder="Provide a clear reason for your decision. This will be recorded in the official log."
          value={justification}
        />
      </label>
      <div className="mt-2 flex items-center justify-between text-[10px] font-medium text-slate-400">
        <span>Minimum 20 characters</span>
        <span>{justification.length}/1000</span>
      </div>
      {validationMessage ? <p className="mt-2 text-[12px] font-bold text-red-600">{validationMessage}</p> : null}

      <div className="mt-8 border-t border-slate-100 pt-6">
        <button
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 text-[14px] font-black text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800"
          onClick={onConfirm}
          type="button"
        >
          <CheckCircle2 className="size-4" />
          Confirm Final Decision
        </button>
        <p className="mt-4 text-center text-[11px] font-black text-slate-700">This decision is final and binding.</p>
        <p className="mt-1 text-center text-[10px] font-medium text-slate-400">Both parties will be notified immediately.</p>
      </div>
    </aside>
  );
}

function SplitRow({
  amount,
  label,
  onChange,
  percent,
}: {
  amount: number;
  label: string;
  onChange: (value: number) => void;
  percent: number;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_56px_90px] items-center gap-2">
      <span className="truncate font-medium text-slate-500">{label}</span>
      <input
        className="h-8 rounded-lg border border-slate-200 text-center text-[13px] font-bold text-slate-700 outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-700/10"
        max={100}
        min={0}
        onChange={(event) => onChange(Number(event.target.value))}
        type="number"
        value={percent}
      />
      <span className="text-right font-black text-slate-900">{amount.toLocaleString()} SAR</span>
    </div>
  );
}
