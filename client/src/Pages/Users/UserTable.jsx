import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Input from "../../Components/common/Input";
import Select from "../../Components/common/Select";
import { MdGroup, MdSwapVert, MdTune } from "react-icons/md";
import Checkbox from "../../Components/common/Checkbox";
import { useGetAllUsers } from "../../Hooks/useUser";
import { Avatar } from "./UserOverview";
import { LuPanelRightOpen } from "react-icons/lu";
import moment from "moment";
import { wilayas } from "../../Utils/Constants";
import Pagination from "../../Components/common/Pagination";
import OffCanvas from "../../Components/common/OffCanvas";
import UserSidebar from "./UserSidebar";

function UserTable() {
  const [filter, setfilter] = useState({
    limit: 10,
    search: "",
    sort: "createdAt",
    filter: [],
    page: 1,
  });

  const { loading, getAll, users } = useGetAllUsers({
    page: filter.page,
    filter,
  });

  return (
    <main className="p-5 w-full fadeIn overflow-hidden grid border border-color rounded-xl   bg-white dark:bg-fif shadow-lg shadow-black/40  ">
      <header className="flex items-center justify-between flex-wrap gap-2">
        <Input
          icon={<FaSearch />}
          set={setfilter}
          state={filter}
          name="search"
          className="dark:bg-neutral-600 md:w-80 w-full focus-within:opacity-100 !py-1.5 !text-sm dark:!border-opacity-0  opacity-70 focus-within:!bg-transparent !rounded-lg dark:focus-within:!border-opacity-100 "
          placeholder="Search Items"
          wait={true}
        />
        <div className="flex gap-4">
          <Select
            set={setfilter}
            state={filter}
            options={["qsd", "qssd", "qsdq"]}
            multiple={true}
            placeholder={
              <div className="flex gap-2 items-center">
                <MdTune /> Filter
              </div>
            }
            name="filter"
            className="w-26"
            chevron={false}
            fixedPlaceholder={true}
            placement="bottom-end"
            strategy="absolute"
            disabled={true}
          />
          <Select
            set={setfilter}
            state={filter}
            options={[5, 10, 20, 40]}
            name="limit"
            className="w-14 h-[30px]"
            classPrefix="!w-14"
            placement="bottom-end"
            strategy="absolute"
          />
        </div>
      </header>
      <Table
        filter={filter}
        setfilter={setfilter}
        users={users}
        getAll={getAll}
      />

      <footer className="mt-4 flex justify-between">
        <h1 className="text-sm tracking-wide opacity-80">
          Results <span className="opacity-60">({users?.total})</span>
        </h1>
        <Pagination
          current={filter.page}
          total={users?.pages?.total}
          set={setfilter}
        />
      </footer>
    </main>
  );
}

