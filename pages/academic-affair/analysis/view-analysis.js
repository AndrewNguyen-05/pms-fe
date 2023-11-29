import {
  BarChart,
  Bar,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import {
  getStudentAndProject,
  getTeacherWithMostProject,
  getTeacherWithMostStudent,
  getProjectRegisterStatus,
  getTheMostRegisteredTeacher,
  getAverageScore,
  getHighestAverageScore,
} from "@/services/analysisServices";
import AnalysisCard from "@/components/cards/AnalysisCard";
import Link from "next/link";

const ViewAnalysis = () => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [numberOfStudentAndProject, setNumberOfStudentAndProject] = useState(
    []
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [teacherWithMostProject, setTeacherWithMostProject] = useState({});
  const [teacherWithMostStudent, setTeacherWithMostStudent] = useState({});
  const [projectStatus, setProjectStatus] = useState([]);
  const [mostRegisteredTeacher, setMostRegisteredTeacher] = useState({});
  const [averageScore, setAverageScore] = useState([]);
  const [highestAverageScore, setHighestAverageScore] = useState({});

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 2));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : 0));
  };

  useEffect(() => {
    setDomLoaded(true);
    getData();
  }, []);

  const getData = async () => {
    let res = await getStudentAndProject();
    setNumberOfStudentAndProject(res);

    let resTeacher = await getTeacherWithMostProject();
    setTeacherWithMostProject(resTeacher);

    let resStudent = await getTeacherWithMostStudent();
    setTeacherWithMostStudent(resStudent);

    let resProjectStatus = await getProjectRegisterStatus();
    setProjectStatus(resProjectStatus);

    let resMostRegisteredTeacher = await getTheMostRegisteredTeacher();
    setMostRegisteredTeacher(resMostRegisteredTeacher);

    let resAverageScore = await getAverageScore();
    setAverageScore(resAverageScore);

    let resHighestAverageScore = await getHighestAverageScore();
    setHighestAverageScore(resHighestAverageScore);
  };

  return (
    <div className="w-full h-screen p-7 bg-slate-50">
      <div class="w-[575px] mb-3 shadow-lg rounded-lg" id="navbar-default">
        <ul class="font-medium flex gap-5 p-3 w-full border bg-white rounded-lg border-gray-100 rtl:space-x-reverse">
          <li>
            <div class={activeIndex === 0 ? "nav-active" : "nav-default"}>
              Number of student and project
            </div>
          </li>
          <li>
            <div class={activeIndex === 1 ? "nav-active" : "nav-default"}>
              Register status
            </div>
          </li>
          <li>
            <div class={activeIndex === 2 ? "nav-active" : "nav-default"}>
              Score average
            </div>
          </li>
        </ul>
      </div>
      <div className="w-full flex justify-between">
        <AnalysisCard
          title="Teacher has the most project"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
              />
            </svg>
          }
          name={teacherWithMostProject["Teacher.User.name"]}
          value={`${teacherWithMostProject["projectCount"]} projects`}
        />
        <AnalysisCard
          title="Teacher has the most student"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          }
          name={teacherWithMostStudent["Teacher.User.name"]}
          value={`${teacherWithMostStudent["Student"]} students`}
        />
        <AnalysisCard
          title="Teacher has the most project registered"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              />
            </svg>
          }
          name={mostRegisteredTeacher["Teacher.User.name"]}
          value={`${mostRegisteredTeacher["Registered"]} projects`}
        />
        <AnalysisCard
          title="Teacher has the highest average score"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          }
          name={highestAverageScore.teacherName}
          value={`${highestAverageScore["averageScore"]} / 10`}
        />
      </div>
      {domLoaded && (
        <div className="p-0 mt-4">
          <div className="w-full items-center rounded-lg shadow-lg bg-white flex justify-between">
            <button
              class="flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              onClick={handlePrev}
            >
              <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-400  group-hover:bg-slate-300 group-focus:ring-4 group-focus:ring-slate-200  group-focus:outline-none">
                <svg
                  class="w-4 h-4 text-white rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
                <span class="sr-only">Previous</span>
              </span>
            </button>
            <div class="">
              <div
                className={activeIndex === 0 ? "overflow-auto px-1" : "hidden"}
              >
                <div className="font-semibold text-2xl ml-10 my-5">
                  Number of student and project
                </div>
                <BarChart
                  width={1320}
                  height={470}
                  data={numberOfStudentAndProject}
                  margin={{
                    top: 25,
                    right: 0,
                    left: 0,
                    bottom: 100,
                  }}
                  className="bg-white rounded-lg duration-700 ease-in-out opacity-100 "
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="Teacher.User.name"
                    angle={50}
                    tickMargin={50}
                    className="font-semibold"
                  />
                  <YAxis yAxisId="left" orientation="left" stroke="#0ea5e9" />
                  <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" />
                  <Tooltip />
                  <Legend layout="vertical" verticalAlign="top" align="right" />
                  <Bar yAxisId="left" dataKey="Project" fill="#93c5fd">
                    <LabelList
                      dataKey="Project"
                      position="top"
                      className="text-blue-300 text-lg font-semibold"
                    />
                  </Bar>

                  <Bar yAxisId="right" dataKey="Student" fill="#facc15">
                    <LabelList
                      dataKey="Student"
                      position="top"
                      className="text-green-200 text-lg font-semibold"
                    />
                  </Bar>
                </BarChart>
              </div>
              <div
                className={activeIndex === 1 ? "overflow-auto px-1" : "hidden"}
              >
                <div className="font-semibold text-2xl ml-10 my-5">
                  Register status
                </div>
                <BarChart
                  width={1300}
                  height={470}
                  data={projectStatus}
                  margin={{
                    top: 25,
                    right: 20,
                    left: 0,
                    bottom: 100,
                  }}
                  className="duration-700 ease-in-out opacity-100 bg-white"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="Teacher.User.name"
                    angle={50}
                    tickMargin={50}
                    className="font-semibold"
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend layout="vertical" verticalAlign="top" align="right" />
                  <Bar dataKey="Registered" stackId="a" fill="#facc15">
                    <LabelList
                      dataKey="Registered"
                      position="middle"
                      className="text-green-200 text-lg font-semibold"
                    />
                  </Bar>
                  <Bar dataKey="Unregistered" stackId="a" fill="#93c5fd">
                    <LabelList
                      dataKey="Unregistered"
                      position="middle"
                      className="text-green-200 text-lg font-semibold"
                    />
                  </Bar>
                </BarChart>
              </div>
              <div
                className={
                  activeIndex === 2 ? "duration-700 ease-in-out p-1" : "hidden"
                }
              >
                <div className="font-semibold text-2xl ml-10 my-5">
                  Average score
                </div>
                <BarChart
                  width={1300}
                  height={470}
                  data={averageScore}
                  margin={{
                    top: 25,
                    right: 20,
                    left: 0,
                    bottom: 100,
                  }}
                  className="duration-700 ease-in-out opacity-100 bg-white"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="Teacher's name"
                    angle={50}
                    tickMargin={50}
                    className="font-semibold"
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend layout="vertical" verticalAlign="top" align="right" />
                  <Bar dataKey="Average score" stackId="a" fill="#93c5fd">
                    <LabelList
                      dataKey="Average score"
                      position="top"
                      className="text-green-200 text-lg font-semibold"
                    />
                  </Bar>
                </BarChart>
              </div>
            </div>
            <button
              class="flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
              onClick={handleNext}
            >
              <span class="flex items-center justify-center w-10 h-10 rounded-full bg-slate-400 group-hover:bg-slate-300  group-focus:ring-4 group-focus:ring-slate-200  group-focus:outline-none">
                <svg
                  class="w-4 h-4 text-white rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span class="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAnalysis;
