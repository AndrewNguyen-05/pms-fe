import AuthProvider from "./auth/Provider";
import Navbar from "./header/Navbar";

const Layout = ({ children }) => {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <div>
          <main>{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Layout;
