import { getFarmerListings } from "@/lib/farmer-listings-api";
import { apiRequest } from "@/lib/api";
import type { FarmerDashboardStats, FarmerDeal, FarmerNotification } from "@/types/farmer";

export async function getFarmerStats(): Promise<FarmerDashboardStats> {
  const listings = await getFarmerListings();

  return {
    activeListings: listings.filter((listing) => listing.status === "active").length,
    // TODO: Replace with farmer RFQ endpoint when Swagger documents one.
    openRfqs: 0,
    // TODO: Replace with farmer deals endpoint when Swagger documents one.
    activeDeals: 0,
    // TODO: Replace with farmer revenue/dashboard endpoint when Swagger documents one.
    totalRevenue: 0,
  };
}

export async function getFarmerDashboard() {
  const stats = await getFarmerStats();

  return { stats };
}

export async function getFarmerDeals() {
  return apiRequest<FarmerDeal[]>("/deals/my", { auth: true });
}

export async function getFarmerDealById(id: string) {
  return apiRequest<FarmerDeal>(`/deals/${id}`, { auth: true });
}

export async function updateFarmerDealStatus(id: string, status: "pending" | "confirmed" | "active" | "completed" | "cancelled") {
  return apiRequest<FarmerDeal>(`/deals/${id}/status`, {
    auth: true,
    body: { status },
    method: "PATCH",
  });
}

export async function signFarmerDealContract(id: string) {
  return apiRequest<FarmerDeal>(`/deals/${id}/contract/sign`, {
    auth: true,
    method: "POST",
  });
}

export async function getFarmerDealMessages(id: string) {
  return apiRequest<Array<Record<string, unknown>>>(`/deals/${id}/messages`, { auth: true });
}

export async function sendFarmerDealMessage(
  id: string,
  payload: { text: string; type?: "text" | "offer"; offerPrice?: number; offerQuantity?: number; offerTerms?: string },
) {
  return apiRequest<Record<string, unknown>>(`/deals/${id}/messages`, {
    auth: true,
    body: payload,
    method: "POST",
  });
}

export async function getFarmerOpenRfqs() {
  return apiRequest<Array<Record<string, unknown>>>("/rfqs", { auth: true });
}

export async function submitFarmerRfqQuote(id: string, payload: { price: number; message?: string }) {
  return apiRequest<Record<string, unknown>>(`/rfqs/${id}/quotes`, {
    auth: true,
    body: payload,
    method: "POST",
  });
}

export async function getFarmerNotifications() {
  return apiRequest<FarmerNotification[]>("/notifications", { auth: true });
}

export async function getFarmerUnreadNotificationCount() {
  return apiRequest<{ count?: number; unreadCount?: number }>("/notifications/unread-count", { auth: true });
}

export async function markFarmerNotificationRead(id: string) {
  return apiRequest<FarmerNotification>(`/notifications/${id}/read`, {
    auth: true,
    method: "PATCH",
  });
}

export async function markAllFarmerNotificationsRead() {
  return apiRequest<{ message?: string }>("/notifications/read-all", {
    auth: true,
    method: "PATCH",
  });
}

// Swagger does not currently document dedicated farmer dashboard summary, payments,
// reviews, disputes, or settings endpoints. Those dashboard sections stay mocked until
// documented backend endpoints exist.

