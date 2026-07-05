"use client";

import { Plus, X } from "lucide-react";

import { SettingsCard } from "@/components/dashboard/farmer/settings/SettingsControls";
import { CoverageAreaMap } from "@/components/dashboard/quality-officer/settings/CoverageAreaMap";

type QualityOfficerCoverageAreaSectionProps = {
  coverageAreas: string[];
  onAddRegion: () => void;
  onRemoveRegion: (region: string) => void;
  onSave: () => void;
};

export function QualityOfficerCoverageAreaSection({
  coverageAreas,
  onAddRegion,
  onRemoveRegion,
  onSave,
}: QualityOfficerCoverageAreaSectionProps) {
  return (
    <SettingsCard id="coverage-area" title="Coverage Area">
      <p className="-mt-2 text-sm font-medium text-slate-600">
        Your coverage area determines which inspection assignments you receive.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {coverageAreas.map((region) => (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-1.5 text-sm font-black text-emerald-800" key={region}>
            {region}
            <button aria-label={`Remove ${region}`} className="rounded-full transition hover:bg-emerald-200" onClick={() => onRemoveRegion(region)} type="button">
              <X className="size-3.5" />
            </button>
          </span>
        ))}
        <button
          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-800 px-3 py-1.5 text-sm font-black text-emerald-800 transition hover:bg-emerald-50"
          onClick={onAddRegion}
          type="button"
        >
          <Plus className="size-3.5" />
          Add Region
        </button>
      </div>

      <CoverageAreaMap className="mt-4" regions={coverageAreas} />

      <div className="mt-4 flex justify-end">
        <button className="h-9 rounded-lg bg-emerald-800 px-5 text-sm font-black text-white transition hover:bg-emerald-900" onClick={onSave} type="button">
          Save Changes
        </button>
      </div>
    </SettingsCard>
  );
}
