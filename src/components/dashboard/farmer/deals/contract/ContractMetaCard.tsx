import { BadgeCheck } from "lucide-react";

import type { DigitalContract } from "@/components/dashboard/farmer/deals/contract/contract.types";

type ContractMetaCardProps = {
  meta: DigitalContract["meta"];
};

export function ContractMetaCard({ meta }: ContractMetaCardProps) {
  const rows = [
    ["Version", meta.version],
    ["Blockchain ID", meta.blockchainId],
    ["Storage", meta.storage],
  ];

  return (
    <section className="rounded-2xl border border-emerald-100 bg-slate-50 p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
      <h2 className="text-sm font-medium uppercase tracking-wide text-slate-700">Contract Meta</h2>
      <div className="mt-5 grid gap-4 text-sm">
        {rows.map(([label, value]) => (
          <div className="flex items-center justify-between gap-4" key={label}>
            <span className="font-medium text-slate-600">{label}</span>
            <span className="inline-flex items-center gap-1 font-black text-slate-950">
              {value}
              {label === "Blockchain ID" ? <BadgeCheck className="size-3.5 text-emerald-700" /> : null}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
