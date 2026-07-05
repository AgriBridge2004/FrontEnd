"use client";

import { Laptop, MoreVertical, Smartphone, Tablet, Thermometer } from "lucide-react";

import { SettingsCard } from "@/components/dashboard/farmer/settings/SettingsControls";
import type {
  QualityOfficerConnectedDevice,
  QualityOfficerSession,
} from "@/components/dashboard/quality-officer/settings/quality-officer-settings.types";

type QualityOfficerConnectedDevicesSectionProps = {
  activeSessions: QualityOfficerSession[];
  devices: QualityOfficerConnectedDevice[];
  onDeviceAction: () => void;
  onRevokeSession: () => void;
};

export function QualityOfficerConnectedDevicesSection({
  activeSessions,
  devices,
  onDeviceAction,
  onRevokeSession,
}: QualityOfficerConnectedDevicesSectionProps) {
  return (
    <SettingsCard id="connected-devices" title="Connected Devices">
      <div>
        <p className="text-xs font-black uppercase tracking-wide text-slate-600">Active Sessions</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {activeSessions.map((session) => {
            const Icon = session.current ? Laptop : Smartphone;

            return (
              <div
                className="rounded-xl border border-emerald-100 bg-white p-3 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md"
                key={session.id}
              >
                <div className="flex justify-between gap-3">
                  <Icon className="size-5 text-emerald-800" />
                  {session.current ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black uppercase text-emerald-800">Current</span>
                  ) : (
                    <button className="text-[11px] font-black text-red-500 transition hover:text-red-700" onClick={onRevokeSession} type="button">
                      Revoke
                    </button>
                  )}
                </div>
                <p className="mt-2 font-black text-slate-800">{session.device}</p>
                <p className="text-xs font-medium text-slate-500">
                  {session.location} • {session.app}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-black uppercase tracking-wide text-slate-600">Connected Devices</p>
        <div className="mt-3 grid gap-3">
        {devices.map((device) => {
          const Icon = device.icon === "tablet" ? Tablet : Thermometer;

          return (
            <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white p-3" key={device.id}>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-black text-slate-900">{device.name}</p>
                <p className="text-sm font-medium text-slate-500">{device.status}</p>
              </div>
              <button className="grid size-8 place-items-center rounded-lg text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800" onClick={onDeviceAction} type="button">
                <MoreVertical className="size-4" />
              </button>
            </div>
          );
        })}
        </div>
      </div>
    </SettingsCard>
  );
}
