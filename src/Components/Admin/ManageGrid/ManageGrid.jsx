import React from "react";
import "./ManageGrid.css";
import highlightIcon from "../../../assets/highlight.png";
import BlogIcon from "../../../assets/blog.png";
import carousalIcon from "../../../assets/Carousel.png";
import calendarIcon from "../../../assets/calendar.png";
import flagIcon from "../../../assets/Flag.png";
import speakerIcon from "../../../assets/Speaker.png";

function ManageGrid({ onLogout, onNavigate }) {
  const icons = [
    calendarIcon,
    BlogIcon,
    flagIcon,
    highlightIcon,
    carousalIcon,
    speakerIcon,
  ];

  const labels = [
    "Add Events To Calendar",
    "Add A Blog",
    "Add An Event",
    "Manage Highlights",
    "Manage Carousel",
    "Manage Voices In Action Section",
  ];

  const handleLogout = () => {
    localStorage.removeItem("authData");
    if (onLogout) onLogout();
  };

  const handleCardClick = (index) => {
    if (index === 0 && onNavigate) {
      onNavigate("AddEventsToCalendar");
    }
    if(index === 1 && onNavigate){
      onNavigate("AddABlog")
    }
    if(index === 2 && onNavigate){
      onNavigate("AddAnEvent")
    }
    if(index === 3 && onNavigate){
      onNavigate("ManageHighlights")
    }
    if(index === 4 && onNavigate){
      onNavigate("ManageCarousal")
    }
    if(index === 5 && onNavigate){
      onNavigate("ManageVoicesInAction")
    }
  };

  return (
    <div className="manage-grid-wrapper">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <div className="grid-container">
        {labels.map((label, index) => (
          <div
            key={index}
            className="card"
            onClick={() => handleCardClick(index)}
          >
            <img src={icons[index]} alt={label} className="card-image" />
            <h1>{label}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageGrid;
