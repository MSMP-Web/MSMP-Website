import React from "react";
import "./BackButton.css";

function BackButton({ onClick, label = "Back" }) {
  return (
    <button className="back-button" onClick={onClick}>
      ← {label}
    </button>
  );
}

export default BackButton;
