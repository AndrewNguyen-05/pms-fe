import axios from "axios";

const getUserByID = async (userId) => {
  let res = await axios.get(
    `http://localhost:8888/api/v1/user/readById?id=${userId}`
  );
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

export { getUserByID };
