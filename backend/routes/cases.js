import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const rows = db.prepare(`SELECT * FROM cases WHERE status = 'published'`).all();
  res.json(rows.map(r => ({
    ...r,
    meta: JSON.parse(r.meta),
    context: JSON.parse(r.context),
    decision: JSON.parse(r.decision),
    outcome: r.outcome ? JSON.parse(r.outcome) : null,
    reflection: JSON.parse(r.reflection)
  })));
});

router.get("/:id", (req, res) => {
  const r = db.prepare(`SELECT * FROM cases WHERE id = ?`).get(req.params.id);
  if (!r) return res.status(404).json({ error: "Not found" });

  res.json({
    ...r,
    meta: JSON.parse(r.meta),
    context: JSON.parse(r.context),
    decision: JSON.parse(r.decision),
    outcome: r.outcome ? JSON.parse(r.outcome) : null,
    reflection: JSON.parse(r.reflection)
  });
});

export default router;
