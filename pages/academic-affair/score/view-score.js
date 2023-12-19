import React from "react";
import Meta from "@/components/header/Meta";
import {
  deleteScore,
  getScoreList,
  getScoreData,
  searchScore,
} from "@/services/scoreServices";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ScoreCard from "@/components/cards/ScoreCard";
import Footer from "@/components/footer/Footer";
import SearchBar from "@/components/SearchBar";
import ExportExcel from "@/utils/exportScoreList";
import SelectTime from "@/components/select/SelectTime";
import { getListTime } from "@/services/projectServices";

const NewViewScore = () => {
  const [score_list, setScoreList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [pageSearchValue, setPageSearchValue] = useState("");

  const [timeData, setTimeData] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  // use effect
  useEffect(() => {
    getScoreInfo();
    setCurrentOffset((currentPage - 1) * currentLimit + 1);
  }, [currentPage, pageSearchValue, selectedTime]);

  // get time data
  useEffect(() => {
    getTimeData();
  }, []);

  const getTimeData = async () => {
    let timedata = await getListTime();
    console.log("timedata", timedata);
    setTimeData(timedata);
  };

  const setScoreListRaw = (scoreData) => {
    setScoreList(
      scoreData.scores.map((row) => {
        return {
          id: row.id,
          projectName: row.Project.name,
          teacher: row.Project.Teacher.User.name,
          faculty: row.Project.faculty,
          type: row.Project.type,
          student1Name: row.Student1.User.name,
          student1Code: row.Student1.studentCode,
          student2Name: row.Student2.User.name,
          student2Code: row.Student2.studentCode,
          score: row.score,
        };
      })
    );
  };

  async function getScoreInfo() {
    let scoreData;
    scoreData = await searchScore(
      currentPage,
      currentLimit,
      pageSearchValue?.toLowerCase(),
      selectedTime === "" ? null : selectedTime
    );
    setScoreListRaw(scoreData);
    setTotalPage(scoreData.totalPage);
  }

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  // search event
  const handleSearch = async (searchValue) => {
    setCurrentPage(1);
    setPageSearchValue(searchValue);
  };

  // export event
  const handleExport = async () => {
    const data = await getScoreList(selectedTime);
    ExportExcel(data);
  };

  //select time event
  const handleSelectTime = (e) => {
    setSelectedTime(e.target.value);
    setCurrentPage(1);
    setPageSearchValue(pageSearchValue);
  };

  return (
    <>
      <Meta title={"View score"} />
      <div className="bg-slate-50 h-full w-full overflow-auto flex flex-col justify-between pt-6">
        <div className="flex items-start flex-shrink">
          <div className="px-16">
            <SearchBar
              placeholder="Search Project..."
              handleSearch={handleSearch}
              handleKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch(event.target.value);
                }
              }}
            />
          </div>
          <div className="flex justify-end gap-4 w-full mr-16">
            <SelectTime
              timeData={timeData}
              selectedTime={selectedTime}
              handleSelectTime={handleSelectTime}
            />
            <button className="btn-blue" onClick={() => handleExport()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
                />
              </svg>
              Export
            </button>
          </div>
        </div>
        <div className="px-16 py-7">
          {score_list.map((score_item) => {
            return (
              <div key={score_item.id}>
                <ScoreCard scoreObj={score_item} />
              </div>
            );
          })}
          <div className="flex items-center flex-row flex-wrap justify-between pt-4">
            <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing{" "}
              <span className="font-semibold text-gray-900 ">
                {currentOffset}-{currentOffset + currentLimit - 1}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 ">{totalPage}</span>
            </span>

            <div className="">
              {totalPage > 0 && (
                <Footer
                  totalPage={totalPage}
                  handlePageClick={handlePageClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewViewScore;
