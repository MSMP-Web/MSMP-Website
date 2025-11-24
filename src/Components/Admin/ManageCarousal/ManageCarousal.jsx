import React, { useState } from "react";
import BackButton from "../../BackButton/BackButton";
import "./ManageCarousal.css";
import RightTitleSection from "../../RightTitleSection/RightTitleSection";

// Replace notices with slides
import { slides } from "../../../data/alldata";

function ManageCarousal({ onBack }) {
  const [carousalData, setCarousalData] = useState({
    title: "",
    eventLink: "",   // dropdown selected event
    media: null,
  });

  const handleBack = () => {
    if (onBack) onBack("ManageGrid");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarousalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    setCarousalData((prev) => ({ ...prev, media: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Carousal Submitted:", carousalData);
    alert("🎉 Carousal Added Successfully!");
  };

  // Remove carousal slide
  const [carousalList, setCarousalList] = useState(slides || []);
  const [selectedToRemove, setSelectedToRemove] = useState("");

  const handleRemoveChange = (e) => {
    setSelectedToRemove(e.target.value);
  };

  const handleRemoveSubmit = (e) => {
    e.preventDefault();
    if (!selectedToRemove) {
      alert("Please select a title to remove.");
      return;
    }

    const idToRemove = Number(selectedToRemove);
    const removed = carousalList.find((c) => c.id === idToRemove);
    setCarousalList((prev) => prev.filter((c) => c.id !== idToRemove));
    setSelectedToRemove("");
    console.log("Removed slide:", removed);
    alert(`Removed slide: ${removed ? removed.title : idToRemove}`);
  };

  return (
    <>
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
            />
          </div>

          {/* SELECT EVENT LINK (Dropdown) */}
          <div className="carousal-group full-width">
            <label className="carousal-label">
              Select event to open when clicked:
            </label>

            <select
              name="eventLink"
              value={carousalData.eventLink}
              onChange={handleChange}
              className="carousal-input"
            >
              <option value="">-- Select Event --</option>

              {carousalList.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Media + Button Row */}
          <div className="carousal-row">
            <div className="carousal-group">
              <label className="carousal-label">
                Select Banner Image:
              </label>

              <label className="carousal-upload-box">
                <span>
                  {carousalData.media
                    ? carousalData.media.name
                    : "Upload an image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMediaUpload}
                  className="hidden-input"
                />
              </label>
            </div>

            <button type="submit" className="carousal-submit-btn">
              Done
            </button>
          </div>
        </form>

        {/* REMOVE CAROUSAL SECTION */}
        <RightTitleSection title={"Remove Carousal Slides"} />

        <form className="carousal-form remove-form" onSubmit={handleRemoveSubmit}>
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
            <button type="submit" className="carousal-submit-btn remove-btn">
              Remove
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ManageCarousal;
