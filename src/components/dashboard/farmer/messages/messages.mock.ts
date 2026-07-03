export type Conversation = {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
  dealId?: string;
  dealProduct?: string;
  dealQuantity?: string;
  dealPrice?: string;
};

export type ChatMessage = {
  id: string;
  conversationId: string;
  sender: "buyer" | "farmer" | "admin";
  text: string;
  time: string;
};

export const farmerConversations: Conversation[] = [
  {
    id: "green-kitchen",
    name: "Green Kitchen Restaurant",
    initials: "GK",
    lastMessage: "When can you deliver?",
    time: "2 min ago",
    unread: true,
    dealId: "DEAL-1042",
    dealProduct: "Tomatoes",
    dealQuantity: "2,000 kg",
    dealPrice: "SAR 28.00 / kg",
  },
  {
    id: "food-factory",
    name: "Food Factory",
    initials: "FF",
    lastMessage: "Thank you! The deal is completed.",
    time: "1 day ago",
    dealId: "DEAL-1038",
    dealProduct: "Olives",
    dealQuantity: "200 kg",
    dealPrice: "SAR 95.00 / kg",
  },
  {
    id: "admin-support",
    name: "Admin Support",
    initials: "AS",
    lastMessage: "Please upload your farm license document.",
    time: "3 days ago",
  },
];

export const farmerChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    conversationId: "green-kitchen",
    sender: "buyer",
    text: "Hello Ramesh,\nI'd like to confirm the delivery date for the tomatoes.\nWhen can you deliver the order?",
    time: "10:30 AM",
  },
  {
    id: "msg-2",
    conversationId: "green-kitchen",
    sender: "farmer",
    text: "Hello,\nWe can deliver on 25 May 2024 as planned.\nPlease let me know if that works for you.",
    time: "10:32 AM",
  },
  {
    id: "msg-3",
    conversationId: "green-kitchen",
    sender: "buyer",
    text: "Great! Also, will there be an inspection before delivery?\nPlease share the details.",
    time: "10:33 AM",
  },
  {
    id: "msg-4",
    conversationId: "green-kitchen",
    sender: "farmer",
    text: "Yes, quality inspection will be done at your receiving dock.\nPlease inform us of the expected inspection time.",
    time: "10:35 AM",
  },
  {
    id: "msg-5",
    conversationId: "green-kitchen",
    sender: "buyer",
    text: "Inspection is expected at 9:00 AM on 25 May.\nPlease ensure the produce is ready by then.",
    time: "10:36 AM",
  },
  {
    id: "msg-6",
    conversationId: "green-kitchen",
    sender: "farmer",
    text: "Noted. We will have everything ready by 8:30 AM.\nSee you on 25 May!",
    time: "10:38 AM",
  },
  {
    id: "msg-7",
    conversationId: "food-factory",
    sender: "buyer",
    text: "Thank you! The deal is completed.",
    time: "4:15 PM",
  },
  {
    id: "msg-8",
    conversationId: "admin-support",
    sender: "admin",
    text: "Please upload your farm license document.",
    time: "9:20 AM",
  },
];
