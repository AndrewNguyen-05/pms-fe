import Link from "next/link";
const path = require("path");

const ProjectCard = ({ project, editHref, onClickView }) => {
  return (
    <>
      <div className="bg-white border-2 border-slate-100 rounded-2xl h-28 shadow-md flex items-center my-2 hover:bg-slate-50 cursor-pointer ">
        <div className="grid grid-cols-12 justify-between w-full">
          <div className="col-span-6 pr-4" onClick={onClickView}>
            <div className="flex flex-col">
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
          <div className="col-span-3 flex">
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
            <Link
              data-test="edit-button"
              href={path.join(editHref, `[id]`)}
              as={path.join(editHref, "" + project.id)}
              className="font-medium text-blue-600 hover:underline text-lg"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
