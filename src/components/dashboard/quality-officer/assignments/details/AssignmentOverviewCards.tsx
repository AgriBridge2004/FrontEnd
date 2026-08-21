"use client";

import { CalendarDays, ClipboardCheck, Copy, ExternalLink, Info, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import type { AssignmentDetails } from "@/components/dashboard/quality-officer/assignments/details/assignment-details.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";

type AssignmentOverviewCardsProps = {
  details: AssignmentDetails;
};

export function AssignmentOverviewCards({ details }: AssignmentOverviewCardsProps) {
  return (
    <section className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_repeat(3,minmax(140px,0.55fr))]">
      <DashboardCard className="p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wide text-slate-400">Deal ID</p>
            <div className="mt-1.5 flex items-center gap-2">
              <h2 className="text-[22px] font-black leading-none text-slate-950">{details.dealId}</h2>
              <Copy className="size-3.5 text-slate-400" />
            </div>
          </div>
          <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-black uppercase text-orange-600">
            {details.status}
          </span>
        </div>

        <div className="mt-4 flex gap-2.5 rounded-lg bg-slate-50 p-3 text-[13px] font-medium leading-5 text-slate-600">
          <Info className="mt-0.5 size-3.5 shrink-0 text-emerald-800" />
          <p>Review all details below carefully. You can accept or reject this inspection assignment.</p>
        </div>
      </DashboardCard>

      <SummaryCard icon={MapPin} label="Inspection Location" value={details.inspectionLocation.farmName}>
        <p>{details.inspectionLocation.region}</p>
        <button className="mt-3 inline-flex items-center gap-1 text-xs font-black text-emerald-800" type="button">
          View on map
          <ExternalLink className="size-3" />
        </button>
      </SummaryCard>

      <SummaryCard icon={CalendarDays} label="Required Date & Time" value={details.requiredDate}>
        <p className="font-black text-slate-950">{details.requiredTime}</p>
        <span className="mt-3 inline-flex rounded-full bg-orange-50 px-2 py-1 text-[11px] font-black text-orange-600">
          {details.deadlineLabel}
        </span>
      </SummaryCard>

      <SummaryCard icon={ClipboardCheck} label="Assignment Type" value={details.assignmentType}>
        <p>{details.assignmentDescription}</p>
      </SummaryCard>
    </section>
  );
}

function SummaryCard({
  children,
  icon: Icon,
  label,
  value,
}: {
  children: ReactNode;
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <DashboardCard className="p-4 text-center">
      <span className="mx-auto grid size-10 place-items-center rounded-full bg-emerald-50 text-emerald-800">
        <Icon className="size-[18px]" />
      </span>
      <p className="mt-3 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <h3 className="mt-2 text-[15px] font-black leading-5 text-slate-950">{value}</h3>
      <div className="mt-1.5 text-[11px] font-medium leading-4 text-slate-500">{children}</div>
    </DashboardCard>
  );
}
