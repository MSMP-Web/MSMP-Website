# Troubleshooting Guide - Common Issues & Solutions

## Issue #1: Images Not Loading

### Symptoms
- Broken image icons on pages
- Images from events not displaying
- Carousel slides appear without images

### Root Causes & Solutions

#### Cause 1: `getImageUrl()` Not Used
```jsx
// ❌ WRONG - Image won't load correctly
<img src={event.image} alt={event.title} />

// ✅ CORRECT - Uses intelligent URL resolution
<img src={getImageUrl(event.image)} alt={event.title} />
```

**Fix**: Import `getImageUrl` from `imageHelper.js` and wrap all image fields:
```jsx
import { getImageUrl } from "../../utils/imageHelper";

<img src={getImageUrl(blog.image)} alt={blog.title} />
```

#### Cause 2: API_BASE Not Set Correctly
```jsx
// Check if API_BASE is defined
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
console.log("API_BASE:", API_BASE); // Should show your backend URL
```

**Fix**: Ensure `.env.local` has:
```
VITE_API_BASE=http://localhost:5000
```

#### Cause 3: `/api/images` Endpoint Not Working
**Check in browser Network tab**:
1. Open DevTools → Network tab
2. Look for requests to `/api/images/filename.png`
3. Check status code - should be 200, not 404 or 500

**Fix**: Verify backend server has images endpoint:
```javascript
// server/routes/images.js should exist and be imported
app.use('/api/images', imagesRouter);
```

#### Cause 4: Cloudinary URL Malformed
```jsx
// Check in browser console
console.log("Image URL:", getImageUrl(event.image));
// Should output: https://res.cloudinary.com/...
// NOT: undefined or /api/images/undefined
```

**Fix**: Ensure Cloudinary credentials in backend `.env`:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

## Issue #2: Forms Not Submitting

### Symptoms
- Click "Done" button and nothing happens
- No error message shown
- Form data lost but no feedback

### Root Causes & Solutions

#### Cause 1: API Endpoint Not Found (404)
**Check Network tab for 404 errors**:
```
POST http://localhost:5000/api/alldata → 404 Not Found
```

**Fix**: 
1. Verify backend server is running: `npm run dev`
2. Check port matches VITE_API_BASE (default 5000)
3. Verify route exists in backend:
```javascript
// server/routes/allData.js
router.post('/', async (req, res) => {
  // POST handler
});
app.use('/api/alldata', allDataRouter);
```

#### Cause 2: CORS Error
**Error in console**:
```
Access to XMLHttpRequest blocked by CORS policy
```

**Fix**: Verify backend has CORS configured:
```javascript
// server/server.js
const cors = require('cors');
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  credentials: true
}));
```

#### Cause 3: Form Validation Failing Silently
**No popup notification appears**:

**Fix**: Add console logs to check validation:
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log("Form data:", formData); // Debug log
  
  if (!formData.title.trim()) {
    console.log("Validation failed: no title"); // Debug log
    return showPopup("❌ Title required", "error");
  }
  
  console.log("Validation passed, submitting..."); // Debug log
  // ... rest of submission
};
```

#### Cause 4: API Key Error (Cloudinary Upload)
**When uploading images fails**:

**Check browser console for error**:
```
Cloudinary upload failed: 401 Unauthorized
```

**Fix**: Verify Cloudinary setup in `imageHelper.js`:
```javascript
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

if (!cloudName || !uploadPreset) {
  console.error("Cloudinary config missing!");
  // Fallback to filename
}
```

---

## Issue #3: Database Not Saving Data

### Symptoms
- Form shows success popup
- But data doesn't appear in MongoDB
- Fetching returns empty list

### Root Causes & Solutions

#### Cause 1: MongoDB Connection Lost
**Check backend logs**:
```
Error: connect ECONNREFUSED
Error: Authentication failed
```

**Fix**: 
1. Verify MongoDB Atlas cluster is running
2. Check MONGO_URI in `.env` has correct credentials:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```
3. Whitelist IP in MongoDB Atlas (or allow 0.0.0.0)

#### Cause 2: Data Structure Mismatch
**Submitted data doesn't match schema**:

