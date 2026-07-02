import { apiRequest } from "@/lib/api";
import type { CreateFarmerListingPayload, FarmerListing, FarmerListingStatus } from "@/types/listing";

type ApiListingRecord = Record<string, unknown>;

type ApiListingsResponse =
  | ApiListingRecord[]
  | {
      listings?: ApiListingRecord[];
      data?: ApiListingRecord[];
      items?: ApiListingRecord[];
    };

function asRecord(value: unknown): ApiListingRecord {
  return value && typeof value === "object" ? (value as ApiListingRecord) : {};
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function asNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsedValue = Number(value.replace(/,/g, ""));
    return Number.isFinite(parsedValue) ? parsedValue : undefined;
  }

  return undefined;
}

function mapStatus(value: unknown): FarmerListingStatus {
  const normalizedStatus = asString(value, "active").toLowerCase();

  if (["active", "draft", "expired", "pending", "inactive"].includes(normalizedStatus)) {
    return normalizedStatus as FarmerListingStatus;
  }

  return "active";
}

function mapImages(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((image) => {
        if (typeof image === "string") {
          return image;
        }

        const imageRecord = asRecord(image);
        return asString(imageRecord.url ?? imageRecord.src ?? imageRecord.path);
      })
      .filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return [value];
  }

  return [];
}

export function mapListingFromApi(apiListing: unknown): FarmerListing {
  const listing = asRecord(apiListing);
  const id = String(listing.id ?? listing._id ?? listing.uuid ?? "");
  const productName = asString(listing.productName ?? listing.name ?? listing.title ?? listing.category, "Untitled listing");
  const images = mapImages(listing.images ?? listing.imageUrls ?? listing.photos ?? listing.image ?? listing.imageUrl);
  const price = asNumber(listing.price ?? listing.unitPrice ?? listing.pricePerUnit);
  const quantity = asNumber(listing.qty ?? listing.quantity ?? listing.totalQuantity);

  return {
    id,
    title: asString(listing.title ?? listing.name, productName),
    productName,
    qualityGrade: asString(listing.qualityGrade ?? listing.grade) || undefined,
    price,
    currency: asString(listing.currency, "USD"),
    unit: asString(listing.unit, "kg"),
    quantity,
    status: mapStatus(listing.status),
    views: asNumber(listing.views ?? listing.viewCount) ?? 0,
    rfqsReceived: asNumber(listing.rfqsReceived ?? listing.rfqCount ?? listing.rfqs) ?? 0,
    images,
    createdAt: asString(listing.createdAt) || undefined,
    updatedAt: asString(listing.updatedAt) || undefined,
  };
}

function mapListingsResponse(response: ApiListingsResponse): FarmerListing[] {
  const records = Array.isArray(response)
    ? response
    : response.listings ?? response.data ?? response.items ?? [];

  return records.map(mapListingFromApi).filter((listing) => listing.id);
}

function unwrapListingResponse(response: unknown) {
  const responseRecord = asRecord(response);

  return responseRecord.listing ?? responseRecord.data ?? responseRecord;
}

export async function getFarmerListings() {
  const response = await apiRequest<ApiListingsResponse>("/listings/my", { auth: true });
  return mapListingsResponse(response);
}

export async function getFarmerListingById(id: string) {
  const response = await apiRequest<ApiListingRecord>(`/listings/${id}`);
  return mapListingFromApi(response);
}

export async function createFarmerListing(payload: CreateFarmerListingPayload) {
  const response = await apiRequest<ApiListingRecord | { listing?: ApiListingRecord; data?: ApiListingRecord }>("/listings", {
    auth: true,
    body: payload,
    method: "POST",
  });

  return mapListingFromApi(unwrapListingResponse(response));
}

export async function updateFarmerListing(id: string, payload: Partial<CreateFarmerListingPayload>) {
  const response = await apiRequest<ApiListingRecord | { listing?: ApiListingRecord; data?: ApiListingRecord }>(`/listings/${id}`, {
    auth: true,
    body: payload,
    method: "PUT",
  });

  return mapListingFromApi(unwrapListingResponse(response));
}

export async function deleteFarmerListing(id: string) {
  await apiRequest(`/listings/${id}`, { auth: true, method: "DELETE" });
}

export async function uploadListingImages(listingId: string, files: File[]) {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  await apiRequest(`/listings/${listingId}/images`, {
    auth: true,
    body: formData,
    method: "PATCH",
  });
}

// Swagger does not currently document publish or draft endpoints.
// Keep publish status transitions and Save Draft mocked until endpoints are added.
