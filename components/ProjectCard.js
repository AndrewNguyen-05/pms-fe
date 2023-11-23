import Link from "next/link";
const path = require("path");

const ProjectCard = ({
  project,
  selectedItem,
  setSelectedItem,
  editHref,
  onClickView,
}) => {
  const onItemSelect = (project, isSelected) => {
    if (isSelected) {
      setSelectedItem((prev) => [...prev, project]);
    } else {
      setSelectedItem((prev) => prev.filter((p) => p.id !== project.id));
    }
  };

  return (
    <>
      <div className="bg-white border-2 border-slate-100 rounded-2xl h-[110px] shadow-md flex items-center my-2 hover:bg-slate-50 cursor-pointer ">
        <div className="grid grid-cols-12 justify-between w-full">
          <div className="col-span-1 flex items-center justify-center">
            <input
              type="checkbox"
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300"
              checked={selectedItem.some((item) => item.id === project.id)}
              onChange={(event) => onItemSelect(project, event.target.checked)}
            />
          </div>
          <div className="col-span-7 pr-4" onClick={onClickView}>
            <div className="flex flex-col">
              <div className="font-bold text-base text-blue-700">
                {project.name}
              </div>
              <div className="grid grid-cols-5 mt-2">
                <div className="col-span-2 text-base">{project.faculty}</div>
                <div className="col-span-3 text-sm flex gap-4">
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
          <div
            className="col-span-3 text-base flex items-center w-full"
            onClick={onClickView}
          >
            {project.teacherInformation.name} -{" "}
            {project.teacherInformation.email} -{" "}
            {project.teacherInformation.phone}
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <Link
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
