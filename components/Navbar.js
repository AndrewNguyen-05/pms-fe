import Link from "next/link";

const Navbar = () => {
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
                href="/academic-affair/project/view"
                className="nav-item mx-5 bg-blue-700 rounded md:bg-transparent text-black hover:after:w-[100%] hover:text-blue-400 focus:text-blue-700"
              >
                Project
              </Link>
            </li>
            <li>
              <Link
                href="/academic-affair/announcement/view"
                className="nav-item mx-5 bg-blue-700 rounded md:bg-transparent text-black hover:text-blue-400 focus:text-blue-700"
              >
                Announcement
              </Link>
            </li>
            <li>
              <Link
                href="/academic-affair/score/view"
                className="nav-item mx-5 bg-blue-700 rounded md:bg-transparent text-black hover:text-blue-400 focus:text-blue-700"
              >
                Score
              </Link>
            </li>
            <li>
              <Link
                href="/academic-affair/analysis/view"
                className="nav-item mx-5 bg-blue-700 rounded md:bg-transparent text-black hover:text-blue-400 focus:text-blue-700"
              >
                Analysis
              </Link>
            </li>
            <li>
              <Link
                href="/academic-affair/report/view"
                className="nav-item mx-5 bg-blue-700 rounded md:bg-transparent text-black hover:text-blue-400 focus:text-blue-700"
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
