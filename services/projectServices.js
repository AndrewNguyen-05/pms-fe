import axios from "axios";

const getProjectData = async (page, limit) => {
  const res = await axios.get(
    `http://localhost:8888/api/v1/project/read?page=${page}&&limit=${limit}`
  );
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const postCreateProject = async (
  projectName,
  projectType,
  projectFaculty,
  teacherId,
  projectRequirement
) => {
  return await axios.post("http://localhost:8888/api/v1/project/create", {
    projectName,
    projectType,
    projectFaculty,
    teacherId,
    projectRequirement,
  });
};

const deleteProject = async (projectIds) => {
  return await axios.delete("http://localhost:8888/api/v1/project/delete", {
    data: { projectIds },
  });
};

export { getProjectData, postCreateProject, deleteProject };
