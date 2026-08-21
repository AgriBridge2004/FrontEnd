"use client";

import { ArrowLeft, ArrowRight, Package, PlusCircle, Trash2 } from "lucide-react";

import type { BulkPricingTier, CreateListingPricing } from "@/components/dashboard/farmer/create-listing/create-listing.types";
import { cn } from "@/lib/cn";

export type PricingErrors = Partial<Record<"unitPrice" | "minimumOrder" | "totalQuantity", string>>;

type PricingQuantityStepProps = {
  pricing: CreateListingPricing;
  errors: PricingErrors;
  onBack: () => void;
  onChange: (pricing: CreateListingPricing) => void;
  onContinue: () => void;
};

export function PricingQuantityStep({ pricing, errors, onBack, onChange, onContinue }: PricingQuantityStepProps) {
  function updateTier(tierId: string, updates: Partial<BulkPricingTier>) {
    onChange({
      ...pricing,
      tiers: pricing.tiers.map((tier) => (tier.id === tierId ? { ...tier, ...updates } : tier)),
    });
  }

  function addTier() {
    const nextTierNumber = pricing.tiers.length + 1;
    onChange({
      ...pricing,
      tiers: [
        ...pricing.tiers,
        {
          id: `tier-${Date.now()}`,
          range: `${nextTierNumber * 5000}+`,
          unitPrice: pricing.unitPrice || "0.00",
        },
      ],
    });
  }

  function deleteTier(tierId: string) {
    onChange({
      ...pricing,
      tiers: pricing.tiers.filter((tier) => tier.id !== tierId),
    });
  }

  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-md sm:p-6">
      <h2 className="text-2xl font-black tracking-tight text-slate-950">Pricing & Quantity</h2>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-black uppercase tracking-[0.16em] text-slate-600">Unit Price (USD)</span>
          <span
            className={cn(
              "flex h-12 items-center rounded-lg border bg-white text-sm font-semibold text-slate-700 transition focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-100",
              errors.unitPrice ? "border-red-300" : "border-slate-300",
            )}
          >
            <span className="px-4 text-lg font-black text-slate-700">$</span>
            <input
              className="min-w-0 flex-1 bg-transparent text-lg font-black text-slate-600 outline-none placeholder:text-slate-400"
              inputMode="decimal"
              onChange={(event) => onChange({ ...pricing, unitPrice: event.target.value })}
              placeholder="0.00"
              value={pricing.unitPrice}
            />
            <span className="px-4 font-black text-slate-700">per kg</span>
          </span>
          <span className="text-xs italic text-slate-500">Average market price: $1.42 - $1.65 per kg</span>
          {errors.unitPrice ? <span className="text-xs font-semibold text-red-600">{errors.unitPrice}</span> : null}
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-black uppercase tracking-[0.16em] text-slate-600">Minimum Order (MOQ)</span>
          <span
            className={cn(
              "flex h-12 items-center rounded-lg border bg-white text-sm font-semibold text-slate-700 transition focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-100",
              errors.minimumOrder ? "border-red-300" : "border-slate-300",
            )}
          >
            <input
              className="min-w-0 flex-1 bg-transparent px-4 text-lg font-black text-slate-600 outline-none placeholder:text-slate-400"
              inputMode="numeric"
              onChange={(event) => onChange({ ...pricing, minimumOrder: event.target.value })}
              placeholder="500"
              value={pricing.minimumOrder}
            />
            <span className="px-4 font-black text-slate-700">kg</span>
          </span>
          <span className="text-xs italic text-slate-500">Common enterprise MOQ: 1,000 kg</span>
          {errors.minimumOrder ? <span className="text-xs font-semibold text-red-600">{errors.minimumOrder}</span> : null}
        </label>
      </div>

      <label className="mt-7 grid gap-2">
        <span className="text-sm font-black uppercase tracking-[0.16em] text-slate-600">Total Available Quantity</span>
        <span
          className={cn(
            "flex h-12 items-center rounded-lg border bg-white text-sm font-semibold text-slate-700 transition focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-100",
            errors.totalQuantity ? "border-red-300" : "border-slate-300",
          )}
        >
          <Package className="ml-4 size-5 text-slate-500" />
          <input
            className="min-w-0 flex-1 bg-transparent px-4 text-lg font-black text-slate-600 outline-none placeholder:text-slate-400"
            inputMode="numeric"
            onChange={(event) => onChange({ ...pricing, totalQuantity: event.target.value })}
            placeholder="10,000"
            value={pricing.totalQuantity}
          />
          <span className="px-4 font-black text-slate-700">kg</span>
        </span>
        {errors.totalQuantity ? <span className="text-xs font-semibold text-red-600">{errors.totalQuantity}</span> : null}
      </label>

      <div className="mt-8 border-t border-slate-200 pt-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-black text-slate-950">Bulk Pricing Tiers</h3>
            <p className="mt-1 text-sm font-medium text-slate-600">Offer discounts for large volume commitments.</p>
          </div>
          <button
            aria-pressed={pricing.bulkPricingEnabled}
            className={cn(
              "relative h-6 w-11 rounded-full transition",
              pricing.bulkPricingEnabled ? "bg-emerald-800" : "bg-slate-300",
            )}
            onClick={() => onChange({ ...pricing, bulkPricingEnabled: !pricing.bulkPricingEnabled })}
            type="button"
          >
            <span
              className={cn(
                "absolute top-1 size-4 rounded-full bg-white transition-all",
                pricing.bulkPricingEnabled ? "left-6" : "left-1",
              )}
            />
          </button>
        </div>

        {pricing.bulkPricingEnabled ? (
          <div className="mt-5 grid gap-3">
            {pricing.tiers.length > 0 ? (
              pricing.tiers.map((tier) => (
                <div
                  className="grid gap-3 rounded-xl border border-dashed border-emerald-200 bg-white p-4 transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50/30 sm:grid-cols-[1fr_auto_1fr_auto] sm:items-center"
                  key={tier.id}
                >
                  <label className="grid gap-1">
                    <span className="text-xs font-black uppercase tracking-wide text-slate-500">Range (kg)</span>
                    <input
                      className="min-w-0 bg-transparent text-base font-black text-slate-900 outline-none"
                      onChange={(event) => updateTier(tier.id, { range: event.target.value })}
                      value={tier.range}
                    />
                  </label>
                  <ArrowRight className="hidden size-5 text-slate-500 sm:block" />
                  <label className="grid gap-1">
                    <span className="text-xs font-black uppercase tracking-wide text-slate-500">Unit Price</span>
                    <span className="flex items-baseline gap-1">
                      <span className="text-sm font-black text-emerald-900">$</span>
                      <input
                        className="w-16 bg-transparent text-base font-black text-emerald-900 outline-none"
                        inputMode="decimal"
                        onChange={(event) => updateTier(tier.id, { unitPrice: event.target.value })}
                        value={tier.unitPrice}
                      />
                      <span className="text-sm font-semibold text-slate-600">/ kg</span>
                    </span>
                  </label>
                  <button
                    aria-label={`Delete ${tier.range} pricing tier`}
                    className="grid size-9 place-items-center rounded-lg text-red-600 transition hover:bg-red-50"
                    onClick={() => deleteTier(tier.id)}
                    type="button"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center text-sm font-semibold text-slate-500">
                No bulk tiers yet. Add a tier to offer volume discounts.
              </div>
            )}

            <button
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-emerald-300 text-sm font-black text-emerald-900 transition-all duration-200 hover:border-emerald-500 hover:bg-emerald-50"
              onClick={addTier}
              type="button"
            >
              <PlusCircle className="size-5" />
              Add New Tier
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-black text-slate-700 transition hover:bg-slate-50"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft className="size-5" />
          Back
        </button>
        <button
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-7 text-sm font-black text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-900"
          onClick={onContinue}
          type="button"
        >
          Continue to Next Step
          <ArrowRight className="size-5" />
        </button>
      </div>
    </section>
  );
}
