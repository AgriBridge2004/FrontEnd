import { MapPin } from "lucide-react";

import type { AssignmentDetails } from "@/components/dashboard/quality-officer/assignments/details/assignment-details.types";
import { AssignmentLocationMap } from "@/components/dashboard/quality-officer/assignments/details/AssignmentLocationMap";
import { CardHeader } from "@/components/dashboard/quality-officer/assignments/details/AssignmentDealDetailsCard";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";

type AssignmentLocationCardProps = {
  details: AssignmentDetails;
  onOpenMaps: () => void;
};

export function AssignmentLocationCard({ details, onOpenMaps }: AssignmentLocationCardProps) {
  return (
    <DashboardCard className="overflow-hidden">
      <CardHeader icon={MapPin} title="Inspection Location" />
      <div className="p-5">
        <h3 className="text-base font-black text-slate-950">{details.inspectionLocation.farmName}</h3>
        <p className="mt-1 text-[13px] font-medium text-slate-500">{details.inspectionLocation.address}</p>
        <p className="mt-1.5 text-[11px] font-medium italic text-slate-400">Near Al Hofuf - 2.3 km from Al Sa&apos;adah Road</p>
        <AssignmentLocationMap className="mt-4" farmName={details.inspectionLocation.farmName} onOpenMaps={onOpenMaps} />
      </div>
    </DashboardCard>
  );
}
