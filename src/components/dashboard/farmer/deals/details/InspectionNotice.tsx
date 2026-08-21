import { Calendar } from "lucide-react";

type InspectionNoticeProps = {
  inspectionDate: string;
};

export function InspectionNotice({ inspectionDate }: InspectionNoticeProps) {
  return (
    <section className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5 text-slate-900">
      <div className="inline-flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-lg bg-amber-100 text-amber-600">
          <Calendar className="size-4" />
        </span>
        <p className="text-sm font-black">Inspection scheduled for {inspectionDate.replace("Mar", "March")}</p>
      </div>
    </section>
  );
}