**Check MongoDB schema matches fields you're sending**:
```javascript
// Backend schema (AllData.js)
const allDataSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  date: String,
  details: String,
  readTime: String
});

// Frontend must send same fields:
const res = await fetch('/api/alldata', {
  method: 'POST',
  body: JSON.stringify({
    title: formData.title,        // ✅ Matches schema
    description: formData.description, // ✅ Matches
    image: formData.image,        // ✅ Matches
    date: formData.date,          // ✅ Matches
    details: formData.details,    // ✅ Matches
    readTime: formData.readTime   // ✅ Matches
  })
});
```

**Fix**: Verify field names match exactly between frontend and backend.

#### Cause 3: Validation Error on Backend
**POST returns 400 Bad Request**:

**Fix**: Check backend request validation:
```javascript
// server/routes/allData.js
router.post('/', async (req, res) => {
  const { title, date, description } = req.body;
  
  // Check required fields
  if (!title || !date || !description) {
    return res.status(400).json({ 
      error: "Missing required fields" 
    });
  }
  
  // Save to database
  const newData = new AllData(req.body);
  await newData.save();
  res.status(201).json(newData);
});
```

---

## Issue #4: Images Upload But Don't Display

### Symptoms
- Cloudinary upload succeeds (popup shows ✅)
- But image not visible on page
- Or image appears broken

### Root Causes & Solutions

#### Cause 1: Cloudinary URL Not Returned
**Form saves filename instead of URL**:

**Check the uploadImageToCloudinary function**:
```javascript
// If upload fails, falls back to filename
const uploadedUrl = await uploadImageToCloudinary(file, "folder");
const finalImage = uploadedUrl || file.name; // Could be just "image.jpg"
```

**Fix**: Ensure Cloudinary returns full URL:
```javascript
// imageHelper.js should return format like:
// https://res.cloudinary.com/your-cloud/image/upload/v123/folder/imagename.jpg
```

#### Cause 2: Cloudinary Folder Not Created
**Image uploaded but to wrong location**:

**Fix**: Verify upload folder exists in Cloudinary and is accessible:
```javascript
// In imageHelper.js uploadImageToCloudinary:
const response = await cloudinary.uploader.upload(file.path, {
  folder: "msmp/events", // Ensure this folder exists in Cloudinary
  resource_type: "auto"
});
```

#### Cause 3: Display Component Not Using Updated Image
**Image stored in DB but old value displayed**:

**Fix**: Ensure component re-renders when data updates:
```jsx
// Fetch data on mount
useEffect(() => {
  const fetchData = async () => {
    const res = await fetch(`${API_BASE}/api/alldata`);
    if (res.ok) {
      const data = await res.json();
      setAllData(data); // Updates state, triggers re-render
    }
  };
  fetchData();
}, []); // Empty dependency = fetch once on mount

// Use fetched data in JSX
<img src={getImageUrl(event.image)} alt={event.title} />
```

---

## Issue #5: Popup Notifications Not Showing

### Symptoms
- Form submits without feedback
- No success/error messages
- User unsure if action completed

### Root Causes & Solutions

#### Cause 1: showPopup Function Not Called
```jsx
// ❌ WRONG - No popup notification
const handleSubmit = (e) => {
  e.preventDefault();
  // Missing: showPopup(...) call
  console.log("Form submitted"); // Debug only
};

// ✅ CORRECT - Includes popup notification
const handleSubmit = async (e) => {
  e.preventDefault();
  showPopup("📤 Uploading...", "info");
  // ... submit logic
  showPopup("✅ Success!", "success");
};
```

**Fix**: Ensure all submissions call `showPopup()`.

#### Cause 2: Popup State Not Initialized
```jsx
// ❌ WRONG - No popup state
const Component = () => {
  // Missing popup state initialization
  return <form>...</form>;
};

// ✅ CORRECT - Popup state and render
const Component = () => {
  const [popup, setPopup] = useState(null);
  
  const showPopup = (message, type) => {
    setPopup({ message, type });
    setTimeout(() => setPopup(null), 3000);
  };
  
  return (
    <>
      {popup && (
        <div className={`popup popup-${popup.type}`}>
          {popup.message}
        </div>
      )}
      <form>...</form>
    </>
  );
};
```

