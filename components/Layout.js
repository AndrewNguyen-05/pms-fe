import Navbar from "./header/Navbar";

const Layout = ({ children }) => {
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
