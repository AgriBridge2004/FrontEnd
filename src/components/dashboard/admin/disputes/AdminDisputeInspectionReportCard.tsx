import { FileText } from "lucide-react";

import type { AdminDispute } from "@/components/dashboard/admin/disputes/admin-disputes.types";

export function AdminDisputeInspectionReportCard({
  dispute,
  onViewFullReport,
  onViewReport,
}: {
  dispute: AdminDispute;
  onViewFullReport: () => void;
  onViewReport: () => void;
}) {
  const report = dispute.inspectionReport;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="flex items-center gap-2 text-[15px] font-black text-slate-950">
          <span className="grid size-8 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
            <FileText className="size-4" />
          </span>
          Related Inspection Report
        </h3>
        <button className="text-[11px] font-black text-emerald-700 hover:text-emerald-900" onClick={onViewFullReport} type="button">
          View Full Report
        </button>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-[110px_minmax(0,1fr)]">
        <div className="grid h-32 place-items-center rounded-lg bg-slate-50 text-slate-300">
          <FileText className="size-10" />
          <span className="text-[10px] font-black">{report.reportId}</span>
        </div>
        <div className="grid gap-2 text-[12px]">
          <Info label="Report ID" value={report.reportId} />
          <Info label="Inspector" value={report.inspector} />
          <Info label="Overall Grade" value={report.overallGrade} valueClassName="text-emerald-700" />
          <Info label="Inspection Date" value={report.inspectionDate} />
          <span className="w-fit rounded bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-700">COMPLETED</span>
          <button className="mt-1 h-9 rounded-lg border border-slate-200 bg-slate-50 text-[12px] font-black text-slate-700 hover:bg-emerald-50" onClick={onViewReport} type="button">
            View Report
          </button>
        </div>
      </div>
    </section>
  );
}

function Info({ label, value, valueClassName }: { label: string; value: string; valueClassName?: string }) {
  return (
    <div className="grid grid-cols-[90px_minmax(0,1fr)] gap-2">
      <span className="font-semibold text-slate-400">{label}</span>
      <span className={valueClassName ?? "font-black text-slate-800"}>{value}</span>
    </div>
  );
}
