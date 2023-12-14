import Meta from "@/components/header/Meta";
import { postCreateProject } from "@/services/projectServices";
import { getTeacherData } from "@/services/teacherServices";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import CancelModal from "@/components/modals/CancelModal";

const CreateProject = () => {
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
      setObjCheckInput({ ...defaultValidInput, isValidType: false });
      return false;
    }

    if (!projectFaculty) {
      toast.error("Project faculty is required!");
      setObjCheckInput({ ...defaultValidInput, isValidFaculty: false });
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
      <div className="bg-slate-100 h-full py-6 ">
        <section className="bg-white mx-20 rounded-2xl">
          <div className="py-4 px-6">
            <h2 className="mb-4 text-xl font-bold text-blue-700 ">
              Create new project
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
                  defaultValue={"DEFAULT"}
                  onChange={(event) => {
                    setProjectFaculty(event.target.value);
                  }}
                >
                  <option value={"DEFAULT"} disabled={true}>
                    Select falcuty
                  </option>
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
                  defaultValue={"DEFAULT"}
                  onChange={(event) => {
                    setProjectType(event.target.value);
                  }}
                >
                  <option value={"DEFAULT"} disabled={true}>
                    Select project type
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <fieldset className="col-span-2 border border-solid border-gray-300 p-3 rounded-lg">
                <legend className="font-semibold">
                  Teacher&#39;s Information{" "}
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
                      defaultValue={"DEFAULT"}
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
                      <option value={"DEFAULT"} disabled={true}>
                        Select teacher
                      </option>
                      {teacher_list.map((teacher, index) => (
                        <option key={index} value={teacher.User.name}>
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
                ></textarea>
              </div>
            </div>
            <div className="flex gap-8 justify-end">
              <CancelModal hrefConfirm="/academic-affair/project/view-project" />
              <button
                data-test="create-button"
                className="items-center px-5 py-2.5 mt-4 text-base font-medium border-2 border-blue-700 text-center text-blue-700 bg-white  rounded-lg focus:ring-2 focus:ring-blue-200 hover:bg-blue-700 hover:text-white"
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

export default CreateProject;
