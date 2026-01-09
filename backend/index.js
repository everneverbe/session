import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// LOAD DATA
const dataPath = path.join(__dirname, "data", "cases.json");
const cases = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// ROOT CHECK
app.get("/", (req, res) => {
  res.send("Session backend is running");
});

// API
app.get("/api/cases", (req, res) => {
  res.json(cases);
});

// IMPORTANT: RAILWAY PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
