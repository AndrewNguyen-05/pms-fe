import React, { use } from "react";
import Meta from "@/components/header/Meta";
import ButtonCreate from "@/components/buttons/ButtonCreate";
import ButtonDelete from "@/components/buttons/ButtonDelete";
import TableViewItem from "@/components/views/TableViewItem";
import SearchBar from "@/components/SearchBar";
import {
  deleteScore,
  getScoreList,
  searchScore,
} from "@/services/scoreServices";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import WarningModal from "@/components/modals/WarningModal";
import { toast } from "react-toastify";

const ViewScore = () => {
  const [scoreList, setScoreList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [pageSearchValue, setPageSearchValue] = useState("");

  //control the state of open modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //list of score that is selected
  const [selectedScore, setSelectedScore] = useState([]);

  useEffect(() => {
    getScoreData();
    setCurrentOffset((currentPage - 1) * currentLimit + 1);
  }, [currentPage, pageSearchValue]);

  const setScoreListRaw = (scoreData) => {
    console.log(">>", scoreData);
    setScoreList(
      scoreData.scores.map((row) => {
        return {
          id: row.id,
          name: row.Student1.User.name,
          studentId: row.Student1.studentCode,
          name2: row.Student2.User.name,
          studentId2: row.Student2.studentCode,
          projectName: row.Project.name,
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

  // btn DELETE events + modal for delete
  const handleDeleteClick = () => {
    if (selectedScore.length === 0) {
      toast.error("Please select at least one score to delete");
    } else if (selectedScore.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    const scoreIds = selectedScore.map((score) => score.id);
    let response = await deleteScore(scoreIds);
    setSelectedScore([]);
    setIsModalOpen(false);
    if (response && response.data && response.data.EC === 0) {
      toast.success(response.data.EM);
      getScoreData();
    } else {
      toast.error(response.data.EM);
      getScoreData();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // search event
  const handleSearch = async (searchValue) => {
    setCurrentPage(1);
    setPageSearchValue(searchValue);
  };

  return (
    <>
      <Meta title={"View score"} />
      <div className="bg-slate-50 h-full pt-6">
        {isModalOpen && (
          <WarningModal
            question="Are you sure you want to delete ?"
            btnYesText="Yes, I'm sure"
            btnNoText="No, cancel"
            handleConfirmDelete={handleConfirmDelete}
            handleCloseModal={handleCloseModal}
          />
        )}
        <div className="flex items-center">
          <div className="px-16">
            <SearchBar
              placeholder="Search Score..."
              handleSearch={handleSearch}
              handleKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch(event.target.value);
                }
              }}
            />
          </div>
          <div className="flex justify-end gap-8 w-full mr-16">
            <ButtonCreate
              text="Add new"
              href="/academic-affair/score/create-score"
            />
            <ButtonDelete
              text="Delete"
              onClick={() => {
                handleDeleteClick();
              }}
            />
          </div>
        </div>
        <div className="px-16 py-7 ">
          <TableViewItem
            columnNames={[
              "Student Name1",
              "student id1",
              "Student Name2",
              "student id2",
              "project name",
              "score",
              "Action",
            ]}
            rowList={scoreList}
            editHref={"/academic-affair/score/update-score/"}
            selectedItem={selectedScore}
            setSelectedItem={setSelectedScore}
          />
          <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4">
            <span className="text-sm font-normal text-gray-500  mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing{" "}
              <span className="font-semibold text-gray-900 ">
                {currentOffset}-{currentOffset + currentLimit - 1}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 ">{totalPage}</span>
            </span>
            <div>
              {totalPage > 0 && (
                <ReactPaginate
                  pageCount={totalPage}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={2}
                  onPageChange={handlePageClick}
                  forcePage={currentPage - 1}
                  previousLabel="Previous"
                  nextLabel="Next"
                  pageClassName="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  pageLinkClassName="flex items-center justify-center leading-tight px-3 h-8"
                  previousClassName="text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                  previousLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight "
                  nextClassName="text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                  nextLinkClassName="flex items-center justify-center px-3 h-8 leading-tight"
                  breakLabel="..."
                  breakClassName="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                  breakLinkClassName="flex items-center justify-center leading-tight px-3 h-8"
                  containerClassName="pagination"
                  activeClassName="text-blue-600 border border-gray-300 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 "
                  activeLinkClassName="flex items-center justify-center leading-tight px-3 h-8 text-white bg-blue-600 font-semibold "
                  renderOnZeroPageCount={null}
                  disabledClassName="opacity-50"
                  className="inline-flex"
                />
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ViewScore;
