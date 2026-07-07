import { AlertCircle, CheckCircle2, Circle } from "lucide-react";

import type { AdminDealProgressStage } from "@/components/dashboard/admin/deals/admin-deals.types";
import { cn } from "@/lib/cn";

const stages: Array<{ label: string; value: Exclude<AdminDealProgressStage, "disputed"> }> = [
  { label: "Negotiation", value: "negotiation" },
  { label: "Confirmation", value: "confirmation" },
  { label: "Inspection", value: "inspection" },
  { label: "Payment", value: "payment" },
  { label: "Completed", value: "completed" },
];

type AdminDealProgressTrackProps = {
  stage: AdminDealProgressStage;
};

export function AdminDealProgressTrack({ stage }: AdminDealProgressTrackProps) {
  const activeIndex = stages.findIndex((item) => item.value === stage);

  return (
    <div className="flex w-full items-center py-2" aria-label={`Deal progress: ${stage}`}>
      {stages.map((item, index) => {
        const isCompleted = index < activeIndex || stage === "completed";
        const isCurrent = index === activeIndex && stage !== "completed";
        const isProblem = stage === "payment" && index === activeIndex;
        const Icon = isProblem ? AlertCircle : isCompleted || isCurrent ? CheckCircle2 : Circle;

        return (
          <div className="flex min-w-0 flex-1 items-center last:flex-none" key={item.value}>
            <span
              className={cn(
                "grid size-4 shrink-0 place-items-center rounded-full",
                isProblem
                  ? "text-red-500"
                  : isCompleted || isCurrent
                    ? "text-emerald-600"
                    : "text-slate-300",
              )}
              title={item.label}
            >
              <Icon className={cn("size-4", isCompleted || isCurrent ? "fill-white" : "")} />
            </span>
            {index < stages.length - 1 ? (
              <span
                className={cn(
                  "mx-1.5 h-px min-w-8 flex-1",
                  isProblem ? "bg-red-300" : index < activeIndex ? "bg-emerald-500" : "bg-slate-200",
                )}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
