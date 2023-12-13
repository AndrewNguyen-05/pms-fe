import { useRouter } from "next/router";
import Navbar from "./header/Navbar";
import useAuth from "./hook/useAuth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const session = useSession();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const aaItems = [
    {
      name: "Project",
      href: "/academic-affair/project/view-project",
      effectHref: "/academic-affair/project/",
    },
    {
      name: "Announcement",
      href: "/academic-affair/announcement/view-announcement",
      effectHref: "/academic-affair/announcement/",
    },
    {
      name: "Score",
      href: "/academic-affair/score/view-score",
      effectHref: "/academic-affair/score/",
    },
    {
      name: "Analysis",
      href: "/academic-affair/analysis/view-analysis",
      effectHref: "/academic-affair/analysis/",
    },
  ];
  const studentItems = [
    {
      name: "Project",
      href: "/student/project/view-project",
      effectHref: "/student/project/",
    },
    {
      name: "Announcement",
      href: "/student/announcement/view-announcement",
      effectHref: "/student/announcement/",
    },
  ];
  const teacherItems = [];
  const adminItems = [
    {
      name: "Account",
      href: "/admin/account/view-account",
      effectHref: "/admin/account/",
    },
  ];

  const chooseNavbarItem = () => {
    console.log(session);
    if (session.status === "authenticated") {
      switch (session.data.user.role) {
        case "aa":
          return aaItems;
        case "student":
          return studentItems;
        case "teacher":
          return teacherItems;
        case "admin":
          return adminItems;
      }
    }
    return [];
  };

  useEffect(() => {
    setItems(chooseNavbarItem());
  }, [session?.data?.user.role]);
  return (
    <div>
      {session.status === "authenticated" ? <Navbar items={items} /> : <></>}

      <div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
