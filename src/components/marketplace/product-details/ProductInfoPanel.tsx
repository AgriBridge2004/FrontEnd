"use client";

import type { ReactNode } from "react";
import { Archive, BadgeCheck, Calendar, FileText, Heart, Mail, MapPin, Star, Zap } from "lucide-react";

import type { MarketplaceProductDetails } from "@/components/marketplace/product-details/marketplace-product-details.types";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type ProductInfoPanelProps = {
  isSaved: boolean;
  isSaving?: boolean;
  isStartingMessage?: boolean;
  product: MarketplaceProductDetails;
  onRequestQuote: () => void;
  onSaveToggle: () => void;
  onStartMessage: () => void;
};

export function ProductInfoPanel({
  isSaved,
  isSaving = false,
  isStartingMessage = false,
  product,
  onRequestQuote,
  onSaveToggle,
  onStartMessage,
}: ProductInfoPanelProps) {
  return (
    <section className="rounded-3xl bg-emerald-50/55 p-6 shadow-sm ring-1 ring-emerald-100/70 lg:p-8">
      <h1 className="max-w-xl text-4xl font-black leading-[1.08] tracking-normal text-slate-950">
        {product.title}
      </h1>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
        <span className="inline-flex items-center gap-2">
          <BadgeCheck className="size-4 text-emerald-800" />
          {product.farmerName}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Star className="size-4 fill-amber-500 text-amber-500" />
          <span className="text-amber-600">{product.rating.toFixed(1)}</span>
          <span className="font-semibold text-slate-500">({product.reviewsCount} reviews)</span>
        </span>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-b border-emerald-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-end gap-2">
          {product.price !== undefined ? (
            <>
              <span className="text-5xl font-black leading-none text-emerald-800">{product.price}</span>
              <span className="pb-1.5 text-lg font-bold text-slate-600">
                {product.currency} / {product.unit}
              </span>
            </>
          ) : (
            <span className="text-2xl font-black leading-none text-emerald-800">Price not provided</span>
          )}
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-700 bg-white/60 px-4 py-2 text-xs font-black text-emerald-800">
          <Archive className="size-4" />
          {product.availableQuantity} <span className="font-bold text-emerald-700/70">Available</span>
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <InfoTile icon={<Calendar className="size-4" />} label="Harvest Date" value={product.harvestDate} />
        <InfoTile icon={<MapPin className="size-4" />} label="Location" value={product.location} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <BadgePill icon={<Star className="size-3.5" />} label={product.grade} />
        <BadgePill icon={<Zap className="size-3.5" />} label={product.listingType} />
      </div>

      <p className="mt-6 text-sm font-medium leading-7 text-slate-600">{product.description}</p>

      <div className="mt-6 grid gap-2.5 sm:grid-cols-[1fr_auto]">
        <button
          className={cn(buttonClasses("primary"), "h-10 rounded-full bg-emerald-800 px-4 text-xs font-black hover:bg-emerald-900")}
          onClick={onRequestQuote}
          type="button"
        >
          <FileText className="mr-2 size-3.5" />
          Request Quote
        </button>
        <button
          aria-pressed={isSaved}
          className={cn(buttonClasses("secondary"), "h-10 rounded-full px-5 text-xs font-black")}
          disabled={isSaving}
          onClick={onSaveToggle}
          type="button"
        >
          <Heart className={cn("mr-2 size-3.5", isSaved && "fill-rose-500 text-rose-500")} />
          {isSaved ? "Saved" : "Save Listing"}
        </button>
        <button
          className={cn(buttonClasses("secondary"), "h-10 rounded-full text-xs font-black sm:col-span-2")}
          disabled={isStartingMessage}
          onClick={onStartMessage}
          type="button"
        >
          <Mail className="mr-2 size-3.5" />
          Message Farmer
        </button>
      </div>
    </section>
  );
}

function InfoTile({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-emerald-800 shadow-sm">{icon}</span>
      <span>
        <span className="block text-[10px] font-black uppercase text-slate-500">{label}</span>
        <span className="mt-1 block text-sm font-black text-slate-900">{value}</span>
      </span>
    </div>
  );
}

function BadgePill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-700 bg-white/50 px-3.5 py-1.5 text-xs font-black text-emerald-800">
      {icon}
      {label}
    </span>
  );
}
