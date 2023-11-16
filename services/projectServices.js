import axios from "axios";

const getProjectData = async () => {
  const res = await axios.get("http://localhost:8888/api/v1/project/list");
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const postCreateProject = async () => {
  return await axios.post("http://localhost:8888/api/v1/project/create", {});
};

export { getProjectData, postCreateProject };
