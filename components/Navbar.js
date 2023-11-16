import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const link1 = useRef(null);
  const link2 = useRef(null);
  const link3 = useRef(null);
  const link4 = useRef(null);
  const link5 = useRef(null);
  const route = useRouter();
  useEffect(() => {
    console.log(route.asPath);
    switch (route.asPath) {
      case "/academic-affair/project/view-project":
        link1.current.classList.add("text-blue-700", "after:w-[100%]");
        link2.current.classList.remove("text-blue-700", "after:w-[100%]");
        link3.current.classList.remove("text-blue-700", "after:w-[100%]");
        link4.current.classList.remove("text-blue-700", "after:w-[100%]");
        link5.current.classList.remove("text-blue-700", "after:w-[100%]");
        break;
      case "/academic-affair/announcement/view-announcement":
        link2.current.classList.add("text-blue-700", "after:w-[100%]");
        link1.current.classList.remove("text-blue-700", "after:w-[100%]");
        link3.current.classList.remove("text-blue-700", "after:w-[100%]");
        link4.current.classList.remove("text-blue-700", "after:w-[100%]");
        link5.current.classList.remove("text-blue-700", "after:w-[100%]");
        break;
      case "/academic-affair/score/view-score":
        link3.current.classList.add("text-blue-700", "after:w-[100%]");
        link1.current.classList.remove("text-blue-700", "after:w-[100%]");
        link2.current.classList.remove("text-blue-700", "after:w-[100%]");
        link4.current.classList.remove("text-blue-700", "after:w-[100%]");
        link5.current.classList.remove("text-blue-700", "after:w-[100%]");
        break;
      case "/academic-affair/analysis/view-analysis":
        link4.current.classList.add("text-blue-700", "after:w-[100%]");
        link1.current.classList.remove("text-blue-700", "after:w-[100%]");
        link2.current.classList.remove("text-blue-700", "after:w-[100%]");
        link3.current.classList.remove("text-blue-700", "after:w-[100%]");
        link5.current.classList.remove("text-blue-700", "after:w-[100%]");
        break;
      case "/academic-affair/report/view-report":
        link5.current.classList.add("text-blue-700", "after:w-[100%]");
        link1.current.classList.remove("text-blue-700", "after:w-[100%]");
        link2.current.classList.remove("text-blue-700", "after:w-[100%]");
        link3.current.classList.remove("text-blue-700", "after:w-[100%]");
        link4.current.classList.remove("text-blue-700", "after:w-[100%]");
        break;
      default:
        link1.current.classList.remove("text-blue-700", "after:w-[100%]");
        link2.current.classList.remove("text-blue-700", "after:w-[100%]");
        link3.current.classList.remove("text-blue-700", "after:w-[100%]");
        link4.current.classList.remove("text-blue-700", "after:w-[100%]");
        link5.current.classList.remove("text-blue-700", "after:w-[100%]");
    }
  }, [route]);
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="w-screen flex items-center justify-start px-5 py-1">
          <Link href="/">
            <button className="font-bold text-[22px] pr-2">
              <span className="text-sky-500">UIT</span>
              <span className="text-cyan-600">-</span>
              <span className="text-blue-700">PMS</span>
            </button>
          </Link>

          <ul className="font-medium text-[17px] flex flex-row p-4 gap-2 items-center rounded-lg bg-white">
            <li>
              <Link
                href="/academic-affair/project/view-project"
                className="nav-item mx-5 bg-blue-700 rounded md:bg-transparent text-black hover:after:w-[100%] hover:text-blue-400 focus:text-blue-700"
                ref={link1}
              >
                Project
              </Link>
            </li>
            <li>
              <Link
                href="/academic-affair/announcement/view-announcement"
                className="nav-item mx-5 bg-blue-700 rounded md:bg-transparent text-black hover:text-blue-400 focus:text-blue-700"
                ref={link2}
              >
                Announcement
              </Link>
            </li>
            <li>
              <Link
                href="/academic-affair/score/view-score"
                className="nav-item mx-5 bg-blue-700 rounded md:bg-transparent text-black hover:text-blue-400 focus:text-blue-700"
                ref={link3}
              >
                Score
              </Link>
            </li>
            <li>
              <Link
                href="/academic-affair/analysis/view-analysis"
                className="nav-item mx-5 bg-blue-700 rounded md:bg-transparent text-black hover:text-blue-400 focus:text-blue-700"
                ref={link4}
              >
                Analysis
              </Link>
            </li>
            <li>
              <Link
                href="/academic-affair/report/view-report"
                className="nav-item mx-5 bg-blue-700 rounded md:bg-transparent text-black hover:text-blue-400 focus:text-blue-700"
                ref={link5}
              >
                Report
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
