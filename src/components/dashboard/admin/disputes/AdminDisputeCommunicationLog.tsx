import { MessageSquareText, User } from "lucide-react";

import type { AdminDispute } from "@/components/dashboard/admin/disputes/admin-disputes.types";
import { cn } from "@/lib/cn";

export function AdminDisputeCommunicationLog({
  dispute,
  onViewAll,
}: {
  dispute: AdminDispute;
  onViewAll: () => void;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="flex items-center gap-2 text-[15px] font-black text-slate-950">
          <span className="grid size-8 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
            <MessageSquareText className="size-4" />
          </span>
          Communication Log
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500">8</span>
        </h3>
        <button className="text-[11px] font-black text-emerald-700 hover:text-emerald-900" onClick={onViewAll} type="button">
          View all
        </button>
      </div>
      <div className="mt-4 grid gap-4">
        {dispute.communicationLog.map((message) => (
          <div className="flex gap-3" key={message.id}>
            <span
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full text-white",
                message.role === "Buyer" ? "bg-slate-800" : message.role === "Farmer" ? "bg-orange-500" : "bg-slate-300",
              )}
            >
              <User className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[12px] font-black text-slate-900">{message.sender}</p>
              <p className="mt-1 text-[12px] font-medium leading-5 text-slate-600">{message.message}</p>
              <p className="mt-1 text-[11px] font-medium text-slate-400">
                {message.date} - {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
