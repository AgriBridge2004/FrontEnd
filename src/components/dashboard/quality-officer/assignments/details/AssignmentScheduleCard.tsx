import { CalendarDays, Clock3, Flag, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { AssignmentDetails } from "@/components/dashboard/quality-officer/assignments/details/assignment-details.types";
import { CardHeader } from "@/components/dashboard/quality-officer/assignments/details/AssignmentDealDetailsCard";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";

type AssignmentScheduleCardProps = {
  details: AssignmentDetails;
};

export function AssignmentScheduleCard({ details }: AssignmentScheduleCardProps) {
  return (
    <DashboardCard className="overflow-hidden">
      <CardHeader icon={CalendarDays} title="Required Schedule" />
      <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-5">
        <ScheduleItem icon={CalendarDays} label="Date" value={details.requiredDate} />
        <ScheduleItem icon={Clock3} label="Time" value={details.requiredTime} />
        <ScheduleItem icon={Timer} label="Expected Duration" value={details.expectedDuration} />
        <ScheduleItem icon={Flag} label="Priority" value={details.priority} />
        <ScheduleItem icon={Clock3} label="Deadline" value={details.deadlineLabel} tone="orange" />
      </div>
    </DashboardCard>
  );
}

function ScheduleItem({
  icon: Icon,
  label,
  tone = "default",
  value,
}: {
  icon: LucideIcon;
  label: string;
  tone?: "default" | "orange";
  value: string;
}) {
  return (
    <div className="rounded-xl border border-emerald-100 bg-white p-3">
      <Icon className={tone === "orange" ? "size-3.5 text-orange-600" : "size-3.5 text-emerald-800"} />
      <p className="mt-2 text-[10px] font-black uppercase tracking-wide text-slate-400">{label}</p>
      <p className={tone === "orange" ? "mt-1 text-sm font-black text-orange-600" : "mt-1 text-sm font-black text-slate-950"}>{value}</p>
    </div>
  );
}
