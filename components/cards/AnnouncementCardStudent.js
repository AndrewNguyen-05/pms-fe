import Link from "next/link";
const path = require("path");
import trimText from "@/utils/trimText";

const AnnouncementCardStudent = ({
  announcement,
  selectedItem,
  setSelectedItem,
  editHref,
  onClickView,
}) => {
  return (
    <>
      {announcement.isPublic === "Posted" ? (
        <div data-test="announcement-card" onClick={onClickView}>
          <div className="bg-white border-2 border-slate-100 rounded-2xl h-[115px] shadow-md flex items-center py-2 mb-4 hover:bg-slate-50 cursor-pointer">
            <div className="pl-5 w-full">
              <div className="flex flex-col col-span-3">
                <div className="flex justify-between">
                  <div
                    data-test="announcement-card-title"
                    className="font-bold text-base mr-1 text-blue-700"
                  >
                    {trimText(announcement.title, 70)}
                  </div>
                </div>
                <div className="grid grid-cols-5 mt-2">
                  <div className="col-span-3 text-sm flex items-center text-gray-600 pr-2">
                    {trimText(announcement.content, 90)}
                  </div>
                  <div className="flex gap-1 text-sm text-gray-500 justify-end pr-3 col-span-2">
                    <span className="">
                      <div>Created Date:</div>
                      <div className="font-semibold text-gray-700">
                        {announcement.dateCreated}
                      </div>
                    </span>
                    <span className="border-r-2 border-slate-200"></span>
                    <span>
                      <div>Last Update:</div>
                      <div className=" font-semibold text-gray-700">
                        {announcement.dateUpdated}
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AnnouncementCardStudent;
