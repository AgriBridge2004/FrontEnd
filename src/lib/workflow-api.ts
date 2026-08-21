import { ApiError, apiBlobRequest, apiRequest } from "@/lib/api";

export type ApiRecord = Record<string, unknown>;

type ApiListResponse = ApiRecord[] | ApiRecord;

export type RfqCreatePayload = {
  productType: string;
  quantity: number;
  location: string;
  deliveryDate?: string;
  budget?: number;
  notes?: string;
};

export type RfqQuoteCreatePayload = {
  price: number;
  message?: string;
};

export type RfqQuoteResponsePayload = {
  action: "accept" | "reject" | "counter";
  counterPrice?: number;
};

export type DealCreatePayload = {
  source: "rfq" | "listing";
  rfqId?: string;
  listingId?: string;
  farmerId?: string;
  price: number;
  quantity: number;
  deliveryDate?: string;
  notes?: string;
};

export type DealStatusUpdatePayload = {
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
};

export type DealMessageCreatePayload = {
  text: string;
  type?: "text" | "offer";
  offerPrice?: number;
  offerQuantity?: number;
  offerTerms?: string;
};

export type DealMessageResponsePayload = {
  action: "accept" | "counter";
  counterPrice?: number;
  counterQuantity?: number;
  counterTerms?: string;
};

function removeEmptyFields<T extends ApiRecord>(payload: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== "" && value !== null),
  ) as Partial<T>;
}

function getList(response: ApiListResponse, key: "rfqs" | "deals" | "messages" | "notifications") {
  if (Array.isArray(response)) return response;

  const data = asRecord(response.data);
  const value =
    response[key] ??
    data[key] ??
    response.items ??
    data.items ??
    response.results ??
    data.results ??
    response.data;
  return Array.isArray(value) ? value : [];
}

function asRecord(value: unknown): ApiRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as ApiRecord) : {};
}

function encodePathPart(value: string) {
  return encodeURIComponent(value);
}

export async function createRfq(payload: RfqCreatePayload) {
  return apiRequest<ApiRecord>("/rfqs", {
    auth: true,
    body: removeEmptyFields(payload),
    method: "POST",
  });
}

export async function getOpenRfqs() {
  const response = await apiRequest<ApiListResponse>("/rfqs", { auth: true });
  return getList(response, "rfqs");
}

export async function getMyRfqs() {
  const response = await apiRequest<ApiListResponse>("/rfqs/my", { auth: true });
  return getList(response, "rfqs");
}

export async function getRfqById(id: string) {
  return apiRequest<ApiRecord>(`/rfqs/${encodePathPart(id)}`, { auth: true });
}

export async function submitRfqQuote(id: string, payload: RfqQuoteCreatePayload) {
  return apiRequest<ApiRecord>(`/rfqs/${encodePathPart(id)}/quotes`, {
    auth: true,
    body: removeEmptyFields(payload),
    method: "POST",
  });
}

export async function respondToRfqQuote(rfqId: string, quoteId: string, payload: RfqQuoteResponsePayload) {
  return apiRequest<ApiRecord>(`/rfqs/${encodePathPart(rfqId)}/quotes/${encodePathPart(quoteId)}`, {
    auth: true,
    body: removeEmptyFields(payload),
    method: "PATCH",
  });
}

export async function createDeal(payload: DealCreatePayload) {
  return apiRequest<ApiRecord>("/deals", {
    auth: true,
    body: removeEmptyFields(payload),
    method: "POST",
  });
}

export async function getMyDeals() {
  const response = await apiRequest<ApiListResponse>("/deals/my", { auth: true });
  return getList(response, "deals");
}

export async function getDealById(id: string) {
  return apiRequest<ApiRecord>(`/deals/${encodePathPart(id)}`, { auth: true });
}

export async function signDealContract(id: string) {
  return apiRequest<ApiRecord>(`/deals/${encodePathPart(id)}/contract/sign`, {
    auth: true,
    method: "POST",
  });
}

export async function downloadDealContractPdf(id: string) {
  return apiBlobRequest(`/deals/${encodePathPart(id)}/contract/pdf`, {
    auth: true,
    headers: { Accept: "application/pdf" },
  });
}

export async function updateDealStatus(id: string, payload: DealStatusUpdatePayload) {
  return apiRequest<ApiRecord>(`/deals/${encodePathPart(id)}/status`, {
    auth: true,
    body: payload,
    method: "PATCH",
  });
}

export async function getDealMessages(dealId: string) {
  const response = await apiRequest<ApiListResponse>(`/deals/${encodePathPart(dealId)}/messages`, { auth: true });
  return getList(response, "messages");
}

export async function sendDealMessage(dealId: string, payload: DealMessageCreatePayload) {
  return apiRequest<ApiRecord>(`/deals/${encodePathPart(dealId)}/messages`, {
    auth: true,
    body: removeEmptyFields(payload),
    method: "POST",
  });
}

export async function respondToDealMessage(dealId: string, messageId: string, payload: DealMessageResponsePayload) {
  return apiRequest<ApiRecord>(`/deals/${encodePathPart(dealId)}/messages/${encodePathPart(messageId)}/respond`, {
    auth: true,
    body: removeEmptyFields(payload),
    method: "PATCH",
  });
}

export async function getNotifications() {
  const response = await apiRequest<ApiListResponse>("/notifications", { auth: true });
  return getList(response, "notifications");
}

export async function getUnreadNotificationCount() {
  return apiRequest<ApiRecord>("/notifications/unread-count", { auth: true });
}

export async function markAllNotificationsAsRead() {
  return apiRequest<ApiRecord>("/notifications/read-all", {
    auth: true,
    method: "PATCH",
  });
}

export async function markNotificationAsRead(id: string) {
  return apiRequest<ApiRecord>(`/notifications/${encodePathPart(id)}/read`, {
    auth: true,
    method: "PATCH",
  });
}

export function isNotFoundError(error: unknown) {
  return error instanceof ApiError && error.status === 404;
}
