import Link from "next/link";
import NavItem from "./Navitem";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState(-1);
  const items = [
    { name: "Project", href: "/academic-affair/project/view-project" },
    {
      name: "Announcement",
      href: "/academic-affair/announcement/view-announcement",
    },
    {
      name: "Score",
      href: "/academic-affair/score/view-score",
    },
    { name: "Analysis", href: "/academic-affair/analysis/view-analysis" },
    { name: "Report", href: "/academic-affair/report/view-report" },
  ];

  useEffect(() => {
    let currentPath = router.pathname;
    items.forEach((item, index) => {
      if (item.href == currentPath) {
        setActiveIdx(index);
        return;
      }
    });
  }, []);

  return (
    <>
      <nav className="bg-white border-gray-200">
        <div className="w-screen flex items-center justify-start px-5 py-1">
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
      </nav>
    </>
  );
};

export default Navbar;
