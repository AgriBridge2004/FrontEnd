"use client";

import { Copy } from "lucide-react";

type ReviewsHeaderProps = {
  onCopyProfile: () => void;
};

export function ReviewsHeader({ onCopyProfile }: ReviewsHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-[22px] font-black tracking-tight text-slate-950 sm:text-2xl">Reviews & Ratings</h1>
        <p className="mt-1 max-w-3xl text-sm font-medium text-slate-600">
          Manage your reputation and track buyer feedback across all your listed agricultural products.
        </p>
      </div>
      <button
        className="inline-flex h-9 w-fit items-center gap-2 rounded-lg border border-emerald-100 bg-white px-3 text-sm font-black text-emerald-800 shadow-sm transition hover:bg-emerald-50"
        onClick={onCopyProfile}
        type="button"
      >
        <Copy className="size-4" />
        Copy Profile Link
      </button>
    </div>
  );
}
