import { useState, useEffect } from "react";
import Meta from "@/components/header/Meta";
import {
  getListProject,
  getProjectData,
  deleteProject,
  searchProject,
  getProjectDataTeacher,
  getListProjectTeacher,
  getProjectDataTeacherWithTime,
} from "../../../services/projectServices";
import ButtonCreate from "@/components/buttons/ButtonCreate";
import {} from "../../../services/projectServices";
import SearchBar from "@/components/SearchBar";
import { toast } from "react-toastify";
import DeleteModal from "@/components/modals/DeleteModal";
import ProjectCard from "@/components/cards/ProjectCard";
import Footer from "@/components/footer/Footer";
import ExportExcel from "@/utils/exportProjectList";
import ProjectCardTeacher from "@/components/cards/ProjectCardTeacher";
import { useSession } from "next-auth/react";
import SetTimeModal from "@/components/modals/SetTimeModal";
import { getUserByID } from "@/services/userServices";

const ViewProject = () => {
  const session = useSession();
  const [teacherData, setTeacherData] = useState({});

  const [project_list, setProjectList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [pageSearchValue, setPageSearchValue] = useState("");
  const [selectedProjectForModal, setSelectedProjectForModal] = useState({});
  const [myProject, setMyProject] = useState(true);

  //list of project that is selected
  const [selectedProject, setSelectedProject] = useState([]);

  //Time data
  const [timeData, setTimeData] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  //Reload
  const [pageReload, setPageReload] = useState(false);

  useEffect(() => {
    getCurrentUserData();
    getProjectsData();
    setCurrentOffset((currentPage - 1) * currentLimit + 1);
    setPageReload(false);
  }, [
    currentPage,
    pageSearchValue,
    myProject,
    session,
    selectedTime,
    pageReload,
  ]);

  useEffect(() => {
    setSelectedProject([]);
  }, [selectedTime]);

  const getCurrentUserData = async () => {
    if (session.status === "authenticated") {
      let result = await getUserByID(session?.data?.user.userId);
      setTeacherData(result);
      console.log("gubid", result);
    }
  };

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
            userId: row.Teacher.User.id,
            name: row.Teacher.User.name,
            email: row.Teacher.User.email,
            phone: row.Teacher.User.phone,
          },
          registerStatus: row.isregistered,
          implementation: {
            student1Id: row.Implementation.Student1.id,
            student1Code: row.Implementation.Student1.studentCode,
            student1Name: row.Implementation.Student1.User.name,
            student2Id: row.Implementation.Student2.id,
            student2Code: row.Implementation.Student2.studentCode,
            student2Name: row.Implementation.Student2.User.name,
          },
        };
      })
    );
  };

  async function getProjectsData() {
    let projectsData;
    projectsData = await getProjectDataTeacherWithTime(
      currentPage,
      currentLimit,
      pageSearchValue,
      myProject ? session?.data?.user.userId : null,
      selectedTime === "" ? null : selectedTime
    );
    setProjectListRaw(projectsData);
    setTotalPage(projectsData.totalPage);
  }

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleConfirmDelete = async () => {
    const projectIds = selectedProject.map((project) => project.id);
    let response = await deleteProject(projectIds);
    setSelectedProject([]);
    if (response && response.data && response.data.EC === 0) {
      toast.success(response.data.EM);
      getProjectsData();
    } else {
      toast.error(response.data.EM);
      getProjectsData();
    }
  };

  // search event
  const handleSearch = async (searchValue) => {
    setCurrentPage(1);
    setPageSearchValue(searchValue);
  };

  //export excel
  const handleExport = async () => {
    const data = await getListProjectTeacher(
      myProject ? session?.data?.user.userId : null,
      selectedTime
    );
    const time = timeData.find((item) => item.id === +selectedTime);
    ExportExcel(data, time);
  };

  // my project event
  const handleMyProject = async () => {
    setCurrentPage(1);
    setMyProject(!myProject);
  };

  //select time event
  const handleSelectTime = (e) => {
    setSelectedTime(e.target.value);
    setCurrentPage(1);
    setPageSearchValue(pageSearchValue);
  };

  return (
    <>
      <Meta title={"View project"} />
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

          <div className="flex flex-col-reverse justify-end gap-4 w-full mr-16">
            <div className="flex gap-3 justify-end">
              <select
                className="select select-info w-full max-w-xs"
                value={selectedTime}
                onChange={(e) => {
                  handleSelectTime(e);
                }}
              >
                <option value="">All</option>
                {timeData.map((timeValue, index) => {
                  return (
                    <option value={timeValue.id} key={index}>
                      {timeValue.semester} - {timeValue.year}
                    </option>
                  );
                })}
                <option value="#NotSetted">Not setted</option>
              </select>
              <SetTimeModal
                selectedProject={selectedProject}
                teacherData={teacherData}
                selectedItem={selectedProject}
                setParentTimeData={setTimeData}
                setParentPageReload={setPageReload}
              />
              <button className="btn-blue" onClick={() => handleMyProject()}>
                {myProject ? "All Project" : "My Project"}
              </button>
            </div>
            <div className="flex gap-3 justify-end">
              <button className="btn-blue" onClick={() => handleExport()}>
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
                text="Add project"
                href="/teacher/project/create-project"
              />
              <DeleteModal
                item="project"
                selectedItem={selectedProject}
                handleConfirmDelete={handleConfirmDelete}
              />
            </div>
          </div>
        </div>
        <div className="px-16 py-7">
          {project_list.map((project_item, index) => {
            return (
              <div data-test={index} key={project_item.id}>
                <ProjectCardTeacher
                  project={project_item}
                  selectedItem={selectedProject}
                  setSelectedItem={setSelectedProject}
                  editHref={"/teacher/project/update-project/"}
                  onClickView={() => {
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
