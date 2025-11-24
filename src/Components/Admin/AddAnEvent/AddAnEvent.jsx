import React, { useState } from "react";
import BackButton from "../../BackButton/BackButton";
import "./AddAnEvent.css";
import DatePicker from "../../DatePicker/Datepicker";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { uploadImageToCloudinary } from "../../../utils/imageHelper";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function AddAnEvent({ onBack }) {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    image: null,
    date: "",
    details: "",
    readTime: "",
  });

  const [popup, setPopup] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleBack = () => {
    if (onBack) onBack("ManageGrid");
  };

  const showPopup = (message, type) => {
    setPopup({ message, type });
    setTimeout(() => setPopup({ message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (dateStr) => {
    setEventData((prev) => ({ ...prev, date: dateStr }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!eventData.title.trim()) {
      showPopup("❌ Title is required", "error");
      return;
    }
    if (!eventData.date) {
      showPopup("❌ Date is required", "error");
      return;
    }
    if (!eventData.description.trim()) {
      showPopup("❌ Description is required", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      let imageName = eventData.image;

      // If new image file selected, try to upload to Cloudinary
      if (imageFile) {
        showPopup("📤 Uploading image...", "info");
        const uploadedUrl = await uploadImageToCloudinary(imageFile, "msmp/events");
        imageName = uploadedUrl || imageFile.name; // Fall back to filename if upload fails
      }

      // Prepare data for API (id will be auto-generated on backend)
      const dataToSubmit = {
        title: eventData.title,
        description: eventData.description,
        image: imageName,
        date: eventData.date,
        details: eventData.details || eventData.description, // Use description as fallback
        readTime: eventData.readTime || "3 mins",
      };

      // POST to backend
      const res = await fetch(`${API_BASE}/api/alldata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `HTTP ${res.status}`);
      }

      showPopup("✅ Event added successfully!", "success");
      // Reset form
      setEventData({
        title: "",
        description: "",
        image: null,
        date: "",
        details: "",
        readTime: "",
      });
      setImageFile(null);
    } catch (err) {
      console.error("Error submitting event:", err);
      showPopup(`❌ Error: ${err.message}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="event-form-container">
        <BackButton onClick={handleBack} />

        {popup.message && (
          <div className={`floating-popup ${popup.type}`}>{popup.message}</div>
        )}

        <form className="event-form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="event-row">
            <div className="event-group">
              <label className="event-label">Date of event:</label>
              <DatePicker value={eventData.date} onChange={handleDateChange} />
            </div>

            <div className="event-group">
              <label className="event-label">Title of the event:</label>
              <input
                type="text"
                name="title"
                placeholder="Title of the event"
                value={eventData.title}
                onChange={handleChange}
                className="event-input"
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="event-row">
            <div className="event-group">
              <label className="event-label">Select Banner Image:</label>
              <label className="image-upload-box">
                <span>
                  {imageFile
                    ? imageFile.name
                    : eventData.image
                    ? eventData.image
                    : "Upload an image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden-input"
                />
              </label>
            </div>

            <div className="event-group">
              <label className="event-label">
                Read-time for the event (in mins):
              </label>
              <input
                type="text"
                name="readTime"
                placeholder="For eg. 4 mins"
                value={eventData.readTime}
                onChange={handleChange}
                className="event-input"
              />
            </div>
          </div>

          {/* Description */}
          <div className="event-group full-width">
            <label className="event-label">
              Short Description of the event:
            </label>
            <textarea
              name="description"
              placeholder="Write a summary or short description of the event"
              value={eventData.description}
              onChange={handleChange}
              className="event-textarea small"
              required
            ></textarea>
          </div>

          {/* Full Information */}
          <div className="event-group full-width">
            <label className="event-label" style={{ marginTop: "1em" }}>
              Full Information of the event:
            </label>

            <ReactQuill
              theme="snow"
              value={eventData.details}
              onChange={(val) =>
                setEventData((prev) => ({ ...prev, details: val }))
              }
              className="rich-editor"
              placeholder="Write the complete info of the event"
            />
          </div>

          <button type="submit" className="event-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Done"}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddAnEvent;
