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

// GET by id (uses Mongo _id)
router.get("/:id", async (req, res) => {
  try {
    const item = await Slide.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create
router.post("/", async (req, res) => {
  try {
    const created = await Slide.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update by id (uses Mongo _id)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Slide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE by id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Slide.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
