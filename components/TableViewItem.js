import React from "react";
import Link from "next/link";
const TableViewItem = ({ columnNames, rowList, editHref }) => {
  return (
    <table className="w-full text-[16px] text-left rtl:text-right text-gray-500 ">
      <thead className="text-[16px] text-blue -700 uppercase border-b bg-white ">
        <tr>
          <th scope="col" className="p-4"></th>
          {columnNames.map((name, index) => {
            return (
              <th scope="col" className="px-6 py-3" key={index}>
                {name}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rowList.map((row, index) => {
          return (
            <tr
              className="bg-white border-b hover:bg-gray-50 cursor-pointer"
              key={index}
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg "
                  />
                </div>
              </td>

              {Object.values(row).map((cell, index) => {
                // if (index == 0) {
                //   return (
                //     <th
                //       scope="row"
                //       className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                //       key={index}
                //     >
                //       {cell}
                //     </th>
                //   );
                // }
                return (
                  <td className="px-6 py-4" key={index}>
                    {cell}
                  </td>
                );
              })}

              <td className="px-6 py-4">
                <Link
                  href={editHref}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableViewItem;
