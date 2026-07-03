import { Search } from "lucide-react";

import type { DealDetail } from "@/components/dashboard/farmer/deals/details/deal-details.types";

type InspectionInfoCardProps = {
  inspection: DealDetail["inspection"];
};

export function InspectionInfoCard({ inspection }: InspectionInfoCardProps) {
  const rows = [
    ["Quality Officer (QO)", inspection.officer],
    ["Assigned On", inspection.assignedOn],
    ["Inspection Date", inspection.inspectionDate],
    ["Location", inspection.location],
  ];

  return (
    <section className="rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-md">
      <div className="border-b border-slate-100 px-5 py-5">
        <h2 className="inline-flex items-center gap-2 text-lg font-black text-slate-950">
          <Search className="size-5 text-emerald-600" />
          Inspection Info
        </h2>
      </div>
      <div className="grid gap-4 p-5 text-sm">
        {rows.map(([label, value]) => (
          <div className="grid grid-cols-[1fr_auto] gap-3" key={label}>
            <span className="font-medium text-slate-500">{label}</span>
            <span className="text-right font-black text-slate-950">{value}</span>
          </div>
        ))}
        <span className="mt-1 w-fit rounded-lg bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 ring-1 ring-emerald-100">
          {inspection.status}
        </span>
      </div>
    </section>
  );
}
