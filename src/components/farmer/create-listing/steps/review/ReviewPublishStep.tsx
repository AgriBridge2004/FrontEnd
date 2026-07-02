"use client";

/* eslint-disable @next/next/no-img-element */
import {
  BadgeCheck,
  CalendarDays,
  DollarSign,
  Eye,
  MapPin,
  Package,
  Rocket,
  Truck,
  Users,
  X,
  Zap,
} from "lucide-react";

import { uploadPhotoOptions } from "@/components/farmer/create-listing/create-listing.mock";
import type { CreateListingDraft } from "@/components/farmer/create-listing/create-listing.types";

type ReviewPublishStepProps = {
  draft: CreateListingDraft;
  isDiscardModalOpen: boolean;
  isPublishing: boolean;
  onBack: () => void;
  onCloseDiscardModal: () => void;
  onConfirmDiscard: () => void;
  onEditStep: (step: number) => void;
  onOpenDiscardModal: () => void;
  onPublish: () => void;
};

export function ReviewPublishStep({
  draft,
  isDiscardModalOpen,
  isPublishing,
  onBack,
  onCloseDiscardModal,
  onConfirmDiscard,
  onEditStep,
  onOpenDiscardModal,
  onPublish,
}: ReviewPublishStepProps) {
  return (
    <section className="lg:col-span-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Review Your Listing</h2>
          <p className="mt-2 max-w-lg text-sm font-medium leading-6 text-slate-600">
            Finalize your high-grade commodity listing for global buyers.
          </p>
        </div>
        <div className="inline-flex w-fit items-center gap-3 rounded-lg border border-emerald-300 bg-emerald-200/80 px-4 py-3 font-black text-emerald-900">
          <BadgeCheck className="size-5" />
          <span className="text-sm leading-5">Verified Listing Status</span>
        </div>
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-6">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_188px]">
            <ProductSummaryCard draft={draft} onEdit={() => onEditStep(1)} />
            <PricingReviewCard draft={draft} onEdit={() => onEditStep(2)} />
          </div>
          <LogisticsReviewCard draft={draft} onEdit={() => onEditStep(3)} />
        </div>

        <aside className="grid h-fit gap-5 lg:sticky lg:top-24 lg:self-start">
          <ListingVisibilityCard />
          <section className="rounded-2xl border border-emerald-100 bg-white p-5 text-sm italic leading-5 text-slate-600 shadow-sm">
            AgriBridge Pro ensures all listings meet ISO 22000 standards. By publishing, you confirm the quality and
            authenticity of the stated specifications.
          </section>
          <div className="grid gap-3">
            <button
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 text-sm font-black text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isPublishing}
              onClick={onPublish}
              type="button"
            >
              {isPublishing ? "Publishing..." : "Publish Listing"}
              <Rocket className="size-5" />
            </button>
            <button
              className="h-11 rounded-xl border border-slate-300 bg-white text-sm font-black text-slate-800 transition hover:bg-slate-50"
              onClick={onBack}
              type="button"
            >
              Back
            </button>
            <button
              className="h-10 text-sm font-semibold text-slate-600 transition hover:text-red-600"
              onClick={onOpenDiscardModal}
              type="button"
            >
              Discard Draft
            </button>
          </div>
        </aside>
      </div>

      {isDiscardModalOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-950">Discard Draft?</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                  This will remove your current listing draft. This action cannot be undone.
                </p>
              </div>
              <button
                aria-label="Close discard draft modal"
                className="grid size-8 shrink-0 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100"
                onClick={onCloseDiscardModal}
                type="button"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                className="h-10 rounded-lg border border-slate-300 px-4 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                onClick={onCloseDiscardModal}
                type="button"
              >
                Cancel
              </button>
              <button
                className="h-10 rounded-lg bg-red-600 px-4 text-sm font-black text-white transition hover:bg-red-700"
                onClick={onConfirmDiscard}
                type="button"
              >
                Discard Draft
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

type ReviewCardProps = {
  draft: CreateListingDraft;
  onEdit: () => void;
};

function ProductSummaryCard({ draft, onEdit }: ReviewCardProps) {
  const imageSrc = draft.photos.find(Boolean) || uploadPhotoOptions[0].placeholderImage;
  const certifications = draft.logistics.certifications.filter((certification) => certification.status !== "pending");

  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-md">
      <CardHeader icon={<Package className="size-5" />} title="Product Summary" actionLabel="Edit Step 1" onEdit={onEdit} />
      <div className="mt-5 grid gap-5 sm:grid-cols-[190px_minmax(0,1fr)]">
        <img alt="Product summary preview" className="h-48 w-full rounded-xl object-cover sm:h-full" src={imageSrc} />
        <div className="grid gap-4 sm:grid-cols-2">
          <SummaryField label="Product Name" value={draft.productName || "Not selected"} />
          <SummaryField label="Variety" value={draft.variety || "Not specified"} />
          <SummaryField label="Grade" value={draft.qualityGrade || "Not selected"} />
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">Certifications</p>
            {certifications.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {certifications.map((certification) => (
                  <span
                    className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-900"
                    key={certification.id}
                  >
                    <BadgeCheck className="size-3.5" />
                    {certification.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm font-black text-slate-900">None added</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingReviewCard({ draft, onEdit }: ReviewCardProps) {
  const hasBulkDiscount = draft.pricing.bulkPricingEnabled && draft.pricing.tiers.length > 0;

  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-md">
      <CardHeader icon={<DollarSign className="size-5" />} title="Pricing" actionLabel="Edit" onEdit={onEdit} />
      <div className="mt-5 grid gap-5">
        <div className="rounded-lg border border-emerald-100 bg-emerald-50/60 p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-900">Unit Price</p>
          <p className="mt-2 text-2xl font-black text-emerald-950">
            ${draft.pricing.unitPrice || "0.00"} <span className="text-sm font-semibold text-slate-600">/ kg</span>
          </p>
        </div>
        <div>
          <p className="text-center text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
            Minimum Order Quantity
          </p>
          <p className="mt-2 text-center text-xl font-black text-slate-950">{draft.pricing.minimumOrder || "0"} kg</p>
          <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-slate-100">
            <div className="h-full w-2/3 rounded-full bg-emerald-800" />
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-sm">
          <span className="font-medium text-slate-700">Bulk Discount</span>
          <span className="font-black text-emerald-800">{hasBulkDiscount ? "Available" : "Not enabled"}</span>
        </div>
      </div>
    </section>
  );
}

function LogisticsReviewCard({ draft, onEdit }: ReviewCardProps) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-md">
      <CardHeader icon={<Truck className="size-5" />} title="Logistics & Handling" actionLabel="Edit Step 3" onEdit={onEdit} />
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <LogisticsField icon={<MapPin className="size-5" />} label="Origin" value={draft.logistics.originLocation || "Not defined"} />
        <LogisticsField
          icon={<Package className="size-5" />}
          label="Packaging"
          value={draft.logistics.packagingOptions.length > 0 ? draft.logistics.packagingOptions.join(", ") : "Not defined"}
        />
        <LogisticsField icon={<Truck className="size-5" />} label="Incoterms" value={draft.logistics.incoterm || "Not defined"} />
        <LogisticsField
          icon={<CalendarDays className="size-5" />}
          label="Lead Time"
          value={draft.logistics.leadTimeDays ? `${draft.logistics.leadTimeDays} Days` : "Not defined"}
        />
      </div>
    </section>
  );
}

type CardHeaderProps = {
  actionLabel: string;
  icon: React.ReactNode;
  onEdit: () => void;
  title: string;
};

function CardHeader({ actionLabel, icon, onEdit, title }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className="inline-flex items-center gap-2 text-xl font-black text-slate-950">
        <span className="text-emerald-800">{icon}</span>
        {title}
      </h3>
      <button className="text-sm font-black text-emerald-900 transition hover:text-emerald-700" onClick={onEdit} type="button">
        {actionLabel}
      </button>
    </div>
  );
}

type SummaryFieldProps = {
  label: string;
  value: string;
};

function SummaryField({ label, value }: SummaryFieldProps) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 break-words text-lg font-black text-slate-950">{value}</p>
    </div>
  );
}

type LogisticsFieldProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function LogisticsField({ icon, label, value }: LogisticsFieldProps) {
  return (
    <div className="flex gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-slate-100 text-emerald-800">{icon}</span>
      <span>
        <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{label}</span>
        <span className="mt-1 block text-sm font-black text-slate-950">{value}</span>
      </span>
    </div>
  );
}

function ListingVisibilityCard() {
  const benefits = [
    { icon: <Users className="size-4" />, text: "High match for 42 active RFQs" },
    { icon: <Zap className="size-4" />, text: "Estimated 24h response rate" },
    { icon: <Eye className="size-4" />, text: "Priority placement active" },
  ];

  return (
    <section className="rounded-2xl border border-emerald-100 bg-slate-100/80 p-6 shadow-sm">
      <h3 className="text-xl font-black text-slate-950">Listing Visibility</h3>
      <div className="mt-9 text-center">
        <p className="text-5xl font-black text-emerald-900">1,248</p>
        <p className="mt-1 text-sm font-medium text-slate-600">Verified Matches</p>
      </div>
      <div className="my-7 h-px bg-slate-300" />
      <div className="grid gap-4">
        {benefits.map((benefit) => (
          <div className="flex items-center gap-3" key={benefit.text}>
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-200 text-emerald-900">
              {benefit.icon}
            </span>
            <span className="text-sm font-medium text-slate-700">{benefit.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
