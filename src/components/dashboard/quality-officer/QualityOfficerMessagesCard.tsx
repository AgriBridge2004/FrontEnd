import { Mail, MoreVertical, Plus, Search } from "lucide-react";

import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";

type QualityOfficerMessagesCardProps = {
  onNewMessage: () => void;
  onSearch: () => void;
};

export function QualityOfficerMessagesCard({ onNewMessage, onSearch }: QualityOfficerMessagesCardProps) {
  return (
    <DashboardCard className="relative min-h-[300px] overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h2 className="text-base font-black text-slate-950">Messages</h2>
        <div className="flex items-center gap-2 text-slate-400">
          <button className="transition hover:text-emerald-700" onClick={onSearch} type="button">
            <Search className="size-5" />
          </button>
          <button className="transition hover:text-emerald-700" onClick={onSearch} type="button">
            <MoreVertical className="size-5" />
          </button>
        </div>
      </div>
      <div className="grid min-h-[220px] place-items-center px-5 text-center">
        <div>
          <span className="mx-auto grid size-14 place-items-center rounded-full border border-slate-100 bg-white text-slate-300 shadow-sm">
            <Mail className="size-7" />
          </span>
          <p className="mt-4 text-sm font-black text-slate-950">No New Messages</p>
          <p className="mx-auto mt-2 max-w-[230px] text-sm font-medium leading-5 text-slate-400">
            Your inbox is empty. Start a conversation with buyers or farmers.
          </p>
        </div>
      </div>
      <button
        aria-label="New message"
        className="absolute bottom-5 right-5 grid size-10 place-items-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700"
        onClick={onNewMessage}
        type="button"
      >
        <Plus className="size-5" />
      </button>
    </DashboardCard>
  );
}
