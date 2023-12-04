import ExcelJS from "exceljs";

const exportAnalysis = (
  numberOfPjAndSt,
  projectStatus,
  averageScore,
  mostRegisteredTeacher,
  teacherWithMostProject,
  teacherWithMostStudent,
  highestAverageScore
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheetProjectAndStudent = workbook.addWorksheet(
    "SoLuongDoAnVaSinhVien"
  );
  const worksheetProjectStatus = workbook.addWorksheet("TrangThaiDoAn");
  const worksheetAverageScore = workbook.addWorksheet(
    "DiemTrungBinhCuaGiangVien"
  );
  //--------------------------------------------------------------------------------
  //Number of Project and Student
  // Merge cells and set values
  worksheetProjectAndStudent.mergeCells("B1:C1");
  worksheetProjectAndStudent.getCell("B1").value =
    "TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN";
  worksheetProjectAndStudent.getCell("B1").font = {
    name: "Times New Roman",
    size: 13,
  };
  worksheetProjectAndStudent.getCell("B1").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheetProjectAndStudent.mergeCells("B2:C2");
  worksheetProjectAndStudent.getCell("B2").value = "PHÒNG ĐÀO TẠO ĐẠI HỌC";
  worksheetProjectAndStudent.getCell("B2").font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  worksheetProjectAndStudent.getCell("B2").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheetProjectAndStudent.mergeCells("E1:G1");
  worksheetProjectAndStudent.getCell("E1").value =
    "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM";
  worksheetProjectAndStudent.getCell("E1").font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  worksheetProjectAndStudent.getCell("E1").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheetProjectAndStudent.mergeCells("E2:G2");
  worksheetProjectAndStudent.getCell("E2").value =
    "Độc lập – Tự do – Hạnh phúc";
  worksheetProjectAndStudent.getCell("E2").font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  worksheetProjectAndStudent.getCell("E2").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  // Add an empty row
  worksheetProjectAndStudent.addRow([]);

  // "THỐNG KÊ SỐ LƯỢNG ĐỒ ÁN VÀ SINH VIÊN CỦA TỪNG GIẢNG VIÊN" header
  worksheetProjectAndStudent.mergeCells("A4:G4");
  const danhSachDoAnRow = worksheetProjectAndStudent.getCell("A4");
  danhSachDoAnRow.value =
    "THỐNG KÊ SỐ LƯỢNG ĐỒ ÁN VÀ SINH VIÊN CỦA TỪNG GIẢNG VIÊN";
  danhSachDoAnRow.font = {
    name: "Times New Roman",
    size: 16,
    bold: true,
  };
  danhSachDoAnRow.alignment = { horizontal: "center", vertical: "middle" };

  // Add another empty row
  worksheetProjectAndStudent.addRow([]);

  // Add the total number of teachers
  const totalTeacher_1 = worksheetProjectAndStudent.getCell("B6");
  totalTeacher_1.value = `Tổng số giảng viên: ${numberOfPjAndSt.length}`;
  totalTeacher_1.font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  totalTeacher_1.alignment = { horizontal: "left", vertical: "middle" };

  // Teacher with most project
  const mostPjTeacher = worksheetProjectAndStudent.getCell("B7");
  mostPjTeacher.value = `Giảng viên có nhiều đồ án nhất: ${teacherWithMostProject["Teacher.User.name"]}`;
  mostPjTeacher.font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  mostPjTeacher.alignment = { horizontal: "left", vertical: "middle" };

  const mostPjNumberTeacher = worksheetProjectAndStudent.getCell("D7");
  mostPjNumberTeacher.value = `Số lượng đồ án: ${teacherWithMostProject.projectCount}`;
  mostPjNumberTeacher.font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  mostPjNumberTeacher.alignment = { horizontal: "left", vertical: "middle" };

  // Teacher with most student
  const mostStTeacher = worksheetProjectAndStudent.getCell("B8");
  mostStTeacher.value = `Giảng viên có nhiều sinh viên nhất: ${teacherWithMostStudent["Teacher.User.name"]}`;
  mostStTeacher.font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  mostStTeacher.alignment = { horizontal: "left", vertical: "middle" };

  const mostStNumberTeacher = worksheetProjectAndStudent.getCell("D8");
  mostStNumberTeacher.value = `Số lượng sinh viên: ${teacherWithMostStudent.Student}`;
  mostStNumberTeacher.font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  mostStNumberTeacher.alignment = { horizontal: "left", vertical: "middle" };

  // Add another empty row
  worksheetProjectAndStudent.addRow([]);

  // Add the table headers
  const headers = [
    "STT",
    "GV hướng dẫn",
    "Khoa",
    "Email",
    "Số lượng đồ án",
    "Số lượng sinh viên đăng ký",
  ];
  const headerRow = worksheetProjectAndStudent.addRow(headers);
  headerRow.eachCell((cell) => {
    cell.font = {
      name: "Times New Roman",
      size: 13,
      bold: true,
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFBAE6FD" },
    };
    cell.border = {
      top: { style: "thin", color: { auto: 1 } },
      left: { style: "thin", color: { auto: 1 } },
      bottom: { style: "thin", color: { auto: 1 } },
      right: { style: "thin", color: { auto: 1 } },
    };
    cell.alignment = { vertical: "middle", horizontal: "center" };
  });
  headerRow.getCell(5).font.color = { argb: "FFFF0000" };
  headerRow.getCell(6).font.color = { argb: "FFFF0000" };

  // Add the data
  let rowNumber = 1;
  numberOfPjAndSt.forEach((row) => {
    const dataRow = worksheetProjectAndStudent.addRow([
      rowNumber++,
      row["Teacher.User.name"],
      row["Teacher.faculty"],
      row["Teacher.User.email"],
      row.Project,
      row.Student,
    ]);
    dataRow.eachCell((cell, colNumber) => {
      cell.font = { name: "Times New Roman", size: 12 };
      cell.border = {
        top: { style: "thin", color: { auto: 1 } },
        left: { style: "thin", color: { auto: 1 } },
        bottom: { style: "thin", color: { auto: 1 } },
        right: { style: "thin", color: { auto: 1 } },
      };
      // Align content to the middle for specific columns
      if (colNumber === 1 || colNumber === 6 || colNumber === 5) {
        cell.alignment = { vertical: "middle", horizontal: "center" };
      }
      if (colNumber === 6 || colNumber === 5) {
        cell.font = { name: "Times New Roman", size: 12, bold: true };
      }
    });
  });

  // Set column widths
  worksheetProjectAndStudent.getColumn("A").width = 8; // Adjust these values as needed - STT
  worksheetProjectAndStudent.getColumn("B").width = 25; // Giang vien
  worksheetProjectAndStudent.getColumn("C").width = 40; // Khoa
  worksheetProjectAndStudent.getColumn("D").width = 45; // Email
  worksheetProjectAndStudent.getColumn("E").width = 20; // Sl do an
  worksheetProjectAndStudent.getColumn("F").width = 28; // Sl sinh vien

  //--------------------------------------------------------------------------------
  //Project status
  // Merge cells and set values
  worksheetProjectStatus.mergeCells("B1:C1");
  worksheetProjectStatus.getCell("B1").value =
    "TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN";
  worksheetProjectStatus.getCell("B1").font = {
    name: "Times New Roman",
    size: 13,
  };
  worksheetProjectStatus.getCell("B1").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheetProjectStatus.mergeCells("B2:C2");
  worksheetProjectStatus.getCell("B2").value = "PHÒNG ĐÀO TẠO ĐẠI HỌC";
  worksheetProjectStatus.getCell("B2").font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  worksheetProjectStatus.getCell("B2").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheetProjectStatus.mergeCells("E1:G1");
  worksheetProjectStatus.getCell("E1").value =
    "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM";
  worksheetProjectStatus.getCell("E1").font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  worksheetProjectStatus.getCell("E1").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheetProjectStatus.mergeCells("E2:G2");
  worksheetProjectStatus.getCell("E2").value = "Độc lập – Tự do – Hạnh phúc";
  worksheetProjectStatus.getCell("E2").font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  worksheetProjectStatus.getCell("E2").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  // Add an empty row
  worksheetProjectStatus.addRow([]);

  // "BẢNG ĐIỂM ĐỒ ÁN" header
  worksheetProjectStatus.mergeCells("A4:H4");
  const trangThaiDoAnRow = worksheetProjectStatus.getCell("A4");
  trangThaiDoAnRow.value =
    "THỐNG KÊ SỐ LƯỢNG ĐỒ ÁN ĐÃ ĐƯỢC ĐĂNG KÝ VÀ CHƯA ĐƯỢC ĐĂNG KÝ CỦA TỪNG GIẢNG VIÊN";
  trangThaiDoAnRow.font = {
    name: "Times New Roman",
    size: 16,
    bold: true,
  };
  trangThaiDoAnRow.alignment = { horizontal: "center", vertical: "middle" };

  // Add another empty row
  worksheetProjectStatus.addRow([]);

  // Add the total number of projects
  const totalTeacher_2 = worksheetProjectStatus.getCell("B6");
  totalTeacher_2.value = `Tổng số giảng viên: ${projectStatus.length}`;
  totalTeacher_2.font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  totalTeacher_2.alignment = { horizontal: "left", vertical: "middle" };

  // Add the most registered teacher
  const registeredTeacher = worksheetProjectStatus.getCell("B6");
  registeredTeacher.value = `Giảng viên có SL đồ án được đăng ký nhiều nhất: ${mostRegisteredTeacher["Teacher.User.name"]}`;
  registeredTeacher.font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  registeredTeacher.alignment = { horizontal: "left", vertical: "middle" };

  const registeredNumberTeacher = worksheetProjectStatus.getCell("E6");
  registeredNumberTeacher.value = `Số lượng đồ án được đăng ký: ${mostRegisteredTeacher.Registered}`;
  registeredNumberTeacher.font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  registeredNumberTeacher.alignment = {
    horizontal: "left",
    vertical: "middle",
  };

  // Add another empty row
  worksheetProjectStatus.addRow([]);

  // Add the table headers
  const headersStatus = [
    "STT",
    "GV hướng dẫn",
    "Khoa",
    "Email",
    "SL đồ án đã được đăng ký",
    "SL đồ án chưa được đăng ký",
  ];
  const headersRowStatus = worksheetProjectStatus.addRow(headersStatus);
  headersRowStatus.eachCell((cell) => {
    cell.font = {
      name: "Times New Roman",
      size: 13,
      bold: true,
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFBAE6FD" },
    };
    cell.border = {
      top: { style: "thin", color: { auto: 1 } },
      left: { style: "thin", color: { auto: 1 } },
      bottom: { style: "thin", color: { auto: 1 } },
      right: { style: "thin", color: { auto: 1 } },
    };
    cell.alignment = { vertical: "middle", horizontal: "center" };
  });
  headersRowStatus.getCell(5).font.color = { argb: "FFFF0000" };
  headersRowStatus.getCell(6).font.color = { argb: "FFFF0000" };

  // Add the data
  let rowNumber_2 = 1;
  projectStatus.forEach((row) => {
    const dataRow = worksheetProjectStatus.addRow([
      rowNumber_2++,
      row["Teacher.User.name"],
      row["Teacher.faculty"],
      row["Teacher.User.email"],
      row.Registered,
      row.Unregistered,
    ]);
    dataRow.eachCell((cell, colNumber) => {
      cell.font = { name: "Times New Roman", size: 12 };
      cell.border = {
        top: { style: "thin", color: { auto: 1 } },
        left: { style: "thin", color: { auto: 1 } },
        bottom: { style: "thin", color: { auto: 1 } },
        right: { style: "thin", color: { auto: 1 } },
      };
      // Align content to the middle for specific columns
      if (colNumber === 1 || colNumber === 6 || colNumber === 5) {
        cell.alignment = { vertical: "middle", horizontal: "center" };
      }
      if (colNumber === 6 || colNumber === 5) {
        cell.font = { name: "Times New Roman", size: 12, bold: true };
      }
    });
  });

  // Set column widths
  worksheetProjectStatus.getColumn("A").width = 8; // Adjust these values as needed - STT
  worksheetProjectStatus.getColumn("B").width = 25; // Giang vien
  worksheetProjectStatus.getColumn("C").width = 40; // Khoa
  worksheetProjectStatus.getColumn("D").width = 45; // Email
  worksheetProjectStatus.getColumn("E").width = 30; // Sl do an da dky
  worksheetProjectStatus.getColumn("F").width = 30; // Sl do an chua dky

  //--------------------------------------------------------------------------------

  //Average score
  // Merge cells and set values
  worksheetAverageScore.mergeCells("B1:C1");
  worksheetAverageScore.getCell("B1").value =
    "TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN";
  worksheetAverageScore.getCell("B1").font = {
    name: "Times New Roman",
    size: 13,
  };
  worksheetAverageScore.getCell("B1").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheetAverageScore.mergeCells("B2:C2");
  worksheetAverageScore.getCell("B2").value = "PHÒNG ĐÀO TẠO ĐẠI HỌC";
  worksheetAverageScore.getCell("B2").font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  worksheetAverageScore.getCell("B2").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheetAverageScore.mergeCells("E1:H1");
  worksheetAverageScore.getCell("E1").value =
    "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM";
  worksheetAverageScore.getCell("E1").font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  worksheetAverageScore.getCell("E1").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheetAverageScore.mergeCells("E2:H2");
  worksheetAverageScore.getCell("E2").value = "Độc lập – Tự do – Hạnh phúc";
  worksheetAverageScore.getCell("E2").font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  worksheetAverageScore.getCell("E2").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  // Add an empty row
  worksheetAverageScore.addRow([]);

  // "THỐNG KÊ ĐIỂM SỐ TRUNG BÌNH CỦA SINH VIÊN TỪNG GIẢNG VIÊN" header
  worksheetAverageScore.mergeCells("A4:F4");
  const averageScoreRow = worksheetAverageScore.getCell("A4");
  averageScoreRow.value =
    "THỐNG KÊ ĐIỂM SỐ TRUNG BÌNH CỦA SINH VIÊN TỪNG GIẢNG VIÊN";
  averageScoreRow.font = {
    name: "Times New Roman",
    size: 16,
    bold: true,
  };
  averageScoreRow.alignment = { horizontal: "center", vertical: "middle" };

  // Add another empty row
  worksheetAverageScore.addRow([]);

  // Add the total number of projects
  const totalTeacher_3 = worksheetAverageScore.getCell("B6");
  totalTeacher_3.value = `Tổng số giảng viên: ${averageScore.length}`;
  totalTeacher_3.font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  totalTeacher_2.alignment = { horizontal: "left", vertical: "middle" };

  // Add the most registered teacher
  const highestAverageTeacher = worksheetAverageScore.getCell("B6");
  highestAverageTeacher.value = `Giảng viên có điểm trung bình sinh viên cao nhất: ${highestAverageScore.teacherName}`;
  highestAverageTeacher.font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  highestAverageTeacher.alignment = { horizontal: "left", vertical: "middle" };

  const highestAverageScoreTeacher = worksheetAverageScore.getCell("E6");
  highestAverageScoreTeacher.value = `Điểm trung bình: ${highestAverageScore.averageScore}`;
  highestAverageScoreTeacher.font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  highestAverageScoreTeacher.alignment = {
    horizontal: "left",
    vertical: "middle",
  };

  // Add another empty row
  worksheetAverageScore.addRow([]);

  // Add the table headers
  const headersScore = [
    "STT",
    "GV hướng dẫn",
    "Khoa",
    "Email",
    "Điểm số trung bình",
  ];
  const headersRowScore = worksheetAverageScore.addRow(headersScore);
  headersRowScore.eachCell((cell) => {
    cell.font = {
      name: "Times New Roman",
      size: 13,
      bold: true,
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFBAE6FD" },
    };
    cell.border = {
      top: { style: "thin", color: { auto: 1 } },
      left: { style: "thin", color: { auto: 1 } },
      bottom: { style: "thin", color: { auto: 1 } },
      right: { style: "thin", color: { auto: 1 } },
    };
    cell.alignment = { vertical: "middle", horizontal: "center" };
  });
  headersRowScore.getCell(5).font.color = { argb: "FFFF0000" };

  // Add the data
  let rowNumber_3 = 1;
  averageScore.forEach((row) => {
    const dataRow = worksheetAverageScore.addRow([
      rowNumber_3++,
      row["Teacher's name"],
      row["Project.Teacher.faculty"],
      row["Project.Teacher.User.email"],
      row["Average score"],
    ]);
    dataRow.eachCell((cell, colNumber) => {
      cell.font = { name: "Times New Roman", size: 12 };
      cell.border = {
        top: { style: "thin", color: { auto: 1 } },
        left: { style: "thin", color: { auto: 1 } },
        bottom: { style: "thin", color: { auto: 1 } },
        right: { style: "thin", color: { auto: 1 } },
      };
      // Align content to the middle for specific columns
      if (colNumber === 1 || colNumber === 5) {
        cell.alignment = { vertical: "middle", horizontal: "center" };
      }
      if (colNumber === 5) {
        cell.font = { name: "Times New Roman", size: 12, bold: true };
      }
    });
  });

  // Set column widths
  worksheetAverageScore.getColumn("A").width = 8; // Adjust these values as needed - STT
  worksheetAverageScore.getColumn("B").width = 25; // Giang vien
  worksheetAverageScore.getColumn("C").width = 40; // Khoa
  worksheetAverageScore.getColumn("D").width = 45; // Email
  worksheetAverageScore.getColumn("E").width = 28; // Diem so trung binh

  //--------------------------------------------------------------------------------

  // Save the workbook
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileName = "ThongKeDoAn1_2.xlsx";
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  });
};

export default exportAnalysis;
