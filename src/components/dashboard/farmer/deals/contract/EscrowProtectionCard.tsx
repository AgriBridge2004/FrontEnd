import { ExternalLink, ShieldCheck } from "lucide-react";

type EscrowProtectionCardProps = {
  onViewTerms: () => void;
};

export function EscrowProtectionCard({ onViewTerms }: EscrowProtectionCardProps) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-md">
      <span className="grid size-12 place-items-center rounded-xl bg-white text-emerald-800 shadow-sm">
        <ShieldCheck className="size-7" />
      </span>
      <h2 className="mt-5 text-lg font-black text-slate-950">Escrow Protection</h2>
      <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
        Your payment is protected by our triple-layer security protocol. Funds are only released upon successful
        delivery verification.
      </p>
      <button
        className="mt-5 inline-flex items-center gap-1 text-sm font-black text-emerald-800 transition hover:text-emerald-700"
        onClick={onViewTerms}
        type="button"
      >
        View Protection Terms
        <ExternalLink className="size-3.5" />
      </button>
    </section>
  );
}
