"use client";

import { AlertTriangle } from "lucide-react";
import { useState } from "react";

import { SettingsCard, TextInput } from "@/components/dashboard/farmer/settings/SettingsControls";

type DangerZoneSettingsProps = {
  isDeleteModalOpen: boolean;
  onCloseDeleteModal: () => void;
  onConfirmDelete: () => void;
  onOpenDeleteModal: () => void;
};

export function DangerZoneSettings({
  isDeleteModalOpen,
  onCloseDeleteModal,
  onConfirmDelete,
  onOpenDeleteModal,
}: DangerZoneSettingsProps) {
  return (
    <>
      <SettingsCard danger id="delete-account">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle className="size-6" />
            </span>
            <div>
              <h2 className="font-black text-red-700">Danger Zone</h2>
              <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-slate-600">
                Permanently delete your AgriBridge B2B account and all associated farm data. This action is irreversible.
              </p>
            </div>
          </div>
          <button className="h-10 rounded-lg bg-red-600 px-6 text-sm font-black text-white transition hover:bg-red-700" onClick={onOpenDeleteModal} type="button">
            Delete Account
          </button>
        </div>
      </SettingsCard>

      {isDeleteModalOpen ? <DeleteAccountModal onClose={onCloseDeleteModal} onConfirm={onConfirmDelete} /> : null}
    </>
  );
}

function DeleteAccountModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  const [confirmation, setConfirmation] = useState("");
  const canDelete = confirmation === "DELETE";

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-black text-slate-950">Delete Account?</h2>
        <p className="mt-2 text-sm font-medium leading-6 text-slate-600">This action is irreversible. Type DELETE to confirm.</p>
        <TextInput className="mt-5 w-full" onChange={(event) => setConfirmation(event.target.value)} placeholder="Type DELETE" value={confirmation} />
        <div className="mt-5 flex justify-end gap-3">
          <button className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="h-10 rounded-lg bg-red-600 px-4 text-sm font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            disabled={!canDelete}
            onClick={onConfirm}
            type="button"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
