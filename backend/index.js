import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// load cases.json
const dataPath = path.resolve("./data/cases.json");
const cases = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

app.get("/api/cases", (req, res) => {
  res.json(cases);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
