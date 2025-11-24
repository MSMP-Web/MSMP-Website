# Admin Forms Quick Reference Guide

## Form Summary Table

| Form | Endpoint | Method | Fields | Features |
|------|----------|--------|--------|----------|
| AddAnEvent | `/api/alldata` | POST | title, date, description, image, details, readTime | Image upload, validation, popup notifications |
| AddABlog | `/api/alldata` | POST | title, date, description, image, readTime, details (rich text) | Rich text editor, image upload, validation |
| AddEventsToCalendar | `/api/calendar` | POST/DELETE | title, date | Calendar event management |
| ManageCarousal | `/api/slides` | POST/DELETE | title, info, img | Carousel slide management, image upload |
| ManageHighlights | `/api/notices` | POST/DELETE | title, text, imageUrl, videoUrl | Notice management, optional video support |
| ManageVoicesInAction | `/api/voices` | POST (config) | selectedEventIds (x4) | Featured events grid selector |

---

## Form Usage Examples

### 1. AddAnEvent Form
**Purpose**: Create a new event/blog entry

**Form Fields**:
- `title` (required) - Event title
- `date` (required) - Event date
- `description` (required) - Short description
- `image` (optional) - Banner image file
- `readTime` (optional) - Reading time (e.g., "3 mins")
- `details` (optional) - Full content, defaults to description

**How it Works**:
1. User fills title, date, description
2. Optionally uploads an image
3. Clicks "Done"
4. Form uploads image to Cloudinary (if provided)
5. POSTs to `/api/alldata` with event data
6. Shows success/error popup
7. Form resets on success

**Code Pattern**:
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // 1. Validate
  if (!eventData.title.trim()) {
    return showPopup("❌ Title required", "error");
  }
  
  setIsSubmitting(true);
  
  try {
    // 2. Upload image to Cloudinary (optional)
    let imageName = eventData.image;
    if (imageFile) {
      const uploadedUrl = await uploadImageToCloudinary(imageFile, "msmp/events");
      imageName = uploadedUrl || imageFile.name;
    }
    
    // 3. POST to API
    const res = await fetch(`${API_BASE}/api/alldata`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: eventData.title,
        description: eventData.description,
        image: imageName,
        date: eventData.date,
        details: eventData.details || eventData.description,
        readTime: eventData.readTime || "3 mins",
      }),
    });
    
    if (!res.ok) throw new Error("Failed to add event");
    
    // 4. Show success and reset
    showPopup("✅ Event added successfully!", "success");
    setEventData({ /* reset */ });
  } catch (err) {
    showPopup(`❌ ${err.message}`, "error");
  } finally {
    setIsSubmitting(false);
  }
};
```

### 2. ManageCarousal Form (Add/Remove Slides)
**Purpose**: Create carousel slides and remove existing ones

**Add Slide Fields**:
- `title` (required) - Slide title
- `info` (optional) - Description
- `img` (optional) - Banner image

**Remove Slide Fields**:
- `selectedToRemove` - Dropdown of existing slides

**How it Works**:
1. On mount, fetches all slides from `/api/slides`
2. User fills title and optionally selects image
3. Clicks "Done" to add
4. POSTs new slide to `/api/slides`
5. Updates slide list
6. For removal: User selects slide from dropdown
7. Clicks "Remove" → DELETEs from `/api/slides/:id`

**Key Implementation**:
```jsx
// Fetch on mount
useEffect(() => {
  const res = await fetch(`${API_BASE}/api/slides`);
  const data = await res.json();
  setCarousalList(data);
}, []);

// Add slide
const res = await fetch(`${API_BASE}/api/slides`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title, info, img })
});

// Remove slide
const res = await fetch(`${API_BASE}/api/slides/${selectedId}`, {
  method: "DELETE"
});
```

### 3. ManageHighlights Form (Add/Remove Notices)
**Purpose**: Create highlights/notices with optional images or videos

**Add Highlight Fields**:
- `title` (required) - Highlight title
- `text` (required) - Description (supports HTML from React Quill)
- `imageUrl` (optional) - Banner image
- `videoUrl` (optional) - Video URL

**Remove Highlight Fields**:
- `selectedToRemove` - Dropdown of existing highlights

**How it Works**:
1. User enters title and text using React Quill rich editor
2. Optionally provides image or video URL
3. Clicks "Done"
4. Image uploads to Cloudinary (if provided)
5. POSTs to `/api/notices`
6. For removal: Dropdown selection + Delete button
7. DELETEs from `/api/notices/:id`

### 4. AddEventsToCalendar Form (Calendar Management)
**Purpose**: Manage calendar events

**Add Event Fields**:
- `date` (required) - Event date
- `title` (required) - Event title

**Remove Event Fields**:
- `selectedToRemove` - Dropdown of existing events

**How it Works**:
1. User selects date using DatePicker
2. Enters event title
3. Clicks "Done"
4. POSTs to `/api/calendar`
5. For removal: Selects event from dropdown
6. Clicks "Remove" → DELETEs from `/api/calendar/:id`

### 5. ManageVoicesInAction Form (Featured Events)
**Purpose**: Select 4 featured events for homepage

**Selection Fields**:
- 2x2 grid of dropdowns
- Each dropdown shows all available events
- Prevents duplicate selection across dropdowns

**How it Works**:
1. On mount, fetches all events from `/api/alldata`
2. User selects one event in each of 4 dropdowns
3. Cannot select same event twice
4. Clicks "Save Configuration"
5. POSTs selection to `/api/voices/config` (optional endpoint)

---

## Common Patterns

### Image Upload Pattern
```jsx
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  setImageFile(file);
  setFormData(prev => ({ ...prev, image: file?.name || null }));
};

