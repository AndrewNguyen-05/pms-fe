import { useState, useEffect } from "react";
import Meta from "@/components/header/Meta";
import {
  getListProject,
  getProjectData,
  deleteProject,
  searchProject,
} from "../../../services/projectServices";
import ButtonCreate from "@/components/buttons/ButtonCreate";
import {} from "../../../services/projectServices";
import SearchBar from "@/components/SearchBar";
import { toast } from "react-toastify";
import WarningModal from "@/components/modals/WarningModal";
import ButtonDelete from "@/components/buttons/ButtonDelete";
import ProjectCard from "@/components/cards/ProjectCard";
import Footer from "@/components/footer/Footer";
import ViewProjectModal from "@/components/modals/ViewProjectModal";
import ExportExcel from "@/utils/exportProjectList";

const ViewProject = () => {
  const [project_list, setProjectList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [pageSearchValue, setPageSearchValue] = useState("");
  const [selectedProjectForModal, setSelectedProjectForModal] = useState({});

  //control the state of open modal
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  //list of project that is selected
  const [selectedProject, setSelectedProject] = useState([]);

  useEffect(() => {
    getProjectsData();
    setCurrentOffset((currentPage - 1) * currentLimit + 1);
  }, [currentPage, pageSearchValue]);

  const setProjectListRaw = (projectsData) => {
    setProjectList(
      projectsData.projects.map((row) => {
        return {
          id: row.id,
          name: row.name,
          faculty: row.faculty,
          type: row.type,
          requirement: row.requirement,
          teacherInformation: {
            name: row.Teacher.User.name,
            email: row.Teacher.User.email,
            phone: row.Teacher.User.phone,
          },
          registerStatus: row.isregistered,
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
      setIsWarningModalOpen(true);
    }
  };
  const handleConfirmDelete = async () => {
    const projectIds = selectedProject.map((project) => project.id);
    let response = await deleteProject(projectIds);
    setSelectedProject([]);
    setIsWarningModalOpen(false);
    if (response && response.data && response.data.EC === 0) {
      toast.success(response.data.EM);
      getProjectsData();
    } else {
      toast.error(response.data.EM);
      getProjectsData();
    }
  };

  const handleCloseWarningModal = () => {
    setIsWarningModalOpen(false);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
  };

  // search event
  const handleSearch = async (searchValue) => {
    setCurrentPage(1);
    setPageSearchValue(searchValue);
  };

  //export excel
  const handleExport = async () => {
    const data = await getListProject();
    ExportExcel(data);
  };

  return (
    <>
      <Meta title={"View project"} />
      <div className="bg-slate-50 h-full w-full overflow-auto flex flex-col justify-between pt-6">
        {isWarningModalOpen && (
          <WarningModal
            question="Are you sure you want to delete ?"
            btnYesText="Yes, I'm sure"
            btnNoText="No, cancel"
            handleConfirmDelete={handleConfirmDelete}
            handleCloseModal={handleCloseWarningModal}
          />
        )}
        {isViewModalOpen && (
          <ViewProjectModal
            btnBackText="Back"
            handleCloseModal={handleCloseViewModal}
            project={selectedProjectForModal}
          />
        )}
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
            <button className="btn-create" onClick={() => handleExport()}>
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
            <ButtonCreate
              text="Add new"
              href="/academic-affair/project/create-project"
            />
            <ButtonDelete text="Delete" onClick={handleDeleteClick} />
          </div>
        </div>
        <div className="px-16 py-7">
          {project_list.map((project_item, index) => {
            return (
              <div data-test={index} key={project_item.id}>
                <ProjectCard
                  project={project_item}
                  selectedItem={selectedProject}
                  setSelectedItem={setSelectedProject}
                  editHref={"/academic-affair/project/update-project/"}
                  onClickView={() => {
                    setIsViewModalOpen(true);
                    setSelectedProjectForModal(project_item);
                  }}
                />
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

export default ViewProject;
