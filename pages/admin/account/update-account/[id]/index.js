import Meta from "@/components/header/Meta";
import { GetRoleInput } from "@/components/input/GetRoleInput";
import { InputField } from "@/components/input/InputField";
import CancelModal from "@/components/modals/CancelModal";
import {
  getAccountById,
  postCreateAccount,
  putUpdateAccount,
} from "@/services/accountServices";
import { postNewClass } from "@/services/classServices";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateAccount = ({ accountInfo }) => {
  const router = useRouter();
  const userInfo = accountInfo.User;
  const aaInfo = userInfo.AcademicAffair;
  const studentInfo = userInfo.Student;
  const teacherInfo = userInfo.Teacher;
  const roleDefaultValue = {
    value: accountInfo.role ?? "",
    aa: {
      code: aaInfo.academicAffairCode ?? "",
      faculty: aaInfo.faculty ?? "",
      id: aaInfo.id,
    },
    teacher: {
      code: teacherInfo.teacherCode ?? "",
      faculty: teacherInfo.faculty ?? "",
      academicDegree: teacherInfo.academicDegree ?? "",
      id: teacherInfo.id,
    },
    student: {
      code: studentInfo.studentCode ?? "",
      class: studentInfo.classID ?? null,
      major: studentInfo.major ?? "",
      id: studentInfo.id,
    },
  };
  console.log(roleDefaultValue);

  const [username, setUsername] = useState(accountInfo.username ?? "");
  const [password, setPassword] = useState(accountInfo.password ?? "");
  const [role, setRole] = useState(roleDefaultValue);
  const [email, setEmail] = useState(userInfo.email ?? "");
  const [name, setName] = useState(userInfo.name ?? "");
  const [dateOfBirth, setDateOfBirth] = useState(
    userInfo?.dateOfBirth?.slice(0, 10) ?? ""
  );
  const [phone, setPhone] = useState(userInfo.phone ?? "");

  async function updateAccount() {
    if (role.student.class === "#Custom") {
      let newClassData = await postNewClass(role.student.newClass);
      let tmp = role;
      tmp["student"]["class"] = newClassData.id;
      setRole({ ...tmp });
      console.log("creating>>", role);
    }

    let account = { username, password, id: accountInfo.id };
    let user = { email, name, dateOfBirth, phone, id: accountInfo.userID };
    let data = { account, user, role };
    console.log("updating...: ", data);
    let result = await putUpdateAccount(accountInfo.id, data);
    if (result.data.EC === 0) {
      toast.success(result.data.EM);
      router.push("/admin/account/view-account");
    } else {
      toast.error(result.data.EM);
    }
  }

  return (
    <>
      <Meta title="Update account" />
      <div className="h-full bg-slate-50 pt-3  flex justify-center ">
        <div className="w-max h-max bg-white px-6 py-2 rounded-xl shadow-md">
          <div className="text-blue-600 font-bold text-2xl ml-3 mb-2 text-left">
            Edit account
          </div>
          <div className="flex flex-row gap-2 h-fit w-[1000px]">
            <div className="flex flex-col gap-3 w-1/2">
              <fieldset className="bg-white shadow-sm border rounded-md px-3 py-2 flex flex-col gap-2  ">
                <legend className="mb-1 text-left text-blue-600 font-semibold">
                  Authentication information
                </legend>
                <InputField
                  title={"Username"}
                  content={username}
                  setContent={setUsername}
                />
                <InputField
                  title={"Password"}
                  content={password}
                  setContent={setPassword}
                  inputType="password"
                />
              </fieldset>

              <fieldset className="bg-white shadow-sm w-full border rounded-md px-3 py-2 flex flex-col gap-2 ">
                <legend className="mb-1 text-left text-blue-700 font-semibold">
                  User information
                </legend>
                <InputField
                  title={"Name"}
                  content={name}
                  setContent={setName}
                />
                <InputField
                  title={"Email"}
                  content={email}
                  setContent={setEmail}
                />
                <InputField
                  title={"Date of birth"}
                  content={dateOfBirth}
                  setContent={setDateOfBirth}
                  inputType="date"
                />
                <InputField
                  title={"Phone"}
                  content={phone}
                  setContent={setPhone}
                />
              </fieldset>
            </div>
            <fieldset className="bg-white shadow-sm border w-1/2 rounded-md px-3 py-2 flex flex-col gap-2 ">
              <legend className="mb-1 text-left text-blue-700 font-semibold">
                Role information
              </legend>
              <div className="flex flex-col">
                <label className="font-semibold">Role</label>
                <select
                  className="border border-slate-200 rounded px-2 py-1"
                  value={role.value}
                  onChange={(e) => {
                    setRole({ ...role, value: e.target.value });
                  }}
                >
                  <option value="">Not selected...</option>
                  <option value="aa">Academic Affair</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <GetRoleInput role={role} setRole={setRole} />
            </fieldset>
          </div>
          <div className="w-full flex gap-3 justify-end">
            <button
              className="items-center px-5 py-2.5 mt-4 text-base font-medium border-2 border-blue-700 text-center text-blue-700 bg-white  rounded-lg focus:ring-2 focus:ring-blue-200 hover:bg-blue-700 hover:text-white"
              onClick={() => {
                updateAccount();
              }}
            >
              Save
            </button>
            <CancelModal hrefConfirm="/admin/account/view-account" />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const data = await getAccountById(id);
  console.log("data from be: \n", data);
  return {
    props: {
      accountInfo: data,
    },
  };
}

export default UpdateAccount;
