import axios from "axios";

const getAccountList = async (page, limit) => {
  let apiHref = `http://localhost:8888/api/v1/account/read?page=${page}&&limit=${limit}`;
  const res = await axios.get(apiHref);
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

const deleteAccount = async (accountIds) => {
  return await axios.delete("http://localhost:8888/api/v1/account/delete", {
    data: { accountIds },
  });
};

export { getAccountList, searchAccount, postCreateAccount, deleteAccount };
