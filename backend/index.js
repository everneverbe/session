import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// === FIX PATH ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === LOAD CASES SAFELY ===
const casesPath = path.join(__dirname, "data", "cases.json");
const cases = JSON.parse(fs.readFileSync(casesPath, "utf-8"));

// === API ===
app.get("/api/cases", (req, res) => {
  res.json(cases);
});

// === HEALTH CHECK ===
app.get("/", (req, res) => {
  res.send("Session backend is running");
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
