export type DashboardMessageRole = "self" | "other" | "support";

export type DashboardParticipantRole = "farmer" | "buyer" | "support";

export type DashboardMessage = {
  id: string;
  conversationId: string;
  senderRole: DashboardMessageRole;
  senderName: string;
  body: string;
  timestamp: string;
};

export type DashboardConversation = {
  id: string;
  participantName: string;
  participantRole: DashboardParticipantRole;
  avatarUrl?: string;
  initials: string;
  lastMessage: string;
  timeLabel: string;
  unread?: boolean;
  dealId?: string;
  product?: string;
  quantity?: string;
  priceLabel?: string;
  expectedDelivery?: string;
  deliveryContext?: string;
};
