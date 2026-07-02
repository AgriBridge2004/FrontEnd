import Link from "next/link";
import { FileText, MessageSquare, Zap } from "lucide-react";

type DealActionsCardProps = {
  dealId: string;
};

export function DealActionsCard({ dealId }: DealActionsCardProps) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-md">
      <h2 className="inline-flex items-center gap-2 text-lg font-black text-slate-950">
        <Zap className="size-5 text-emerald-600" />
        Actions
      </h2>
      <div className="mt-6 grid gap-3">
        <Link
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 text-sm font-black text-white transition hover:bg-emerald-800"
          href="/farmer/messages"
        >
          <MessageSquare className="size-5" />
          Message Buyer
        </Link>
        <Link
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-emerald-700 bg-white px-4 text-sm font-black text-emerald-700 transition hover:bg-emerald-50"
          href={`/farmer/deals/${dealId}/contract`}
        >
          <FileText className="size-5" />
          View Contract
        </Link>
      </div>
    </section>
  );
}
