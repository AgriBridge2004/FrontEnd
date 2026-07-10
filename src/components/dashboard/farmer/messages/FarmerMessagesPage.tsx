"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { FarmerDashboardLayout } from "@/components/dashboard/farmer/FarmerDashboardLayout";
import { MessagesLayout } from "@/components/dashboard/shared/messages/MessagesLayout";
import type { DashboardConversation, DashboardMessage } from "@/components/dashboard/shared/messages/messages.types";
import { getDealById, getDealMessages, getMyDeals, sendDealMessage, type ApiRecord } from "@/lib/workflow-api";

export function FarmerMessagesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [conversations, setConversations] = useState<DashboardConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState("");
  const [conversationSearch, setConversationSearch] = useState("");
  const [messages, setMessages] = useState<DashboardMessage[]>([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    async function loadConversations() {
      try {
        const records = await getMyDeals();
        const requestedDealId = searchParams.get("dealId");
        const hasRequestedDeal = requestedDealId ? records.some((record) => String(record.id ?? record._id ?? "") === requestedDealId) : true;
        const requestedDeal = requestedDealId && !hasRequestedDeal ? await getDealById(requestedDealId).catch(() => null) : null;
        const nextConversations = [...records, ...(requestedDeal ? [requestedDeal] : [])].map(mapDealToFarmerConversation);
        setConversations(nextConversations);
        setActiveConversationId(nextConversations.find((conversation) => conversation.dealId === requestedDealId || conversation.id === requestedDealId)?.id ?? nextConversations[0]?.id ?? "");
      } catch {
        setConversations([]);
      }
    }

    void loadConversations();
  }, [searchParams]);

  useEffect(() => {
    if (!activeConversationId) {
      setMessages([]);
      return;
    }

    async function loadMessages() {
      try {
        const records = await getDealMessages(activeConversationId);
        setMessages(records.map((record) => mapDealMessageFromApi(record, activeConversationId)));
      } catch {
        setMessages([]);
      }
    }

    void loadMessages();
  }, [activeConversationId]);

  useEffect(() => {
    if (!activeConversationId) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === "hidden") {
        return;
      }

      getDealMessages(activeConversationId)
        .then((records) => setMessages(records.map((record) => mapDealMessageFromApi(record, activeConversationId))))
        .catch(() => undefined);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [activeConversationId]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  const filteredConversations = useMemo(() => {
    const normalizedSearch = conversationSearch.trim().toLowerCase();

    return conversations.filter((conversation) => {
      return (
        conversation.participantName.toLowerCase().includes(normalizedSearch) ||
        conversation.lastMessage.toLowerCase().includes(normalizedSearch) ||
        conversation.product?.toLowerCase().includes(normalizedSearch) ||
        conversation.dealId?.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [conversationSearch, conversations]);

  const activeConversation =
    conversations.find((conversation) => conversation.id === activeConversationId) ?? filteredConversations[0] ?? emptyConversation;

  const activeMessages = messages.filter((message) => message.conversationId === activeConversation.id);

  function handleConversationSearch(value: string) {
    setConversationSearch(value);
    const nextConversation = conversations.find((conversation) => {
      const normalizedValue = value.trim().toLowerCase();
      return (
        conversation.participantName.toLowerCase().includes(normalizedValue) ||
        conversation.lastMessage.toLowerCase().includes(normalizedValue) ||
        conversation.product?.toLowerCase().includes(normalizedValue) ||
        conversation.dealId?.toLowerCase().includes(normalizedValue)
      );
    });

    if (nextConversation) {
      setActiveConversationId(nextConversation.id);
    }
  }

  async function handleSendMessage(text: string) {
    if (!activeConversation.id) {
      showToast("No conversation selected.");
      return;
    }

    const newMessage: DashboardMessage = {
      id: `local-${Date.now()}`,
      conversationId: activeConversation.id,
      senderRole: "self",
      senderName: "Farmer",
      body: text,
      timestamp: new Intl.DateTimeFormat("en", {
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date()),
    };

    setMessages((currentMessages) => [...currentMessages, newMessage]);

    try {
      await sendDealMessage(activeConversation.id, { text });
    } catch {
      setMessages((currentMessages) => currentMessages.filter((message) => message.id !== newMessage.id));
      showToast("Failed to send message.");
    }
  }

  return (
    <FarmerDashboardLayout hideTopbar>
      <MessagesLayout
        activeConversation={activeConversation}
        activeConversationId={activeConversation.id}
        conversations={filteredConversations}
        messages={activeMessages}
        onSearchChange={handleConversationSearch}
        onSelectConversation={setActiveConversationId}
        onSendMessage={handleSendMessage}
        onViewDeal={(conversation) => {
          if (conversation.dealId) {
            router.push(`/farmer/deals/${conversation.dealId}`);
          }
        }}
        searchQuery={conversationSearch}
        selfInitials="FR"
      />

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </FarmerDashboardLayout>
  );
}

const emptyConversation: DashboardConversation = {
  id: "",
  initials: "BY",
  lastMessage: "No messages yet",
  participantName: "No conversation selected",
  participantRole: "buyer",
  timeLabel: "",
};

function mapDealToFarmerConversation(record: ApiRecord): DashboardConversation {
  const buyer = asRecord(record.buyer);
  const listing = asRecord(record.listing);
  const rfq = asRecord(record.rfq);
  const id = String(record.id ?? record._id ?? "");
  const participantName = getString(buyer.fullName ?? buyer.name ?? record.buyerName) ?? "Buyer";

  return {
    avatarUrl: getString(buyer.avatarUrl ?? buyer.profileImage ?? buyer.avatar),
    dealId: id,
    expectedDelivery: formatTime(record.deliveryDate),
    id,
    initials: getInitials(participantName),
    lastMessage: "Open deal chat",
    participantName,
    participantRole: "buyer",
    priceLabel: String(record.price ?? record.totalAmount ?? ""),
    product: getString(record.productName ?? listing.name ?? listing.title ?? rfq.productType) ?? "Deal",
    quantity: String(record.quantity ?? rfq.quantity ?? ""),
    timeLabel: formatTime(record.updatedAt ?? record.createdAt),
  };
}

function mapDealMessageFromApi(record: ApiRecord, conversationId: string): DashboardMessage {
  const sender = asRecord(record.sender ?? record.user);
  const senderRole = String(record.senderRole ?? record.role ?? "").toLowerCase();

  return {
    body: String(record.text ?? record.body ?? record.message ?? ""),
    conversationId,
    id: String(record.id ?? record._id ?? ""),
    senderName: getString(sender.fullName ?? sender.name ?? record.senderName) ?? "User",
    senderRole: senderRole === "farmer" || record.isMine === true ? "self" : "other",
    timestamp: formatTime(record.createdAt ?? record.time),
  };
}

function asRecord(value: unknown): ApiRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as ApiRecord) : {};
}

function getString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getInitials(value: string) {
  return (
    value
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "BY"
  );
}

function formatTime(value: unknown) {
  const date = typeof value === "string" || typeof value === "number" ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "Recently";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(date);
}
