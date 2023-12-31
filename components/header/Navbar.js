import Link from "next/link";
import NavItem from "./Navitem";
import { getUserByID } from "@/services/userServices";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
const path = require("path");

const Navbar = ({ items }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState(-1);
  const [userData, setUserData] = useState({});

  const checkRelative = (parent, dir) => {
    const relative = path.relative(parent, dir);
    return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
  };

  useEffect(() => {
    let currentPath = router.pathname;
    items.forEach((item, index) => {
      if (checkRelative(item.effectHref, currentPath)) {
        setActiveIdx(index);
        return;
      }
    });
  }, [items]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let data = await getUserByID(session.user.userId);
    setUserData(data);
  };

  return (
    <>
      <div className="bg-white border-gray-200 flex justify-between items-center">
        <div className="w-full flex items-center justify-start px-5 py-1">
          <Link href="/">
            <button
              className="font-bold text-[22px] pr-2"
              onClick={() => {
                setActiveIdx(-1);
              }}
            >
              <span className="text-sky-500">UIT</span>
              <span className="text-cyan-600">-</span>
              <span className="text-blue-700">PMS</span>
            </button>
          </Link>

          <ul className="font-medium text-[17px] flex flex-row p-4 gap-2 items-center rounded-lg bg-white">
            {items.map(({ name, href }, idx) => {
              return (
                <div
                  onClick={() => {
                    setActiveIdx(idx);
                  }}
                  key={idx}
                >
                  <NavItem name={name} href={href} active={idx === activeIdx} />
                </div>
              );
            })}
          </ul>
        </div>
        <div>
          <div className="mr-12 dropdown dropdown-hover">
            <details className="">
              <summary className="p-0 w-[full] pr-2 flex items-center">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-square w-max py-1 px-3"
                >
                  <div className="avatar flex items-center gap-4">
                    <div className="w-8 rounded-full ring ring-sky-300 ring-offset-base-100 ring-offset-2">
                      <img
                        alt="avatar"
                        src={
                          userData?.User?.avatarLink ||
                          "https://ecommercenextjs.blob.core.windows.net/ecommerceadmin/1702837258987.png"
                        }
                      />
                    </div>
                    {userData?.User?.name}
                  </div>
                </div>
              </summary>
              <ul className="p-2 bg-base-100 w-[200px] dropdown-content rounded-t-none shadow-md rounded-md flex flex-col items-center z-50">
                <li className="w-11/12">
                  <Link
                    href="/"
                    className="flex w-full justify-start gap-2 p-2 items-center rounded-md hover:bg-blue-500 hover:text-white"
                  >
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
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                    Home page
                  </Link>
                </li>
                <li className="w-11/12">
                  <Link
                    data-test="view-profile-button"
                    href={(() => {
                      switch (userData.role) {
                        case "teacher":
                          return `/teacher/profile/view-profile/${userData?.User?.name}`;
                        case "student":
                          return `/student/profile/view-profile/${userData?.User?.name}`;
                        case "aa":
                          return `/academic-affair/profile/view-profile/${userData?.User?.name}`;
                        case "admin":
                          return `/admin/profile/view-profile/${userData?.User?.name}`;
                        default:
                          return "/";
                      }
                    })()}
                    className="flex w-full justify-start gap-2 p-2 items-center rounded-md hover:bg-blue-500 hover:text-white"
                  >
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
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    Profile
                  </Link>
                </li>
                <li className="w-11/12 flex items-center border-t-2">
                  <button
                    data-test="logout-button"
                    className="flex w-full justify-start gap-2 p-2  items-center rounded-md hover:bg-blue-500 hover:text-white"
                    onClick={() => {
                      signOut();
                    }}
                  >
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
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>
                    Log out
                  </button>
                </li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
