import React, { useState } from "react";
import BackButton from "../../BackButton/BackButton";
import "./AddABlog.css";
import DatePicker from "../../DatePicker/Datepicker";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";


function AddABlog({ onBack }) {
  const [blogData, setBlogData] = useState({
    date: "",
    title: "",
    image: null,
    readTime: "",
    smallDesc: "",
    fullInfo: "",
  });

  const handleBack = () => {
    if (onBack) onBack("ManageGrid");
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
    setBlogData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Blog Submitted:", blogData);
    alert("🎉 Blog Added Successfully!");
  };

  return (
    <>
      <div className="blog-form-container">
        <BackButton onClick={handleBack} />
        <form className="blog-form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="blog-row">
            <div className="blog-group">
              <label className="blog-label">Date of Blog :</label>
              <DatePicker value={blogData.date} onChange={handleDateChange} />
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
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="blog-row">
            <div className="blog-group">
              <label className="blog-label">Select Banner Image:</label>

              <label className="image-upload-box">
                <span>
                  {blogData.image ? blogData.image.name : "Upload an image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden-input"
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
              />
            </div>
          </div>

          {/* Small Description */}
          <div className="blog-group full-width">
            <label className="blog-label">
              Small description of the blog :
            </label>
            <textarea
              name="smallDesc"
              placeholder="Write a summary or short description of the blog"
              value={blogData.smallDesc}
              onChange={handleChange}
              className="blog-textarea small"
            ></textarea>
          </div>

          {/* Full Information */}
          <div className="blog-group full-width">
            <label className="blog-label" style={{marginTop:"1em"}}>Full Information of the blog :</label>

            <ReactQuill
              theme="snow"
              value={blogData.fullInfo}
              onChange={(val) =>
                setBlogData((prev) => ({ ...prev, fullInfo: val }))
              }
              className="rich-editor"
              placeholder="Write the complete info of the blog"
            />
          </div>

          <button type="submit" className="blog-submit-btn">
            Done
          </button>
        </form>
      </div>
    </>
  );
}

export default AddABlog;
