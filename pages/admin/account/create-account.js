import React, { useState } from "react";

const InputFiled = ({
  title,
  content,
  setContent,
  inputType = "text",
  propertyChangeName = null,
}) => {
  let changeContent;
  let viewContent;

  if (!propertyChangeName) {
    changeContent = (e) => {
      setContent(e.target.value);
    };
    viewContent = content;
  } else {
    changeContent = (e) => {
      let tmp = { ...content };
      let pcn = propertyChangeName;
      if (pcn.length === 1) {
        tmp[pcn[0]] = e.target.value;
      } else if (pcn.length === 2) {
        if (!tmp[pcn[0]]) tmp[pcn[0]] = {};
        tmp[pcn[0]][pcn[1]] = e.target.value;
      }
      setContent({ ...tmp });
    };

    viewContent = content[propertyChangeName];
  }

  return (
    <div className="flex flex-col">
      <label>{title} </label>
      <input
        type={inputType}
        className="border border-slate-200 rounded px-2 py-1"
        value={viewContent}
        onChange={(e) => {
          changeContent(e);
        }}
      />
    </div>
  );
};

const GetRoleInput = ({ role, setRole }) => {
  console.log(role);
  switch (role.value) {
    case "aa":
      return (
        <>
          <InputFiled
            title={"Academic Affair ID"}
            content={role}
            setContent={setRole}
            propertyChangeName={["aa", "Code"]}
          />
          <InputFiled
            title={"Faculty"}
            content={role}
            setContent={setRole}
            propertyChangeName={["aa", "Faculty"]}
          />
        </>
      );
    case "teacher":
      return (
        <>
          <InputFiled
            title={"Teacher ID"}
            content={role}
            setContent={setRole}
            propertyChangeName={["teacher", "Code"]}
          />
          <InputFiled
            title={"Faculty"}
            content={role}
            setContent={setRole}
            propertyChangeName={["teacher", "Faculty"]}
          />
        </>
      );
    case "student":
      return (
        <>
          <InputFiled
            title={"Student ID"}
            content={role}
            setContent={setRole}
            propertyChangeName={["student", "Code"]}
          />
          <InputFiled
            title={"Class"}
            content={role}
            setContent={setRole}
            propertyChangeName={["student", "Class"]}
          />
          <InputFiled
            title={"Major"}
            content={role}
            setContent={setRole}
            propertyChangeName={["student", "Major"]}
          />
        </>
      );
    case "admin":
      return <></>;
  }
};

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");

  async function createAccount() {}

  return (
    <div className="h-screen bg-slate-50 px-20 py-8">
      <div className="text-blue-700 font-bold text-lg ml-3 mb-3">
        Add new account
      </div>
      <div className="flex flex-row flex-wrap gap-3 ">
        <div className="min-w-max min-h-max max-w-[500px] w-full flex flex-col gap-3">
          <div className="bg-white shadow-md rounded-xl px-10 py-5 flex flex-col gap-2 ">
            <div className="mb-1 text-center text-blue-700 font-semibold">
              Authentication information
            </div>
            <InputFiled
              title={"Username"}
              content={username}
              setContent={setUsername}
            />
            <InputFiled
              title={"Password"}
              content={password}
              setContent={setPassword}
            />
          </div>

          <div className="bg-white shadow-md rounded-xl px-10 py-5 flex flex-col gap-2">
            <div className="mb-1 text-center text-blue-700 font-semibold">
              User information
            </div>
            <InputFiled title={"Name"} content={name} setContent={setName} />
            <InputFiled title={"Email"} content={email} setContent={setEmail} />
            <InputFiled
              title={"Date of birth"}
              content={dateOfBirth}
              setContent={setDateOfBirth}
              inputType="date"
            />
            <InputFiled title={"Phone"} content={phone} setContent={setPhone} />
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
                setRole({ value: e.target.value });
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
            createAccount();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
