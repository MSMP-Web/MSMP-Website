import "./ToggleButtons.css";
import React from 'react'

function ToggleButtons({ showCalendar, setShowCalendar, showNotice, setShowNotice }) {
  return (
    <div className="fixed-buttons">
        <button 
        onClick={() => setShowCalendar(prev => !prev)} 
        className="calendar-btn"
        >
            <img src="/calendar.png" alt="" className="toggle-image"/>
        </button>

        <button 
        onClick={() => setShowNotice(prev => !prev)} 
        className="notice-btn"
        >
            <img src="/notice.png" alt="" className="toggle-image"/>
        </button>
    </div>
  )
}

export default ToggleButtons