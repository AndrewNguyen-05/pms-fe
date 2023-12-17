import React, { use } from "react";
import Meta from "@/components/header/Meta";
import ButtonCreate from "@/components/buttons/ButtonCreate";
import ButtonDelete from "@/components/buttons/ButtonDelete";
import SearchBar from "@/components/SearchBar";
import {
  deleteAnnouncement,
  getAnnouncementList,
  searchAnnouncement,
} from "@/services/announcementServices";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AnnouncementCard from "@/components/cards/AnnouncementCard";
import ViewAnnouncementPanel from "../../../components/views/ViewAnnouncementPanel";
import InfiniteScroll from "react-infinite-scroll-component";
import DeleteModal from "@/components/modals/DeleteModal";

const ViewAnnouncement = () => {
  const [announcementList, setAnnouncementList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [pageSearchValue, setPageSearchValue] = useState("");
  const [selectedAnnouncementForModal, setSelectedAnnouncementForModal] =
    useState({});

  //control the state of open modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //list of announcement that is selected
  const [selectedAnnouncement, setSelectedAnnouncement] = useState([]);

  // // scorlled to last
  const [initialSetup, setInitialSetup] = useState(false);
  const [hasMoreScorll, setHasMoreScroll] = useState(true);

  // control deleted state
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    setDeleted(false);
    getAnnouncementData();
    setCurrentOffset((currentPage - 1) * currentLimit + 1);
  }, [currentPage, pageSearchValue, deleted]);

  const setAnnouncementListRaw = (announcementData) => {
    setAnnouncementList(
      announcementList.concat(
        announcementData.announcements.map((row) => {
          return {
            id: row.id,
            title: row.title,
            content: row.content,
            isPublic: row.isPublic ? "Posted" : "Unposted",
            dateCreated: row.dateCreated ? row.dateCreated.slice(0, 10) : "",
            dateUpdated: row.dateUpdated ? row.dateUpdated.slice(0, 10) : "",
          };
        })
      )
    );
  };

  async function getAnnouncementData() {
    let announcementData;
    if (!pageSearchValue) {
      announcementData = await getAnnouncementList(currentPage, currentLimit);
    } else {
      announcementData = await searchAnnouncement(
        currentPage,
        currentLimit,
        pageSearchValue.toLowerCase()
      );
    }
    setTotalPage(announcementData.totalPage);
    if (currentPage > announcementData.totalPage) {
      setHasMoreScroll(false);
      return;
    } else {
      setHasMoreScroll(true);
    }
    setAnnouncementListRaw(announcementData);
  }

  const handleConfirmDelete = async () => {
    const announcementIds = selectedAnnouncement.map(
      (announcement) => announcement.id
    );
    let response = await deleteAnnouncement(announcementIds);
    setSelectedAnnouncement([]);
    setIsModalOpen(false);
    handleSearch(pageSearchValue);
    setDeleted(true);
    if (response && response.data && response.data.EC === 0) {
      toast.success(response.data.EM);
    } else {
      toast.error(response.data.EM);
    }
  };

  // search event
  const handleSearch = (searchValue) => {
    setAnnouncementList([]);
    setCurrentPage(1);
    setPageSearchValue(searchValue);
  };

  // const handleAnnouncementClick = (announcement) => {
  //   setSelectedAnnouncementForModal(announcement);
  //   setIsModalOpen(true);
  // };

  const handleScroll = async (event) => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <>
      <Meta title={"View announcement"} />
      <div className="bg-slate-50 h-full pt-6">
        <div className="flex items-center">
          <div className="px-16">
            <SearchBar
              placeholder="Search Announcement..."
              handleSearch={handleSearch}
              handleKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch(event.target.value);
                }
              }}
            />
          </div>
          <div className="flex justify-end gap-4 w-full mr-16">
            <ButtonCreate
              text="Add new"
              href="/teacher/announcement/create-announcement"
            />
            <DeleteModal
              item="announcement"
              selectedItem={selectedAnnouncement}
              handleConfirmDelete={handleConfirmDelete}
            />
          </div>
        </div>
        <div className="px-10 py-7 ">
          <div className="grid grid-cols-2">
            <div
              className="col-span-1 pt-2 rounded-3xl px-2 mx-5 bg-white overflow-auto h-screen"
              id="scrollableAnnouncementDiv"
            >
              <InfiniteScroll
                dataLength={announcementList.length} //This is important field to render the next data
                next={handleScroll}
                hasMore={hasMoreScorll}
                loader={
                  <div className="flex justify-center my-10">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                }
                endMessage={
                  <div
                    data-test="end-message"
                    className="font-semibold my-3 text-center"
                  >
                    Nothing more to show
                  </div>
                }
                scrollableTarget="scrollableAnnouncementDiv"
              >
                {announcementList.map((announcement_item, idx) => {
                  return (
                    <div
                      data-test={`announcement-card-${idx}`}
                      key={announcement_item.id}
                    >
                      <AnnouncementCard
                        announcement={announcement_item}
                        selectedItem={selectedAnnouncement}
                        setSelectedItem={setSelectedAnnouncement}
                        editHref={"/teacher/announcement/update-announcement/"}
                        onClickView={() => {
                          setSelectedAnnouncementForModal(announcement_item);
                        }}
                      />
                    </div>
                  );
                })}
              </InfiniteScroll>
            </div>
            <div className="col-span-1 overflow-auto max-h-screen">
              <ViewAnnouncementPanel
                announcement={selectedAnnouncementForModal}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAnnouncement;
