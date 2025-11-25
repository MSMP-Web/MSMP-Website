const express = require("express");
const router = express.Router();
const Voice = require("../models/Voice");

// GET all
router.get("/", async (req, res) => {
  try {
    const items = await Voice.find().sort({ id: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE all voices (clear)
router.delete("/", async (req, res) => {
  try {
    await Voice.deleteMany({});
    res.json({ ok: true, deletedAll: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET by id
router.get("/:id", async (req, res) => {
  try {
    const item = await Voice.findOne({ id: Number(req.params.id) });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create
// router.post("/", async (req, res) => {
//   try {
//     const created = await Voice.create(req.body);
//     res.status(201).json(created);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// POST create or update by id
router.post("/", async (req, res) => {
  try {
    const updated = await Voice.findOneAndUpdate(
      { id: req.body.id }, // match by event ID
      req.body,
      {
        new: true,
        upsert: true, // <––– this prevents duplicates forever
      }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update by id
router.put("/:id", async (req, res) => {
  try {
    const updated = await Voice.findOneAndUpdate(
      { id: Number(req.params.id) },
      req.body,
      {
        new: true,
        upsert: false,
      }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE by id
// router.delete("/:id", async (req, res) => {
//   try {
//     const deleted = await Voice.findOneAndDelete({
//       position: Number(req.params.position),
//     });
//     console.log(deleted);
//     if (!deleted) return res.status(404).json({ error: "Not found" });
//     res.json({ ok: true });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Voice.findOneAndDelete({
      id: Number(req.params.id),
    });

    if (!deleted) return res.status(404).json({ error: "Not found" });

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
