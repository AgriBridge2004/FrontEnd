"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";
import { MessagesLayout } from "@/components/dashboard/shared/messages/MessagesLayout";
import type { DashboardConversation, DashboardMessage } from "@/components/dashboard/shared/messages/messages.types";
import { getStoredUser } from "@/lib/auth-storage";
import { getBuyerDealById, getBuyerDealMessages, getBuyerDeals, sendBuyerDealMessage, type ApiRecord } from "@/lib/buyer-api";

const buyerTopbarLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/rfq", label: "RFQ" },
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
  const searchParams = useSearchParams();
  const [conversations, setConversations] = useState<DashboardConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState("");
  const [conversationSearch, setConversationSearch] = useState("");
  const [messages, setMessages] = useState<DashboardMessage[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const user = getStoredUser();
  const userName = typeof user?.fullName === "string" ? user.fullName : typeof user?.name === "string" ? user.name : "Buyer";

  useEffect(() => {
    async function loadConversations() {
      try {
        const records = await getBuyerDeals();
        const requestedDealId = searchParams.get("dealId");
        const hasRequestedDeal = requestedDealId ? records.some((record) => String(record.id ?? record._id ?? "") === requestedDealId) : true;
        const requestedDeal = requestedDealId && !hasRequestedDeal ? await getBuyerDealById(requestedDealId).catch(() => null) : null;
        const nextConversations = [...records, ...(requestedDeal ? [requestedDeal] : [])].map(mapDealToConversation);
        setConversations(nextConversations);
        setActiveConversationId(nextConversations.find((conversation) => conversation.dealId === requestedDealId || conversation.id === requestedDealId)?.id ?? nextConversations[0]?.id ?? "");
      } catch {
        setConversations([]);
      }
    }

    void loadConversations();
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.get("notice") === "firstMessageFailed") {
      showToast("Conversation opened, but the first message was not sent.");
    } else if (searchParams.get("notice") === "counterMessageFailed") {
      showToast("Chat opened, but the counter message was not sent.");
    }
  }, [searchParams]);

  useEffect(() => {
    if (!activeConversationId) {
      setMessages([]);
      return;
    }

    async function loadMessages() {
      try {
        const records = await getBuyerDealMessages(activeConversationId);
        setMessages(records.map((record) => mapMessageFromApi(record, activeConversationId)));
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

      getBuyerDealMessages(activeConversationId)
        .then((records) => setMessages(records.map((record) => mapMessageFromApi(record, activeConversationId))))
        .catch(() => undefined);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [activeConversationId]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  }

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => conversationMatchesSearch(conversation, conversationSearch));
  }, [conversationSearch, conversations]);

  const activeConversation =
    conversations.find((conversation) => conversation.id === activeConversationId) ??
    filteredConversations[0] ??
    emptyConversation;

  const activeMessages = messages.filter((message) => message.conversationId === activeConversation.id);

  function handleConversationSearch(value: string) {
    setConversationSearch(value);
    const nextConversation = conversations.find((conversation) => conversationMatchesSearch(conversation, value));

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
      senderName: userName,
      body: text,
      timestamp: new Intl.DateTimeFormat("en", {
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date()),
    };

    setMessages((currentMessages) => [...currentMessages, newMessage]);

    try {
      await sendBuyerDealMessage(activeConversation.id, { text });
    } catch {
      setMessages((currentMessages) => currentMessages.filter((message) => message.id !== newMessage.id));
      showToast("Could not send message. Please try again.");
    }
  }

  function handleViewDeal() {
    if (activeConversation.dealId) {
      window.location.assign(`/buyer/deals/${activeConversation.dealId}`);
    }
  }

  return (
    <DashboardLayout
      navLinks={buyerTopbarLinks}
      onSearchChange={handleConversationSearch}
      profileHref="/buyer/profile"
      role="buyer"
      searchPlaceholder="Search messages..."
      searchValue={conversationSearch}
      sidebarItems={buyerSidebarItems}
      userName={userName}
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
        selfInitials={getInitials(userName)}
      />

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}

const emptyConversation: DashboardConversation = {
  id: "",
  initials: "AB",
  lastMessage: "No conversations yet",
  participantName: "No conversation selected",
  participantRole: "farmer",
  timeLabel: "",
};

function mapDealToConversation(record: ApiRecord): DashboardConversation {
  const farmer = asRecord(record.farmer ?? record.seller);
  const listing = asRecord(record.listing);
  const rfq = asRecord(record.rfq);
  const id = String(record.id ?? record._id ?? "");
  const participantName = getString(farmer.fullName ?? farmer.name ?? record.farmerName) ?? "Farmer";

  return {
    avatarUrl: getString(farmer.avatarUrl ?? farmer.profileImage ?? farmer.avatar),
    dealId: id,
    expectedDelivery: formatTime(record.deliveryDate),
    id,
    initials: getInitials(participantName),
    lastMessage: "Open deal chat",
    participantName,
    participantRole: "farmer",
    priceLabel: String(record.price ?? record.totalAmount ?? ""),
    product: getString(record.productName ?? listing.name ?? listing.title ?? rfq.productType) ?? "Deal",
    quantity: String(record.quantity ?? rfq.quantity ?? ""),
    timeLabel: formatTime(record.updatedAt ?? record.createdAt),
  };
}

function mapMessageFromApi(record: ApiRecord, conversationId: string): DashboardMessage {
  const sender = asRecord(record.sender ?? record.user);
  const senderRole = String(record.senderRole ?? record.role ?? "").toLowerCase();

  return {
    body: String(record.text ?? record.body ?? record.message ?? record.content ?? ""),
    conversationId,
    id: String(record.id ?? record._id ?? ""),
    senderName: getString(sender.fullName ?? sender.name ?? record.senderName) ?? "User",
    senderRole: senderRole === "buyer" || record.isMine === true ? "self" : "other",
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
  return value
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "AB";
}

function formatTime(value: unknown) {
  const date = typeof value === "string" || typeof value === "number" ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "Recently";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(date);
}
