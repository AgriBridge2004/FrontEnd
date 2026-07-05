import { MapPin } from "lucide-react";

import { cn } from "@/lib/cn";

type CoverageAreaMapProps = {
  regions: string[];
  className?: string;
};

export function CoverageAreaMap({ className, regions }: CoverageAreaMapProps) {
  // TODO: Mount Google Maps here with an env-backed API key, map center, markers, and coverage polygons.
  return (
    <div
      className={cn(
        "relative h-40 overflow-hidden rounded-xl border border-emerald-100 bg-slate-50",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:34px_34px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_32%,rgba(16,185,129,0.28),transparent_16%),radial-gradient(circle_at_70%_62%,rgba(245,158,11,0.22),transparent_18%),linear-gradient(135deg,rgba(236,253,245,0.9),rgba(248,250,252,0.88))]" />
      <div className="absolute left-[18%] top-[30%] h-9 w-24 rotate-[-18deg] rounded-full border border-emerald-700/20 bg-emerald-200/35" />
      <div className="absolute right-[18%] top-[42%] h-10 w-28 rotate-[16deg] rounded-full border border-amber-700/20 bg-amber-100/55" />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="rounded-xl border border-emerald-100 bg-white/90 px-4 py-3 text-center shadow-sm backdrop-blur-sm">
          <div className="mx-auto grid size-8 place-items-center rounded-full bg-emerald-100 text-emerald-800">
            <MapPin className="size-4" />
          </div>
          <p className="mt-2 text-sm font-black text-slate-900">Map integration ready</p>
          <p className="mt-1 text-xs font-medium text-slate-600">
            Google Map will be connected here for {regions.length} selected region{regions.length === 1 ? "" : "s"}.
          </p>
        </div>
      </div>
    </div>
  );
}
