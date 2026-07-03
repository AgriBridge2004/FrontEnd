"use client";

import { useMemo, useState } from "react";

import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import { buyerChatMessages, buyerConversations } from "@/components/dashboard/buyer/messages/buyer-messages.mock";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import { MessagesLayout } from "@/components/dashboard/shared/messages/MessagesLayout";
import type { DashboardConversation, DashboardMessage } from "@/components/dashboard/shared/messages/messages.types";

const buyerTopbarLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/buyer/rfqs", label: "RFQ" },
];

function conversationMatchesSearch(conversation: DashboardConversation, searchQuery: string) {
  const normalizedSearch = searchQuery.trim().toLowerCase();

  if (!normalizedSearch) {
    return true;
  }

  return [
    conversation.participantName,
    conversation.product,
    conversation.dealId,
    conversation.lastMessage,
  ].some((value) => value?.toLowerCase().includes(normalizedSearch));
}

export function BuyerMessagesPage() {
  const [activeConversationId, setActiveConversationId] = useState(buyerConversations[0]?.id ?? "");
  const [conversationSearch, setConversationSearch] = useState("");
  const [messages, setMessages] = useState<DashboardMessage[]>(buyerChatMessages);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  }

  const filteredConversations = useMemo(() => {
    return buyerConversations.filter((conversation) => conversationMatchesSearch(conversation, conversationSearch));
  }, [conversationSearch]);

  const activeConversation =
    buyerConversations.find((conversation) => conversation.id === activeConversationId) ??
    filteredConversations[0] ??
    buyerConversations[0];

  const activeMessages = messages.filter((message) => message.conversationId === activeConversation.id);

  function handleConversationSearch(value: string) {
    setConversationSearch(value);
    const nextConversation = buyerConversations.find((conversation) => conversationMatchesSearch(conversation, value));

    if (nextConversation) {
      setActiveConversationId(nextConversation.id);
    }
  }

  function handleSendMessage(text: string) {
    const newMessage: DashboardMessage = {
      id: `local-${Date.now()}`,
      conversationId: activeConversation.id,
      senderRole: "self",
      senderName: "Ramesh Kumar",
      body: text,
      timestamp: new Intl.DateTimeFormat("en", {
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date()),
    };

    setMessages((currentMessages) => [...currentMessages, newMessage]);
  }

  function handleViewDeal() {
    showToast("Deal details will be connected later.");
  }

  // TODO: Connect buyer conversations, attachments, and message sending to backend chat APIs.
  return (
    <DashboardLayout
      navLinks={buyerTopbarLinks}
      notificationCount={3}
      onSearchChange={handleConversationSearch}
      profileHref="/buyer/profile"
      role="buyer"
      searchPlaceholder="Search messages..."
      searchValue={conversationSearch}
      sidebarItems={buyerSidebarItems}
      userName="Ramesh Kumar"
    >
      <MessagesLayout
        activeConversation={activeConversation}
        activeConversationId={activeConversation.id}
        conversations={filteredConversations}
        heightClassName="h-[calc(100dvh-125px)] md:h-[calc(100dvh-64px)]"
        messages={activeMessages}
        onSearchChange={handleConversationSearch}
        onSelectConversation={setActiveConversationId}
        onSendMessage={handleSendMessage}
        onViewDeal={handleViewDeal}
        searchQuery={conversationSearch}
        selfInitials="RK"
      />

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}
