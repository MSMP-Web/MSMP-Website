import React, { useState } from "react";
import "./AddEventsToCalendar.css";
import DatePicker from "../../DatePicker/Datepicker";
import BackButton from "../../BackButton/BackButton";
import RightTitleSection from "../../RightTitleSection/RightTitleSection";
function AddEventsToCalendar({ onBack }) {
  const [formData, setFormData] = useState({
    date: "",
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (dateStr) => {
    setFormData((prev) => ({ ...prev, date: dateStr }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Added:", formData);
    alert(`🎉 Event "${formData.title}" added on ${formData.date}`);
    setFormData({ date: "", title: "" }); // Reset form
  };

  const handleRemoveEvent = (e) => {
    console.log("logic for removing date from selected date");
  };

  // 🔹 Handle Back Button → Go back to ManageGrid
  const handleBack = () => {
    if (onBack) onBack("ManageGrid");
  };

  return (
    <div className="add-event-container">
      <BackButton onClick={handleBack} />

      <form className="add-event-form" onSubmit={handleSubmit}>
        <div className="something">
          <div className="form-group">
            <label htmlFor="eventDate" className="form-label">
              Date of Event
            </label>
            <DatePicker value={formData.date} onChange={handleDateChange} />
          </div>
          <div className="form-group">
            <label htmlFor="eventTitle" className="form-label">
              Title of the Event
            </label>
            <input
              type="text"
              id="eventTitle"
              name="title"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        <button type="submit" className="submit-button">
          Done
        </button>
      </form>
      <RightTitleSection title={"Remove Event From Calendar"} />
      <form className="remove-event-form">
        <div className="form-group">
          <label htmlFor="eventDate" className="form-label">
            Date of Event To Remove
          </label>
          <DatePicker value={formData.date} onChange={handleDateChange} />
        </div>

        <input
          type="button"
          className="remove-button"
          onClick={handleRemoveEvent}
          value={"Remove"}
        />
      </form>
    </div>
  );
}

export default AddEventsToCalendar;
