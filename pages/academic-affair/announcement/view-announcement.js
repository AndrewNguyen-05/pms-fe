import React, { use } from "react";
import Meta from "@/components/Meta";
import ButtonCreate from "@/components/ButtonCreate";
import ButtonDelete from "@/components/ButtonDelete";
import TableViewItem from "@/components/TableViewItem";
import SearchBar from "@/components/SearchBar";
import { getAnnouncementList } from "@/services/announcementServices";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const ViewAnnouncement = () => {
  const [announcementList, setAnnouncementList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentOffset, setCurrentOffset] = useState(0);

  useEffect(() => {
    getAnnouncementData();
    setCurrentOffset((currentPage - 1) * currentLimit + 1);
  }, [currentPage]);

  async function getAnnouncementData() {
    let projectsData = await getAnnouncementList(currentPage, currentLimit);
    setAnnouncementList(
      projectsData.announcements.map((row) => {
        return {
          title: row.title,
          name: row.content,
          dateCreated: row.dateCreated.slice(0, 10),
          dateUpdated: row.dateUpdated.slice(0, 10),
        };
      })
    );
    setTotalPage(projectsData.totalPage);
  }

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };
  return (
    <>
      <Meta title={"View announcement"} />
      <div className="bg-slate-50 h-full pt-6">
        <div className="flex items-center">
          <div className="px-16">
            <SearchBar placeholder="Search Announcement..." />
          </div>
          <div className="flex justify-end gap-8 w-full mr-16">
            <ButtonCreate text="Add new" href="#" />
            <ButtonDelete text="Delete" href="#" />
          </div>
        </div>
        <div className="px-16 py-7 ">
          <TableViewItem
            columnNames={[
              "Title",
              "Content",
              "Date Created",
              "Last Modified",
              "Action",
            ]}
            rowList={announcementList}
            editHref="#"
          />
          <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {currentOffset}-{currentOffset + currentLimit - 1}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {totalPage}
              </span>
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
                  activeLinkClassName="bg-blue-100 text-blue-700"
                  renderOnZeroPageCount={null}
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
