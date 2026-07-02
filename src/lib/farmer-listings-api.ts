import { apiRequest } from "@/lib/api";
import type { Listing, ListingStatus, ListingType, QualityGrade } from "@/types";
import type { CreateFarmerListingPayload, FarmerListing, FarmerListingStatus } from "@/types/listing";

type ApiListingRecord = Record<string, unknown>;

const DEFAULT_LISTING_IMAGE = "/images/farmer/create-listing/placeholders/listing-photo-placeholder-1.jpg";

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

function asDateString(value: unknown, fallback = "Not available") {
  return asString(value, fallback);
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

function mapListingType(value: unknown): ListingType {
  const normalizedType = asString(value, "fresh_produce").toLowerCase();

  if (["fresh_produce", "processed_goods", "grains", "livestock", "inputs"].includes(normalizedType)) {
    return normalizedType as ListingType;
  }

  return "fresh_produce";
}

function mapMarketplaceStatus(value: unknown): ListingStatus {
  const normalizedStatus = asString(value, "active").toLowerCase();

  if (["draft", "active", "reserved", "sold", "inactive"].includes(normalizedStatus)) {
    return normalizedStatus as ListingStatus;
  }

  return "active";
}

function mapQualityGrade(value: unknown): QualityGrade | undefined {
  const normalizedGrade = asString(value).toUpperCase();

  if (["A", "B", "C"].includes(normalizedGrade)) {
    return normalizedGrade as QualityGrade;
  }

  if (normalizedGrade === "REJECTED") {
    return "Rejected";
  }

  return undefined;
}

export function mapListingFromApi(apiListing: unknown): FarmerListing {
  const listing = asRecord(apiListing);
  const id = String(listing.id ?? listing._id ?? listing.uuid ?? "");
  // TODO: Backend response fields are not fully documented; using safe fallback names.
  const productName = asString(listing.productName ?? listing.name ?? listing.title ?? listing.category, "Unnamed Listing");
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

export function mapMarketplaceListingFromApi(apiListing: unknown): Listing {
  const listing = asRecord(apiListing);
  const id = String(listing.id ?? listing._id ?? listing.uuid ?? "");
  const images = mapImages(listing.images ?? listing.imageUrls ?? listing.photos ?? listing.image ?? listing.imageUrl);
  const name = asString(listing.title ?? listing.name ?? listing.productName ?? listing.category, "Unnamed Listing");
  const quantity = asNumber(listing.qty ?? listing.quantity ?? listing.totalQuantity) ?? 0;
  const rawUnit = asString(listing.unit, "kg");
  const unit: Listing["unit"] = ["kg", "ton", "box", "crate", "liter"].includes(rawUnit) ? (rawUnit as Listing["unit"]) : "kg";
  const price = asNumber(listing.price ?? listing.unitPrice ?? listing.pricePerUnit) ?? 0;

  return {
    id,
    farmerId: String(listing.farmerId ?? "unknown-farmer"),
    title: name,
    type: mapListingType(listing.type ?? listing.productType),
    crop: asString(listing.crop ?? listing.category ?? listing.productName ?? listing.name, name),
    description: asString(listing.description, "No description provided."),
    quantity,
    unit,
    pricePerUnit: price,
    currency: "USD",
    location: asString(listing.location ?? listing.region, "Location not provided"),
    harvestDate: asDateString(listing.harvestDate ?? listing.harvestedAt ?? listing.expiry),
    availableFrom: asDateString(listing.availableFrom ?? listing.createdAt ?? listing.updatedAt),
    status: mapMarketplaceStatus(listing.status),
    qualityGrade: mapQualityGrade(listing.qualityGrade ?? listing.grade),
    certifications: Array.isArray(listing.certifications) ? listing.certifications.filter((item): item is string => typeof item === "string") : [],
    // TODO: Backend may omit listing images; using stable local fallback image.
    imageUrl: images[0] ?? DEFAULT_LISTING_IMAGE,
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

export async function getPublicListings() {
  const response = await apiRequest<ApiListingsResponse>("/listings");
  const records = Array.isArray(response) ? response : response.listings ?? response.data ?? response.items ?? [];

  return records.map(mapMarketplaceListingFromApi).filter((listing) => listing.id);
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
