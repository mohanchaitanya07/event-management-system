import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import profileRoutes from "./routes/profileRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/profiles", profileRoutes);
app.use("/api/events", eventRoutes);
app.use(errorHandler);
export default app;
