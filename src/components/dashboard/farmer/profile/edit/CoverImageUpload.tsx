"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useRef } from "react";

type CoverImageUploadProps = {
  error?: string;
  previewUrl?: string;
  onFileSelect: (file: File) => void;
};

export function CoverImageUpload({ error, previewUrl, onFileSelect }: CoverImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className="text-sm font-black text-slate-700">Cover Image</label>
      <div className="mt-3 flex flex-col gap-4 rounded-2xl border border-dashed border-slate-300 bg-white p-4 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <span className="relative grid h-16 w-24 shrink-0 place-items-center overflow-hidden rounded-xl bg-emerald-50 text-emerald-800">
            {previewUrl ? (
              <Image alt="Selected cover preview" className="object-cover" fill sizes="96px" src={previewUrl} unoptimized />
            ) : (
              <ImageIcon className="size-7" />
            )}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-black text-slate-800">Upload a cover image</p>
            <p className="mt-1 text-xs font-medium text-slate-500">JPG, PNG or WebP. Max size 5MB.</p>
          </div>
        </div>
        <input
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              onFileSelect(file);
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
          Change Image
        </button>
      </div>
      {error ? <p className="mt-2 text-xs font-semibold text-rose-600">{error}</p> : null}
    </div>
  );
}
