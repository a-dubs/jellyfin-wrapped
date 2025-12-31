import { Api, Jellyfin } from "@jellyfin/sdk";

const JELLYFIN_SERVER_URL = process.env.JELLYFIN_SERVER_URL!;
const JELLYFIN_API_KEY = process.env.JELLYFIN_API_KEY!;

if (!JELLYFIN_SERVER_URL) {
  throw new Error("JELLYFIN_SERVER_URL environment variable is required");
}

if (!JELLYFIN_API_KEY) {
  throw new Error("JELLYFIN_API_KEY environment variable is required");
}

export const proxyPlaybackQuery = async (
  queryString: string
): Promise<{
  colums: string[];
  results: string[][];
}> => {
  // Create admin API instance (server-side only)
  const jellyfin = new Jellyfin({
    clientInfo: {
      name: "Jellyfin-Wrapped-Backend",
      version: "1.0.0",
    },
    deviceInfo: {
      name: "Jellyfin-Wrapped-Backend",
      id: "Jellyfin-Wrapped-Backend",
    },
  });

  const adminApi = jellyfin.createApi(JELLYFIN_SERVER_URL, JELLYFIN_API_KEY);

  // Make request to Jellyfin with admin API key
  const res = await fetch(
    `${adminApi.basePath}/user_usage_stats/submit_custom_query?stamp=${Date.now()}`,
    {
      method: "POST",
      headers: {
        "X-Emby-Token": JELLYFIN_API_KEY, // Server-side only!
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CustomQueryString: queryString,
        ReplaceUserId: true,
      }),
    }
  );

  const text = await res.text();

  if (!text) {
    throw new Error("Empty response from Jellyfin server");
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
