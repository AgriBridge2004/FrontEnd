import { Check } from "lucide-react";

import type { StepperStep } from "@/components/dashboard/farmer/create-listing/create-listing.types";
import { cn } from "@/lib/cn";

const defaultSteps: StepperStep[] = [
  { id: 1, label: "Details" },
  { id: 2, label: "Pricing" },
  { id: 3, label: "Logistics" },
  { id: 4, label: "Review" },
];

type CreateListingStepperProps = {
  currentStep: number;
  steps?: StepperStep[];
};

export function CreateListingStepper({ currentStep, steps = defaultSteps }: CreateListingStepperProps) {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="grid min-w-[620px] grid-cols-4 items-start">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div
              aria-current={isActive ? "step" : undefined}
              aria-label={isCompleted ? `${step.label} completed` : `${step.label} step`}
              className="relative flex flex-col items-center gap-2"
              key={step.id}
            >
              {index > 0 ? (
                <span
                  className={cn(
                    "absolute left-0 top-5 h-px w-1/2 transition-all duration-200",
                    steps[index - 1].id < currentStep ? "bg-emerald-900" : "bg-slate-200",
                  )}
                />
              ) : null}
              {index < steps.length - 1 ? (
                <span
                  className={cn(
                    "absolute right-0 top-5 h-px w-1/2 transition-all duration-200",
                    isCompleted ? "bg-emerald-900" : "bg-slate-200",
                  )}
                />
              ) : null}
              <span
                className={cn(
                  "relative z-10 grid size-10 place-items-center rounded-full text-sm font-black transition-all duration-200",
                  isCompleted || isActive ? "bg-emerald-900 text-white shadow-sm" : "bg-slate-100 text-slate-600",
                )}
              >
                {isCompleted ? <Check className="size-5" /> : step.id}
              </span>
              <span
                className={cn(
                  "text-center text-sm font-black transition-colors duration-200",
                  isCompleted || isActive ? "text-emerald-900" : "text-slate-600",
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
