import { Check, Clock } from "lucide-react";

import type { DigitalContract, ContractTimelineStatus } from "@/components/dashboard/farmer/deals/contract/contract.types";
import { cn } from "@/lib/cn";

type ContractTimelineCardProps = {
  timeline: DigitalContract["timeline"];
};

export function ContractTimelineCard({ timeline }: ContractTimelineCardProps) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-md">
      <h2 className="inline-flex items-center gap-2 text-lg font-black text-slate-950">
        <Clock className="size-5 text-emerald-700" />
        Contract Timeline
      </h2>
      <div className="mt-6">
        {timeline.map((item, index) => (
          <div className="relative pb-6 pl-9 last:pb-0" key={item.id}>
            {index < timeline.length - 1 ? (
              <span className="absolute left-[9px] top-5 h-[calc(100%-1.25rem)] w-px bg-slate-200" />
            ) : null}
            <TimelineDot status={item.status} />
            <p className={item.status === "current" ? "font-black text-emerald-800" : "font-black text-slate-950"}>
              {item.title}
            </p>
            <p className="mt-1 text-xs font-medium text-slate-500">{item.date || item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TimelineDot({ status }: { status: ContractTimelineStatus }) {
  return (
    <span
      className={cn(
        "absolute left-0 top-0 z-10 grid size-5 place-items-center rounded-full",
        status === "completed"
          ? "bg-emerald-700 text-white"
          : status === "current"
            ? "border-2 border-emerald-500 bg-emerald-100"
            : "border-2 border-slate-300 bg-white",
      )}
    >
      {status === "completed" ? <Check className="size-3" strokeWidth={3} /> : null}
    </span>
  );
}
