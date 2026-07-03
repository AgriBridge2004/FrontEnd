"use client";

import { ChevronRight, PlusCircle } from "lucide-react";

import { BuyerSettingsCard } from "@/components/dashboard/buyer/settings/BuyerSettingsControls";
import type { BuyerSettings } from "@/components/dashboard/buyer/settings/buyer-settings.types";

type BuyerPaymentMethodsSectionProps = {
  onAddPaymentMethod: () => void;
  onManagePaymentMethod: () => void;
  paymentMethod: BuyerSettings["paymentMethod"];
};

export function BuyerPaymentMethodsSection({ onAddPaymentMethod, onManagePaymentMethod, paymentMethod }: BuyerPaymentMethodsSectionProps) {
  return (
    <BuyerSettingsCard id="payment-methods" title="Payment Methods">
      <div className="rounded-xl bg-emerald-800 p-4 text-white">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-100">{paymentMethod.label}</p>
            <p className="mt-2 font-black">{paymentMethod.card}</p>
          </div>
          <button className="h-9 w-fit rounded-lg bg-white px-4 text-sm font-black text-slate-800 transition hover:bg-emerald-50" onClick={onManagePaymentMethod} type="button">
            Manage
          </button>
        </div>
      </div>

      <button
        className="mt-4 flex w-full items-center gap-3 rounded-xl border border-emerald-100 bg-white p-3 text-left transition hover:border-emerald-200 hover:bg-emerald-50/30"
        onClick={onAddPaymentMethod}
        type="button"
      >
        <PlusCircle className="size-5 shrink-0 text-slate-500" />
        <span className="min-w-0 flex-1">
          <span className="block font-black text-slate-900">Add Payment Method</span>
          <span className="block text-sm font-medium text-slate-600">Add a new card or other payment method</span>
        </span>
        <ChevronRight className="size-5 text-slate-400" />
      </button>
    </BuyerSettingsCard>
  );
}
