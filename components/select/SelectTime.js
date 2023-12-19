import React from "react";

const SelectTime = ({ timeData, selectedTime, handleSelectTime }) => {
  return (
    <select
      className="select select-info w-full max-w-xs"
      value={selectedTime}
      onChange={(e) => {
        handleSelectTime(e);
      }}
    >
      <option value="">All</option>
      {timeData.map((timeValue, index) => {
        return (
          <option value={timeValue.id} key={index}>
            {timeValue.semester} - {timeValue.year}
          </option>
        );
      })}
      <option value="#NotSetted">Not setted</option>
    </select>
  );
};

export default SelectTime;
