"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { useRef } from "react";

type ProfileImageUploadProps = {
  error?: string;
  previewUrl?: string;
  onFileSelect: (file: File) => void;
};

export function ProfileImageUpload({ error, previewUrl, onFileSelect }: ProfileImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className="text-sm font-black text-slate-700">Profile Photo</label>
      <div className="mt-3 flex flex-col gap-4 rounded-2xl border border-dashed border-slate-300 bg-white p-4 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <span className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-full bg-emerald-50 text-emerald-800">
            {previewUrl ? (
              <Image alt="Selected profile preview" className="object-cover" fill sizes="80px" src={previewUrl} unoptimized />
            ) : (
              <Camera className="size-9" />
            )}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-black text-slate-800">Upload a profile photo</p>
            <p className="mt-1 text-xs font-medium text-slate-500">JPG, PNG or WebP. Max size 2MB.</p>
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
          Change Photo
        </button>
      </div>
      {error ? <p className="mt-2 text-xs font-semibold text-rose-600">{error}</p> : null}
    </div>
  );
}
