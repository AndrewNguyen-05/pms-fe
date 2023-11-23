import React from "react";

const ScoreCard = ({ scoreObj, onClickView }) => {
  return (
    <div className="bg-white border-2 border-slate-100 rounded-2xl h-fit shadow-md ">
      <div className="grid grid-cols-12 px-5 py-3">
        <div className="col-span-4 ">
          <div className="font-semibold text-blue-700">
            {scoreObj.projectName}
          </div>
          <div>{scoreObj.teacher}</div>
        </div>
        <div className="col-span-1 "> </div>
        <div className="col-span-2 text-gray-500 flex flex-row justify-left ">
          <div className="bg-blue-50 text-blue-700 rounded-3xl justify-center text-center text-sm w-fit h-fit px-3 py-1">
            {scoreObj.faculty}
          </div>
          <div className="bg-blue-50 text-blue-700 rounded-3xl justify-center text-center text-sm w-fit h-fit px-3 py-1">
            {"type " + scoreObj.type}
          </div>
        </div>
        <div className="col-span-1 "> </div>
        <div className="col-span-3 flex flex-col justify-center border-l-2 border-l-blue-500 pl-3 ">
          <div>{scoreObj.studentName + " - " + scoreObj.studentCode}</div>
        </div>
        <div className="col-span-1 grid content-center">
          <div className="flex flex-col justify-center text-center border-2 border-blue-500 rounded-xl h-10 ">
            <div className="text-blue-500 font-bold text-xl	">
              <div>{scoreObj.score}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
