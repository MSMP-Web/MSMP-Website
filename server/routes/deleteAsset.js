const express = require("express");
const router = express.Router();
const { v2: cloudinary } = require("cloudinary");

// Configure Cloudinary with credentials from environment
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * DELETE /api/delete-asset
 * Delete an asset (image or video) from Cloudinary
 * Requires authentication via Cloudinary API credentials
 * 
 * Request body:
 * {
 *   publicId: "msmp/highlights/images/filename" or similar
 * }
 */
router.post("/", async (req, res) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({ error: "publicId is required" });
    }

    // Check if Cloudinary credentials are configured
    if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.warn("Cloudinary API credentials not configured. Skipping deletion.");
      return res.status(400).json({
        error: "Cloudinary API credentials not configured on server",
      });
    }

    // Delete the asset from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "auto", // Handle both images and videos
    });

    if (result.result === "ok" || result.result === "not found") {
      return res.json({
        ok: true,
        message: `Asset deleted: ${publicId}`,
        result: result.result,
      });
    } else {
      return res.status(400).json({
        error: "Failed to delete asset from Cloudinary",
        result: result.result,
      });
    }
  } catch (err) {
    console.error("Error deleting asset from Cloudinary:", err);
    res.status(500).json({
      error: "Server error deleting asset",
      message: err.message,
    });
  }
});

module.exports = router;
