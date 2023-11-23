import { useState, useEffect, use } from "react";

const ScoreCard = ({ scoreObj }) => {
  const [progressValue, setProgressValue] = useState(0);
  const [progressEndValue, setProgressEndValue] = useState(0);
  const speed = 50;

  useEffect(() => {
    setProgressEndValue(scoreObj.score);
    setProgressValue(0);
  }, [scoreObj.score]);

  useEffect(() => {
    const progress = setInterval(() => {
      setProgressValue((prevValue) => {
        if (prevValue < progressEndValue) {
          return prevValue + 1;
        }
        clearInterval(progress);
        return prevValue;
      });
    }, speed);

    return () => clearInterval(progress);
  }, [progressEndValue]);

  const progressBarStyle = {
    background: `conic-gradient(#4d5bf9 ${progressValue * 36}deg, #cadcff ${
      progressValue * 36
    }deg)`,
  };

  return (
    <div className="bg-white border-2 border-slate-100 rounded-2xl h-[110px] my-2 shadow-md ">
      <div className="grid grid-cols-7 px-20 py-5 h-full ">
        <div className="col-span-5 flex flex-col justify-between">
          <div className="font-bold text-blue-700">{scoreObj.projectName}</div>
          <div className="grid grid-cols-5 text-base my-1">
            <div className="col-span-2 text-base">
              <span className="">Giảng viên: </span>
              {scoreObj.teacher}
            </div>
            <div className="col-span-3 text-sm flex gap-4">
              {scoreObj.type === "1" ? (
                <div className="text-sm bg-blue-200 py-1 px-3 text-blue-700 rounded-3xl flex justify-center items-center">
                  Đồ án 1
                </div>
              ) : (
                <div className="text-sm bg-sky-100 py-1 px-3 text-sky-700 rounded-3xl flex justify-center items-center">
                  Đồ án 2
                </div>
              )}
              <div>
                <div className="bg-blue-50 text-blue-700 rounded-3xl flex justify-center items-center py-1 px-3">
                  {scoreObj.faculty}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex justify-between">
          <div className="flex flex-col justify-center font-semibold">
            {scoreObj.student1Name === null ? (
              <div></div>
            ) : (
              <div>{scoreObj.student1Name + " - " + scoreObj.student1Code}</div>
            )}
            {scoreObj.student2Name === null ? (
              <div></div>
            ) : (
              <div>{scoreObj.student2Name + " - " + scoreObj.student2Code}</div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <div className=" bg-white grid place-items-center">
              <div className="circular-progress" style={progressBarStyle}>
                <div className="relative font-semibold text-blue-700 text-3xl">
                  {progressValue}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