// In submit handler:
let imageName = formData.image;
if (imageFile) {
  const uploadedUrl = await uploadImageToCloudinary(imageFile, "folder/path");
  imageName = uploadedUrl || imageFile.name; // Fallback to filename
}
```

### Validation Pattern
```jsx
if (!formData.title.trim()) {
  return showPopup("❌ Title required", "error");
}
if (!formData.date.trim()) {
  return showPopup("❌ Date required", "error");
}
```

### Popup Notification Pattern
```jsx
const showPopup = (message, type) => {
  setPopup({ message, type });
  setTimeout(() => setPopup(null), 3000);
};

// Usage:
showPopup("✅ Success!", "success");      // Green
showPopup("❌ Error occurred", "error");  // Red
showPopup("📤 Uploading...", "info");    // Blue
```

### Fetch and Populate Pattern
```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/endpoint`);
      if (res.ok) {
        const data = await res.json();
        setList(data);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  fetchData();
}, []);
```

---

## Testing Each Form

### Test AddAnEvent
1. Fill title: "Test Event"
2. Select date: "2025-12-20"
3. Enter description: "Test description"
4. Upload image: Any JPG/PNG
5. Click "Done"
6. Verify: Success popup, form resets, image uploaded to Cloudinary

### Test AddABlog
1. Fill title: "Test Blog"
2. Select date: Today
3. Upload image: Any JPG/PNG
4. Enter description: "Short description"
5. Enter details: Use Quill editor to add formatted text
6. Click "Done"
7. Verify: Success popup, blog appears in Events page

### Test ManageCarousal
1. Add Slide: Title + Image → Success popup
2. Verify slide appears in removal dropdown
3. Select slide in dropdown
4. Click "Remove"
5. Verify: Slide removed from list and dropdown

### Test ManageHighlights
1. Add Highlight: Title + Text (use Quill) → Success popup
2. Optionally add image or video URL
3. Verify highlight appears in removal dropdown
4. Select and remove
5. Verify: Highlight removed

### Test ManageVoicesInAction
1. Select different event in each of 4 dropdowns
2. Try selecting same event twice → Should be disabled
3. Click "Save Configuration"
4. Verify: Success popup

---

## Debugging Tips

### Image Upload Issues
- Check browser console for Cloudinary upload errors
- Verify `CLOUDINARY_CLOUD_NAME` and `CLOUDINARY_API_KEY` in backend `.env`
- Check file size isn't too large (Cloudinary has limits)
- Try with smaller test image first

### Form Not Submitting
- Check browser Network tab for failed fetch requests
- Verify `API_BASE` environment variable is set correctly
- Check backend server is running: `curl http://localhost:5000/api/alldata`
- Look for 404 errors (endpoint doesn't exist) or 500 errors (server issue)

### Validation Not Triggering
- Ensure `isSubmitting` state prevents submission
- Check popup notification appears before form submission
- Verify validation logic matches form requirements

### Data Not Persisting
- Check MongoDB connection in backend logs
- Verify data structure matches schema in database
- Check for duplicate unique fields (e.g., multiple "admin" entries)
- Look for validation errors in backend console

---

## Environment Variables Required

### Backend (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env.local or .env)
```
VITE_API_BASE=http://localhost:5000
```

---

## API Response Format

### Success Response (201 Created)
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "id": 1,
  "title": "Event Title",
  "date": "2025-12-20",
  "description": "Short description",
  "image": "https://res.cloudinary.com/...",
  "details": "<p>Full content</p>",
  "readTime": "3 mins"
}
```

### Error Response (400 Bad Request)
```json
{
  "error": "Title is required"
}
```

### List Response (200 OK)
```json
[
  { "_id": "...", "title": "Event 1", ... },
  { "_id": "...", "title": "Event 2", ... }
]
```

---

**All forms are production-ready with full validation, error handling, and user feedback!**
