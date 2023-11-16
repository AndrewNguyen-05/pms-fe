import Meta from "@/components/Meta";
import Link from "next/link";
import { getProjectData, postCreateProject } from "@/services/projectServices";
import { getTeacherData } from "@/services/teacherServices";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const createProject = () => {
  const [project_list, setProjectList] = useState([]);
  const [teacher_list, setTeacherList] = useState([]);
  let defaultTeacherInformation = {
    name: "",
    email: "",
    phone: "",
  };
  const [teacherInformation, setTeacherInformation] = useState(
    defaultTeacherInformation
  );

  const defaultValidInput = {
    isValidProjectName: true,
    isValidFaculty: true,
    isValidType: true,
    isValidTeacher: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
  const [projectName, setProjectName] = useState("");
  const [projectFaculty, setProjectFaculty] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectRequirement, setProjectRequirement] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const router = useRouter();

  //get data
  useEffect(() => {
    async function getData() {
      //get project data
      let projectsData = await getProjectData();
      setProjectList(projectsData);

      //get teacher data
      let teachersData = await getTeacherData();
      setTeacherList(teachersData);
    }
    getData();
  }, []);

  //validate the input
  const isValidateInput = () => {
    if (!projectName) {
      toast.error("Project name is required!");
      setObjCheckInput({ ...defaultValidInput, isValidProjectName: false });
      return false;
    }

    if (!projectType) {
      toast.error("Project type is required!");
      setObjCheckInput({ ...defaultValidInput, isValidProjectType: false });
      return false;
    }

    if (!projectFaculty) {
      toast.error("Project faculty is required!");
      setObjCheckInput({ ...defaultValidInput, isValidProjectFaculty: false });
      return false;
    }

    if (!teacherId) {
      toast.error("Teacher is required!");
      setObjCheckInput({ ...defaultValidInput, isValidTeacher: false });
      return false;
    }
    return true;
  };

  //handle create project
  const handleCreateProject = async () => {
    let check = isValidateInput();
    if (check) {
      let response = await postCreateProject(
        projectName,
        projectType,
        projectFaculty,
        teacherId,
        projectRequirement
      );
      let serverData = response.data;
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        router.push("/academic-affair/project/view-project");
      } else {
        toast.error(serverData.EM);
      }
    }
  };

  return (
    <>
      <Meta title={"Create new project"} />
      <div className="bg-slate-100 h-full py-6">
        <section class="bg-white mx-20 rounded-2xl">
          <div class="py-4 px-6">
            <h2 class="mb-4 text-xl font-bold text-gray-900 ">
              Create new project
            </h2>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div class="col-span-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Topic <span className="text-red-600">(*)</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={
                    objCheckInput.isValidProjectName
                      ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      : "bg-red-50 border border-red-600 ring-2 ring-red-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  }
                  placeholder="Enter topic of project"
                  onChange={(event) => {
                    setProjectName(event.target.value);
                  }}
                />
              </div>
              <div class="w-full">
                <label
                  for="faculty"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Faculty <span className="text-red-600">(*)</span>
                </label>
                <select
                  id="faculty"
                  className={
                    objCheckInput.isValidFaculty
                      ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      : "bg-red-50 border border-red-600 ring-2 ring-red-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  invalid:border-red-700 invalid:bg-red-700"
                  }
                  onChange={(event) => {
                    setProjectFaculty(event.target.value);
                  }}
                >
                  <option selected="true" disabled="disabled">
                    Select falcuty
                  </option>
                  {project_list.map((project) => (
                    <>
                      <option value={project.faculty}>{project.faculty}</option>
                    </>
                  ))}
                </select>
              </div>
              <div>
                <label
                  for="project-type"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Type <span className="text-red-600">(*)</span>
                </label>
                <select
                  id="project-type"
                  className={
                    objCheckInput.isValidType
                      ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      : "bg-red-50 border border-red-600 ring-2 ring-red-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  }
                  onChange={(event) => {
                    setProjectType(event.target.value);
                  }}
                >
                  <option selected="true" disabled="disabled">
                    Select project type
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <fieldset className="col-span-2 border border-solid border-gray-300 p-3 rounded-lg">
                <legend className="font-semibold">
                  Teacher's Information{" "}
                  <span className="text-red-600">(*)</span>
                </legend>
                <div className="grid grid-cols-3 gap-4">
                  <div class="w-full col-span-1">
                    <label
                      for="teacher-name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <select
                      id="teacher-name"
                      className={
                        objCheckInput.isValidTeacher
                          ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                          : "bg-red-50 border border-red-600 ring-2 ring-red-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      }
                      onChange={(event) => {
                        const selectedTeacher = teacher_list.find(
                          (teacher) => teacher.User.name === event.target.value
                        );
                        setTeacherInformation(
                          selectedTeacher ? selectedTeacher.User : ""
                        );
                        setTeacherId(selectedTeacher.id);
                      }}
                    >
                      <option selected="true" disabled="disabled">
                        Select name
                      </option>
                      {teacher_list.map((teacher) => (
                        <option value={teacher.User.name}>
                          {teacher.User.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-1">
                    <label
                      for="teacher-contact-info"
                      class="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="teacher-contact-info"
                      id="teacher-info"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Teacher's information"
                      readOnly={true}
                      value={teacherInformation.email}
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      for="teacher-contact-info"
                      class="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Phone number
                    </label>
                    <input
                      type="text"
                      name="teacher-contact-info"
                      id="teacher-info"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Teacher's information"
                      readOnly={true}
                      value={teacherInformation.phone}
                    />
                  </div>
                </div>
              </fieldset>

              <div class="col-span-2">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Requirement
                </label>
                <textarea
                  id="requirement"
                  rows="8"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                  placeholder="Requirement for the project"
                  onChange={(event) => {
                    setProjectRequirement(event.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <div className="flex gap-8 justify-end">
              <Link href="/academic-affair/project/view-project">
                <button className="items-center px-5 py-2.5 mt-4 text-sm font-medium border-2 border-red-600 text-center text-red-600 bg-white  rounded-lg focus:ring-2 focus:ring-red-200 hover:bg-red-600 hover:text-white hover:border-red-600">
                  Cancel
                </button>
              </Link>
              <button
                className="items-center px-5 py-2.5 mt-4 text-sm font-medium border-2 border-blue-700 text-center text-blue-700 bg-white  rounded-lg focus:ring-2 focus:ring-blue-200 hover:bg-blue-700 hover:text-white"
                onClick={() => {
                  handleCreateProject();
                }}
              >
                Add project
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default createProject;
