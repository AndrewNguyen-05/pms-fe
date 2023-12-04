import { useRouter } from "next/router";
import Navbar from "./header/Navbar";
import useAuth from "./hook/useAuth";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <div>
      <Navbar />
      <div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
