import React, { use } from "react";
import Meta from "@/components/Meta";
import ButtonCreate from "@/components/ButtonCreate";
import ButtonDelete from "@/components/ButtonDelete";
import TableViewItem from "@/components/TableViewItem";
import SearchBar from "@/components/SearchBar";
import {
  deleteAnnouncement,
  getAnnouncementList,
  searchAnnouncement,
} from "@/services/announcementServices";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import WarningModal from "@/components/WarningModal";
import { toast } from "react-toastify";

const ViewAnnouncement = () => {
  const [announcementList, setAnnouncementList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [pageSearchValue, setPageSearchValue] = useState("");

  //control the state of open modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //list of announcement that is selected
  const [selectedAnnouncement, setSelectedAnnouncement] = useState([]);

  useEffect(() => {
    getAnnouncementData();
    setCurrentOffset((currentPage - 1) * currentLimit + 1);
    console.log("effect called");
  }, [currentPage, pageSearchValue]);

  const setAnnouncementListRaw = (announcementData) => {
    setAnnouncementList(
      announcementData.announcements.map((row) => {
        return {
          id: row.id,
          title: row.title,
          isPublic: row.isPublic ? "posted" : "not posted",
          dateCreated: row.dateCreated ? row.dateCreated.slice(0, 10) : "",
          dateUpdated: row.dateUpdated ? row.dateUpdated.slice(0, 10) : "",
        };
      })
    );
  };

  async function getAnnouncementData() {
    console.log("anncallled", pageSearchValue);
    let announcementData;
    if (!pageSearchValue) {
      announcementData = await getAnnouncementList(currentPage, currentLimit);
    } else {
      announcementData = await searchAnnouncement(
        currentPage,
        currentLimit,
        pageSearchValue.toLowerCase()
      );
    }
    setAnnouncementListRaw(announcementData);
    setTotalPage(announcementData.totalPage);
  }

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  // btn DELETE events + modal for delete
  const handleDeleteClick = () => {
    if (selectedAnnouncement.length === 0) {
      toast.error("Please select at least one announcement to delete");
    } else if (selectedAnnouncement.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    const announcementIds = selectedAnnouncement.map(
      (announcement) => announcement.id
    );
    let response = await deleteAnnouncement(announcementIds);
    setSelectedAnnouncement([]);
    setIsModalOpen(false);
    if (response && response.data && response.data.EC === 0) {
      toast.success(response.data.EM);
      getAnnouncementData();
    } else {
      toast.error(response.data.EM);
      getAnnouncementData();
    }
    console.log(">>> response: ", response);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // serach event
  const handleSerach = async (searchValue) => {
    setCurrentPage(1);
    setPageSearchValue(searchValue);
  };

  return (
    <>
      <Meta title={"View announcement"} />
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
              placeholder="Search Announcement..."
              handleSearch={handleSerach}
            />
          </div>
          <div className="flex justify-end gap-8 w-full mr-16">
            <ButtonCreate
              text="Add new"
              href="/academic-affair/announcement/create-announcement"
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
              "Title",
              "Status",
              "Date Created",
              "Last Modified",
              "Action",
            ]}
            rowList={announcementList}
            editHref="#"
            selectedItem={selectedAnnouncement}
            setSelectedItem={setSelectedAnnouncement}
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
                  activeLinkClassName="flex items-center justify-center leading-tight px-3 h-8 text-blue-600 "
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

export default ViewAnnouncement;
