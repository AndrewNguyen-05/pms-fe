import axios from "axios";

const getProjectOfStudent = async (userId) => {
  const res = await axios.get(
    `http://localhost:8888/api/v1/student/readProjectOfStudent?id=${userId}`
  );
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

export { getProjectOfStudent };
