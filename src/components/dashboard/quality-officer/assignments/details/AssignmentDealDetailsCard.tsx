import { Banknote, BriefcaseBusiness, Building2, CalendarDays, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { AssignmentDetails } from "@/components/dashboard/quality-officer/assignments/details/assignment-details.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";

type AssignmentDealDetailsCardProps = {
  details: AssignmentDetails;
};

export function AssignmentDealDetailsCard({ details }: AssignmentDealDetailsCardProps) {
  return (
    <DashboardCard className="overflow-hidden">
      <CardHeader icon={BriefcaseBusiness} title="Deal Details" />
      <div className="grid gap-x-6 gap-y-6 p-5 sm:grid-cols-2 lg:grid-cols-3">
        <DetailItem label="Product" value={details.product} />
        <DetailItem label="Category" value={details.category} />
        <DetailItem label="Offered Quantity" value={details.offeredQuantity} />
        <DetailItem icon={User} label="Farmer" value={details.farmer} />
        <DetailItem icon={Building2} label="Buyer" value={details.buyer} />
        <div />
        <DetailItem icon={CalendarDays} label="Harvest Date" value={details.harvestDate} />
        <DetailItem icon={CalendarDays} label="Deal Created" value={details.dealCreated} />
        <DetailItem icon={Banknote} label="Deal Value (Est.)" value={details.dealValue} />
      </div>
    </DashboardCard>
  );
}

export function CardHeader({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 p-4">
      <span className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-800">
        <Icon className="size-4" />
      </span>
      <h2 className="text-base font-black text-slate-950">{title}</h2>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon?: LucideIcon; label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-black text-slate-400">{label}</p>
      <p className="mt-2 flex items-center gap-2 text-sm font-black leading-5 text-slate-950">
        {Icon ? <Icon className="size-3.5 shrink-0 text-slate-400" /> : null}
        {value}
      </p>
    </div>
  );
}
