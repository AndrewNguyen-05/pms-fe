import React from "react";
import Link from "next/link";
import Meta from "@/components/header/Meta";

const AcademicAffairHome = () => {
  return (
    <>
      <Meta title={"Project Management System"} />
      <div className="bg-slate-50 w-full h-full flex flex-col items-center">
        <div className="font-bold text-xl mt-3 text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-2 rounded-lg">
          TRANG HƯỚNG DẪN WEBSITE QUẢN LÝ ĐỒ ÁN 1, 2
        </div>
        <div data-test="main-page-card" className="main-page-card">
          <div className="font-bold text-lg text-center text-blue-600 ">
            CÁC CHỨC NĂNG CHÍNH CỦA WEB
          </div>
          <div>
            <ol className="main-page-card-list list-decimal font-semibold ">
              <li className="hover:text-gray-500 cursor-pointer">
                <Link data-test="project-link" href="#project">
                  Quản lý danh sách đồ án
                </Link>
              </li>
              <li className="hover:text-gray-500 cursor-pointer">
                <Link data-test="announcement-link" href="#announcement">
                  Quản lý danh sách thông báo
                </Link>
              </li>
              <li className="hover:text-gray-500 cursor-pointer">
                <Link data-test="score-link" href="#score">
                  Quản lý điểm số sinh viên
                </Link>
              </li>
              <li className="hover:text-gray-500 cursor-pointer">
                <Link data-test="analysis-link" href="#analysis">
                  Quản lý báo cáo, thống kê{" "}
                </Link>
              </li>
            </ol>
          </div>
        </div>
        <div data-test="project-management-card" className="main-page-card">
          <div
            className="font-bold text-lg text-center text-blue-600"
            id="project"
          >
            1. QUẢN LÝ DANH SÁCH ĐỒ ÁN
          </div>
          <div>
            <ul className="main-page-card-list list-disc">
              <li>
                Xem và quản lý những đồ án có trong hệ thống, bằng cách vào tab{" "}
                <b>Project</b> trên thanh navigation
              </li>
              <li>
                Thêm đồ án mới vào danh sách đồ án, sử dụng nút <b>Add new</b>
              </li>
              <li>
                Xóa đồ án khỏi danh sách, có thể xóa cùng lúc nhiều đồ án, sử
                dụng nút chọn và nút <b>Delete</b>
              </li>
              <li>
                Chỉnh sửa thông tin đồ án trong hệ thống, sử dụng nút{" "}
                <b>Edit</b> ở trong mỗi thẻ đồ án
              </li>
            </ul>
          </div>
        </div>
        <div
          data-test="announcement-management-card"
          className="main-page-card"
        >
          <div
            className="font-bold text-lg text-center text-blue-600"
            id="announcement"
          >
            2. QUẢN LÝ DANH SÁCH THÔNG BÁO
          </div>
          <div>
            <ul className="main-page-card-list list-disc">
              <li>
                Xem và quản lý những thông báo có trong hệ thống, bằng cách vào
                tab <b>Announcement</b> trên thanh navigation
              </li>
              <li>
                Xem chi tiết thông báo bằng cách nhấn vào thẻ thông báo cần xem,
                nội dung sẽ được hiển thị chi tiết ở panel bên tay phải
              </li>
              <li>
                Thêm thông báo mới vào danh sách đồ án, sử dụng nút{" "}
                <b>Add new</b>
              </li>
              <li>
                Xóa thông báo khỏi danh sách, có thể xóa cùng lúc nhiều thông
                báo, sử dụng nút chọn và nút <b>Delete</b>
              </li>
              <li>
                Chỉnh sửa thông tin thông báo trong hệ thống, sử dụng nút{" "}
                <b>Edit</b> ở trong mỗi thẻ thông báo
              </li>
            </ul>
          </div>
        </div>
        <div data-test="score-management-card" className="main-page-card">
          <div
            className="font-bold text-lg text-center text-blue-600"
            id="score"
          >
            3. QUẢN LÝ ĐIỂM SỐ SINH VIÊN
          </div>
          <div>
            <ul className="main-page-card-list">
              <li>
                Xem và quản lý điểm số của sinh viên có trong hệ thống, bằng
                cách vào tab <b>Score</b> trên thanh navigation
              </li>
            </ul>
          </div>
        </div>
        <div data-test="analysis-management-card" className="main-page-card">
          <div
            className="font-bold text-lg text-center text-blue-600"
            id="analysis"
          >
            4. QUẢN LÝ BÁO CÁO, THỐNG KÊ
          </div>
          <div>
            <ul className="main-page-card-list list-disc">
              <li>
                Xem và quản lý thống kê trong hệ thống, bằng cách vào tab{" "}
                <b>Analysis</b> trên thanh navigation
              </li>
              <li>
                Trong tab <b>Analysis</b> sử dụng phím chuyển để chuyển đổi qua
                lại giữa các biểu đồ thống kê
              </li>
              <li>
                Các tab <b>Project</b>, <b>Score</b> và <b>Analysis</b> sẽ có
                nút export để xuất ra báo cáo
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademicAffairHome;
