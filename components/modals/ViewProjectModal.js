import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ViewProjectModal = ({ project }) => {
  MySwal.fire({
    width: "50%",
    title: (
      <div className="flex items-center justify-start font-bold text-2xl pb-3 border-b border-gray-300 text-blue-700">
        {project.name}
      </div>
    ),
    html: (
      <div className="text-left">
        <div className="text-lg leading-relaxed text-gray-500 flex flex-col gap-3 mt-3">
          <div className="flex flex-col gap-2">
            <div className="font-bold text-gray-700">Requirement:</div>
            <div
              dangerouslySetInnerHTML={{
                __html: project.requirement?.replace(/\n/g, "<br />"),
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
            <span className="font-bold text-gray-700">Register status</span>:{" "}
            {project.registerStatus === 1 ? "Registered" : "Unregistered"}
          </div>
          <div>
            <fieldset className="col-span-2 border border-solid border-gray-300 py-2 px-3 rounded-lg">
              <legend className="font-bold text-gray-700">
                Teacher&#39;s Information
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
      </div>
    ),

    confirmButtonText: "Close",
    confirmButtonColor: "#3b82f6",
    didClose: () => {},
  });

  return null;
};

export default ViewProjectModal;
