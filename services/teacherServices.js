import axios from "axios";

const getTeacherData = async () => {
  const res = await axios.get("http://localhost:8888/api/v1/teacher/read");
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const getAnalysisTeacher = async (teacherId) => {
  console.log(">>> check teacher id: ", teacherId);
  const res = await axios.get(
    `http://localhost:8888/api/v1/teacher/readAnalysisData?id=${teacherId}`
  );
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

export { getTeacherData, getAnalysisTeacher };
