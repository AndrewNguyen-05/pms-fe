import { useEffect, useState } from "react";
import { InputField } from "./InputField";
import { deleteClassInfoDb, getClassList } from "@/services/classServices";

export const GetRoleInput = ({ role, setRole }) => {
  const [classList, setClassList] = useState([]);
  useEffect(() => {
    getClassListData();
  }, [role.student.class]);
  const getClassListData = async () => {
    let result = await getClassList();
    setClassList(result);
  };
  const deleteClassInfo = async (id) => {
    console.log(id);
    await deleteClassInfoDb([id]);
    await getClassListData();
  };
  console.log("role input", role);
  switch (role.value) {
    case "aa":
      return (
        <>
          <InputField
            title={"Academic Affair ID"}
            content={role}
            setContent={setRole}
            propertyChangeName={["aa", "code"]}
          />
          <InputField
            title={"Faculty"}
            content={role}
            setContent={setRole}
            propertyChangeName={["aa", "faculty"]}
          />
        </>
      );
    case "teacher":
      return (
        <>
          <InputField
            title={"Teacher ID"}
            content={role}
            setContent={setRole}
            propertyChangeName={["teacher", "code"]}
          />
          <InputField
            title={"Faculty"}
            content={role}
            setContent={setRole}
            propertyChangeName={["teacher", "faculty"]}
          />
          <InputField
            title={"Academic Degree"}
            content={role}
            setContent={setRole}
            propertyChangeName={["teacher", "academicDegree"]}
          />
        </>
      );
    case "student":
      return (
        <>
          <InputField
            title={"Student ID"}
            content={role}
            setContent={setRole}
            propertyChangeName={["student", "code"]}
          />

          <span>
            <label className="font-semibold">Class</label>

            <button
              hidden={
                role.student.class === "#Custom" ||
                role.student.class === null ||
                role.student.class === ""
              }
              className="border border-red-500 rounded-lg px-2 ml-6 text-red-500 hover:text-white hover:bg-red-500 w-fit"
              onClick={() => {
                deleteClassInfo(role.student.class);
                let tmp = role;
                tmp["student"]["class"] = "";
                setRole({ ...tmp });
              }}
            >
              Delete class
            </button>
          </span>
          <select
            className="border border-slate-200 rounded px-2 py-1"
            value={role.student.class}
            onChange={(e) => {
              let tmp = role;
              tmp["student"]["class"] = e.target.value;
              setRole({ ...tmp });
            }}
          >
            <option value="">Not selected...</option>
            {classList.map((classItem, index) => (
              <option key={index} value={classItem.id}>
                {classItem.className}
              </option>
            ))}
            <option value="#Custom">Add new...</option>
          </select>

          <InputField
            isHidden={role.student.class !== "#Custom"}
            title={"New Class"}
            content={role}
            setContent={setRole}
            propertyChangeName={["student", "newClass"]}
          />

          <InputField
            title={"Major"}
            content={role}
            setContent={setRole}
            propertyChangeName={["student", "major"]}
          />
        </>
      );
    case "admin":
      return <></>;
  }
};
