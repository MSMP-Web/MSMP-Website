// Cloudinary configuration for image storage
// This utility builds full image URLs from filenames stored in the database

const getImageUrl = (filename) => {
  if (!filename) return null;

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const folder = process.env.CLOUDINARY_FOLDER || "msmp/content";

  if (!cloudName) {
    console.warn("CLOUDINARY_CLOUD_NAME not set in environment");
    return null;
  }

  // Build Cloudinary URL: https://res.cloudinary.com/{cloud_name}/image/upload/{folder}/{filename}
  return `https://res.cloudinary.com/${cloudName}/image/upload/${folder}/${filename}`;
};

module.exports = { getImageUrl };
