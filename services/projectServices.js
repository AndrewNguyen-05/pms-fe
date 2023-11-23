import axios from "axios";

const getProjectData = async (page, limit) => {
  const res = await axios.get(
    `http://localhost:8888/api/v1/project/read?page=${page}&&limit=${limit}`
  );
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const searchProject = async (page, limit, search = "") => {
  const res = await axios.get(`http://localhost:8888/api/v1/project/read`, {
    params: {
      page,
      limit,
      search,
    },
  });
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

const putUpdateProject = async (
  projectId,
  projectName,
  projectType,
  projectFaculty,
  teacherId,
  projectRequirement
) => {
  try {
    const response = await axios.put(
      `http://localhost:8888/api/v1/project/update/${projectId}`,
      {
        projectName,
        projectType,
        projectFaculty,
        teacherId,
        projectRequirement,
      }
    );
    return response;
  } catch (error) {
    console.log(">>> check error", error);
  }
};

const deleteProject = async (projectIds) => {
  return await axios.delete("http://localhost:8888/api/v1/project/delete", {
    data: { projectIds },
  });
};

const getProjectById = async (projectId) => {
  let res = await axios.get(`http://localhost:8888/api/v1/project/readById`, {
    params: {
      projectId,
    },
  });
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

export {
  getProjectData,
  postCreateProject,
  deleteProject,
  putUpdateProject,
  getProjectById,
  searchProject,
};
