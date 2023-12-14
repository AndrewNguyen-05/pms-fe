import SearchBar from "@/components/SearchBar";
import ButtonCreate from "@/components/buttons/ButtonCreate";
import DeleteModal from "@/components/modals/DeleteModal";
import AccountCard from "@/components/cards/AccountCard";
import Footer from "@/components/footer/Footer";
import {
  deleteAccount,
  getAccountList,
  searchAccount,
} from "@/services/accountServices";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ViewAccount = () => {
  const [accountList, setAccountList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [pageSearchValue, setPageSearchValue] = useState("");

  //list of project that is selected
  const [selectedAccount, setSelectedAccount] = useState([]);

  useEffect(() => {
    getAccountInfo();
    setCurrentOffset((currentPage - 1) * currentLimit + 1);
  }, [currentPage, pageSearchValue]);

  const setAccountListRaw = (accountData) => {
    setAccountList(
      accountData.account.map((row) => {
        return {
          id: row.id,
          username: row.username,
          role: row.role,
          name: row.User.name,
          email: row.User.email,
          phone: row.User.phone,
          student: row.User.Student.studentCode
            ? {
                studentCode: row.User.Student.studentCode,
                major: row.User.Student.major,
              }
            : null,
          teacher: row.User.Teacher.teacherCode
            ? {
                teacherCode: row.User.Teacher.teacherCode,
                faculty: row.User.Teacher.faculty,
              }
            : null,
          aa: row.User.AcademicAffair
            ? {
                aaCode: row.User.AcademicAffair.academicAffairCode,
                faculty: row.User.AcademicAffair.faculty,
              }
            : null,
        };
      })
    );
  };

  const getAccountInfo = async () => {
    let accountData;
    if (!pageSearchValue) {
      accountData = await getAccountList(currentPage, currentLimit);
    } else {
      accountData = await searchAccount(
        currentPage,
        currentLimit,
        pageSearchValue.toLowerCase()
      );
    }
    console.log(accountData);
    setAccountListRaw(accountData);
    setTotalPage(accountData.totalPage);
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleConfirmDelete = async () => {
    const accountIds = selectedAccount.map((account) => account.id);
    let response = await deleteAccount(accountIds);
    setSelectedAccount([]);
    if (response && response.data && response.data.EC === 0) {
      toast.success(response.data.EM);
      getAccountInfo();
    } else {
      toast.error(response.data.EM);
      getAccountInfo();
    }
  };

  // search event
  const handleSearch = async (searchValue) => {
    setCurrentPage(1);
    setPageSearchValue(searchValue);
  };

  return (
    <div className="bg-slate-50 min-h-full h-screen pt-6 px-20 ">
      <div className="flex items-center mb-6">
        <div className="">
          <SearchBar
            placeholder="Search Account..."
            handleSearch={handleSearch}
            handleKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch(event.target.value);
              }
            }}
          />
        </div>
        <div className="flex justify-end gap-4 w-full">
          <ButtonCreate text="Add new" href="/admin/account/create-account" />
          <DeleteModal
            item="account"
            selectedItem={selectedAccount}
            handleConfirmDelete={handleConfirmDelete}
          />
        </div>
      </div>
      <div className="flex flex-col h-full">
        <div className="flex flex-col gap-5">
          {accountList.map((account) => (
            <AccountCard
              account={account}
              key={account.id}
              selectedItem={selectedAccount}
              setSelectedItem={setSelectedAccount}
            />
          ))}
        </div>
        <div className="px-5 py-8 h-full flex flex-row-reverse">
          <div className="self-end">
            {totalPage > 0 && (
              <Footer totalPage={totalPage} handlePageClick={handlePageClick} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAccount;
