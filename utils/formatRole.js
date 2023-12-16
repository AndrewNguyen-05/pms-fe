const formatRole = (string) => {
  switch (string) {
    case "student":
      return "Student";
    case "teacher":
      return "Teacher";
    case "aa":
      return "Academic affair";
    case "admin":
      return "Admin";
    default:
      return null;
  }
};

export default formatRole;
