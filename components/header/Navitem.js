import Link from "next/link";

const NavItem = ({ name, href, active }) => {
  return (
    <li>
      <Link
        href={href}
        className={
          "nav-item mx-5 rounded bg-transparent text-black hover:text-blue-400 focus:text-blue-700 " +
          (active ? "nav-item-actived" : "")
        }
      >
        {name}
      </Link>
    </li>
  );
};

export default NavItem;
