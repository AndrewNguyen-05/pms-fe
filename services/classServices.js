import axios from "axios";

const getClassList = async () => {
  let apiHref = `http://localhost:8888/api/v1/classInfo/read`;
  const res = await axios.get(apiHref);
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const postNewClass = async (newClass) => {
  let apiHref = `http://localhost:8888/api/v1/classInfo/create`;
  const res = await axios.post(apiHref, {
    newClass,
  });
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const deleteClassInfoDb = async (ids) => {
  return await axios.delete("http://localhost:8888/api/v1/classInfo/delete", {
    data: { ids },
  });
};

export { getClassList, postNewClass, deleteClassInfoDb };
