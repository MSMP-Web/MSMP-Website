// Utility to fetch image URLs from backend
// This allows images stored as filenames in the database to be resolved to full cloud URLs

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

/**
 * Get full image URL from filename stored in database
 * @param {string} filename - filename stored in database (e.g., "Campaign.png")
 * @returns {string|null} - Full Cloudinary URL or null if no filename
 */
export const getImageUrl = (filename) => {
  if (!filename) return null;
  return `${API_BASE}/api/images/${filename}`;
};

/**
 * Fetch image data from backend (optional, for getting both URL and metadata)
 * @param {string} filename - filename to resolve
 * @returns {Promise<object>} - { filename, url }
 */
export const fetchImageUrl = async (filename) => {
  if (!filename) return null;
  try {
    const res = await fetch(`${API_BASE}/api/images/${filename}`);
    if (!res.ok) throw new Error(`Failed to fetch image URL for ${filename}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching image URL:", err);
    return null;
  }
};

export default { getImageUrl, fetchImageUrl };
