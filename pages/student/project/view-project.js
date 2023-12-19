import { useState, useEffect } from "react";
import Meta from "@/components/header/Meta";
import { searchProjectStudent } from "../../../services/projectServices";
import {} from "../../../services/projectServices";
import SearchBar from "@/components/SearchBar";
import ProjectCardStudent from "@/components/cards/ProjectCardStudent";
import Footer from "@/components/footer/Footer";
import { useSession } from "next-auth/react";

const ViewProject = () => {
  const [project_list, setProjectList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [pageSearchValue, setPageSearchValue] = useState("");

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
          implementation: {
            student1Id: row.Implementation.Student1.id,
            student1Code: row.Implementation.Student1.studentCode,
            student1Name: row.Implementation.Student1.User.name,
            student2Id: row.Implementation.Student2.id,
            student2Code: row.Implementation.Student2.studentCode,
            student2Name: row.Implementation.Student2.User.name,
          },
          registerStatus: row.isregistered,
        };
      })
    );
  };

  async function getProjectsData() {
    let projectsData;
    projectsData = await searchProjectStudent(
      currentPage,
      currentLimit,
      pageSearchValue?.toLowerCase()
    );
    setProjectListRaw(projectsData);
    setTotalPage(projectsData.totalPage);
  }

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  // search event
  const handleSearch = async (searchValue) => {
    setCurrentPage(1);
    setPageSearchValue(searchValue);
  };

  let dataUser = useSession().data?.user;

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
          <div className="flex justify-end gap-4 w-full mr-16"></div>
        </div>
        <div className="px-16 py-7">
          {project_list.map((project_item, index) => {
            return (
              <div data-test={index} key={project_item.id}>
                <ProjectCardStudent
                  project={project_item}
                  student={dataUser}
                  refreshProjects={getProjectsData}
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
