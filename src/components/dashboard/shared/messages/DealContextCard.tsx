import { CalendarDays, ExternalLink } from "lucide-react";

import type { DashboardConversation } from "@/components/dashboard/shared/messages/messages.types";

type DealContextCardProps = {
  conversation: DashboardConversation;
  onViewDeal: (conversation: DashboardConversation) => void;
};

export function DealContextCard({ conversation, onViewDeal }: DealContextCardProps) {
  if (!conversation.dealId) {
    return null;
  }

  const deliveryText = conversation.deliveryContext ?? `Delivery to ${conversation.participantName}`;

  return (
    <section className="mx-4 mt-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="grid size-12 shrink-0 place-items-center rounded-lg border border-slate-200 bg-emerald-900 text-[9px] font-black text-white">
          Deal
          <span className="block">Context</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-[13px] font-black text-slate-950">Deal Context</h3>
            <button
              className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 transition hover:text-emerald-900"
              onClick={() => onViewDeal(conversation)}
              type="button"
            >
              View Deal
              <ExternalLink className="size-3.5" />
            </button>
          </div>
          <p className="mt-1 text-xs font-medium text-slate-600">
            {conversation.product} • {conversation.quantity} • {conversation.priceLabel} • {deliveryText}
          </p>
          <p className="mt-1.5 inline-flex items-center gap-2 text-[11px] font-semibold text-slate-500">
            <CalendarDays className="size-3.5" />
            Expected Delivery: {conversation.expectedDelivery ?? "25 May 2024"}
          </p>
        </div>
      </div>
    </section>
  );
}
