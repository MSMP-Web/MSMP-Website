# Cloudinary Frontend Image Upload Setup

## Overview
This guide explains how to enable unsigned image uploads from the frontend (admin forms) to Cloudinary.

## Prerequisites
- Cloudinary account already created
- `CLOUDINARY_CLOUD_NAME` configured in server `.env` ✅
- Frontend `.env` needs Cloudinary upload preset

## Setup Steps

### 1. Create Unsigned Upload Preset in Cloudinary

**Why unsigned?** Allows frontend to upload without exposing API keys.

1. Go to [Cloudinary Dashboard](https://cloudinary.com/console/c/homepage)
2. Navigate to **Settings** → **Upload**
3. Scroll down to **Upload presets** section
4. Click **"Add upload preset"**
5. Configure:
   - **Name**: `msmp_unsigned`
   - **Signing Mode**: `Unsigned` (important!)
   - **Folder**: `msmp/uploads` (or similar)
   - Click **"Save"**

### 2. Update Frontend .env

Add to `z:\MSMP-Website\.env`:

```dotenv
VITE_CLOUDINARY_CLOUD_NAME=dosa82yyz
VITE_CLOUDINARY_UPLOAD_PRESET=msmp_unsigned
```

Replace `dosa82yyz` with your actual cloud name if different.

### 3. How Frontend Upload Works

The `uploadImageToCloudinary()` function in `src/utils/imageHelper.js`:

1. Creates FormData with:
   - `file`: the image file
   - `upload_preset`: your unsigned preset name
   - `folder`: destination folder (e.g., `msmp/highlights`)

2. POSTs to Cloudinary's API:
   ```
   https://api.cloudinary.com/v1_1/{CLOUD_NAME}/image/upload
   ```

3. Returns `secure_url` - the full HTTPS URL to the uploaded image

4. This URL is stored in the database

### 4. Test Upload

1. Make sure `.env` has both variables:
   ```
   VITE_CLOUDINARY_CLOUD_NAME=dosa82yyz
   VITE_CLOUDINARY_UPLOAD_PRESET=msmp_unsigned
   ```

2. Restart frontend dev server (`npm run dev`)

3. Go to admin form (e.g., ManageHighlights)

4. Select an image

5. Click "Done"

6. Check browser Console (F12) for logs:
   - `"Uploading image..."` popup should appear
   - Success: `"Highlight added successfully!"` popup
   - Error: Check console for error messages

7. Verify image in Cloudinary Dashboard → Media Library → `msmp/uploads/` folder

### 5. Troubleshooting

#### Upload fails silently
- Check browser Console (F12) for errors
- Verify `.env` has both Cloudinary variables
- Confirm upload preset name matches exactly
- Check upload preset is set to "Unsigned"

#### "Upload preset not found" error
- Upload preset name might be wrong
- Make sure it's created in Cloudinary dashboard
- Check exact spelling matches `.env` value

#### Image uploaded but not appearing in form
- Check Network tab in DevTools
- Verify response has `secure_url` field
- Image should appear after successful response

#### Images uploading to wrong folder
- Edit the folder in component (e.g., `"msmp/highlights"` in ManageHighlights)
- Or change default folder in `imageHelper.js`

### 6. Security Note

**Unsigned presets are safe because:**
- They can only upload images (not delete, modify)
- Restricted to the configured folder
- No API key exposed to frontend
- Rate limiting can be set in Cloudinary dashboard

## Files Using Cloudinary Upload

- `src/Components/Admin/AddAnEvent/AddAnEvent.jsx` - events/blog posts
- `src/Components/Admin/ManageHighlights/ManageHighlights.jsx` - highlights
- `src/Components/Admin/ManageCarousal/ManageCarousal.jsx` - carousel slides
- `src/utils/imageHelper.js` - upload function

## Example Flow

1. Admin selects image in form
2. Form validates and shows "Uploading..." popup
3. Frontend calls `uploadImageToCloudinary(file, folder)`
4. Image uploads to Cloudinary
5. Cloudinary returns secure URL
6. Frontend POSTs to backend with the secure URL
7. Backend stores URL in MongoDB
8. Frontend displays success message
9. Next reload shows image from Cloudinary

## Environment Variables Reference

```dotenv
# Frontend (.env in root)
VITE_CLOUDINARY_CLOUD_NAME=dosa82yyz
VITE_CLOUDINARY_UPLOAD_PRESET=msmp_unsigned

# Backend (server/.env) - for reference
CLOUDINARY_CLOUD_NAME=dosa82yyz
CLOUDINARY_FOLDER=msmp/content
```

## Next Steps

1. ✅ Add variables to `.env`
2. ✅ Create unsigned upload preset in Cloudinary dashboard
3. ✅ Restart frontend dev server
4. Test image upload in admin forms
5. Verify images appear in Cloudinary Media Library

