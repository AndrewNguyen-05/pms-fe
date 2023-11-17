import React, { use } from "react";
import Meta from "@/components/Meta";
import ButtonCreate from "@/components/ButtonCreate";
import ButtonDelete from "@/components/ButtonDelete";
import TableViewItem from "@/components/TableViewItem";
import SearchBar from "@/components/SearchBar";
import { getAnnouncementList } from "@/services/announcementServices";
import { useState, useEffect } from "react";

const ViewAnnouncement = () => {
  const [announcementList, setAnnouncementList] = useState([]);
  const [announcementListCombined, setAnnouncementListCombined] = useState([]);

  useEffect(() => {
    getAnnouncementList().then((announcementList) => {
      setAnnouncementList(announcementList);
      setAnnouncementListCombined(
        announcementList.map((row) => {
          return {
            id: row.id,
            title: row.title,
            name: row.content,
            dateCreated: row.dateCreated.slice(0, 10),
            dateUpdated: row.dateUpdated.slice(0, 10),
          };
        })
      );

      console.log(announcementList);
    });
  }, []);
  return (
    <>
      <Meta title={"View announcement"} />
      <div className="bg-slate-50 h-full pt-6">
        <div className="flex items-center">
          <div className="px-16">
            <SearchBar placeholder="Search Announcement..." />
          </div>
          <div className="flex justify-end gap-8 w-full mr-16">
            <ButtonCreate text="Add new" href="#" />
            <ButtonDelete text="Delete" href="#" />
          </div>
        </div>
        <div className="px-16 py-7 ">
          <TableViewItem
            columnNames={[
              "bao gio thi duoc 1 ti goi me",
              "Title",
              "Content",
              "Date Created",
              "Last Modified",
              "Action",
            ]}
            rowList={announcementListCombined}
            editHref="#"
          />
          <nav
            className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                1-10
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                1000
              </span>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  5
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ViewAnnouncement;
