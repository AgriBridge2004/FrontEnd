"use client";

import { type ChangeEvent, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  Info,
  MapPin,
  Plus,
  Trash2,
  UploadCloud,
} from "lucide-react";

import { OriginMap } from "@/components/farmer/create-listing/shared/OriginMap";
import type {
  CreateListingLogistics,
  Incoterm,
  LogisticsCertification,
} from "@/components/farmer/create-listing/create-listing.types";
import { cn } from "@/lib/cn";

export type LogisticsErrors = Partial<Record<"originLocation" | "incoterm" | "packagingOptions" | "leadTimeDays", string>>;

const incotermOptions: Array<{ value: Incoterm; helper: string }> = [
  { value: "FOB", helper: "Free on Board: Seller pays for delivery to port." },
  { value: "CIF", helper: "Cost, Insurance & Freight: Seller covers cost, insurance, and freight to destination port." },
  { value: "EXW", helper: "Ex Works: Buyer handles pickup and shipping from seller location." },
  { value: "DDP", helper: "Delivered Duty Paid: Seller handles shipping, duties, and delivery to buyer." },
];

const packagingOptions = [
  { name: "Standard Pallets", description: "1200 x 800 mm ISO Standard" },
  { name: "Industrial Sacks", description: "Heavy-duty 25kg / 50kg poly-woven" },
  { name: "Wooden Crates", description: "Ventilated for fresh produce" },
];

type LogisticsFulfillmentStepProps = {
  errors: LogisticsErrors;
  logistics: CreateListingLogistics;
  onBack: () => void;
  onCertificateToast: (message: string) => void;
  onChange: (logistics: CreateListingLogistics) => void;
  onContinue: () => void;
};

