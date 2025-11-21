import React from "react";
import BackButton from "../../BackButton/BackButton";

function AddABlog({ onBack }) {
  const handleBack = () => {
    if (onBack) onBack("ManageGrid");
  };
  return <BackButton onClick={handleBack}/>;
}

export default AddABlog;
