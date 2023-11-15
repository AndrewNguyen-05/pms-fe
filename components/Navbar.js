import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="w-screen flex items-center justify-start px-5 py-1">
          <button className="font-bold text-[22px] pr-2">
            <span className="text-sky-500">UIT</span>
            <span className="text-cyan-600">-</span>
            <span className="text-blue-700">PMS</span>
          </button>
          <ul className="font-medium text-[17px] flex flex-row p-4 gap-2 items-center rounded-lg bg-white">
            <li>
              <Link
                href="/academic-affair/project"
                className="py-2 px-3  bg-blue-700 rounded md:bg-transparent text-black hover:text-blue-700"
              >
                Project
              </Link>
            </li>
            <li>
              <Link
                href="/academic-affair/announcement"
                className="py-2 px-3 bg-blue-700 rounded md:bg-transparent text-black hover:text-blue-700"
              >
                Announcement
              </Link>
            </li>
            <li>
              <Link
                href="/academic-affair/score"
                className="py-2 px-3 bg-blue-700 rounded md:bg-transparent text-black hover:text-blue-700 "
              >
                Score
              </Link>
            </li>
            <li>
              <Link
                href="/academic-affair/analysis"
                className="py-2 px-3 bg-blue-700 rounded md:bg-transparent text-black hover:text-blue-700"
              >
                Analysis
              </Link>
            </li>
            <li>
              <Link
                href="/academic-affair/report"
                className="py-2 px-3  bg-blue-700 rounded md:bg-transparent text-black hover:text-blue-700"
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
