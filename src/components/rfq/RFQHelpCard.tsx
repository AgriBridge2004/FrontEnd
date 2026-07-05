import { CircleHelp } from "lucide-react";

import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type RFQHelpCardProps = {
  onContactSupport: () => void;
};

export function RFQHelpCard({ onContactSupport }: RFQHelpCardProps) {
  return (
    <section className="relative overflow-hidden rounded-xl border border-emerald-100 bg-emerald-100/70 p-5 shadow-sm">
      <CircleHelp className="absolute -bottom-6 -right-5 size-20 text-emerald-700/10" />
      <div className="relative">
        <h2 className="text-base font-medium text-slate-700">Need help?</h2>
        <p className="mt-2.5 text-[13px] font-medium leading-5 text-slate-600">
          Our experts are here to help you draft the perfect RFQ or offer.
        </p>
        <button
          className={cn(buttonClasses("secondary"), "mt-4 h-9 rounded-lg px-5 text-sm font-black")}
          onClick={onContactSupport}
          type="button"
        >
          Contact Support
        </button>
      </div>
    </section>
  );
}
