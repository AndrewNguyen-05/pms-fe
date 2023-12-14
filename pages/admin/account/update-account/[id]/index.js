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
    <div className="h-screen bg-slate-50 px-20 py-8">
      <div className="text-blue-700 font-bold text-lg ml-3 mb-3">
        Edit account
      </div>
      <div className="flex flex-row flex-wrap gap-3 ">
        <div className="min-w-max min-h-max max-w-[500px] w-full flex flex-col gap-3">
          <div className="bg-white shadow-md rounded-xl px-10 py-5 flex flex-col gap-2 ">
            <div className="mb-1 text-center text-blue-700 font-semibold">
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

          <div className="bg-white shadow-md rounded-xl px-10 py-5 flex flex-col gap-2">
            <div className="mb-1 text-center text-blue-700 font-semibold">
              User information
            </div>
            <InputField title={"Name"} content={name} setContent={setName} />
            <InputField title={"Email"} content={email} setContent={setEmail} />
            <InputField
              title={"Date of birth"}
              content={dateOfBirth}
              setContent={setDateOfBirth}
              inputType="date"
            />
            <InputField title={"Phone"} content={phone} setContent={setPhone} />
          </div>
        </div>
        <div className="bg-white shadow-md rounded-xl min-w-max min-h-max w-full h-full max-w-[500px] px-10 py-5 flex flex-col gap-2">
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
      <div>
        <button
          className="bg-blue-700 shadow-md text-white rounded-xl w-full max-w-[500px] h-max p-3 mt-6"
          onClick={() => {
            updateAccount();
          }}
        >
          Save
        </button>
      </div>
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

export default UpdateAccount;
