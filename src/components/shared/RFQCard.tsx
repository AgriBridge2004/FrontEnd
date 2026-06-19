import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";
import type { RFQ } from "@/types";

type RFQCardProps = {
  rfq: RFQ;
};

export function RFQCard({ rfq }: RFQCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">{rfq.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{rfq.notes}</p>
        </div>
        <StatusBadge label={rfq.status} tone={rfq.status === "open" ? "emerald" : "sky"} />
      </div>
      <dl className="mt-5 grid gap-3 text-sm md:grid-cols-4">
        <div>
          <dt className="text-slate-500">Crop</dt>
          <dd className="font-semibold text-slate-900">{rfq.crop}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Quantity</dt>
          <dd className="font-semibold text-slate-900">
            {formatNumber(rfq.quantity)} {rfq.unit}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">Target</dt>
          <dd className="font-semibold text-slate-900">
            {rfq.targetPrice ? `${formatCurrency(rfq.targetPrice)} / ${rfq.unit}` : "Flexible"}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">Deadline</dt>
          <dd className="font-semibold text-slate-900">{formatDate(rfq.deadline)}</dd>
        </div>
      </dl>
    </article>
  );
}
