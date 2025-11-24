import React, { useState } from "react";
import BackButton from "../../BackButton/BackButton";
import "./ManageVoicesInAction.css";
import { allData } from "../../../data/alldata";

function ManageVoicesInAction({ onBack }) {
  const handleBack = () => {
    if (onBack) onBack("ManageGrid");
  };

  // State to hold selected item id for each of the four cards
  const [selected, setSelected] = useState(["", "", "", ""]);

  const handleSelectChange = (index, value) => {
    setSelected((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  // helper to determine if an id is already chosen by another card
  const isIdTakenElsewhere = (id, currentIndex) => {
    if (!id) return false;
    return selected.some((s, idx) => idx !== currentIndex && String(s) === String(id));
  };

  return (
    <div className="voices-wrapper">
      <BackButton onClick={handleBack} />

      <div className="voices-grid-container">
        {[0, 1, 2, 3].map((cardIndex) => (
          <div key={cardIndex} className="voices-card">
            <div className="voices-card-content">
              <h3 className="voices-card-title">Section {cardIndex + 1}</h3>

              <label className="voices-select-label">Select title</label>
              <select
                className="voices-select"
                value={selected[cardIndex]}
                onChange={(e) => handleSelectChange(cardIndex, e.target.value)}
              >
                <option value="">-- choose a title --</option>
                {allData.map((item) => {
                  const disabled = isIdTakenElsewhere(item.id, cardIndex);
                  return (
                    <option key={item.id} value={item.id} disabled={disabled}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageVoicesInAction;