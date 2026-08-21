import { ApiError, apiRequest } from "@/lib/api";
import { updateStoredUser } from "@/lib/auth-storage";
import type { AuthUser } from "@/types/auth";

export type ApiRecord = Record<string, unknown>;

type ApiListResponse = ApiRecord[] | ApiRecord;

export type BuyerProfile = {
  id?: string;
  userId?: string;
  fullName?: string;
  phone?: string;
  companyName?: string;
  businessType?: string;
  address?: string;
  bio?: string;
  profileImage?: string;
};

export type BuyerProfilePayload = {
  fullName?: string;
  phone?: string;
  companyName?: string;
  businessType?: string;
  address?: string;
  bio?: string;
  profileImage?: File;
};

export type BuyerRfqCreatePayload = {
  productType: string;
  quantity: number;
  location: string;
  deliveryDate?: string;
  budget?: number;
  notes?: string;
};

export type BuyerDealCreatePayload = {
  source: "rfq" | "listing";
  rfqId?: string;
  listingId?: string;
  farmerId?: string;
  price: number;
  quantity: number;
  deliveryDate?: string;
  notes?: string;
};

export type BuyerDealStatusPayload = {
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
};

export type BuyerMessageCreatePayload = {
  text: string;
  type?: "text" | "offer";
  offerPrice?: number;
  offerQuantity?: number;
  offerTerms?: string;
};

export type BuyerQuoteActionPayload = {
  action: "accept" | "reject" | "counter";
  counterPrice?: number;
};

function getList(response: ApiListResponse, key: "rfqs" | "deals" | "messages" | "notifications" | "buyers") {
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

function removeEmptyFields<T extends ApiRecord>(payload: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== "" && value !== null),
  ) as Partial<T>;
}

function appendOptional(formData: FormData, key: string, value: string | number | File | undefined) {
  if (value === undefined || value === "") {
    return;
  }

  formData.append(key, value instanceof File ? value : String(value));
}

function mapBuyerProfilePayloadToFormData(payload: BuyerProfilePayload) {
  const formData = new FormData();

  appendOptional(formData, "fullName", payload.fullName);
  appendOptional(formData, "phone", payload.phone);
  appendOptional(formData, "companyName", payload.companyName);
  appendOptional(formData, "businessType", payload.businessType);
  appendOptional(formData, "address", payload.address);
  appendOptional(formData, "bio", payload.bio);
  appendOptional(formData, "profileImage", payload.profileImage);

  return formData;
}

function asRecord(value: unknown): ApiRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as ApiRecord) : {};
}

function getString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function unwrapBuyerProfileResponse(response: ApiRecord) {
  return asRecord(response.buyer ?? response.profile ?? response.data ?? response);
}

export function mapBuyerProfileFromApi(response: ApiRecord): BuyerProfile {
  const record = unwrapBuyerProfileResponse(response);
  const user = asRecord(record.user);

  return {
    address: getString(record.address ?? record.location),
    bio: getString(record.bio),
    businessType: getString(record.businessType),
    companyName: getString(record.companyName ?? record.businessName),
    fullName: getString(record.fullName ?? record.name),
    id: getString(record.id ?? record._id),
    phone: getString(record.phone),
    profileImage: getString(record.profileImage ?? record.avatar ?? record.avatarUrl),
    userId: getString(record.userId ?? user.id ?? user._id),
  };
}

export function syncStoredUserFromBuyerProfile(response: ApiRecord, fallbackUser?: AuthUser | null) {
  const profile = mapBuyerProfileFromApi(response);

  updateStoredUser({
    avatar: profile.profileImage,
    avatarUrl: profile.profileImage,
    businessName: profile.companyName,
    companyName: profile.companyName,
    fullName: profile.fullName ?? fallbackUser?.fullName,
    location: profile.address,
    name: profile.fullName ?? fallbackUser?.name,
    phone: profile.phone ?? fallbackUser?.phone,
    profile,
    profileCompleted: true,
  });

  return profile;
}

export function isNotFoundError(error: unknown) {
  return error instanceof ApiError && error.status === 404;
}

export async function createBuyerProfile(payload: BuyerProfilePayload) {
  return apiRequest<ApiRecord>("/buyer", {
    auth: true,
    body: mapBuyerProfilePayloadToFormData(payload),
    method: "POST",
  });
}

