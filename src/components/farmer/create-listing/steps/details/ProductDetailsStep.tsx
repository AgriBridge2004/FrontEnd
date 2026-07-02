"use client";

import { ArrowRight, Save } from "lucide-react";

import { ProductPhotoUpload } from "@/components/farmer/create-listing/steps/details/ProductPhotoUpload";
import { qualityGradeOptions, uploadPhotoOptions } from "@/components/farmer/create-listing/create-listing.mock";
import type { CreateListingDraft } from "@/components/farmer/create-listing/create-listing.types";
import { cn } from "@/lib/cn";

type ProductDetailsErrors = Partial<Record<"productName" | "qualityGrade" | "harvestDate", string>>;

type ProductDetailsStepProps = {
  draft: CreateListingDraft;
  errors: ProductDetailsErrors;
  onChange: (draft: CreateListingDraft) => void;
  onContinue: () => void;
  onPhotosChange: (previewUrls: string[], files: Array<File | undefined>) => void;
  onSaveDraft: () => void;
};

export function ProductDetailsStep({
  draft,
  errors,
  onChange,
  onContinue,
  onPhotosChange,
  onSaveDraft,
}: ProductDetailsStepProps) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-md sm:p-6">
      <div>
        <h2 className="text-xl font-black text-slate-950">Product Details</h2>
        <p className="mt-1 text-sm font-medium text-slate-600">Tell us what you are bringing to the marketplace today.</p>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-wide text-slate-600">Product Name</span>
          <input
            className={cn(
              "h-11 rounded-lg border bg-white px-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100",
              errors.productName ? "border-red-300" : "border-slate-300",
            )}
            onChange={(event) => onChange({ ...draft, productName: event.target.value })}
            placeholder="Enter product name"
            value={draft.productName}
          />
          {errors.productName ? <span className="text-xs font-semibold text-red-600">{errors.productName}</span> : null}
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-wide text-slate-600">Variety</span>
          <input
            className="h-11 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            onChange={(event) => onChange({ ...draft, variety: event.target.value })}
            placeholder="e.g. Heirloom, San Marzano"
            value={draft.variety}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-wide text-slate-600">Quality Grade</span>
          <select
            className={cn(
              "h-11 rounded-lg border bg-white px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100",
              errors.qualityGrade ? "border-red-300" : "border-slate-300",
            )}
            onChange={(event) => onChange({ ...draft, qualityGrade: event.target.value })}
            value={draft.qualityGrade}
          >
            {qualityGradeOptions.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
          {errors.qualityGrade ? <span className="text-xs font-semibold text-red-600">{errors.qualityGrade}</span> : null}
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-wide text-slate-600">Harvest Date</span>
          <input
            className={cn(
              "h-11 rounded-lg border bg-white px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100",
              errors.harvestDate ? "border-red-300" : "border-slate-300",
            )}
            onChange={(event) => onChange({ ...draft, harvestDate: event.target.value })}
            type="date"
            value={draft.harvestDate}
          />
          {errors.harvestDate ? <span className="text-xs font-semibold text-red-600">{errors.harvestDate}</span> : null}
        </label>
      </div>

      <div className="mt-7 grid gap-3">
        <span className="text-xs font-black uppercase tracking-wide text-slate-600">Product Photos (Upload up to 10)</span>
        <ProductPhotoUpload photos={uploadPhotoOptions} uploadedPhotoUrls={draft.photos} onPhotosChange={onPhotosChange} />
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-emerald-800 px-5 text-sm font-black text-emerald-900 transition hover:bg-emerald-50"
          onClick={onSaveDraft}
          type="button"
        >
          <Save className="size-4" />
          Save Draft
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
