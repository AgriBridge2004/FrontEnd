"use client";

import { useMemo, useState } from "react";

import { FarmerDashboardLayout } from "@/components/farmer/FarmerDashboardLayout";
import { ChatHeader } from "@/components/farmer/messages/ChatHeader";
import { ChatMessages } from "@/components/farmer/messages/ChatMessages";
import { MessageComposer } from "@/components/farmer/messages/MessageComposer";
import { MessagesSidebar } from "@/components/farmer/messages/MessagesSidebar";
import {
  farmerChatMessages,
  farmerConversations,
  type ChatMessage,
} from "@/components/farmer/messages/messages.mock";

export function FarmerMessagesPage() {
  const [activeConversationId, setActiveConversationId] = useState(farmerConversations[0]?.id ?? "");
  const [conversationSearch, setConversationSearch] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(farmerChatMessages);

  const filteredConversations = useMemo(() => {
    const normalizedSearch = conversationSearch.trim().toLowerCase();

    return farmerConversations.filter((conversation) => {
      return (
        conversation.name.toLowerCase().includes(normalizedSearch) ||
        conversation.lastMessage.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [conversationSearch]);

  const activeConversation =
    farmerConversations.find((conversation) => conversation.id === activeConversationId) ?? filteredConversations[0] ?? farmerConversations[0];

  const activeMessages = messages.filter((message) => message.conversationId === activeConversation.id);

  function handleConversationSearch(value: string) {
    setConversationSearch(value);
    const nextConversation = farmerConversations.find((conversation) => {
      const normalizedValue = value.trim().toLowerCase();
      return conversation.name.toLowerCase().includes(normalizedValue) || conversation.lastMessage.toLowerCase().includes(normalizedValue);
    });

    if (nextConversation) {
      setActiveConversationId(nextConversation.id);
    }
  }

  function handleSendMessage(text: string) {
    const newMessage: ChatMessage = {
      id: `local-${Date.now()}`,
      conversationId: activeConversation.id,
      sender: "farmer",
      text,
      time: new Intl.DateTimeFormat("en", {
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date()),
    };

    setMessages((currentMessages) => [...currentMessages, newMessage]);
  }

  // TODO: Connect conversations, attachments, and message sending to backend chat APIs.
  return (
    <FarmerDashboardLayout hideTopbar>
      <div className="grid h-[100dvh] min-h-0 grid-rows-[minmax(210px,34vh)_minmax(0,1fr)] overflow-hidden bg-slate-50 lg:grid-cols-[300px_minmax(0,1fr)] lg:grid-rows-1 xl:grid-cols-[320px_minmax(0,1fr)]">
        <MessagesSidebar
          activeConversationId={activeConversation.id}
          conversations={filteredConversations}
          onSearchChange={handleConversationSearch}
          onSelectConversation={setActiveConversationId}
          searchQuery={conversationSearch}
        />

        <section className="flex min-h-0 flex-col overflow-hidden border-t border-slate-200 bg-white lg:border-t-0">
          <ChatHeader conversation={activeConversation} />
          <ChatMessages conversation={activeConversation} messages={activeMessages} />
          <MessageComposer onSendMessage={handleSendMessage} />
        </section>
      </div>
    </FarmerDashboardLayout>
  );
}
