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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://backend-rog8.onrender.com";
const API_TIMEOUT_MS = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS ?? 60000);

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  auth?: boolean;
};

function getStoredAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }

  const tokenKeys = [
    "agribridge:auth-token",
    "agribridge:access-token",
    "agribridge:token",
    "accessToken",
    "token",
  ];

  for (const key of tokenKeys) {
    const token = window.localStorage.getItem(key);
    if (token) {
      return token;
    }
  }

  return null;
}

export function clearStoredAuth() {
  if (typeof window === "undefined") {
    return;
  }

  [
    "agribridge:auth-token",
    "agribridge:access-token",
    "agribridge:token",
    "agribridge:user",
    "accessToken",
    "token",
    "user",
  ].forEach((key) => window.localStorage.removeItem(key));
}

export function redirectToLogin() {
  if (typeof window !== "undefined") {
    window.location.assign("/auth/login");
  }
}

function getErrorMessage(status?: number, fallback?: string) {
  if (fallback) {
    return fallback;
  }

  switch (status) {
    case 400:
      return "Please check the submitted data and try again.";
    case 401:
      return "Your session has expired. Please sign in again.";
    case 403:
      return "You do not have permission to access this resource.";
    case 404:
      return "Requested resource was not found.";
    case 409:
      return "This resource already exists.";
    case 500:
      return "Server error. Please try again later.";
    default:
      return "Unable to connect to the server.";
  }
}

function removeUndefinedFields(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(removeUndefinedFields);
  }

  if (value && typeof value === "object" && !(value instanceof File) && !(value instanceof FormData)) {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, entryValue]) => entryValue !== undefined)
        .map(([key, entryValue]) => [key, removeUndefinedFields(entryValue)]),
    );
  }

  return value;
}

async function parseResponseBody(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function getApiUrl(path: string) {
  return `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  const url = getApiUrl(path);
  const token = getStoredAuthToken();
  const headers = new Headers(options.headers);
  const isFormData = options.body instanceof FormData;
  const { auth, body, ...requestOptions } = options;

  if (auth && !token) {
    redirectToLogin();
    throw new ApiError("Your session has expired. Please sign in again.", 401);
  }

  if (auth && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (body !== undefined && !isFormData) {
    headers.set("Content-Type", "application/json");
  }

  const requestBody: BodyInit | undefined =
    body === undefined
      ? undefined
      : isFormData
        ? (body as FormData)
        : JSON.stringify(removeUndefinedFields(body));

  try {
    const response = await fetch(url, {
      ...requestOptions,
      body: requestBody,
      headers,
      signal: controller.signal,
    });

    if (process.env.NODE_ENV === "development") {
      console.info("[api]", options.method ?? "GET", url, response.status);
    }

    const responseBody = await parseResponseBody(response);

    if (!response.ok) {
      const backendMessage =
        responseBody && typeof responseBody === "object" && "message" in responseBody
          ? String((responseBody as { message?: unknown }).message)
          : undefined;

      if (response.status === 401) {
        clearStoredAuth();
        redirectToLogin();
      }

      throw new ApiError(getErrorMessage(response.status, backendMessage), response.status);
    }

    return responseBody as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("Request timed out. Please try again.");
    }

    throw new ApiError("Unable to connect to the server.");
  } finally {
    window.clearTimeout(timeoutId);
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
