"use client";

import { Search, SlidersHorizontal } from "lucide-react";

import { ConversationItem } from "@/components/dashboard/shared/messages/ConversationItem";
import type { DashboardConversation } from "@/components/dashboard/shared/messages/messages.types";

type MessagesSidebarProps = {
  activeConversationId: string;
  conversations: DashboardConversation[];
  onSearchChange: (value: string) => void;
  onSelectConversation: (conversationId: string) => void;
  searchQuery: string;
};

export function MessagesSidebar({
  activeConversationId,
  conversations,
  onSearchChange,
  onSelectConversation,
  searchQuery,
}: MessagesSidebarProps) {
  return (
    <aside className="flex min-h-0 flex-col overflow-hidden border-r border-slate-200 bg-white lg:w-[300px] xl:w-[320px]">
      <div className="shrink-0 border-b border-slate-100 px-4 pb-4 pt-14 lg:pt-5">
        <h1 className="text-[22px] font-black tracking-tight text-slate-950 sm:text-2xl">Messages</h1>
        <div className="mt-3 flex h-9 items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-3 shadow-sm">
          <Search className="size-4 shrink-0 text-slate-400" />
          <input
            className="h-full min-w-0 flex-1 bg-transparent text-[13px] font-medium text-slate-700 outline-none placeholder:text-slate-400"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search messages"
            type="search"
            value={searchQuery}
          />
          <SlidersHorizontal className="size-3.5 shrink-0 text-slate-400" />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <ConversationItem
              conversation={conversation}
              isActive={conversation.id === activeConversationId}
              key={conversation.id}
              onSelect={() => onSelectConversation(conversation.id)}
            />
          ))
        ) : (
          <p className="px-5 py-6 text-sm font-semibold text-slate-500">No conversations found.</p>
        )}
      </div>
    </aside>
  );
}
