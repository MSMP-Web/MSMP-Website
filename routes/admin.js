const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

// Create admin (for convenience). Password will be hashed.
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "username and password required" });

    const existing = await Admin.findOne({ username });
    if (existing) return res.status(409).json({ error: "Admin already exists" });

    const hash = await bcrypt.hash(password, 10);
    const created = await Admin.create({ username, password: hash });
    res.status(201).json({ ok: true, admin: { username: created.username } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) return res.status(400).json({ ok: false, error: "name and password required" });

    const admin = await Admin.findOne({ username: name });
    if (!admin) return res.status(401).json({ ok: false, error: "Invalid credentials" });

    const stored = admin.password || "";
    let ok = false;
    // support bcrypt hashes and plain-text (legacy)
    if (stored.startsWith("$2a$") || stored.startsWith("$2b$") || stored.startsWith("$2y$")) {
      ok = await bcrypt.compare(password, stored);
    } else {
      ok = password === stored;
    }

    if (!ok) return res.status(401).json({ ok: false, error: "Invalid credentials" });

    // Successful login
    res.json({ ok: true, username: admin.username });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// List admins (dev)
router.get("/", async (req, res) => {
  try {
    const list = await Admin.find({}, { password: 0 }).sort({ username: 1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
