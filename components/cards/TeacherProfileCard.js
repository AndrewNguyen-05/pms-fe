import { getAnalysisTeacher } from "@/services/teacherServices";
import { useState, useEffect } from "react";

const TeacherProfileCard = ({ userData }) => {
  const [analysisData, setAnalysisData] = useState({});
  const getAnalysisData = async () => {
    if (userData?.id) {
      const res = await getAnalysisTeacher(userData?.id);
      console.log(">> check analysis:", res);
      setAnalysisData(res);
    }
  };
  useEffect(() => {
    getAnalysisData();
  }, [userData]);
  return (
    <div className="bg-white shadow-md rounded-md my-5 mr-5 w-full h-full p-2 overflow-auto text-lg">
      <div className="m-5">
        Hello, <span className="font-semibold">{userData?.User?.name}</span>
      </div>
      <div className="m-5">
        <div className="flex flex-col gap-5 my-10">
          <div className="text-xl font-semibold">Project</div>
          <div className="grid grid-cols-3 gap-10">
            <div className="teacher-profile-box">
              <div className="text-xl text-gray-600 font-semibold">
                TOTAL NUMBER
              </div>
              <div className="text-5xl text-violet-800 font-bold">
                {analysisData.projectCount}
              </div>
              <div className="text-gray-500">
                {analysisData.projectCount > 1 ? "projects" : "project"}
              </div>
            </div>
            <div className="teacher-profile-box">
              <div className="text-xl font-semibold">REGISTERED</div>
              <div className="text-5xl text-violet-800 font-bold">
                {analysisData.registeredProjectsCount}
              </div>
              <div className="text-gray-500">
                {analysisData.projectCount > 1 ? "projects" : "project"}
              </div>
            </div>
            <div className="teacher-profile-box">
              <div className="text-xl font-semibold">UNREGISTERED</div>
              <div className="text-5xl text-violet-800 font-bold">
                {analysisData.unregisteredProjectsCount}
              </div>
              <div className="text-gray-500">
                {analysisData.projectCount > 1 ? "projects" : "project"}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 my-10">
          <div className="text-xl font-semibold">Student</div>
          <div className="grid grid-cols-3 gap-10">
            <div className="teacher-profile-box">
              <div className="text-xl text-gray-600 font-semibold">
                TOTAL NUMBER
              </div>
              <div className="text-5xl text-violet-800 font-bold">
                {analysisData.totalStudentCount}
              </div>
              <div className="text-gray-500">
                {analysisData.totalStudentCount > 1 ? "students" : "student"}
              </div>
            </div>
            <div className="teacher-profile-box">
              <div className="text-xl font-semibold">AVERAGE STUDENT SCORE</div>{" "}
              <div className="text-5xl text-violet-800 font-bold">
                {analysisData.avgStudentScore}
              </div>
              <div className="text-gray-500">on the scale 0 to 10</div>
            </div>
            <div className="teacher-profile-box">
              <div className="text-xl font-semibold">MEDIAN STUDENT SCORE</div>
              <div className="text-5xl text-violet-800 font-bold">
                {analysisData.medianStudentScore}
              </div>
              <div className="text-gray-500">on the scale 0 to 10</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileCard;
