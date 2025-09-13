import React from "react";
import "./RightTitleSection.css";
import mandala from "../../assets/mandalaRight.png"

const RightTitleSection = ({ title }) => {
  // Split title into all words except last + last word
  const words = title.trim().split(" ");
  const lastWord = words.pop();
  const firstPart = words.join(" ");

  return (
    <div className="title-section">
      <h2 className="title-text">
        {firstPart} <span className="highlight">{lastWord}</span>
      </h2> 
      <img src={mandala} alt="Mandala" className="mandalaRight" />
    </div>
  );
};

export default RightTitleSection;
