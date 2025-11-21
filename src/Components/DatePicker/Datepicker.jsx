import React, { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; // Import the Flatpickr CSS

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
