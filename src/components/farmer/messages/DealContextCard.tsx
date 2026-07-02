import Link from "next/link";
import { CalendarDays, ExternalLink } from "lucide-react";

import type { Conversation } from "@/components/farmer/messages/messages.mock";

type DealContextCardProps = {
  conversation: Conversation;
};

export function DealContextCard({ conversation }: DealContextCardProps) {
  if (!conversation.dealId) {
    return null;
  }

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
            <Link
              className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 transition hover:text-emerald-900"
              href={`/farmer/deals/${conversation.dealId}`}
            >
              View Deal
              <ExternalLink className="size-3.5" />
            </Link>
          </div>
          <p className="mt-1 text-xs font-medium text-slate-600">
            {conversation.dealProduct} • {conversation.dealQuantity} • {conversation.dealPrice} • Delivery to {conversation.name}
          </p>
          <p className="mt-1.5 inline-flex items-center gap-2 text-[11px] font-semibold text-slate-500">
            <CalendarDays className="size-3.5" />
            Expected Delivery: 25 May 2024
          </p>
        </div>
      </div>
    </section>
  );
}
