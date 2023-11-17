import Link from "next/link";
import { useState, useEffect } from "react";
import Meta from "@/components/Meta";
import { getProjectData } from "../../../services/projectServices";
import ButtonCreate from "@/components/ButtonCreate";
import ButtonDelete from "@/components/ButtonDelete";
import TableViewItem from "@/components/TableViewItem";
import SearchBar from "@/components/SearchBar";

const ViewProject = () => {
  const [project_list, setProjectList] = useState([]);
  const [projectListCombined, setProjectListCombined] = useState([]);

  useEffect(() => {
    async function getProjectsData() {
      let projectsData = await getProjectData();
      setProjectList(projectsData);
      setProjectListCombined(
        projectsData.map((row) => {
          row.teacherInformation = `${row.Teacher.User.name} - ${row.Teacher.User.email} - ${row.Teacher.User.phone}`;
          return {
            id: row.id,
            faculty: row.faculty,
            name: row.name,
            type: row.type,
            teacherInformation: row.teacherInformation,
          };
        })
      );
      console.log(">>> check data from fetchProjectData: ", projectsData);
    }
    getProjectsData();
  }, []);
  console.log(">>> check project_list: ", projectListCombined);

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
        <div className="px-16 py-7 ">
          <TableViewItem
            columnNames={[
              "bao gio thi duoc 1 ti goi me",
              "Faculty",
              "Topic",
              "Type",
              "Teacher Information",
              "Action",
            ]}
            rowList={projectListCombined}
            editHref="#"
          />
          <nav
            className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                1-10
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                1000
              </span>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  5
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ViewProject;
