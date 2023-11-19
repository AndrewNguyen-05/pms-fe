import React, { use } from "react";
import Meta from "@/components/Meta";
import ButtonCreate from "@/components/ButtonCreate";
import ButtonDelete from "@/components/ButtonDelete";
import TableViewItem from "@/components/TableViewItem";
import SearchBar from "@/components/SearchBar";
import {
  deleteAnnouncement,
  getAnnouncementList,
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

  //control the state of open modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //list of project that is selected
  const [selectedAnnouncement, setSelectedAnnouncement] = useState([]);

  useEffect(() => {
    getAnnouncementData();
    setCurrentOffset((currentPage - 1) * currentLimit + 1);
  }, [currentPage]);

  async function getAnnouncementData() {
    let projectsData = await getAnnouncementList(currentPage, currentLimit);
    setAnnouncementList(
      projectsData.announcements.map((row) => {
        return {
          id: row.id,
          title: row.title,
          isPublic: row.isPublic ? "posted" : "not posted",
          dateCreated: row.dateCreated ? row.dateCreated.slice(0, 10) : "",
          dateUpdated: row.dateUpdated ? row.dateUpdated.slice(0, 10) : "",
        };
      })
    );
    setTotalPage(projectsData.totalPage);
  }

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

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
            <SearchBar placeholder="Search Announcement..." />
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
                  previousLabel="Previous"
                  nextLabel="Next"
                  pageClassName=""
                  pageLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  previousClassName=""
                  previousLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                  nextClassName=""
                  nextLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                  breakLabel="..."
                  breakClassName=""
                  breakLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  containerClassName="pagination"
                  activeClassName=""
                  activeLinkClassName="bg-blue-600 text-white font-semibold hover:bg-blue-500 hover:text-white"
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
