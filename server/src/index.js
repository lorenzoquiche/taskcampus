import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import {
  apiNotFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET debe estar configurado");
}

const app = express();
const port = process.env.PORT || 3000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: clientUrl }));
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", name: "TaskCampus API" });
});

app.use("/api/auth", authRoutes);
app.use("/api", apiNotFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`TaskCampus API running on port ${port}`);
});
