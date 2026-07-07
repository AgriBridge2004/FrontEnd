"use client";

import { Pencil } from "lucide-react";
import type { ReactNode } from "react";

import { SettingsSectionCard, SettingsTextArea, SettingsTextInput } from "@/components/dashboard/settings/SettingsControls";

type AdminAccountProfileCardProps = {
  bio: string;
  displayName: string;
  fullName: string;
  initials: string;
  profileId: string;
  onBioChange: (value: string) => void;
  onDisplayNameChange: (value: string) => void;
  onFullNameChange: (value: string) => void;
  onSaveBio: () => void;
  onSaveProfile: () => void;
};

export function AdminAccountProfileCard({
  bio,
  displayName,
  fullName,
  initials,
  onBioChange,
  onDisplayNameChange,
  onFullNameChange,
  onSaveBio,
  onSaveProfile,
  profileId,
}: AdminAccountProfileCardProps) {
  return (
    <SettingsSectionCard id="account-profile" title="Account & Profile">
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="relative grid size-16 place-items-center rounded-full border-2 border-emerald-100 bg-emerald-50 text-xl font-black text-emerald-800">
              {initials}
              <span className="absolute bottom-0 right-0 grid size-6 place-items-center rounded-full bg-emerald-800 text-white">
                <Pencil className="size-3" />
              </span>
            </span>
            <div>
              <h3 className="text-lg font-black text-slate-950">{fullName}</h3>
              <p className="text-sm font-semibold text-slate-600">ID: {profileId}</p>
            </div>
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-black text-emerald-800">
            SUPER ADMIN
          </span>
        </div>

        <FieldRow label="Full Name" onSave={onSaveProfile}>
          <SettingsTextInput onChange={(event) => onFullNameChange(event.target.value)} value={fullName} />
        </FieldRow>
        <FieldRow label="Display Name" onSave={onSaveProfile}>
          <SettingsTextInput onChange={(event) => onDisplayNameChange(event.target.value)} value={displayName} />
        </FieldRow>
        <div>
          <label className="text-sm font-black text-slate-900" htmlFor="admin-bio">
            Platform Bio / Status
          </label>
          <SettingsTextArea className="mt-1" id="admin-bio" onChange={(event) => onBioChange(event.target.value)} value={bio} />
          <div className="mt-2 flex justify-end">
            <button
              className="h-9 rounded-lg bg-emerald-800 px-5 text-sm font-black text-white transition hover:bg-emerald-900"
              onClick={onSaveBio}
              type="button"
            >
              Update Bio
            </button>
          </div>
        </div>
      </div>
    </SettingsSectionCard>
  );
}

function FieldRow({ children, label, onSave }: { children: ReactNode; label: string; onSave: () => void }) {
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
