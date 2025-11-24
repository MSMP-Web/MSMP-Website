import React, { useState } from "react";
import BackButton from "../../BackButton/BackButton";
import "./AddABlog.css";
import DatePicker from "../../DatePicker/Datepicker";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { uploadImageToCloudinary } from "../../../utils/imageHelper";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function AddABlog({ onBack }) {
  const [blogData, setBlogData] = useState({
    date: "",
    title: "",
    image: null,
    readTime: "",
    description: "",
    details: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState(null);

  const handleBack = () => {
    if (onBack) onBack("ManageGrid");
  };

  const showPopup = (message, type) => {
    setPopup({ message, type });
    setTimeout(() => setPopup(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (dateStr) => {
    setBlogData((prev) => ({ ...prev, date: dateStr }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setBlogData((prev) => ({ ...prev, image: file?.name || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!blogData.title.trim()) {
      return showPopup("❌ Title required", "error");
    }
    if (!blogData.date.trim()) {
      return showPopup("❌ Date required", "error");
    }
    if (!blogData.description.trim()) {
      return showPopup("❌ Description required", "error");
    }

    setIsSubmitting(true);

    try {
      // Optional image upload to Cloudinary
      let imageName = blogData.image;
      if (imageFile) {
        showPopup("📤 Uploading image...", "info");
        const uploadedUrl = await uploadImageToCloudinary(
          imageFile,
          "msmp/blogs"
        );
        imageName = uploadedUrl || imageFile.name;
      }

      // POST to backend
      const res = await fetch(`${API_BASE}/api/alldata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: blogData.title,
          description: blogData.description,
          image: imageName,
          date: blogData.date,
          details: blogData.details || blogData.description,
          readTime: blogData.readTime || "3 mins",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add blog");
      }

      setBlogData({
        date: "",
        title: "",
        image: null,
        readTime: "",
        description: "",
        details: "",
      });
      setImageFile(null);
      showPopup("✅ Blog added successfully!", "success");
    } catch (err) {
      console.error("Error adding blog:", err);
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

      <div className="blog-form-container">
        <BackButton onClick={handleBack} />
        <form className="blog-form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="blog-row">
            <div className="blog-group">
              <label className="blog-label">Date of Blog :</label>
              <DatePicker
                value={blogData.date}
                onChange={handleDateChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="blog-group">
              <label className="blog-label">Title of the Blog:</label>
              <input
                type="text"
                name="title"
                placeholder="Title of the Blog"
                value={blogData.title}
                onChange={handleChange}
                className="blog-input"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="blog-row">
            <div className="blog-group">
              <label className="blog-label">Select Banner Image:</label>

              <label className="image-upload-box">
                <span>
                  {blogData.image ? blogData.image : "Upload an image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden-input"
                  disabled={isSubmitting}
                />
              </label>
            </div>

            <div className="blog-group">
              <label className="blog-label">
                Read-time for the blog (in mins):
              </label>
              <input
                type="text"
                name="readTime"
                placeholder="For eg. 4 mins"
                value={blogData.readTime}
                onChange={handleChange}
                className="blog-input"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Small Description */}
          <div className="blog-group full-width">
            <label className="blog-label">
              Small description of the blog :
            </label>
            <textarea
              name="description"
              placeholder="Write a summary or short description of the blog"
              value={blogData.description}
              onChange={handleChange}
              className="blog-textarea small"
              disabled={isSubmitting}
            ></textarea>
          </div>

          {/* Full Information */}
          <div className="blog-group full-width">
            <label className="blog-label" style={{ marginTop: "1em" }}>
              Full Information of the blog :
            </label>

            <ReactQuill
              theme="snow"
              value={blogData.details}
              onChange={(val) =>
                setBlogData((prev) => ({ ...prev, details: val }))
              }
              className="rich-editor"
              placeholder="Write the complete info of the blog"
              readOnly={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="blog-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Done"}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddABlog;
