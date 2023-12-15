import { GetRoleInput } from "@/components/input/GetRoleInput";
import { InputField } from "@/components/input/InputField";
import { postCreateAccount } from "@/services/accountServices";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateAccount = () => {
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

  async function createAccount() {
    let account = { username, password };
    let user = { email, name, dateOfBirth, phone };
    let data = { account, user, role };
    let result = await postCreateAccount(data);
    if (result.data.EC === 0) {
      toast.success(result.data.EM);
      router.push("/admin/account/view-account");
    } else {
      toast.error(result.data.EM);
    }
  }

  return (
    <div className="min-h-screen h-max bg-slate-50 py-8 flex justify-center ">
      <div className="w-max h-max bg-white px-9 py-6 rounded-xl shadow-md">
        <div className="text-blue-600 font-bold text-2xl ml-3 mb-3 text-center">
          Add new account
        </div>
        <div className="flex flex-row gap-2 h-fit w-[1000px]">
          <div className="flex flex-col gap-3 w-1/2">
            <div className="bg-white shadow-md rounded-xl px-10 py-5 flex flex-col gap-2 ">
              <div className="mb-1 text-center text-blue-600 font-semibold">
                Authentication information
              </div>
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
            </div>

            <div className="bg-white shadow-md rounded-xl px-10 py-5 flex flex-col gap-2 ">
              <div className="mb-1 text-center text-blue-700 font-semibold">
                User information
              </div>
              <InputField title={"Name"} content={name} setContent={setName} />
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
            </div>
          </div>
          <div className="bg-white shadow-md rounded-xl w-1/2  px-10 py-5 flex flex-col gap-2">
            <div className="mb-1 text-center text-blue-700 font-semibold">
              Role information
            </div>
            <div className="flex flex-col">
              <label>Role</label>
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
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            className="bg-blue-700 shadow-md text-white rounded-xl w-full max-w-[150px] h-max p-3 mt-6"
            onClick={() => {
              createAccount();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
