"use client";

import { AlertTriangle } from "lucide-react";

import { SettingsCard } from "@/components/dashboard/farmer/settings/SettingsControls";

type QualityOfficerDangerZoneSectionProps = {
  onDeleteAccount: () => void;
};

export function QualityOfficerDangerZoneSection({ onDeleteAccount }: QualityOfficerDangerZoneSectionProps) {
  return (
    <SettingsCard danger id="delete-account">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="size-6" />
          </span>
          <div>
            <h2 className="font-black text-red-700">Danger Zone</h2>
            <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-slate-600">
              Permanently delete your AgriBridge Quality Officer account and all associated inspection reports. This action is irreversible.
            </p>
          </div>
        </div>
        <button className="h-10 rounded-lg bg-red-600 px-6 text-sm font-black text-white transition hover:bg-red-700" onClick={onDeleteAccount} type="button">
          Delete Account
        </button>
      </div>
    </SettingsCard>
  );
}
