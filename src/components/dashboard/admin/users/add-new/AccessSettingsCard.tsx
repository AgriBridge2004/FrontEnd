"use client";

import { Copy, Shield } from "lucide-react";

import { CardTitle, inputClass } from "@/components/dashboard/admin/users/add-new/AccountIdentityCard";
import { cn } from "@/lib/cn";

type AccessSettingsCardProps = {
  apiAccessKeys: boolean;
  onApiAccessKeysChange: (value: boolean) => void;
  onCopyPassword: () => void;
  onTemporaryPasswordChange: (value: string) => void;
  onTwoFactorChange: (value: boolean) => void;
  temporaryPassword: string;
  twoFactorEnabled: boolean;
};

export function AccessSettingsCard({
  apiAccessKeys,
  onApiAccessKeysChange,
  onCopyPassword,
  onTemporaryPasswordChange,
  onTwoFactorChange,
  temporaryPassword,
  twoFactorEnabled,
}: AccessSettingsCardProps) {
  return (
    <section className="rounded-xl border-2 border-emerald-900 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
      <CardTitle icon={<Shield className="size-4" />} title="4. Access Settings" />
      <div className="mt-5 space-y-5">
        <ToggleRow checked={twoFactorEnabled} description="Mandatory for this role" label="Two-Factor Authentication" onChange={onTwoFactorChange} />
        <ToggleRow checked={apiAccessKeys} description="Generate initial keys on creation" label="Api Access Keys" onChange={onApiAccessKeysChange} />
        <div className="border-t border-slate-100 pt-5">
          <label className="text-sm font-black text-slate-700" htmlFor="temporary-password">
            Temporary Password
          </label>
          <div className="mt-2 flex gap-2">
            <input
              className={cn(inputClass(), "bg-slate-100")}
              id="temporary-password"
              onChange={(event) => onTemporaryPasswordChange(event.target.value)}
              value={temporaryPassword}
            />
            <button aria-label="Copy temporary password" className="grid size-11 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-emerald-50/40" onClick={onCopyPassword} type="button">
              <Copy className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToggleRow({ checked, description, label, onChange }: { checked: boolean; description: string; label: string; onChange: (value: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h3 className="text-sm font-black text-slate-900">{label}</h3>
        <p className="mt-1 text-sm font-medium text-slate-600">{description}</p>
      </div>
      <button
        aria-pressed={checked}
        className={cn("flex h-6 w-12 items-center rounded-full p-1 transition", checked ? "bg-emerald-200" : "bg-slate-200")}
        onClick={() => onChange(!checked)}
        type="button"
      >
        <span className={cn("size-4 rounded-full transition", checked ? "translate-x-6 bg-emerald-900" : "bg-slate-500")} />
      </button>
    </div>
  );
}
