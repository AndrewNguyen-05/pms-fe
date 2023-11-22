import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const ViewAnnouncementPanel = ({ announcement }) => {
  return (
    <>
      <div
        className={`bg-white h-full w-full rounded-3xl py-4 px-8 flex justify-center`}
      >
        {Object.keys(announcement).length > 0 ? (
          <>
            <div>
              <div className="text-red-700 font-semibold text-3xl my-5">
                {announcement.title}
              </div>
              <div className="italic">
                Created at {announcement.dateCreated}
              </div>
              <div className="text-lg my-3">{announcement.content}</div>
            </div>
          </>
        ) : (
          <div className="mt-48 text-lg font-semibold">
            Please select an announcement to view
          </div>
        )}
      </div>
    </>
  );
};

export default ViewAnnouncementPanel;
