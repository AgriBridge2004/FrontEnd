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
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const shouldStickToBottomRef = useRef(true);

  function handleScroll() {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    shouldStickToBottomRef.current = distanceFromBottom < 96;
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    shouldStickToBottomRef.current = true;
  }, [conversation.id]);

  useEffect(() => {
    if (shouldStickToBottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages.length]);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50/80 pb-4" onScroll={handleScroll} ref={containerRef}>
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
