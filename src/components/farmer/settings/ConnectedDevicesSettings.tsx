"use client";

import { Laptop, Smartphone } from "lucide-react";

import { SettingsCard } from "@/components/farmer/settings/SettingsControls";
import type { FarmerSettings } from "@/components/farmer/settings/settings.mock";

type ConnectedDevicesSettingsProps = {
  sessions: FarmerSettings["activeSessions"];
  onRevokeSession: (sessionId: string) => void;
};

export function ConnectedDevicesSettings({ sessions, onRevokeSession }: ConnectedDevicesSettingsProps) {
  return (
    <SettingsCard id="connected-devices" title="Connected Devices">
      <div className="grid gap-3 sm:grid-cols-2">
        {sessions.map((session) => (
          <div
            className="rounded-xl border border-emerald-100 bg-white p-3 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md"
            key={session.id}
          >
            <div className="flex justify-between gap-3">
              {session.current ? (
                <Laptop className="size-5 text-emerald-800" />
              ) : (
                <Smartphone className="size-5 text-slate-500" />
              )}
              {session.current ? (
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-black text-emerald-800">
                  Current
                </span>
              ) : (
                <button
                  className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-red-500 transition hover:bg-red-50"
                  onClick={() => onRevokeSession(session.id)}
                  type="button"
                >
                  Revoke
                </button>
              )}
            </div>
            <p className="mt-2 font-black text-slate-800">{session.device}</p>
            <p className="text-xs font-medium text-slate-500">
              {session.location}
              {session.browser ? ` • ${session.browser}` : ` • ${session.lastActive}`}
            </p>
          </div>
        ))}
      </div>
    </SettingsCard>
  );
}
