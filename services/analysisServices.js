import axios from "axios";

const getStudentByTeacher = async () => {
  const res = await axios.get(
    "http://localhost:8888/api/v1/analysis/readStudent"
  );
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const getStudentAndProject = async () => {
  const res = await axios.get(
    `http://localhost:8888/api/v1/analysis/readStudentAndProject`
  );
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const getTeacherWithMostProject = async () => {
  const res = await axios.get(
    "http://localhost:8888/api/v1/analysis/readMostProject"
  );
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const getTeacherWithMostStudent = async () => {
  const res = await axios.get(
    "http://localhost:8888/api/v1/analysis/readMostStudent"
  );
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const getProjectRegisterStatus = async () => {
  const res = await axios.get(
    "http://localhost:8888/api/v1/analysis/readProjectStatus"
  );
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const getTheMostRegisteredTeacher = async () => {
  const res = await axios.get(
    "http://localhost:8888/api/v1/analysis/readMostRegisteredTeacher"
  );
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const getAverageScore = async () => {
  const res = await axios.get(
    "http://localhost:8888/api/v1/analysis/readTeacherAverageScore"
  );
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const getHighestAverageScore = async () => {
  const res = await axios.get(
    "http://localhost:8888/api/v1/analysis/readHighestAverageScore"
  );
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

export {
  getStudentByTeacher,
  getStudentAndProject,
  getTeacherWithMostProject,
  getTeacherWithMostStudent,
  getProjectRegisterStatus,
  getTheMostRegisteredTeacher,
  getAverageScore,
  getHighestAverageScore,
};
