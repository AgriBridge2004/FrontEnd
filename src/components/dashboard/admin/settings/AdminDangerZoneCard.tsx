"use client";

import { AlertTriangle, X } from "lucide-react";

import { SettingsSectionCard } from "@/components/dashboard/settings/SettingsControls";

type AdminDangerZoneCardProps = {
  isModalOpen: boolean;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
  onOpenDelete: () => void;
};

export function AdminDangerZoneCard({ isModalOpen, onCancelDelete, onConfirmDelete, onOpenDelete }: AdminDangerZoneCardProps) {
  return (
    <>
      <SettingsSectionCard danger id="delete-account">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle className="size-6" />
            </span>
            <div>
              <h2 className="font-black text-red-700">Danger Zone</h2>
              <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-slate-600">
                Permanently delete your AgriBridge admin account and all associated data. This action is irreversible.
              </p>
            </div>
          </div>
          <button className="h-10 rounded-lg bg-red-600 px-6 text-sm font-black text-white transition hover:bg-red-700" onClick={onOpenDelete} type="button">
            Delete Account
          </button>
        </div>
      </SettingsSectionCard>

      {isModalOpen ? (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-900/30 px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-slate-950">Delete Admin Account?</h3>
                <p className="mt-1 text-sm font-semibold text-slate-500">This action is permanent and cannot be undone.</p>
              </div>
              <button className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100" onClick={onCancelDelete} type="button">
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-black text-slate-600 hover:bg-slate-50" onClick={onCancelDelete} type="button">
                Cancel
              </button>
              <button className="h-10 rounded-lg bg-red-600 px-4 text-sm font-black text-white hover:bg-red-700" onClick={onConfirmDelete} type="button">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
