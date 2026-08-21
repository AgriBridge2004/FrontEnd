"use client";

import { ExternalLink, LocateFixed, MapPin, Minus, Plus } from "lucide-react";

import { cn } from "@/lib/cn";

type AssignmentLocationMapProps = {
  farmName: string;
  onOpenMaps: () => void;
  className?: string;
};

export function AssignmentLocationMap({ className, farmName, onOpenMaps }: AssignmentLocationMapProps) {
  // TODO: integrate Google Maps SDK here.
  // TODO: load API key from environment variable.
  // TODO: render assignment location marker from coordinates.
  return (
    <div className={cn("relative h-40 overflow-hidden rounded-xl border border-emerald-100 bg-slate-100", className)}>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(100,116,139,0.16)_1px,transparent_1px),linear-gradient(0deg,rgba(100,116,139,0.14)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_52%,rgba(22,101,52,0.13),transparent_14%),linear-gradient(135deg,rgba(241,245,249,0.92),rgba(226,232,240,0.8))]" />
      <div className="absolute left-[8%] top-[28%] h-px w-[120%] rotate-[4deg] bg-slate-300/70" />
      <div className="absolute left-[22%] top-[-5%] h-[120%] w-px rotate-[-7deg] bg-slate-300/70" />
      <div className="absolute left-[62%] top-[-8%] h-[120%] w-px rotate-[-3deg] bg-slate-300/60" />
      <div className="absolute left-[56%] top-[58%] h-4 w-5 rounded bg-slate-300/50" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[40%] text-emerald-800">
        <MapPin className="size-9 fill-emerald-800 text-emerald-800 drop-shadow" />
        <span className="mx-auto mt-1 block h-1.5 w-6 rounded-full bg-slate-400/30 blur-[1px]" />
      </div>

      <div className="absolute right-3 top-3 grid overflow-hidden rounded-lg bg-white shadow-sm">
        <button aria-label="Zoom in" className="grid size-7 place-items-center text-slate-600 transition hover:bg-emerald-50" type="button">
          <Plus className="size-3.5" />
        </button>
        <button aria-label="Zoom out" className="grid size-7 place-items-center border-t border-slate-100 text-slate-600 transition hover:bg-emerald-50" type="button">
          <Minus className="size-3.5" />
        </button>
      </div>

      <button
        aria-label={`Locate ${farmName}`}
        className="absolute right-3 top-[76px] grid size-7 place-items-center rounded-lg bg-white text-slate-600 shadow-sm transition hover:bg-emerald-50"
        type="button"
      >
        <LocateFixed className="size-3.5" />
      </button>

      <button
        className="absolute bottom-3 right-3 inline-flex h-8 items-center gap-2 rounded-lg bg-white px-3 text-xs font-black text-emerald-800 shadow-md transition hover:bg-emerald-50"
        onClick={onOpenMaps}
        type="button"
      >
        Open in Maps
        <ExternalLink className="size-3.5" />
      </button>
    </div>
  );
}
