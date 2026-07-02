import { Check, Clock } from "lucide-react";

import type { DealDetail, DealStageStatus } from "@/components/farmer/deals/details/deal-details.types";
import { cn } from "@/lib/cn";

type ActivityTimelineProps = {
  timeline: DealDetail["timeline"];
};

export function ActivityTimeline({ timeline }: ActivityTimelineProps) {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-md">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="inline-flex items-center gap-2 text-base font-black text-slate-950">
          <Clock className="size-4 text-emerald-700" />
          Activity Timeline
        </h2>
      </div>
      <div className="p-5">
        {timeline.map((item, index) => {
          const hasNext = index < timeline.length - 1;
          const isProgressLine = item.status === "completed";

          return (
            <div className="relative grid gap-2 pb-5 pl-9 last:pb-0 md:grid-cols-[minmax(0,1fr)_155px]" key={item.id}>
              {hasNext ? (
                <span
                  className={cn(
                    "absolute left-[11px] top-6 h-[calc(100%-1.5rem)] w-px",
                    isProgressLine ? "bg-emerald-500" : "bg-slate-200",
                  )}
                />
              ) : null}
              <TimelineMarker status={item.status} />
              <div>
                <h3 className="text-[15px] font-black text-slate-950">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-slate-500">{item.description}</p>
              </div>
              <time className="text-xs font-medium text-slate-400 md:text-right">{item.time}</time>
            </div>
          );
        })}
      </div>
    </section>
  );
}

type TimelineMarkerProps = {
  status: DealStageStatus;
};

function TimelineMarker({ status }: TimelineMarkerProps) {
  const labelByStatus: Record<DealStageStatus, string> = {
    completed: "Completed",
    current: "Current step",
    pending: "Pending",
  };

  return (
    <span
      aria-label={labelByStatus[status]}
      className={cn(
        "absolute left-0 top-0 z-10 flex size-6 items-center justify-center rounded-full",
        status === "completed"
          ? "border border-emerald-500 bg-emerald-500 text-white"
          : status === "current"
            ? "border-2 border-emerald-500 bg-white"
            : "border-2 border-slate-300 bg-white",
      )}
      title={labelByStatus[status]}
    >
      {status === "completed" ? <Check className="size-3.5" strokeWidth={3} /> : null}
    </span>
  );
}
