"use client";

import { useEffect, useRef } from "react";

import { DealContextCard } from "@/components/dashboard/shared/messages/DealContextCard";
import { MessageBubble } from "@/components/dashboard/shared/messages/MessageBubble";
import type { DashboardConversation, DashboardMessage } from "@/components/dashboard/shared/messages/messages.types";

type ChatMessagesProps = {
  conversation: DashboardConversation;
  messages: DashboardMessage[];
  onViewDeal: (conversation: DashboardConversation) => void;
  selfInitials: string;
};

export function ChatMessages({ conversation, messages, onViewDeal, selfInitials }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [conversation.id, messages.length]);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50/80 pb-4">
      <DealContextCard conversation={conversation} onViewDeal={onViewDeal} />
      <div className="space-y-4 px-4 pt-4">
        {messages.map((message) => (
          <MessageBubble conversation={conversation} key={message.id} message={message} selfInitials={selfInitials} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
