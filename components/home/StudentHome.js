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
                <Link data-test="analysis-link" href="#account">
                  Quản lý tài khoản cá nhân - đồ án đang đăng ký{" "}
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
                Có thể tìm kiếm đồ án mong muốn bằng cách sử dụng thanh{" "}
                <b>Search</b> để tìm kiếm đồ án. Lưu ý: tìm kiếm đồ án theo tên
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
                <b>Project</b>. Lưu ý: tìm kiếm thông báo theo tiêu đề
              </li>
            </ul>
          </div>
        </div>
        <div data-test="analysis-management-card" className="main-page-card">
          <div
            className="font-bold text-lg text-center text-blue-600"
            id="account"
          >
            3. QUẢN LÝ TÀI KHOẢN CÁ NHÂN - ĐỒ ÁN ĐANG ĐĂNG KÝ
          </div>
          <div>
            <ul className="main-page-card-list list-disc">
              <li>
                Xem và quản lý tài khoản cá nhân trong hệ thống, bằng cách vào
                tên tài khoản ở góc phải trên cùng màn hình, và chọn{" "}
                <b>Profile</b> để truy cập trang quản lý tài khoản cá nhân
              </li>
              <li>
                Trong tab <b>Profile</b> nội dung ở bên tay trái sẽ là thông tin
                cá nhân cùng ảnh đại diện, bên tay phải sẽ là thông tin đồ án
                sinh viên đang đăng ký, nếu chưa đăng ký đồ án nào thì hệ thống
                sẽ báo sinh viên chưa đăng ký. Tại đây sinh viên có thể xem được
                điểm số, cũng như có thể hủy đồ án đang đăng ký bằng cách chọn{" "}
                <b>Cancel register</b>, hoặc sử dụng <b>Submit project</b> để
                nộp đường dẫn chứa đồ án của bản thân, cùng các tài liệu liên
                quan.
              </li>
              <li>
                Tại nội dung bên tay trái, sinh viên có thể nhấn chọn vào ảnh
                đại diện, hoặc vào nút <b>Edit profile</b> để chỉnh sửa thông
                tin tài khoản cá nhân, tại đây sinh viên có thể thay đổi ảnh đại
                diện, cũng như có thể chỉnh sửa thông tin cá nhân tùy ý, một số
                thông tin cá nhân chỉ có thể được thay đổi bởi admin hệ thống
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentHome;
