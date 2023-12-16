import { useEffect, useState } from "react";
import { InputField } from "./InputField";
import { getClassList } from "@/services/classServices";

export const GetRoleInput = ({ role, setRole }) => {
  const [classList, setClassList] = useState([]);
  useEffect(() => {
    getClassListData();
  }, []);
  const getClassListData = async () => {
    let result = await getClassList();
    setClassList(result);
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

          <label className="font-semibold">Class</label>
          <select
            className="border border-slate-200 rounded px-2 py-1"
            value={role.student.class}
            onChange={(e) => {
              let tmp = role;
              tmp["student"]["class"] = e.target.value;
              setRole({ ...tmp });
            }}
          >
            <option value={null}>Not selected...</option>
            {classList.map((classItem, index) => (
              <option key={index} value={classItem.id}>
                {classItem.className}
              </option>
            ))}
          </select>

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
