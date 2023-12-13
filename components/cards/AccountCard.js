import React from "react";

const AccountCard = ({ account }) => {
  // card data functionality
  const convertToFullRole = (role) => {
    switch (role) {
      case "aa":
        return "Academic Affair";
      case "teacher":
        return "Teacher";
      case "student":
        return "Student";
      case "admin":
        return "Admin";
    }
  };

  const getRoleBox = (role) => {
    let tmp = "rounded-full w-fit px-3 text-white";
    switch (role) {
      case "aa":
        return tmp + " bg-violet-400";
      case "teacher":
        return tmp + " bg-green-400";
      case "student":
        return tmp + " bg-blue-400";
      case "admin":
        return tmp + " bg-red-400";
    }
    return tmp;
  };

  const getRoleText = (role) => {
    let tmp = "flex flex-col w-1/3 font-semibold";
    switch (role) {
      case "aa":
        return tmp + " text-violet-800";
      case "teacher":
        return tmp + " text-green-800";
      case "student":
        return tmp + " text-blue-800";
      case "admin":
        return tmp + " text-red-800";
    }
    return tmp;
  };

  const getInfo = (accountInfo) => {
    switch (accountInfo.role) {
      case "aa":
        return (
          <>
            <div>{accountInfo.aa.aaCode}</div>
            <div>{accountInfo.aa.faculty}</div>
          </>
        );
      case "teacher":
        return (
          <>
            <div>{accountInfo.teacher.teacherCode}</div>
            <div>{accountInfo.teacher.faculty}</div>
          </>
        );
      case "student":
        return (
          <>
            <div>{accountInfo.student.studentCode}</div>
            <div>{accountInfo.student.major}</div>
          </>
        );
      case "admin":
        return <></>;
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md px-4 py-5 flex flex-row gap-2">
      <div className="flex content-center justify-center w-16">
        <input type="checkbox" className="w-4 h-4 m-auto" />
      </div>
      <div className="flex flex-col gap-2 w-1/3">
        <div className="flex flex-col ">
          <div className="font-bold text-blue-700">{account.name}</div>
          <div className="text-blue-700">{account.username}</div>
        </div>
        <div>
          <div className={getRoleBox(account.role)}>
            {convertToFullRole(account.role)}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/3 ">
        <div className="font-semibold">{account.email}</div>
        <div>{account.phone}</div>
      </div>
      <div className={getRoleText(account.role)}>{getInfo(account)}</div>
    </div>
  );
};

export default AccountCard;
