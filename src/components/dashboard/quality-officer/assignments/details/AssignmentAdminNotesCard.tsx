import { SquarePen } from "lucide-react";

import { CardHeader } from "@/components/dashboard/quality-officer/assignments/details/AssignmentDealDetailsCard";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";

type AssignmentAdminNotesCardProps = {
  notes: string;
};

export function AssignmentAdminNotesCard({ notes }: AssignmentAdminNotesCardProps) {
  return (
    <DashboardCard className="overflow-hidden">
      <CardHeader icon={SquarePen} title="Admin Notes" />
      <div className="p-5">
        <div className="flex gap-3 rounded-xl bg-emerald-50/30 p-3.5 text-[13px] font-medium leading-5 text-slate-600">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-700" />
          <p>{notes}</p>
        </div>
      </div>
    </DashboardCard>
  );
}
