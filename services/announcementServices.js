import axios from "axios";

const getAnnouncementList = async () => {
  const res = await axios.get("http://localhost:8888/api/v1/announcement/list");
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

export { getAnnouncementList };