**Fix**: Add popup state and render popup div.

#### Cause 3: CSS Not Imported
**Popup renders but not visible**:

**Fix**: Verify CSS file includes popup styles:
```css
.popup {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 8px;
  z-index: 1000;
}

.popup-success {
  background-color: #4caf50;
  color: white;
}

.popup-error {
  background-color: #f44336;
  color: white;
}
```

---

## Issue #6: Loading States Not Working

### Symptoms
- Can click submit button multiple times
- Form submits duplicate data
- No "Adding..." text shown

### Root Causes & Solutions

#### Cause 1: isSubmitting State Not Used
```jsx
// ❌ WRONG - No submission state
const handleSubmit = async (e) => {
  e.preventDefault();
  // Button can be clicked multiple times
  await fetch(...);
};

// ✅ CORRECT - Prevents double submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true); // Disable form
  try {
    await fetch(...);
    showPopup("✅ Success", "success");
  } finally {
    setIsSubmitting(false); // Re-enable form
  }
};

// In JSX:
<button disabled={isSubmitting}>
  {isSubmitting ? "Adding..." : "Done"}
</button>
```

**Fix**: Add `isSubmitting` state and use it to disable form elements.

#### Cause 2: Button Not Actually Disabled
```jsx
// ❌ WRONG - disabled attribute might not work
<button disabled={isSubmitting} onClick={handleClick}>Done</button>

// ✅ CORRECT - Also disable form fields
<input disabled={isSubmitting} />
<textarea disabled={isSubmitting} />
<select disabled={isSubmitting} />
<button disabled={isSubmitting} />
```

**Fix**: Apply `disabled={isSubmitting}` to all form fields, not just button.

---

## Issue #7: API Environment Variable Issues

### Symptoms
- Always getting 404 errors
- API calls go to wrong URL
- "Cannot find module" errors

### Root Causes & Solutions

#### Cause 1: Wrong Environment Variable Name
```javascript
// ❌ WRONG - Vite prefix might be missing
const API_BASE = import.meta.env.API_BASE; // undefined

// ✅ CORRECT - Must use VITE_ prefix
const API_BASE = import.meta.env.VITE_API_BASE;
```

**Fix**: All Vite env variables must start with `VITE_`.

#### Cause 2: .env File in Wrong Location
```
❌ WRONG locations:
/src/.env
/public/.env
/.env (in root but ignored)

✅ CORRECT locations:
/.env              (in project root)
/.env.local        (in project root)
/.env.production   (in project root)
```

**Fix**: Ensure `.env` or `.env.local` is in project root, not in src/.

#### Cause 3: Environment Variable Not Reloaded
```
Changes to .env not taking effect
```

**Fix**: Restart development server after changing `.env`:
```bash
# Stop: Ctrl+C
# Restart:
npm run dev
```

#### Cause 4: Fallback Not Defined
```jsx
// ❌ WRONG - No fallback, becomes undefined
const API_BASE = import.meta.env.VITE_API_BASE;

// ✅ CORRECT - Has fallback for development
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
```

**Fix**: Always include a fallback URL.

---

## Issue #8: Duplicate Entries in Database

### Symptoms
- Same event appears multiple times
- Form submits twice with one click
- Votes or counts are inflated

### Root Causes & Solutions

#### Cause 1: Submission Button Enabled Too Early
```jsx
// ❌ WRONG - Button re-enabled before server responds
const handleSubmit = async (e) => {
  setIsSubmitting(false); // Oops, too early!
  const res = await fetch(...);
};

// ✅ CORRECT - Button disabled until response
const handleSubmit = async (e) => {
  setIsSubmitting(true);
  try {
    const res = await fetch(...);
    // ... handle response
  } finally {
    setIsSubmitting(false); // Only after response
  }
};
```

**Fix**: Keep `isSubmitting = true` until after API call completes.

#### Cause 2: useEffect Re-runs on Every Render
```jsx
// ❌ WRONG - Form submits on every render
useEffect(() => {
  handleSubmit(); // Runs infinitely!
}, []); // Works, but any change re-triggers

// ✅ CORRECT - Only on mount or when needed
useEffect(() => {
  fetchData(); // Only fetches on mount
}, []); // Empty dependency array
```

