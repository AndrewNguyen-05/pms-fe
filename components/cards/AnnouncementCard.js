import Link from "next/link";
const path = require("path");
import trimText from "@/utils/trimText";

const AnnouncementCard = ({
  announcement,
  selectedItem,
  setSelectedItem,
  editHref,
  onClickView,
}) => {
  const onItemSelect = (announcement, isSelected) => {
    if (isSelected) {
      setSelectedItem((prev) => [...prev, announcement]);
    } else {
      setSelectedItem((prev) => prev.filter((p) => p.id !== announcement.id));
    }
  };
  return (
    <div data-test="announcement-card">
      <div className="bg-white border-2 border-slate-100 rounded-2xl h-[115px] shadow-md flex items-center py-2 mb-4 hover:bg-slate-50 cursor-pointer">
        <div className="grid grid-cols-11 justify-between w-full">
          <div className="col-span-1 flex items-center justify-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              checked={selectedItem.some((item) => item.id === announcement.id)}
              onChange={(event) =>
                onItemSelect(announcement, event.target.checked)
              }
            />
          </div>
          <div className="col-span-9" onClick={onClickView}>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div data-test="announcement-card-title" className="font-bold text-base mr-1 text-blue-700">
                  {trimText(announcement.title, 70)}
                </div>
                <div>
                  {announcement.isPublic === "Posted" ? (
                    <div className="bg-blue-50 text-blue-700 rounded-3xl flex justify-center items-center px-3 w-[100px] h-[25px]">
                      Posted
                    </div>
                  ) : (
                    <div className="bg-red-50 text-red-700 rounded-3xl flex justify-center items-center px-3 w-[100px] h-[25px]">
                      Unposted
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-11 mt-2">
                <div className="col-span-7 text-sm flex items-center text-gray-600 pr-2">
                  {trimText(announcement.content, 90)}
                </div>
                <div className="col-span-4 flex gap-1 text-sm text-gray-500 justify-end pr-3">
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
          <div className="col-span-1 flex items-center justify-center border-l-2 border-slate-200 mx-2">
            <Link
              data-test="edit-button" 
              href={path.join(editHref, `[id]`)}
              as={path.join(editHref, "" + announcement.id)}
              className="font-medium text-blue-600 hover:underline text-base"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
