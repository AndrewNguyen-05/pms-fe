import ExcelJS from "exceljs";

const exportProjectList = (data, time) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("DanhSachDoAn");

  // Merge cells and set values
  worksheet.mergeCells("A1:B1");
  worksheet.getCell("A1").value = "TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN";
  worksheet.getCell("A1").font = { name: "Times New Roman", size: 13 };
  worksheet.getCell("A1").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheet.mergeCells("A2:B2");
  worksheet.getCell("A2").value = "PHÒNG ĐÀO TẠO ĐẠI HỌC";
  worksheet.getCell("A2").font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  worksheet.getCell("A2").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheet.mergeCells("E1:G1");
  worksheet.getCell("E1").value = "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM";
  worksheet.getCell("E1").font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  worksheet.getCell("E1").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheet.mergeCells("E2:G2");
  worksheet.getCell("E2").value = "Độc lập – Tự do – Hạnh phúc";
  worksheet.getCell("E2").font = {
    name: "Times New Roman",
    size: 13,
    bold: true,
  };
  worksheet.getCell("E2").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  // Add an empty row
  worksheet.addRow([]);

  // "DANH SÁCH ĐỒ ÁN" header
  worksheet.mergeCells("A4:G4");
  const danhSachDoAnRow = worksheet.getCell("A4");
  danhSachDoAnRow.value = "DANH SÁCH ĐỒ ÁN 1, 2";
  danhSachDoAnRow.font = {
    name: "Times New Roman",
    size: 16,
    bold: true,
  };
  danhSachDoAnRow.alignment = { horizontal: "center", vertical: "middle" };

  // Add another empty row
  worksheet.addRow([]);

  if (time) {
    // Add another empty row
    worksheet.addRow([]);
    // Add the semester

    const semesterCell = worksheet.getCell("B6");
    semesterCell.value = `${time.semester}`;
    semesterCell.font = {
      name: "Times New Roman",
      size: 13,
      bold: true,
    };
    semesterCell.alignment = { horizontal: "left", vertical: "middle" };

    // Add the year

    worksheet.mergeCells("A5:G5");
    const yearCell = worksheet.getCell("B5");
    yearCell.value = `NĂM HỌC ${time.year}`;
    yearCell.font = {
      name: "Times New Roman",
      size: 13,
      bold: true,
    };
    yearCell.alignment = { horizontal: "center", vertical: "middle" };
  }

  // Add the total number of projects
  const totalProject = worksheet.getCell(time ? "B7" : "B6");
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
    "Tên đồ án",
    "Khoa",
    "Loại đồ án",
    "Trạng thái",
    "GV hướng dẫn",
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

  // Add the data
  let rowNumber = 1;
  data.forEach((row) => {
    const dataRow = worksheet.addRow([
      rowNumber++,
      row.name,
      row.faculty,
      row.type,
      row.isregistered === 1 ? "Đã đăng ký" : "Chưa đăng ký",
      row.Teacher.User.name,
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
      if (colNumber === 1 || colNumber === 4) {
        cell.alignment = { vertical: "middle", horizontal: "center" };
      }
    });
  });

  // Set column widths
  worksheet.getColumn("A").width = 8; // Adjust these values as needed
  worksheet.getColumn("B").width = 80;
  worksheet.getColumn("C").width = 40;
  worksheet.getColumn("D").width = 12;
  worksheet.getColumn("E").width = 20;
  worksheet.getColumn("F").width = 25;

  // Save the workbook
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileName = "DanhSachDoAn.xlsx";
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  });
};

export default exportProjectList;
