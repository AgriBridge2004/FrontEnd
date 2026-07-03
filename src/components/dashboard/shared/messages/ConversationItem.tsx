"use client";

import { ConversationAvatar } from "@/components/dashboard/shared/messages/ConversationAvatar";
import type { DashboardConversation } from "@/components/dashboard/shared/messages/messages.types";
import { cn } from "@/lib/cn";

type ConversationItemProps = {
  conversation: DashboardConversation;
  isActive: boolean;
  onSelect: () => void;
};

function getTone(conversation: DashboardConversation) {
  if (conversation.participantRole === "support") {
    return "blue";
  }

  if (conversation.id.includes("food") || conversation.id.includes("factory")) {
    return "orange";
  }

  return "green";
}

export function ConversationItem({ conversation, isActive, onSelect }: ConversationItemProps) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2.5 border-l-4 px-4 py-3 text-left transition",
        isActive ? "border-emerald-700 bg-emerald-50" : "border-transparent hover:bg-emerald-50/50",
      )}
      onClick={onSelect}
      type="button"
    >
      <ConversationAvatar initials={conversation.initials} tone={getTone(conversation)} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-[13px] font-black text-slate-900">{conversation.participantName}</p>
          <span className="shrink-0 text-[11px] font-medium text-slate-500">{conversation.timeLabel}</span>
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs font-medium leading-4 text-slate-500">{conversation.lastMessage}</p>
      </div>
      {conversation.unread ? <span className="size-2.5 shrink-0 rounded-full bg-emerald-700" /> : null}
    </button>
  );
}
