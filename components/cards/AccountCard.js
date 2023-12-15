import React from "react";

const AccountCard = ({
  account,
  editOnClick,
  selectedItem,
  setSelectedItem,
}) => {
  const onItemSelect = (account, isSelected) => {
    if (isSelected) {
      setSelectedItem((prev) => [...prev, account]);
    } else {
      setSelectedItem((prev) => prev.filter((p) => p.id !== account.id));
    }
  };

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
    let tmp = "rounded-full px-3 text-white";
    switch (role) {
      case "aa":
        return tmp + " bg-amber-600";
      case "teacher":
        return tmp + " bg-emerald-500";
      case "student":
        return tmp + " bg-blue-500";
      case "admin":
        return tmp + " bg-red-500";
    }
    return tmp;
  };

  const getRoleText = (role) => {
    let tmp = "flex flex-col";
    switch (role) {
      case "aa":
        return tmp + " text-amber-700";
      case "teacher":
        return tmp + " text-emerald-600";
      case "student":
        return tmp + " text-blue-600";
      case "admin":
        return tmp + " text-red-600";
    }
    return tmp;
  };

  const getInfo = (accountInfo) => {
    switch (accountInfo.role) {
      case "aa":
        return (
          <>
            <div className="font-semibold">{accountInfo.aa?.aaCode}</div>
            <div className="text-black">{accountInfo.aa?.faculty}</div>
          </>
        );
      case "teacher":
        return (
          <>
            <div className="font-semibold">
              {accountInfo.teacher?.teacherCode}
            </div>
            <div className="text-black">{accountInfo.teacher?.faculty}</div>
          </>
        );
      case "student":
        return (
          <>
            <div className="font-semibold">
              {accountInfo.student?.studentCode}
            </div>
            <div className="text-black">{accountInfo.student?.major}</div>
          </>
        );
      case "admin":
        return <></>;
    }
  };
  return (
    <>
      <div className="bg-white rounded-lg shadow-md px-3 py-1 grid grid-cols-12 gap-1">
        <div className="flex content-center justify-center w-16 col-span-1">
          <input
            type="checkbox"
            className="w-4 h-4 m-auto"
            checked={selectedItem.some((item) => item.id === account.id)}
            onChange={(event) => onItemSelect(account, event.target.checked)}
          />
        </div>
        <div className="flex flex-col gap-2 w-1/3 col-span-4">
          <div className="flex items-center w-full">
            <div className="flex flex-col gap-1">
              <div className={`font-bold w-max ${getRoleText(account.role)}`}>
                {account.name}
              </div>
              <div className={` w-max`}>{account.username}</div>
              <div className={`${getRoleBox(account.role)} w-fit mt-1`}>
                {convertToFullRole(account.role)}
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex flex-col gap-1 justify-center col-span-3">
          <div className={`font-semibold`}>{account.email}</div>
          <div>{account.phone}</div>
        </div>
        <div
          className={`${getRoleText(
            account.role
          )} col-span-3 flex justify-center`}
        >
          {getInfo(account)}
        </div>
        <div className="col-span-1 flex items-center">
          <button
            className="text-blue-600 text-lg w-max font-semibold hover:underline mr-10 "
            onClick={editOnClick}
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountCard;