**Fix**: Use empty dependency array `[]` for one-time effects.

---

## Issue #9: Rich Text Editor Content Lost

### Symptoms
- React Quill content not saving
- HTML tags lost in database
- Special characters appearing as codes

### Root Causes & Solutions

#### Cause 1: Wrong Field Name
```jsx
// ❌ WRONG - Quill updates 'fullInfo' but POST sends 'details'
<ReactQuill
  value={blogData.fullInfo}
  onChange={(val) => setBlogData(prev => ({ ...prev, fullInfo: val }))}
/>

const res = await fetch('/api/alldata', {
  body: JSON.stringify({
    details: blogData.details, // This is empty!
  })
});

// ✅ CORRECT - Consistent naming
<ReactQuill
  value={blogData.details}
  onChange={(val) => setBlogData(prev => ({ ...prev, details: val }))}
/>

const res = await fetch('/api/alldata', {
  body: JSON.stringify({
    details: blogData.details, // Matches Quill field
  })
});
```

**Fix**: Use consistent field names throughout component.

#### Cause 2: HTML Not Preserved in Display
```jsx
// ❌ WRONG - Treats HTML as text, shows tags
<p>{event.details}</p>

// ✅ CORRECT - Renders HTML content
<p dangerouslySetInnerHTML={{ __html: event.details }} />
```

**Fix**: Use `dangerouslySetInnerHTML` for HTML content.

---

## Issue #10: Mobile Forms Broken

### Symptoms
- Form inputs overlap on mobile
- Buttons cut off at screen edge
- Difficult to interact with form on phone

### Root Causes & Solutions

#### Cause 1: Form Not Responsive
```css
/* ❌ WRONG - Fixed width, doesn't adjust */
.form {
  width: 500px;
}

/* ✅ CORRECT - Responsive design */
.form {
  width: 90%;
  max-width: 500px;
}

.form-row {
  display: flex;
  flex-direction: column; /* Stack vertically on mobile */
  gap: 20px;
}

@media (min-width: 768px) {
  .form-row {
    flex-direction: row; /* Side-by-side on larger screens */
  }
}
```

**Fix**: Add media queries for mobile screens.

#### Cause 2: Input Text Too Small on Mobile
```css
/* ✅ Ensure readable font size */
.form-input {
  font-size: 16px; /* 16px minimum recommended on mobile */
  padding: 12px; /* Adequate touch target */
}
```

**Fix**: Ensure minimum font size of 16px.

---

## Quick Debug Checklist

When something breaks, check these in order:

### 1. Check Browser Console
```
⌨️ Windows/Linux: Ctrl + Shift + J
⌨️ Mac: Cmd + Shift + J
Look for red errors, yellow warnings
```

### 2. Check Network Tab
```
⌨️ Click Network tab
Perform action (e.g., submit form)
Look for failed requests (red)
Check status codes and response bodies
```

### 3. Check Backend Logs
```bash
# Terminal running backend
npm run dev
Look for error messages
Check database connection
```

### 4. Check Environment Variables
```javascript
// In browser console:
console.log(import.meta.env.VITE_API_BASE);
// Should print your API URL, not undefined
```

### 5. Check Database
```javascript
// MongoDB Atlas > Collections
Verify data exists
Check fields match schema
```

### 6. Check Cloudinary
```
Dashboard > Media Library
Verify images uploaded
Check upload folder structure
```

---

## Getting Help

If none of these solutions work:

1. **Check error message carefully** - Copy exact error text
2. **Reproduce the issue** - Document exact steps
3. **Check similar issues** - In GitHub, Stack Overflow, docs
4. **Ask AI with context** - Share:
   - Exact error message
   - Steps to reproduce
   - Code snippet
   - Console logs
5. **Check backend logs** - Often the real error is there, not frontend

---

## Prevention Tips

1. Always include error handling (try/catch)
2. Always include loading states
3. Always include user feedback (popups)
4. Always test with slow network (DevTools → Network → Slow 3G)
5. Always test on mobile
6. Always check console for errors
7. Always verify environment variables
8. Always back up database before testing

**Happy debugging! 🐛**
