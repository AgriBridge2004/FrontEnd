"use client";

import { useEffect, useRef } from "react";

import { DealContextCard } from "@/components/farmer/messages/DealContextCard";
import { MessageBubble } from "@/components/farmer/messages/MessageBubble";
import type { ChatMessage, Conversation } from "@/components/farmer/messages/messages.mock";

type ChatMessagesProps = {
  conversation: Conversation;
  messages: ChatMessage[];
};

export function ChatMessages({ conversation, messages }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [conversation.id, messages.length]);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50/80 pb-4">
      <DealContextCard conversation={conversation} />
      <div className="space-y-4 px-4 pt-4">
        {messages.map((message) => (
          <MessageBubble conversation={conversation} key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
