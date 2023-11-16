import axios from "axios";

const getTeacherData = async () => {
  const res = await axios.get("http://localhost:8888/api/v1/teacher/list");
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

export { getTeacherData };
