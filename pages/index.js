import { Inter } from "next/font/google";
import Meta from "@/components/header/Meta";
import { useSession, signIn, signOut } from "next-auth/react";
import AcademicAffairHome from "@/components/home/AcademicAffairHome";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  switch (session?.user.role) {
    case "aa":
      return <AcademicAffairHome />;
    case "student":
      return <>student Home</>;
    case "teacher":
      return <>teacher Home</>;
    case "admin":
      return <>admin home</>;
  }
  return <>why are you here</>;
}
