import React, { use } from "react";
import Meta from "@/components/Meta";
import ButtonCreate from "@/components/ButtonCreate";
import ButtonDelete from "@/components/ButtonDelete";
import SearchBar from "@/components/SearchBar";
import {
  deleteAnnouncement,
  getAnnouncementList,
  searchAnnouncement,
} from "@/services/announcementServices";
import { useState, useEffect } from "react";
import WarningModal from "@/components/WarningModal";
import { toast } from "react-toastify";
import AnnouncementCard from "@/components/AnnouncementCard";
import Footer from "@/components/Footer";
import ViewAnnouncementPanel from "../../../components/ViewAnnouncementPanel";

const ViewAnalysis = () => {
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

  useEffect(() => {
    getAnnouncementData();
    console.log(">>> check announcement:", announcementList);
    setCurrentOffset((currentPage - 1) * currentLimit + 1);
  }, [currentPage, pageSearchValue]);

  const setAnnouncementListRaw = (announcementData) => {
    setAnnouncementList(
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
    setAnnouncementListRaw(announcementData);
    setTotalPage(announcementData.totalPage);
  }

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  // btn DELETE events + modal for delete
  const handleDeleteClick = () => {
    if (selectedAnnouncement.length === 0) {
      toast.error("Please select at least one announcement to delete");
    } else if (selectedAnnouncement.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    const announcementIds = selectedAnnouncement.map(
      (announcement) => announcement.id
    );
    let response = await deleteAnnouncement(announcementIds);
    setSelectedAnnouncement([]);
    setIsModalOpen(false);
    if (response && response.data && response.data.EC === 0) {
      toast.success(response.data.EM);
      getAnnouncementData();
    } else {
      toast.error(response.data.EM);
      getAnnouncementData();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // search event
  const handleSearch = async (searchValue) => {
    setCurrentPage(1);
    setPageSearchValue(searchValue);
  };

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncementForModal(announcement);
    setIsModalOpen(true);
  };

  return (
    <>
      <Meta title={"View announcement"} />
      <div className="bg-slate-50 h-full pt-6">
        {isModalOpen && (
          <WarningModal
            question="Are you sure you want to delete ?"
            btnYesText="Yes, I'm sure"
            btnNoText="No, cancel"
            handleConfirmDelete={handleConfirmDelete}
            handleCloseModal={handleCloseModal}
          />
        )}
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
          <div className="flex justify-end gap-8 w-full mr-16">
            <ButtonCreate
              text="Add new"
              href="/academic-affair/announcement/create-announcement"
            />
            <ButtonDelete
              text="Delete"
              onClick={() => {
                handleDeleteClick();
              }}
            />
          </div>
        </div>
        <div className="px-10 py-7 ">
          <div className="grid grid-cols-2">
            <div className="col-span-1 pt-2 rounded-3xl px-2 mx-5 bg-white overflow-auto h-screen">
              {announcementList.map((announcement_item) => {
                return (
                  <>
                    <AnnouncementCard
                      announcement={announcement_item}
                      selectedItem={selectedAnnouncement}
                      setSelectedItem={setSelectedAnnouncement}
                      editHref={
                        "/academic-affair/announcement/update-announcement/"
                      }
                      onClickView={() => {
                        setSelectedAnnouncementForModal(announcement_item);
                      }}
                    />
                  </>
                );
              })}
            </div>
            <div className="col-span-1 overflow-auto max-h-screen">
              <ViewAnnouncementPanel
                announcement={selectedAnnouncementForModal}
              />
            </div>
          </div>

          <div className="flex items-center flex-row flex-wrap justify-between pt-4">
            <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing{" "}
              <span className="font-semibold text-gray-900 ">
                {currentOffset}-{currentOffset + currentLimit - 1}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 ">{totalPage}</span>
            </span>

            <div className="">
              {totalPage > 0 && (
                <Footer
                  totalPage={totalPage}
                  handlePageClick={handlePageClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAnalysis;
