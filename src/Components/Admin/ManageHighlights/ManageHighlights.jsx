import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { uploadImageToCloudinary } from "../../../utils/imageHelper";
import BackButton from "../../BackButton/BackButton";
import RightTitleSection from "../../RightTitleSection/RightTitleSection";
import "./ManageHighlights.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function ManageHighlights({ onBack }) {
  const [highlightData, setHighlightData] = useState({
    title: "",
    text: "",
    imageUrl: null,
    videoUrl: null,
  });
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState(null); // 'image' or 'video'
  const [highlightsList, setHighlightsList] = useState([]);
  const [selectedToRemove, setSelectedToRemove] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState(null);

  const handleBack = () => {
    if (onBack) onBack("ManageGrid");
  };

  const showPopup = (message, type) => {
    setPopup({ message, type });
    setTimeout(() => setPopup(null), 3000);
  };

  // Fetch existing highlights on mount
  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/notices`);
        if (res.ok) {
          const data = await res.json();
          setHighlightsList(data);
        }
      } catch (err) {
        console.error("Error fetching highlights:", err);
        showPopup("❌ Error fetching highlights", "error");
      }
    };

    fetchHighlights();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHighlightData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');
      
      if (isVideo) {
        setMediaType('video');
        setHighlightData((prev) => ({ 
          ...prev, 
          videoUrl: file.name,
          imageUrl: null 
        }));
      } else if (isImage) {
        setMediaType('image');
        setHighlightData((prev) => ({ 
          ...prev, 
          imageUrl: file.name,
          videoUrl: null 
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!highlightData.title.trim()) {
      return showPopup("❌ Title required", "error");
    }
    if (!highlightData.text.trim()) {
      return showPopup("❌ Description required", "error");
    }

    setIsSubmitting(true);

    try {
      let imageUrl = highlightData.imageUrl;
      let videoUrl = highlightData.videoUrl;

      // Upload media to Cloudinary (image or video)
      if (mediaFile) {
        if (mediaType === 'video') {
          showPopup("📤 Uploading video...", "info");
          const uploadedUrl = await uploadImageToCloudinary(
            mediaFile,
            "msmp/highlights/videos"
          );
          videoUrl = uploadedUrl || mediaFile.name;
          imageUrl = null;
        } else if (mediaType === 'image') {
          showPopup("📤 Uploading image...", "info");
          const uploadedUrl = await uploadImageToCloudinary(
            mediaFile,
            "msmp/highlights"
          );
          imageUrl = uploadedUrl || mediaFile.name;
          videoUrl = null;
        }
      }

      // POST to backend
      const res = await fetch(`${API_BASE}/api/notices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },  
        body: JSON.stringify({
          title: highlightData.title,
          text: highlightData.text,
          imageUrl: imageUrl || null,
          videoUrl: videoUrl || null,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add highlight");
      }

      const newHighlight = await res.json();
      setHighlightsList((prev) => [...prev, newHighlight]);
      setHighlightData({
        title: "",
        text: "",
        imageUrl: null,
        videoUrl: null,
      });
      setMediaFile(null);
      setMediaType(null);
      showPopup("✅ Highlight added successfully!", "success");
    } catch (err) {
      console.error("Error adding highlight:", err);
      showPopup(`❌ ${err.message}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveChange = (e) => {
    setSelectedToRemove(e.target.value);
  };

  const handleRemoveSubmit = async (e) => {
    e.preventDefault();

    if (!selectedToRemove) {
      return showPopup("❌ Please select a highlight to remove", "error");
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/api/notices/${selectedToRemove}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to remove highlight");
      }

      setHighlightsList((prev) =>
        prev.filter((h) => h._id !== selectedToRemove)
      );
      setSelectedToRemove("");
      showPopup("✅ Highlight removed successfully!", "success");
    } catch (err) {
      console.error("Error removing highlight:", err);
      showPopup(`❌ ${err.message}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {popup && (
        <div className={`popup popup-${popup.type}`}>
          {popup.message}
        </div>
      )}

      <div className="highlight-form-container">
        <BackButton onClick={handleBack} />

        <form className="highlight-form" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="highlight-group full-width">
            <label className="highlight-label">Title of the Highlight:</label>
            <input
              type="text"
              name="title"
              placeholder="Title of the highlight"
              value={highlightData.title}
              onChange={handleChange}
              className="highlight-input"
              disabled={isSubmitting}
            />
          </div>

          {/* Description */}
          <div className="highlight-group full-width">
            <label className="highlight-label">
              Description of the Highlight:
            </label>
            <ReactQuill
              theme="snow"
              value={highlightData.text}
              onChange={(val) =>
                setHighlightData((prev) => ({ ...prev, text: val }))
              }
              className="rich-editor"
              placeholder="Write the description of the highlight"
              readOnly={isSubmitting}
            />
          </div>

          {/* Video URL (optional) */}
          {/* <div className="highlight-group full-width">
            <label className="highlight-label">Video URL (optional):</label>
            <input
              type="url"
              name="videoUrl"
              placeholder="https://example.com/video.mp4"
              value={highlightData.videoUrl}
              onChange={handleChange}
              className="highlight-input"
              disabled={isSubmitting}
            />
          </div> */}

          {/* Media + Button Row */}
          <div className="highlight-row">
            <div className="highlight-group">
              <label className="highlight-label">
                Select Image or Video:
              </label>

              <label className="highlight-upload-box">
                <span>
                  {highlightData.imageUrl
                    ? `📷 ${highlightData.imageUrl}`
                    : highlightData.videoUrl
                    ? `🎥 ${highlightData.videoUrl}`
                    : "Upload an image or video"}
                </span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="hidden-input"
                  disabled={isSubmitting}
                />
              </label>
            </div>

            <button
              type="submit"
              className="highlight-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Done"}
            </button>
          </div>
        </form>
        {/* Remove Highlight Form - single dropdown field as requested */}

        <RightTitleSection title={"Remove Highlights From The Board"} />
        <form
          className="highlight-form remove-form"
          onSubmit={handleRemoveSubmit}
        >
          <div
            className="highlight-group full-width"
            style={{ marginTop: "1em", marginBottom: "1em" }}
          >
            <label className="highlight-label">
              select the title of the highlight to be removed
            </label>
            <select
              name="removeTitle"
              value={selectedToRemove}
              onChange={handleRemoveChange}
              className="highlight-input"
              disabled={isSubmitting}
            >
              <option value="">-- Select title --</option>
              {highlightsList.map((h) => (
                <option key={h._id} value={h._id}>
                  {h.title}
                </option>
              ))}
            </select>
          </div>

          <div className="highlight-row">
            <button
              type="submit"
              className="highlight-submit-btn remove-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Removing..." : "Remove"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ManageHighlights;
