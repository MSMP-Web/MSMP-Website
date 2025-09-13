import React from "react";
import "./LeftTitleSection.css";
import mandala from "../../assets/mandalaLeft.png"

const LeftTitleSection = ({ title }) => {
  // Split title into all words except last + last word
  const words = title.trim().split(" ");
  const lastWord = words.pop();
  const firstPart = words.join(" ");

  return (
    <div className="title-section">
      <img src={mandala} alt="Mandala" className="mandala" />
      <h2 className="title-text">
        {firstPart} <span className="highlight">{lastWord}</span>
      </h2>
    </div>
  );
};

export default LeftTitleSection;
