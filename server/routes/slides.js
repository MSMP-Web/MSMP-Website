const express = require("express");
const router = express.Router();
const Slide = require("../models/Slide");

// GET all
router.get("/", async (req, res) => {
  try {
    const items = await Slide.find().sort({ id: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET by id (numeric id field)
router.get("/:id", async (req, res) => {
  try {
    const item = await Slide.findOne({ id: Number(req.params.id) });
    if (!item) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create - require client-provided numeric id (use event id)
router.post("/", async (req, res) => {
  try {
    // Require an id in the request body (this should be the event id)
    if (!req.body || (req.body.id === undefined || req.body.id === null)) {
      return res.status(400).json({ error: "`id` (event id) is required in request body" });
    }

    const idToUse = Number(req.body.id);
    if (Number.isNaN(idToUse)) {
      return res.status(400).json({ error: "`id` must be a numeric event id" });
    }

    const dataWithId = { ...req.body, id: idToUse };

    // Prevent duplicate slides for the same event id
    const existing = await Slide.findOne({ id: idToUse });
    if (existing) {
      return res.status(400).json({ error: `Slide for event id ${idToUse} already exists` });
    }

    const created = await Slide.create(dataWithId);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update by numeric id
router.put("/:id", async (req, res) => {
  try {
    const updated = await Slide.findOneAndUpdate({ id: Number(req.params.id) }, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE by numeric id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Slide.findOneAndDelete({ id: Number(req.params.id) });
    if (!deleted) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
