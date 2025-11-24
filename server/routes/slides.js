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
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create - auto-increment id
router.post("/", async (req, res) => {
  try {
    // Get the last document to find the highest id
    const lastDoc = await Slide.findOne().sort({ id: -1 }).limit(1);
    const nextId = lastDoc ? lastDoc.id + 1 : 1;
    
    // Add auto-incremented id to request body
    const dataWithId = { ...req.body, id: nextId };
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
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE by numeric id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Slide.findOneAndDelete({ id: Number(req.params.id) });
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
