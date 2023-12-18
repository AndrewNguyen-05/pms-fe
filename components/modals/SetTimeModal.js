import React, { useEffect, useState } from "react";
import { InputField } from "../input/InputField";
import {
  deleteTime,
  getListTime,
  postCreateTime,
  putUpdateTime,
} from "@/services/projectServices";

const SetTimeModal = ({ selectedProject, aaData, selectedItem }) => {
  const [isNewTime, setIsNewTime] = useState(false);
  const [isEditTime, setIsEditTime] = useState(false);
  const [timeData, setTimeData] = useState([]);

  const [timeId, setTimeId] = useState("");

  const [newYear, setNewYear] = useState("");
  const [newSemester, setNewSemester] = useState("");
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");

  useEffect(() => {
    getTimeData();
  }, []);

  useEffect(() => {
    if (isEditTime) {
      let data = timeData.find((timeValue) => timeValue.id == timeId);
      setNewYear(data.year);
      setNewSemester(data.semester);
      setNewStart(data.start.slice(0, 16));
      setNewEnd(data.end.slice(0, 16));
    } else {
      setNewYear("");
      setNewSemester("");
      setNewStart("");
      setNewEnd("");
    }
  }, [isNewTime, isEditTime]);

  const getTimeData = async () => {
    let timedata = await getListTime();
    console.log("timedata", timedata);
    setTimeData(timedata);
  };

  const createNewTime = async () => {
    const newData = {
      newYear: newYear,
      newSemester: newSemester,
      faculty: aaData.faculty,
      newStart: newStart,
      newEnd: newEnd,
    };
    const result = await postCreateTime(newData);
    console.log("create time result >>> ", result);
    await getTimeData();
    setIsNewTime(false);
  };

  const editTime = async () => {
    const newData = {
      id: timeId,
      newYear: newYear,
      newSemester: newSemester,
      faculty: aaData.faculty,
      newStart: newStart,
      newEnd: newEnd,
    };
    await putUpdateTime(newData);
    await getTimeData();
    setIsNewTime(false);
    setIsEditTime(false);
  };

  const setTime = async () => {
    if (isNewTime && isEditTime) {
      await editTime();
    } else if (isNewTime) {
      await createNewTime();
    }
  };

  const handleDeleteTime = async () => {
    await deleteTime(timeId);
    await getTimeData();
    setTimeId("");
  };

  return (
    <div>
      <button
        className="btn-blue "
        onClick={() => document.getElementById("set_time_modal").showModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Set time
      </button>

      <dialog id="set_time_modal" className="modal">
        <div className="modal-box max-w-5xl max-h-screen">
          <h2 className="text-2xl mb-6 mx-2 font-bold text-blue-600">
            Set register time
          </h2>
          <div className="flex flex-row gap-3">
            {!isNewTime ? (
              <div className="flex flex-row gap-3">
                <div className="flex flex-col">
                  <label className="text-left font-semibold">
                    Semester - Year
                  </label>
                  <select
                    value={timeId}
                    className="border border-gray-200 rounded px-2 py-1 w-72 focus:border focus:border-black"
                    onChange={(e) => {
                      setTimeId(e.target.value);
                    }}
                  >
                    <option value="">Not selected</option>
                    {timeData.map((time, index) => {
                      return (
                        <option value={time.id} key={index}>
                          {time.semester} - {time.year}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button
                  onClick={() => {
                    setIsNewTime(true);
                  }}
                  className="self-end px-5 py-1 text-base font-medium border-2 border-blue-700 text-center text-blue-700 bg-white  rounded-lg focus:ring-2 focus:ring-blue-200 hover:bg-blue-700 hover:text-white"
                >
                  New
                </button>{" "}
                {timeId != "" ? (
                  <button
                    onClick={() => {
                      setIsNewTime(true);
                      setIsEditTime(true);
                    }}
                    className="self-end px-5 py-1 text-base font-medium border-2 border-blue-700 text-center text-blue-700 bg-white  rounded-lg focus:ring-2 focus:ring-blue-200 hover:bg-blue-700 hover:text-white"
                  >
                    Edit
                  </button>
                ) : (
                  <></>
                )}
                <button
                  onClick={() => {
                    handleDeleteTime();
                  }}
                  className="self-end px-5 py-1 text-base font-medium border-2 border-red-700 text-center text-red-700 bg-white  rounded-lg focus:ring-2 focus:ring-blue-200 hover:bg-red-700 hover:text-white"
                >
                  Delete
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-3">
                  <div className="flex flex-col">
                    <label className="text-left font-semibold">Year</label>
                    <input
                      value={newYear}
                      type="text"
                      className="border border-gray-200 rounded px-2 py-1 w-72 focus:border focus:border-black"
                      onChange={(e) => {
                        setNewYear(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-left font-semibold">Semester</label>
                    <input
                      value={newSemester}
                      type="text"
                      className="border border-gray-200 rounded px-2 py-1 w-72 focus:border focus:border-black"
                      onChange={(e) => {
                        setNewSemester(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-3">
                  <div className="flex flex-col">
                    <label className="text-left font-semibold">Start</label>
                    <input
                      value={newStart}
                      type="datetime-local"
                      className="border border-gray-200 rounded px-2 py-1 w-72 focus:border focus:border-black"
                      onChange={(e) => {
                        setNewStart(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-left font-semibold">End</label>
                    <input
                      value={newEnd}
                      type="datetime-local"
                      className="border border-gray-200 rounded px-2 py-1 w-72 focus:border focus:border-black"
                      onChange={(e) => {
                        setNewEnd(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      setIsNewTime(false);
                      setIsEditTime(false);
                    }}
                    className="self-end px-5 py-1 text-base font-medium border-2 border-red-700 text-center text-red-700 bg-white  rounded-lg focus:ring-2 focus:ring-blue-200 hover:bg-red-700 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="modal-action flex gap-3">
            <button
              onClick={() => {
                setTime();
                document.getElementById("set_time_modal").close();
              }}
              type="button"
              className="items-center px-5 py-2.5 mt-4 text-base font-medium border-2 border-blue-700 text-center text-blue-700 bg-white  rounded-lg focus:ring-2 focus:ring-blue-200 hover:bg-blue-700 hover:text-white"
            >
              Save
            </button>
            <button
              onClick={() => {
                document.getElementById("set_time_modal").close();
              }}
              type="button"
              className="items-center px-5 py-2.5 mt-4 text-base font-medium border-2 border-red-600 text-center text-red-600 bg-white rounded-lg focus:ring-2 focus:ring-red-200 hover:bg-red-600 hover:text-white hover:border-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="hidden">close</button>
        </form>
      </dialog>
    </div>
  );
};

export default SetTimeModal;
