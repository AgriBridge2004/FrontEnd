"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { FarmerDashboardLayout } from "@/components/dashboard/farmer/FarmerDashboardLayout";
import {
  farmerChatMessages,
  farmerConversations,
  type ChatMessage,
  type Conversation,
} from "@/components/dashboard/farmer/messages/messages.mock";
import { MessagesLayout } from "@/components/dashboard/shared/messages/MessagesLayout";
import type { DashboardConversation, DashboardMessage } from "@/components/dashboard/shared/messages/messages.types";

function mapFarmerConversation(conversation: Conversation): DashboardConversation {
  return {
    id: conversation.id,
    participantName: conversation.name,
    participantRole: conversation.id === "admin-support" ? "support" : "buyer",
    avatarUrl: conversation.avatar,
    initials: conversation.initials,
    lastMessage: conversation.lastMessage,
    timeLabel: conversation.time,
    unread: conversation.unread,
    dealId: conversation.dealId,
    product: conversation.dealProduct,
    quantity: conversation.dealQuantity,
    priceLabel: conversation.dealPrice,
    expectedDelivery: "25 May 2024",
    deliveryContext: `Delivery to ${conversation.name}`,
  };
}

function mapFarmerMessage(message: ChatMessage): DashboardMessage {
  return {
    id: message.id,
    conversationId: message.conversationId,
    senderRole: message.sender === "farmer" ? "self" : message.sender === "admin" ? "support" : "other",
    senderName: message.sender === "farmer" ? "Ramesh Kumar" : message.sender === "admin" ? "Admin Support" : "Buyer",
    body: message.text,
    timestamp: message.time,
  };
}

export function FarmerMessagesPage() {
  const router = useRouter();
  const [activeConversationId, setActiveConversationId] = useState(farmerConversations[0]?.id ?? "");
  const [conversationSearch, setConversationSearch] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(farmerChatMessages);

  const filteredConversations = useMemo(() => {
    const normalizedSearch = conversationSearch.trim().toLowerCase();

    return farmerConversations.filter((conversation) => {
      return (
        conversation.name.toLowerCase().includes(normalizedSearch) ||
        conversation.lastMessage.toLowerCase().includes(normalizedSearch) ||
        conversation.dealProduct?.toLowerCase().includes(normalizedSearch) ||
        conversation.dealId?.toLowerCase().includes(normalizedSearch)
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
      return (
        conversation.name.toLowerCase().includes(normalizedValue) ||
        conversation.lastMessage.toLowerCase().includes(normalizedValue) ||
        conversation.dealProduct?.toLowerCase().includes(normalizedValue) ||
        conversation.dealId?.toLowerCase().includes(normalizedValue)
      );
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
      <MessagesLayout
        activeConversation={mapFarmerConversation(activeConversation)}
        activeConversationId={activeConversation.id}
        conversations={filteredConversations.map(mapFarmerConversation)}
        messages={activeMessages.map(mapFarmerMessage)}
        onSearchChange={handleConversationSearch}
        onSelectConversation={setActiveConversationId}
        onSendMessage={handleSendMessage}
        onViewDeal={(conversation) => {
          if (conversation.dealId) {
            router.push(`/farmer/deals/${conversation.dealId}`);
          }
        }}
        searchQuery={conversationSearch}
        selfInitials="RK"
      />
    </FarmerDashboardLayout>
  );
}
