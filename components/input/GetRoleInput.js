import { InputField } from "./InputField";

export const GetRoleInput = ({ role, setRole }) => {
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
          <InputField
            title={"Class"}
            content={role}
            setContent={setRole}
            propertyChangeName={["student", "class"]}
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
