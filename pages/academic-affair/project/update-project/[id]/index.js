import { useState, useEffect } from "react";
import Meta from "@/components/Meta";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getTeacherData } from "@/services/teacherServices";
import { getProjectById, putUpdateProject } from "@/services/projectServices";

const UpdateProject = () => {
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
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectFaculty, setProjectFaculty] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectRequirement, setProjectRequirement] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [project, setProject] = useState({});

  //control the state of open modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  //get data
  useEffect(() => {
    if (router.isReady) {
      getProjectsData();
      getData();
    }
  }, [router.query.id]);

  // useEffect(() => {
  //   setProjectId(project.id);
  //   setProjectName(project.name);
  //   setProjectType(project.type);
  //   setProjectFaculty(project.faculty);
  //   setTeacherId(project.Teacher.id);
  // }, [project]);

  const getData = async () => {
    //get teacher data
    let teachersData = await getTeacherData();
    setTeacherList(teachersData);
  };

  const getProjectsData = async () => {
    const projectData = await getProjectById(router.query.id);
    setProject(projectData);
    setProjectId(projectData.id);
    setProjectName(projectData.name);
    setProjectType(projectData.type);
    setProjectFaculty(projectData.faculty);
    setTeacherId(projectData.Teacher.id);
    console.log(">>> check project data: ", project);

    console.log(">>>> check pjfaculty", projectData.faculty);
    console.log(">>> check pj type", projectData.type);
    console.log(">>> check teacher id:", projectData.Teacher.id);
    console.log(">>>> check pjfaculty22:", projectFaculty);
    console.log(">>> check pj type22:", projectType);
    console.log(">>> check teacher id22:", teacherId);

    console.log(">>> teacherId in pjdata: ", projectData.Teacher);
    setTeacherInformation({
      name: projectData.Teacher.User.name,
      email: projectData.Teacher.User.email,
      phone: projectData.Teacher.User.phone,
    });
    console.log(">>> check teacher name:", teacherInformation.name);
    setProjectRequirement(projectData.requirement);
  };

  //validate the input
  const isValidateInput = () => {
    if (!projectName) {
      toast.error("Project name is required!");
      setObjCheckInput({ ...defaultValidInput, isValidProjectName: false });
      return false;
    }

    if (!projectType) {
      toast.error("Project type is required!");
      setObjCheckInput({ ...defaultValidInput, isValidType: false });
      return false;
    }

    if (!projectFaculty) {
      toast.error("Project faculty is required!");
      setObjCheckInput({ ...defaultValidInput, isValidFaculty: false });
      return false;
    }

    console.log(">>> teacherId: ", teacherId);
    if (!teacherId) {
      toast.error("Teacher is required!");
      setObjCheckInput({ ...defaultValidInput, isValidTeacher: false });
      return false;
    }
    return true;
  };

  //handle create project
  const handleUpdateProject = async () => {
    let check = isValidateInput();
    if (check) {
      let response = await putUpdateProject(
        projectId,
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

  const handleCancelClick = () => {
    router.push("/academic-affair/project/view-project");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Meta title={"Update project"} />
      <div className="bg-slate-100 h-full py-6 ">
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
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base w-8 h-8 ms-auto inline-flex justify-center items-center"
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
                    Are you sure you want to quit ?
                  </h3>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-base inline-flex items-center px-5 py-2.5 text-center me-2"
                    onClick={() => handleCancelClick()}
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-base font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                    onClick={() => handleCloseModal()}
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <section className="bg-white mx-20 rounded-2xl">
          <div className="py-4 px-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900 ">
              Update project
            </h2>
            <div className="grid grid-cols-2 gap-4 text-base">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-base font-medium text-gray-900 "
                >
                  Topic <span className="text-red-600">(*)</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={
                    objCheckInput.isValidProjectName
                      ? "bg-slate-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      : "bg-red-50 border ring-1 ring-red-400 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  }
                  defaultValue={project.name}
                  placeholder="Enter topic of project"
                  onChange={(event) => {
                    setProjectName(event.target.value);
                  }}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="faculty"
                  className="block mb-2 text-base font-medium text-gray-900"
                >
                  Faculty <span className="text-red-600">(*)</span>
                </label>
                <select
                  id="faculty"
                  className={
                    objCheckInput.isValidFaculty
                      ? "bg-slate-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      : "bg-red-50 border ring-1 ring-red-400 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  invalid:border-red-700 invalid:bg-red-700"
                  }
                  value={projectFaculty}
                  onChange={(event) => {
                    setProjectFaculty(event.target.value);
                  }}
                >
                  <option disabled={true}>Select falcuty</option>
                  <option value="Công nghệ Phần Mềm">Công nghệ Phần Mềm</option>
                  <option value="Hệ thống Thông Tin">Hệ thống Thông Tin</option>
                  <option value="Kỹ thuật Máy Tính">Kỹ thuật Máy Tính</option>
                  <option value="Khoa học Máy Tính">Khoa học Máy Tính</option>
                  <option value="Khoa học và Kỹ thuật Thông Tin">
                    Khoa học và Kỹ thuật Thông Tin
                  </option>
                  <option value="MMT & Truyền thông">MMT & Truyền thông</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="project-type"
                  className="block mb-2 text-base font-medium text-gray-900"
                >
                  Type <span className="text-red-600">(*)</span>
                </label>
                <select
                  id="project-type"
                  className={
                    objCheckInput.isValidType
                      ? "bg-slate-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      : "bg-red-50 border ring-1 ring-red-400 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  }
                  value={projectType}
                  onChange={(event) => {
                    setProjectType(event.target.value);
                  }}
                >
                  <option disabled={true}>Select project type</option>
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
                  <div className="w-full col-span-1">
                    <label
                      htmlFor="teacher-name"
                      className="block mb-2 text-base font-medium text-gray-900 "
                    >
                      Name
                    </label>
                    <select
                      id="teacher-name"
                      className={
                        objCheckInput.isValidTeacher
                          ? "bg-slate-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                          : "bg-red-50 border ring-1 ring-red-400 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      }
                      value={teacherInformation.name}
                      onChange={(event) => {
                        const selectedTeacher = teacher_list.find(
                          (teacher) => teacher.User.name === event.target.value
                        );
                        if (selectedTeacher) {
                          setTeacherInformation(selectedTeacher.User);
                          setTeacherId(selectedTeacher.id);
                        } else {
                          setTeacherInformation("");
                          setTeacherId("");
                        }
                      }}
                    >
                      <option disabled={true}>Select teacher</option>
                      {teacher_list.map((teacher) => (
                        <option value={teacher.User.name}>
                          {teacher.User.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="teacher-contact-info"
                      className="block mb-2 text-base font-medium text-gray-900 "
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="teacher-contact-info"
                      id="teacher-info"
                      className="bg-slate-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Teacher's information"
                      readOnly={true}
                      defaultValue={project?.Teacher?.User?.email}
                      value={teacherInformation.email}
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="teacher-contact-info"
                      className="block mb-2 text-base font-medium text-gray-900 "
                    >
                      Phone number
                    </label>
                    <input
                      type="text"
                      name="teacher-contact-info"
                      id="teacher-info"
                      className="bg-slate-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Teacher's information"
                      readOnly={true}
                      defaultValue={project?.Teacher?.User?.phone}
                      value={teacherInformation.phone}
                    />
                  </div>
                </div>
              </fieldset>

              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-base font-medium text-gray-900 "
                >
                  Requirement
                </label>
                <textarea
                  id="requirement"
                  rows="8"
                  className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                  placeholder="Requirement for the project"
                  onChange={(event) => {
                    setProjectRequirement(event.target.value);
                  }}
                  defaultValue={projectRequirement}
                ></textarea>
              </div>
            </div>
            <div className="flex gap-8 justify-end">
              <button
                className="items-center px-5 py-2.5 mt-4 text-base font-medium border-2 border-red-600 text-center text-red-600 bg-white  rounded-lg focus:ring-2 focus:ring-red-200 hover:bg-red-600 hover:text-white hover:border-red-600"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Cancel
              </button>
              <button
                className="items-center px-5 py-2.5 mt-4 text-base font-medium border-2 border-blue-700 text-center text-blue-700 bg-white  rounded-lg focus:ring-2 focus:ring-blue-200 hover:bg-blue-700 hover:text-white"
                onClick={() => {
                  handleUpdateProject();
                }}
              >
                Update project
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UpdateProject;
