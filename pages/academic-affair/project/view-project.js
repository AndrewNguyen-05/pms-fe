import { useState, useEffect } from "react";
import Meta from "@/components/Meta";
import {
  getProjectData,
  deleteProject,
} from "../../../services/projectServices";
import ButtonCreate from "@/components/ButtonCreate";
import {} from "../../../services/projectServices";
import TableViewItem from "@/components/TableViewItem";
import SearchBar from "@/components/SearchBar";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const ViewProject = () => {
  const [project_list, setProjectList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentOffset, setCurrentOffset] = useState(0);

  //control the state of open modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //list of project that is selected
  const [selectedProject, setSelectedProject] = useState([]);

  useEffect(() => {
    getProjectsData();
    setCurrentOffset((currentPage - 1) * currentLimit + 1);
  }, [currentPage]);

  async function getProjectsData() {
    let projectsData = await getProjectData(currentPage, currentLimit);
    setProjectList(
      projectsData.projects.map((row) => {
        row.teacherInformation = `${row.Teacher.User.name} - ${row.Teacher.User.email} - ${row.Teacher.User.phone}`;
        return {
          id: row.id,
          name: row.name,
          faculty: row.faculty,
          type: row.type,
          teacherInformation: row.teacherInformation,
        };
      })
    );
    setTotalPage(projectsData.totalPage);
  }

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleDeleteClick = () => {
    if (selectedProject.length === 0) {
      toast.error("Please select at least one project to delete");
    } else if (selectedProject.length > 0) {
      setIsModalOpen(true);
    }
  };
  const handleConfirmDelete = async () => {
    const projectIds = selectedProject.map((project) => project.id);
    let response = await deleteProject(projectIds);
    setSelectedProject([]);
    setIsModalOpen(false);
    if (response && response.data && response.data.EC === 0) {
      toast.success(response.data.EM);
      getProjectsData();
    } else {
      toast.error(response.data.EM);
      getProjectsData();
    }
    console.log(">>> response: ", response);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Meta title={"View project"} />
      <div className="bg-slate-50 min-h-screen pt-6">
        {isModalOpen && (
          <div
            tabIndex="-1"
            className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
            onClick={() => {
              handleCloseModal();
            }}
          >
            <div
              className="relative p-4 w-full max-w-md max-h-full"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative bg-white rounded-lg shadow">
                <button
                  type="button"
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={() => handleCloseModal()}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                  <svg
                    className="mx-auto mb-4 text-gray-400 w-12 h-12"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500">
                    Are you sure you want to delete ?
                  </h3>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                    onClick={() => handleConfirmDelete()}
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                    onClick={() => handleCloseModal()}
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center">
          <div className="px-16">
            <SearchBar placeholder="Search Project..." />
          </div>
          <div className="flex justify-end gap-8 w-full mr-16">
            <ButtonCreate
              text="Add new"
              href="/academic-affair/project/create-project"
            />
            <button
              type="button"
              className="w-[150px] border-[1px] border-red-400 text-red-600 bg-white hover:text-white hover:bg-red-600 focus:ring-1 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none flex items-center justify-center gap-3"
              onClick={() => {
                handleDeleteClick();
              }}
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              Delete
            </button>
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
            rowList={project_list}
            editHref="#"
            selectedItem={selectedProject}
            onItemSelect={(project, isSelected) => {
              if (isSelected) {
                setSelectedProject((prev) => [...prev, project]);
              } else {
                setSelectedProject((prev) =>
                  prev.filter((p) => p.id !== project.id)
                );
              }
            }}
          />
          <div className="flex items-center flex-row flex-wrap justify-between pt-4">
            <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProject;
