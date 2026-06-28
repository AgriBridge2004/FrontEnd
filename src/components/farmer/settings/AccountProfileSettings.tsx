"use client";

import { BadgeCheck, Pencil } from "lucide-react";

import { SettingsCard, TextArea, TextInput } from "@/components/farmer/settings/SettingsControls";
import type { FarmerSettings } from "@/components/farmer/settings/settings.mock";

type AccountProfileSettingsProps = {
  profile: FarmerSettings["profile"];
  onProfileChange: (profile: FarmerSettings["profile"]) => void;
  onToast: (message: string) => void;
};

export function AccountProfileSettings({ profile, onProfileChange, onToast }: AccountProfileSettingsProps) {
  return (
    <SettingsCard id="account-profile" title="Account & Profile">
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="relative grid size-16 place-items-center rounded-full border-2 border-emerald-100 bg-emerald-50 text-xl font-black text-emerald-800">
              AA
              <span className="absolute bottom-0 right-0 grid size-6 place-items-center rounded-full bg-emerald-800 text-white">
                <Pencil className="size-3" />
              </span>
            </span>
            <div>
              <h3 className="text-lg font-black text-slate-950">{profile.fullName}</h3>
              <p className="text-sm font-semibold text-slate-600">ID: {profile.id}</p>
            </div>
          </div>
          {profile.verified ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-black text-emerald-800">
              <BadgeCheck className="size-4" />
              Verified Farmer
            </span>
          ) : null}
        </div>

        <FieldRow label="Full Name" onSave={() => onToast("Profile updated successfully.")}>
          <TextInput
            onChange={(event) => onProfileChange({ ...profile, fullName: event.target.value })}
            value={profile.fullName}
          />
        </FieldRow>
        <FieldRow label="Farm Name" onSave={() => onToast("Profile updated successfully.")}>
          <TextInput
            onChange={(event) => onProfileChange({ ...profile, farmName: event.target.value })}
            value={profile.farmName}
          />
        </FieldRow>
        <div>
          <label className="text-sm font-black text-slate-900" htmlFor="bio">
            Bio / Business Description
          </label>
          <TextArea
            id="bio"
            onChange={(event) => onProfileChange({ ...profile, bio: event.target.value })}
            value={profile.bio}
          />
          <div className="mt-2 flex justify-end">
            <button
              className="h-9 rounded-lg bg-emerald-800 px-5 text-sm font-black text-white transition hover:bg-emerald-900"
              onClick={() => onToast("Profile updated successfully.")}
              type="button"
            >
              Update Bio
            </button>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}

function FieldRow({ children, label, onSave }: { children: React.ReactNode; label: string; onSave: () => void }) {
  return (
    <div>
      <label className="text-sm font-black text-slate-900">{label}</label>
      <div className="mt-1 grid gap-2 sm:grid-cols-[minmax(0,1fr)_72px]">
        {children}
        <button className="h-9 rounded-lg bg-emerald-800 text-sm font-black text-white transition hover:bg-emerald-900" onClick={onSave} type="button">
          Save
        </button>
      </div>
    </div>
  );
}
