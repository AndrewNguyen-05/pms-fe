import React from "react";

const AnalysisCard = ({ title, icon, name, value }) => {
  return (
    <>
      <div className="bg-white w-[360px] h-24 shadow-md px-5 py-2 rounded-lg">
        <div className="flex justify-between items-center text-base">
          {title}
          {icon}
        </div>
        <div className="font-bold text-xl">{name}</div>
        <div className="text-gray-500 text-base font-semibold">{value}</div>
      </div>
    </>
  );
};

export default AnalysisCard;
