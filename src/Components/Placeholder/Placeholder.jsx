import React from "react";
import "./Placeholder.css"; // Create this CSS file for styling if needed

const Placeholder = () => {
  return (
    <div className="event-placeholder-container">
      <div className="event-placeholder-content">
        <h1>Content Coming Soon!</h1>
        <p>
          The content for this event is not yet available. We are working on it and will update it soon.
          Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default Placeholder;
