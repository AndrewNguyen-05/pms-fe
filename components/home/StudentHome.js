import React from "react";
import Meta from "../header/Meta";
import Link from "next/link";

const StudentHome = () => {
  return (
    <>
      <Meta title={"Project Management System"} />
      <div className="bg-slate-50 w-full h-full flex flex-col items-center">
        <div className="font-bold rounded-md text-xl px-5 py-3 mt-3 text-white bg-gradient-to-r from-blue-600 to-cyan-500 ">
          TRANG HƯỚNG DẪN WEBSITE QUẢN LÝ ĐỒ ÁN 1, 2 DÀNH CHO SINH VIÊN
        </div>
        <div data-test="main-page-card" className="main-page-card">
          <div className="font-bold text-lg text-center text-blue-600 ">
            CÁC CHỨC NĂNG CHÍNH CỦA WEB
          </div>
          <div>
            <ol className="main-page-card-list list-decimal font-semibold text-blue-600">
              <li className="hover:text-sky-500 cursor-pointer">
                <Link data-test="project-link" href="#project">
                  Đăng ký đồ án
                </Link>
              </li>
              <li className="hover:text-sky-500 cursor-pointer">
                <Link data-test="announcement-link" href="#announcement">
                  Xem danh sách thông báo
                </Link>
              </li>
              <li className="hover:text-sky-500 cursor-pointer">
                <Link data-test="score-link" href="#score">
                  Quản lý đồ án hiện tại đã đăng ký
                </Link>
              </li>
              <li className="hover:text-sky-500 cursor-pointer">
                <Link data-test="analysis-link" href="#analysis">
                  Quản lý tài khoản{" "}
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
            1. ĐĂNG KÝ ĐỒ ÁN
          </div>
          <div>
            <ul className="main-page-card-list list-disc">
              <li>
                Đăng ký những đồ án đang có trong hệ thống, bằng cách vào tab{" "}
                <b>Project</b> trên thanh navigation
              </li>
              <li>
                Có thể xem thông tin chi tiết của đồ án, như điều kiện để được
                tham gia đồ án, bằng cách nhấn trực tiếp vào thẻ đồ án cần xem
              </li>
              <li>
                Đăng ký đồ án bằng cách ấn vào nút <b>Register</b>, phải đảm bảo
                được là
                <ul className="list-disc ml-14 my-1">
                  <li>Đồ án vẫn còn chỗ trống</li>
                  <li>Sinh viên vẫn chưa đăng ký đồ án nào khác</li>
                </ul>
              </li>
              <li>
                Sinh viên có thể tìm kiếm đồ án mong muốn bằng cách sử dụng
                thanh <b>Search</b> ở góc trái màn hình
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
            2. XEM DANH SÁCH THÔNG BÁO
          </div>
          <div>
            <ul className="main-page-card-list list-disc">
              <li>
                Xem những thông báo có trong hệ thống, bằng cách vào tab{" "}
                <b>Announcement</b> trên thanh navigation
              </li>
              <li>
                Xem chi tiết thông báo bằng cách nhấn vào thẻ thông báo cần xem,
                nội dung sẽ được hiển thị chi tiết ở panel bên tay phải
              </li>
              <li>
                Có thể tìm kiếm thông báo mong muốn, bằng cách sử dụng thanh{" "}
                <b>Search</b> ở góc trái màn hình, tương tự như bên tab{" "}
                <b>Project</b>
              </li>
            </ul>
          </div>
        </div>
        <div data-test="score-management-card" className="main-page-card">
          <div
            className="font-bold text-lg text-center text-blue-600"
            id="score"
          >
            3. QUẢN LÝ ĐỒ ÁN HIỆN TẠI ĐÃ ĐĂNG KÝ
          </div>
          <div>
            <ul className="main-page-card-list list-disc">
              <li>Đang trong quá trình phát triển</li>
            </ul>
          </div>
        </div>
        <div data-test="analysis-management-card" className="main-page-card">
          <div
            className="font-bold text-lg text-center text-blue-600"
            id="analysis"
          >
            4. QUẢN LÝ TÀI KHOẢN
          </div>
          <div>
            <ul className="main-page-card-list list-disc">
              <li>Đang trong quá trình phát triển</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentHome;
