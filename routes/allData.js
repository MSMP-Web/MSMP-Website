const express = require("express");
const router = express.Router();
const AllData = require("../models/AllData");

// GET all
router.get("/", async (req, res) => {
  try {
    const items = await AllData.find().sort({ id: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET by id
router.get("/:id", async (req, res) => {
  try {
    const item = await AllData.findOne({ id: Number(req.params.id) });
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
    const lastDoc = await AllData.findOne().sort({ id: -1 }).limit(1);
    const nextId = lastDoc ? lastDoc.id + 1 : 1;
    
    // Add auto-incremented id to request body
    const dataWithId = { ...req.body, id: nextId };
    const created = await AllData.create(dataWithId);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update by id
router.put("/:id", async (req, res) => {
  try {
    const updated = await AllData.findOneAndUpdate({ id: Number(req.params.id) }, req.body, {
      new: true,
      upsert: false,
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE by id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await AllData.findOneAndDelete({ id: Number(req.params.id) });
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
