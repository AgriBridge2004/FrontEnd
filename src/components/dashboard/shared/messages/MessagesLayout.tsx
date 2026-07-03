"use client";

import { ChatHeader } from "@/components/dashboard/shared/messages/ChatHeader";
import { ChatMessages } from "@/components/dashboard/shared/messages/ChatMessages";
import { MessageComposer } from "@/components/dashboard/shared/messages/MessageComposer";
import { MessagesSidebar } from "@/components/dashboard/shared/messages/MessagesSidebar";
import type { DashboardConversation, DashboardMessage } from "@/components/dashboard/shared/messages/messages.types";
import { cn } from "@/lib/cn";

type MessagesLayoutProps = {
  activeConversation: DashboardConversation;
  activeConversationId: string;
  conversations: DashboardConversation[];
  messages: DashboardMessage[];
  onSearchChange: (value: string) => void;
  onSelectConversation: (conversationId: string) => void;
  onSendMessage: (text: string) => void;
  onViewDeal: (conversation: DashboardConversation) => void;
  searchQuery: string;
  selfInitials: string;
  heightClassName?: string;
};

export function MessagesLayout({
  activeConversation,
  activeConversationId,
  conversations,
  messages,
  onSearchChange,
  onSelectConversation,
  onSendMessage,
  onViewDeal,
  searchQuery,
  selfInitials,
  heightClassName = "h-[100dvh]",
}: MessagesLayoutProps) {
  return (
    <div
      className={cn(
        "grid min-h-0 grid-rows-[minmax(210px,34vh)_minmax(0,1fr)] overflow-hidden bg-slate-50 lg:grid-cols-[300px_minmax(0,1fr)] lg:grid-rows-1 xl:grid-cols-[320px_minmax(0,1fr)]",
        heightClassName,
      )}
    >
      <MessagesSidebar
        activeConversationId={activeConversationId}
        conversations={conversations}
        onSearchChange={onSearchChange}
        onSelectConversation={onSelectConversation}
        searchQuery={searchQuery}
      />

      <section className="flex min-h-0 flex-col overflow-hidden border-t border-slate-200 bg-white lg:border-t-0">
        <ChatHeader conversation={activeConversation} onViewDeal={onViewDeal} />
        <ChatMessages conversation={activeConversation} messages={messages} onViewDeal={onViewDeal} selfInitials={selfInitials} />
        <MessageComposer onSendMessage={onSendMessage} />
      </section>
    </div>
  );
}
