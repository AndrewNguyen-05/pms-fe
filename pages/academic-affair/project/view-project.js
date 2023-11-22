import { useState, useEffect } from "react";
import Meta from "@/components/Meta";
import {
  getProjectData,
  deleteProject,
  searchProject,
} from "../../../services/projectServices";
import ButtonCreate from "@/components/ButtonCreate";
import {} from "../../../services/projectServices";
import SearchBar from "@/components/SearchBar";
import { toast } from "react-toastify";
import WarningModal from "@/components/WarningModal";
import ButtonDelete from "@/components/ButtonDelete";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import ViewModal from "@/components/ViewModal";

const ViewAnalysis = () => {
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
    console.log(">>> check project data:", project_list);
    setCurrentOffset((currentPage - 1) * currentLimit + 1);
  }, [currentPage, pageSearchValue]);

  const setProjectListRaw = (projectsData) => {
    console.log(">>> check raw data:", projectsData);
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
          <ViewModal
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
          <div className="flex justify-end gap-8 w-full mr-16">
            <ButtonCreate
              text="Add new"
              href="/academic-affair/project/create-project"
            />
            <ButtonDelete text="Delete" onClick={handleDeleteClick} />
          </div>
        </div>
        <div className="px-16 py-7">
          {project_list.map((project_item) => {
            return (
              <>
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
      </div>
    </>
  );
};

export default ViewAnalysis;
