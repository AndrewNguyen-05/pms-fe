import Link from "next/link";
import Meta from "../header/Meta";

const TeacherHome = () => {
  return (
    <>
      <Meta title={"Project Management System"} />
      <div className="bg-slate-50 w-full h-full flex flex-col items-center">
        <div className="font-bold rounded-md text-xl px-5 py-3 mt-3 text-white bg-gradient-to-r from-blue-600 to-cyan-500 ">
          TRANG HƯỚNG DẪN WEBSITE QUẢN LÝ ĐỒ ÁN 1, 2 CHO GIẢNG VIÊN
        </div>
        <div data-test="main-page-card" className="main-page-card">
          <div className="font-bold text-lg text-center text-blue-600 ">
            CÁC CHỨC NĂNG CHÍNH CỦA WEB
          </div>
          <div>
            <ol className="main-page-card-list list-decimal font-semibold text-blue-600">
              <li className="hover:text-sky-500 cursor-pointer">
                <Link data-test="project-link" href="#project">
                  Quản lý danh sách đồ án
                </Link>
              </li>
              <li className="hover:text-sky-500 cursor-pointer">
                <Link data-test="announcement-link" href="#announcement">
                  Quản lý danh sách thông báo
                </Link>
              </li>
              <li className="hover:text-sky-500 cursor-pointer">
                <Link data-test="score-link" href="#score">
                  Quản lý điểm số sinh viên
                </Link>
              </li>
              <li className="hover:text-sky-500 cursor-pointer">
                <Link data-test="account-link" href="#account">
                  Quản lý tài khoản cá nhân
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
                Có thể tìm kiếm đồ án mong muốn bằng cách sử dụng thanh{" "}
                <b>Search</b> để tìm kiếm đồ án. Lưu ý: tìm kiếm đồ án theo tên
              </li>
              <li>
                Thêm đồ án mới vào danh sách đồ án, sử dụng nút{" "}
                <b>Add project</b>
              </li>
              <li>
                Xóa đồ án khỏi danh sách, có thể xóa cùng lúc nhiều đồ án, sử
                dụng nút chọn và nút <b>Delete</b>. Lưu ý: đồ án đã có sinh viên
                đăng ký sẽ không thể xóa.
              </li>
              <li>
                Chỉnh sửa thông tin đồ án trong hệ thống, sử dụng nút{" "}
                <b>Edit</b> ở trong mỗi thẻ đồ án
              </li>
              <li>
                Cài đặt thời gian của mỗi đồ án bằng cách tick chọn đồ án thuộc
                vào cùng 1 học kỳ - năm học, sau đó chọn <b>Set time</b>, 1
                khung chọn sẽ hiện ra, và sử dụng thanh chọn để lựa chọn thời
                gian mong muốn, và nhấn <b>Save</b>
              </li>
              <li>
                Có thể lọc đồ án theo thời án bằng cách sử dụng thanh chọn thời
                gian kế bên nút <b>Set time</b>
              </li>
              <li>
                Xuất danh sách đồ án trong hệ thống theo thời gian, hoặc tất cả
                ra file excel, sử dụng nút <b>Export</b> ở trong mỗi thẻ đồ án
              </li>
              <li>
                Có thể lựa chọn xem đồ án của bản thân, hoặc tất cả trong hệ
                thống, bằng cách sử dụng nút <b>All project - My project</b> để
                chuyển đổi qua lại
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
                Có thể tìm kiếm thông báo mong muốn bằng cách sử dụng thanh{" "}
                <b>Search</b> để tìm kiếm nội dung thông báo mong muốn. Lưu ý:
                tìm kiếm thông báo theo tiêu đề
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
            <ul className="main-page-card-list list-disc">
              <li>
                Xem và quản lý điểm số của sinh viên có trong hệ thống, bằng
                cách vào tab <b>Score</b> trên thanh navigation
              </li>
              <li>
                Sử dụng nút <b>Export</b> để xuất danh sách điểm ra file Excel
              </li>
              <li>
                Có thể chấm - sửa điểm bằng cách nhấn vào thẻ score cần sửa, sử
                dụng thanh trượt bên dưới, hoặc nhập thẳng vào ô <b>input</b>,
                hoặc sử dụng nút mũi tên lên xuống để thay đổi điểm
              </li>
              <li>
                Đồng thời khi nhấn vào thẻ score, link nộp đồ án cũng sẽ được
                hiển thị, phụ thuộc vào sinh viên đã nộp hay chưa, để giảng viên
                có thể đưa ra 1 số điểm phù hợp
              </li>
              <li>
                Có thể sử dụng thanh <b>Search</b> để tìm kiếm điểm. Lưu ý: tìm
                theo tên đồ án
              </li>
            </ul>
          </div>
        </div>
        <div data-test="analysis-management-card" className="main-page-card">
          <div
            className="font-bold text-lg text-center text-blue-600"
            id="account"
          >
            4. QUẢN LÝ TÀI KHOẢN CÁ NHÂN
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
                cá nhân cùng ảnh đại diện, bên tay phải sẽ là thống kê về đồ án,
                cũng như thống kê về số lượng - điểm số trung bình, trung vị của
                sinh viên mỗi giảng viên đó
              </li>
              <li>
                Tại nội dung bên tay trái, giảng viên có thể nhấn chọn vào ảnh
                đại diện, hoặc vào nút "Edit profile" để chỉnh sửa thông tin tài
                khoản cá nhân, tại đây giảng viên có thể thay đổi ảnh đại diện,
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

export default TeacherHome;
