import Link from "next/link";
import NavItem from "./Navitem";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
const path = require("path");

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState(-1);
  const items = [
    {
      name: "Project",
      href: "/academic-affair/project/view-project",
      effectHref: "/academic-affair/project/",
    },
    {
      name: "Announcement",
      href: "/academic-affair/announcement/view-announcement",
      effectHref: "/academic-affair/announcement/",
    },
    {
      name: "Score",
      href: "/academic-affair/score/view-score",
      effectHref: "/academic-affair/score/",
    },
    {
      name: "Analysis",
      href: "/academic-affair/analysis/view-analysis",
      effectHref: "/academic-affair/analysis/",
    },
  ];

  const checkRelatvie = (parent, dir) => {
    const relative = path.relative(parent, dir);
    return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
  };
  useEffect(() => {
    let currentPath = router.pathname;
    console.log(currentPath);
    items.forEach((item, index) => {
      if (checkRelatvie(item.effectHref, currentPath)) {
        setActiveIdx(index);
        return;
      }
    });
  }, []);

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
        <button
          className="w-[100px] h-[40px] mx-5 rounded-lg text-blue-700 font-semibold hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white "
          onClick={() => {
            signOut();
          }}
        >
          Log out
        </button>
      </div>
    </>
  );
};

export default Navbar;
