import axios from "axios";

const getScoreList = async (page, limit) => {
  let apiHref = `http://localhost:8888/api/v1/score/read?page=${page}&&limit=${limit}`;
  const res = await axios.get(apiHref);
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const getScoreById = async (id) => {
  let res = await axios.get(`http://localhost:8888/api/v1/score/readById`, {
    params: {
      id,
    },
  });
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const searchScore = async (page, limit, search = "") => {
  let apiHref = `http://localhost:8888/api/v1/score/read?page=${page}&&limit=${limit}&&search=${search}`;
  const res = await axios.get(apiHref);
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const postCreateScore = async (title, content, isPublic) => {
  return await axios.post("http://localhost:8888/api/v1/score/create", {
    title,
    content,
    isPublic,
  });
};

const putUpdateScore = async (id, title, content, isPublic) => {
  return await axios.put(`http://localhost:8888/api/v1/score/update/${id}`, {
    title,
    content,
    isPublic,
  });
};

const deleteScore = async (ids) => {
  return await axios.delete("http://localhost:8888/api/v1/score/delete", {
    data: { ids },
  });
};

export {
  getScoreList,
  postCreateScore,
  deleteScore,
  searchScore,
  getScoreById,
  putUpdateScore,
};
