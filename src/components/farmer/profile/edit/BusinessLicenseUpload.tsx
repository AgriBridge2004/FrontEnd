"use client";

import { BadgeCheck } from "lucide-react";
import { useRef } from "react";

type BusinessLicenseUploadProps = {
  file?: File;
  onFileSelect: (file: File) => void;
};

export function BusinessLicenseUpload({ file, onFileSelect }: BusinessLicenseUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className="text-sm font-black text-slate-700">Business License</label>
      <div className="mt-3 flex flex-col gap-4 rounded-2xl border border-dashed border-slate-300 bg-white p-4 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
            <BadgeCheck className="size-6" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-black text-slate-800">Upload business license</p>
            <p className="mt-1 text-xs font-medium text-slate-500">PDF, JPG or PNG. Max size 5MB.</p>
          </div>
        </div>
        <input
          accept=".pdf,image/*"
          className="hidden"
          onChange={(event) => {
            const selectedFile = event.target.files?.[0];
            if (selectedFile) {
              onFileSelect(selectedFile);
            }
            event.currentTarget.value = "";
          }}
          ref={inputRef}
          type="file"
        />
        <button
          className="h-9 shrink-0 rounded-lg border border-slate-200 bg-white px-4 text-xs font-black text-emerald-800 transition hover:border-emerald-200 hover:bg-emerald-50"
          onClick={() => inputRef.current?.click()}
          type="button"
        >
          Choose Files
        </button>
      </div>
      {file ? <p className="mt-2 truncate rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">{file.name}</p> : null}
    </div>
  );
}
