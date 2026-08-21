"use client";

import { FileText, ShieldCheck, Trash2, UploadCloud } from "lucide-react";

import { CardTitle } from "@/components/dashboard/admin/users/add-new/AccountIdentityCard";
import type { AddNewUserValidationErrors } from "@/components/dashboard/admin/users/add-new/add-new-user.types";
import { cn } from "@/lib/cn";

type VerificationDocumentsCardProps = {
  documentName: string;
  errors: AddNewUserValidationErrors;
  onDocumentChange: (name: string) => void;
  onRemoveDocument: () => void;
};

export function VerificationDocumentsCard({ documentName, errors, onDocumentChange, onRemoveDocument }: VerificationDocumentsCardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md">
      <CardTitle icon={<ShieldCheck className="size-4" />} title="3. Verification Documents" />
      <div className="mt-5">
        <label
          className={cn(
            "flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-slate-50/40 px-4 py-6 text-center transition hover:bg-emerald-50/30",
            errors.documentName ? "border-red-300" : "border-emerald-800/30",
          )}
        >
          <UploadCloud className="size-6 text-slate-600" />
          <span className="mt-2 text-sm font-black text-slate-900">Click to upload or drag & drop</span>
          <span className="mt-1 text-sm font-medium leading-5 text-slate-600">Government ID, Operating License, or Tax Cert (PDF, JPG)</span>
          <input
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                // TODO: Connect verification document upload to storage/API.
                onDocumentChange(file.name);
              }
            }}
            type="file"
          />
        </label>
        {errors.documentName ? <p className="mt-1.5 text-[11px] font-bold text-red-600">{errors.documentName}</p> : null}

        {documentName ? (
          <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-3">
            <div className="flex items-center gap-3">
              <FileText className="size-5 text-red-600" />
              <div>
                <p className="text-sm font-black text-slate-900">{documentName}</p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500">2.4 MB - Uploaded</p>
              </div>
            </div>
            <button aria-label="Remove uploaded document" className="grid size-8 place-items-center rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600" onClick={onRemoveDocument} type="button">
              <Trash2 className="size-4" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
