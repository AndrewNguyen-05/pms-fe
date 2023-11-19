import React from "react";
import WarningModal from "@/components/WarningModal";
import { useState } from "react";
import { useRouter } from "next/router";
import { postCreateAnnouncement } from "@/services/announcementServices";
import { toast } from "react-toastify";
const CreateAnnouncement = () => {
  const defaultValidInput = {
    isValidTitle: true,
    isValidContent: true,
  };
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
  const router = useRouter();

  // validate the input
  const isValidateInput = () => {
    if (!title) {
      toast.error("Announcement title is required!");
      setObjCheckInput({ ...defaultValidInput, isValidTitle: false });
      return false;
    }

    if (!content) {
      toast.error("Announcement content is required!");
      setObjCheckInput({ ...defaultValidInput, isValidContent: false });
      return false;
    }

    return true;
  };

  // handle create announcement
  const handleCreateAnnouncement = async () => {
    let isValid = isValidateInput();
    if (isValid) {
      let response = await postCreateAnnouncement(title, content, isPublic);
      let serverData = response.data;
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        router.push("/academic-affair/announcement/view-announcement");
      } else {
        toast.error(serverData.EM);
      }
    }
  };

  const handleCancelClick = () => {
    router.push("/academic-affair/announcement/view-announcement");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-slate-100 min-w-full min-h-screen h-0 py-6">
        {isModalOpen && (
          <WarningModal
            question="Are you sure you want to quit ?"
            btnYesText="Yes, I'm sure"
            btnNoText="No, cancel"
            handleConfirmDelete={handleCancelClick}
            handleCloseModal={handleCloseModal}
          />
        )}
        <section className="bg-white mx-20 rounded-2xl py-4 px-6 h-max ">
          <h1 className="mb-4 text-xl font-bold text-gray-900">
            New announcement
          </h1>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            id="title"
            name="title"
            className={
              objCheckInput.isValidTitle
                ? "bg-slate-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                : "bg-red-50 border ring-1 ring-red-400 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            }
          />
          <br />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            id="content"
            name="content"
            className={
              objCheckInput.isValidContent
                ? "bg-slate-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 resize-none h-96"
                : "bg-red-50 border ring-1 ring-red-400 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 resize-none h-96 "
            }
          />
          <input
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounedd-2xl m-3 "
            type="checkbox"
            id="isPublic"
            name="isPublic"
            checked={isPublic}
            value={content}
            onChange={(e) => {
              setIsPublic(e.target.checked);
            }}
          />
          <label
            className="ms-2 text-base font-medium text-gray-900 dark:text-gray-300 select-none"
            htmlFor="isPublic"
          >
            Post this announcement
          </label>
          <br />

          <div className="flex gap-8 justify-end">
            <button
              className="items-center px-5 py-2.5 mt-4 text-sm font-medium border-2 border-red-600 text-center text-red-600 bg-white  rounded-lg focus:ring-2 focus:ring-red-200 hover:bg-red-600 hover:text-white hover:border-red-600"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Cancel
            </button>
            <button
              className="items-center px-5 py-2.5 mt-4 text-sm font-medium border-2 border-blue-700 text-center text-blue-700 bg-white  rounded-lg focus:ring-2 focus:ring-blue-200 hover:bg-blue-700 hover:text-white"
              onClick={() => {
                handleCreateAnnouncement();
              }}
            >
              Add Announcement
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default CreateAnnouncement;