import Link from "next/link";
import { useState, useEffect } from "react";
import Meta from "@/components/Meta";
import { getProjectData } from "../../../services/projectServices";
import ButtonCreate from "@/components/ButtonCreate";
import ButtonDelete from "@/components/ButtonDelete";
import TableViewItem from "@/components/TableViewItem";
import SearchBar from "@/components/SearchBar";
import ReactPaginate from "react-paginate";

const ViewProject = () => {
  const [project_list, setProjectList] = useState([]);
  const [projectListCombined, setProjectListCombined] = useState([]);
  const [totalPage, setTotalPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentOffset, setCurrentOffset] = useState(0);

  useEffect(() => {
    async function getProjectsData() {
      let projectsData = await getProjectData(currentPage, currentLimit);
      setProjectList(projectsData);
      setProjectListCombined(
        projectsData.map((row) => {
          row.teacherInformation = `${row.Teacher.User.name} - ${row.Teacher.User.email} - ${row.Teacher.User.phone}`;
          return {
            name: row.name,
            faculty: row.faculty,
            type: row.type,
            teacherInformation: row.teacherInformation,
          };
        })
      );
    }
    getProjectsData();
    setCurrentOffset((currentPage - 1) * currentLimit + 1);
  }, [currentPage]);
  console.log(">>> check project_list: ", projectListCombined);

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  return (
    <>
      <Meta title={"View project"} />
      <div className="bg-slate-50 h-full pt-6">
        <div className="flex items-center">
          <div className="px-16">
            <SearchBar placeholder="Search Project..." />
          </div>
          <div className="flex justify-end gap-8 w-full mr-16">
            <ButtonCreate
              text="Add new"
              href="/academic-affair/project/create-project"
            />
            <ButtonDelete text="Delete" href="#" />
          </div>
        </div>
        <div className="px-16 py-7">
          <TableViewItem
            columnNames={[
              "Topic",
              "Faculty",
              "Type",
              "Teacher Information",
              "Action",
            ]}
            rowList={projectListCombined}
            editHref="#"
          />
          <div className="flex items-center flex-row flex-wrap justify-between pt-4">
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
                  pageRangeDisplayed={5}
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
                  activeClassName="bg-blue-100 text-blue-700"
                  renderOnZeroPageCount={null}
                  className="inline-flex"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProject;
