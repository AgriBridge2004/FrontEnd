import { apiRequest } from "@/lib/api";
import type { Listing, ListingStatus, ListingType, QualityGrade } from "@/types";
import type { CreateFarmerListingPayload, FarmerListing, FarmerListingStatus } from "@/types/listing";

type ApiListingRecord = Record<string, unknown>;

const DEFAULT_LISTING_IMAGE = "/images/farmer/create-listing/placeholders/listing-photo-placeholder-1.jpg";

export type BackendListing = {
  id: string;
  name: string;
  productType?: string;
  category?: string;
  description?: string;
  qty?: number;
  unit?: string;
  price?: number;
  location?: string;
  expiry?: string;
  status?: string;
  images?: string[] | string | null;
  farmerId?: string;
  farmer?: {
    id?: string;
    fullName?: string;
    farmName?: string;
    bio?: string;
    region?: string;
    profileImage?: string | null;
  };
  createdAt?: string;
  updatedAt?: string;
};

type ApiListingsResponse =
  | ApiListingRecord[]
  | {
      listings?: ApiListingRecord[];
      data?: ApiListingRecord[] | { listings?: ApiListingRecord[]; items?: ApiListingRecord[] };
      items?: ApiListingRecord[];
    };

export type PublicListingsQuery = {
  search?: string;
  category?: string;
  productType?: "Plant" | "Animal";
  location?: string;
  price_min?: number;
  price_max?: number;
  qty_min?: number;
  qty_max?: number;
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

export function normalizeListingImages(value: unknown): string[] {
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

  if (normalizedStatus === "available") {
    return "active";
  }

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
  const productName = asString(listing.name ?? listing.productName ?? listing.title ?? listing.category, "Unnamed Listing");
  const images = normalizeListingImages(listing.images ?? listing.imageUrls ?? listing.photos ?? listing.image ?? listing.imageUrl);
  const price = asNumber(listing.price ?? listing.unitPrice ?? listing.pricePerUnit);
  const quantity = asNumber(listing.qty ?? listing.quantity ?? listing.totalQuantity);

  return {
    id,
    title: asString(listing.name ?? listing.title, productName),
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
  const images = normalizeListingImages(listing.images ?? listing.imageUrls ?? listing.photos ?? listing.image ?? listing.imageUrl);
  const name = asString(listing.name ?? listing.title ?? listing.productName ?? listing.category, "Unnamed Listing");
  const quantity = asNumber(listing.qty ?? listing.quantity ?? listing.totalQuantity);
  const unit = asString(listing.unit, "kg");
  const price = asNumber(listing.price ?? listing.unitPrice ?? listing.pricePerUnit);
  const category = asString(listing.category ?? listing.crop ?? listing.productName ?? listing.name, name);
  const productType = asString(listing.productType ?? listing.type, "");
  const expiry = asString(listing.expiry ?? listing.harvestDate ?? listing.harvestedAt);
  const farmer = asRecord(listing.farmer);

  return {
    id,
    farmerId: String(listing.farmerId ?? ""),
    title: name,
    name,
    type: mapListingType(listing.type ?? listing.productType),
    productType,
    category,
    crop: category,
    description: asString(listing.description, "No description provided."),
    quantity,
    qty: quantity,
    unit,
    pricePerUnit: price,
    currency: "USD",
    location: asString(listing.location ?? listing.region, "Location not provided"),
    // Backend does not provide harvestDate; using expiry as the available date field.
    harvestDate: asDateString(listing.harvestDate ?? listing.harvestedAt ?? listing.expiry),
    expiry,
    availableFrom: asDateString(listing.availableFrom ?? listing.createdAt ?? listing.updatedAt),
    status: mapMarketplaceStatus(listing.status),
    statusLabel: asString(listing.status),
    farmerName: asString(farmer.fullName ?? farmer.name),
    farmerFarmName: asString(farmer.farmName),
    farmerRegion: asString(farmer.region),
    farmerBio: asString(farmer.bio),
    qualityGrade: mapQualityGrade(listing.qualityGrade ?? listing.grade),
    certifications: Array.isArray(listing.certifications) ? listing.certifications.filter((item): item is string => typeof item === "string") : [],
    images,
    imageUrl: images[0] ?? DEFAULT_LISTING_IMAGE,
    createdAt: asString(listing.createdAt) || undefined,
    updatedAt: asString(listing.updatedAt) || undefined,
  };
}

function mapListingsResponse(response: ApiListingsResponse): FarmerListing[] {
  return extractListingsResponse(response).map(mapListingFromApi).filter((listing) => listing.id);
}

function extractListingsResponse(response: ApiListingsResponse): ApiListingRecord[] {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response.listings)) {
    return response.listings;
  }

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (Array.isArray(response.items)) {
    return response.items;
  }

  const dataRecord = asRecord(response.data);

  if (Array.isArray(dataRecord.listings)) {
    return dataRecord.listings as ApiListingRecord[];
  }

  if (Array.isArray(dataRecord.items)) {
    return dataRecord.items as ApiListingRecord[];
  }

  return [];
}

function unwrapListingResponse(response: unknown) {
  const responseRecord = asRecord(response);

  return responseRecord.listing ?? responseRecord.data ?? responseRecord;
}

function buildListingsQuery(params?: PublicListingsQuery) {
  if (!params) {
    return "";
  }

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== "All locations") {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export async function getFarmerListings() {
  const response = await apiRequest<ApiListingsResponse>("/listings/my", { auth: true });
  return mapListingsResponse(response);
}

export async function getPublicListings(params?: PublicListingsQuery) {
  const response = await apiRequest<ApiListingsResponse>(`/listings${buildListingsQuery(params)}`);
  const records = extractListingsResponse(response);

  return records.map(mapMarketplaceListingFromApi).filter((listing) => listing.id);
}

export async function getFarmerListingById(id: string) {
  const response = await apiRequest<ApiListingRecord | { listing?: ApiListingRecord; data?: ApiListingRecord }>(`/listings/${id}`);
  return mapListingFromApi(unwrapListingResponse(response));
}

export async function getPublicListingById(id: string) {
  const response = await apiRequest<ApiListingRecord | { listing?: ApiListingRecord; data?: ApiListingRecord }>(`/listings/${id}`);
  const apiListing = unwrapListingResponse(response);
  const normalizedListing = mapMarketplaceListingFromApi(apiListing);

  if (process.env.NODE_ENV === "development") {
    console.log("[Listing Detail] raw API listing:", apiListing);
    console.log("[Listing Detail] normalized listing:", normalizedListing);
  }

  return normalizedListing;
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
