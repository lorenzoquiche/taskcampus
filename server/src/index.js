import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: clientUrl }));
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", name: "TaskCampus API" });
});

app.listen(port, () => {
  console.log(`TaskCampus API running on port ${port}`);
});
