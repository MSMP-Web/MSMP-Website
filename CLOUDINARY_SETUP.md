# Cloud Image Storage Setup Guide

## Overview
This project uses **Cloudinary** to store and serve images. Image filenames are stored in the database, and the backend resolves them to full Cloudinary URLs.

## Why Cloudinary?
- **Free tier**: 25GB/month storage, unlimited transformations
- **Fast CDN**: Global content delivery network
- **No server-side upload handling**: Simplified backend (use Cloudinary's web UI or API)
- **Image optimization**: Auto-compress and resize on-the-fly
- **Simple integration**: Just store filenames, build URLs from config

## Setup Steps

### 1. Create Cloudinary Account
1. Sign up at [cloudinary.com](https://cloudinary.com) (free tier available)
2. Go to Dashboard → Settings → API Keys
3. Note down:
   - **Cloud Name** (unique identifier)
   - **API Key** (for admin operations, optional)
   - **API Secret** (for admin operations, optional)

### 2. Configure Backend (.env)
Copy and fill `.env.example` to `.env` in the `server/` folder:

```
PORT=5000
MONGO_URI=mongodb+srv://...
FRONTEND_ORIGIN=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=optional_api_key
CLOUDINARY_API_SECRET=optional_api_secret
CLOUDINARY_FOLDER=msmp/content
```

Example:
```
CLOUDINARY_CLOUD_NAME=my-msmp-cloud
CLOUDINARY_FOLDER=msmp/content
```

### 3. Upload Images to Cloudinary
#### Option A: Use Cloudinary Dashboard (Easiest)
1. Log in to Cloudinary Dashboard
2. Go to Media Library
3. Create a folder: `msmp/content`
4. Upload your images
5. Note the **filename** (e.g., `no to manusmruti at Pathardi .png`)
6. Store that filename in the database (as you're already doing)

#### Option B: Programmatic Upload (via Server API)
Create a `/api/images/upload` endpoint if needed later.

### 4. Update Frontend Components
Use the image helper utility to fetch image URLs:

```jsx
import { getImageUrl } from '../utils/imageHelper.js';

// In your component:
const imageUrl = getImageUrl(data.image);

<img src={imageUrl} alt={data.title} />
```

Example in a React component:
```jsx
import React from 'react';
import { getImageUrl } from '../utils/imageHelper.js';

function BlogCard({ blog }) {
  return (
    <div>
      <img src={getImageUrl(blog.image)} alt={blog.title} />
      <h2>{blog.title}</h2>
    </div>
  );
}
```

## How It Works

1. **Database stores**: filename only (e.g., `"no to manusmruti at Pathardi .png"`)
2. **Frontend calls**: `/api/images/{filename}`
3. **Backend resolves**: Builds full URL using `CLOUDINARY_CLOUD_NAME` and `CLOUDINARY_FOLDER`
4. **Backend returns**: `{ filename, url: "https://res.cloudinary.com/.../filename.png" }`
5. **Frontend uses**: `url` in `<img src="">` or CSS

## API Endpoints

### Get Image URL
```
GET /api/images/{filename}
Response: { "filename": "test.png", "url": "https://res.cloudinary.com/..." }
```

## Migration Steps

### For Existing Images
1. Upload all images to Cloudinary at `msmp/content/` folder
2. Keep the **exact same filenames** in the database (no changes needed)
3. Set `CLOUDINARY_CLOUD_NAME` in `.env`
4. Update frontend components to use `getImageUrl()` helper
5. Test with a few components first

### Filenames with Spaces
Cloudinary supports filenames with spaces. No renaming needed!
- Database: `"no to manusmruti at Pathardi .png"`
- Cloudinary: Upload with same name
- URL: `https://res.cloudinary.com/.../no%20to%20manusmruti%20at%20Pathardi%20.png` (auto-encoded)

## Example Component Updates

### Before (static images):
```jsx
<img src={import.meta.env.VITE_IMAGE_BASE + "/" + image} alt="..." />
```

### After (Cloudinary):
```jsx
import { getImageUrl } from '../utils/imageHelper.js';
<img src={getImageUrl(image)} alt="..." />
```

## Troubleshooting

### Images not loading?
- Check `CLOUDINARY_CLOUD_NAME` is set in `.env`
- Verify images are uploaded to Cloudinary at the correct folder path
- Check browser DevTools → Network tab for 404s
- Verify filename matches exactly (case-sensitive)

### URL not building?
- Make sure backend is running
- Check `/api/images/test.png` endpoint directly

## Cost & Limits
- **Free tier**: 25GB storage/month, unlimited requests
- **Upgrade**: Pay-as-you-go for storage and transformations
- **For this project**: Free tier should be more than sufficient

## Optional: Image Transformations
Cloudinary supports on-the-fly transformations in URLs:

```
// Auto-resize to 500px width:
https://res.cloudinary.com/{cloud}/image/upload/w_500/{folder}/{filename}

// Auto-compress:
https://res.cloudinary.com/{cloud}/image/upload/q_auto/{folder}/{filename}
```

You can enhance the `getImageUrl()` helper to support these later.
