import { Check } from "lucide-react";

import { dealStages } from "@/components/farmer/deals/details/deal-details.mock";
import { cn } from "@/lib/cn";

type DealProgressStepperProps = {
  currentStage: number;
};

export function DealProgressStepper({ currentStage }: DealProgressStepperProps) {
  return (
    <div className="mt-6 overflow-x-auto pb-2">
      <div className="grid min-w-[780px] grid-cols-6 items-start">
        {dealStages.map((label, index) => {
          const stageNumber = index + 1;
          const isCompleted = stageNumber < currentStage;
          const isCurrent = stageNumber === currentStage;

          return (
            <div className="relative flex flex-col items-center gap-2.5" key={label}>
              {index > 0 ? (
                <span
                  className={cn(
                    "absolute left-0 top-4 h-px w-1/2",
                    stageNumber <= currentStage ? "bg-emerald-500" : "bg-slate-200",
                  )}
                />
              ) : null}
              {index < dealStages.length - 1 ? (
                <span
                  className={cn(
                    "absolute right-0 top-4 h-px w-1/2",
                    stageNumber < currentStage ? "bg-emerald-500" : "bg-slate-200",
                  )}
                />
              ) : null}
              <span
                className={cn(
                  "relative z-10 grid size-8 place-items-center rounded-full text-xs font-black",
                  isCompleted
                    ? "bg-emerald-500 text-white"
                    : isCurrent
                      ? "border-2 border-emerald-500 bg-white text-emerald-700"
                      : "border-2 border-slate-200 bg-white text-slate-400",
                )}
              >
                {isCompleted ? <Check className="size-4" /> : stageNumber}
              </span>
              <span className={cn("text-center text-[11px] font-black", isCurrent ? "text-slate-950" : "text-slate-500")}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