export function LogisticsFulfillmentStep({
  errors,
  logistics,
  onBack,
  onCertificateToast,
  onChange,
  onContinue,
}: LogisticsFulfillmentStepProps) {
  const certificateInputRef = useRef<HTMLInputElement | null>(null);
  const selectedIncoterm = incotermOptions.find((option) => option.value === logistics.incoterm) ?? incotermOptions[0];

  function togglePackaging(optionName: string) {
    const nextOptions = logistics.packagingOptions.includes(optionName)
      ? logistics.packagingOptions.filter((option) => option !== optionName)
      : [...logistics.packagingOptions, optionName];

    onChange({ ...logistics, packagingOptions: nextOptions });
  }

  function addCertification(certification: LogisticsCertification) {
    if (logistics.certifications.some((item) => item.id === certification.id)) {
      return;
    }

    onChange({ ...logistics, certifications: [...logistics.certifications, certification] });
    onCertificateToast(`${certification.name} added locally.`);
  }

  function removeCertification(certificationId: string) {
    onChange({
      ...logistics,
      certifications: logistics.certifications.filter((certification) => certification.id !== certificationId),
    });
  }

  function handleCertificateUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    onChange({
      ...logistics,
      certifications: [
        ...logistics.certifications,
        {
          id: `uploaded-${Date.now()}`,
          name: "Uploaded Cert.",
          status: "uploaded",
          fileName: file.name,
        },
      ],
    });
    onCertificateToast("Certificate added locally.");
    event.target.value = "";
  }

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Logistics & Fulfillment</h2>
        <p className="mt-2 text-sm font-medium text-slate-600">
          Define how your agricultural products will reach the buyer safely and efficiently.
        </p>
      </div>

      <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-md sm:p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="grid gap-3">
            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">Origin Location</span>
              <span
                className={cn(
                  "flex h-11 items-center gap-3 rounded-lg border bg-white px-3 text-sm font-medium transition focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-100",
                  errors.originLocation ? "border-red-300" : "border-slate-300",
                )}
              >
                <MapPin className="size-5 shrink-0 text-slate-500" />
                <input
                  className="min-w-0 flex-1 bg-transparent outline-none"
                  onChange={(event) => onChange({ ...logistics, originLocation: event.target.value })}
                  value={logistics.originLocation}
                />
              </span>
              {errors.originLocation ? <span className="text-xs font-semibold text-red-600">{errors.originLocation}</span> : null}
            </label>
            <OriginMap />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700">Shipping Methods (Incoterms)</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {incotermOptions.map((option) => {
                const isSelected = logistics.incoterm === option.value;

                return (
                  <button
                    className={cn(
                      "inline-flex h-12 items-center justify-center gap-1.5 rounded-lg border text-sm font-black transition-all duration-200",
                      isSelected
                        ? "border-emerald-800 bg-emerald-300/70 text-emerald-950"
                        : "border-slate-300 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50/30",
                    )}
                    key={option.value}
                    onClick={() => onChange({ ...logistics, incoterm: option.value })}
                    type="button"
                  >
                    {option.value}
                    {isSelected ? <Check className="size-4" /> : null}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs italic text-slate-500">{selectedIncoterm.helper}</p>
            {errors.incoterm ? <span className="mt-2 block text-xs font-semibold text-red-600">{errors.incoterm}</span> : null}
          </div>
        </div>

        <div className="my-7 h-px bg-slate-200" />

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-semibold text-slate-700">Packaging Details</h3>
            <div className="mt-3 grid gap-3">
              {packagingOptions.map((option) => {
                const isSelected = logistics.packagingOptions.includes(option.name);

                return (
                  <button
                    className={cn(
                      "flex items-center gap-3 rounded-lg border p-3 text-left transition-all duration-200",
                      isSelected
                        ? "border-emerald-200 bg-emerald-50/50"
                        : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/30",
                    )}
                    key={option.name}
                    onClick={() => togglePackaging(option.name)}
                    type="button"
                  >
                    <span
                      className={cn(
                        "grid size-5 shrink-0 place-items-center rounded border",
                        isSelected ? "border-emerald-800 bg-emerald-800 text-white" : "border-slate-300",
                      )}
                    >
                      {isSelected ? <Check className="size-3.5" /> : null}
                    </span>
                    <span>
                      <span className="block font-black text-slate-950">{option.name}</span>
                      <span className="text-xs font-medium text-slate-600">{option.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.packagingOptions ? <span className="mt-2 block text-xs font-semibold text-red-600">{errors.packagingOptions}</span> : null}
          </div>

          <div>
            <h3 className="font-semibold text-slate-700">Lead Time (Days after order)</h3>
            <div className="mt-4 grid grid-cols-[minmax(0,1fr)_80px] items-center gap-4">
              <input
                aria-label="Lead time days"
                className="accent-emerald-800"
                max={30}
                min={1}
                onChange={(event) => onChange({ ...logistics, leadTimeDays: Number(event.target.value) })}
                type="range"
                value={logistics.leadTimeDays}
              />
              <div className="rounded-lg border border-emerald-800 bg-emerald-300/70 px-3 py-3 text-center font-black text-emerald-950">
                <span className="block text-lg">{logistics.leadTimeDays}</span>
                <span className="text-sm">Days</span>
              </div>
            </div>
            {errors.leadTimeDays ? <span className="mt-2 block text-xs font-semibold text-red-600">{errors.leadTimeDays}</span> : null}
            <div className="mt-5 rounded-lg border-l-4 border-emerald-800 bg-emerald-50/70 p-4">
              <p className="inline-flex items-center gap-2 font-black text-emerald-950">
                <Info className="size-4" />
                Pro Tip
              </p>
              <p className="mt-2 text-xs font-medium leading-5 text-slate-600">
                Shorter lead times (7-14 days) often receive 40% more inquiries from enterprise buyers.
              </p>
            </div>
          </div>
        </div>

        <div className="my-7 h-px bg-slate-200" />

        <div>
          <h3 className="font-semibold text-slate-700">Certifications & Compliance</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <button
              className="min-h-24 rounded-xl border border-dashed border-emerald-300 p-4 text-center transition-all duration-200 hover:border-emerald-500 hover:bg-emerald-50/40"
              onClick={() => certificateInputRef.current?.click()}
              type="button"
            >
              <UploadCloud className="mx-auto size-7 text-slate-500" />
              <span className="mt-2 block font-black text-slate-950">Upload Certificate</span>
              <span className="text-xs font-medium text-slate-500">PDF, JPG up to 10MB</span>
            </button>
            <input
              accept=".pdf,image/*"
              className="sr-only"
              onChange={handleCertificateUpload}
              ref={certificateInputRef}
              type="file"
            />

            {logistics.certifications.map((certification) => (
              <CertificationCard
                certification={certification}
                key={certification.id}
                onRemove={() => removeCertification(certification.id)}
              />
            ))}

            <AddCertificationCard label="Add HACCP" onClick={() => addCertification({ id: "haccp", name: "HACCP", status: "active" })} />
            <AddCertificationCard
              label="Add ISO 22000"
              onClick={() => addCertification({ id: "iso-22000", name: "ISO 22000", status: "active" })}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
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

type CertificationCardProps = {
  certification: LogisticsCertification;
  onRemove: () => void;
};

function CertificationCard({ certification, onRemove }: CertificationCardProps) {
  const isPending = certification.status === "pending";

  return (
    <div
      className={cn(
        "flex min-h-20 items-center justify-between gap-3 rounded-xl border p-4",
        isPending ? "border-slate-200 bg-slate-50 text-slate-500" : "border-emerald-800 bg-emerald-50/40 text-emerald-950",
      )}
    >
      <span className="inline-flex min-w-0 items-center gap-2">
        <BadgeCheck className={cn("size-5 shrink-0", isPending ? "text-slate-400" : "text-emerald-800")} />
        <span className="min-w-0">
          <span className="block truncate font-black">{certification.name}</span>
          {certification.fileName ? <span className="block truncate text-xs font-medium">{certification.fileName}</span> : null}
        </span>
      </span>
      {isPending ? (
        <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-black uppercase text-slate-500">Pending</span>
      ) : (
        <button
          aria-label={`Remove ${certification.name}`}
          className="grid size-8 shrink-0 place-items-center rounded-lg text-red-600 transition hover:bg-red-50"
          onClick={onRemove}
          type="button"
        >
          <Trash2 className="size-4" />
        </button>
      )}
    </div>
  );
}

type AddCertificationCardProps = {
  label: string;
  onClick: () => void;
};

function AddCertificationCard({ label, onClick }: AddCertificationCardProps) {
  return (
    <button
      className="inline-flex min-h-16 items-center justify-center gap-2 rounded-xl border border-dashed border-emerald-200 p-4 font-semibold text-slate-700 transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50/40 hover:text-emerald-900"
      onClick={onClick}
      type="button"
    >
      <Plus className="size-5" />
      {label}
    </button>
  );
}
