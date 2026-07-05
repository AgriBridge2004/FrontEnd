"use client";

import { Mail, Pencil, Phone } from "lucide-react";

import { SettingsCard } from "@/components/dashboard/farmer/settings/SettingsControls";
import type { QualityOfficerSettingsProfile } from "@/components/dashboard/quality-officer/settings/quality-officer-settings.types";

type QualityOfficerContactInfoSectionProps = {
  profile: QualityOfficerSettingsProfile;
  onToast: (message: string) => void;
};

export function QualityOfficerContactInfoSection({ onToast, profile }: QualityOfficerContactInfoSectionProps) {
  return (
    <SettingsCard id="contact-info" title="Contact Info">
      <div className="space-y-3">
        <ContactRow icon={Mail} label="Email Address" onEdit={() => onToast("Contact edit flow will be connected later.")} value={profile.email} />
        <ContactRow icon={Phone} label="Phone Number" onEdit={() => onToast("Contact edit flow will be connected later.")} value={profile.phone} />
      </div>
    </SettingsCard>
  );
}

function ContactRow({
  icon: Icon,
  label,
  onEdit,
  value,
}: {
  icon: typeof Mail;
  label: string;
  onEdit: () => void;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white p-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-black text-slate-900">{label}</p>
        <p className="truncate text-sm font-medium text-slate-600">{value}</p>
      </div>
      <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-black text-emerald-800">VERIFIED</span>
      <button className="grid size-8 place-items-center rounded-lg text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800" onClick={onEdit} type="button">
        <Pencil className="size-4" />
      </button>
    </div>
  );
}
