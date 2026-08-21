import { ClipboardCheck, Leaf, Sprout, Utensils } from "lucide-react";

import type { QualityAssignmentRequest } from "@/components/dashboard/quality-officer/quality-officer-dashboard.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { cn } from "@/lib/cn";

type NewAssignmentRequestsProps = {
  assignments: QualityAssignmentRequest[];
  onAccept: (assignment: QualityAssignmentRequest) => void;
  onDecline: (assignment: QualityAssignmentRequest) => void;
  onViewAll: () => void;
};

const accentClasses = {
  green: "bg-emerald-50 text-emerald-700",
  orange: "bg-orange-50 text-orange-600",
  red: "bg-red-50 text-red-500",
};

const iconMap = {
  green: Sprout,
  orange: Leaf,
  red: Utensils,
};

export function NewAssignmentRequests({ assignments, onAccept, onDecline, onViewAll }: NewAssignmentRequestsProps) {
  return (
    <DashboardCard className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h2 className="text-base font-black text-slate-950">New Assignment Requests</h2>
        <button
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wide text-emerald-700 transition hover:text-emerald-900"
          onClick={onViewAll}
          type="button"
        >
          View All
          <ClipboardCheck className="size-4 text-slate-400" />
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {assignments.map((assignment) => {
          const Icon = iconMap[assignment.accent];

          return (
            <div className="grid gap-3 px-5 py-4 lg:grid-cols-[40px_1fr_auto] lg:items-center" key={assignment.id}>
              <span className={cn("grid size-10 place-items-center rounded-full", accentClasses[assignment.accent])}>
                <Icon className="size-[18px]" />
              </span>
              <div className="grid gap-3 sm:grid-cols-4">
                <AssignmentField label="Deal ID" value={assignment.dealId} />
                <AssignmentField label="Product" value={assignment.product} />
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wide text-slate-400">Location</p>
                  <p className="mt-0.5 text-sm font-black leading-5 text-slate-950">{assignment.location}</p>
                  <p className="mt-0.5 text-xs font-medium text-slate-400">{assignment.city}</p>
                </div>
                <AssignmentField label="Date" value={assignment.date} />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  className="inline-flex h-8 items-center justify-center rounded-lg border border-emerald-500 px-4 text-xs font-black text-emerald-700 transition hover:bg-emerald-50"
                  onClick={() => onAccept(assignment)}
                  type="button"
                >
                  Accept
                </button>
                <button
                  className="inline-flex h-8 items-center justify-center rounded-lg border border-red-200 px-4 text-xs font-black text-red-500 transition hover:bg-red-50"
                  onClick={() => onDecline(assignment)}
                  type="button"
                >
                  Decline
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
}

function AssignmentField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-black uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm font-black leading-5 text-slate-950">{value}</p>
    </div>
  );
}
