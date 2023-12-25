import Meta from "../header/Meta";
import Link from "next/link";

const AdminHome = () => {
  return (
    <>
      <Meta title={"Project Management System"} />
      <div className="bg-slate-50 w-full h-full flex flex-col items-center">
        <div className="font-bold rounded-md text-xl px-5 py-3 mt-3 text-white bg-gradient-to-r from-blue-600 to-cyan-500 ">
          TRANG HƯỚNG DẪN WEBSITE QUẢN LÝ ĐỒ ÁN 1, 2 CHO ADMIN HỆ THỐNG
        </div>
        <div data-test="main-page-card" className="main-page-card">
          <div className="font-bold text-lg text-center text-blue-600 ">
            CÁC CHỨC NĂNG CHÍNH CỦA WEB
          </div>
          <div>
            <ol className="main-page-card-list list-decimal font-semibold text-blue-600">
              <li className="hover:text-sky-500 cursor-pointer">
                <Link data-test="project-link" href="#account">
                  Quản lý danh sách tài khoản
                </Link>
              </li>
              <li className="hover:text-sky-500 cursor-pointer">
                <Link data-test="account-link" href="#profile">
                  Quản lý tài khoản cá nhân
                </Link>
              </li>
            </ol>
          </div>
        </div>
        <div data-test="project-management-card" className="main-page-card">
          <div
            className="font-bold text-lg text-center text-blue-600"
            id="account"
          >
            1. QUẢN LÝ DANH SÁCH ĐỒ ÁN
          </div>
          <div>
            <ul className="main-page-card-list list-disc">
              <li>
                Xem và quản lý những tài khoản có trong hệ thống, bằng cách vào
                tab <b>Account</b> trên thanh navigation
              </li>
              <li>
                Có thể tìm kiếm tài khoản mong muốn bằng cách sử dụng thanh{" "}
                <b>Search</b> để tìm kiếm tài khoản. Lưu ý: tìm kiếm tài khoản
                theo tên
              </li>
              <li>
                Thêm tài khoản mới vào danh sách tài khoản, sử dụng nút{" "}
                <b>Add account</b>
              </li>
              <li>
                Xóa tài khoản khỏi danh sách, có thể xóa cùng lúc nhiều tài
                khoản, sử dụng nút chọn và nút <b>Delete</b>.
              </li>
              <li>
                Chỉnh sửa thông tin tài khoản trong hệ thống, sử dụng nút{" "}
                <b>Edit</b> ở trong mỗi thẻ tài khoản
              </li>
            </ul>
          </div>
        </div>
        <div data-test="analysis-management-card" className="main-page-card">
          <div
            className="font-bold text-lg text-center text-blue-600"
            id="profile"
          >
            2. QUẢN LÝ TÀI KHOẢN CÁ NHÂN
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
                cá nhân cùng ảnh đại diện, bên tay phải sẽ là giao diện chỉnh
                sửa thông tin cá nhân
              </li>
              <li>
                Tại nội dung bên tay trái, admin có thể nhấn chọn vào ảnh đại
                diện, hoặc vào nút <b>Edit profile</b> để chỉnh sửa thông tin
                tài khoản cá nhân, tại đây admin có thể thay đổi ảnh đại diện,
                cũng như có thể chỉnh sửa thông tin cá nhân tùy ý, một số thông
                tin cá nhân chỉ có thể được thay đổi bởi admin hệ thống
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
