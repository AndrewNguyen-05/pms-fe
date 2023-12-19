import axios from "axios";

const getListProject = async (timeId = null) => {
  const res = await axios.get("http://localhost:8888/api/v1/project/read", {
    params: {
      timeId,
    },
  });
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

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

const searchProjectWithTime = async (
  page,
  limit,
  search = "",
  timeId = null
) => {
  const res = await axios.get(`http://localhost:8888/api/v1/project/read`, {
    params: {
      page,
      limit,
      search,
      timeId,
    },
  });
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const searchProjectStudent = async (page, limit, search = "") => {
  const res = await axios.get(`http://localhost:8888/api/v1/project/read`, {
    params: {
      page,
      limit,
      search,
      isStudent: true,
    },
  });
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const getListProjectTeacher = async (teacherId, timeId = null) => {
  const res = await axios.get(`http://localhost:8888/api/v1/project/read`, {
    params: {
      teacherId,
      timeId,
    },
  });
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const getProjectDataTeacher = async (page, limit, search = "", teacherId) => {
  const res = await axios.get(`http://localhost:8888/api/v1/project/read`, {
    params: {
      page,
      limit,
      search,
      teacherId,
    },
  });
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const getProjectDataTeacherWithTime = async (
  page,
  limit,
  search = "",
  teacherId,
  timeId = null
) => {
  const res = await axios.get(`http://localhost:8888/api/v1/project/read`, {
    params: {
      page,
      limit,
      search,
      teacherId,
      timeId,
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

const registerProject = async (projectId, student) => {
  const accountId = student?.accountId;
  const userId = student?.userId;
  let res = await axios.put(
    `http://localhost:8888/api/v1/project/register/${projectId}`,
    { accountId, userId }
  );
  return res;
};

const unregisterProject = async (projectId, studentId) => {
  let res = await axios.put(
    `http://localhost:8888/api/v1/project/unregister?projectId=${projectId}&studentId=${studentId}`
  );
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};
const getListTime = async () => {
  const res = await axios.get("http://localhost:8888/api/v1/project/read-time");
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};
const postCreateTime = async (data) => {
  return await axios.post("http://localhost:8888/api/v1/project/create-time", {
    ...data,
  });
};

const putUpdateTime = async (data) => {
  try {
    const response = await axios.put(
      `http://localhost:8888/api/v1/project/update-time/${data.id}`,
      {
        ...data,
      }
    );
    return response;
  } catch (error) {
    console.log(">>> check error", error);
  }
};

const deleteTime = async (id) => {
  return await axios.delete(
    "http://localhost:8888/api/v1/project/delete-time",
    {
      data: { id },
    }
  );
};

const setProjectTime = async (data) => {
  return await axios.put(
    "http://localhost:8888/api/v1/project/set-project-time",
    {
      ...data,
    }
  );
};

export {
  getListProject,
  getProjectData,
  postCreateProject,
  deleteProject,
  putUpdateProject,
  getProjectById,
  searchProject,
  registerProject,
  unregisterProject,
  getProjectDataTeacher,
  getListProjectTeacher,
  getListTime,
  postCreateTime,
  putUpdateTime,
  deleteTime,
  setProjectTime,
  searchProjectWithTime,
  searchProjectStudent,
  getProjectDataTeacherWithTime,
};
