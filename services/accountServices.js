import axios from "axios";

const getAccountList = async (page, limit) => {
  let apiHref = `http://localhost:8888/api/v1/account/read?page=${page}&&limit=${limit}`;
  const res = await axios.get(apiHref);
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const getAccountById = async (id) => {
  let res = await axios.get(`http://localhost:8888/api/v1/account/readById`, {
    params: {
      id,
    },
  });
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const searchAccount = async (page, limit, search = "") => {
  let apiHref = `http://localhost:8888/api/v1/account/read?page=${page}&&limit=${limit}&&search=${search}`;
  const res = await axios.get(apiHref);
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const postCreateAccount = async (data) => {
  return await axios.post("http://localhost:8888/api/v1/account/create", {
    ...data,
  });
};

const putUpdateAccount = async (id, data) => {
  return await axios.put(`http://localhost:8888/api/v1/account/update/${id}`, {
    ...data,
  });
};

export {
  getAccountList,
  getAccountById,
  searchAccount,
  postCreateAccount,
  putUpdateAccount,
};
