import React, { useEffect, useRef } from "react";
import { useToggleTheme } from "../../Utils/Hooks";
import {
  MdAdminPanelSettings,
  MdCategory,
  MdGroup,
  MdKeyboardBackspace,
  MdLightMode,
  MdLogout,
  MdOutlineDarkMode,
  MdOutlineHome,
  MdOutlineLightMode,
  MdOutlineNotifications,
  MdOutlinePerson,
  MdSettings,
} from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBoxes } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import Switch from "../common/Switch";
import { sidebarSlice } from "../../Store/darktheme";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";

function Navbar() {
  const { setisDark, isDark } = useToggleTheme();
  const { setshow, show } = sidebarSlice();

  return (
    <nav className="w-full h-14 px-6 items-center grid grid-cols-3 sticky top-0 dark:bg-fif bg-white border-b dark:shadow-none shadow-md shadow-black/10 border-color z-50">
      <article className="flex  gap-1">
        <aside
          onClick={() => setshow(true)}
          className="rounded-full hs-tooltip md:hidden cursor-pointer [--placement:bottom] text-lg hover:bg-black/10 dark:hover:bg-white/10 w-9 h-9 grid place-content-center"
        >
          <TbLayoutSidebarLeftExpandFilled
            className={`duration-200 ${!show ? "rotate-0" : "-rotate-180"}`}
          />
          <span
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block  absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
            role="tooltip"
          >
            {show ? "Close" : "Open"}
          </span>
        </aside>

        <Link
          to="https://fixiiit.store"
          className="rounded-full hs-tooltip [--placement:bottom] text-lg hover:bg-black/10 dark:hover:bg-white/10 w-9 h-9 grid place-content-center"
        >
          <MdOutlineHome />
          <span
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
            role="tooltip"
          >
            Home
          </span>
        </Link>
      </article>

      <article className="col-span-2 justify-self-end flex gap-1 items-center">
        {/* NOTIFICATION  */}

        <button className="rounded-full hs-tooltip [--placement:bottom] text-lg hover:bg-black/10 dark:hover:bg-white/10 w-9 h-9 grid place-content-center">
          <MdOutlineNotifications />
          <span
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
            role="tooltip"
          >
            Notifications
          </span>
        </button>

        {/* DARK MODE TOGGLE  */}
        <button
          onClick={() => setisDark(!isDark)}
          className="rounded-full text-lg  hover:bg-black/10 dark:hover:bg-white/10 w-9 h-9 grid place-content-center hs-tooltip [--placement:bottom]"
        >
          {isDark ? (
            <MdOutlineLightMode />
          ) : (
            <MdOutlineDarkMode className="text-black/80" />
          )}
          <span
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 !duration-500 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
            role="tooltip"
          >
            {isDark ? "Light" : "Dark"}
          </span>
        </button>

        {/* ADMIN DROPDOWN  */}
        <div className="dark:bg-white/20 bg-black/20 w-px mx-2 h-6"></div>
        <AdminDropDown setisDark={setisDark} isDark={isDark} />
      </article>
    </nav>
  );
}

const AdminDropDown = ({ setisDark, isDark }) => {
  return (
    <>
      <section className="hs-dropdown relative inline-flex [--auto-close:inside]">
        <button
          id="hs-dropdown-auto-close-inside"
          className="hs-dropdown-toggle text-xl rounded-full border border-color  hover:bg-black/10 dark:hover:bg-white/10 w-9 h-9 grid place-content-center"
          aria-haspopup="menu"
          type="button"
          aria-expanded="false"
          aria-label="Dropdown"
        >
          <RiAdminLine />
        </button>

        <div
          className="hs-dropdown-menu transition-[opacity,margin]  hs-dropdown-open:opacity-100 opacity-0 hidden z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="hs-dropdown-auto-close-inside"
        >
          <article
            className="hs-dropdown-open:ease-in hs-dropdown-open:opacity-100 hs-dropdown-open:scale-100 transition ease-out opacity-0 duration-200 
               mt-1   border-color min-w-60 bg-pri shadow-lg shadow-black/20 rounded-xl dark:bg-qua"
            data-hs-transition
          >
            <aside className="p-1  space-y-0.5">
              <NAV icon={<MdAdminPanelSettings className="!text-2xl" />}>
                <div>
                  <h1 className="font-semibold tracking-wide text-base">
                    Sohaib Man
                  </h1>
                  <h2 className="text-xs text-neutral-500">
                    xsm9512368740@gmail.com
                  </h2>
                </div>
              </NAV>
            </aside>
            <div className="w-full h-px dark:bg-white/20 bg-gray-400" />
            <aside className="p-1  space-y-0.5 text-base">
              <NAV to="/" icon={<MdSettings className="text-lg" />}>
                <div>
                  <h2 className="">General</h2>
                </div>
              </NAV>
              <NAV to="/orders" icon={<FaBoxes className="text-lg" />}>
                <div>
                  <h2 className="font-medium tracking-wide">Orders</h2>
                </div>
              </NAV>
              <NAV to="/users" icon={<MdGroup className="text-lg" />}>
                <div>
                  <h2 className=" font-medium tracking-wide">Users</h2>
                </div>
              </NAV>
              <NAV to="/categories" icon={<MdCategory className="text-lg" />}>
                <div>
                  <h2 className=" font-medium tracking-wide">Categories</h2>
                </div>
              </NAV>
              <NAV to="/items" icon={<AiFillProduct className="text-lg" />}>
                <div>
                  <h2 className=" font-medium tracking-wide">Items</h2>
                </div>
              </NAV>
            </aside>

            <div className="w-full h-px dark:bg-white/20 bg-gray-400" />
            <aside className="flex justify-between items-center font-medium px-4 py-3">
              <h1>Dark Mode</h1>
              <Switch
                active={isDark}
                setactive={setisDark}
                width={45}
                className="!h-6"
              />
            </aside>
            <div className="w-full h-px dark:bg-white/20 bg-gray-400" />

            <div className="p-1">
              <NAV
                onClick={() => {
                  localStorage.clear(), window.location.reload();
                }}
                icon={<MdLogout className="text-red-600 text-lg" />}
              >
                <h1 className="text-red-600">SignOut</h1>
              </NAV>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

const NAV = ({ to, icon, children, className, onClick }) => {
  const navigate = useNavigate();
  const { pathname: p } = useLocation();
  return (
    <aside
      onClick={() => {
        to && navigate(to);
        onClick && onClick();
      }}
      className={`p-1.5 px-3 rounded-lg hover:bg-gray-200 dark:bg-opacity-10 flex gap-3 items-center cursor-pointer text-[14px] font-medium tracking-wide ${
        to === p && "bg-gray-200"
      }  ${className}`}
    >
      {icon}
      {children}
    </aside>
  );
};

export default Navbar;
