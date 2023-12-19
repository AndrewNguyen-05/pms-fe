import React from "react";
import Link from "next/link";

const ButtonCreate = ({ text, href }) => {
  return (
    <Link href={href}>
      <button id="create-button" type="button" className="btn-blue h-full">
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