export async function updateBuyerProfile(payload: BuyerProfilePayload) {
  return apiRequest<ApiRecord>("/buyer/profile", {
    auth: true,
    body: mapBuyerProfilePayloadToFormData(payload),
    method: "PUT",
  });
}

export async function getBuyerProfileByUserId(userId: string) {
  const response = await apiRequest<ApiRecord>(`/buyer/user/${encodeURIComponent(userId)}`, { auth: true });
  return mapBuyerProfileFromApi(response);
}

export async function getBuyerById(id: string) {
  const response = await apiRequest<ApiRecord>(`/buyer/${encodeURIComponent(id)}`, { auth: true });
  return mapBuyerProfileFromApi(response);
}

export async function deleteBuyerProfile(id: string) {
  return apiRequest<ApiRecord>(`/buyer/${encodeURIComponent(id)}`, {
    auth: true,
    method: "DELETE",
  });
}

export async function getAllBuyers() {
  const response = await apiRequest<ApiListResponse>("/buyer/all", { auth: true });
  return getList(response, "buyers");
}

export async function getBuyerRfqs() {
  const response = await apiRequest<ApiListResponse>("/rfqs/my", { auth: true });
  if (process.env.NODE_ENV === "development") {
    console.log("[Buyer RFQs] GET /rfqs/my response:", response);
  }
  return getList(response, "rfqs");
}

export async function getBuyerRfqById(id: string) {
  const response = await apiRequest<ApiRecord>(`/rfqs/${id}`, { auth: true });
  if (process.env.NODE_ENV === "development") {
    console.log("[Buyer RFQs] GET /rfqs/{id} response:", response);
  }
  return response;
}

export async function createBuyerRfq(payload: BuyerRfqCreatePayload) {
  return apiRequest<ApiRecord>("/rfqs", {
    auth: true,
    body: removeEmptyFields(payload),
    method: "POST",
  });
}

export async function respondToBuyerRfqQuote(id: string, quoteId: string, payload: BuyerQuoteActionPayload) {
  return apiRequest<ApiRecord>(`/rfqs/${id}/quotes/${quoteId}`, {
    auth: true,
    body: removeEmptyFields(payload),
    method: "PATCH",
  });
}

export async function getBuyerDeals() {
  const response = await apiRequest<ApiListResponse>("/deals/my", { auth: true });
  return getList(response, "deals");
}

export async function getBuyerDealById(id: string) {
  return apiRequest<ApiRecord>(`/deals/${id}`, { auth: true });
}

export async function createBuyerDeal(payload: BuyerDealCreatePayload) {
  return apiRequest<ApiRecord>("/deals", {
    auth: true,
    body: removeEmptyFields(payload),
    method: "POST",
  });
}

export async function updateBuyerDealStatus(id: string, payload: BuyerDealStatusPayload) {
  return apiRequest<ApiRecord>(`/deals/${id}/status`, {
    auth: true,
    body: payload,
    method: "PATCH",
  });
}

export async function signBuyerDealContract(id: string) {
  return apiRequest<ApiRecord>(`/deals/${id}/contract/sign`, {
    auth: true,
    method: "POST",
  });
}

export function getBuyerDealContractPdfUrl(id: string) {
  return `/deals/${id}/contract/pdf`;
}

export async function getBuyerDealMessages(id: string) {
  const response = await apiRequest<ApiListResponse>(`/deals/${id}/messages`, { auth: true });
  return getList(response, "messages");
}

export async function sendBuyerDealMessage(id: string, payload: BuyerMessageCreatePayload) {
  return apiRequest<ApiRecord>(`/deals/${id}/messages`, {
    auth: true,
    body: removeEmptyFields(payload),
    method: "POST",
  });
}

export async function getBuyerNotifications() {
  const response = await apiRequest<ApiListResponse>("/notifications", { auth: true });
  return getList(response, "notifications");
}

export async function getBuyerUnreadNotificationCount() {
  return apiRequest<ApiRecord>("/notifications/unread-count", { auth: true });
}

export async function markBuyerNotificationAsRead(id: string) {
  return apiRequest<ApiRecord>(`/notifications/${id}/read`, {
    auth: true,
    method: "PATCH",
  });
}

export async function markAllBuyerNotificationsAsRead() {
  return apiRequest<ApiRecord>("/notifications/read-all", {
    auth: true,
    method: "PATCH",
  });
}
