// Utility to fetch image URLs from backend
// Supports both old local images and new Cloudinary images
// Old images: stored as filenames from public/images/ 
// New images: stored as Cloudinary URLs

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const CLOUDINARY_ENABLED = !!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

/**
 * Get full image URL from filename or path stored in database
 * Intelligently detects if it's an old local image or new Cloudinary image
 * @param {string} imageField - filename or URL stored in database
 * @returns {string|null} - Full URL (local or Cloudinary) or null if no image
 */
export const getImageUrl = (imageField) => {
  if (!imageField) return null;

  // If it's already a full URL (http/https), return as-is (Cloudinary URL)
  if (imageField.startsWith("http://") || imageField.startsWith("https://")) {
    return imageField;
  }

  // If it's a local path like /public/images/..., return as-is
  if (imageField.startsWith("/")) {
    return imageField;
  }

  // Otherwise, assume it's a filename - resolve through backend API
  // This supports both old images (returns as-is) and future Cloudinary resolution
  return `${API_BASE}/api/images/${imageField}`;
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

/**
 * Upload image file to Cloudinary and return filename
 * @param {File} file - image file to upload
 * @param {string} folder - Cloudinary folder path (e.g., "msmp/events")
 * @returns {Promise<string>} - Cloudinary filename/URL or null on error
 */
export const uploadImageToCloudinary = async (file, folder = "msmp/uploads") => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", folder);

  try {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      console.warn("Cloudinary not configured, image will be stored as filename only");
      return file.name; // Fall back to filename
    }

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.secure_url; // Return full URL
  } catch (err) {
    console.error("Error uploading to Cloudinary:", err);
    // Fall back to filename
    return file.name;
  }
};

export default { getImageUrl, fetchImageUrl, uploadImageToCloudinary };
