import { GetRoleInput } from "@/components/input/GetRoleInput";
import { InputField } from "@/components/input/InputField";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { postCreateAccount } from "@/services/accountServices";
import { toast } from "react-toastify";
import { postNewClass } from "@/services/classServices";

const AddAccountModal = () => {
  const router = useRouter();
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

  const clearInformation = () => {
    setUsername("");
    setPassword("");
    setRole({
      value: "",
      aa: { code: "", faculty: "" },
      teacher: { code: "", faculty: "", academicDegree: "" },
      student: { code: "", class: null, newClass: null, major: "" },
    });
    setEmail("");
    setName("");
    setDateOfBirth("");
    setPhone("");
  };

  const createAccount = async () => {
    if (role.student.class === "#Custom") {
      let newClassData = await postNewClass(role.student.newClass);
      let tmp = role;
      tmp["student"]["class"] = newClassData.id;
      setRole({ ...tmp });
    }

    console.log("creating>>", role);

    let account = { username, password };
    let user = { email, name, dateOfBirth, phone };
    let data = { account, user, role };

    let result = await postCreateAccount(data);

    if (result.data.EC === 0) {
      toast.success(result.data.EM);
      //window.location.reload();
    } else {
      toast.error(result.data.EM);
    }
  };

  return (
    <div>
      <button
        className="btn-blue "
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add account
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box max-w-5xl max-h-screen">
          <h2 className="text-2xl mb-6 mx-2 font-bold text-blue-600">
            Add new account
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
                createAccount();
                clearInformation();
                document.getElementById("my_modal_2").close();
              }}
              type="button"
              className="items-center px-5 py-2.5 mt-4 text-base font-medium border-2 border-blue-700 text-center text-blue-700 bg-white  rounded-lg focus:ring-2 focus:ring-blue-200 hover:bg-blue-700 hover:text-white"
            >
              Save
            </button>
            <button
              onClick={() => {
                clearInformation();
                document.getElementById("my_modal_2").close();
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

export default AddAccountModal;
