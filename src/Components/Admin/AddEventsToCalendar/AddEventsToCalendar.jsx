import React, { useState, useEffect } from "react";
import "./AddEventsToCalendar.css";
import DatePicker from "../../DatePicker/Datepicker";
import BackButton from "../../BackButton/BackButton";
import RightTitleSection from "../../RightTitleSection/RightTitleSection";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function AddEventsToCalendar({ onBack }) {
  const [formData, setFormData] = useState({
    date: "",
    title: "",
  });
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedToRemove, setSelectedToRemove] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState(null);

  const showPopup = (message, type) => {
    setPopup({ message, type });
    setTimeout(() => setPopup(null), 3000);
  };

  // Fetch existing calendar events on mount
  useEffect(() => {
    const fetchCalendarEvents = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/calendar`);
        if (res.ok) {
          const data = await res.json();
          setCalendarEvents(data);
        }
      } catch (err) {
        console.error("Error fetching calendar events:", err);
      }
    };

    fetchCalendarEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (dateStr) => {
    setFormData((prev) => ({ ...prev, date: dateStr }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      return showPopup("❌ Title required", "error");
    }
    if (!formData.date.trim()) {
      return showPopup("❌ Date required", "error");
    }

    setIsSubmitting(true);

    try {
      console.log("Submitting to:", `${API_BASE}/api/calendar`);
      console.log("Payload:", { title: formData.title, date: formData.date });

      const res = await fetch(`${API_BASE}/api/calendar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          date: formData.date,
        }),
      });

      console.log("Response status:", res.status);
      console.log("Response ok:", res.ok);

      const textData = await res.text();
      console.log("Response text:", textData);

      if (!res.ok) {
        try {
          const errorData = JSON.parse(textData);
          throw new Error(errorData.error || `HTTP ${res.status}: Failed to add event`);
        } catch (parseErr) {
          throw new Error(`HTTP ${res.status}: ${textData || "Failed to add event"}`);
        }
      }

      const newEvent = JSON.parse(textData);
      console.log("New event created:", newEvent);
      setCalendarEvents((prev) => [...prev, newEvent]);
      setFormData({ date: "", title: "" });
      showPopup("✅ Event added successfully!", "success");
    } catch (err) {
      console.error("Error adding event:", err);
      showPopup(`❌ ${err.message}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveChange = (e) => {
    setSelectedToRemove(e.target.value);
  };

  const handleRemoveEvent = async () => {
    if (!selectedToRemove) {
      return showPopup("❌ Please select an event to remove", "error");
    }

    setIsSubmitting(true);

    try {
      console.log("Deleting event:", selectedToRemove);
      const res = await fetch(`${API_BASE}/api/calendar/${selectedToRemove}`, {
        method: "DELETE",
      });

      console.log("Delete response status:", res.status);
      const textData = await res.text();
      console.log("Delete response text:", textData);

      if (!res.ok) {
        try {
          const errorData = JSON.parse(textData);
          throw new Error(errorData.error || `HTTP ${res.status}: Failed to remove event`);
        } catch (parseErr) {
          throw new Error(`HTTP ${res.status}: ${textData || "Failed to remove event"}`);
        }
      }

      setCalendarEvents((prev) =>
        prev.filter((e) => (e._id || e.id) !== selectedToRemove)
      );
      setSelectedToRemove("");
      showPopup("✅ Event removed successfully!", "success");
    } catch (err) {
      console.error("Error removing event:", err);
      showPopup(`❌ ${err.message}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔹 Handle Back Button → Go back to ManageGrid
  const handleBack = () => {
    if (onBack) onBack("ManageGrid");
  };

  return (
    <div className="add-event-container">
      {popup && (
        <div className={`popup popup-${popup.type}`}>
          {popup.message}
        </div>
      )}

      <BackButton onClick={handleBack} />

      <form className="add-event-form" onSubmit={handleSubmit}>
        <div className="something">
          <div className="form-group">
            <label htmlFor="eventDate" className="form-label">
              Date of Event
            </label>
            <DatePicker
              value={formData.date}
              onChange={handleDateChange}
              disabled={isSubmitting}
            />
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
              disabled={isSubmitting}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Done"}
        </button>
      </form>

      <RightTitleSection title={"Remove Event From Calendar"} />
      <form
        className="remove-event-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleRemoveEvent();
        }}
      >
        <div className="form-group">
          <label htmlFor="removeEvent" className="form-label">
            Select Event To Remove
          </label>
          <select
            id="removeEvent"
            value={selectedToRemove}
            onChange={handleRemoveChange}
            className="form-input"
            disabled={isSubmitting}
          >
            <option value="">-- Select event --</option>
            {calendarEvents.map((event) => (
              <option key={event._id || event.id} value={event._id || event.id}>
                {event.title} ({event.date})
              </option>
            ))}
          </select>
        </div>

        <input
          type="button"
          className="remove-button"
          onClick={handleRemoveEvent}
          value={isSubmitting ? "Removing..." : "Remove"}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}

export default AddEventsToCalendar;
