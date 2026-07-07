"use client";

import { ChevronRight, KeyRound, Smartphone, Volume2 } from "lucide-react";

import type { AdminSession } from "@/components/dashboard/admin/settings/admin-settings.types";
import { SettingsSectionCard, SettingsToggle } from "@/components/dashboard/settings/SettingsControls";

type AdminSecurityLoginCardProps = {
  isTwoFactorEnabled: boolean;
  onChangePassword: () => void;
  onRevokeSession: (sessionId: string) => void;
  onToggleTwoFactor: () => void;
  sessions: AdminSession[];
};

export function AdminSecurityLoginCard({
  isTwoFactorEnabled,
  onChangePassword,
  onRevokeSession,
  onToggleTwoFactor,
  sessions,
}: AdminSecurityLoginCardProps) {
  return (
    <SettingsSectionCard id="security-login" title="Security & Login">
      <button
        className="flex w-full items-center justify-between rounded-xl border border-emerald-100 bg-white p-3 text-left font-black text-slate-900"
        onClick={onChangePassword}
        type="button"
      >
        <span className="inline-flex items-center gap-2">
          <KeyRound className="size-5 text-slate-600" />
          Change Password
        </span>
        <ChevronRight className="size-5 text-slate-400" />
      </button>

      <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-emerald-100 bg-white p-3">
        <span className="inline-flex min-w-0 items-start gap-2">
          <Volume2 className="mt-0.5 size-5 shrink-0 text-slate-600" />
          <span>
            <span className="block font-black text-slate-900">Two-Factor Authentication (2FA)</span>
            <span className="text-sm font-medium text-slate-600">Secure your account with SMS or App codes</span>
          </span>
        </span>
        <SettingsToggle checked={isTwoFactorEnabled} onChange={onToggleTwoFactor} />
      </div>

      <div className="mt-5" id="active-sessions">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Active Sessions</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {sessions.map((session) => {
            const Icon = session.icon ?? Smartphone;

            return (
              <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white p-3" key={session.id}>
                <Icon className="size-5 shrink-0 text-emerald-700" />
                <div className="min-w-0 flex-1">
                  <p className="font-black text-slate-900">
                    {session.device}
                    {session.isCurrent ? (
                      <span className="ml-2 rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-black text-emerald-800">CURRENT</span>
                    ) : null}
                  </p>
                  <p className="truncate text-xs font-medium text-slate-500">{session.meta}</p>
                </div>
                {!session.isCurrent ? (
                  <button className="text-[10px] font-black uppercase text-red-600" onClick={() => onRevokeSession(session.id)} type="button">
                    Revoke
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </SettingsSectionCard>
  );
}
