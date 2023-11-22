import React from "react";
import Link from "next/link";

const ButtonCreate = ({ text, href }) => {
  return (
    <Link href={href}>
      <button
        type="button"
        className="w-[150px] border-[1px] border-sky-400 text-blue-700 bg-white hover:text-white hover:bg-blue-700 focus:ring-1 focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 focus:outline-none flex items-center justify-center gap-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        {text}
      </button>
    </Link>
  );
};

export default ButtonCreate;
