import { getAccessToken, getStoredUser } from "@/lib/auth-storage";
import { getFarmerProfile } from "@/lib/farmer-profile-api";
import { normalizeRole } from "@/lib/profile-completion";
import { createDeal, getDealMessages, getMyDeals, sendDealMessage, type ApiRecord } from "@/lib/workflow-api";
import type { Listing } from "@/types";
import type { AuthUser } from "@/types/auth";

export type ListingInteractionUser = {
  isAuthenticated: boolean;
  role: ReturnType<typeof normalizeRole>;
  user: AuthUser | null;
};

export function getListingInteractionUser(): ListingInteractionUser {
  const user = getStoredUser();
  const token = getAccessToken();

  return {
    isAuthenticated: Boolean(user && token),
    role: normalizeRole(user?.role),
    user,
  };
}

export function canSaveListing(role: ListingInteractionUser["role"]) {
  return role === "buyer" || role === "farmer";
}

export function canMessageFarmer(role: ListingInteractionUser["role"]) {
  return role === "buyer";
}

export async function isOwnFarmerListing(listing: Pick<Listing, "farmerId">, user: AuthUser | null, role: ListingInteractionUser["role"]) {
  if (role !== "farmer" || !listing.farmerId) {
    return false;
  }

  const userId = getString(user?.id ?? user?.userId);

  if (userId && userId === listing.farmerId) {
    return true;
  }

  const storedProfile = asRecord(user?.profile);
  const storedFarmerId = getString(user?.farmerId ?? storedProfile.id ?? storedProfile._id);
  const storedFarmerUserId = getString(storedProfile.userId);

  if (storedFarmerId === listing.farmerId || storedFarmerUserId === listing.farmerId) {
    return true;
  }

  try {
    const profile = await getFarmerProfile();
    return profile.id === listing.farmerId || profile.userId === listing.farmerId;
  } catch {
    return false;
  }
}

export async function findExistingListingDeal(listing: Pick<Listing, "id" | "farmerId">) {
  const deals = await getMyDeals();

  return deals.find((deal) => dealMatchesListing(deal, listing));
}

export function getRecordId(record: ApiRecord | undefined) {
  const wrappedDeal = asRecord(record?.deal ?? record?.data);

  return getString(record?.id ?? record?._id ?? wrappedDeal.id ?? wrappedDeal._id);
}

export function mapListingToCreateDealPayload(listing: Pick<Listing, "id" | "farmerId" | "name" | "title" | "pricePerUnit">) {
  if (!listing.pricePerUnit && listing.pricePerUnit !== 0) {
    throw new Error("Listing price is required to create a deal.");
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return {
    source: "listing" as const,
    listingId: listing.id,
    farmerId: listing.farmerId,
    price: listing.pricePerUnit,
    quantity: 1,
    deliveryDate: tomorrow.toISOString().slice(0, 10),
    notes: `Started from marketplace listing: ${listing.name ?? listing.title ?? listing.id}`,
  };
}

export async function createOrReuseListingDeal(listing: Pick<Listing, "id" | "farmerId" | "name" | "title" | "pricePerUnit">) {
  const existingDeal = await findExistingListingDeal(listing);
  const existingDealId = getRecordId(existingDeal);

  if (existingDealId) {
    const messages = await getDealMessages(existingDealId);
    let firstMessageSent = false;
    let firstMessageFailed = false;

    if (messages.length === 0) {
      try {
        await sendDealMessage(existingDealId, { text: "Hi" });
        firstMessageSent = true;
      } catch {
        firstMessageFailed = true;
      }
    }

    return {
      dealId: existingDealId,
      firstMessageFailed,
      firstMessageSent,
      reused: true,
    };
  }

  const createdDeal = await createDeal(mapListingToCreateDealPayload(listing));
  const createdDealId = getRecordId(createdDeal);

  if (!createdDealId) {
    throw new Error("Deal was created without an id.");
  }

  try {
    await sendDealMessage(createdDealId, { text: "Hi" });

    return {
      dealId: createdDealId,
      firstMessageFailed: false,
      firstMessageSent: true,
      reused: false,
    };
  } catch {
    return {
      dealId: createdDealId,
      firstMessageFailed: true,
      firstMessageSent: false,
      reused: false,
    };
  }
}

function dealMatchesListing(deal: ApiRecord, listing: Pick<Listing, "id" | "farmerId">) {
  const dealListing = asRecord(deal.listing);
  const dealFarmer = asRecord(deal.farmer ?? deal.seller);
  const status = getString(deal.status)?.toLowerCase();
  const source = getString(deal.source)?.toLowerCase();
  const listingId = getString(deal.listingId ?? dealListing.id ?? dealListing._id);
  const farmerId = getString(deal.farmerId ?? dealFarmer.id ?? dealFarmer._id);
  const isOpen = status !== "closed" && status !== "cancelled";

  return source === "listing" && isOpen && listingId === listing.id && (!listing.farmerId || !farmerId || farmerId === listing.farmerId);
}

function asRecord(value: unknown): ApiRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as ApiRecord) : {};
}

function getString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}
