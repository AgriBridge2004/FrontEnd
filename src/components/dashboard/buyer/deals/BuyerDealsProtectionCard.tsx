import { ShieldCheck } from "lucide-react";

type BuyerDealsProtectionCardProps = {
  onLearnMore: () => void;
};

export function BuyerDealsProtectionCard({ onLearnMore }: BuyerDealsProtectionCardProps) {
  return (
    <section className="mt-6 flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-emerald-100 bg-white text-emerald-700 shadow-sm">
          <ShieldCheck className="size-6" />
        </span>
        <div>
          <h2 className="text-base font-black text-emerald-900">Safe & Secure Purchases</h2>
          <p className="mt-1 text-sm font-medium text-emerald-700/70">
            Your payments are protected and released only after successful delivery.
          </p>
        </div>
      </div>

      <button
        className="inline-flex items-center gap-2 text-sm font-black text-emerald-800 transition hover:text-emerald-950"
        onClick={onLearnMore}
        type="button"
      >
        Learn more
        <span aria-hidden="true">→</span>
      </button>
    </section>
  );
}
