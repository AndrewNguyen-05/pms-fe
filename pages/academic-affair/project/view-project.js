import { useState, useEffect } from "react";
import Meta from "@/components/Meta";
import {
  getProjectData,
  deleteProject,
  searchProject,
} from "../../../services/projectServices";
import ButtonCreate from "@/components/ButtonCreate";
import {} from "../../../services/projectServices";
import TableViewItem from "@/components/TableViewItem";
import SearchBar from "@/components/SearchBar";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import WarningModal from "@/components/WarningModal";
import ButtonDelete from "@/components/ButtonDelete";

const ViewProject = () => {
  const [project_list, setProjectList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [pageSearchValue, setPageSearchValue] = useState("");

  //control the state of open modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //list of project that is selected
  const [selectedProject, setSelectedProject] = useState([]);

  useEffect(() => {
    getProjectsData();
    setCurrentOffset((currentPage - 1) * currentLimit + 1);
  }, [currentPage, pageSearchValue]);

  const setProjectListRaw = (projectsData) => {
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
  };

  async function getProjectsData() {
    let projectsData;
    if (!pageSearchValue) {
      projectsData = await getProjectData(currentPage, currentLimit);
    } else {
      projectsData = await searchProject(
        currentPage,
        currentLimit,
        pageSearchValue.toLowerCase()
      );
    }
    setProjectListRaw(projectsData);
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
      <Meta title={"View project"} />
      <div className="bg-slate-50 min-h-screen pt-6">
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
              placeholder="Search Project..."
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
              href="/academic-affair/project/create-project"
            />
            <ButtonDelete text="Delete" onClick={handleDeleteClick} />
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
            selectedItem={selectedProject}
            setSelectedItem={setSelectedProject}
            editHref={"/academic-affair/project/update-project/"}
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
                  marginPagesDisplayed={0}
                  pageRangeDisplayed={10}
                  onPageChange={handlePageClick}
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
                  activeLinkClassName="bg-blue-600 flex items-center justify-center leading-tight px-3 h-8 text-white font-semibold "
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
