import React, { useState, useEffect } from "react";
import BackButton from "../../BackButton/BackButton";
import "./ManageVoicesInAction.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function ManageVoicesInAction({ onBack }) {
  const [voicesData, setVoicesData] = useState([]);
  const [allEventData, setAllEventData] = useState([]);
  const [selected, setSelected] = useState(["", "", "", ""]);
  const [currentVoiceIds, setCurrentVoiceIds] = useState([]); // Track currently stored voice IDs
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState(null);

  const handleBack = () => {
    if (onBack) onBack("ManageGrid");
  };

  const showPopup = (message, type) => {
    setPopup({ message, type });
    setTimeout(() => setPopup(null), 3000);
  };

  // Fetch all events and voices data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all events
        const eventsRes = await fetch(`${API_BASE}/api/alldata`);
        if (eventsRes.ok) {
          const events = await eventsRes.json();
          setAllEventData(events);
        }

        // Fetch voices (currently configured)
        const voicesRes = await fetch(`${API_BASE}/api/voices`);
        if (voicesRes.ok) {
          const voices = await voicesRes.json();
          setVoicesData(voices);
          
          // Track which voices are currently stored (by id)
          const voiceIds = voices.map((v) => v.id);
          setCurrentVoiceIds(voiceIds);
          
          // Pre-populate selections if voices exist
          if (voices.length > 0) {
            setSelected(
              voices.slice(0, 4).map((v) => v.id)
            );
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        showPopup("❌ Error fetching data", "error");
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (index, value) => {
    setSelected((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  // Helper to determine if an id is already chosen by another card or is already configured
  const isIdDisabled = (id, currentIndex) => {
    if (!id) return false;
    
    // Disable if already chosen in another card
    const isTakenElsewhere = selected.some(
      (s, idx) => idx !== currentIndex && String(s) === String(id)
    );
    
    // Disable if it's already configured in the database (but allow if it's the current selection)
    const isAlreadyConfigured = currentVoiceIds.includes(Number(id)) && 
                                String(selected[currentIndex]) !== String(id);
    
    return isTakenElsewhere || isAlreadyConfigured;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!selected.some((s) => s)) {
      return showPopup("❌ Please select at least one item", "error");
    }

    setIsSubmitting(true);

    try {
      // Delete existing voice documents for each position
      for (let i = 0; i < 4; i++) {
        const currentVoiceId = i + 1; // Voice IDs are 1, 2, 3, 4
        try {
          await fetch(`${API_BASE}/api/voices/${currentVoiceId}`, {
            method: "DELETE",
          });
        } catch (err) {
          // It's ok if voice doesn't exist yet
          console.log(`Voice ${currentVoiceId} doesn't exist yet, continuing...`);
        }
      }

      // Create new voices from the selected events
      for (let i = 0; i < 4; i++) {
        const selectedEventId = selected[i];
        
        // Only create if something was selected for this position
        if (selectedEventId) {
          const event = allEventData.find((e) => e.id === Number(selectedEventId));
          
          if (event) {
            const res = await fetch(`${API_BASE}/api/voices`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: i + 1, // Assign fixed IDs (1, 2, 3, 4)
                title: event.title,
                description: event.description,
                image: event.image,
                date: event.date,
                details: event.details,
                readTime: event.readTime,
              }),
            });

            if (!res.ok) {
              throw new Error(`Failed to create voice ${i + 1}`);
            }
          }
        }
      }

      // Update local state
      const newVoiceIds = selected.filter((id) => id).map(Number);
      setCurrentVoiceIds(newVoiceIds);
      showPopup("✅ Voices configuration saved successfully!", "success");
    } catch (err) {
      console.error("Error saving voices:", err);
      showPopup(`❌ Error: ${err.message}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="voices-wrapper">
      {popup && (
        <div className={`popup popup-${popup.type}`}>
          {popup.message}
        </div>
      )}

      <BackButton onClick={handleBack} />

      <form className="voices-form" onSubmit={handleSave}>
        <div className="voices-grid-container">
          {[0, 1, 2, 3].map((cardIndex) => (
            <div key={cardIndex} className="voices-card">
              <div className="voices-card-content">
                <h3 className="voices-card-title">Section {cardIndex + 1}</h3>

                <label className="voices-select-label">Select title</label>
                <select
                  className="voices-select"
                  value={selected[cardIndex]}
                  onChange={(e) =>
                    handleSelectChange(cardIndex, e.target.value)
                  }
                  disabled={isSubmitting}
                >
                  <option value="">-- choose a title --</option>
                  {allEventData.map((item) => {
                    const disabled = isIdDisabled(item.id, cardIndex);
                    return (
                      <option
                        key={item.id}
                        value={item.id}
                        disabled={disabled}
                        title={disabled && currentVoiceIds.includes(item.id) ? "Already configured" : ""}
                      >
                        {item.title}
                        {disabled && currentVoiceIds.includes(item.id) ? " (configured)" : ""}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="voices-save-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Configuration"}
        </button>
      </form>
    </div>
  );
}

export default ManageVoicesInAction;