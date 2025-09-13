import React from "react";
import "./Separator.css";

const Separator = ({ text }) => {
  return (
    <div className="separator">
      <span className="line"></span>
      {text && <span className="separator-text">{text}  </span>}
      <span className="line"></span>
    </div>
  );
};

export default Separator;
