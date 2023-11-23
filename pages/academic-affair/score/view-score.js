import React from "react";
import Meta from "@/components/Meta";
import {
  deleteScore,
  getScoreList,
  searchScore,
} from "@/services/scoreServices";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ScoreCard from "@/components/ScoreCard";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
// import ReactPaginate from "react-paginate";
// import WarningModal from "@/components/WarningModal";
// import InfiniteScroll from "react-infinite-scroll-component";

const NewViewScore = () => {
  const [score_list, setScoreList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [initialSetup, setInitialSetup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [pageSearchValue, setPageSearchValue] = useState("");

  // //control the state of open modal
  // const [isModalOpen, setIsModalOpen] = useState(false);

  //list of score that is selected
  const [selectedScore, setSelectedScore] = useState([]);

  // // scorlled to last
  // const [hasMoreScorll, setHasMoreScroll] = useState(true);

  // use effect
  useEffect(() => {
    getScoreData();
    setCurrentOffset((currentPage - 1) * currentLimit + 1);
  }, [currentPage, pageSearchValue]);

  const setScoreListRaw = (scoreData) => {
    setScoreList(
      // score_list.concat(
      //   scoreData.scores.map((row) => {
      //     return {
      //       projectName: row.Project.name,
      //       teacher: row.Project.Teacher.User.name,
      //       faculty: row.Project.faculty,
      //       type: row.Project.type,
      //       student1Name: row.Student1.User.name,
      //       student1Code: row.Student1.studentCode,
      //       student2Name: row.Student2.User.name,
      //       student2Code: row.Student2.studentCode,
      //       score: row.score,
      //     };
      //   })
      // )
      scoreData.scores.map((row) => {
        return {
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
    // if (initialSetup == true && currentPage > totalPage) {
    //   setHasMoreScroll(false);
    //   return;
    // }
    // setInitialSetup(true);

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

  // btn DELETE events + modal for delete
  // const handleDeleteClick = () => {
  //   if (selectedScore.length === 0) {
  //     toast.error("Please select at least one score to delete");
  //   } else if (selectedScore.length > 0) {
  //     setIsModalOpen(true);
  //   }
  // };

  // const handleConfirmDelete = async () => {
  //   const scoreIds = selectedScore.map((score) => score.id);
  //   let response = await deleteScore(scoreIds);
  //   setSelectedScore([]);
  //   setIsModalOpen(false);
  //   if (response && response.data && response.data.EC === 0) {
  //     toast.success(response.data.EM);
  //     getScoreData();
  //   } else {
  //     toast.error(response.data.EM);
  //     getScoreData();
  //   }
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  // search event
  const handleSearch = async (searchValue) => {
    setCurrentPage(1);
    setPageSearchValue(searchValue);
  };

  // const handleScroll = async (event) => {
  //   setCurrentPage(currentPage + 1);
  // };

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
              <>
                <ScoreCard scoreObj={score_item} />
              </>
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
        {/* <div className="">
          <InfiniteScroll
            dataLength={scoreList.length} //This is important field to render the next data
            next={handleScroll}
            hasMore={hasMoreScorll}
            loader={
              <div className="flex justify-center my-10">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Nothing more to show</b>
              </p>
            }
            className="flex flex-col px-16 py-7 gap-3 "
          >
            {scoreList.map((item, index) => {
              return <ScoreCard scoreObj={item} key={index} />;
            })}
          </InfiniteScroll>
        </div>*/}
      </div>
    </>
  );
};

export default NewViewScore;
