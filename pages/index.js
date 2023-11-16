import { Inter } from "next/font/google";
import Meta from "@/components/Meta";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Meta title={"Project Management System"} />
    </>
  );
}
