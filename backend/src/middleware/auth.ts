import { Request, Response, NextFunction } from "express";
import { Api, Jellyfin } from "@jellyfin/sdk";

const JELLYFIN_SERVER_URL = process.env.JELLYFIN_SERVER_URL!;

if (!JELLYFIN_SERVER_URL) {
  throw new Error("JELLYFIN_SERVER_URL environment variable is required");
}

// Extend Express Request type to include user info
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userAuthToken?: string;
    }
  }
}

export const validateUserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userAuthToken = req.headers["x-user-auth-token"] as string;

  if (!userAuthToken) {
    return res
      .status(401)
      .json({ error: "User authentication token required" });
  }

  try {
    // Validate token with Jellyfin
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

    const api = jellyfin.createApi(JELLYFIN_SERVER_URL, userAuthToken);
    const { getUserApi } = await import("@jellyfin/sdk/lib/utils/api");
    const userApi = getUserApi(api);
    const user = await userApi.getCurrentUser();

    // Attach user info to request for later use
    req.userId = user.data.Id;
    req.userAuthToken = userAuthToken;

    next();
  } catch (error) {
    console.error("Auth validation failed:", error);
    return res.status(401).json({ error: "Invalid authentication token" });
  }
};
