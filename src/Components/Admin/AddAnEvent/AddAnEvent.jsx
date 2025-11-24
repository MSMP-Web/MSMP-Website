import React, { useState } from "react";
import BackButton from "../../BackButton/BackButton";
import "./AddAnEvent.css";
import DatePicker from "../../DatePicker/Datepicker";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";


function AddAnEvent({ onBack }) {
  const [eventData, seteventData] = useState({
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
    seteventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (dateStr) => {
    seteventData((prev) => ({ ...prev, date: dateStr }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    seteventData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("event Submitted:", eventData);
    alert("🎉 event Added Successfully!");
  };

  return (
    <>
      <div className="event-form-container">
        <BackButton onClick={handleBack} />
        <form className="event-form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="event-row">
            <div className="event-group">
              <label className="event-label">Date of event :</label>
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
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="event-row">
            <div className="event-group">
              <label className="event-label">Select Banner Image:</label>

              <label className="image-upload-box">
                <span>
                  {eventData.image ? eventData.image.name : "Upload an image"}
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

          {/* Small Description */}
          <div className="event-group full-width">
            <label className="event-label">
              Small description of the event :
            </label>
            <textarea
              name="smallDesc"
              placeholder="Write a summary or short description of the event"
              value={eventData.smallDesc}
              onChange={handleChange}
              className="event-textarea small"
            ></textarea>
          </div>

          {/* Full Information */}
          <div className="event-group full-width">
            <label className="event-label" style={{marginTop:"1em"}}>Full Information of the event :</label>

            <ReactQuill
              theme="snow"
              value={eventData.fullInfo}
              onChange={(val) =>
                seteventData((prev) => ({ ...prev, fullInfo: val }))
              }
              className="rich-editor"
              placeholder="Write the complete info of the event"
            />
          </div>

          <button type="submit" className="event-submit-btn">
            Done
          </button>
        </form>
      </div>
    </>
  );
}

export default AddAnEvent;
