/* eslint-disable @next/next/no-img-element */
import { ImageIcon } from "lucide-react";

import type { CreateListingDraft } from "@/components/farmer/create-listing/create-listing.types";

type ListingPreviewCardProps = {
  draft: CreateListingDraft;
};

export function ListingPreviewCard({ draft }: ListingPreviewCardProps) {
  const imageSrc = draft.photos[0];

  return (
    <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-md">
      <div className="relative h-36 bg-slate-100">
        <span className="absolute left-3 top-3 z-10 rounded bg-emerald-100 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-900">
          Preview
        </span>
        {imageSrc ? (
          <img
            alt={`${draft.productName || "Uploaded product"} listing preview`}
            className="h-full w-full object-cover"
            src={imageSrc}
          />
        ) : (
          <div className="grid h-full place-items-center text-slate-300">
            <ImageIcon className="size-9" />
          </div>
        )}
      </div>
      <div className="grid gap-4 p-5">
        <div className="grid gap-2">
          <div className="h-4 w-3/4 rounded bg-slate-100" />
          <div className="h-3 w-1/2 rounded bg-slate-100" />
        </div>
        {draft.productName ? (
          <div>
            <p className="font-black text-slate-950">{draft.productName}</p>
            <p className="text-xs font-semibold text-slate-500">
              {draft.qualityGrade}
              {draft.harvestDate ? ` • Harvest ${draft.harvestDate}` : ""}
            </p>
          </div>
        ) : null}
        <div className="flex items-center justify-between">
          <div className="h-5 w-20 rounded bg-emerald-50" />
          <div className="h-4 w-12 rounded bg-slate-100" />
        </div>
      </div>
    </section>
  );
}
