"use client";

import { Check, Lock, X } from "lucide-react";

import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";

type AssignmentDecisionBarProps = {
  onAccept: () => void;
  onReject: () => void;
};

export function AssignmentDecisionBar({ onAccept, onReject }: AssignmentDecisionBarProps) {
  // TODO: Connect accept assignment action to API.
  // TODO: Connect reject assignment action to API.
  return (
    <DashboardCard className="mt-5 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-base font-black text-slate-950">Assignment Decision</h2>
          <p className="mt-1 text-sm font-medium leading-5 text-slate-600">
            Accept this assignment if you are available to perform the inspection. Reject it if you cannot complete it within the required schedule.
          </p>
          <p className="mt-3 flex items-center gap-2 text-[11px] font-medium text-slate-500">
            <Lock className="size-3.5" />
            By accepting, you agree to perform the inspection as per platform guidelines.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:w-[520px]">
          <button
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-500 bg-white px-4 text-sm font-black text-red-600 transition hover:bg-red-50"
            onClick={onReject}
            type="button"
          >
            <X className="size-4" />
            Reject Assignment
          </button>
          <button
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 text-sm font-black text-white transition hover:bg-emerald-900"
            onClick={onAccept}
            type="button"
          >
            <Check className="size-4" />
            Accept Assignment
          </button>
        </div>
      </div>
    </DashboardCard>
  );
}
