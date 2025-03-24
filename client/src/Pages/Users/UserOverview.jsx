import React from "react";
import { MdAdd, MdGroup, MdOutlineGroup, MdPersonSearch } from "react-icons/md";
import Tooltip from "../../Components/common/Tooltip";
import CounterUp from "../../Components/common/CounterUp";
import { usetGetUsersDetails } from "../../Hooks/useUser";
import UserTable from "./UserTable";
import {
  FaUserCheck,
  FaUserMinus,
  FaUserTie,
  FaUserTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function UserOverview() {
  const { loading, details } = usetGetUsersDetails();

  return (
    <main className="space-y-4">
      {/* HEADER  */}
      <header className="flex justify-between ">
        <h1 className="font-bold tracking-wide text-xl">Users</h1>
        <Link
          to="/adduser"
          className="flex gap-2 button bg-blue-600  text-sm !px-3 !pr-4 text-white"
        >
          <MdAdd /> Add User
        </Link>
      </header>

      {/* CARDS  */}
      <section className="grid lg:grid-cols-4 grid-cols-2 gap-4">
        <UserCard
          color="#7814dd"
          tooltip="All users"
          total={details?.all}
          users={details?.last}
          title="Total Users"
          icon={<MdOutlineGroup />}
        />
        <UserCard
          color="#2563eb"
          tooltip="Users With Many Orders"
          total={details?.super}
          users={details?.lastSuper}
          title="Super Users"
          icon={<FaUserTie />}
        />
        <UserCard
          color="#fdba74"
          tooltip="Users With No Orders"
          total={details?.noOrder}
          users={details?.lastNoOrdered}
          title="No Order Users"
          icon={<FaUserMinus />}
        />
        <UserCard
          color="#dc2626"
          tooltip="Users Didn't Verified Their Email"
          total={details?.unVerified}
          users={details?.lastUnverified}
          title="unVerified Users"
          icon={<FaUserTimes />}
        />
      </section>

      {/* TABLE  */}

      <UserTable />
    </main>
  );
}

export const UserCard = ({ color, title, tooltip, total, users, icon }) => {
  return (
    <article className="w-full fadeIn bg-color min-h-32 border border-color dark:bg-fif bg-white shadow-lg shadow-black/40 rounded-lg relative p-4 overflow-hidden">
      <span
        style={{ boxShadow: `5px 5px 130px 20px ${color}` }}
        className="absolute w-20 h-20 z-0 -translate-x-12 -translate-y-24 rounded-full"
      ></span>

      <aside className="flex justify-between items-center relative z-10">
        <div className="p-1.5 rounded dark:bg-fif bg-white opacity-80 shadow shadow-black/40 text-2xl">
          {React.cloneElement(icon, {
            style: { color },
            className: "text-[19px]",
          })}
        </div>
        <Tooltip className="max-w-32" placement="top" strategy="fixed">
          <div className="w-4 h-4 font-bold grid place-content-center cursor-pointer rounded-full text-[9px] bg-color opacity-80 border border-color shadow shadow-black/40">
            ?
          </div>
          <h1 className="dark:bg-qua bg-sec text-[11px] p-1 text-white rounded text-center">
            {tooltip}
          </h1>
        </Tooltip>
      </aside>

      <aside className="mt-3 flex justify-between items-end">
        <div>
          <h1 className="font-medium ">{title}</h1>

          <h2 className="text-lg font-bold mt-auto">
            {!total ? 0 : <CounterUp maxValue={total} steps={150} />}
          </h2>
        </div>

        <div className="flex -space-x-2">
          {users?.map((u) => (
            <Avatar username={u.username} />
          ))}
        </div>
      </aside>
    </article>
  );
};

export const Avatar = ({
  username,
  className,
  tooltip = true,
  loading = false,
}) => {
  if (username)
    return tooltip ? (
      <Tooltip>
        <aside
          className={`bg-color uppercase border border-color rounded-full w-6 h-6 cursor-pointer text-xs grid place-content-center hover:z-20 relative ${className}`}
        >
          {username[0]}
        </aside>
        <div className="tooltip">{username}</div>
      </Tooltip>
    ) : (
      <aside
        className={`bg-color uppercase border border-color rounded-full w-6 h-6 cursor-pointer text-xs grid place-content-center hover:z-20 relative ${className}`}
      >
        {loading ? <div className="loader w-8 h-8" /> : username[0]}
      </aside>
    );
};

export default UserOverview;
