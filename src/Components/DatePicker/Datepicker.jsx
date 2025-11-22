import React, { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
// import "flatpickr/dist/themes/confetti.css";
// import "flatpickr/dist/themes/airbnb.css";
import "./DatePicker.css"
import "flatpickr/dist/flatpickr.min.css"; 

const DatePicker = ({ value, onChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const fp = flatpickr(inputRef.current, {
      dateFormat: "Y-m-d",
      defaultDate: value || null,
      onChange: (selectedDates, dateStr) => {
        if (onChange) onChange(dateStr);
      },
      allowInput: true,
    });

    // Cleanup when component unmounts
    return () => fp.destroy();
  }, [value, onChange]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="YYYY-MM-DD"
      className="date-input"
    />
  );
};

export default DatePicker;
