"use client";

import { ChevronRight, KeyRound, Shield } from "lucide-react";

import { SettingsCard, Toggle } from "@/components/dashboard/farmer/settings/SettingsControls";

type QualityOfficerSecurityLoginSectionProps = {
  twoFactorEnabled: boolean;
  onChangePassword: () => void;
  onToggleTwoFactor: () => void;
};

export function QualityOfficerSecurityLoginSection({
  onChangePassword,
  onToggleTwoFactor,
  twoFactorEnabled,
}: QualityOfficerSecurityLoginSectionProps) {
  return (
    <SettingsCard id="security-login" title="Security & Login">
      <button
        className="flex w-full items-center justify-between rounded-xl border border-emerald-100 bg-white p-3 text-left font-black text-slate-900 transition hover:bg-emerald-50/30"
        onClick={onChangePassword}
        type="button"
      >
        <span className="inline-flex items-center gap-2">
          <KeyRound className="size-5 text-slate-600" />
          Change Password
        </span>
        <ChevronRight className="size-5 text-slate-500" />
      </button>

      <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-emerald-100 bg-white p-3">
        <span className="inline-flex min-w-0 items-start gap-2">
          <Shield className="mt-0.5 size-5 shrink-0 text-slate-600" />
          <span>
            <span className="block font-black text-slate-900">Two-Factor Authentication (2FA)</span>
            <span className="text-sm font-medium text-slate-600">Secure your account with SMS or App codes</span>
          </span>
        </span>
        <Toggle checked={twoFactorEnabled} onChange={onToggleTwoFactor} />
      </div>
    </SettingsCard>
  );
}