const Table = ({ filter, setfilter, users, getAll }) => {
  const [select, setselect] = useState([]);
  const [userId, setuserId] = useState();
  const [open, setopen] = useState(false);

  return (
    <section className="w-full mt-4 max-h-[500px] min-h-[300px] overflow-auto  [&::-webkit-scrollbar]:h-[8px]">
      {users?.users?.length ? (
        <table className="min-w-full dark:divide-neutral-700 text-sm ">
          <thead className=" sticky top-[1px] dark:bg-fif bg-white ring-[1px] dark:ring-[#525252] ring-[#CDD1D7] z-10  border-color h-10 w-full text-neutral-500">
            <tr className="">
              {/* CHECK BOX  */}
              <th className="w-8 pl-2 pr-3 border-r border-color">
                <Checkbox
                  check={
                    select.sort().join("") ===
                    users?.users
                      ?.map((i) => i._id)
                      .sort()
                      .join("")
                  }
                  onChange={() => {
                    setselect(
                      select.length ? [] : users?.users?.map((i) => i._id)
                    );
                  }}
                />
              </th>

              {/* USERNAME  */}
              <th
                onClick={() => setfilter({ ...filter, sort: "username" })}
                className="min-w-[200px] hover:dark:bg-white/10 hover:bg-black/20 border-r font-medium border-color  px-4 py-2.5 text-left cursor-pointer "
              >
                <div className="flex gap-1 items-center">
                  Username <MdSwapVert className="text-lg" />
                </div>
              </th>

              {/* EMAIL  */}
              <th
                onClick={() => setfilter({ ...filter, sort: "email" })}
                className="min-w-[200px] font-medium border-r border-color px-4 py-2.5 text-left cursor-pointer hover:dark:bg-white/10 hover:bg-black/20"
              >
                <div className="flex gap-1 items-center">
                  Email <MdSwapVert className="text-lg" />
                </div>
              </th>

              {/* CREATED AT  */}
              <th
                onClick={() => setfilter({ ...filter, sort: "createdAt" })}
                className="font-medium border-r border-color px-4 py-2.5 text-left cursor-pointer hover:dark:bg-white/10 hover:bg-black/20"
              >
                <div className="flex gap-1 items-center">
                  Joined <MdSwapVert className="text-lg" />
                </div>
              </th>

              {/* ROLE  */}
              <th className="font-medium border-r min-w-24 border-color px-3 text-center py-2.5 cursor-pointer ">
                Role
              </th>

              {/* PHONE NUMNER  */}
              <th className="font-medium border-r border-color px-4 py-2.5 text-left cursor-pointer ">
                PhoneNumber
              </th>

              {/* STATE  */}
              <th className="font-medium px-4 py-2.5 text-left cursor-pointer ">
                State
              </th>
            </tr>
          </thead>

          <tbody>
            {users?.users?.map((u) => (
              <tr
                onClick={() => {
                  setselect(
                    !select?.find((e) => e === u._id)
                      ? [...select, u._id]
                      : select?.filter((e) => e !== u._id)
                  );
                }}
                className="border-b border-color h-[44px] cursor-pointer hover:bg-black/30 relative"
              >
                {/* CHECKBOX  */}
                <td className=" pl-2 hs-dropdown-toggle border-r border-color">
                  <Checkbox check={select.find((e) => e === u._id)} />
                </td>

                {/* USERNAME  */}
                <td className="border-r border-color">
                  <div className="flex items-center gap-2 px-3 py-1.5 relative group">
                    <Avatar
                      className="!w-8 !h-8 !text-base "
                      username={u.username}
                      tooltip={false}
                    />
                    <h1 className="line-clamp-1 break-all">{u.username}</h1>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setuserId(u._id);
                        setopen(true);
                      }}
                      className="absolute items-center  py-0.5 px-1.5 hover:bg-opacity-80 active:-translate-x-px dark:bg-fif bg-sec text-white right-4 top-1/2 -translate-y-1/2 rounded-md flex gap-1 text-[13px] border border-color opacity-0 group-hover:opacity-100 duration-200"
                    >
                      <LuPanelRightOpen />{" "}
                      <p className="text-[11px] -translate-y-px">Open</p>
                    </span>
                  </div>
                </td>

                {/* EMAIL  */}
                <td className="pl-3 border-r border-color">
                  <p className="line-clamp-1 break-all opacity-70">{u.email}</p>
                </td>

                {/* CREATED AT  */}
                <td className="pl-3 border-r border-color">
                  <p className="line-clamp-1 break-all">
                    {moment(u.createdAt).fromNow()}
                  </p>
                </td>

                {/* Role  */}
                <td className="px-3 border-r border-color">
                  <p
                    style={{
                      color: color(u?.role),
                      background: `${color(u?.role)}33`,
                    }}
                    className="line-clamp-1 max-w-20 mx-auto py-0.5 px-2 text-xs font-medium bg-red-600 text-center rounded-md first-letter:uppercase break-all"
                  >
                    {u?.role}
                  </p>
                </td>

                {/* PHONE NUMBER  */}
                <td className="px-3 border-r border-color">
                  <p className="line-clamp-1">{u?.phoneNumber || "N/A"}</p>
                </td>

                {/* STATE  */}
                <td className="px-3 ">
                  <p className="line-clamp-1">
                    {u?.state ? wilayas[u?.state - 1] : "N/A"}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-full h-full grid place-content-center opacity-60 text-center font-semibold tracking-wide">
          <MdGroup className="text-7xl opacity-60 mx-auto" />
          <h1 className="text-center text-xl">No Users Found.</h1>
          <h2 className="max-w-80 mt-2 text-sm font-light dark:opacity-70">
            no data here yet like this, change the filter to see the results
          </h2>
        </div>
      )}
      <OffCanvas open={open} set={setopen}>
        <UserSidebar set={setopen} open={open} _id={userId} getAll={getAll} />
      </OffCanvas>
    </section>
  );
};

export const color = (role) => {
  const s = role.toLowerCase();
  switch (s) {
    case "cancelled":
    case "admin":
    case "red":
      return "#dc2626";

    case "shipped":
    case "delivered":
    case "done":
    case "green":
      return "#16a34a";
    case "pending":
    case "processing":
      return "#ca8a04";

    case "super":
      return "#2C5CC7";

    default:
      return "#888888";
  }
};

export default UserTable;
