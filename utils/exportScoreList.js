import React from "react";
import ExcelJS from "exceljs";

const exportScoreList = (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("BangDiemDoAn");

  // Merge cells and set values
  worksheet.mergeCells("B1:D1");
  worksheet.getCell("B1").value = "TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN";
  worksheet.getCell("B1").font = { name: "Times New Roman", size: 13 };
  worksheet.getCell("B1").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheet.mergeCells("B2:D2");
  worksheet.getCell("B2").value = "PHÒNG ĐÀO TẠO ĐẠI HỌC";
  worksheet.getCell("B2").font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  worksheet.getCell("B2").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheet.mergeCells("H1:J1");
  worksheet.getCell("H1").value = "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM";
  worksheet.getCell("H1").font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  worksheet.getCell("H1").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheet.mergeCells("H2:J2");
  worksheet.getCell("H2").value = "Độc lập – Tự do – Hạnh phúc";
  worksheet.getCell("H2").font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  worksheet.getCell("H2").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  // Add an empty row
  worksheet.addRow([]);

  // "BẢNG ĐIỂM ĐỒ ÁN" header
  worksheet.mergeCells("A4:J4");
  const danhSachDoAnRow = worksheet.getCell("A4");
  danhSachDoAnRow.value = "BẢNG ĐIỂM ĐỒ ÁN 1, 2";
  danhSachDoAnRow.font = {
    name: "Times New Roman",
    size: 16,
    bold: true,
  };
  danhSachDoAnRow.alignment = { horizontal: "center", vertical: "middle" };

  // Add another empty row
  worksheet.addRow([]);

  // Add the total number of projects
  const totalProject = worksheet.getCell("B6");
  totalProject.value = `Tổng số đề tài: ${data.length}`;
  totalProject.font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  totalProject.alignment = { horizontal: "left", vertical: "middle" };

  // Add another empty row
  worksheet.addRow([]);

  // Add the table headers
  const headers = [
    "STT",
    "Họ tên sinh viên 1",
    "Mã sinh viên 1",
    "Họ tên sinh viên 2",
    "Mã sinh viên 2",
    "Điểm số",
    "GV hướng dẫn",
    "Tên đồ án",
    "Khoa",
    "Loại đồ án",
  ];
  const headerRow = worksheet.addRow(headers);
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
  headerRow.getCell(6).font.color = { argb: "FFFF0000" };

  // Add the data
  let rowNumber = 1;
  data.forEach((row) => {
    const dataRow = worksheet.addRow([
      rowNumber++,
      row.Student1.User.name === null ? "" : row.Student1.User.name,
      row.Student1.studentCode === null ? "" : row.Student1.studentCode,
      row.Student2.User.name === null ? "" : row.Student2.User.name,
      row.Student2.studentCode === null ? "" : row.Student2.studentCode,
      row.score,
      row.Project.Teacher.User.name,
      row.Project.name,
      row.Project.faculty,
      row.Project.type,
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
      if (colNumber === 1 || colNumber === 6 || colNumber === 10) {
        cell.alignment = { vertical: "middle", horizontal: "center" };
      }
      if (colNumber === 6) {
        cell.font = { name: "Times New Roman", size: 12, bold: true };
      }
    });
  });

  // Set column widths
  worksheet.getColumn("A").width = 8; // Adjust these values as needed - STT
  worksheet.getColumn("B").width = 25; // Ten sinh vien 1
  worksheet.getColumn("C").width = 20; // Ma svien 1
  worksheet.getColumn("D").width = 25; // Ten svien 2
  worksheet.getColumn("E").width = 20; // Ma svien 2
  worksheet.getColumn("F").width = 12; // Diem so
  worksheet.getColumn("G").width = 25; // Giang vien
  worksheet.getColumn("H").width = 60; // Ten do an
  worksheet.getColumn("I").width = 40; // Khoa
  worksheet.getColumn("J").width = 12; // Loai do an

  // Save the workbook
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileName = "BangDiemDoAn.xlsx";
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  });
};

export default exportScoreList;
