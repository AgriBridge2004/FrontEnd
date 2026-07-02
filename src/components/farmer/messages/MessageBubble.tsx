import { Check } from "lucide-react";

import { ConversationAvatar } from "@/components/farmer/messages/ConversationAvatar";
import type { ChatMessage, Conversation } from "@/components/farmer/messages/messages.mock";
import { cn } from "@/lib/cn";

type MessageBubbleProps = {
  conversation: Conversation;
  message: ChatMessage;
};

export function MessageBubble({ conversation, message }: MessageBubbleProps) {
  const isOutgoing = message.sender === "farmer";

  return (
    <div className={cn("flex items-end gap-2", isOutgoing ? "justify-end" : "justify-start")}>
      {!isOutgoing ? <ConversationAvatar initials={conversation.initials} size="sm" /> : null}
      <div className={cn("max-w-[82%] sm:max-w-[64%]", isOutgoing && "text-right")}>
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2.5 text-[13px] font-medium leading-5 shadow-sm",
            isOutgoing ? "bg-emerald-50 text-slate-700 ring-1 ring-emerald-100" : "bg-white text-slate-700 ring-1 ring-slate-200",
          )}
        >
          {message.text.split("\n").map((line, index) => (
            <p key={`${message.id}-${index}`}>{line}</p>
          ))}
        </div>
        <p className={cn("mt-0.5 flex items-center gap-1 text-[10px] font-medium text-slate-500", isOutgoing ? "justify-end" : "justify-start")}>
          {message.time}
          {isOutgoing ? <Check className="size-3 text-emerald-700" /> : null}
        </p>
      </div>
      {isOutgoing ? <ConversationAvatar initials="RK" size="sm" tone="farmer" /> : null}
    </div>
  );
}
