import React from "react";
import Meta from "@/components/header/Meta";
import {
  deleteScore,
  getScoreList,
  searchScore,
} from "@/services/scoreServices";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ScoreCard from "@/components/cards/ScoreCard";
import Footer from "@/components/footer/Footer";
import SearchBar from "@/components/SearchBar";

const NewViewScore = () => {
  const [score_list, setScoreList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [pageSearchValue, setPageSearchValue] = useState("");

  // use effect
  useEffect(() => {
    getScoreData();
    setCurrentOffset((currentPage - 1) * currentLimit + 1);
  }, [currentPage, pageSearchValue]);

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

  async function getScoreData() {
    let scoreData;
    if (!pageSearchValue) {
      scoreData = await getScoreList(currentPage, currentLimit);
    } else {
      scoreData = await searchScore(
        currentPage,
        currentLimit,
        pageSearchValue.toLowerCase()
      );
    }
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
