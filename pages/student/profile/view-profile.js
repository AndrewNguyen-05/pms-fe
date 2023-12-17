import ProfileCard from "@/components/cards/ProfileCard";
import { useSession } from "next-auth/react";
import { getUserByID } from "@/services/userServices";
import { useEffect, useState } from "react";
import { getProjectOfStudent } from "@/services/studentServices";
import CancelModal from "@/components/modals/CancelModal";
import Meta from "@/components/header/Meta";

const StudentProfile = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({});
  const [projectData, setProjectData] = useState({});

  useEffect(() => {
    const getUser = async () => {
      if (session?.user?.userId) {
        let data = await getUserByID(session?.user.userId);
        setUserData(data);
      }
    };

    const getProject = async () => {
      if (session?.user?.userId) {
        let data = await getProjectOfStudent(session?.user.userId);
        setProjectData(data);
      }
    };

    getUser();
    getProject();
  }, [session]);
  return (
    <>
      <Meta title="My Profile" />
      <div className="bg-slate-50 w-full p-1 flex gap-5">
        <ProfileCard userData={userData} />
        <div className="bg-white shadow-md rounded-md my-5 mr-5 w-full p-2 overflow-auto">
          <div className="font-semibold text-lg mx-10 my-2">
            The project being registered:
          </div>
          {projectData !== undefined ? (
            <div>
              <div className="font-semibold text-3xl mx-10 border-b-2 pb-5 text-blue-700">
                {projectData?.name}
              </div>
              <div className="text-left mx-10">
                <div className="text-lg w-full leading-relaxed text-gray-500 flex flex-col gap-3 mt-3">
                  <div className="flex gap-2">
                    <span className="font-bold text-gray-700">
                      Requirement:
                    </span>{" "}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: projectData.requirement?.replace(
                          /\n/g,
                          "<br />"
                        ),
                      }}
                    ></div>
                  </div>

                  <div>
                    <span className="font-bold text-gray-700">Faculty</span>:{" "}
                    {projectData.faculty}
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Type</span>:{" "}
                    {projectData.type}
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">
                      Register status
                    </span>
                    :{" "}
                    {projectData.registerStatus === 1
                      ? "Registered"
                      : "Unregistered"}
                  </div>
                  <div className="flex justify-between gap-5">
                    <fieldset className="border border-solid w-1/2 border-gray-300 py-2 px-3 rounded-lg">
                      <legend className="font-bold text-blue-700">
                        Student&#39;s Information
                      </legend>
                      <div className="mb-1">
                        <span className="font-bold text-gray-700">
                          Student 1:
                        </span>{" "}
                        {projectData.Implementation?.Student1?.User.name} -{" "}
                        {projectData.Implementation?.Student1?.studentCode}
                      </div>
                      <div className="my-1">
                        <span className="font-bold text-gray-700">
                          Student 2:
                        </span>{" "}
                        {projectData.Implementation?.Student2?.User.name} -{" "}
                        {projectData.Implementation?.Student2?.studentCode}
                      </div>
                      <div className="my-1">
                        <span className="font-bold text-red-600">Score:</span>{" "}
                        {projectData?.score !== null ? (
                          <span className="font-semibold text-red-600">
                            {projectData?.score} / 10
                          </span>
                        ) : (
                          <span className="font-semibold text-red-600">
                            Chưa có điểm
                          </span>
                        )}
                      </div>
                    </fieldset>
                    <fieldset className="border border-solid w-1/2 border-gray-300 py-2 px-3 rounded-lg">
                      <legend className="font-bold text-blue-700">
                        Teacher&#39;s Information
                      </legend>
                      <div className="mb-1">
                        <span className="font-bold text-gray-700">Name:</span>{" "}
                        {projectData.Teacher?.User?.name}
                      </div>
                      <div className="my-1">
                        <span className="font-bold text-gray-700">Email:</span>{" "}
                        {projectData.Teacher?.User?.email}
                      </div>
                      <div className="my-1">
                        <span className="font-bold text-gray-700">Phone:</span>{" "}
                        {projectData.Teacher?.User?.phone}
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div className="flex justify-end w-full gap-3 mb-1">
                  <CancelModal
                    hrefConfirm="/student/project/view-project"
                    text="Cancel register"
                    title="Are you sure you want to unregister this project ?"
                    content="You can register this project again after this action."
                    disabled={false}
                    isCancelRegister={true}
                    projectId={projectData?.id}
                    studentId={userData?.id}
                  />
                  <button className="w-[150px] border-2 border-blue-700 px-5 py-2.5 mt-4 shadow-md text-blue-600 bg-white hover:text-white hover:bg-blue-600 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none flex items-center justify-center gap-3">
                    Submit project
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-24 flex items-center justify-center text-2xl font-semibold">
                You haven't registered any project yet!
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
