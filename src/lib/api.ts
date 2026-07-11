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
import { clearAuthSession, logoutAndRedirectHome } from "@/lib/auth-storage";

export const DEFAULT_API_TIMEOUT_MS = 60_000;

const DEFAULT_API_BASE_URL = "https://backend-rog8.onrender.com";
const AUTH_TOKEN_KEYS = [
  "agribridge_access_token",
  "agribridge:auth-token",
  "agribridge:access-token",
  "agribridge:token",
  "accessToken",
  "token",
];

type ApiRequestDebugOptions = {
  label: string;
  body?: unknown;
};

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  auth?: boolean;
  body?: unknown;
  debug?: ApiRequestDebugOptions;
  timeoutMs?: number;
};

export class ApiError extends Error {
  status?: number;
  code?: string;
  details?: unknown;

  constructor(message: string, status?: number, code?: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function getApiBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL).replace(/\/+$/, "");
}

function getApiTimeoutMs() {
  const configuredTimeout = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS);

  if (Number.isFinite(configuredTimeout) && configuredTimeout > 0) {
    return configuredTimeout;
  }

  return DEFAULT_API_TIMEOUT_MS;
}

function buildApiUrl(baseUrl: string, path: string) {
  return `${baseUrl}/${path.replace(/^\/+/, "")}`;
}

function isFormDataBody(value: unknown): value is FormData {
  return typeof FormData !== "undefined" && value instanceof FormData;
}

function isFileBody(value: unknown): value is File {
  return typeof File !== "undefined" && value instanceof File;
}

function getStoredAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }

  for (const key of AUTH_TOKEN_KEYS) {
    const token = window.localStorage.getItem(key);

    if (token) {
      return token;
    }
  }

  return null;
}

function removeUndefinedFields(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(removeUndefinedFields);
  }

  if (value && typeof value === "object" && !isFileBody(value) && !isFormDataBody(value)) {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, entryValue]) => entryValue !== undefined)
        .map(([key, entryValue]) => [key, removeUndefinedFields(entryValue)]),
    );
  }

  return value;
}

export function clearStoredAuth() {
  clearAuthSession();
}

export function redirectToLogin() {
  logoutAndRedirectHome();
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
    return getErrorMessage(data, "This item already exists.");
  }

  if (status === 401) {
    return "Invalid email or password.";
  }

  if (status === 500) {
    return "Server error. Please try again later.";
  }

  if (status === 400) {
    return getErrorMessage(data, "Something went wrong. Please check your information and try again.");
  }

  return getErrorMessage(data, "Something went wrong. Please try again.");
}

function getAuthenticatedStatusErrorMessage(status: number, data: unknown) {
  if (status === 401) {
    return "Your session has expired. Please sign in again.";
  }

  if (status === 403) {
    return "You do not have permission to access this resource.";
  }

  if (status === 404) {
    return getErrorMessage(data, "Requested resource was not found.");
  }

  return getStatusErrorMessage(status, data);
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

  const missingRouteMatch = text.match(/^Cannot\s+(GET|POST|PUT|PATCH|DELETE)\s+(.+)$/i);

  if (missingRouteMatch?.[2]) {
    return `Endpoint not found: ${missingRouteMatch[2].trim()}`;
  }

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
    console.debug(label, data);
  }
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    throw new ApiError("NEXT_PUBLIC_API_BASE_URL is not configured.", undefined, "CONFIGURATION_ERROR");
  }

  const { auth = false, body, debug, headers, method = "GET", timeoutMs = getApiTimeoutMs(), ...requestOptions } = options;
  const url = buildApiUrl(baseUrl, path);
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), timeoutMs);
  const logLabel = debug?.label ? `[api:${debug.label}]` : "[api]";
  const token = getStoredAuthToken();
  const requestHeaders = new Headers(headers);
  const isFormData = isFormDataBody(body);

  requestHeaders.set("Accept", "application/json");

  if (auth && !token) {
    redirectToLogin();
    throw new ApiError("Your session has expired. Please sign in again.", 401, "UNAUTHORIZED");
  }

  if (auth && token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  if (body !== undefined && !isFormData && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const requestBody: BodyInit | undefined =
    body === undefined ? undefined : isFormData ? body : JSON.stringify(removeUndefinedFields(body));

  debugLog(`${logLabel} request`, { method, url });

  try {
    const response = await fetch(url, {
      ...requestOptions,
      method,
      headers: requestHeaders,
      body: requestBody,
      signal: controller.signal,
    });

    const data = await parseResponse(response);

    debugLog(`${logLabel} response`, { method, url, status: response.status });

    if (!response.ok) {
      if (auth && response.status === 401) {
        clearStoredAuth();
        redirectToLogin();
      }

      throw new ApiError(
        auth ? getAuthenticatedStatusErrorMessage(response.status, data) : getStatusErrorMessage(response.status, data),
        response.status,
        undefined,
        data,
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error && typeof error === "object" && "name" in error && error.name === "AbortError") {
      debugLog(`${logLabel} timeout`, { method, url, timeoutMs });
      throw new ApiError("Request timed out. Please try again.", undefined, "TIMEOUT");
    }

    throw new ApiError(
      "Unable to connect to the server. Please check the API configuration.",
      undefined,
      "NETWORK_ERROR",
      error,
    );
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

export async function apiBlobRequest(path: string, options: ApiRequestOptions = {}): Promise<Blob> {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    throw new ApiError("NEXT_PUBLIC_API_BASE_URL is not configured.", undefined, "CONFIGURATION_ERROR");
  }

  const { auth = false, body, debug, headers, method = "GET", timeoutMs = getApiTimeoutMs(), ...requestOptions } = options;
  const url = buildApiUrl(baseUrl, path);
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), timeoutMs);
  const logLabel = debug?.label ? `[api:${debug.label}]` : "[api]";
  const token = getStoredAuthToken();
  const requestHeaders = new Headers(headers);
  const isFormData = isFormDataBody(body);

  if (auth && !token) {
    redirectToLogin();
    throw new ApiError("Your session has expired. Please sign in again.", 401, "UNAUTHORIZED");
  }

  if (auth && token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  if (body !== undefined && !isFormData && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const requestBody: BodyInit | undefined =
    body === undefined ? undefined : isFormData ? body : JSON.stringify(removeUndefinedFields(body));

  debugLog(`${logLabel} request`, { method, url });

  try {
    const response = await fetch(url, {
      ...requestOptions,
      method,
      headers: requestHeaders,
      body: requestBody,
      signal: controller.signal,
    });

    debugLog(`${logLabel} response`, { method, url, status: response.status });

    if (!response.ok) {
      const data = await parseResponse(response);
      if (auth && response.status === 401) {
        clearStoredAuth();
        redirectToLogin();
      }

      throw new ApiError(
        auth ? getAuthenticatedStatusErrorMessage(response.status, data) : getStatusErrorMessage(response.status, data),
        response.status,
        undefined,
        data,
      );
    }

    return response.blob();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error && typeof error === "object" && "name" in error && error.name === "AbortError") {
      debugLog(`${logLabel} timeout`, { method, url, timeoutMs });
      throw new ApiError("Request timed out. Please try again.", undefined, "TIMEOUT");
    }

    throw new ApiError(
      "Unable to connect to the server. Please check the API configuration.",
      undefined,
      "NETWORK_ERROR",
      error,
    );
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
