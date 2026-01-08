import express from "express";
import db from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { randomUUID } from "crypto";

const router = express.Router();

router.post("/", requireAuth, (req, res) => {
  const { caseId, personalNotes, personalReflection } = req.body;

  db.prepare(`
    INSERT INTO session_entries
    (id, user_id, case_id, personal_notes, personal_reflection)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    randomUUID(),
    req.user.id,
    caseId,
    personalNotes || "",
    JSON.stringify(personalReflection || {})
  );

  res.json({ success: true });
});

router.get("/", requireAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT * FROM session_entries WHERE user_id = ?
  `).all(req.user.id);

  res.json(rows.map(r => ({
    ...r,
    personal_reflection: JSON.parse(r.personal_reflection)
  })));
});

export default router;
