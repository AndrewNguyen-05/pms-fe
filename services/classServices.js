import axios from "axios";

const getClassList = async () => {
  let apiHref = `http://localhost:8888/api/v1/classInfo/read`;
  const res = await axios.get(apiHref);
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

export { getClassList };
