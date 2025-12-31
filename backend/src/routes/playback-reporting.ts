import { Router } from "express";
import { validateUserAuth } from "../middleware/auth.js";
import { proxyPlaybackQuery } from "../services/jellyfin-proxy.js";

const router = Router();

router.post("/query", validateUserAuth, async (req, res) => {
  try {
    const { queryString } = req.body;

    if (!queryString || typeof queryString !== "string") {
      return res.status(400).json({ error: "queryString is required" });
    }

    const result = await proxyPlaybackQuery(queryString);
    res.json(result);
  } catch (error) {
    console.error("Playback reporting error:", error);
    res.status(500).json({
      error: "Failed to execute query",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
