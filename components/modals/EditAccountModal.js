import { GetRoleInput } from "@/components/input/GetRoleInput";
import { InputField } from "@/components/input/InputField";
import {
  getAccountById,
  postCreateAccount,
  putUpdateAccount,
} from "@/services/accountServices";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateAccountModal = ({ accountInfo }) => {
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
      class: studentInfo.class ?? "",
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
    <div>
      <button
        className="text-blue-600 text-lg w-max font-semibold hover:underline mr-10"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Edit
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box max-w-5xl max-h-screen">
          <h2 className="text-2xl mb-6 mx-2 font-bold text-blue-600">
            Edit account
          </h2>
          <div className="flex justify-center ">
            <div className="flex flex-row gap-2 h-fit w-[1000px]">
              <div className="flex flex-col gap-3 w-1/2 mx-2">
                <fieldset className="bg-white shadow-sm border rounded-md px-3 py-2 flex flex-col gap-2 ">
                  <legend className="mb-1 text-left text-blue-500 font-bold">
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
                  <legend className="mb-1 text-left text-blue-500 font-bold">
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
                <legend className="mb-1 text-left text-blue-500 font-bold">
                  Role information
                </legend>
                <div className="flex flex-col">
                  <label className="text-left">Role</label>
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
          <div className="modal-action">
            <button
              onClick={() => {
                createAccount();
                document.getElementById("my_modal_2").close();
              }}
              type="button"
              className="btn-blue"
            >
              Save
            </button>
            <button
              onClick={() => {
                clearInformation();
                document.getElementById("my_modal_2").close();
              }}
              type="button"
              className="btn-red"
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

export default UpdateAccountModal;
