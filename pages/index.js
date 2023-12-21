import { Inter } from "next/font/google";
import Meta from "@/components/header/Meta";
import { useSession, signIn, signOut } from "next-auth/react";
import AcademicAffairHome from "@/components/home/AcademicAffairHome";
import StudentHome from "@/components/home/StudentHome";
import TeacherHome from "@/components/home/TeacherHome";
import AdminHome from "@/components/home/AdminHome";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  switch (session?.user.role) {
    case "aa":
      return <AcademicAffairHome />;
    case "student":
      return <StudentHome />;
    case "teacher":
      return <TeacherHome />;
    case "admin":
      return <AdminHome />;
  }
  return (
    <>
      <div className="flex justify-center items-center font-semibold">
        Why are you here
      </div>
    </>
  );
}
