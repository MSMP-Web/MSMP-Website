import React, { useState } from "react";
import BackButton from "../../BackButton/BackButton";
import "./ManageHighlights.css";
import DatePicker from "../../DatePicker/Datepicker";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import RightTitleSection from "../../RightTitleSection/RightTitleSection";
import { notices } from "../../../data/alldata";

function ManageHighlights({ onBack }) {
  const [highlightData, setHighlightData] = useState({
    title: "",
    description: "",
    media: null, // image or video
  });

  const handleBack = () => {
    if (onBack) onBack("ManageGrid");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHighlightData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    setHighlightData((prev) => ({ ...prev, media: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Highlight Submitted:", highlightData);
    alert("🎉 Highlight Added Successfully!");
  };

  // Remove highlight form state
  const [highlightsList, setHighlightsList] = useState(notices || []);
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
    const removed = highlightsList.find((h) => h.id === idToRemove);
    setHighlightsList((prev) => prev.filter((h) => h.id !== idToRemove));
    setSelectedToRemove("");
    console.log("Removed highlight:", removed);
    alert(`Removed highlight: ${removed ? removed.title : idToRemove}`);
  };

  return (
    <>
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
            />
          </div>

          {/* Description */}
          <div className="highlight-group full-width">
            <label className="highlight-label">
              Description of the Highlight:
            </label>
            <ReactQuill
              theme="snow"
              value={highlightData.description}
              onChange={(val) =>
                setHighlightData((prev) => ({ ...prev, description: val }))
              }
              className="rich-editor"
              placeholder="Write the description of the highlight"
            />
          </div>

          {/* Media + Button Row */}
          <div className="highlight-row">
            <div className="highlight-group">
              <label className="highlight-label">
                Select Banner Image or Video:
              </label>

              <label className="highlight-upload-box">
                <span>
                  {highlightData.media
                    ? highlightData.media.name
                    : "Upload an image or video"}
                </span>
                <input
                  type="file"
                  accept="image/*, video/*"
                  onChange={handleMediaUpload}
                  className="hidden-input"
                />
              </label>
            </div>

            <button type="submit" className="highlight-submit-btn">
              Done
            </button>
          </div>
        </form>
        {/* Remove Highlight Form - single dropdown field as requested */}

        <RightTitleSection title={"Remove Highlights From The Board"} />
        <form className="highlight-form remove-form" onSubmit={handleRemoveSubmit}>
          <div className="highlight-group full-width" style={{marginTop:"1em", marginBottom:"1em"}}>
            <label className="highlight-label">select the title of the highligt to be removed</label>
            <select
              name="removeTitle"
              value={selectedToRemove}
              onChange={handleRemoveChange}
              className="highlight-input"
            >
              <option value="">-- Select title --</option>
              {highlightsList.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.title}
                </option>
              ))}
            </select>
          </div>

          <div className="highlight-row">
            <button type="submit" className="highlight-submit-btn remove-btn">
              Remove
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ManageHighlights;
