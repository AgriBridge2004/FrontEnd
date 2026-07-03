import { ExternalLink, MoreVertical } from "lucide-react";

import { ConversationAvatar } from "@/components/dashboard/shared/messages/ConversationAvatar";
import type { DashboardConversation } from "@/components/dashboard/shared/messages/messages.types";

type ChatHeaderProps = {
  conversation: DashboardConversation;
  onViewDeal: (conversation: DashboardConversation) => void;
};

export function ChatHeader({ conversation, onViewDeal }: ChatHeaderProps) {
  const subtitle = [conversation.product, conversation.quantity, conversation.priceLabel].filter(Boolean).join(" • ");

  return (
    <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-5 py-2.5">
      <ConversationAvatar initials={conversation.initials} size="md" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="truncate text-[15px] font-black text-slate-950">{conversation.participantName}</h2>
          {conversation.dealId ? (
            <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-black uppercase text-slate-600">{conversation.dealId}</span>
          ) : null}
        </div>
        {subtitle ? <p className="truncate text-xs font-medium text-slate-500">{subtitle}</p> : null}
      </div>

      {conversation.dealId ? (
        <button
          className="hidden items-center gap-1 text-[13px] font-black text-emerald-700 transition hover:text-emerald-900 sm:inline-flex"
          onClick={() => onViewDeal(conversation)}
          type="button"
        >
          View Deal
          <ExternalLink className="size-4" />
        </button>
      ) : null}
      <button className="grid size-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100" type="button">
        <MoreVertical className="size-4" />
      </button>
    </header>
  );
}
