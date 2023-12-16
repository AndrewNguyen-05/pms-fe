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

const UpdateAccountModal = ({ id, setNeedReload }) => {
  const router = useRouter();
  const [accountInfo, setAccountInfo] = useState({});

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState({
    value: "",
    aa: { code: "", faculty: "" },
    teacher: { code: "", faculty: "", academicDegree: "" },
    student: { code: "", class: "", major: "" },
  });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");

  const getData = async (id) => {
    const accountInfo = await getAccountById(id);
    setData(accountInfo);
    setAccountInfo(accountInfo);
  };

  const setData = async (accountInfo) => {
    const userInfo = accountInfo.User ?? {};
    const aaInfo = userInfo.AcademicAffair ?? {};
    const studentInfo = userInfo.Student ?? {};
    const teacherInfo = userInfo.Teacher ?? {};
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
    setUsername(accountInfo.username ?? "");
    setPassword(accountInfo.password ?? "");
    setRole(roleDefaultValue);
    setEmail(userInfo.email ?? "");
    setName(userInfo.name ?? "");
    setDateOfBirth(userInfo?.dateOfBirth?.slice(0, 10) ?? "");
    setPhone(userInfo.phone ?? "");
  };

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
      setNeedReload(true);
    } else {
      toast.error(result.data.EM);
    }
  }

  return (
    <div>
      <button
        className="text-blue-600 text-lg w-max font-semibold hover:underline mr-10"
        onClick={() => {
          getData(id);
          document.getElementById(`edit_modal_${id}`).showModal();
        }}
      >
        Edit
      </button>
      <dialog id={`edit_modal_${id}`} className="modal">
        <div className="modal-box max-w-5xl max-h-screen">
          <h2 className="text-2xl mb-6 mx-2 font-bold text-blue-600">
            Edit account
          </h2>
          <div className="flex justify-center ">
            <div className="flex flex-row gap-2 h-fit w-[1000px]">
              <div className="flex flex-col gap-3 w-1/2 mx-2">
                <fieldset className="bg-white shadow-sm border rounded-md px-3 py-2 flex flex-col gap-2 ">
                  <legend className="mb-1 text-left text-blue-600 font-bold">
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

                <fieldset className="bg-white border shadow-sm rounded-md px-3 py-2 flex flex-col gap-2 ">
                  <legend className="mb-1 text-left text-blue-600 font-bold">
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
              <fieldset className="bg-white border shadow-sm rounded-md w-1/2 px-3 py-2 flex flex-col gap-2">
                <legend className="mb-1 text-left text-blue-600 font-bold">
                  Role information
                </legend>
                <div className="flex flex-col">
                  <label className="text-left font-semibold">Role</label>
                  <select
                    className="border border-gray-200 rounded px-2 py-1"
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
          </div>
          <div className="modal-action flex gap-3">
            <button
              onClick={() => {
                updateAccount();
                document.getElementById(`edit_modal_${id}`).close();
              }}
              type="button"
              className="items-center px-5 py-2.5 mt-4 text-base font-medium border-2 border-blue-700 text-center text-blue-700 bg-white  rounded-lg focus:ring-2 focus:ring-blue-200 hover:bg-blue-700 hover:text-white"
            >
              Save
            </button>
            <button
              onClick={() => {
                document.getElementById(`edit_modal_${id}`).close();
              }}
              type="button"
              className="items-center px-5 py-2.5 mt-4 text-base font-medium border-2 border-red-600 text-center text-red-600 bg-white rounded-lg focus:ring-2 focus:ring-red-200 hover:bg-red-600 hover:text-white hover:border-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="hidden">close</button>
        </form>
      </dialog>
    </div>
  );
};

export default UpdateAccountModal;
