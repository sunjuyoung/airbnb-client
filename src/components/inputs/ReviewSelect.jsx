import React, { useState } from "react";
import Select from "react-select";
import { FaStar } from "react-icons/fa";
import { useMemo } from "react";

const ReviewSelect = ({ setRating }) => {
  const [selectedRating, setSelectedRating] = useState(null);

  const handleRatingChange = (selectedOption) => {
    setRating(selectedOption.value);
    setSelectedRating(() => selectedOption);
    // onChange(selectedRating);
  };

  const ratingOptions = [];
  for (let i = 1; i <= 5; i++) {
    const stars = [];
    for (let j = 0; j < i; j++) {
      stars.push(<FaStar key={j} />);
    }
    ratingOptions.push({ value: i, label: stars });
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      color: state.isSelected ? "white" : "inherit",
      backgroundColor: state.isSelected ? "#ffc107" : "inherit",
      width: "150px",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    }),
  };

  return (
    <div className="w-3/6 mx-2 rounded-lg">
      <Select
        value={selectedRating}
        onChange={handleRatingChange}
        options={ratingOptions}
        isSearchable={false}
        styles={customStyles}
      />
    </div>
  );
};

export default ReviewSelect;
