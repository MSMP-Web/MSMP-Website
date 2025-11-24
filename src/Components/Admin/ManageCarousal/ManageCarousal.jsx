import React, { useState, useEffect } from "react";
import BackButton from "../../BackButton/BackButton";
import "./ManageCarousal.css";
import RightTitleSection from "../../RightTitleSection/RightTitleSection";
import { uploadImageToCloudinary } from "../../../utils/imageHelper";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function ManageCarousal({ onBack }) {
  const [carousalData, setCarousalData] = useState({
    title: "",
    info: "",
    img: null,
    eventId: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [carousalList, setCarousalList] = useState([]);
  const [eventsList, setEventsList] = useState([]);
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

  // Fetch existing slides and events on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch slides
        const slidesRes = await fetch(`${API_BASE}/api/slides`);
        if (slidesRes.ok) {
          const slidesData = await slidesRes.json();
          setCarousalList(slidesData);
        }

        // Fetch events for the dropdown
        const eventsRes = await fetch(`${API_BASE}/api/alldata`);
        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          setEventsList(eventsData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        showPopup("❌ Error fetching data", "error");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarousalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setCarousalData((prev) => ({ ...prev, img: file?.name || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!carousalData.title.trim()) {
      return showPopup("❌ Title required", "error");
    }

    setIsSubmitting(true);

    try {
      // Optional image upload to Cloudinary
      let imageName = carousalData.img;
      if (imageFile) {
        showPopup("📤 Uploading image...", "info");
        const uploadedUrl = await uploadImageToCloudinary(
          imageFile,
          "msmp/carousel"
        );
        imageName = uploadedUrl || imageFile.name; // Fallback to filename
      }

      // POST to backend
      const res = await fetch(`${API_BASE}/api/slides`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: carousalData.title,
          info: carousalData.info || carousalData.title,
          img: imageName,
          id: carousalData.id ? Number(carousalData.id) : null,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add slide");
      }

      const newSlide = await res.json();
      setCarousalList((prev) => [...prev, newSlide]);
      setCarousalData({ title: "", info: "", img: null, id: "" });
      setImageFile(null);
      showPopup("✅ Slide added successfully!", "success");
    } catch (err) {
      console.error("Error adding slide:", err);
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
      return showPopup("❌ Please select a slide to remove", "error");
    }

    setIsSubmitting(true);
    console.log(selectedToRemove)

    try {
      const res = await fetch(`${API_BASE}/api/slides/${selectedToRemove}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to remove slide");
      }

      setCarousalList((prev) =>
        prev.filter((c) => c.id !== selectedToRemove)
      );
      setSelectedToRemove("");
      showPopup("✅ Slide removed successfully!", "success");
    } catch (err) {
      console.error("Error removing slide:", err);
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

      <div className="carousal-form-container">
        <BackButton onClick={handleBack} />

        {/* ADD CAROUSAL FORM */}
        <form className="carousal-form" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="carousal-group full-width">
            <label className="carousal-label">Title of the Carousal:</label>
            <input
              type="text"
              name="title"
              placeholder="Title of the carousal"
              value={carousalData.title}
              onChange={handleChange}
              className="carousal-input"
              disabled={isSubmitting}
            />
          </div>

          {/* Info/Description */}
          <div className="carousal-group full-width">
            <label className="carousal-label">Description:</label>
            <textarea
              name="info"
              placeholder="Brief description or info"
              value={carousalData.info}
              onChange={handleChange}
              className="carousal-input"
              disabled={isSubmitting}
            />
          </div>

          {/* Link to Event */}
          <div className="carousal-group full-width">
            <label className="carousal-label">Link to Event/Blog Page:</label>
            <select
              name="id"
              value={carousalData.id}
              onChange={handleChange}
              className="carousal-input"
              disabled={isSubmitting}
            >
              <option value="">-- Select an event (optional) --</option>
              {eventsList.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>

          {/* Media + Button Row */}
          <div className="carousal-row">
            <div className="carousal-group">
              <label className="carousal-label">Select Banner Image:</label>

              <label className="carousal-upload-box">
                <span>
                  {carousalData.img ? carousalData.img : "Upload an image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMediaUpload}
                  className="hidden-input"
                  disabled={isSubmitting}
                />
              </label>
            </div>

            <button
              type="submit"
              className="carousal-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Done"}
            </button>
          </div>
        </form>

        {/* REMOVE CAROUSAL SECTION */}
        <RightTitleSection title={"Remove Carousal Slides"} />

        <form
          className="carousal-form remove-form"
          onSubmit={handleRemoveSubmit}
        >
          <div
            className="carousal-group full-width"
            style={{ marginTop: "1em", marginBottom: "1em" }}
          >
            <label className="carousal-label">
              Select the title of the slide to remove:
            </label>

            <select
              name="removeTitle"
              value={selectedToRemove}
              onChange={handleRemoveChange}
              className="carousal-input"
              disabled={isSubmitting}
            >
              <option value="">-- Select title --</option>
              {carousalList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="carousal-row">
            <button
              type="submit"
              className="carousal-submit-btn remove-btn"
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

export default ManageCarousal;
