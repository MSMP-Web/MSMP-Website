const express = require("express");
const router = express.Router();
const { getImageUrl } = require("../config/cloudinary");

// Endpoint to resolve image filename to full Cloudinary URL
// Usage: GET /api/images/filename.jpg => returns { url: "https://res.cloudinary.com/.../filename.jpg" }
router.get("/:filename", (req, res) => {
  const { filename } = req.params;

  if (!filename) {
    return res.status(400).json({ error: "filename required" });
  }

  const url = getImageUrl(filename);
  if (!url) {
    return res.status(500).json({ error: "Cloudinary not configured" });
  }

  res.json({ filename, url });
});

module.exports = router;
