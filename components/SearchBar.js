import React, { useState } from "react";

const SearchBar = ({ placeholder, handleSearch, handleKeyDown }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className=" flex flex-row">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className=" w-[500px] p-4 ps-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white focus:ring-1 focus:outline-none focus:ring-blue-300 "
          placeholder={placeholder}
          required
          onChange={(event) => setSearchValue(event.target.value)}
          onKeyDown={(event) => handleKeyDown(event)}
        />
        <button
          type="submit"
          className="text-white absolute px-4 py-2 end-2.5 bottom-2 bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-300  hover:bg-blue-800 font-medium rounded-lg text-sm"
          onClick={() => {
            handleSearch(searchValue);
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
