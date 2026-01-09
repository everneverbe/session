import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const HOST = "0.0.0.0";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== LOAD DATA =====
const casesPath = path.join(__dirname, "data", "cases.json");
const cases = JSON.parse(fs.readFileSync(casesPath, "utf-8"));

// ===== HEALTH CHECK (WAJIB) =====
app.get("/", (req, res) => {
  res.status(200).send("Session backend is running");
});

// ===== API =====
app.get("/api/cases", (req, res) => {
  res.json(cases);
});

// ===== START SERVER =====
app.listen(PORT, HOST, () => {
  console.log(`Backend running on http://${HOST}:${PORT}`);
});
