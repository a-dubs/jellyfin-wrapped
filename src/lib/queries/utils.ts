import { format } from "date-fns";
import { getCurrentTimeframe } from "../timeframe";
import { getAuthenticatedJellyfinApi, getBackendApiUrl } from "../jellyfin-api";

export const getStartDate = (): Date => {
  return getCurrentTimeframe().startDate;
};

export const getEndDate = (): Date => {
  return getCurrentTimeframe().endDate;
};

export const formatDateForSql = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

export const getCurrentUserId = async (): Promise<string> => {
  const { getUserApi } = await import("@jellyfin/sdk/lib/utils/api");
  const { getAuthenticatedJellyfinApi } = await import("../jellyfin-api");
  const { getCacheValue, setCacheValue, JELLYFIN_CURRENT_USER_CACHE_KEY } =
    await import("../cache");

  const cachedUserId = getCacheValue(JELLYFIN_CURRENT_USER_CACHE_KEY);
  if (cachedUserId) {
    return cachedUserId;
  }

  const authenticatedApi = await getAuthenticatedJellyfinApi();
  const userApi = getUserApi(authenticatedApi);
  const user = await userApi.getCurrentUser();
  const userId = user.data.Id ?? "";
  setCacheValue(JELLYFIN_CURRENT_USER_CACHE_KEY, userId);
  return userId;
};

export const playbackReportingSqlRequest = async (
  queryString: string
): Promise<{
  colums: string[];
  results: string[][];
}> => {
  // Get user's auth token (not admin key!)
  const authenticatedApi = await getAuthenticatedJellyfinApi();
  const userAuthToken = authenticatedApi.accessToken;

  if (!userAuthToken) {
    throw new Error("User authentication required");
  }

  // Call backend API instead of Jellyfin directly
  const backendUrl = getBackendApiUrl();
  const res = await fetch(`${backendUrl}/playback-reporting/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User-Auth-Token": userAuthToken, // User token, not admin key
    },
    body: JSON.stringify({
      queryString,
    }),
  });

  if (!res.ok) {
    const errorResponse = (await res
      .json()
      .catch(() => ({ error: "Unknown error" }))) as { error?: string };
    throw new Error(errorResponse.error || `HTTP ${res.status}`);
  }

  const text = await res.text();

  if (!text) {
    throw new Error("Empty response from backend");
  }

  try {
    return JSON.parse(text) as {
      colums: string[];
      results: string[][];
    };
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    console.error("Response was:", text);
    throw new Error(`Invalid JSON response: ${text.substring(0, 200)}`);
  }
};
