import { useRouter } from "next/router";
import Navbar from "./header/Navbar";
import useAuth from "./hook/useAuth";

const Layout = ({ children }) => {
  const isAuthenticated = useAuth(true);
  const router = useRouter();
  if (isAuthenticated) {
    return (
      <div>
        <Navbar />
        <div>
          <main>{children}</main>
        </div>
      </div>
    );
  } else if (router.asPath === "/auth/signin") {
    return (
      <div>
        <Navbar />
        <div>
          <main>{children}</main>
        </div>
      </div>
    );
  }
};

export default Layout;
