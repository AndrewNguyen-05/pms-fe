import axios from "axios";

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

export {
  getStudentAndProject,
  getTeacherWithMostProject,
  getTeacherWithMostStudent,
  getProjectRegisterStatus,
  getTheMostRegisteredTeacher,
};
