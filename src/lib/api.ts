import {
  adminStats,
  buyerProfiles,
  buyers,
  deals,
  disputes,
  farmerProfiles,
  farmers,
  inspections,
  listings,
  qualityOfficers,
  reviews,
  rfqs,
  users,
} from "@/lib/mock-data";

const DEFAULT_TIMEOUT_MS = 20_000;

type ApiRequestDebugOptions = {
  label: string;
  body?: unknown;
};

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  debug?: ApiRequestDebugOptions;
  timeoutMs?: number;
};

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL?.trim().replace(/\/$/, "") ?? "";
}

function getErrorMessage(data: unknown, fallback: string) {
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;

    if (typeof record.message === "string") {
      return formatErrorMessage(record.message, fallback);
    }

    if (Array.isArray(record.message)) {
      return record.message.filter((item) => typeof item === "string").join(" ");
    }

    if (typeof record.error === "string") {
      return record.error;
    }
  }

  return fallback;
}

function getStatusErrorMessage(status: number, data: unknown) {
  if (status === 409) {
    return "Email already exists.";
  }

  if (status === 500) {
    return "Server error. Please try again later.";
  }

  if (status === 400) {
    return getErrorMessage(data, "Something went wrong. Please check your information and try again.");
  }

  return getErrorMessage(data, "Something went wrong. Please try again.");
}

function formatErrorMessage(message: string, fallback: string) {
  if (!message.trim()) {
    return fallback;
  }

  const preMatch = message.match(/<pre>([\s\S]*?)<\/pre>/i);
  const text = (preMatch?.[1] ?? message)
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text || fallback;
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type");
  const text = await response.text();

  if (!text) {
    return null;
  }

  if (contentType?.includes("application/json")) {
    try {
      return JSON.parse(text);
    } catch {
      return { message: text };
    }
  }

  return { message: text };
}

function debugLog(label: string, data: unknown) {
  if (process.env.NODE_ENV === "development") {
    console.log(label, data);
  }
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    throw new ApiError("NEXT_PUBLIC_API_BASE_URL is not configured.", 0);
  }

  const { body, debug, headers, timeoutMs = DEFAULT_TIMEOUT_MS, ...requestOptions } = options;
  const url = `${baseUrl}${path}`;
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), timeoutMs);

  if (debug) {
    debugLog(`[api:${debug.label}] request`, {
      url,
      payload: debug.body ?? body,
    });
  }

  try {
    const response = await fetch(url, {
      ...requestOptions,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });

    const data = await parseResponse(response);

    if (debug) {
      debugLog(`[api:${debug.label}] response`, {
        status: response.status,
        body: data,
      });
    }

    if (!response.ok) {
      throw new ApiError(getStatusErrorMessage(response.status, data), response.status, data);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error && typeof error === "object" && "name" in error && error.name === "AbortError") {
      throw new ApiError("Request timed out. Please try again.", 0);
    }

    throw new ApiError("Unable to connect to the server. Please try again.", 0, error);
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

const wait = async () => {
  await new Promise((resolve) => setTimeout(resolve, 20));
};

export const api = {
  users: {
    async list() {
      await wait();
      return users;
    },
    async listFarmers() {
      await wait();
      return farmers;
    },
    async listBuyers() {
      await wait();
      return buyers;
    },
    async listQualityOfficers() {
      await wait();
      return qualityOfficers;
    },
  },
  profiles: {
    async listFarmerProfiles() {
      await wait();
      return farmerProfiles;
    },
    async listBuyerProfiles() {
      await wait();
      return buyerProfiles;
    },
  },
  listings: {
    async list() {
      await wait();
      return listings;
    },
    async getById(id: string) {
      await wait();
      return listings.find((listing) => listing.id === id) ?? null;
    },
    async listByFarmer(farmerId: string) {
      await wait();
      return listings.filter((listing) => listing.farmerId === farmerId);
    },
  },
  rfqs: {
    async list() {
      await wait();
      return rfqs;
    },
    async listByBuyer(buyerId: string) {
      await wait();
      return rfqs.filter((rfq) => rfq.buyerId === buyerId);
    },
  },
  deals: {
    async list() {
      await wait();
      return deals;
    },
    async listByFarmer(farmerId: string) {
      await wait();
      return deals.filter((deal) => deal.farmerId === farmerId);
    },
    async listByBuyer(buyerId: string) {
      await wait();
      return deals.filter((deal) => deal.buyerId === buyerId);
    },
  },
  inspections: {
    async list() {
      await wait();
      return inspections;
    },
    async getById(id: string) {
      await wait();
      return inspections.find((inspection) => inspection.id === id) ?? null;
    },
    async listByOfficer(officerId: string) {
      await wait();
      return inspections.filter((inspection) => inspection.officerId === officerId);
    },
  },
  disputes: {
    async list() {
      await wait();
      return disputes;
    },
  },
  reviews: {
    async list() {
      await wait();
      return reviews;
    },
  },
  admin: {
    async getDashboardStats() {
      await wait();
      return adminStats;
    },
  },
};
