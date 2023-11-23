import React from "react";

const ViewProjectModal = ({ project, btnBackText, handleCloseModal }) => {
  console.log(">>>> check pj requirement: ", project.requirement);
  return (
    <div
      tabIndex="-1"
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
      onClick={() => {
        handleCloseModal();
      }}
    >
      <div
        className="relative p-4 w-1/2"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative bg-white rounded-lg shadow px-8 pb-3 pt-8">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
          <div class="flex items-center justify-start font-bold text-2xl pb-3 border-b border-gray-300 text-blue-700">
            {project.name}
          </div>
          <div>
            <div class="text-lg leading-relaxed text-gray-500 flex flex-col gap-3 mt-3">
              <div>
                <span className="font-bold text-gray-700">Requirement</span>:{" "}
                <div
                  dangerouslySetInnerHTML={{
                    __html: project.requirement.replace(/\n/g, "<br />"),
                  }}
                ></div>
              </div>

              <div>
                <span className="font-bold text-gray-700">Faculty</span>:{" "}
                {project.faculty}
              </div>
              <div>
                <span className="font-bold text-gray-700">Type</span>:{" "}
                {project.type}
              </div>
              <div>
                <span className="font-bold text-gray-700">Register status</span>
                : {project.registerStatus === 1 ? "Registered" : "Unregistered"}
              </div>
              <div>
                <fieldset className="col-span-2 border border-solid border-gray-300 py-2 px-3 rounded-lg">
                  <legend className="font-bold text-gray-700">
                    Teacher's Information
                  </legend>
                  <div className="mb-1">
                    <span className="font-bold text-gray-700">Name:</span>{" "}
                    {project.teacherInformation.name}
                  </div>
                  <div className="my-1">
                    <span className="font-bold text-gray-700">Email:</span>{" "}
                    {project.teacherInformation.email}
                  </div>
                  <div className="my-1">
                    <span className="font-bold text-gray-700">Phone:</span>{" "}
                    {project.teacherInformation.phone}
                  </div>
                </fieldset>
              </div>
            </div>
            <div class="flex items-center justify-end pt-3">
              <button
                type="button"
                class="text-white w-[100px] bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
                onClick={() => handleCloseModal()}
              >
                {btnBackText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProjectModal;
