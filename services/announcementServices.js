import axios from "axios";

const getAnnouncementList = async (page, limit) => {
  const res = await axios.get(
    `http://localhost:8888/api/v1/announcement/read?page=${page}&&limit=${limit}`
  );
  if (res && res.data.DT && res.data.EC === 0) {
    return res.data.DT;
  }
};

const postCreateAnnouncement = async (title, content, isPublic) => {
  return await axios.post("http://localhost:8888/api/v1/announcement/create", {
    title,
    content,
    isPublic,
  });
};

const deleteAnnouncement = async (ids) => {
  return await axios.delete(
    "http://localhost:8888/api/v1/announcement/delete",
    {
      data: { ids },
    }
  );
};

export { getAnnouncementList, postCreateAnnouncement, deleteAnnouncement };
