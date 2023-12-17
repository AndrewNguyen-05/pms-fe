import formatRole from "@/utils/formatRole";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const ProfileCard = ({ userData }) => {
  console.log(">>> check userdata: ", userData);
  const router = useRouter();
  return (
    <>
      <div className="bg-white rounded-md flex flex-col justify-center items-center w-1/3 py-3 m-5 shadow-md">
        <div>
          <div
            className="avatar tooltip"
            data-tip="Change your avatar"
            onClick={() => {
              switch (userData?.role) {
                case "student":
                  return router.push(
                    `/student/profile/edit-profile/${userData?.id}`
                  );
                case "teacher":
                  return router.push("/teacher/profile/edit-profile");
                case "aa":
                  return router.push("/aa/profile/edit-profile");
                default:
                  return null;
              }
            }}
          >
            <div className="w-64 rounded-full ring ring-sky-300 ring-offset-base-100 ring-offset-2 hover:cursor-pointer">
              <img
                src={
                  userData?.User?.avatarLink ||
                  "https://ecommercenextjs.blob.core.windows.net/ecommerceadmin/1702837258987.png"
                }
              />
            </div>
          </div>
          <div>
            <div className="font-semibold text-2xl mt-2">
              {userData?.User?.name}
            </div>
            <div className="text-gray-400">{userData?.username}</div>
          </div>
          <div className="border-y my-2 flex flex-col gap-2 py-2 text-sm">
            <div>
              {" "}
              {(() => {
                switch (userData?.role) {
                  case "student":
                    return (
                      <div className="text-gray-700 flex gap-3 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                          />
                        </svg>
                        {userData?.major}
                      </div>
                    );
                  case "teacher":
                  case "aa":
                    return (
                      <div className="text-gray-700 flex gap-3 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                          />
                        </svg>
                        {userData?.faculty}
                      </div>
                    );
                  default:
                    return null;
                }
              })()}
            </div>
            <div className="flex gap-3 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              {userData?.User?.phone}
            </div>
            <div className="flex gap-3 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              {userData?.User?.email}
            </div>
            <div className="flex gap-3 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {formatRole(userData?.role)} -{" "}
              {userData?.role === "student"
                ? userData?.studentCode
                : userData?.role === "teacher"
                ? userData?.teacherCode
                : userData?.aaCode}
            </div>
            <div className="flex gap-3 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              {dayjs(userData?.User?.dateOfBirth).format("DD MMMM YYYY")}
            </div>
          </div>
          <div className="w-64">
            <button
              onClick={() => {
                switch (userData?.role) {
                  case "student":
                    return router.push(
                      `/student/profile/edit-profile/${userData?.id}`
                    );
                  case "teacher":
                    return router.push("/teacher/profile/edit-profile");
                  case "aa":
                    return router.push("/aa/profile/edit-profile");
                  default:
                    return null;
                }
              }}
              className="w-full border-[1px] shadow-md border-sky-200 text-blue-600 bg-white hover:text-white hover:bg-blue-600 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 focus:outline-none flex items-center justify-center gap-3"
            >
              Edit profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
