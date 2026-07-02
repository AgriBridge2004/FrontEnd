"use client";

import { ChevronDown, KeyRound, Shield } from "lucide-react";
import { useState } from "react";

import { SettingsCard, TextInput, Toggle } from "@/components/farmer/settings/SettingsControls";

type SecurityLoginSettingsProps = {
  twoFactorEnabled: boolean;
  onToast: (message: string) => void;
  onToggleTwoFactor: () => void;
};

export function SecurityLoginSettings({
  twoFactorEnabled,
  onToast,
  onToggleTwoFactor,
}: SecurityLoginSettingsProps) {
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: "", next: "", confirm: "" });

  function handlePasswordUpdate() {
    if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) {
      onToast("Please complete all password fields.");
      return;
    }
    if (passwordForm.next.length < 8) {
      onToast("New password must be at least 8 characters.");
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      onToast("New password and confirmation must match.");
      return;
    }
    setPasswordForm({ current: "", next: "", confirm: "" });
    onToast("Password updated locally.");
  }

  return (
    <SettingsCard id="security-login" title="Security & Login">
      <button
        className="flex w-full items-center justify-between rounded-xl border border-emerald-100 bg-white p-3 text-left font-black text-slate-900"
        onClick={() => setIsPasswordOpen((value) => !value)}
        type="button"
      >
        <span className="inline-flex items-center gap-2">
          <KeyRound className="size-5 text-slate-600" />
          Change Password
        </span>
        <ChevronDown className={`size-5 transition ${isPasswordOpen ? "rotate-180" : ""}`} />
      </button>
      {isPasswordOpen ? (
        <div className="mt-3 grid gap-3 rounded-xl border border-emerald-100 bg-emerald-50/20 p-3">
          <TextInput placeholder="Current Password" type="password" value={passwordForm.current} onChange={(event) => setPasswordForm({ ...passwordForm, current: event.target.value })} />
          <TextInput placeholder="New Password" type="password" value={passwordForm.next} onChange={(event) => setPasswordForm({ ...passwordForm, next: event.target.value })} />
          <TextInput placeholder="Confirm New Password" type="password" value={passwordForm.confirm} onChange={(event) => setPasswordForm({ ...passwordForm, confirm: event.target.value })} />
          <button className="h-9 w-fit rounded-lg bg-emerald-800 px-4 text-sm font-black text-white" onClick={handlePasswordUpdate} type="button">
            Update Password
          </button>
        </div>
      ) : null}

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
