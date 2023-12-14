import { registerProject } from "@/services/projectServices";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ViewProjectModal from "../modals/ViewProjectModal";
import QuestionModal from "../modals/QuestionModal";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

const ProjectCardStudent = ({ project, student, refreshProjects }) => {
  const { id } = project;
  console.log(">>> check student", student);
  const [registered, setRegistered] = useState(false);
  const register = async () => {
    const res = await registerProject(id, student);
    console.log(">>> check register:", res);
    if (res && res.data && res.data.EC === 0) {
      MySwal.fire({
        icon: "success",
        title: `${res.data.EM}`,
        showConfirmButton: false,
        timer: 1500,
      });
      refreshProjects();
    } else if (res && res.data && res.data.EC === 1) {
      MySwal.fire({
        icon: "warning",
        title: "Register failed!",
        html: `${res.data.EM}`,
        showConfirmButton: true,
      });
    }
    return res;
  };

  const onClickView = () => {
    ViewProjectModal({ project });
  };

  return (
    <>
      <div className="bg-white border-1 border-slate-100 rounded-2xl h-28 shadow-md flex items-center my-2 hover:bg-slate-50 cursor-pointer ">
        <div className="grid grid-cols-12 justify-between w-full h-full">
          <div className="col-span-6 ml-5 w-full pr-4" onClick={onClickView}>
            <div className="flex flex-col h-full justify-center">
              <div className="font-bold text-base text-blue-700">
                {project.name}
              </div>
              <div className="grid grid-cols-5 mt-2">
                <div className="col-span-2 text-base">{project.faculty}</div>
                <div className="col-span-3 text-sm flex gap-4 ml-10">
                  <div>
                    {project.type === "1" ? (
                      <div className="bg-blue-200 text-blue-700 rounded-3xl flex justify-center items-center py-1 px-3">
                        Đồ án 1
                      </div>
                    ) : (
                      <div className="bg-sky-100 text-sky-700 rounded-3xl flex justify-center items-center py-1 px-3">
                        Đồ án 2
                      </div>
                    )}
                  </div>
                  <div>
                    {project.registerStatus === 1 ? (
                      <div className="bg-blue-50 text-blue-700 rounded-3xl flex justify-center items-center py-1 px-3">
                        Registered
                      </div>
                    ) : (
                      <div className="bg-red-50 text-red-700 rounded-3xl flex justify-center items-center py-1 px-3">
                        Unregistered
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 flex" onClick={onClickView}>
            <div className="flex flex-col justify-center font-semibold ml-5">
              {project.implementation.student1Id === null ? (
                <div></div>
              ) : (
                <div>
                  {project.implementation.student1Name +
                    " - " +
                    project.implementation.student1Code}
                </div>
              )}
              {project.implementation.student2Id === null ? (
                <div></div>
              ) : (
                <div>
                  {project.implementation.student2Name +
                    " - " +
                    project.implementation.student2Code}
                </div>
              )}
            </div>
          </div>
          <div
            className="col-span-2 text-base flex flex-col justify-center items-start w-full"
            onClick={onClickView}
          >
            <div>{project.teacherInformation.name}</div>
            <div>{project.teacherInformation.email}</div>
            <div>{project.teacherInformation.phone}</div>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <QuestionModal project={project} register={register} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCardStudent;
