import { FileText, MessageSquare } from "lucide-react";

export function BuyerMediationSupportCard() {
  return (
    <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
      <h2 className="text-xs font-black uppercase tracking-[0.16em] text-slate-700">Mediation Support</h2>
      <div className="mt-5 space-y-5">
        <div className="flex gap-3.5">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-800">
            <MessageSquare className="size-4" />
          </div>
          <div>
            <p className="text-sm font-black text-slate-950">Institutional Specialist</p>
            <p className="mt-1 text-xs font-medium text-slate-600">Average response time: 2 mins</p>
          </div>
        </div>
        <div className="flex gap-3.5">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-800">
            <FileText className="size-4" />
          </div>
          <div>
            <p className="text-sm font-black text-slate-950">Resolution Protocol</p>
            <p className="mt-1 text-xs font-medium text-slate-600">Step-by-step institutional compliance</p>
          </div>
        </div>
      </div>
    </article>
  );
}
