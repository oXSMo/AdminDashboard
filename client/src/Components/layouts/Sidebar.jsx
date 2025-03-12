import React, { useEffect, useRef, useState } from "react";
import { useClickOut, useScreenWidth, useToggleTheme } from "../../Utils/Hooks";
import { darkSlice, sidebarSlice } from "../../Store/darktheme";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdAddBox,
  MdCategory,
  MdDashboard,
  MdGroup,
  MdKeyboardDoubleArrowLeft,
  MdLibraryAdd,
  MdPersonAdd,
} from "react-icons/md";
import { FaBoxes, FaShippingFast } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";

function Sidebar() {
  const { isDark } = darkSlice();
  const { pathname } = useLocation();
  const [open, setopen] = useState(true);
  const { show, setshow } = sidebarSlice();
  const ref = useClickOut(() => {
    setshow(false);
  });
  const width = useScreenWidth();

  useEffect(() => {
    if (width < 768) setopen(true);
  }, [width]);

  useEffect(() => {
    setshow(false);
  }, [pathname]);

  return (
    <nav
      ref={ref}
      style={{ width: open ? "240px" : "60px" }}
      className={`duration-300 group h-screen grid grid-rows-[auto_1fr_auto] md:sticky fixed md:translate-x-0    top-0 border-r border-color shadow-[0px_5px_10px_5px] shadow-black/15 z-50 dark:bg-fif bg-white
        ${show ? "translate-x-0" : "-translate-x-full"}
        `}
    >
      <header
        className={`h-14 relative bg-white dark:bg-fif  ${
          open ? "px-4" : "mx-auto grid items-center "
        }`}
      >
        <Link to="/">
          <img
            src={
              !open
                ? "https://i.ibb.co/XZCdb1Hw/2.png"
                : isDark
                ? "https://i.ibb.co/bjx1z7jS/logo-white.png"
                : "https://i.ibb.co/v4ryLbTd/logo-black.png"
            }
            className={` object-cover ${
              open ? "w-40 h-full -translate-x-3.5" : "h-8"
            }`}
          />
        </Link>
        <TbLayoutSidebarRightExpandFilled
          onClick={() => setshow(false)}
          className="md:hidden block absolute top-1/2 -translate-y-1/2 right-4 text-xl cursor-pointer"
        />
      </header>

      {/* BODY  */}

      <section
        className={` overflow-auto py-1 px-2 space-y-1 ${
          !open ? "scrollnone " : ""
        }
                          scroll-hover
        `}
      >
        <Title open={open} title="STATISTICS" />

        <Nav
          icon={<MdDashboard className="text-xl" />}
          open={open}
          title="Dashboard"
        >
          Dashboard
        </Nav>

        <Title open={open} title="USERS" />

        <Nav
          link="/users"
          icon={<MdGroup className="text-xl" />}
          open={open}
          title="Users"
        >
          Users Overview
        </Nav>

        <Nav
          link="/adduser"
          icon={<MdPersonAdd className="text-xl" />}
          open={open}
          title="Add User"
        >
          Add User
        </Nav>

        <Title open={open} title="ORDERS" />

        <Nav
          link="/orders"
          icon={<FaBoxes className="text-xl" />}
          open={open}
          title="Orders"
        >
          Orders Overview
        </Nav>
        <Nav
          link="/addorder"
          icon={<MdLibraryAdd className="text-xl" />}
          open={open}
          title="Add Order"
        >
          Add Order
        </Nav>

        <Title open={open} title="OTHER" />

        <Nav
          link="/shipping"
          icon={<FaShippingFast className="text-xl" />}
          open={open}
          title="Express"
        >
          Express
        </Nav>
        <Nav
          link="/categories"
          icon={<MdCategory className="text-xl" />}
          open={open}
          title="Categories"
        >
          Categories
        </Nav>
        <Nav
          link="/createItem"
          icon={<AiFillProduct className="text-xl" />}
          open={open}
          title="Items"
        >
          Add Item
        </Nav>
      </section>

      <button
        disabled={width < 768}
        onClick={() => setopen(!open)}
        className="border-t border-color text-3xl grid place-content-center py-2 dark:text-neutral-400 cursor-pointer relative 
        after:w-full after:h-full after:absolute after:bg-black after:opacity-0 hover:after:opacity-20 after:duration-200
        disabled:hidden
        "
      >
        <MdKeyboardDoubleArrowLeft
          className={`duration-300 ${open ? "" : "rotate-180"}`}
        />
      </button>
    </nav>
  );
}

const Nav = ({
  open,
  icon,
  children,
  className = "",
  title = "",
  link = "/",
}) => {
  const navigate = useNavigate();
  const { pathname: p } = useLocation();
  return (
    <article className="hs-tooltip relative z-40 hs-tooltip [--placement:right]">
      <aside
        onClick={() => navigate(link)}
        className={`h-10 hs-tooltip-toggle  px-3 rounded-lg hover:bg-gray-200 dark:bg-opacity-10 flex gap-3 items-center cursor-pointer text-[15px]  tracking-wide ${className}
            ${p === link && "bg-gray-200"}
          `}
        data-hs-tooltip-target="dashboard"
      >
        <div className="flex-shrink-0">{icon}</div>
        <div className={`duration-200 ${open ? "opacity-100" : "opacity-0 "}`}>
          {children}
        </div>

        <span
          className={`hs-tooltip-content  !z-50 hs-tooltip-shown:opacity-100 ${
            !open && "hs-tooltip-shown:visible"
          } opacity-0 transition-opacity inline-block absolute invisible   text-xs font-medium text-white  `}
          role="tooltip"
        >
          <span className="bg-gray-900 flex-nowrap text-nowrap dark:bg-neutral-700 py-1 px-2 ml-2 rounded shadow-sm">
            {title}
          </span>
        </span>
      </aside>
    </article>
  );
};

const Title = ({ open, title }) => (
  <aside className="relative ">
    <h1
      className={`duration-200 font-medium tracking-wider ml-2  ${
        !open ? "opacity-0 -my-1.5 " : "delay-100 my-1.5"
      }`}
    >
      {title}
    </h1>
    {title === "STATISTICS" ? (
      <></>
    ) : (
      <div
        className={`absolute w-8 h-0.5  dark:bg-white/40 bg-black/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-200 ${
          open ? "opacity-0 " : "delay-100"
        }`}
      />
    )}
  </aside>
);

export default Sidebar;
