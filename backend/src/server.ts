import express from "express";
import cors from "cors";
import playbackReportingRouter from "./routes/playback-reporting.js";

const app = express();
const PORT = process.env.BACKEND_PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost";

// Middleware
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api/playback-reporting", playbackReportingRouter);

app.listen(PORT, () => {
  console.log(`Backend API server running on port ${PORT}`);
});
