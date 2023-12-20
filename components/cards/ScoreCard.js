import { useState, useEffect } from "react";
import { updateScore } from "@/services/scoreServices";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ScoreCard = ({ scoreObj, isTeacher = false, setParentPageReload }) => {
  const [progressValue, setProgressValue] = useState(0);
  const [progressEndValue, setProgressEndValue] = useState(0);
  const speed = 10;

  useEffect(() => {
    setProgressEndValue(scoreObj.score);
    setProgressValue(0);
  }, [scoreObj.score]);

  useEffect(() => {
    const progress = setInterval(() => {
      setProgressValue((prevValue) => {
        if (prevValue < progressEndValue) {
          return parseFloat((prevValue + 0.1).toFixed(1));
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
  const inputValue = 0;
  const inputStep = 0.1;
  const handleScoreClick = async () => {
    await Swal.fire({
      title: `Score information`,
      html: `
      <div class="p-0 text-left">
        <div class="mb-2"><span class="font-semibold">Project:</span> ${
          scoreObj.projectName
        }</div>
        <div class="my-2">
          <div class="font-semibold mb-1">Submit link of this project:</div>
          ${
            scoreObj.submitLink === null
              ? "Students haven't submitted yet!"
              : `<span>${scoreObj.submitLink}</span>`
          }
        </div>
        <div class="flex gap-2 items-center mt-2">
          <span class="font-semibold">Grading this project:</span>
          <span>
          <input
          type="number"
          value="${inputValue}"
          step="${inputStep}"
          min="0"
          max="10"
          class="swal2-input mt-2 mr-1 w-[80px] p-0"
          id="range-value"
        /> / 10</span>
        </div>
        
      </div>`,
      input: "range",
      inputValue,
      inputAttributes: {
        min: "0",
        max: "10",
        step: inputStep.toString(),
      },
      didOpen: () => {
        const inputRange = Swal.getInput();
        const inputNumber = Swal.getPopup().querySelector("#range-value");

        if (!inputRange || !inputNumber) {
          return;
        }

        // remove default output
        Swal.getPopup().querySelector("output").style.display = "none";
        inputRange.style.width = "100%";

        // sync input[type=number] with input[type=range]
        inputRange.addEventListener("input", () => {
          inputNumber.value = inputRange.value;
        });

        // sync input[type=range] with input[type=number]
        inputNumber.addEventListener("change", () => {
          inputRange.value = inputNumber.value;
        });
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await updateScore(scoreObj.id, result.value);
        if (res && res.data.EC === 0) {
          toast.success("Update score successfully!");
        } else {
          toast.error("Update score failed!");
        }
        setParentPageReload(true);
      }
    });
  };
  return (
    <div
      onClick={isTeacher === true ? handleScoreClick : null}
      className={
        isTeacher === true
          ? "hover:cursor-pointer bg-white border-2 border-slate-100 rounded-2xl h-28 my-2 shadow-md "
          : "bg-white border-2 border-slate-100 rounded-2xl h-28 my-2 shadow-md "
      }
    >
      <div className="grid grid-cols-7 px-16 py-5 h-full ">
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
