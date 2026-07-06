"use client";

import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

type AdminDisputeFinalDecisionModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function AdminDisputeFinalDecisionModal({ isOpen, onCancel, onConfirm }: AdminDisputeFinalDecisionModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCancel();
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/20 px-4" role="presentation" onMouseDown={onCancel}>
      <section
        aria-labelledby="confirm-final-decision-title"
        aria-modal="true"
        className="w-full max-w-[360px] rounded-2xl bg-white p-8 shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="flex items-start justify-between">
          <span className="grid size-12 place-items-center rounded-xl bg-orange-50 text-orange-600">
            <AlertTriangle className="size-6" />
          </span>
          <button
            aria-label="Close confirmation modal"
            className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700"
            onClick={onCancel}
            type="button"
          >
            <X className="size-5" />
          </button>
        </div>
        <h2 className="mt-7 text-[22px] font-black text-slate-950" id="confirm-final-decision-title">
          Confirm Final Decision
        </h2>
        <p className="mt-5 text-[15px] font-black text-red-600">This decision is final and binding.</p>
        <p className="mt-4 text-[15px] font-medium leading-7 text-slate-600">
          You will not be able to change this decision once confirmed. Are you sure you want to proceed?
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <button
            className="h-14 rounded-xl border border-slate-200 bg-slate-50 text-[14px] font-black text-slate-600 transition hover:bg-slate-100"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="h-14 rounded-xl bg-red-600 px-4 text-[14px] font-black text-white shadow-lg shadow-red-600/25 transition hover:bg-red-700"
            onClick={onConfirm}
            type="button"
          >
            Yes, Confirm Decision
          </button>
        </div>
      </section>
    </div>
  );
}
